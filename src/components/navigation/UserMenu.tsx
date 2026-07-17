import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { Typography } from "../primitives/Typography";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

export interface UserMenuProps {
  name: string;
  email?: string;
  onProfile?: () => void;
  onSettings?: () => void;
  onSignOut?: () => void;
  /** Hides the name label in the trigger, keeping only the initials badge. */
  compact?: boolean;
}

// Built directly on @radix-ui/react-dropdown-menu rather than the shared
// DropdownMenu component (overlays/) to stay dependency-free while that
// component is developed in parallel — refactor to compose it once merged.
export function UserMenu({
  name,
  email,
  onProfile,
  onSettings,
  onSignOut,
  compact = false,
}: UserMenuProps) {
  const initials = getInitials(name);

  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-md p-1 transition-colors duration-fast ease-standard hover:bg-surface-hover",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          )}
        >
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-pill bg-surface-raised text-caption font-medium text-text-primary"
          >
            {initials}
          </span>
          {!compact && (
            <Typography variant="label" className="hidden max-w-32 truncate sm:inline">
              {name}
            </Typography>
          )}
        </button>
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          align="end"
          sideOffset={8}
          className={cn(
            "z-dropdown min-w-56 rounded-md border border-border bg-surface py-1 shadow-md",
            "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
          )}
        >
          {(name || email) && (
            <div className="px-3 py-2">
              {name && <Typography variant="label">{name}</Typography>}
              {email && (
                <Typography variant="caption" color="muted" className="block truncate">
                  {email}
                </Typography>
              )}
            </div>
          )}
          <RadixDropdownMenu.Separator className="my-1 h-px bg-border" />
          <RadixDropdownMenu.Item
            onSelect={onProfile}
            className={cn(
              "mx-1 flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-body-sm text-text-primary outline-none transition-colors duration-fast ease-standard",
              "data-[highlighted]:bg-surface-hover",
            )}
          >
            <Icon icon={User} size="sm" className="text-text-secondary" />
            Profile
          </RadixDropdownMenu.Item>
          <RadixDropdownMenu.Item
            onSelect={onSettings}
            className={cn(
              "mx-1 flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-body-sm text-text-primary outline-none transition-colors duration-fast ease-standard",
              "data-[highlighted]:bg-surface-hover",
            )}
          >
            <Icon icon={Settings} size="sm" className="text-text-secondary" />
            Settings
          </RadixDropdownMenu.Item>
          <RadixDropdownMenu.Separator className="my-1 h-px bg-border" />
          <RadixDropdownMenu.Item
            onSelect={onSignOut}
            className={cn(
              "mx-1 flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-body-sm text-danger outline-none transition-colors duration-fast ease-standard",
              "data-[highlighted]:bg-danger-bg",
            )}
          >
            <Icon icon={LogOut} size="sm" />
            Sign out
          </RadixDropdownMenu.Item>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
}
