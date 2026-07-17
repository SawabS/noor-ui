import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../utilities/cn";
import { IconButton } from "../inputs/IconButton";
import { useDirection } from "../../providers/direction-provider";

export type DrawerSide = "start" | "end" | "top" | "bottom";

export interface DrawerProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  side?: DrawerSide;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const sidePosition: Record<DrawerSide, string> = {
  start: "inset-y-0 start-0 h-full w-full max-w-sm",
  end: "inset-y-0 end-0 h-full w-full max-w-sm",
  top: "inset-x-0 top-0 w-full max-h-[85vh]",
  bottom: "inset-x-0 bottom-0 w-full max-h-[85vh]",
};

/** A side-anchored Dialog. Uses logical `start`/`end` (not left/right) so
 *  the anchored edge — and its slide-in direction — flips correctly under
 *  RTL. Position uses CSS logical properties (auto-flipping); the slide
 *  animation is a transform (physical), so its direction is resolved from
 *  the ambient DirectionProvider. */
export function Drawer({
  children,
  trigger,
  title,
  description,
  side = "end",
  open,
  defaultOpen,
  onOpenChange,
  className,
}: DrawerProps) {
  const { direction } = useDirection();

  const animationClass = React.useMemo(() => {
    if (side === "top") return "animate-drawer-in-top";
    if (side === "bottom") return "animate-drawer-in-bottom";
    const isStart = side === "start";
    const entersFromLeft = direction === "rtl" ? !isStart : isStart;
    return entersFromLeft ? "animate-drawer-in-left" : "animate-drawer-in-right";
  }, [side, direction]);

  return (
    <RadixDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-overlay bg-[rgb(var(--n-shadow-color)/0.4)] animate-fade-in motion-reduce:animate-none" />
        <RadixDialog.Content
          className={cn(
            "fixed z-modal flex flex-col bg-surface border border-border shadow-lg p-6",
            "motion-reduce:animate-none focus-visible:outline-none",
            sidePosition[side],
            animationClass,
            className,
          )}
        >
          <RadixDialog.Title className="text-heading-sm font-semibold text-text-primary pe-8">
            {title}
          </RadixDialog.Title>
          {description && (
            <RadixDialog.Description className="mt-1 text-body-sm text-text-secondary">
              {description}
            </RadixDialog.Description>
          )}
          {children && <div className="mt-4 flex-1 overflow-y-auto">{children}</div>}
          <RadixDialog.Close asChild>
            <IconButton
              aria-label="Close"
              variant="ghost"
              size="sm"
              className="absolute end-3 top-3"
            >
              <X className="size-4" />
            </IconButton>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
