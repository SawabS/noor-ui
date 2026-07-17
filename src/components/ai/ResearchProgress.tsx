import * as React from "react";
import { Circle, CheckCircle2 } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { Typography } from "../primitives/Typography";
import { Spinner } from "../primitives/Spinner";
import { Progress } from "../feedback/Progress";

export type ResearchStepStatus = "pending" | "active" | "done";

export interface ResearchStep {
  id: string;
  label: string;
  status: ResearchStepStatus;
  detail?: string;
}

export interface ResearchProgressProps {
  steps: ResearchStep[];
  className?: string;
}

const stepIcon: Record<ResearchStepStatus, React.ReactNode> = {
  pending: <Icon icon={Circle} size="sm" className="text-text-muted" />,
  active: <Spinner size="sm" label="" />,
  done: <Icon icon={CheckCircle2} size="sm" className="text-success" />,
};

/** Step-by-step progress for a multi-step/agentic research task. */
export function ResearchProgress({ steps, className }: ResearchProgressProps) {
  const doneCount = steps.filter((s) => s.status === "done").length;
  const percent = steps.length ? Math.round((doneCount / steps.length) * 100) : 0;
  const activeStep = steps.find((s) => s.status === "active");

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-border bg-surface p-4",
        className,
      )}
      role="group"
      aria-label="Research progress"
    >
      <div className="flex items-center justify-between gap-3">
        <Typography variant="body-sm" weight="medium">
          {activeStep
            ? activeStep.label
            : doneCount === steps.length
              ? "Research complete"
              : "Researching"}
        </Typography>
        <Typography variant="caption" color="muted">
          {doneCount}/{steps.length}
        </Typography>
      </div>
      <Progress value={percent} label="Research progress" />
      <ol className="flex flex-col gap-2">
        {steps.map((step) => (
          <li key={step.id} className="flex items-start gap-2.5">
            <span className="mt-0.5">{stepIcon[step.status]}</span>
            <span className="flex min-w-0 flex-col">
              <Typography
                variant="body-sm"
                color={step.status === "pending" ? "muted" : "primary"}
                aria-current={step.status === "active" ? "step" : undefined}
              >
                {step.label}
              </Typography>
              {step.detail ? (
                <Typography variant="caption" color="secondary">
                  {step.detail}
                </Typography>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
