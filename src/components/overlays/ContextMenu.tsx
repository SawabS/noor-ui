import * as React from "react";
import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { cn } from "../../utilities/cn";
import type { OverlaySurfaceVariant } from "../../foundations/types";
import { getOverlaySurfaceClassName } from "../../utilities/surface";
import { useAppearancePortalContainer } from "../../providers/appearance-provider";

export const ContextMenuPrimitive = RadixContextMenu;

export interface ContextMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  surface?: OverlaySurfaceVariant;
}

/** Right-click / long-press menu. Same visual language as DropdownMenu. */
export function ContextMenu({ trigger, children, surface = "auto" }: ContextMenuProps) {
  const portalContainer = useAppearancePortalContainer();
  return (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger asChild>{trigger}</RadixContextMenu.Trigger>
      <RadixContextMenu.Portal container={portalContainer}>
        <RadixContextMenu.Content
          className={cn(
            "z-dropdown min-w-40 rounded-md border border-border py-1 shadow-md animate-fade-in motion-reduce:animate-none",
            getOverlaySurfaceClassName(surface),
          )}
        >
          {children}
        </RadixContextMenu.Content>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  );
}

const itemClass = cn(
  "mx-1 flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-body-sm text-text-primary outline-none",
  "data-[highlighted]:bg-surface-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled",
);

export interface ContextMenuItemProps extends RadixContextMenu.ContextMenuItemProps {
  destructive?: boolean;
  icon?: React.ReactNode;
}

export const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, destructive, icon, children, ...props }, ref) => (
    <RadixContextMenu.Item
      ref={ref}
      className={cn(
        itemClass,
        destructive && "text-danger data-[highlighted]:bg-[var(--n-danger-bg)]",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </RadixContextMenu.Item>
  ),
);
ContextMenuItem.displayName = "ContextMenuItem";

export const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  RadixContextMenu.ContextMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <RadixContextMenu.Separator
    ref={ref}
    className={cn("my-1 h-px bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";

export const ContextMenuLabel = React.forwardRef<
  HTMLDivElement,
  RadixContextMenu.ContextMenuLabelProps
>(({ className, ...props }, ref) => (
  <RadixContextMenu.Label
    ref={ref}
    className={cn(
      "px-3 py-1.5 text-caption font-medium uppercase tracking-wide text-text-muted",
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = "ContextMenuLabel";
