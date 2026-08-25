import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utilities/cn";
import { Spinner } from "../primitives/Spinner";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md",
    "text-body-sm font-medium transition-colors duration-fast ease-standard",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "disabled:pointer-events-none disabled:opacity-disabled",
  ],
  {
    variants: {
      variant: {
        primary: "n-primary-control bg-primary-action text-primary-action-text hover:opacity-90",
        secondary:
          "n-control bg-surface-raised text-text-primary border border-border hover:bg-surface-hover",
        outline:
          "n-control border border-border-strong text-text-primary bg-transparent hover:bg-surface-hover",
        ghost: "bg-transparent text-text-primary hover:bg-surface-hover",
        danger: "bg-danger text-danger-contrast hover:opacity-90",
        link: "bg-transparent text-text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-control-sm px-3 text-caption",
        md: "h-control-md px-4",
        lg: "h-control-lg px-5 text-body",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Spinner size="sm" label="" aria-hidden="true" /> : leadingIcon}
        {children}
        {!loading && trailingIcon}
      </Comp>
    );
  },
);
Button.displayName = "Button";
