import * as React from "react";
import { cn } from "../../utilities/cn";

export interface CitationProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  index: number;
  href?: string;
  title?: string;
}

/** Inline numbered source reference. Renders as a small pill; wraps in a
 *  native `title` attribute for a lightweight hint rather than depending
 *  on the Tooltip component, so it has no cross-category dependency. */
export const Citation = React.forwardRef<HTMLAnchorElement, CitationProps>(
  ({ index, href, title, className, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      title={title}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex size-4 items-center justify-center rounded-pill bg-surface-raised align-super",
        "text-caption font-medium text-text-secondary no-underline",
        "hover:bg-surface-hover hover:text-text-primary transition-colors duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1 focus-visible:ring-offset-canvas",
        className,
      )}
      {...props}
    >
      {index}
    </a>
  ),
);
Citation.displayName = "Citation";
