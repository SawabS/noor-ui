# Component API index

This is a quick-reference index. Every component's full prop types are
exported from `noor-ui` - treat the `.tsx` source and its colocated
`.stories.tsx` as the canonical reference; this document summarizes intent
and the most important props, not the complete type signature.

## Foundations

| Component            | Purpose                                                 | Key props                                           |
| -------------------- | ------------------------------------------------------- | --------------------------------------------------- |
| `ThemeProvider`      | System-aware, multi-palette theming via `data-theme`    | `theme`, `defaultTheme`, `scope`, `storageKey`      |
| `DirectionProvider`  | LTR/RTL context, wraps Radix's own                      | `direction`, `defaultDirection`, `applyToDocument`  |
| `AppearanceProvider` | Opt-in visual profile and transparency preference       | `appearance`, `transparency`, `scope`, storage keys |
| `ThemeToggle`        | Cycles light → dark → system                            | -                                                   |
| `ThemePicker`        | Selects any built-in color palette                      | `size`, `className`, `aria-label`                   |
| `Typography`         | Renders the type scale                                  | `variant`, `color`, `weight`, `as`, `truncate`      |
| `Icon`               | Sized lucide-react wrapper                              | `icon`, `size`, `label`                             |
| `VisuallyHidden`     | Screen-reader-only content                              | -                                                   |
| `Separator`          | Radix-based divider                                     | `orientation`, `decorative`                         |
| `Skeleton`           | Loading placeholder block                               | -                                                   |
| `Spinner`            | Loading indicator (keeps spinning under reduced motion) | `size`, `label`                                     |

## Inputs

`Button`, `IconButton` - variants `primary`/`secondary`/`outline`/`ghost`/`danger`(/`link` on Button); sizes `sm`/`md`/`lg`; `loading`, `disabled`, `asChild`.

`Input`, `Textarea`, `SearchInput` - sizes `sm`/`md`/`lg`, `error`/`aria-invalid`, leading/trailing icon slots; `Textarea` supports `autoResize`.

`Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider` - Radix-based, controlled/uncontrolled via `value`/`defaultValue`/`onValueChange` (or `onCheckedChange` for Checkbox/Switch), full keyboard support.

`FormField`, `Label` - layout/labeling wrapper: `label`, `htmlFor`, `helperText`, `errorText`, `required`.

`FileUpload` - drag-and-drop + click-to-browse, `accept`, `multiple`, `onFilesSelected`.

`SegmentedControl` - `options`, `value`/`defaultValue`/`onValueChange`, roving keyboard nav.

## Feedback

`Alert` - variants `info`/`success`/`warning`/`danger`, optional `title`, dismissible.
`Badge` - variants `neutral`/`success`/`warning`/`danger`/`info`/`outline`, sizes `sm`/`md`.
`Progress` - determinate (`value` 0–100) or indeterminate.
`Tooltip` - `content`, `surface`; wraps a single trigger child; mount one `TooltipProvider` near the app root.
`Toast` - `ToastProvider` + `useToast()`; `ToastProvider.surface` selects the shared surface recipe.
`EmptyState`, `ErrorState` - `icon`, heading, description, optional `action`/`onRetry`.

## Overlays

`Dialog`, `Drawer` - `trigger`, `title` (required for a11y), `description`, `open`/`onOpenChange`, `surface`; `Drawer` adds `side` (`start`/`end`/`top`/`bottom`).
`Popover` - `trigger`, `content`, `side`, `align`, `surface`.
`DropdownMenu`, `ContextMenu` - composable menus with a shared `surface` override.
`CommandPalette` - `items` (grouped), `open`/`onOpenChange`, optional `enableShortcut`, `surface`.

## Navigation

`Tabs` - `items` shorthand or raw `TabsList`/`TabsTrigger`/`TabsContent` parts.
`Breadcrumbs` - `items` with optional `href`/`onClick`, last item gets `aria-current="page"`.
`Pagination` - `currentPage`, `totalPages`, `onPageChange`, collapses long ranges with an ellipsis.
`Sidebar` + `SidebarItem` - `collapsed` prop shrinks to icon-only width; items support `href` or `onClick`.
`TopNavigation` - `start`/`center`/`end` slots; `surface="auto" | "solid" | "material"`.
`UserMenu` - dropdown-based account menu.

## Data display

`Card` (+ subparts) and `StatCard` - `surface="solid" | "tonal" | "material" | "elevated"`; Card also supports `padding`, `interactive`.
`Avatar` - `src`, `name` (initials fallback), `size`.
`Table` (+ `TableHeader`/`TableBody`/`TableRow`/`TableHead`/`TableCell`/`TableCaption`) - scrolls horizontally inside its own container.
`DataList` - `items: {label, value}[]`, responsive stacked/grid layout.
`Accordion` - Radix-based, `type` `single`/`multiple`.
`CodeBlock` - `code`, `language`, `showLineNumbers`, copy-to-clipboard.
`MarkdownContent` - styles pre-rendered markdown/HTML children; does not parse markdown itself.
`Citation` - inline numbered source reference, `index`, `href`, `title`.
`StatCard` - `label`, `value`, optional trend + icon.

## AI-product

`ChatLayout` - top-level shell composing `sidebar`, message area, `composer`, and optional `artifactPanel` slots. Mobile drawer state stays in the consuming app; see `LumenWorkspaceExample`.
`ConversationSidebar` + `ConversationItem` - conversation list with active state.
`MessageList`, `UserMessage`, `AssistantMessage`, `SystemMessage` - message stream and role-specific bubbles.
`ReasoningBlock` - collapsible "thinking" trace.
`ToolCallCard` - shows a tool invocation, its arguments, and result/status.
`SourceCitationList` - renders a list of `Citation`s for a message.
`PromptComposer` - the flagship input: auto-growing textarea, attachments, research-mode toggle, `ModelSelector`, submit, `disabled`/`loading`/`streaming` states, keyboard submit (Enter to send, Shift+Enter for newline).
`ComposerToolbar`, `AttachmentChip` - composer sub-parts.
`ModelSelector`, `ModeSelector` - dropdown-based pickers for model/mode.
`SuggestedPrompt` - clickable prompt-starter chip/card for the welcome screen.
`WelcomeScreen` - empty-state chat screen with suggested prompts.
`ArtifactPanel` - side panel for rendering a generated artifact (code, document, preview) alongside the chat.
`ResearchProgress` - step-by-step progress display for multi-step/agentic research tasks.
`StreamingIndicator` - animated "thinking"/typing indicator, `aria-live="polite"`.
