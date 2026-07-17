import * as React from "react";
import { cn } from "../../utilities/cn";

export interface DataListItem {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: DataListItem[];
}

export const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  ({ items, className, ...props }, ref) => (
    <dl
      ref={ref}
      className={cn("grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[auto_1fr]", className)}
      {...props}
    >
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          <dt className="text-body-sm text-text-secondary sm:min-w-32">{item.label}</dt>
          <dd className="text-body-sm text-text-primary">{item.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  ),
);
DataList.displayName = "DataList";
