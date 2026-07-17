import { Select } from "../inputs/Select";

export interface ModelOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ModelSelectorProps {
  models: ModelOption[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

/** Compact model picker for the composer toolbar. Thin wrapper around Select
 *  so it inherits full keyboard support and RTL correctness for free. */
export function ModelSelector({
  models,
  value,
  onValueChange,
  disabled,
  className,
}: ModelSelectorProps) {
  return (
    <Select
      aria-label="Model"
      size="sm"
      options={models}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      className={className}
    />
  );
}
