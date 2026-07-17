import * as React from "react";
import { ChevronDown, Brain } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { Typography } from "../primitives/Typography";
import { Spinner } from "../primitives/Spinner";

export interface ReasoningBlockProps {
  /** Collapsed by default; expands to reveal the reasoning trace. */
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Shown in the trigger, e.g. "Thought for 4 seconds". */
  summary?: string;
  streaming?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** A collapsible "thinking"/reasoning trace shown above an assistant message. */
export function ReasoningBlock({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  summary = "Reasoning",
  streaming = false,
  children,
  className,
}: ReasoningBlockProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const contentId = React.useId();

  const toggle = () => {
    const next = !open;
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cn("rounded-md border border-border bg-surface-raised", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={contentId}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-start",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised",
        )}
      >
        {streaming ? (
          <Spinner size="sm" label="" />
        ) : (
          <Icon icon={Brain} size="sm" className="text-text-muted" />
        )}
        <Typography variant="body-sm" color="secondary" className="flex-1">
          {summary}
        </Typography>
        <Icon
          icon={ChevronDown}
          size="sm"
          className={cn(
            "text-text-muted transition-transform duration-fast ease-standard motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        id={contentId}
        hidden={!open}
        className="border-t border-border px-3 py-2 text-body-sm text-text-secondary"
      >
        {children}
      </div>
    </div>
  );
}
