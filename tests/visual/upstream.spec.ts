import { expect, test, type Page } from "@playwright/test";

/**
 * Acceptance checks for the KI Dashboard upstream fixes.
 *
 * These are computed-style and runtime probes rather than screenshots, because
 * every defect they cover was invisible to visual inspection: an atmosphere
 * layer sized to the document still looks fine above the fold, and a selection
 * marker that teleports still ends up in the right place.
 */

type StoryGlobals = Partial<{
  appearance: "default" | "lumen";
  theme: "light" | "dark";
  direction: "ltr" | "rtl";
  transparency: "system" | "reduce";
}>;

function storyUrl(id: string, globals: StoryGlobals = {}) {
  const url = new URL("/iframe.html", "http://127.0.0.1:6006");
  url.searchParams.set("id", id);
  url.searchParams.set("viewMode", "story");
  const serialized = Object.entries(globals)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
  if (serialized) url.searchParams.set("globals", serialized);
  return `${url.pathname}${url.search}`;
}

async function openStory(page: Page, id: string, globals?: StoryGlobals) {
  await page.goto(storyUrl(id, globals));
  await expect(page.locator("#storybook-root")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

test.describe("§2 the atmosphere layer is pinned to the viewport", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`${theme}: pseudo-element height equals the viewport, not the document`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await openStory(page, `examples-atmospheretallpage--${theme}`);

      const measured = await page.evaluate(() => {
        const host = document.querySelector<HTMLElement>(".n-atmosphere");
        if (!host) throw new Error(".n-atmosphere not found");
        const style = getComputedStyle(host, "::before");
        return {
          position: style.position,
          height: Number.parseFloat(style.height),
          viewport: window.innerHeight,
          document: document.documentElement.scrollHeight,
        };
      });

      // Sanity: the fixture really is taller than one screen, otherwise this
      // test would pass for the wrong reason.
      expect(measured.document).toBeGreaterThan(measured.viewport * 2);
      expect(measured.position).toBe("fixed");
      expect(Math.abs(measured.height - measured.viewport)).toBeLessThanOrEqual(1);
      expect(measured.height).toBeLessThan(measured.document);
    });
  }

  test("stays put while the page scrolls", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await openStory(page, "examples-atmospheretallpage--dark");
    const before = await page.evaluate(() =>
      document.querySelector(".n-atmosphere")!.getBoundingClientRect().top,
    );
    await page.evaluate(() => window.scrollTo(0, 2000));
    const height = await page.evaluate(
      () =>
        Number.parseFloat(
          getComputedStyle(document.querySelector(".n-atmosphere")!, "::before").height,
        ) - window.innerHeight,
    );
    expect(Math.abs(height)).toBeLessThanOrEqual(1);
    expect(before).toBeDefined();
  });
});

test.describe("§3 the selection marker travels", () => {
  test("is interpolating mid-transition, not already at the destination", async ({ page }) => {
    await openStory(page, "inputs-segmentedcontrol--marker-acceptance", {
      appearance: "lumen",
      theme: "dark",
    });

    const marker = page.locator(".n-marker");
    await expect(marker).toHaveAttribute("data-ready", "true");

    // Everything is sampled inside the page: DOMMatrixReadOnly is a browser
    // API, and the samples have to be taken frame by frame anyway.
    const samples = await page.evaluate(async () => {
      const el = document.querySelector<HTMLElement>(".n-marker")!;
      const target = document.querySelectorAll<HTMLButtonElement>('[role="radio"]')[2]!;
      const read = () => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41;

      const start = read();
      // Click without waiting, then sample immediately: the transition runs
      // for --n-duration-base (180ms), so samples taken a few frames in must
      // land strictly between the two endpoints if the marker is genuinely
      // interpolating rather than teleporting.
      target.click();
      const taken: number[] = [];
      for (let i = 0; i < 4; i += 1) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        taken.push(read());
      }
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { start, taken, final: read() };
    });

    expect(Math.abs(samples.final - samples.start)).toBeGreaterThan(2);

    const low = Math.min(samples.start, samples.final);
    const high = Math.max(samples.start, samples.final);
    const midFlight = samples.taken.filter((x) => x > low + 0.5 && x < high - 0.5);
    expect(midFlight.length).toBeGreaterThan(0);
  });

  test("resizes as well as moves, so the marker matches the label it is under", async ({
    page,
  }) => {
    await openStory(page, "inputs-segmentedcontrol--marker-acceptance");
    const marker = page.locator(".n-marker");
    const wide = page.getByRole("radio", { name: "Considerably wider label" });
    await wide.click();
    await page.waitForTimeout(400);

    const [markerBox, itemBox] = await Promise.all([
      marker.boundingBox(),
      wide.boundingBox(),
    ]);
    expect(markerBox).not.toBeNull();
    expect(Math.abs(markerBox!.width - itemBox!.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(markerBox!.x - itemBox!.x)).toBeLessThanOrEqual(1);
  });

  test("follows a wrapped group onto the second row (both axes)", async ({ page }) => {
    await openStory(page, "inputs-segmentedcontrol--wrapped");
    const marker = page.locator(".n-marker");
    const first = await marker.boundingBox();
    await page.getByRole("radio", { name: "Review" }).click();
    await page.waitForTimeout(400);
    const second = await marker.boundingBox();
    // X-only measurement was the original bug; the marker has to move down.
    expect(second!.y).toBeGreaterThan(first!.y);
  });

  test("works unchanged under RTL, with no direction branch", async ({ page }) => {
    await openStory(page, "inputs-segmentedcontrol--rtl", { direction: "rtl" });
    const marker = page.locator(".n-marker");
    await expect(marker).toHaveAttribute("data-ready", "true");
    const active = page.locator('[role="radio"][aria-checked="true"]');

    // Polled rather than sampled once: the marker re-measures on
    // document.fonts.ready, and under a loaded machine that can land after the
    // first assertion. It must align once the Arabic webfont has settled.
    //
    // 2px, not 1: offsetLeft/offsetWidth are integer-rounded, and RTL layout
    // with proportional Arabic labels lands on fractional positions. Offsets
    // are still the right measurement — they are untransformed and immune to
    // page scroll, which getBoundingClientRect is not.
    await expect
      .poll(async () => {
        const [markerBox, itemBox] = await Promise.all([
          marker.boundingBox(),
          active.boundingBox(),
        ]);
        return Math.abs(markerBox!.x - itemBox!.x);
      })
      .toBeLessThanOrEqual(2);
  });
});

test.describe("§1 dark Lumen glass is lighter than its canvas", () => {
  test("a card's computed fill composites above the atmosphere canvas", async ({ page }) => {
    await openStory(page, "examples-atmospheretallpage--dark");

    const measured = await page.evaluate(() => {
      const parse = (value: string) => {
        const nums = value.match(/[\d.]+/g)!.map(Number);
        return { r: nums[0], g: nums[1], b: nums[2], a: nums[3] ?? 1 };
      };
      const lum = ({ r, g, b }: { r: number; g: number; b: number }) => {
        const ch = (v: number) => {
          const c = v / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
      };
      const host = document.querySelector<HTMLElement>(".n-atmosphere")!;
      const card = host.querySelector<HTMLElement>(".n-material")!;
      const canvas = parse(getComputedStyle(host).backgroundColor);
      const fill = parse(getComputedStyle(card).backgroundColor);
      const composited = {
        r: fill.r * fill.a + canvas.r * (1 - fill.a),
        g: fill.g * fill.a + canvas.g * (1 - fill.a),
        b: fill.b * fill.a + canvas.b * (1 - fill.a),
      };
      return { canvas: lum(canvas), card: lum(composited) };
    });

    // The old recipe differed by ~0.0009 — arithmetically lighter, visually a
    // flat black rectangle.
    expect(measured.card - measured.canvas).toBeGreaterThan(0.005);
  });
});

test.describe("§4 scrollbars never paint an opaque ring", () => {
  test("the thumb clips to its padding box behind a transparent border", async ({ page }) => {
    await openStory(page, "examples-atmospheretallpage--dark");
    const thumb = await page.evaluate(() => {
      const probe = document.createElement("div");
      probe.style.cssText = "overflow:auto;height:40px;width:40px";
      probe.innerHTML = "<div style='height:400px'></div>";
      document.body.append(probe);
      const style = getComputedStyle(probe, "::-webkit-scrollbar-thumb");
      const result = {
        clip: style.backgroundClip || style.webkitBackgroundClip,
        borderColor: style.borderTopColor,
        radius: style.borderTopLeftRadius,
      };
      probe.remove();
      return result;
    });
    expect(thumb.clip).toBe("padding-box");
    // Transparent, not the canvas colour: an opaque border here is what
    // painted a strip of canvas down the inside edge of translucent panels.
    expect(thumb.borderColor).toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
  });
});
