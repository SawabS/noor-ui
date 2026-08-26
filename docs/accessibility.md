# Accessibility guidelines

Noor targets **WCAG 2.2 AA** as a baseline across every component.

## Baseline requirements every component meets

- **Keyboard operability.** Every interactive element is reachable and
  operable via keyboard alone. Overlays (Dialog, Drawer, Popover,
  DropdownMenu, ContextMenu, CommandPalette) trap focus while open and
  restore it to the trigger on close - this is inherited from Radix UI
  primitives, not reimplemented.
- **Visible focus.** A consistent 2px focus ring (`focus-ring` token) with a
  2px offset against the canvas is applied via
  `focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`
  - `:focus-visible` rather than `:focus` so mouse clicks don't show a ring
  that keyboard navigation needs.
- **Accessible names.** Icon-only controls (`IconButton` and anything built
  on it, like `ThemeToggle`) require an `aria-label` prop at the type level
  - omitting it is a TypeScript error, not just a lint warning.
- **Minimum target size.** WCAG 2.2's 2.5.8 (AA) target size guidance is met
  by ensuring the *hit area* of compact controls (checkboxes, radios,
  switches) reaches ~44px via label padding, even where the visual control
  stays small per the compact-control design direction.
- **Color is never the only signal.** Status is paired with an icon and/or
  text label (e.g. `Alert` always pairs its semantic color with a matching
  icon and, typically, a text description) - never color alone.
- **Reduced motion.** `prefers-reduced-motion: reduce` is honored globally
  (`src/tokens/motion.css`); only functionally essential motion (a loading
  spinner) opts back in via `data-motion-safe`.
- **Live regions for async state.** Streaming/loading text uses
  `aria-live="polite"` (e.g. `StreamingIndicator`, `ResearchProgress`) so
  screen reader users get updates without a flood of interruptions; urgent
  errors use `role="alert"` instead.

## Component-specific notes

- **Dialog / Drawer** - always require a `title` (visually hidden via
  `VisuallyHidden` if the design doesn't want it shown) because Radix warns,
  correctly, that a dialog without an accessible name is a trap for screen
  reader users.
- **Select / RadioGroup / Checkbox / Switch** - full keyboard support
  (arrow keys, space/enter) comes from the underlying Radix primitive.
- **Tooltip** - content is not the only place to put essential information;
  tooltips don't show on focus-only for touch devices, so critical info
  needs a visible affordance elsewhere too.
- **Toast** - uses `aria-live` via Radix's `Toast.Provider`, and supports
  swipe-to-dismiss without removing keyboard/screen-reader dismissal.
- **Table** - always has real `<th>` header cells with implicit scope; wide
  tables scroll in their own `overflow-x-auto` container rather than
  breaking the page layout on mobile (also required by the responsive
  guidance below).

## Direction: logical properties, always

Physical inset and spacing utilities do not mirror. A toast pinned with
`right: 20px` stayed bottom-right in Arabic and Sorani; the logical
`inset-inline-end` follows the writing direction for free.

Use `start`/`end`, `ps`/`pe`, `ms`/`me`, `border-s`/`border-e`,
`text-start`/`text-end`, and `inset-inline-*` rather than their `left`/`right`
counterparts. An ESLint `no-restricted-syntax` rule enforces this over class
strings; nothing in `src/` trips it today, and the rule is what keeps it that
way. Stories and tests are exempt, because they sometimes name a physical
direction deliberately in order to assert that a layout mirrored.

Two places where physical really is correct, and are commented as such:

- Radix `side="left" | "right"` props. Those are physical placements and Radix
  mirrors them itself.
- `.n-marker`'s `top: 0; left: 0`. The travelling marker is positioned by
  `transform: translate()` from `offsetLeft`/`offsetTop`, which are physical.
  Anchoring at the physical origin is exactly what lets one code path serve
  both directions with no `dir` branch — switching it to `inset-inline-start`
  would break RTL, not fix it.

Arrow-key navigation mirrors on the **horizontal axis only**. `ArrowLeft`
advances in an RTL `SegmentedControl`, but `ArrowDown` still means "down" in
every writing direction; mirroring the vertical axis reverses vertical groups
for Arabic and Sorani readers for no reason.

## Motion

Every animated primitive keeps its affordance and drops the travel under
`prefers-reduced-motion: reduce`. The travelling selection marker still lands
on the selected item, it just arrives instantly.

**Two independent animations must sit on separate elements.** Adding to an
element's `animation` list on hover restarts the animations already in it and
snaps them back to their start — so a continuous spin plus a hover swell on
one element produces a visible glitch every time the pointer enters. Put the
spin on the child and the swell on the parent. This is not obvious from the
spec and it has bitten a consuming app.

## Forced colours

`@media (forced-colors: active)` removes blur, shadows, glow and the
decorative atmosphere, and restores system colours. Two newer primitives need
their own fallback, because what they use to convey meaning stops existing:

- **The selection marker** swaps its tinted fill for a `CanvasText` ring. A
  colour wash conveys nothing when the system is picking the colours.
- **The bloom toast** (`ToastProvider surface="bloom"`) is defined entirely
  inside `@media not all and (forced-colors: active)`. The component still
  emits the normal box classes underneath, so under forced colours the strip
  simply does not apply and the solid box comes back — one code path, no
  branch.

The default scrollbar hands `scrollbar-color` back to `auto` under forced
colours, so the system's own bar is used rather than a `currentColor` mix.

## Testing checklist (see `docs/../src/**/*.test.tsx` for automated coverage)

- [ ] Tab through the component with no mouse - can you reach and operate
      every control?
- [ ] Does every icon-only control announce a name via a screen reader?
- [ ] Does `Escape` close every overlay, and does focus return to the
      trigger?
- [ ] Does the component look correct - and still make sense - at 200% text
      zoom?
- [ ] Does the component work with `prefers-reduced-motion: reduce`
      enabled?
- [ ] Does the component read correctly in a screen reader with `dir="rtl"`
      and `lang="ar"`/`lang="ckb"` set?
- [ ] Does it still convey its state under `forced-colors: active`, without
      relying on a fill, glow or shadow?
- [ ] If it renders a caller-supplied array, does it bound what it paints —
      and does it still report the *full* count?
