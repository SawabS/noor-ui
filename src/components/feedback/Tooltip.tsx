import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../../utilities/cn";

export const TooltipProvider = RadixTooltip.Provider;

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
}

/** Wrap your app once in <TooltipProvider>; each <Tooltip> is otherwise self-contained. */
export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 300,
  className,
}: TooltipProps) {
  return (
    <RadixTooltip.Root delayDuration={delayDuration}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          align={align}
          sideOffset={6}
          className={cn(
            "z-tooltip rounded-sm bg-text-primary px-2 py-1 text-caption text-canvas",
            "animate-fade-in motion-reduce:animate-none",
            className,
          )}
        >
          {content}
          <RadixTooltip.Arrow className="fill-text-primary" width={8} height={4} />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
