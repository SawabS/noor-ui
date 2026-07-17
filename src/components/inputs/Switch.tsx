import * as React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import * as RadixLabel from "@radix-ui/react-label";
import { cn } from "../../utilities/cn";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Switch = React.forwardRef<React.ElementRef<typeof RadixSwitch.Root>, SwitchProps>(
  ({ id, label, description, className, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const control = (
      <RadixSwitch.Root
        ref={ref}
        id={inputId}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-pill bg-surface-active",
          "transition-colors duration-fast ease-standard",
          "data-[state=checked]:bg-primary-action",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          "disabled:pointer-events-none disabled:opacity-disabled",
          className,
        )}
        {...props}
      >
        <RadixSwitch.Thumb
          className={cn(
            "block size-3.5 rounded-pill bg-surface shadow-xs",
            "transition-transform duration-fast ease-standard",
            "translate-x-1 rtl:-translate-x-1",
            "data-[state=checked]:translate-x-[18px] data-[state=checked]:rtl:-translate-x-[18px]",
          )}
        />
      </RadixSwitch.Root>
    );

    if (!label) return control;

    return (
      <RadixLabel.Root
        htmlFor={inputId}
        className="inline-flex w-full cursor-pointer items-center justify-between gap-4 py-2.5 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-disabled"
        data-disabled={props.disabled || undefined}
      >
        <span className="flex flex-col">
          <span className="text-body-sm text-text-primary">{label}</span>
          {description && <span className="text-caption text-text-secondary">{description}</span>}
        </span>
        {control}
      </RadixLabel.Root>
    );
  },
);
Switch.displayName = "Switch";
