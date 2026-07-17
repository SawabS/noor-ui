# Contributing to Noor UI

## Project layout

```
src/
  components/
    primitives/    Foundations: Icon, Typography, Separator, Skeleton, Spinner, ThemeToggle
    inputs/        Button, Input, Select, Checkbox, ...
    feedback/       Alert, Badge, Toast, Tooltip, Progress, ...
    overlays/       Dialog, Drawer, Popover, DropdownMenu, ...
    navigation/     Tabs, Breadcrumbs, Sidebar, ...
    data-display/   Card, Avatar, Table, CodeBlock, ...
    ai/             ChatLayout, PromptComposer, MessageList, ...
  foundations/      Cross-cutting foundation types/constants shared across components
  tokens/           *.css token layers + tokens/index.ts manifest
  providers/        ThemeProvider, DirectionProvider
  hooks/            useMediaQuery, useControllableState, useAutosizeTextarea, ...
  utilities/        cn() and other small helpers
  examples/         Full example screens (welcome, chat, research, settings) + showcase
  index.ts          Public barrel export
```

## Conventions

- **One file per component**, named `ComponentName.tsx`, living directly in
  its category folder, with a colocated `ComponentName.stories.tsx`. Compound
  components (e.g. `Card` + `CardHeader`/`CardTitle`/...) live in the same
  file as named exports alongside the default export.
- **Styling**: Tailwind utility classes only, composed with `cn()` from
  `src/utilities/cn.ts` (clsx + tailwind-merge). Variant logic goes through
  `class-variance-authority` (`cva`). **Never** write a raw hex value or an
  arbitrary pixel color in a component file — every color, radius, spacing,
  shadow, motion and z-index value must resolve to a token defined in
  `src/tokens/*.css` (via the Tailwind theme mapping in `tailwind.config.ts`,
  or `bg-[var(--n-token-name)]` arbitrary-value syntax if no Tailwind utility
  exists yet for it — and if you hit that case, prefer extending
  `tailwind.config.ts` instead so the token gets a reusable utility name).
- **Accessibility non-negotiables**: every interactive primitive needs a
  visible `focus-visible` ring (the shared pattern is
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`),
  a real accessible name (visible label, or `aria-label` for icon-only
  controls), and keyboard operability. Prefer a Radix UI primitive over a
  hand-rolled interaction pattern whenever focus trapping, roving tabindex,
  or ARIA state wiring is involved (dialogs, menus, tooltips, selects, tabs,
  accordions, popovers).
- **RTL**: use logical Tailwind utilities (`ms-`/`me-`, `ps-`/`pe-`,
  `start-`/`end-`, `border-s-`/`border-e-`) instead of directional ones
  (`ml-`/`mr-`, `left-`/`right-`). Directional icons (chevrons, arrows) that
  must flip under RTL use the `rtl:rotate-180` utility rather than swapping
  the icon component. Never assume LTR text order in layout logic.
- **Motion**: respect `prefers-reduced-motion` — it's handled globally in
  `src/tokens/motion.css`, but any animation that's functionally essential
  (a loading spinner, not a slide-in transition) needs an explicit
  `data-motion-safe` attribute to opt out of the global kill-switch.
- **TypeScript**: strict mode is on, including `noUnusedLocals`,
  `noUnusedParameters`, and `noUncheckedIndexedAccess`. Components that
  forward a ref use `React.forwardRef` and set `displayName`.

## Adding a component

1. Pick the right category folder (see the layout above).
2. Write `ComponentName.tsx` following the conventions above — look at
   `src/components/inputs/Button.tsx` as the canonical reference
   implementation.
3. Write `ComponentName.stories.tsx` (Storybook 8, CSF3, `tags: ["autodocs"]`)
   covering: default state, all variants, disabled/loading where
   applicable, and an RTL story if the component has any direction-sensitive
   layout.
4. Add tests in `ComponentName.test.tsx` for behavior that isn't just visual
   — keyboard interaction, focus management, controlled/uncontrolled state.
5. Export it from the category's `index.ts` barrel and, transitively, from
   `src/index.ts`.
6. Run `npm run typecheck && npm run test && npm run lint` before opening a
   PR.

## Adding or changing a token

Tokens are the single source of truth for visual language — never patch a
one-off value into a component. If an existing token doesn't fit:

1. Add the primitive (if it's a genuinely new raw value) to
   `src/tokens/primitive.css`.
2. Add or update the semantic mapping in `src/tokens/semantic.css` (light
   default) and `src/tokens/themes.css` (dark override).
3. Wire it into `tailwind.config.ts` under `theme.extend` so it gets a
   utility class.
4. Update `src/tokens/index.ts` (the programmatic manifest) and
   `docs/tokens.md`.

## Commit style

Small, focused commits. Describe the *why*, not just the *what* — the diff
already shows what changed.
