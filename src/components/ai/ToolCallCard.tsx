import * as React from "react";
import { ChevronDown, Wrench, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { Typography } from "../primitives/Typography";
import { Spinner } from "../primitives/Spinner";

export type ToolCallStatus = "running" | "success" | "error";

export interface ToolCallCardProps {
  /** e.g. "search_web", "run_code" */
  toolName: string;
  status: ToolCallStatus;
  /** Short human-readable summary, e.g. "Searching for \"noor ui\"" */
  summary?: string;
  args?: unknown;
  result?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const statusIcon: Record<ToolCallStatus, React.ReactNode> = {
  running: <Spinner size="sm" label="Running" />,
  success: <Icon icon={CheckCircle2} size="sm" className="text-success" />,
  error: <Icon icon={XCircle} size="sm" className="text-danger" />,
};

/** Shows a tool/function invocation made by the assistant, with its arguments and result. */
export function ToolCallCard({
  toolName,
  status,
  summary,
  args,
  result,
  defaultOpen = false,
  className,
}: ToolCallCardProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const contentId = React.useId();
  const hasDetail = args !== undefined || result !== undefined;

  return (
    <div className={cn("rounded-md border border-border bg-surface", className)}>
      <button
        type="button"
        onClick={() => hasDetail && setOpen((o) => !o)}
        aria-expanded={hasDetail ? open : undefined}
        aria-controls={hasDetail ? contentId : undefined}
        disabled={!hasDetail}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-start",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          !hasDetail && "cursor-default",
        )}
      >
        <Icon icon={Wrench} size="sm" className="text-text-muted" />
        <span className="flex-1 min-w-0">
          <Typography variant="body-sm" weight="medium" truncate>
            {toolName}
          </Typography>
          {summary ? (
            <Typography variant="caption" color="secondary" truncate>
              {summary}
            </Typography>
          ) : null}
        </span>
        {statusIcon[status]}
        {hasDetail ? (
          <Icon
            icon={ChevronDown}
            size="sm"
            className={cn(
              "text-text-muted transition-transform duration-fast ease-standard motion-reduce:transition-none",
              open && "rotate-180",
            )}
          />
        ) : null}
      </button>
      {hasDetail ? (
        <div id={contentId} hidden={!open} className="space-y-2 border-t border-border px-3 py-2">
          {args !== undefined ? (
            <div>
              <Typography variant="caption" color="muted" className="uppercase tracking-wide">
                Arguments
              </Typography>
              <pre className="mt-1 overflow-x-auto rounded-sm bg-surface-raised p-2 text-caption font-mono text-text-secondary">
                {JSON.stringify(args, null, 2)}
              </pre>
            </div>
          ) : null}
          {result !== undefined ? (
            <div>
              <Typography variant="caption" color="muted" className="uppercase tracking-wide">
                Result
              </Typography>
              <div className="mt-1 text-body-sm text-text-secondary">{result}</div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
