import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { cn } from "../../utilities/cn";
import { IconButton } from "../inputs/IconButton";
import { DropdownMenu, DropdownMenuItem } from "../overlays/DropdownMenu";

export interface ConversationItemProps {
  title: string;
  active?: boolean;
  onClick?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  className?: string;
}

/** A single row in ConversationSidebar. The overflow menu is revealed on
 *  hover/focus and always reachable via keyboard (it's a real button, not a
 *  hover-only affordance — focus-within keeps it visible for keyboard users). */
export function ConversationItem({
  title,
  active = false,
  onClick,
  onRename,
  onDelete,
  className,
}: ConversationItemProps) {
  return (
    <li
      className={cn(
        "group relative flex items-center rounded-md",
        active ? "bg-surface-active" : "hover:bg-surface-hover",
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={cn(
          "min-w-0 flex-1 truncate rounded-md px-3 py-2 text-start text-body-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
          active
            ? "font-medium text-text-primary"
            : "text-text-secondary group-hover:text-text-primary",
        )}
      >
        {title}
      </button>
      {(onRename || onDelete) && (
        <div className="absolute end-1 opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-within:opacity-100 has-[[data-state=open]]:opacity-100">
          <DropdownMenu
            trigger={
              <IconButton aria-label="Conversation actions" variant="ghost" size="sm">
                <MoreHorizontal className="size-4" />
              </IconButton>
            }
          >
            {onRename && (
              <DropdownMenuItem icon={<Pencil className="size-4" />} onSelect={onRename}>
                Rename
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                destructive
                icon={<Trash2 className="size-4" />}
                onSelect={onDelete}
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenu>
        </div>
      )}
    </li>
  );
}
