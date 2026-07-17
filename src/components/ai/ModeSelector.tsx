import * as React from "react";
import { SegmentedControl } from "../inputs/SegmentedControl";

export interface ModeOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface ModeSelectorProps {
  modes: ModeOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  "aria-label"?: string;
}

/** Switches between conversation modes (e.g. Chat / Research / Code). */
export function ModeSelector({
  modes,
  value,
  defaultValue,
  onValueChange,
  className,
  "aria-label": ariaLabel = "Conversation mode",
}: ModeSelectorProps) {
  return (
    <SegmentedControl
      aria-label={ariaLabel}
      options={modes}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={className}
    />
  );
}
