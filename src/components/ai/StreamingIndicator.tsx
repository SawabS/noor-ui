import * as React from "react";
import { cn } from "../../utilities/cn";

export interface StreamingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text announced to screen readers while streaming (visually hidden). */
  label?: string;
}

/** Three-dot "thinking" indicator for assistant turns still streaming. */
export const StreamingIndicator = React.forwardRef<HTMLDivElement, StreamingIndicatorProps>(
  ({ className, label = "Assistant is responding", ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          data-motion-safe
          className="size-1.5 rounded-pill bg-text-muted animate-pulse-soft"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </div>
  ),
);
StreamingIndicator.displayName = "StreamingIndicator";
