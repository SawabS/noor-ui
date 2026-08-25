import * as React from "react";
import { cn } from "../../utilities/cn";
import { useControllableState } from "../../hooks/use-controllable-state";

export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  "aria-label": string;
}

/** role="radiogroup" of role="radio" segments with roving tabindex + arrow-key
 *  navigation, since this behaves like a single-select choice, not tabs. */
export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  ...ariaProps
}: SegmentedControlProps) {
  const [current, setCurrent] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? options[0]?.value ?? "",
    onChange: onValueChange,
  });
  const refs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  const focusIndex = (index: number) => {
    const option = options[index];
    if (!option) return;
    if (option.disabled) return;
    refs.current.get(option.value)?.focus();
    setCurrent(option.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const isRtl = document.dir === "rtl" || e.currentTarget.closest('[dir="rtl"]') !== null;
    const nextKey = isRtl ? "ArrowLeft" : "ArrowRight";
    const prevKey = isRtl ? "ArrowRight" : "ArrowLeft";

    if (e.key === nextKey || e.key === "ArrowDown") {
      e.preventDefault();
      focusIndex((index + 1) % options.length);
    } else if (e.key === prevKey || e.key === "ArrowUp") {
      e.preventDefault();
      focusIndex((index - 1 + options.length) % options.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusIndex(options.length - 1);
    }
  };

  return (
    <div
      role="radiogroup"
      {...ariaProps}
      className={cn("n-segmented inline-flex gap-0.5 rounded-md bg-surface-raised p-1", className)}
    >
      {options.map((option, index) => {
        const isActive = option.value === current;
        return (
          <button
            key={option.value}
            ref={(el) => {
              if (el) refs.current.set(option.value, el);
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={option.disabled}
            onClick={() => setCurrent(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "rounded-sm px-3 py-1.5 text-body-sm font-medium transition-colors duration-fast ease-standard",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
              "disabled:pointer-events-none disabled:opacity-disabled",
              isActive
                ? "bg-surface text-text-primary shadow-xs"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
