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
