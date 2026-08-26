import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utilities/cn";
import { Spinner } from "../primitives/Spinner";

export const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0 rounded-md",
    "transition-colors duration-fast ease-standard",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "disabled:pointer-events-none disabled:opacity-disabled",
  ],
  {
    variants: {
      variant: {
        primary: "n-primary-control bg-primary-action text-primary-action-text hover:opacity-90",
        secondary:
          "n-control bg-surface-raised text-text-primary border border-border hover:bg-surface-hover",
        ghost:
          "n-ghost-control bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary",
        outline:
          "n-control border border-border-strong text-text-primary bg-transparent hover:bg-surface-hover",
      },
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  /** Required — icon-only buttons must always have an accessible name. */
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Spinner size="sm" label="" aria-hidden="true" /> : children}
      </Comp>
    );
  },
);
IconButton.displayName = "IconButton";
