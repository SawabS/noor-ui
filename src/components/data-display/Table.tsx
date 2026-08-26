import * as React from "react";
import { cn } from "../../utilities/cn";
import { formatRenderCapNotice } from "../../utilities/render-cap";

export const Table = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-x-auto">
    <table ref={ref} className={cn("w-full border-collapse text-start", className)} {...props} />
  </div>
));
Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <thead ref={ref} className={cn(className)} {...props} />);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <tbody ref={ref} className={cn(className)} {...props} />);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-border last:border-0 hover:bg-surface-hover transition-colors duration-fast",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-4 py-3 text-start text-label text-text-secondary font-medium border-b border-border",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-4 py-3 text-start text-body-sm text-text-primary", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export interface TableTruncationRowProps extends Omit<
  React.HTMLAttributes<HTMLTableRowElement>,
  "children"
> {
  /** Rows actually painted. */
  shown: number;
  /** Rows that matched — always the full count, never `shown`. */
  total: number;
  /** Must match the table's column count so the notice spans the full width. */
  colSpan: number;
  locale?: string;
  children?: React.ReactNode;
}

/**
 * Footer row telling the reader that the table is showing a slice.
 *
 * `Table` is compositional — it takes children, not an array — so it cannot
 * apply a cap for you. Cap the array with `applyRenderCap` before mapping it
 * to rows, then render this at the end of the body. See
 * src/utilities/render-cap.ts for why the cap exists, and note that only
 * painting is bounded: `total` must come from the full result set so sorting,
 * filtering, counts and export stay honest.
 */
export const TableTruncationRow = React.forwardRef<HTMLTableRowElement, TableTruncationRowProps>(
  ({ shown, total, colSpan, locale, className, children, ...props }, ref) => (
    <tr ref={ref} className={cn("border-b border-border last:border-0", className)} {...props}>
      <td colSpan={colSpan} className="px-4 py-3 text-start text-caption text-text-muted">
        {children ?? formatRenderCapNotice({ shown, total, locale })}
      </td>
    </tr>
  ),
);
TableTruncationRow.displayName = "TableTruncationRow";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-3 text-caption text-text-muted text-start", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
