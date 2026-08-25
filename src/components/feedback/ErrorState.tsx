import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "../../utilities/cn";
import { isIconComponent } from "../../utilities/is-icon-component";
import { Icon } from "../primitives/Icon";
import { Typography } from "../primitives/Typography";
import { Button } from "../inputs/Button";
import type { EmptyStateProps } from "./EmptyState";

export interface ErrorStateProps extends Omit<EmptyStateProps, "icon" | "action"> {
  icon?: EmptyStateProps["icon"];
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ className, icon, heading, description, onRetry, retryLabel = "Try again", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex max-w-content-sm flex-col items-center gap-3 py-16 text-center",
        className,
      )}
      {...props}
    >
      {isIconComponent(icon) ? (
        <Icon icon={icon} size="xl" className="text-danger" />
      ) : icon ? (
        <div className="text-danger">{icon}</div>
      ) : (
        <Icon icon={AlertTriangle} size="xl" className="text-danger" />
      )}
      <Typography variant="heading-sm" className="mt-1">
        {heading}
      </Typography>
      {description && (
        <Typography variant="body-sm" color="secondary">
          {description}
        </Typography>
      )}
      {onRetry && (
        <Button variant="secondary" className="mt-2" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  ),
);
ErrorState.displayName = "ErrorState";
