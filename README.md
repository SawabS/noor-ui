# Noor UI

A restrained, monochromatic React design system for AI products. Built for
multilingual interfaces (English, Kurdish, Arabic) with full RTL support and
WCAG 2.2 AA accessibility as a baseline, not an afterthought.

Noor ("light": نور / نوور) is an original design language inspired by the
current wave of minimal, low-noise AI product interfaces. It is not a copy of
any proprietary product's assets, icons, or code.

## Why

Most component libraries are either too opinionated about color (a loud brand
blue baked into every control) or too bare (unstyled primitives you re-skin
from scratch). Noor sits in between: a small, coherent set of semantic design
tokens driving a full component set, tuned for chat/agent/research UIs,
including composer bars, streaming messages, citations, and tool-call cards,
as much as for conventional forms and dashboards.

## Install

```bash
npm install noor-ui
```

React 18+ and React DOM 18+ are peer dependencies.

## Quick start

```tsx
import { ThemeProvider } from "noor-ui/providers";
import { DirectionProvider } from "noor-ui/providers";
import { Button, PromptComposer, ChatLayout } from "noor-ui";
import "noor-ui/styles.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <DirectionProvider defaultDirection="ltr">
        <Button>Get started</Button>
      </DirectionProvider>
    </ThemeProvider>
  );
}
```

Import the stylesheet once, at your app's entry point. It contains the token
CSS custom properties (light + dark) and the compiled Tailwind utility
classes every component depends on; component files never inline raw color
or spacing values, so nothing renders correctly without it.

## Package structure

| Import                  | Contents                                             |
| ------------------------ | ----------------------------------------------------- |
| `noor-ui`                | All components, foundations, hooks, utilities         |
| `noor-ui/providers`      | `ThemeProvider`, `DirectionProvider` and their hooks   |
| `noor-ui/tokens`         | Programmatic token manifest (colors, scale, metadata)  |
| `noor-ui/styles.css`     | Compiled CSS: tokens + Tailwind utilities              |

## Documentation

- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md): design principles, token
  reference, component inventory
- [`CONTRIBUTING.md`](./CONTRIBUTING.md): how to add or change a component
- [`docs/tokens.md`](./docs/tokens.md): full token reference
- [`docs/components.md`](./docs/components.md): component API index
- [`docs/accessibility.md`](./docs/accessibility.md): accessibility
  guidelines and testing checklist
- [`docs/rtl-multilingual.md`](./docs/rtl-multilingual.md): RTL and
  multilingual (EN/KU/AR) guidance
- [`docs/dark-mode.md`](./docs/dark-mode.md): theming guidance
- [`docs/migration-usage.md`](./docs/migration-usage.md): usage examples
  and migration notes

## Local development

```bash
npm install
npm run dev              # Storybook at localhost:6006
npm run test              # Vitest
npm run typecheck
npm run build              # library build (tsup + Tailwind CSS)
npm run build:storybook
```

## License

MIT
