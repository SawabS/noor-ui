import * as React from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, Circle } from "lucide-react";
import { cn } from "../../utilities/cn";
import type { OverlaySurfaceVariant } from "../../foundations/types";
import { getOverlaySurfaceClassName } from "../../utilities/surface";
import { useAppearancePortalContainer } from "../../providers/appearance-provider";

export const DropdownMenuPrimitive = RadixDropdownMenu;

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  surface?: OverlaySurfaceVariant;
}

export function DropdownMenu({
  trigger,
  children,
  align = "start",
  side = "bottom",
  open,
  defaultOpen,
  onOpenChange,
  surface = "auto",
}: DropdownMenuProps) {
  const portalContainer = useAppearancePortalContainer();
  return (
    <RadixDropdownMenu.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <RadixDropdownMenu.Trigger asChild>{trigger}</RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal container={portalContainer}>
        <RadixDropdownMenu.Content
          align={align}
          side={side}
          sideOffset={6}
          className={cn(
            "z-dropdown min-w-40 rounded-md border border-border py-1 shadow-md animate-fade-in motion-reduce:animate-none",
            getOverlaySurfaceClassName(surface),
          )}
        >
          {children}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
}

const itemClass = cn(
  "mx-1 flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-body-sm text-text-primary outline-none",
  "data-[highlighted]:bg-surface-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled",
);

export interface DropdownMenuItemProps extends RadixDropdownMenu.DropdownMenuItemProps {
  destructive?: boolean;
  icon?: React.ReactNode;
}

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, destructive, icon, children, ...props }, ref) => (
    <RadixDropdownMenu.Item
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
    </RadixDropdownMenu.Item>
  ),
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  RadixDropdownMenu.DropdownMenuCheckboxItemProps
>(({ className, children, ...props }, ref) => (
  <RadixDropdownMenu.CheckboxItem ref={ref} className={cn(itemClass, className)} {...props}>
    <span className="flex size-4 items-center justify-center">
      <RadixDropdownMenu.ItemIndicator>
        <Check className="size-3.5" />
      </RadixDropdownMenu.ItemIndicator>
    </span>
    {children}
  </RadixDropdownMenu.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuRadioGroup = RadixDropdownMenu.RadioGroup;

export const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  RadixDropdownMenu.DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <RadixDropdownMenu.RadioItem ref={ref} className={cn(itemClass, className)} {...props}>
    <span className="flex size-4 items-center justify-center">
      <RadixDropdownMenu.ItemIndicator>
        <Circle className="size-2 fill-current" />
      </RadixDropdownMenu.ItemIndicator>
    </span>
    {children}
  </RadixDropdownMenu.RadioItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  RadixDropdownMenu.DropdownMenuLabelProps
>(({ className, ...props }, ref) => (
  <RadixDropdownMenu.Label
    ref={ref}
    className={cn(
      "px-3 py-1.5 text-caption font-medium uppercase tracking-wide text-text-muted",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  RadixDropdownMenu.DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <RadixDropdownMenu.Separator
    ref={ref}
    className={cn("my-1 h-px bg-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
