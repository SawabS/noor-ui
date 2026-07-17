import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utilities/cn";

const triggerVariants = cva(
  [
    "inline-flex w-full items-center justify-between gap-2 rounded-md border border-border bg-surface",
    "text-body-sm text-text-primary transition-colors duration-fast ease-standard",
    "hover:border-border-strong data-[placeholder]:text-text-muted",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "disabled:pointer-events-none disabled:opacity-disabled",
  ],
  {
    variants: {
      size: {
        sm: "h-control-sm px-2.5",
        md: "h-control-md px-3",
        lg: "h-control-lg px-4 text-body",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends VariantProps<typeof triggerVariants> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
  /** Accessible name for the trigger when no visible <Label htmlFor> is used. */
  "aria-label"?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  disabled,
  name,
  size,
  className,
  ...ariaProps
}: SelectProps) {
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
    >
      <RadixSelect.Trigger className={cn(triggerVariants({ size }), className)} {...ariaProps}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <ChevronDown className="size-4 text-text-muted" aria-hidden="true" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={6}
          className={cn(
            "z-dropdown overflow-hidden rounded-md border border-border bg-surface shadow-md",
            "data-[state=open]:animate-fade-in",
          )}
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm py-2 ps-8 pe-3 text-body-sm text-text-primary",
                  "data-[highlighted]:bg-surface-hover data-[highlighted]:outline-none",
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled",
                )}
              >
                <RadixSelect.ItemIndicator className="absolute start-2.5 flex items-center">
                  <Check className="size-3.5" aria-hidden="true" />
                </RadixSelect.ItemIndicator>
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
