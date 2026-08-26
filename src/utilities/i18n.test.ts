import { describe, expect, it, vi } from "vitest";
import {
  applyStaticTranslations,
  auditStaticTranslations,
  decodeHtmlEntities,
  escapeHtml,
  interpolate,
} from "./i18n";

function dom(html: string): HTMLElement {
  const root = document.createElement("div");
  root.innerHTML = html;
  return root;
}

describe("interpolate", () => {
  it("fills positional slots", () => {
    expect(interpolate("{0} of {1}", ["3", "9"])).toBe("3 of 9");
  });

  it("formats numbers for the active locale, not the caller's", () => {
    // Callers pass raw numbers; only the React layer knows the locale, so
    // formatting has to happen at render.
    expect(interpolate("{0} rows", [18000], "en-US")).toBe("18,000 rows");
    expect(interpolate("{0} rows", [18000], "de-DE")).toBe("18.000 rows");
  });

  it("repeats a slot that appears twice", () => {
    expect(interpolate("{0}/{0}", ["x"])).toBe("x/x");
  });

  it("leaves an unsupplied slot visible rather than blanking it", () => {
    // A silently-empty slot reads as finished copy; a literal {1} does not.
    expect(interpolate("{0} of {1}", ["3"])).toBe("3 of {1}");
  });

  it("ignores surplus arguments", () => {
    expect(interpolate("{0}", ["a", "b", "c"])).toBe("a");
  });

  it("handles a template with no slots at all", () => {
    expect(interpolate("Plain", [1, 2])).toBe("Plain");
  });
});

describe("HTML entities", () => {
  it("decodes named, decimal and hex entities", () => {
    // Values are written with textContent, which does not decode entities —
    // so copy extracted from markup prints "&middot;" literally without this.
    expect(decodeHtmlEntities("a &middot; b")).toBe("a · b");
    expect(decodeHtmlEntities("&#183;")).toBe("·");
    expect(decodeHtmlEntities("&#xB7;")).toBe("·");
  });

  it("leaves unknown entities alone instead of eating them", () => {
    expect(decodeHtmlEntities("&notanentity;")).toBe("&notanentity;");
  });

  it("escapes every character that could open a tag or attribute", () => {
    expect(escapeHtml(`<a href="x">&'`)).toBe("&lt;a href=&quot;x&quot;&gt;&amp;&#39;");
  });
});

describe("applyStaticTranslations", () => {
  const messages: Record<string, string> = {
    "nav.home": "Home",
    "nav.about": "About",
    "stats.summary": "{0} of {1} rows match",
  };
  const translate = (key: string) => messages[key] ?? null;

  it("writes textContent for [data-i18n]", () => {
    const root = dom(`<span data-i18n="nav.home">placeholder</span>`);
    const result = applyStaticTranslations(root, { translate, audit: false });
    expect(root.querySelector("span")!.textContent).toBe("Home");
    expect(result.translated).toBe(1);
  });

  it("reports missing keys and leaves those nodes untouched", () => {
    const root = dom(`<span data-i18n="nav.missing">original</span>`);
    const result = applyStaticTranslations(root, { translate, audit: false });
    expect(result.missing).toEqual(["nav.missing"]);
    expect(root.querySelector("span")!.textContent).toBe("original");
  });

  it("proves its own wiring under an echo translator", () => {
    // Swap the lookup for one that returns the key itself. Every tagged
    // element must then show its own key — which proves the markup is wired
    // up independently of whether any copy has been translated yet.
    const root = dom(
      `<h1 data-i18n="page.title">x</h1><p data-i18n="page.body">y</p>` +
        `<span data-i18n="nav.home">z</span>`,
    );
    applyStaticTranslations(root, { translate: (key) => `«${key}»`, audit: false });
    expect(Array.from(root.querySelectorAll("[data-i18n]")).map((el) => el.textContent)).toEqual([
      "«page.title»",
      "«page.body»",
      "«nav.home»",
    ]);
  });

  describe("mixed content", () => {
    // Tagging only the <strong> children of a sentence leaves the prose around
    // them untranslated. RTL languages reorder clauses, so pre-cut fragments
    // cannot be reassembled — the paragraph has to be one template with slots.
    const template = "Showing {0} of {1} results";

    it("keeps the whole sentence as one message and fills HTML slots", () => {
      const root = dom(`<p data-i18n-html="stats.html" data-i18n-args="shown,total">x</p>`);
      applyStaticTranslations(root, {
        translate: () => template,
        slots: { shown: "<strong>250</strong>", total: "<strong>18,000</strong>" },
        audit: false,
      });
      expect(root.querySelector("p")!.innerHTML).toBe(
        "Showing <strong>250</strong> of <strong>18,000</strong> results",
      );
    });

    it("escapes the template before substituting, never after", () => {
      // Translator copy must not be able to inject markup; the caller's slots
      // still can, which is the whole point of the split.
      const root = dom(`<p data-i18n-html="evil" data-i18n-args="a">x</p>`);
      applyStaticTranslations(root, {
        translate: () => `<img src=x onerror=alert(1)> {0}`,
        slots: { a: "<em>ok</em>" },
        audit: false,
      });
      const p = root.querySelector("p")!;
      expect(p.querySelector("img")).toBeNull();
      expect(p.querySelector("em")).not.toBeNull();
      expect(p.textContent).toContain("<img src=x onerror=alert(1)>");
    });

    it("substitutes an empty string for a slot the caller did not supply", () => {
      const root = dom(`<p data-i18n-html="s" data-i18n-args="a,b">x</p>`);
      applyStaticTranslations(root, {
        translate: () => "{0}|{1}",
        slots: { a: "<b>A</b>" },
        audit: false,
      });
      expect(root.querySelector("p")!.innerHTML).toBe("<b>A</b>|");
    });

    it("survives a template with no data-i18n-args at all", () => {
      const root = dom(`<p data-i18n-html="s">x</p>`);
      applyStaticTranslations(root, { translate: () => "no slots here", audit: false });
      expect(root.querySelector("p")!.textContent).toBe("no slots here");
    });
  });
});

describe("dev-mode guard rail: statically labelling a live node", () => {
  // A data-i18n label and live data fight over the same node, and whichever
  // runs last wins — so the bug is intermittent and reads as "the translation
  // didn't apply". Scanning source for setText('x', …) misses the indirect
  // form, so the check has to compare the DOM against the catalogue instead.
  const translate = (key: string) => (key === "count.label" ? "Total" : null);

  it("warns when host code has overwritten a translated node", () => {
    const root = dom(`<span id="x" data-i18n="count.label">Total</span>`);
    applyStaticTranslations(root, { translate, audit: false });

    // The indirect form a naive source scan cannot see:
    const el = root.querySelector<HTMLElement>("#x")!;
    el.textContent = "1,284";

    const onWarn = vi.fn();
    const conflicts = auditStaticTranslations(root, translate, undefined, onWarn);
    expect(conflicts).toHaveLength(1);
    expect(onWarn).toHaveBeenCalledOnce();
    expect(onWarn.mock.calls[0]?.[0]).toContain("count.label");
  });

  it("stays quiet when the node still matches the catalogue", () => {
    const root = dom(`<span data-i18n="count.label">x</span>`);
    const onWarn = vi.fn();
    applyStaticTranslations(root, { translate, onWarn, audit: true });
    expect(onWarn).not.toHaveBeenCalled();
  });

  it("runs automatically outside production", () => {
    const root = dom(`<span data-i18n="count.label">x</span>`);
    const onWarn = vi.fn();
    applyStaticTranslations(root, { translate, onWarn });
    // Nothing overwrote the node, so no warning — but the audit ran.
    expect(onWarn).not.toHaveBeenCalled();

    root.querySelector("span")!.textContent = "live value";
    applyStaticTranslations(root, {
      translate: () => null,
      onWarn,
    });
    expect(auditStaticTranslations(root, translate, undefined, onWarn)).toHaveLength(1);
  });

  it("ignores keys that are not in the catalogue", () => {
    const root = dom(`<span data-i18n="unknown">whatever</span>`);
    const onWarn = vi.fn();
    auditStaticTranslations(root, translate, undefined, onWarn);
    expect(onWarn).not.toHaveBeenCalled();
  });
});
