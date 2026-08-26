import * as React from "react";
import { cn } from "../../utilities/cn";
import {
  DEFAULT_RENDER_CAP,
  applyRenderCap,
  formatRenderCapNotice,
} from "../../utilities/render-cap";

export interface DataListItem {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: DataListItem[];
  /**
   * Maximum rows painted. `null` paints everything. Only painting is bounded —
   * `items` is never mutated, so counts, filtering and export still see the
   * full array. See src/utilities/render-cap.ts.
   */
  renderCap?: number | null;
  /** Overrides the truncation footer copy. Receives shown/total counts. */
  renderCapNotice?: (shown: number, total: number) => React.ReactNode;
}

export const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  ({ items, renderCap = DEFAULT_RENDER_CAP, renderCapNotice, className, ...props }, ref) => {
    const { visible, total, truncated } = applyRenderCap(items, renderCap);
    return (
      <dl
        ref={ref}
        className={cn("grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[auto_1fr]", className)}
        {...props}
      >
        {visible.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            <dt className="text-body-sm text-text-secondary sm:min-w-32">{item.label}</dt>
            <dd className="text-body-sm text-text-primary">{item.value}</dd>
          </React.Fragment>
        ))}
        {truncated && (
          <dd className="text-caption text-text-muted sm:col-span-2">
            {renderCapNotice
              ? renderCapNotice(visible.length, total)
              : formatRenderCapNotice({ shown: visible.length, total })}
          </dd>
        )}
      </dl>
    );
  },
);
DataList.displayName = "DataList";
