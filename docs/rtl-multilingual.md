# RTL and multilingual guidance

Noor is built for English, Kurdish (Sorani, Arabic script), and Arabic
interfaces from the ground up — RTL is a first-class layout mode, not a
mirrored afterthought.

## Turning on RTL

```tsx
import { DirectionProvider } from "noor-ui/providers";

<DirectionProvider defaultDirection="rtl">
  <App />
</DirectionProvider>
```

`DirectionProvider` wraps Radix UI's own `DirectionProvider`, so every
Radix-based primitive (Dialog, DropdownMenu, Select, Tooltip, Popover,
Tabs, Accordion, ContextMenu, ...) automatically mirrors its interaction
logic — content alignment, arrow-key traversal direction, slide-in edges —
with no per-component configuration. By default it also writes
`dir="rtl"` / `dir="ltr"` onto `<html>` so native browser chrome (scrollbars,
native form controls, text selection) mirrors too; pass
`applyToDocument={false}` if you need to scope direction to a subtree
instead (Noor's own Storybook and showcase page do this to render LTR and
RTL side-by-side).

Detect direction from a locale with the exported helper:

```tsx
import { isRtlLocale } from "noor-ui/providers";

isRtlLocale("ar"); // true
isRtlLocale("ckb"); // true (Kurdish, Sorani)
isRtlLocale("en"); // false
```

## Why logical properties matter here

Every direction-sensitive spacing or positioning utility in this system uses
CSS logical properties instead of physical ones:

| Don't use | Use instead | Why |
|---|---|---|
| `ml-4` / `mr-4` | `ms-4` / `me-4` | margin-inline-start/end flips automatically |
| `pl-4` / `pr-4` | `ps-4` / `pe-4` | same, for padding |
| `left-0` / `right-0` | `start-0` / `end-0` | same, for positioning |
| `border-l` / `border-r` | `border-s` / `border-e` | same, for borders |

A component written with `ml-4` will misalign the moment `dir="rtl"` is set;
the same component written with `ms-4` mirrors for free. `Sidebar` (border
against the content edge), `Breadcrumbs` and `Pagination` (chevron
direction), and `Drawer` (anchored edge: `side="start"`/`"end"`, never
`"left"`/`"right"`) are the components most worth checking first if you're
auditing a change for RTL correctness.

Directional icons (chevrons, arrows) that should visually flip under RTL use
the `rtl:rotate-180` Tailwind variant rather than swapping which lucide icon
is imported — one icon, one rotation rule.

## Typography for Arabic-script content

Arabic and Kurdish (Sorani) text stacks diacritics taller than Latin script
at the same nominal font size. Noor's type scale (`src/tokens/typography.css`)
is tuned with generous line-heights specifically so this content doesn't
clip — e.g. `body` is 15px text on a 26px line-height, well beyond what
Latin text alone would need. If you introduce a new type scale step, keep
that same generous ratio (roughly 1.6–1.75×) rather than optimizing purely
for Latin optical density.

Set `lang="ar"` or `lang="ckb"` on RTL subtrees so browsers and assistive
tech apply correct script-specific behavior (hyphenation, spellcheck,
screen-reader pronunciation) — `dir` alone isn't enough.

## Fonts

Noor's font stack (`--n-font-sans`) leads with IBM Plex Sans / IBM Plex Sans
Arabic / Noto Sans Arabic before falling back to system UI fonts. The
package does **not** bundle font files — load them yourself (self-hosted or
via a font CDN) so subsetting and licensing stay under your control; the
stack degrades gracefully to system fonts if you don't.

## Testing RTL

Every component with direction-sensitive layout ships a `dir="rtl"`
Storybook story. The toolbar's **Direction** control (see `.storybook/preview.tsx`)
lets you flip any story to RTL without writing a dedicated story, useful for
spot-checking components that don't have RTL-specific logic but should still
mirror correctly by virtue of using logical properties throughout.
