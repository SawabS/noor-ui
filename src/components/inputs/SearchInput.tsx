import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../utilities/cn";
import { useControllableState } from "../../hooks/use-controllable-state";
import { Input, type InputProps } from "./Input";

export interface SearchInputProps extends Omit<
  InputProps,
  "value" | "defaultValue" | "onChange" | "leadingIcon" | "trailingIcon"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      defaultValue = "",
      onValueChange,
      onClear,
      className,
      placeholder = "Search",
      ...props
    },
    ref,
  ) => {
    const [current, setCurrent] = useControllableState<string>({
      value,
      defaultValue,
      onChange: onValueChange,
    });

    return (
      <Input
        ref={ref}
        type="search"
        role="searchbox"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        placeholder={placeholder}
        leadingIcon={<Search className="size-4" aria-hidden="true" />}
        trailingIcon={
          current ? (
            <button
              type="button"
              aria-label="Clear search"
              className={cn(
                "pointer-events-auto rounded-sm p-0.5 text-text-muted hover:text-text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
              )}
              onClick={() => {
                setCurrent("");
                onClear?.();
              }}
            >
              <X className="size-3.5" />
            </button>
          ) : undefined
        }
        className={className}
        {...props}
      />
    );
  },
);
SearchInput.displayName = "SearchInput";
