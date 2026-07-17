# Usage examples & migration notes

## Setting up the app root

```tsx
import { ThemeProvider, DirectionProvider } from "noor-ui/providers";
import "noor-ui/styles.css";

export function AppRoot({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <DirectionProvider defaultDirection="ltr">{children}</DirectionProvider>
    </ThemeProvider>
  );
}
```

Driving direction from the user's locale:

```tsx
import { DirectionProvider, isRtlLocale } from "noor-ui/providers";

const locale = useUserLocale(); // "ar", "ckb", "en", ...

<DirectionProvider defaultDirection={isRtlLocale(locale) ? "rtl" : "ltr"}>
  <App />
</DirectionProvider>;
```

## Buttons

```tsx
import { Button } from "noor-ui";
import { Plus } from "lucide-react";

<Button variant="primary" size="md" leadingIcon={<Plus className="size-4" />}>
  New chat
</Button>

<Button variant="secondary" loading={isSaving}>
  Save changes
</Button>
```

## A minimal chat screen

```tsx
import {
  ChatLayout,
  ConversationSidebar,
  MessageList,
  UserMessage,
  AssistantMessage,
  PromptComposer,
} from "noor-ui";

function ChatScreen() {
  const [value, setValue] = useState("");

  return (
    <ChatLayout
      sidebar={<ConversationSidebar conversations={conversations} activeId={activeId} />}
      composer={
        <PromptComposer
          value={value}
          onValueChange={setValue}
          onSubmit={handleSubmit}
          modelSelector={<ModelSelector models={models} value={model} onValueChange={setModel} />}
          researchMode={researchMode}
          onResearchModeChange={setResearchMode}
        />
      }
    >
      <MessageList>
        {messages.map((m) =>
          m.role === "user" ? (
            <UserMessage key={m.id} content={m.content} />
          ) : (
            <AssistantMessage key={m.id} content={m.content} streaming={m.streaming} />
          ),
        )}
      </MessageList>
    </ChatLayout>
  );
}
```

## Forms

```tsx
import { FormField, Input, Select, Switch } from "noor-ui";

<FormField label="Display name" htmlFor="name" required>
  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
</FormField>

<FormField label="Language" htmlFor="lang">
  <Select
    id="lang"
    options={[
      { value: "en", label: "English" },
      { value: "ar", label: "العربية" },
      { value: "ckb", label: "کوردیی ناوەندی" },
    ]}
    value={lang}
    onValueChange={setLang}
  />
</FormField>

<FormField label="Streaming responses" htmlFor="streaming" helperText="Show tokens as they arrive.">
  <Switch id="streaming" checked={streaming} onCheckedChange={setStreaming} />
</FormField>
```

## Migrating from an existing component library

If you're replacing an existing set of ad hoc or vendor components:

1. **Start with tokens, not components.** Map your current design tokens
   (colors, spacing, radii) onto `src/tokens/*.css` first, even before
   swapping any component - this alone often resolves most visual drift.
2. **Swap layout/foundation primitives first** (`Typography`, `Separator`,
   `Skeleton`) - low risk, high coverage, makes the rest of the migration
   incremental.
3. **Replace overlays last.** Dialog/Drawer/DropdownMenu/CommandPalette
   usually have the most call sites with bespoke state management; migrate
   them component-by-component rather than in one pass, since Noor's
   overlays are Radix-based and expect controlled/uncontrolled `open` state
   in a specific shape (`open`/`onOpenChange`, matching Radix's own
   convention) - check each call site's existing state wiring against that
   shape rather than assuming a 1:1 prop match.
4. **Run the accessibility checklist** (`docs/accessibility.md`) against
   each migrated screen - Noor's stricter focus/keyboard defaults sometimes
   surface pre-existing gaps in app-level keyboard flow (e.g. a modal that
   previously didn't trap focus at all).
