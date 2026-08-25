# Noor Design System

## Principles

1. **Restraint is the default.** The classic Noor appearance keeps large areas
   of negative space, low visual noise, neutral surfaces, and status-driven
   color. Noor Lumen is an explicit alternative profile: it adds a separate
   focal accent, one static atmospheric glow, and selected material surfaces
   without changing the default rendering.
2. **Tonal hierarchy, not heavy shadows.** Elevation is expressed mostly
   through background tone steps (`canvas` → `surface` → `surface-raised` →
   `surface-hover` → `surface-active`) and thin borders. Shadows exist
   (`shadow-xs` through `shadow-lg`) but stay subtle - reserved for overlays
   that must visually separate from the page (dialogs, popovers, dropdowns).
3. **Strong contrast where it matters.** Primary actions get true black/white
   contrast (`primary-action` / `primary-action-text`) so the one thing the
   user should do next is unambiguous, while everything else stays quiet.
4. **Compact, rounded, not pill-obsessed.** Controls use a modest radius
   scale (`radius-xs` 6px → `radius-xl` 24px); only a few things - badges,
   avatars, the segmented-control thumb - are fully pill-shaped
   (`radius-pill`). Not every element is a pill.
5. **Semantic tokens only.** Component files never reference a hex value or
   a primitive token directly. Every visual property resolves through a
   semantic CSS custom property, so retheming (including a future brand
   reskin) never touches component code - only `src/tokens/*.css`.
6. **Multilingual and RTL by default, not bolted on.** Every layout-affecting
   utility uses logical properties (`ms-`/`me-`/`start-`/`end-` rather than
   `ml-`/`mr-`/`left-`/`right-`), and the type scale is tuned generously so
   Arabic and Kurdish (Sorani) script - which stacks diacritics taller than
   Latin text - never clips.
7. **Accessible by construction.** Interactive primitives are built on Radix
   UI where interaction logic is non-trivial (dialogs, menus, tooltips,
   selects, tabs, accordions), inheriting correct focus management, keyboard
   navigation and ARIA wiring rather than reimplementing it.
8. **Material has a job.** Under Lumen, translucency is reserved for app
   chrome, transient overlays, and the flagship composer. Dense content,
   agent status, code, and tables stay solid or tonal. Every material surface
   has an opaque fallback and respects reduced transparency and forced colors.

## Token reference (summary)

See [`docs/tokens.md`](./docs/tokens.md) for the full reference; source of
truth is always `src/tokens/*.css`.

- **Color** - `src/tokens/primitive.css` (raw ramp) →
  `src/tokens/semantic.css` (light defaults) → `src/tokens/themes.css`
  (palette overrides) → `src/tokens/appearance.css` (opt-in appearance
  overrides and recipes). Components only ever import semantic names:
  `canvas`, `sidebar`, `surface`/`surface-raised`/`surface-hover`/`surface-active`,
  `text-primary`/`text-secondary`/`text-muted`, `border`/`border-strong`,
  `primary-action`/`primary-action-text`, `focus-ring`,
  `success`/`warning`/`danger`/`info` (+ `-bg` tonal variants).
- **Typography** - `src/tokens/typography.css`. Scale: `caption` (11px) →
  `label` (12px) → `body-sm` (13px) → `body` (15px) → `body-lg` (17px) →
  `heading-sm` (20px) → `heading-md` (24px) → `heading-lg` (30px) →
  `display` (40px). Font stack leads with IBM Plex Sans / IBM Plex Sans
  Arabic / Noto Sans Arabic before falling back to system UI fonts.
- **Spacing** - `src/tokens/spacing.css`, 4px base scale (`0.5` = 2px through
  `24` = 96px), plus geometry: radii (`xs` 6px → `xl` 24px, `pill`), border
  widths, shadows, opacity, z-index layers, control heights (`sm` 32px /
  `md` 40px / `lg` 48px), content widths, breakpoints.
- **Motion** - `src/tokens/motion.css`. Durations `instant` (80ms) →
  `slow` (260ms), three easing curves (`standard`/`enter`/`exit`). A global
  `prefers-reduced-motion` rule collapses all animation/transition duration
  to near-zero except elements explicitly marked `data-motion-safe`
  (functional indicators like the loading `Spinner`).

## Component inventory

**Foundations** - `ThemeProvider`, `DirectionProvider`, `ThemeToggle`,
`AppearanceProvider`, `Typography`, `Icon`, `VisuallyHidden`, `Separator`,
`Skeleton`, `Spinner`

**Inputs** - `Button`, `IconButton`, `Input`, `Textarea`, `SearchInput`,
`Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `FormField`, `Label`,
`FileUpload`, `SegmentedControl`

**Feedback** - `Alert`, `Badge`, `Toast`, `Tooltip`, `Progress`,
`EmptyState`, `ErrorState`

**Overlays** - `Dialog`, `Drawer`, `Popover`, `DropdownMenu`, `ContextMenu`,
`CommandPalette`

**Navigation** - `Tabs`, `Breadcrumbs`, `Pagination`, `Sidebar`,
`SidebarItem`, `TopNavigation`, `UserMenu`

**Data display** - `Card`, `Avatar`, `Table`, `DataList`, `Accordion`,
`CodeBlock`, `MarkdownContent`, `Citation`, `StatCard`

**AI-product** - `ChatLayout`, `ConversationSidebar`, `ConversationItem`,
`MessageList`, `UserMessage`, `AssistantMessage`, `SystemMessage`,
`ReasoningBlock`, `ToolCallCard`, `SourceCitationList`, `PromptComposer`,
`ComposerToolbar`, `AttachmentChip`, `ModelSelector`, `ModeSelector`,
`SuggestedPrompt`, `WelcomeScreen`, `ArtifactPanel`, `ResearchProgress`,
`StreamingIndicator`

## The composer is the flagship surface

`PromptComposer` gets disproportionate design attention because it's the
single most-used control in an AI product: multiline auto-growing textarea,
attachment button, an optional research/web-search mode toggle, model
selector, submit button, and full disabled/loading/streaming state coverage,
with a restrained rounded container (`radius-lg`/`xl`, `shadow-xs`/`sm` -
never a heavy drop shadow) and a subtle border rather than a loud outline.

## What this system deliberately avoids

Classic Noor avoids large drop shadows, glass/blur panels, decorative
gradients, blue-as-brand, pill-shaping everything, and dense dashboard-style
compression. Lumen selectively relaxes only the blur and focal-accent rules;
it still avoids blur on every card, animated particles, parallax, neon
outlines, low-contrast translucent content, and full-viewport blur.
