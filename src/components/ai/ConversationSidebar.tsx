import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Button } from "../inputs/Button";
import { Typography } from "../primitives/Typography";
import { ConversationItem } from "./ConversationItem";

export interface ConversationSummary {
  id: string;
  title: string;
}

export interface ConversationGroup {
  /** e.g. "Today", "Previous 7 days" */
  label: string;
  items: ConversationSummary[];
}

export interface ConversationSidebarProps {
  groups: ConversationGroup[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  onNewConversation?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  className?: string;
}

/** The conversation-history rail. Groups conversations by recency, matching
 *  the reference product's flat, low-chrome list rather than a tree. */
export function ConversationSidebar({
  groups,
  activeId,
  onSelect,
  onRename,
  onDelete,
  onNewConversation,
  header,
  footer,
  collapsed = false,
  className,
}: ConversationSidebarProps) {
  if (collapsed) {
    return (
      <aside
        className={cn(
          "flex h-full w-16 flex-col items-center gap-2 border-e border-border bg-sidebar py-3",
          "transition-[width] duration-base ease-standard motion-reduce:transition-none",
          className,
        )}
      >
        {onNewConversation && (
          <Button
            variant="ghost"
            size="sm"
            className="size-10 p-0"
            aria-label="New conversation"
            onClick={onNewConversation}
          >
            <Plus className="size-4" />
          </Button>
        )}
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-e border-border bg-sidebar",
        "transition-[width] duration-base ease-standard motion-reduce:transition-none",
        className,
      )}
    >
      <div className="flex flex-col gap-2 px-3 py-3">
        {header}
        {onNewConversation && (
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onNewConversation}
            leadingIcon={<Plus className="size-4" />}
          >
            New chat
          </Button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto px-2 pb-2" aria-label="Conversation history">
        {groups.map((group) => (
          <div key={group.label} className="mb-3">
            <Typography
              variant="caption"
              color="muted"
              className="px-3 py-1.5 block uppercase tracking-wide"
            >
              {group.label}
            </Typography>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <ConversationItem
                  key={item.id}
                  title={item.title}
                  active={item.id === activeId}
                  onClick={() => onSelect?.(item.id)}
                  onRename={onRename ? () => onRename(item.id) : undefined}
                  onDelete={onDelete ? () => onDelete(item.id) : undefined}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>
      {footer && <div className="border-t border-border px-3 py-3">{footer}</div>}
    </aside>
  );
}
