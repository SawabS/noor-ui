import * as React from "react";
import { cn } from "../../utilities/cn";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

/** Loading placeholder. Reduced-motion users get a static tone instead of a pulse. */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(
        "animate-pulse-soft motion-reduce:animate-none rounded-sm bg-surface-hover",
        className,
      )}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";
