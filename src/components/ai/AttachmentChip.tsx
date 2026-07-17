import * as React from "react";
import { File, X } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { Spinner } from "../primitives/Spinner";
import { Typography } from "../primitives/Typography";

export interface AttachmentChipProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** File size, pre-formatted (e.g. "1.2 MB"). */
  meta?: string;
  thumbnailUrl?: string;
  uploading?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
}

/** A file/image attached to the composer, shown above the textarea. */
export const AttachmentChip = React.forwardRef<HTMLDivElement, AttachmentChipProps>(
  (
    {
      name,
      meta,
      thumbnailUrl,
      uploading,
      onRemove,
      removeLabel = "Remove attachment",
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "group relative flex items-center gap-2 rounded-md border border-border bg-surface-raised py-1.5 ps-1.5 pe-2",
        className,
      )}
      {...props}
    >
      <span className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-surface">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="" className="size-full object-cover" />
        ) : (
          <Icon icon={File} size="sm" className="text-text-muted" />
        )}
        {uploading ? (
          <span className="absolute inset-0 flex items-center justify-center bg-surface/80">
            <Spinner size="sm" label="Uploading" />
          </span>
        ) : null}
      </span>
      <span className="flex max-w-32 flex-col leading-tight">
        <Typography variant="caption" weight="medium" truncate>
          {name}
        </Typography>
        {meta ? (
          <Typography variant="caption" color="muted">
            {meta}
          </Typography>
        ) : null}
      </span>
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className={cn(
            "ms-1 flex size-5 shrink-0 items-center justify-center rounded-pill text-text-muted",
            "hover:bg-surface-hover hover:text-text-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-1 focus-visible:ring-offset-surface-raised",
          )}
        >
          <Icon icon={X} size="xs" />
        </button>
      ) : null}
    </div>
  ),
);
AttachmentChip.displayName = "AttachmentChip";
