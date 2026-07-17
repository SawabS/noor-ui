# Dark mode guidance

## How theming works

Theme switching is driven entirely by a `data-theme="light" | "dark" | "system"`
attribute and semantic CSS custom properties - no component ever branches on
theme in JS or ships a `dark:` Tailwind variant. `src/tokens/semantic.css`
defines the light-theme values as the default; `src/tokens/themes.css`
overrides the same variable *names* under `[data-theme="dark"]`. Because
components only ever consume the semantic names (`bg-canvas`,
`text-text-primary`, etc.), swapping the attribute is the entire theme
switch - no re-render logic, no prop drilling.

```tsx
import { ThemeProvider } from "noor-ui/providers";

<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>
```

`ThemeProvider`:

- Resolves `"system"` against `prefers-color-scheme` and keeps it in sync if
  the OS setting changes while the app is open.
- Persists the user's explicit choice to `localStorage` (key
  `noor-ui-theme` by default; pass `storageKey={null}` to disable, or a
  custom key to namespace it).
- Supports controlled usage (`theme` prop) if you're driving theme from your
  own app state instead.
- Defaults to `scope="root"`, writing `data-theme` onto `<html>` so the
  whole document themes consistently - including anything rendered outside
  React (portals, `<body>` background). Pass `scope="scoped"` to instead
  wrap children in a themed `<div>`, useful for rendering light and dark
  side-by-side (Noor's own token showcase page does this).

`useTheme()` exposes `{ theme, resolvedTheme, setTheme }` - `theme` is
whatever was set (including `"system"`), `resolvedTheme` is always
`"light"` or `"dark"`. `ThemeToggle` is a ready-made control that cycles
light → dark → system.

## Guidance for consumers extending the system

- **Never hardcode a color per theme in your own components.** If you need a
  new semantic role (e.g. a brand-specific accent), add it as a token in
  `semantic.css`/`themes.css` following the existing pattern, not as a
  conditional `resolvedTheme === "dark" ? "#fff" : "#000"` in JS.
- **Contrast is verified per theme independently**, not derived - dark mode
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
