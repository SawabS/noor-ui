# Color theme guidance

## How theming works

Theme switching is driven entirely by a `data-theme` attribute and semantic
CSS custom properties - no component ever branches on
theme in JS or ships a `dark:` Tailwind variant. `src/tokens/semantic.css`
defines the Noor light values as the default; `src/tokens/themes.css`
overrides the same variable _names_ for every named palette. Because
components only ever consume the semantic names (`bg-canvas`,
`text-text-primary`, etc.), swapping the attribute is the entire theme
switch - no re-render logic, no prop drilling.

```tsx
import { ThemeProvider } from "noor-ui/providers";

<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>;
```

`ThemeProvider`:

- Resolves `"system"` against `prefers-color-scheme` and keeps it in sync if
  the OS setting changes while the app is open.
- Persists the user's explicit choice to `localStorage` (key
  `noor-ui-theme` by default; pass `storageKey={null}` to disable, or a
  custom key to namespace it).
- Supports the built-in `light`, `dark`, `github-light`, `github-dark`,
  `dracula`, `one-dark-pro`, `nord`, and `catppuccin-mocha` palettes, plus
  `system`.
- Supports controlled usage (`theme` prop) if you're driving theme from your
  own app state instead.
- Defaults to `scope="root"`, writing `data-theme` onto `<html>` so the
  whole document themes consistently - including anything rendered outside
  React (portals, `<body>` background). Pass `scope="scoped"` to instead
  wrap children in a themed `<div>`, useful for rendering palettes
  side-by-side (Noor's own token showcase page does this).

`useTheme()` exposes `{ theme, activeTheme, resolvedTheme, setTheme }`.
`theme` is the saved choice, `activeTheme` is the concrete palette applied
to the DOM, and `resolvedTheme` is its `"light"` or `"dark"` browser color
scheme. `ThemeToggle` remains a compact light → dark → system control;
`ThemePicker` exposes every palette.

```tsx
import { ThemePicker } from "noor-ui";

<ThemePicker aria-label="Color theme" />;
```

The named palettes are adapted from their canonical colors to Noor's semantic
surface, text, border, action, focus, and status roles. The source references
are [GitHub Primer](https://primer.style/product/primitives/),
[Dracula](https://github.com/dracula/dracula-theme),
[One Dark Pro](https://github.com/Binaryify/OneDark-Pro),
[Nord](https://www.nordtheme.com/docs/colors-and-palettes/), and
[Catppuccin](https://github.com/catppuccin/palette).

## Guidance for consumers extending the system

- **Never hardcode a color per theme in your own components.** If you need a
  new semantic role (e.g. a brand-specific accent), add it as a token in
  `semantic.css`/`themes.css` following the existing pattern, not as a
  conditional `resolvedTheme === "dark" ? "#fff" : "#000"` in JS.
- **Contrast is verified per theme independently**, not derived - a dark theme
  is not simply light mode inverted. The dark palette uses slightly softer
  absolute contrast at the surface-elevation steps (since dark UIs read as
  "brighter than they measure" perceptually) while keeping text contrast at
  or above the same AA thresholds as light mode.
- **Elevation** in dark mode leans more on the surface tone ladder
  (`surface` → `surface-raised` → `surface-hover` → `surface-active`, each a
  step lighter) than on shadows, since shadows read poorly against a dark
  canvas. Don't compensate by adding a darker shadow - lean on the next
  surface step instead.
- **Images and rich embeds** (avatars, screenshots inside `ArtifactPanel`,
  attachment previews) generally shouldn't be re-tinted for dark mode; just
  make sure the surface they sit on has enough contrast against their own
  edges - a 1px `border-border` around embedded imagery is usually enough.

## Testing

Use the **Theme** toolbar control in Storybook to flip any story between
light and dark without a dedicated story. Components that hardcode a color
(a regression, not an intended pattern) will visibly fail to adapt - that's
the fastest way to catch a raw-hex slip in review.
