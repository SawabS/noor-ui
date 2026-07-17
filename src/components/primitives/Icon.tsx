import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../utilities/cn";

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: { size: "md" },
});

export interface IconProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "children">, VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  /** Accessible label. Omit for purely decorative icons (default: aria-hidden). */
  label?: string;
}

/** Consistent-size wrapper around lucide-react icons with sane a11y defaults. */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: LucideIconComponent, size, label, className, ...props }, ref) => {
    return (
      <LucideIconComponent
        ref={ref}
        className={cn(iconVariants({ size }), className)}
        aria-hidden={label ? undefined : true}
        role={label ? "img" : undefined}
        aria-label={label}
        strokeWidth={1.75}
        {...props}
      />
    );
  },
);
Icon.displayName = "Icon";
