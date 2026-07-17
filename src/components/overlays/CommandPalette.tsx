import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "../../utilities/cn";
import { VisuallyHidden } from "../primitives/VisuallyHidden";

export interface CommandPaletteItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandPaletteGroup {
  group: string;
  items: CommandPaletteItem[];
}

export interface CommandPaletteProps {
  items: CommandPaletteGroup[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  /** Registers a Cmd/Ctrl+K listener that opens the palette. */
  enableShortcut?: boolean;
}

export function CommandPalette({
  items,
  open,
  onOpenChange,
  placeholder = "Type a command or search...",
  enableShortcut = false,
}: CommandPaletteProps) {
  React.useEffect(() => {
    if (!enableShortcut) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enableShortcut, onOpenChange, open]);

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-overlay bg-[rgb(var(--n-shadow-color)/0.4)] animate-fade-in motion-reduce:animate-none" />
        <div className="fixed inset-0 z-modal flex items-start justify-center p-4 pt-[15vh] pointer-events-none">
          <RadixDialog.Content
            className={cn(
              "pointer-events-auto w-full max-w-content-sm overflow-hidden rounded-lg border border-border bg-surface shadow-lg",
              "animate-slide-in-from-bottom motion-reduce:animate-none focus-visible:outline-none",
            )}
          >
            <VisuallyHidden>
              <RadixDialog.Title>Command palette</RadixDialog.Title>
              <RadixDialog.Description>Search for a command or action</RadixDialog.Description>
            </VisuallyHidden>
            <Command className="flex flex-col" shouldFilter>
              <div className="flex items-center gap-2 border-b border-border px-4">
                <Search className="size-4 shrink-0 text-text-muted" />
                <Command.Input
                  autoFocus
                  placeholder={placeholder}
                  className="h-12 w-full bg-transparent text-body-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                />
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-body-sm text-text-muted">
                  No results found.
                </Command.Empty>
                {items.map((group) => (
                  <Command.Group
                    key={group.group}
                    heading={group.group}
                    className={cn(
                      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
                      "[&_[cmdk-group-heading]]:text-caption [&_[cmdk-group-heading]]:font-medium",
                      "[&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide",
                      "[&_[cmdk-group-heading]]:text-text-muted",
                    )}
                  >
                    {group.items.map((item) => (
                      <Command.Item
                        key={item.id}
                        onSelect={() => {
                          item.onSelect();
                          onOpenChange(false);
                        }}
                        className={cn(
                          "flex cursor-pointer items-center gap-2.5 rounded-sm px-2.5 py-2 text-body-sm text-text-primary",
                          "aria-selected:bg-surface-hover",
                        )}
                      >
                        {item.icon}
                        <span className="flex-1">{item.label}</span>
                        {item.shortcut && (
                          <span className="text-caption text-text-muted">{item.shortcut}</span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>
          </RadixDialog.Content>
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
