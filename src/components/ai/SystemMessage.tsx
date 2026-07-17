import * as React from "react";
import { cn } from "../../utilities/cn";

export interface SystemMessageProps {
  children: React.ReactNode;
  className?: string;
}

/** A centered, muted status line for system-level notices (mode changed,
 *  conversation shared, etc.) — never competes visually with real turns. */
export function SystemMessage({ children, className }: SystemMessageProps) {
  return (
    <div role="status" className={cn("flex justify-center py-1", className)}>
      <span className="rounded-pill bg-surface-raised px-3 py-1 text-caption text-text-muted">
        {children}
      </span>
    </div>
  );
}
