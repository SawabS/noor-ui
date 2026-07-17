import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { IconButton } from "../inputs/IconButton";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
}

type PageEntry = number | "ellipsis-start" | "ellipsis-end";

function getPageEntries(current: number, total: number): PageEntry[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const entries: PageEntry[] = [1];
  if (current > 3) entries.push("ellipsis-start");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let page = start; page <= end; page++) entries.push(page);

  if (current < total - 2) entries.push("ellipsis-end");
  entries.push(total);

  return entries;
}

/** Numbered pagination with a collapsing ellipsis for large ranges. */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      previousLabel = "Previous page",
      nextLabel = "Next page",
      className,
      ...props
    },
    ref,
  ) => {
    const entries = getPageEntries(currentPage, totalPages);

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        <IconButton
          aria-label={previousLabel}
          variant="ghost"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Icon icon={ChevronLeft} size="sm" className="rtl:rotate-180" />
        </IconButton>

        <ul className="flex items-center gap-1">
          {entries.map((entry, index) =>
            typeof entry === "number" ? (
              <li key={entry}>
                <button
                  type="button"
                  aria-current={entry === currentPage ? "page" : undefined}
                  onClick={() => onPageChange(entry)}
                  className={cn(
                    "inline-flex size-8 items-center justify-center rounded-md text-body-sm font-medium transition-colors duration-fast ease-standard",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    entry === currentPage
                      ? "bg-primary-action text-primary-action-text"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
                  )}
                >
                  {entry}
                </button>
              </li>
            ) : (
              <li
                key={`${entry}-${index}`}
                aria-hidden="true"
                className="inline-flex size-8 items-center justify-center text-text-muted"
              >
                …
              </li>
            ),
          )}
        </ul>

        <IconButton
          aria-label={nextLabel}
          variant="ghost"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <Icon icon={ChevronRight} size="sm" className="rtl:rotate-180" />
        </IconButton>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";
