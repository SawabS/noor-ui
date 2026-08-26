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

## Rule: glass must be lighter than what is behind it

Dark Lumen originally set `--n-material-fill: rgb(15 23 35 / 0.72)` over a
`#080b12` canvas. That composites to roughly `#0d141e` — within a couple of
RGB points of the canvas itself, so every card, panel and overlay rendered as
a flat black rectangle. It was arithmetically translucent and visually opaque.

The dark fills are now tuned so the composite sits measurably above the
canvas, with `--n-material-border` and `--n-material-highlight` raised to
match so the 1px inset edge survives the lighter fill.

If you retune these, re-run `src/tokens/appearance.test.ts`. It composites the
fill over `--n-atmosphere-canvas` for every dark theme and asserts both that
the result is lighter and that `--n-text-primary` on it still clears 4.5:1.
Judging this by eye is exactly how it was missed the first time.

`--n-surface-raised` and `--n-surface-tonal` are low-alpha *white tints* in
dark Lumen rather than fixed hexes, so they lift whatever they happen to sit
on. This is a tint, not vibrancy: it involves no `backdrop-filter`, so it is
unaffected by the reduced-transparency handling below.

## Rule: at most two levels of visible surface

The container, and the tiles that hold content. That is the budget.

Any container that takes a surface class becomes another visible rectangle,
which makes it very easy to end up four boxes deep — card ▸ body ▸ panel ▸
metric tile — without meaning to. Pages built that way get reported as
"confusing and uncomfortable to look at", and it is not the individual boxes
that are wrong, it is the stack.

Intermediate layout wrappers must stay transparent. When a wrapper inside a
surface has picked up a fill it should not have, `.n-surface-none` (alias
`.n-flatten`) is the sanctioned way to opt out:

```tsx
<Card surface="material">
  <div className="n-surface-none grid gap-4">
    <StatCard … />
    <StatCard … />
  </div>
</Card>
```

It zeroes the border *width* rather than making the border transparent — a
transparent border still occupies a pixel per side and nudges the layout.

## Selection: one marker that travels

A one-of-N selection should be drawn by a single indicator that moves, not by
each item painting its own background. An item-owned background reads as a
solid slab on a translucent canvas, and switching items looks like "the old
thing turned off and a new thing turned on" rather than a marker moving.

`SegmentedControl` does this internally. For anything else with a one-of-N
selection, compose it yourself:

```tsx
const { trackRef, registerItem, box, ready } = useTravellingMarker(activeId);

<div ref={trackRef} className="n-marker-track">
  <TravellingMarker box={box} ready={ready} />
  {items.map((item) => (
    <button
      key={item.id}
      ref={(el) => registerItem(item.id, el)}
      className="n-marker-item n-ghost-control"
      aria-checked={item.id === activeId}
      role="radio"
    >
      {item.label}
    </button>
  ))}
</div>;
```

Two things worth knowing:

- The marker's radius is derived from the track's, so the two stay
  concentric — a pill marker inside a lightly rounded track leaves four
  visible wedges of empty track at the corners. To change the track's radius,
  set `--n-marker-track-radius` (and `--n-marker-inset` for the padding)
  rather than applying a `rounded-*` utility, or the two will drift apart.
- Hover must tint the **label**, not the background. A hover fill puts a
  second slab behind the travelling marker and the two fight. Under Lumen,
  `n-ghost-control` already does this; classic Noor keeps its background
  hover, where there is no marker to conflict with.

## Overlays: the scrim is the lever, not the panel

`CommandPalette` renders a dimming scrim and then a translucent panel above
it. The scrim starves the panel's `backdrop-filter` — there is nothing left
to pick up — so the panel reads as a flat grey slab.

The fix is to lighten the **scrim** and give the panel the lit top edge cards
have. Do **not** push the panel to `--n-material-fill-strong`: it does read
less grey, but only by becoming nearly opaque, which throws away the
transparency the design depends on. That was tried in a consuming app and
reverted. If a panel still reads flat, reach for the scrim.

The `Popover` arrow is dropped under Lumen. It was filled with an opaque
token while the panel is glass, and it sits outside the panel's
`backdrop-filter` region, so no fill can ever match — it reads as a solid
notch breaking the corner.

## Scrollbars

Noor ships a default scrollbar treatment (`src/tokens/scrollbar.css`), so
consumers no longer have to invent one. The obvious invention insets the
thumb with `border: 2px solid var(--bg)`; because that border is opaque it
paints a strip of canvas colour down the inside edge of every translucent
panel.

The shipped version uses `background-clip: padding-box` behind a *transparent*
border for the same inset with nothing painted behind it, and derives the
thumb from `currentColor` so it inverts with the theme without a dark-mode
branch. Every rule is wrapped in `:where()`, so a component that hides its own
scrollbar wins with a plain class and no `!important`.

It is scoped to the document rather than to an app-shell class on purpose:
overlays, popovers and command palettes render into a portal outside any
shell, and their lists scroll too.

## Bounded rendering

Components that take an array — `DataList`, `SourceCitationList`,
`ConversationSidebar` — accept a `renderCap` (default 250) and show a footer
naming the true total. `Table` is compositional, so cap the array yourself
with `applyRenderCap` and close the body with `TableTruncationRow`.

**Only painting is bounded.** Sorting, filtering, counts and export still run
over the full array. That is precisely what makes this safe: node count stays
flat no matter how much data arrives. In one consuming app, three uncapped
tables produced 150,415 DOM nodes from ~18,000 rows, and because the markup
stays in the document on every route the cost was paid even on pages that
never showed them. Capping took it to 8,612 nodes and long tasks from 916ms
to 514ms — the CPU profile had shown 86% idle throughout, because it was never
JS, it was DOM size.

## Translating non-React content

`I18nProvider` publishes `window.noorI18n` and dispatches a `locale-change`
event, so embedded vanilla-JS, third-party or server-rendered surfaces can
read translations and repaint themselves:

```js
window.addEventListener("locale-change", () => {
  window.noorI18n.apply(document.getElementById("legacy-panel"));
});
```

Tag markup with `data-i18n="key"` for plain text, or `data-i18n-html="key"`
plus `data-i18n-args="a,b"` where the sentence contains markup. Two rules
matter:

- **Never statically label an element the host code writes into.** A
  `data-i18n` label and live data fight over the same node and whichever runs
  last wins, so the bug is intermittent. A dev-mode assertion warns when a
  tagged element's text does not match its resolved translation, which catches
  the indirect form (`el.textContent = value`) that a source scan misses.
- **Mixed content must be one message.** Tagging only the `<strong>` children
  of a sentence leaves the prose around them untranslated, and RTL languages
  reorder clauses, so pre-cut fragments cannot be reassembled. The whole
  paragraph has to be one template with `{n}` slots — that is what
  `data-i18n-html` is for.

Pass numbers raw and let `interpolate` format them; only the React layer knows
the active locale. Message values are written with `textContent`, which does
not decode HTML entities, so copy lifted out of markup is run through
`decodeHtmlEntities` on the way in — otherwise `&middot;` prints literally.

To prove the wiring independently of whether any copy has been translated,
swap the lookup for one that returns `«key»` and repaint: every tagged element
should show its own key.

## Interactive accent and status colour

Use `--n-accent-interactive` for hover tints, selection markers, focus and
loaded states. It is guaranteed chromatic and >= 4.5:1 on its theme's surfaces
in every appearance.

Do **not** reach for `--n-accent-focal` outside Lumen: it falls back to
`--n-primary-action`, which is near-black in light themes and near-white in
dark ones. Under Lumen the two are deliberately the same value.

`--n-loaded` is the success/loaded colour. It defaults to `--n-success`, so
nothing changes outside Lumen; under Lumen it follows the interactive accent
so confirmation shares one colour with the rest of the interactive language.
Whether confirmation reads as green or as the accent is a design decision per
product, which is why it is a token and not a constant.

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
