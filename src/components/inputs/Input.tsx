import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utilities/cn";

export const inputVariants = cva(
  [
    "n-control flex w-full rounded-md border bg-surface text-text-primary text-body-sm",
    "placeholder:text-text-muted transition-colors duration-fast ease-standard",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "disabled:pointer-events-none disabled:opacity-disabled",
  ],
  {
    variants: {
      size: {
        sm: "h-control-sm px-2.5",
        md: "h-control-md px-3",
        lg: "h-control-lg px-4 text-body",
      },
      hasError: {
        true: "border-danger focus-visible:ring-danger",
        false: "border-border hover:border-border-strong",
      },
    },
    defaultVariants: { size: "md", hasError: false },
  },
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, containerClassName, size, error, leadingIcon, trailingIcon, disabled, ...props },
    ref,
  ) => {
    if (!leadingIcon && !trailingIcon) {
      return (
        <input
          ref={ref}
          className={cn(inputVariants({ size, hasError: error }), className)}
          disabled={disabled}
          aria-invalid={error || undefined}
          {...props}
        />
      );
    }

    return (
      <div
        className={cn(
          "relative flex items-center",
          disabled && "pointer-events-none opacity-disabled",
          containerClassName,
        )}
      >
        {leadingIcon && (
          <span className="pointer-events-none absolute start-3 flex items-center text-text-muted">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            inputVariants({ size, hasError: error }),
            leadingIcon && "ps-9",
            trailingIcon && "pe-9",
            className,
          )}
          disabled={disabled}
          aria-invalid={error || undefined}
          {...props}
        />
        {trailingIcon && (
          <span className="absolute end-3 flex items-center text-text-muted">{trailingIcon}</span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
