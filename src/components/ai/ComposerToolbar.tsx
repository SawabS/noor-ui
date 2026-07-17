import * as React from "react";
import { cn } from "../../utilities/cn";

export interface ComposerToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left-aligned in LTR, right-aligned in RTL — attach/mode controls typically live here. */
  leading?: React.ReactNode;
  /** Right-aligned in LTR, left-aligned in RTL — model selector/submit typically live here. */
  trailing?: React.ReactNode;
}

/** Layout row for composer actions. Used internally by PromptComposer, but
 *  exported standalone for custom composer layouts. */
export const ComposerToolbar = React.forwardRef<HTMLDivElement, ComposerToolbarProps>(
  ({ leading, trailing, className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between gap-2", className)} {...props}>
      <div className="flex items-center gap-1">{leading}</div>
      {children}
      <div className="flex items-center gap-1">{trailing}</div>
    </div>
  ),
);
ComposerToolbar.displayName = "ComposerToolbar";
