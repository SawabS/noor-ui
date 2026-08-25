import * as React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { cn } from "../../utilities/cn";
import type { OverlaySurfaceVariant } from "../../foundations/types";
import { getOverlaySurfaceClassName } from "../../utilities/surface";
import { useAppearancePortalContainer } from "../../providers/appearance-provider";

export const PopoverPrimitive = RadixPopover;

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  surface?: OverlaySurfaceVariant;
}

export function Popover({
  trigger,
  content,
  side = "bottom",
  align = "center",
  open,
  defaultOpen,
  onOpenChange,
  surface = "auto",
  className,
}: PopoverProps) {
  const portalContainer = useAppearancePortalContainer();
  return (
    <RadixPopover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal container={portalContainer}>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={8}
          className={cn(
            "z-popover rounded-md border border-border p-4 shadow-md",
            getOverlaySurfaceClassName(surface),
            "animate-fade-in motion-reduce:animate-none",
            "focus-visible:outline-none",
            className,
          )}
        >
          {content}
          <RadixPopover.Arrow className="fill-surface" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
