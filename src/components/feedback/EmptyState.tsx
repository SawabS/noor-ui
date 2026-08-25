import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../utilities/cn";
import { isIconComponent } from "../../utilities/is-icon-component";
import { Icon } from "../primitives/Icon";
import { Typography } from "../primitives/Typography";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon | React.ReactNode;
  heading: string;
  /** Semantic heading element. Defaults to h3 through the heading-sm type style. */
  headingAs?: "h1" | "h2" | "h3";
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, heading, headingAs, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex max-w-content-sm flex-col items-center gap-3 py-16 text-center",
        className,
      )}
      {...props}
    >
      {icon &&
        (isIconComponent(icon) ? (
          <Icon icon={icon} size="xl" className="text-text-muted" />
        ) : (
          <div className="text-text-muted">{icon}</div>
        ))}
      <Typography as={headingAs} variant="heading-sm" className="mt-1">
        {heading}
      </Typography>
      {description && (
        <Typography variant="body-sm" color="secondary">
          {description}
        </Typography>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";
