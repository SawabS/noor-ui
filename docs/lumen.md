# Noor Lumen

Noor Lumen is an opt-in appearance profile for focused AI applications. It
adds quiet atmospheric depth, a focal accent, selected translucent chrome,
and calibrated elevation while keeping classic Noor as the compatible
default.

## Setup

Import the package stylesheet once, then compose appearance independently
from theme and direction:

```tsx
import { AppearanceProvider, DirectionProvider, ThemeProvider } from "noor-ui/providers";
import "noor-ui/styles.css";

<ThemeProvider defaultTheme="system">
  <AppearanceProvider defaultAppearance="lumen">
    <DirectionProvider defaultDirection="ltr">
      <App />
    </DirectionProvider>
  </AppearanceProvider>
</ThemeProvider>;
```

Without `AppearanceProvider`, or with `appearance="default"`, existing Noor
rendering is unchanged. `AppearanceProvider` supports controlled and
uncontrolled appearance/transparency values, callbacks, nullable or custom
persistence keys, and `scope="root" | "scoped"`. Root mode writes
`data-noor-appearance` and `data-noor-transparency` to `<html>`; scoped mode
wraps children for previews and nested product areas.
Composed Radix overlays automatically portal into the nearest scoped
appearance boundary so they inherit both appearance and any surrounding
scoped theme tokens.

## Choosing a surface

`SurfaceVariant` is `"solid" | "tonal" | "material" | "elevated"`.

- Use `solid` for dense copy, tables, code, and high-contrast content.
- Use `tonal` for agent activity, secondary groups, and quiet hierarchy.
- Use `material` for selected chrome or focal elevated controls over an
  atmospheric background.
- Use `elevated` for opaque floating content that needs spatial separation.
- Composed overlays default to `surface="auto"`: classic Noor keeps its
  current styling; Lumen selects its material recipe.

`Card` and `StatCard` default to `solid`. `TopNavigation` supports `auto`,
`solid`, and `material`. Dialog, Drawer, Popover, DropdownMenu, ContextMenu,
CommandPalette, Tooltip, and ToastProvider accept the shared overlay surface.

## Transparency and browser fallback

Material CSS starts with `--n-material-fallback`. Backdrop blur is enabled
only inside `@supports`. It is removed when either the OS reports
`prefers-reduced-transparency: reduce` or the provider sets
`transparency="reduce"`. Forced-colors mode also removes blur, shadows, glow,
and the decorative atmosphere. No content depends on transparency to remain
legible.

## Accessibility and internationalization

- Lumen keeps the existing Radix focus/keyboard/ARIA behavior.
- Focus glow supplements, rather than replaces, the visible focus ring.
- Atmosphere pseudo-elements are non-interactive, outside document flow, and
  absent from the accessibility tree.
- Motion remains native CSS and collapses under `prefers-reduced-motion`.
- Layout continues to use logical start/end properties; mobile sidebars and
  artifacts should be composed with `Drawer`, as shown by
  `LumenWorkspaceExample`.
- Verify English, Arabic, and Kurdish/Sorani in both LTR and RTL; do not lower
  line-height around Arabic-script diacritics.

## Migration

1. Upgrade to the `0.2.0-lumen.0` prerelease.
2. Mount `AppearanceProvider` with its default settings; confirm no visual
   change.
3. Enable Lumen in a scoped preview and test every supported color theme.
4. Adopt `surface="auto"` on overlays and explicit surface variants only
   where hierarchy requires them.
5. Run typecheck, unit tests, lint, builds, and visual tests before enabling
   Lumen for users.

No runtime dependency, Tailwind major-version change, or component-foundation
migration is part of Lumen.
