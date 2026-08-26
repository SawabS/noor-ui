import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/* Read off disk rather than imported: vitest runs with `css: false`, which
   makes Vite hand back an empty module for a stylesheet even through `?raw`.
   Reading the file is also closer to what actually ships. */
const read = (file: string) => readFileSync(join(__dirname, file), "utf8");
const primitiveCss = read("primitive.css");
const semanticCss = read("semantic.css");
const themesCss = read("themes.css");
const appearanceCss = read("appearance.css");
const scrollbarCss = read("scrollbar.css");

/**
 * Computed-style probes for the token layer.
 *
 * These defects were invisible until measured. Dark Lumen glass composited to
 * within three RGB points of its own canvas and nobody could say *why* the
 * cards looked flat; `--n-accent-focal` silently resolved to near-black in
 * light themes because it falls back to `--n-primary-action`. Both are
 * arithmetic, so both are checkable — which is the point of doing it here
 * rather than by eye.
 */

const CSS = [primitiveCss, semanticCss, themesCss, appearanceCss].join("\n");

type Declarations = Record<string, string>;

/** Splits top-level `selector { ... }` rules. Nested at-rules are skipped —
 *  none of the blocks we probe live inside one. */
function parseRules(css: string): Array<{ selector: string; declarations: Declarations }> {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const rules: Array<{ selector: string; declarations: Declarations }> = [];
  const pattern = /([^{}]+)\{([^{}]*)\}/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(withoutComments)) !== null) {
    const selector = (match[1] ?? "").replace(/\s+/g, " ").trim();
    if (selector.startsWith("@")) continue;
    const declarations: Declarations = {};
    for (const part of (match[2] ?? "").split(";")) {
      const index = part.indexOf(":");
      if (index === -1) continue;
      const name = part.slice(0, index).trim();
      if (!name.startsWith("--")) continue;
      declarations[name] = part.slice(index + 1).trim();
    }
    rules.push({ selector, declarations });
  }
  return rules;
}

const RULES = parseRules(CSS);

function collect(predicate: (selector: string) => boolean): Declarations {
  const merged: Declarations = {};
  for (const rule of RULES) {
    if (!predicate(rule.selector)) continue;
    Object.assign(merged, rule.declarations);
  }
  return merged;
}

const BASE = collect((s) => s.includes(":root") || s.includes('[data-theme="light"]'));

const LUMEN_LIGHT = collect((s) => s === '[data-noor-appearance="lumen"]');

const LUMEN_DARK = collect(
  (s) => s.includes('data-noor-appearance="lumen"') && s.includes('data-theme="dark"'),
);

function themeBlock(theme: string): Declarations {
  return collect((s) => s === `[data-theme="${theme}"]`);
}

/** Resolves `var(--x, fallback)` chains against a layered set of scopes. */
function resolve(name: string, scopes: Declarations[]): string {
  for (let i = scopes.length - 1; i >= 0; i -= 1) {
    const value = scopes[i]?.[name];
    if (value === undefined) continue;
    const varMatch = /^var\((--[^,)]+)(?:,\s*(.+))?\)$/.exec(value.trim());
    if (!varMatch) return value;
    const inner = resolve(varMatch[1] ?? "", scopes.slice(0, i + 1));
    return inner || varMatch[2] || "";
  }
  return "";
}

type Rgba = { r: number; g: number; b: number; a: number };

function parseColor(value: string): Rgba {
  const trimmed = value.trim();
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(trimmed);
  if (hex) {
    const raw = hex[1] ?? "";
    const digits =
      raw.length === 3
        ? raw
            .split("")
            .map((c) => c + c)
            .join("")
        : raw;
    return {
      r: parseInt(digits.slice(0, 2), 16),
      g: parseInt(digits.slice(2, 4), 16),
      b: parseInt(digits.slice(4, 6), 16),
      a: 1,
    };
  }
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[/,]\s*([\d.]+)\s*)?\)$/i.exec(
    trimmed,
  );
  if (rgb) {
    return {
      r: Number(rgb[1] ?? 0),
      g: Number(rgb[2] ?? 0),
      b: Number(rgb[3] ?? 0),
      a: rgb[4] === undefined ? 1 : Number(rgb[4]),
    };
  }
  throw new Error(`Cannot parse colour: ${value}`);
}

/** Source-over composite of `top` onto an opaque `bottom`. */
function composite(top: Rgba, bottom: Rgba): Rgba {
  return {
    r: top.r * top.a + bottom.r * (1 - top.a),
    g: top.g * top.a + bottom.g * (1 - top.a),
    b: top.b * top.a + bottom.b * (1 - top.a),
    a: 1,
  };
}

function channelLuminance(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance({ r, g, b }: Rgba): number {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

function contrastRatio(a: Rgba, b: Rgba): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}

/** Distance from grey. A token that must stay "chromatic" has to have one. */
function chroma({ r, g, b }: Rgba): number {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

const DARK_THEMES = [
  "dark",
  "github-dark",
  "dracula",
  "one-dark-pro",
  "nord",
  "catppuccin-mocha",
] as const;

const ALL_THEMES = [...DARK_THEMES, "light", "github-light"] as const;

describe("Lumen dark glass composites above its own canvas", () => {
  // The old recipe was rgb(15 23 35 / 0.72) over #080b12, which lands at
  // ~#0d141e. Glass only reads as glass when it is lighter than what is
  // behind it, so every card rendered as a flat black rectangle.
  it.each(DARK_THEMES)("%s: card fill is measurably lighter than the canvas", (theme) => {
    const scopes = [BASE, themeBlock(theme), LUMEN_LIGHT, LUMEN_DARK];
    const canvas = parseColor(resolve("--n-atmosphere-canvas", scopes));
    const fill = composite(parseColor(resolve("--n-material-fill", scopes)), canvas);

    const lift = relativeLuminance(fill) - relativeLuminance(canvas);
    expect(lift).toBeGreaterThan(0);
    // "Measurably": the old values differed by ~0.0009, which is invisible.
    expect(lift).toBeGreaterThan(0.005);
  });

  it.each(DARK_THEMES)("%s: strong fill sits above the regular fill", (theme) => {
    const scopes = [BASE, themeBlock(theme), LUMEN_LIGHT, LUMEN_DARK];
    const canvas = parseColor(resolve("--n-atmosphere-canvas", scopes));
    const fill = composite(parseColor(resolve("--n-material-fill", scopes)), canvas);
    const strong = composite(parseColor(resolve("--n-material-fill-strong", scopes)), canvas);
    expect(relativeLuminance(strong)).toBeGreaterThan(relativeLuminance(fill));
  });

  // Lifting the glass lifts the floor that text sits on, which is how the
  // original fix quietly broke muted copy. Both realistic backdrops are
  // checked: the card itself, and a raised tile stacked on top of it.
  const TEXT_TOKENS = ["--n-text-primary", "--n-text-secondary", "--n-text-muted"] as const;
  const textCases = DARK_THEMES.flatMap((theme) => TEXT_TOKENS.map((token) => ({ theme, token })));

  it.each(textCases)("$theme: $token clears 4.5:1 on the card", ({ theme, token }) => {
    const scopes = [BASE, themeBlock(theme), LUMEN_LIGHT, LUMEN_DARK];
    const canvas = parseColor(resolve("--n-atmosphere-canvas", scopes));
    const fill = composite(parseColor(resolve("--n-material-fill", scopes)), canvas);
    expect(contrastRatio(parseColor(resolve(token, scopes)), fill)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(textCases)("$theme: $token clears 4.5:1 on a raised tile", ({ theme, token }) => {
    const scopes = [BASE, themeBlock(theme), LUMEN_LIGHT, LUMEN_DARK];
    const canvas = parseColor(resolve("--n-atmosphere-canvas", scopes));
    const fill = composite(parseColor(resolve("--n-material-fill", scopes)), canvas);
    const tile = composite(parseColor(resolve("--n-surface-raised", scopes)), fill);
    expect(contrastRatio(parseColor(resolve(token, scopes)), tile)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(DARK_THEMES)("%s: the 1px inset edge survives the lighter fill", (theme) => {
    const scopes = [BASE, themeBlock(theme), LUMEN_LIGHT, LUMEN_DARK];
    const canvas = parseColor(resolve("--n-atmosphere-canvas", scopes));
    const fill = composite(parseColor(resolve("--n-material-fill", scopes)), canvas);
    for (const token of ["--n-material-border", "--n-material-highlight"]) {
      const edge = composite(parseColor(resolve(token, scopes)), fill);
      expect(relativeLuminance(edge) - relativeLuminance(fill)).toBeGreaterThan(0.005);
    }
  });

  it("the reduced-transparency fallback matches the glass composite", () => {
    // Turning transparency off must not undo the fix.
    const scopes = [BASE, themeBlock("dark"), LUMEN_LIGHT, LUMEN_DARK];
    const canvas = parseColor(resolve("--n-atmosphere-canvas", scopes));
    const fallback = parseColor(resolve("--n-material-fallback", scopes));
    const glass = composite(parseColor(resolve("--n-material-fill", scopes)), canvas);
    expect(relativeLuminance(fallback)).toBeGreaterThan(relativeLuminance(canvas));
    for (const channel of ["r", "g", "b"] as const) {
      expect(Math.abs(fallback[channel] - glass[channel])).toBeLessThanOrEqual(4);
    }
  });

  it("light Lumen still lifts (it was never the broken half)", () => {
    const scopes = [BASE, LUMEN_LIGHT];
    const canvas = parseColor(resolve("--n-atmosphere-canvas", scopes));
    const fill = composite(parseColor(resolve("--n-material-fill", scopes)), canvas);
    expect(relativeLuminance(fill)).toBeGreaterThan(relativeLuminance(canvas));
  });
});

describe("--n-accent-interactive is usable in every theme x appearance", () => {
  const combinations = ALL_THEMES.flatMap((theme) =>
    (["default", "lumen"] as const).map((appearance) => ({ theme, appearance })),
  );

  function scopesFor(theme: string, appearance: "default" | "lumen"): Declarations[] {
    const base = [BASE, themeBlock(theme)];
    if (appearance === "default") return base;
    const isDark = (DARK_THEMES as readonly string[]).includes(theme);
    return isDark ? [...base, LUMEN_LIGHT, LUMEN_DARK] : [...base, LUMEN_LIGHT];
  }

  it.each(combinations)("$theme / $appearance is chromatic", ({ theme, appearance }) => {
    const scopes = scopesFor(theme, appearance);
    const accent = parseColor(resolve("--n-accent-interactive", scopes));
    // The whole reason this token exists: --n-accent-focal falls back to
    // --n-primary-action outside Lumen, which is a near-neutral.
    expect(chroma(accent)).toBeGreaterThan(24);
  });

  it.each(combinations)("$theme / $appearance clears 4.5:1 on surface", ({ theme, appearance }) => {
    const scopes = scopesFor(theme, appearance);
    const accent = parseColor(resolve("--n-accent-interactive", scopes));
    const surfaceValue = resolve("--n-surface", scopes);
    const surface = parseColor(surfaceValue);
    const backdrop =
      surface.a === 1
        ? surface
        : composite(surface, parseColor(resolve("--n-atmosphere-canvas", scopes)));
    expect(contrastRatio(accent, backdrop)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(ALL_THEMES)("%s: --n-accent-focal is NOT chromatic outside Lumen", (theme) => {
    // Documents the defect this token exists to work around, so the day
    // --n-accent-focal does become chromatic everywhere, this fails and
    // somebody revisits the split.
    const accent = parseColor(resolve("--n-accent-focal", [BASE, themeBlock(theme)]));
    expect(chroma(accent)).toBeLessThanOrEqual(24);
  });
});

describe("status colour is a token, not a constant", () => {
  it("defaults to success so nothing changes for existing consumers", () => {
    expect(resolve("--n-loaded", [BASE])).toBe(resolve("--n-success", [BASE]));
  });

  it("follows the interactive accent under Lumen", () => {
    const scopes = [BASE, LUMEN_LIGHT];
    expect(resolve("--n-loaded", scopes)).toBe(resolve("--n-accent-interactive", scopes));
  });
});

describe("the atmosphere layer is pinned to the viewport", () => {
  it("uses position: fixed, not absolute", () => {
    const css = appearanceCss.replace(/\/\*[\s\S]*?\*\//g, "");
    const block = /\.n-atmosphere::before\s*\{([^}]*)\}/.exec(css);
    expect(block).not.toBeNull();
    // Absolute made both the glow and the fade mask stretch with the
    // document, so a content-heavy page washed accent colour over its whole
    // top half. See the acceptance check in tests/visual/atmosphere.spec.ts.
    expect(block![1]).toMatch(/position:\s*fixed/);
    expect(block![1]).not.toMatch(/position:\s*absolute/);
  });
});

describe("the default scrollbar never paints an opaque ring", () => {
  const scrollbar = scrollbarCss.replace(/\/\*[\s\S]*?\*\//g, "");

  it("insets the thumb with a transparent border plus padding-box clipping", () => {
    const thumb = /::-webkit-scrollbar-thumb\s*\{([^}]*)\}/.exec(scrollbar);
    expect(thumb).not.toBeNull();
    expect(thumb![1]).toMatch(/background-clip:\s*padding-box/);
    expect(thumb![1]).toMatch(/border:\s*3px solid transparent/);
    // An opaque border here is the original defect: it paints a strip of
    // canvas colour down the inside edge of every translucent panel.
    expect(thumb![1]).not.toMatch(/border:\s*\d+px solid (?!transparent)/);
  });

  it("derives the thumb from currentColor so there is no dark-mode branch", () => {
    expect(scrollbar).toMatch(/scrollbar-color:\s*color-mix\(in srgb, currentColor/);
    expect(scrollbar).toMatch(/background-color:\s*color-mix\(in srgb, currentColor/);
  });

  it("keeps specificity at zero so opting out needs no !important", () => {
    expect(scrollbar).toMatch(/:where\(html, body, body \*\)/);
    expect(scrollbar).not.toMatch(/!important/);
  });

  it("does not reveal the thumb through a universal hover selector", () => {
    // A universal hover rule forces a style recompute along the whole hover
    // chain on every pointer move, which is measurable over a large table.
    expect(scrollbar).not.toMatch(/:where\([^)]*\*\s*\):hover/);
    expect(scrollbar).toMatch(/::-webkit-scrollbar-thumb:hover/);
  });
});

describe("visible surface depth has a sanctioned opt-out", () => {
  const appearance = appearanceCss.replace(/\/\*[\s\S]*?\*\//g, "");

  it("ships .n-surface-none / .n-flatten", () => {
    expect(appearance).toMatch(/\.n-surface-none,\s*\.n-flatten\s*\{/);
  });

  it("zeroes the border width rather than making it transparent", () => {
    const block = /\.n-surface-none,\s*\.n-flatten\s*\{([^}]*)\}/.exec(appearance);
    // A transparent border still occupies a pixel per side and nudges layout.
    expect(block![1]).toMatch(/border-width:\s*0/);
    expect(block![1]).not.toMatch(/border-color:\s*transparent/);
  });
});
