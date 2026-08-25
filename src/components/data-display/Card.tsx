import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utilities/cn";
import { getSurfaceClassName } from "../../utilities/surface";
import type { SurfaceVariant } from "../../foundations/types";

const cardVariants = cva("border border-border rounded-lg", {
  variants: {
    surface: {
      solid: getSurfaceClassName("solid"),
      tonal: getSurfaceClassName("tonal"),
      material: getSurfaceClassName("material"),
      elevated: getSurfaceClassName("elevated"),
    } satisfies Record<SurfaceVariant, string>,
    padding: {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
    interactive: {
      true: "cursor-pointer transition-colors duration-fast ease-standard hover:border-border-strong hover:shadow-sm",
    },
  },
  defaultVariants: { padding: "md", surface: "solid" },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, interactive, surface, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ padding, interactive, surface }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 mb-4", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-body font-semibold text-text-primary", className)} {...props}>
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-body-sm text-text-secondary", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn(className)} {...props} />,
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 mt-4", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";
