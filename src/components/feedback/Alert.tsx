import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { Typography } from "../primitives/Typography";
import { IconButton } from "../inputs/IconButton";

const alertVariants = cva("flex gap-3 rounded-lg border p-4", {
  variants: {
    variant: {
      info: "bg-info-bg border-border text-info",
      success: "bg-success-bg border-border text-success",
      warning: "bg-warning-bg border-border text-warning",
      danger: "bg-danger-bg border-border text-danger",
    },
  },
  defaultVariants: { variant: "info" },
});

const iconFor = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
  description?: React.ReactNode;
  onDismiss?: () => void;
}

/** Assertive (alert) for warning/danger since those demand attention;
 *  polite (status) for info/success which are ambient confirmations. */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, description, onDismiss, children, ...props }, ref) => {
    const isAssertive = variant === "warning" || variant === "danger";
    return (
      <div
        ref={ref}
        role={isAssertive ? "alert" : "status"}
        aria-live={isAssertive ? "assertive" : "polite"}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon icon={iconFor[variant ?? "info"]} size="sm" className="mt-0.5 shrink-0" />
        <div className="flex-1 text-text-primary">
          {title && (
            <Typography as="p" variant="label" color="primary" className="mb-0.5">
              {title}
            </Typography>
          )}
          {description && (
            <Typography as="p" variant="body-sm" color="secondary">
              {description}
            </Typography>
          )}
          {children}
        </div>
        {onDismiss && (
          <IconButton
            aria-label="Dismiss"
            variant="ghost"
            size="sm"
            className="-m-1 shrink-0"
            onClick={onDismiss}
          >
            <Icon icon={X} size="sm" />
          </IconButton>
        )}
      </div>
    );
  },
);
Alert.displayName = "Alert";
