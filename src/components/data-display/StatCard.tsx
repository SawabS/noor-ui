import * as React from "react";
import { ArrowUp, ArrowDown, type LucideIcon } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Card } from "./Card";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  trend?: {
    direction: "up" | "down";
    value: string;
  };
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, icon: IconComponent, trend, className, ...props }, ref) => (
    <Card ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
      <div className="flex items-start justify-between">
        <span className="text-body-sm text-text-secondary">{label}</span>
        {IconComponent ? (
          <span className="flex size-8 items-center justify-center rounded-md bg-surface-raised text-text-secondary">
            <IconComponent className="size-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-heading-md font-semibold text-text-primary">{value}</span>
        {trend ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-caption font-medium",
              trend.direction === "up" ? "text-success" : "text-danger",
            )}
          >
            {trend.direction === "up" ? (
              <ArrowUp className="size-3" aria-hidden="true" />
            ) : (
              <ArrowDown className="size-3" aria-hidden="true" />
            )}
            {trend.value}
          </span>
        ) : null}
      </div>
    </Card>
  ),
);
StatCard.displayName = "StatCard";
