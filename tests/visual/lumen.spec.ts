import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

interface RuntimeErrors {
  console: string[];
  page: string[];
}

const runtimeErrors = new WeakMap<Page, RuntimeErrors>();

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
  if (!runtimeErrors.has(page)) {
    const errors: RuntimeErrors = { console: [], page: [] };
    runtimeErrors.set(page, errors);
    page.on("console", (message) => {
      if (message.type() === "error") errors.console.push(message.text());
    });
    page.on("pageerror", (error) => errors.page.push(error.message));
  }
  await page.goto(storyUrl(id, globals));
  await expect(page.locator("#storybook-root")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("body")).not.toHaveText("");
  await expect(
    page.locator("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay"),
  ).toHaveCount(0);
}

async function expectHealthyRuntime(page: Page) {
  await page.waitForTimeout(100);
  expect(runtimeErrors.get(page)?.page ?? []).toEqual([]);
  expect(runtimeErrors.get(page)?.console ?? []).toEqual([]);
}

async function expectNoAxeViolations(page: Page) {
  // Storybook renders component stories as isolated documents rather than
  // complete application pages, so page-level landmark rules are not
  // meaningful here. Component semantics, contrast, names, focus, and all
  // other axe rules remain enforced.
  const results = await new AxeBuilder({ page })
    .disableRules(["landmark-one-main", "page-has-heading-one", "region"])
    .analyze();
  expect(
    results.violations.map(({ id, impact, nodes }) => ({
      id,
      impact,
      nodes: nodes.map((node) => ({
        target: node.target,
        summary: node.failureSummary,
      })),
    })),
  ).toEqual([]);
}

test("default composer compatibility — light LTR", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 520 });
  await openStory(page, "ai-promptcomposer--default", {
    appearance: "default",
    theme: "light",
    direction: "ltr",
  });
  await expect(page).toHaveScreenshot("default-composer-light-ltr.png", { fullPage: true });
  await expectHealthyRuntime(page);
});

test("default composite compatibility — light LTR and dark RTL", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 760 });
  await openStory(page, "examples-2-active-chat--light-desktop-ltr", {
    appearance: "default",
    theme: "light",
    direction: "ltr",
  });
  await expect(page).toHaveScreenshot("default-active-chat-light-ltr.png", { fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await openStory(page, "examples-2-active-chat--dark-mobile-rtl", {
    appearance: "default",
    theme: "dark",
    direction: "rtl",
  });
  await expect(page).toHaveScreenshot("default-active-chat-dark-rtl.png", { fullPage: true });
  await expectHealthyRuntime(page);
});

test("Lumen composer states — dark LTR", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 520 });
  await openStory(page, "ai-promptcomposer--lumen-dark");
  await page.getByRole("textbox", { name: "Message" }).focus();
  await expect(page).toHaveScreenshot("lumen-composer-dark-focus.png", { fullPage: true });
  await expectHealthyRuntime(page);
});

test("Lumen composer — Arabic RTL", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 520 });
  await openStory(page, "ai-promptcomposer--lumen-arabic-rtl");
  await expect(page).toHaveScreenshot("lumen-composer-arabic-rtl.png", { fullPage: true });
  await expectHealthyRuntime(page);
});

test("Lumen composer — light Sorani RTL", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 520 });
  await openStory(page, "ai-promptcomposer--lumen-sorani-rtl");
  await expect(page).toHaveScreenshot("lumen-composer-sorani-rtl.png", { fullPage: true });
  await expectHealthyRuntime(page);
});

test("Lumen composer — loading and streaming", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 520 });
  await openStory(page, "ai-promptcomposer--loading", {
    appearance: "lumen",
    theme: "dark",
  });
  await expect(page).toHaveScreenshot("lumen-composer-loading.png", { fullPage: true });

  await openStory(page, "ai-promptcomposer--streaming", {
    appearance: "lumen",
    theme: "dark",
  });
  await expect(page).toHaveScreenshot("lumen-composer-streaming.png", { fullPage: true });
  await expectHealthyRuntime(page);
});

test("Lumen workspace — desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 820 });
  await openStory(page, "examples-lumenworkspace--desktop");
  await expect(page.getByRole("textbox", { name: "Message" })).toBeInViewport();
  await expect(page).toHaveScreenshot("lumen-workspace-desktop.png", { fullPage: true });
  await expectHealthyRuntime(page);
});

test("Lumen workspace — mobile and reduced effects", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openStory(page, "examples-lumenworkspace--mobile", {
    appearance: "lumen",
    theme: "dark",
    transparency: "reduce",
  });
  await expect(page).toHaveScreenshot("lumen-workspace-mobile-reduced.png", { fullPage: true });
  const composer = page.getByRole("textbox", { name: "Message" }).locator("..");
  await expect(composer).toHaveCSS("backdrop-filter", "none");
  await page.getByRole("button", { name: "Open conversations" }).click();
  const drawer = page.getByRole("dialog");
  await expect(drawer).toBeVisible();
  await expect(drawer.locator('xpath=ancestor::*[@data-noor-appearance="lumen"]')).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expectHealthyRuntime(page);
});

test("Lumen overlay — material dialog", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 720 });
  await openStory(page, "overlays-dialog--default", {
    appearance: "lumen",
    theme: "dark",
  });
  await page.getByRole("button", { name: /open dialog/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page).toHaveScreenshot("lumen-dialog-open.png", { fullPage: true });
  await expectHealthyRuntime(page);
});

test("Lumen agent surface — error remains semantic", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 520 });
  await openStory(page, "ai-toolcallcard--error-state", {
    appearance: "lumen",
    theme: "dark",
  });
  await expect(page).toHaveScreenshot("lumen-tool-call-error.png", { fullPage: true });
  await expect(page.getByText("Execution failed")).toBeVisible();
  await expectHealthyRuntime(page);
});

for (const scenario of [
  { name: "composer dark", id: "ai-promptcomposer--lumen-dark" },
  { name: "composer Sorani RTL", id: "ai-promptcomposer--lumen-sorani-rtl" },
  { name: "workspace desktop", id: "examples-lumenworkspace--desktop" },
  { name: "agent error", id: "ai-toolcallcard--error-state" },
] as const) {
  test(`axe — ${scenario.name}`, async ({ page }) => {
    await openStory(page, scenario.id);
    await expectNoAxeViolations(page);
    await expectHealthyRuntime(page);
  });
}

test("axe — open material dialog", async ({ page }) => {
  await openStory(page, "overlays-dialog--default", {
    appearance: "lumen",
    theme: "dark",
  });
  await page.getByRole("button", { name: /open dialog/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expectNoAxeViolations(page);
  await expectHealthyRuntime(page);
});
