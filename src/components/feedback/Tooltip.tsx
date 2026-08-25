import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../../utilities/cn";
import type { OverlaySurfaceVariant } from "../../foundations/types";
import { getOverlaySurfaceClassName } from "../../utilities/surface";
import { useAppearancePortalContainer } from "../../providers/appearance-provider";

export const TooltipProvider = RadixTooltip.Provider;

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
  surface?: OverlaySurfaceVariant;
}

/** Wrap your app once in <TooltipProvider>; each <Tooltip> is otherwise self-contained. */
export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 300,
  surface = "auto",
  className,
}: TooltipProps) {
  const portalContainer = useAppearancePortalContainer();
  return (
    <RadixTooltip.Root delayDuration={delayDuration}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal container={portalContainer}>
        <RadixTooltip.Content
          side={side}
          align={align}
          sideOffset={6}
          className={cn(
            "z-tooltip rounded-sm px-2 py-1 text-caption",
            surface === "auto"
              ? "n-tooltip-auto bg-text-primary text-canvas"
              : cn(getOverlaySurfaceClassName(surface), "border border-border text-text-primary"),
            "animate-fade-in motion-reduce:animate-none",
            className,
          )}
        >
          {content}
          <RadixTooltip.Arrow
            className={cn(
              surface === "auto" ? "n-tooltip-arrow fill-text-primary" : "fill-surface",
            )}
            width={8}
            height={4}
          />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
