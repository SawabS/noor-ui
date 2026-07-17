import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../utilities/cn";
import { IconButton } from "../inputs/IconButton";
import { Typography } from "../primitives/Typography";

export interface ArtifactPanelProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

/** A right-hand rail for rendering generated artifacts (code, documents,
 *  previews) alongside the conversation. Sits as a sibling in ChatLayout's
 *  flex row — `border-s` keeps the divider on the correct side under RTL. */
export function ArtifactPanel({
  title,
  subtitle,
  children,
  onClose,
  actions,
  className,
}: ArtifactPanelProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-full max-w-xl shrink-0 flex-col border-s border-border bg-surface sm:w-[32rem]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <Typography variant="body-sm" weight="semibold" truncate>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="muted" truncate>
              {subtitle}
            </Typography>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {actions}
          {onClose && (
            <IconButton aria-label="Close panel" variant="ghost" size="sm" onClick={onClose}>
              <X className="size-4" />
            </IconButton>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </aside>
  );
}
