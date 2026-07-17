import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utilities/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-pill font-medium text-caption whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "bg-surface-raised text-text-secondary",
        success: "bg-success-bg text-success",
        warning: "bg-warning-bg text-warning",
        danger: "bg-danger-bg text-danger",
        info: "bg-info-bg text-info",
        outline: "border border-border-strong text-text-secondary bg-transparent",
      },
      size: {
        sm: "px-2 py-0.5",
        md: "px-2.5 py-1",
      },
    },
    defaultVariants: { variant: "neutral", size: "sm" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
  ),
);
Badge.displayName = "Badge";
