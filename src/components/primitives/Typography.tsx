import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utilities/cn";

const typographyVariants = cva("text-text-primary", {
  variants: {
    variant: {
      caption: "text-caption font-regular",
      label: "text-label font-medium",
      "body-sm": "text-body-sm font-regular",
      body: "text-body font-regular",
      "body-lg": "text-body-lg font-regular",
      "heading-sm": "text-heading-sm font-semibold",
      "heading-md": "text-heading-md font-semibold",
      "heading-lg": "text-heading-lg font-semibold",
      display: "text-display font-bold",
    },
    color: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      muted: "text-text-muted",
      inherit: "text-inherit",
    },
    weight: {
      regular: "font-regular",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    truncate: {
      true: "truncate",
    },
  },
  defaultVariants: { variant: "body", color: "primary" },
});

const defaultElement: Record<
  NonNullable<VariantProps<typeof typographyVariants>["variant"]>,
  React.ElementType
> = {
  caption: "span",
  label: "span",
  "body-sm": "p",
  body: "p",
  "body-lg": "p",
  "heading-sm": "h3",
  "heading-md": "h2",
  "heading-lg": "h1",
  display: "h1",
};

export interface TypographyProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

/** Renders the shared type scale. Picks a sensible semantic tag per variant
 *  (headings render as h1-h3, body copy as p) — override with `as`. */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "body", color, weight, truncate, as, className, ...props }, ref) => {
    const Component = as ?? defaultElement[variant ?? "body"];
    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant, color, weight, truncate }), className)}
        {...props}
      />
    );
  },
);
Typography.displayName = "Typography";
