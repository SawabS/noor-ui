import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

/** aria-labelled trail. The final item is rendered as the current page and
 *  is never a link, even if `href` was passed for it. */
export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, className, ...props }, ref) => {
    const lastIndex = items.length - 1;
    return (
      <nav ref={ref} aria-label="Breadcrumb" className={className} {...props}>
        <ol className="flex flex-wrap items-center gap-1.5 text-body-sm">
          {items.map((item, index) => {
            const isCurrent = index === lastIndex;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {isCurrent ? (
                  <span aria-current="page" className="font-medium text-text-primary">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className={cn(
                      "text-text-secondary transition-colors duration-fast ease-standard hover:text-text-primary",
                      "rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    )}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={cn(
                      "text-text-secondary transition-colors duration-fast ease-standard hover:text-text-primary",
                      "rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    )}
                  >
                    {item.label}
                  </button>
                )}
                {!isCurrent && (
                  <Icon icon={ChevronRight} size="xs" className="text-text-muted rtl:rotate-180" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);
Breadcrumbs.displayName = "Breadcrumbs";
