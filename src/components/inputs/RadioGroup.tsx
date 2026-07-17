import * as React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import * as RadixLabel from "@radix-ui/react-label";
import { cn } from "../../utilities/cn";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>,
  "children"
> {
  options: RadioOption[];
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  RadioGroupProps
>(({ options, className, orientation = "vertical", ...props }, ref) => {
  const generatedId = React.useId();
  return (
    <RadixRadioGroup.Root
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap gap-4",
        className,
      )}
      {...props}
    >
      {options.map((option, index) => {
        const inputId = `${generatedId}-${index}`;
        return (
          <RadixLabel.Root
            key={option.value}
            htmlFor={inputId}
            className="inline-flex cursor-pointer items-start gap-2.5 py-2.5 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-disabled"
            data-disabled={option.disabled || undefined}
          >
            <RadixRadioGroup.Item
              id={inputId}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                "size-4 shrink-0 rounded-pill border border-border-strong bg-surface",
                "transition-colors duration-fast ease-standard",
                "data-[state=checked]:border-primary-action",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                "disabled:pointer-events-none disabled:opacity-disabled",
              )}
            >
              <RadixRadioGroup.Indicator className="relative flex size-full items-center justify-center after:size-1.5 after:rounded-pill after:bg-primary-action" />
            </RadixRadioGroup.Item>
            <span className="flex flex-col">
              <span className="text-body-sm text-text-primary">{option.label}</span>
              {option.description && (
                <span className="text-caption text-text-secondary">{option.description}</span>
              )}
            </span>
          </RadixLabel.Root>
        );
      })}
    </RadixRadioGroup.Root>
  );
});
RadioGroup.displayName = "RadioGroup";
