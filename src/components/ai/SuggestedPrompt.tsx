import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { Typography } from "../primitives/Typography";

export interface SuggestedPromptProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  label: string;
  description?: string;
}

/** A clickable prompt starter shown on the welcome screen. */
export const SuggestedPrompt = React.forwardRef<HTMLButtonElement, SuggestedPromptProps>(
  ({ icon, label, description, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "n-suggestion-surface flex w-full items-start gap-3 rounded-lg border border-border bg-surface p-4 text-start",
        "transition-colors duration-fast ease-standard hover:bg-surface-hover hover:border-border-strong",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-raised text-text-secondary">
          <Icon icon={icon} size="sm" />
        </span>
      ) : null}
      <span className="flex flex-col gap-0.5">
        <Typography variant="body-sm" weight="medium">
          {label}
        </Typography>
        {description ? (
          <Typography variant="caption" color="secondary">
            {description}
          </Typography>
        ) : null}
      </span>
    </button>
  ),
);
SuggestedPrompt.displayName = "SuggestedPrompt";
