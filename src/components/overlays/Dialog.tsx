import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../utilities/cn";
import { IconButton } from "../inputs/IconButton";

export const DialogPrimitive = RadixDialog;

export interface DialogProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  /**
   * Always required, even if visually hidden — Radix requires an accessible
   * dialog name. To hide it visually, wrap your own text in
   * `<VisuallyHidden>` (src/components/primitives/VisuallyHidden.tsx) and
   * pass that as `title`, rather than omitting title entirely.
   */
  title: React.ReactNode;
  description?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/** A composed Dialog for the common case. For advanced composition, use the
 *  exported DialogPrimitive namespace directly (Root/Trigger/Content/...). */
export function Dialog({
  children,
  trigger,
  title,
  description,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: DialogProps) {
  return (
    <RadixDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={cn(
            "fixed inset-0 z-overlay bg-[rgb(var(--n-shadow-color)/0.4)]",
            "animate-fade-in motion-reduce:animate-none",
          )}
        />
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none">
          <RadixDialog.Content
            className={cn(
              "relative w-full max-w-content-sm pointer-events-auto",
              "rounded-lg border border-border bg-surface p-6 shadow-lg",
              "animate-slide-in-from-bottom motion-reduce:animate-none",
              "focus-visible:outline-none",
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
            {children && <div className="mt-4">{children}</div>}
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
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
