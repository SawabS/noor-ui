import * as React from "react";
import { cn } from "../../utilities/cn";
import { useControllableState } from "../../hooks/use-controllable-state";
import { TravellingMarker, useTravellingMarker } from "../primitives/TravellingMarker";
import type { Orientation } from "../../foundations/types";

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
  /** Lays segments out in a column and swaps which arrow keys navigate. */
  orientation?: Orientation;
  className?: string;
  "aria-label": string;
}

/** role="radiogroup" of role="radio" segments with roving tabindex + arrow-key
 *  navigation, since this behaves like a single-select choice, not tabs.
 *
 *  Selection is drawn by a single marker that travels between segments rather
 *  than by giving the active segment its own background. The old approach
 *  painted an opaque `bg-surface` slab, which reads as a solid black block on
 *  a translucent canvas, and made changing segments look like "the old thing
 *  turned off and a new thing turned on" instead of a marker moving. */
export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  className,
  ...ariaProps
}: SegmentedControlProps) {
  const [current, setCurrent] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? options[0]?.value ?? "",
    onChange: onValueChange,
  });
  const refs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const { trackRef, registerItem, box, ready } = useTravellingMarker(current);

  const focusIndex = (index: number) => {
    const option = options[index];
    if (!option) return;
    if (option.disabled) return;
    refs.current.get(option.value)?.focus();
    setCurrent(option.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const isRtl = document.dir === "rtl" || e.currentTarget.closest('[dir="rtl"]') !== null;
    // Only the *horizontal* arrows flip under RTL. Up/Down are physical in
    // every writing direction, so mirroring them reverses vertical groups for
    // Arabic and Sorani readers for no reason.
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
      ref={trackRef}
      role="radiogroup"
      aria-orientation={orientation}
      {...ariaProps}
      className={cn(
        "n-segmented n-marker-track inline-flex gap-0.5 bg-surface-raised",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
    >
      <TravellingMarker box={box} ready={ready} />
      {options.map((option, index) => {
        const isActive = option.value === current;
        return (
          <button
            key={option.value}
            ref={(el) => {
              if (el) refs.current.set(option.value, el);
              else refs.current.delete(option.value);
              registerItem(option.value, el);
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={option.disabled}
            onClick={() => setCurrent(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "n-marker-item n-ghost-control rounded-sm px-3 py-1.5 text-body-sm font-medium",
              "transition-colors duration-fast ease-standard",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
              "disabled:pointer-events-none disabled:opacity-disabled",
              // Hover tints the label, never the background: a hover fill would
              // put a second slab behind the travelling marker and the two fight.
              isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
