import * as React from "react";
import { cn } from "../../utilities/cn";
import type { OverlaySurfaceVariant } from "../../foundations/types";
import { getSurfaceClassName } from "../../utilities/surface";

export interface TopNavigationProps extends React.HTMLAttributes<HTMLElement> {
  start?: React.ReactNode;
  center?: React.ReactNode;
  end?: React.ReactNode;
  surface?: Extract<OverlaySurfaceVariant, "auto" | "solid" | "material">;
}

/** App header bar with logical start/center/end slots (not left/right) so
 *  the layout mirrors correctly under RTL without any conditional logic. */
export const TopNavigation = React.forwardRef<HTMLElement, TopNavigationProps>(
  ({ start, center, end, surface = "auto", className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border px-4",
        surface === "auto"
          ? "n-surface-auto bg-canvas"
          : surface === "solid"
            ? "bg-canvas"
            : getSurfaceClassName("material"),
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">{start}</div>
      {center && <div className="flex shrink-0 items-center justify-center">{center}</div>}
      <div className="flex flex-1 items-center justify-end gap-2">{end}</div>
    </header>
  ),
);
TopNavigation.displayName = "TopNavigation";
