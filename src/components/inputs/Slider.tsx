import * as React from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { cn } from "../../utilities/cn";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof RadixSlider.Root> {
  "aria-label": string;
}

export const Slider = React.forwardRef<React.ElementRef<typeof RadixSlider.Root>, SliderProps>(
  ({ className, defaultValue = [0], min = 0, max = 100, step = 1, ...props }, ref) => {
    const thumbCount = (props.value ?? defaultValue)?.length ?? 1;
    return (
      <RadixSlider.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center py-2",
          "disabled:pointer-events-none disabled:opacity-disabled",
          className,
        )}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        {...props}
      >
        <RadixSlider.Track className="relative h-1.5 w-full grow rounded-pill bg-surface-active">
          <RadixSlider.Range className="absolute h-full rounded-pill bg-primary-action" />
        </RadixSlider.Track>
        {Array.from({ length: thumbCount }).map((_, index) => (
          <RadixSlider.Thumb
            key={index}
            className={cn(
              "block size-4 rounded-pill bg-primary-action shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
            )}
          />
        ))}
      </RadixSlider.Root>
    );
  },
);
Slider.displayName = "Slider";
