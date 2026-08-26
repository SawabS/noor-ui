# Changelog

All notable changes to Noor UI are recorded here. Entries marked **visual
default** change how existing markup renders without any code change on the
consumer's side.

## Unreleased

Folds back the defects a consuming app (KI Dashboard) had to work around while
shipping a full Lumen glass front-end. Every item below was driven by an
observed defect rather than by taste, and the reasoning is carried into the
code comments so a future maintainer does not simplify the fix away.

No public API was removed or changed incompatibly. Everything here is either an
additive prop, a new export, or an internal fix.

### Fixed

- **visual default — dark Lumen glass is no longer darker than its own canvas.**
  `--n-material-fill` was `rgb(15 23 35 / 0.72)` over a `#080b12` canvas, which
  composites to about `#0d141e` — within a couple of RGB points of the canvas
  itself. Glass only reads as glass when it is lighter than what sits behind
  it, so in dark mode every card, panel and overlay rendered as a flat black
  rectangle. Retuned to `rgb(38 51 72 / 0.55)` (composites to ~`#18212f`), with
  `--n-material-fill-strong`, `--n-material-border` and `--n-material-highlight`
  raised to match so the 1px inset edge survives the lighter fill.
  `--n-surface-raised` and `--n-surface-tonal` in dark Lumen are now low-alpha
  white tints rather than fixed hexes, so they lift whatever they sit on.
  `--n-material-fallback` moved to `#18212f` so reduced-transparency mode
  renders the same value the glass composites to. Asserted in
  `src/tokens/appearance.test.ts` for every dark theme, including a 4.5:1 check
  on `--n-text-primary`. The light calibration is unchanged; it was never the
  broken half.
- **visual default — `.n-atmosphere::before` is pinned to the viewport.** It was
  `position: absolute` with the glow sized `100% 100%`, so both the gradient
  and the fade mask stretched with the element. On a short page that is a tidy
  vignette; on a content-heavy page it became a wash of accent colour over the
  top half of the entire document, fading out far below the fold — the shell
  visibly changed the moment a dataset loaded. Now `position: fixed`, which
  also stops the browser repainting a multi-screen gradient on every scroll.
  `z-index: -1` and `isolation: isolate` are unaffected.
- **visual default — `SegmentedControl` no longer paints an opaque active
  segment.** The active segment carried `bg-surface`, which reads as a solid
  black block on a translucent canvas, and selection jumped between segments
  with no shared indicator. Selection is now drawn by a travelling marker (see
  below).
- **Overlay panels no longer flatten over their own scrim.** A dimming scrim
  starves the panel's `backdrop-filter`, so `CommandPalette` read as a flat
  grey slab. Under Lumen the scrim is lightened and the panel gets the lit top
  edge cards have. The panel's own fill is deliberately untouched: pushing it
  to `--n-material-fill-strong` only looks better by making it nearly opaque,
  which throws away the transparency the design depends on.
- **visual default — the `Popover` arrow is dropped under Lumen.** It was filled
  with the opaque `fill-surface` while the panel is translucent glass, and it
  sits outside the panel's `backdrop-filter` region so it can never match — it
  read as a solid notch breaking the corner. Classic Noor is unchanged.

### Added

- **`TravellingMarker` and `useTravellingMarker`** (`noor-ui`) — a shared
  selection indicator that moves between items instead of each item painting
  its own background. `SegmentedControl` uses it internally; the primitive is
  exported for any other one-of-N selection. It measures both axes (so one code
  path covers horizontal, vertical, and a horizontal group that wraps), measures
  in `useLayoutEffect` before paint, re-measures on `ResizeObserver` and
  `document.fonts.ready`, and stays disarmed while the active item has a zero
  box. The marker is `aria-hidden`; `aria-checked` announces state.
- **`SegmentedControl` gains `orientation="horizontal" | "vertical"`** and sets
  `aria-orientation`. Only the horizontal arrow keys flip under RTL.
- **visual default — under Lumen, `ghost` hover tints the label rather than the
  background** (`Button`, `IconButton`, segments). A background fill on hover
  puts a second slab behind the travelling marker and the two fight. Classic
  Noor keeps its existing hover.
- **A default scrollbar treatment** (`src/tokens/scrollbar.css`). Noor shipped
  no scrollbar opinion, so every consumer invented one — and the obvious
  invention insets the thumb with an opaque border, which paints a strip of
  canvas colour down the inside edge of every translucent panel. The shipped
  version uses `background-clip: padding-box` behind a transparent border,
  derives the thumb from `currentColor` so it inverts with the theme, and is
  wrapped in `:where()` so opting out needs no `!important`.
- **`.n-surface-none` / `.n-flatten`** — zeroes fill, border and shadow on an
  intermediate layout wrapper, so nesting can be kept to the documented two
  levels of visible surface. Uses `border-width: 0` rather than a transparent
  border, which would still occupy a pixel per side.
- **`--n-accent-interactive` / `--n-accent-interactive-contrast`** — a
  guaranteed-chromatic accent for hover tints, selection markers, focus and
  loaded states. `--n-accent-focal` could not serve this role: outside Lumen it
  falls back to `--n-primary-action`, which is near-black in light themes and
  near-white in dark ones. Each theme supplies its own in-palette value, and
  every theme × appearance combination is asserted chromatic and >= 4.5:1.
- **`--n-loaded`** — success/loaded colour as a token rather than a constant.
  Defaults to `--n-success`, so nothing changes outside Lumen; under Lumen it
  follows `--n-accent-interactive` so confirmation shares one colour with the
  rest of the interactive language.
- **`ToastProvider surface="bloom"`** — a toast that is not a box: a label plus
  a soft radial bloom in `currentColor`, no background, border or shadow.
  Because every layer derives from `currentColor`, one rule covers all
  variants. The treatment lives inside
  `@media not all and (forced-colors: active)`, so the solid box returns under
  forced colours, where a glow conveys nothing.
- **An i18n bridge for non-React content** — `I18nProvider`, `useI18n` and
  `useStaticTranslations` (`noor-ui/providers`), plus
  `applyStaticTranslations`, `auditStaticTranslations`, `interpolate`,
  `escapeHtml` and `decodeHtmlEntities` (`noor-ui`). The provider publishes
  `window.noorI18n` and dispatches a `locale-change` event so embedded
  vanilla-JS, third-party and server-rendered surfaces can read translations
  and repaint. `data-i18n` sets `textContent`; `data-i18n-html` with
  `data-i18n-args` escapes the template and then fills positional `{n}` slots
  with caller-supplied HTML. Numbers are passed raw and formatted at render,
  since only the React layer knows the active locale. Ships a dev-mode
  assertion that warns when a `[data-i18n]` element's text does not match its
  resolved translation, which is how a statically-labelled node that host code
  also writes into gets caught.
- **`renderCap` on array-driven components** — `DataList`,
  `SourceCitationList` and `ConversationSidebar`, plus `applyRenderCap` /
  `formatRenderCapNotice` utilities and a `TableTruncationRow` for the
  compositional `Table`. Default cap is 250 rows with a footer naming the true
  total. Only painting is bounded: sorting, filtering, counts and exports still
  run over the full array, which is what keeps node count flat as input grows.
- **An RTL lint rule** — `no-restricted-syntax` flags physical `left-*`,
  `right-*`, `pl-*`, `pr-*`, `ml-*`, `mr-*`, `border-l*`, `border-r*`,
  `rounded-l*`, `rounded-r*`, `text-left` and `text-right` utilities in favour
  of their logical equivalents. A toast pinned with `right: 20px` stayed
  bottom-right in RTL; nothing in `src/` trips the rule today, and the rule is
  what keeps it that way.

### Docs

- `docs/lumen.md` — dark-glass rule, the two-levels-of-surface depth rule,
  scrollbars, overlay scrim guidance, and the i18n bridge.
- `docs/accessibility.md` — RTL logical properties, reduced motion on the new
  animated primitives, forced-colors fallbacks, and the composable-animation
  rule.

## 0.2.0-lumen.0

- Initial Noor Lumen appearance profile: atmosphere, focal accent, translucent
  chrome, calibrated elevation, and `AppearanceProvider`.
