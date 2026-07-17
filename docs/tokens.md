# Token reference

Source of truth: `src/tokens/*.css`. This document mirrors it for quick
lookup - if the two disagree, the CSS wins.

## Color - light theme

| Token | Variable | Value |
|---|---|---|
| canvas | `--n-canvas` | `#FFFFFF` |
| sidebar | `--n-sidebar` | `#F7F7F7` |
| surface | `--n-surface` | `#FFFFFF` |
| surface-raised | `--n-surface-raised` | `#F4F4F4` |
| surface-hover | `--n-surface-hover` | `#EEEEEE` |
| surface-active | `--n-surface-active` | `#E7E7E7` |
| text-primary | `--n-text-primary` | `#171717` |
| text-secondary | `--n-text-secondary` | `#666666` |
| text-muted | `--n-text-muted` | `#929292` |
| border | `--n-border` | `#E5E5E5` |
| border-strong | `--n-border-strong` | `#D4D4D4` |
| primary-action | `--n-primary-action` | `#171717` |
| primary-action-text | `--n-primary-action-text` | `#FFFFFF` |
| focus-ring | `--n-focus-ring` | `#737373` |

## Color - dark theme

| Token | Variable | Value |
|---|---|---|
| canvas | `--n-canvas` | `#0D0D0D` |
| sidebar | `--n-sidebar` | `#151515` |
| surface | `--n-surface` | `#191919` |
| surface-raised | `--n-surface-raised` | `#202020` |
| surface-hover | `--n-surface-hover` | `#292929` |
| surface-active | `--n-surface-active` | `#303030` |
| text-primary | `--n-text-primary` | `#F2F2F2` |
| text-secondary | `--n-text-secondary` | `#A3A3A3` |
| text-muted | `--n-text-muted` | `#707070` |
| border | `--n-border` | `#303030` |
| border-strong | `--n-border-strong` | `#424242` |
| primary-action | `--n-primary-action` | `#F2F2F2` |
| primary-action-text | `--n-primary-action-text` | `#111111` |
| focus-ring | `--n-focus-ring` | `#A3A3A3` |

## Supporting semantic colors (theme-independent hue)

| Token | Value |
|---|---|
| success | `#16A36A` |
| warning | `#D98B18` |
| danger | `#DC4C4C` |
| info | `#4385F5` |

Each also has a soft tonal `-bg` variant (e.g. `--n-success-bg`) for alert
and badge backgrounds, defined per-theme in `semantic.css`/`themes.css`.

## Typography scale

| Variant | Size | Line height |
|---|---|---|
| caption | 11px | 16px |
| label | 12px | 18px |
| body-sm | 13px | 22px |
| body | 15px | 26px |
| body-lg | 17px | 28px |
| heading-sm | 20px | 28px |
| heading-md | 24px | 34px |
| heading-lg | 30px | 40px |
| display | 40px | 52px |

Font stack: `"IBM Plex Sans", "IBM Plex Sans Arabic", "Noto Sans Arabic", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
Weights: regular 400, medium 500, semibold 600, bold 700.

## Spacing (4px base)

`0.5`=2px, `1`=4px, `1.5`=6px, `2`=8px, `3`=12px, `4`=16px, `5`=20px,
`6`=24px, `8`=32px, `10`=40px, `12`=48px, `16`=64px, `20`=80px, `24`=96px.

## Geometry

- **Radii** - xs 6px, sm 8px, md 12px, lg 16px, xl 24px, pill 9999px.
- **Border widths** - default 1px, thick 2px.
- **Shadows** - xs/sm/md/lg, all low-opacity tonal shadows composited from
  a theme-aware `--n-shadow-color`; never used as the primary elevation
  signal (background tone + border carry that job).
- **Opacity** - disabled 0.45, muted 0.7.
- **Control heights** - sm 32px, md 40px, lg 48px.
- **Content widths** - sm 640px, md 768px, lg 896px, xl 1152px.
- **Breakpoints** - xs 480px, sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px.

## Motion

- **Durations** - instant 80ms, fast 120ms, base 180ms, slow 260ms.
- **Easing** - standard `cubic-bezier(0.4,0,0.2,1)`, enter `cubic-bezier(0,0,0.2,1)`,
  exit `cubic-bezier(0.4,0,1,1)`.
- `prefers-reduced-motion: reduce` collapses all animation/transition
  durations globally except on elements marked `data-motion-safe`.

## Z-index layers

dropdown 1000, sticky 1100, overlay 1200, modal 1300, popover 1400,
toast 1500, tooltip 1600.

## Programmatic access

`import { themeValues, typeScale, spacingScale, radiiScale, ... } from "noor-ui/tokens"`
mirrors this document as typed JS objects for tooling that needs to
enumerate tokens without parsing CSS (Storybook's showcase page, design-sync
tooling).
