import * as React from "react";
import * as RadixProgress from "@radix-ui/react-progress";
import { cn } from "../../utilities/cn";

export interface ProgressProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixProgress.Root>,
  "value"
> {
  /** 0-100, or null/undefined for an indeterminate track. */
  value?: number | null;
  label?: string;
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof RadixProgress.Root>,
  ProgressProps
>(({ className, value, label = "Loading", ...props }, ref) => {
  const indeterminate = value === null || value === undefined;
  return (
    <RadixProgress.Root
      ref={ref}
      value={indeterminate ? undefined : value}
      aria-label={label}
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-pill bg-surface-active",
        indeterminate && "animate-pulse-soft motion-reduce:animate-none",
        className,
      )}
      data-motion-safe={indeterminate ? true : undefined}
      {...props}
    >
      <RadixProgress.Indicator
        className="h-full rounded-pill bg-primary-action transition-[width] duration-base ease-standard"
        style={{ width: `${indeterminate ? 100 : (value ?? 0)}%` }}
      />
    </RadixProgress.Root>
  );
});
Progress.displayName = "Progress";
