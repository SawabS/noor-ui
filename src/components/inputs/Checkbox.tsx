import * as React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import * as RadixLabel from "@radix-ui/react-label";
import { Check } from "lucide-react";
import { cn } from "../../utilities/cn";

export interface CheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>,
  "asChild"
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

/** The wrapping label padding extends the hit target toward the 44px WCAG
 *  2.2 AA minimum without inflating the compact 16px visual box. */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ id, label, description, className, ...props }, ref) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const control = (
    <RadixCheckbox.Root
      ref={ref}
      id={inputId}
      className={cn(
        "peer size-4 shrink-0 rounded-xs border border-border-strong bg-surface",
        "transition-colors duration-fast ease-standard",
        "data-[state=checked]:bg-primary-action data-[state=checked]:border-primary-action",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        "disabled:pointer-events-none disabled:opacity-disabled",
        className,
      )}
      {...props}
    >
      <RadixCheckbox.Indicator className="flex items-center justify-center text-primary-action-text">
        <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );

  if (!label) return control;

  return (
    <RadixLabel.Root
      htmlFor={inputId}
      className="inline-flex cursor-pointer items-start gap-2.5 py-2.5 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-disabled"
      data-disabled={props.disabled || undefined}
    >
      {control}
      <span className="flex flex-col">
        <span className="text-body-sm text-text-primary">{label}</span>
        {description && <span className="text-caption text-text-secondary">{description}</span>}
      </span>
    </RadixLabel.Root>
  );
});
Checkbox.displayName = "Checkbox";
