import * as React from "react";
import * as RadixLabel from "@radix-ui/react-label";
import { cn } from "../../utilities/cn";

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof RadixLabel.Root> {
  required?: boolean;
}

export const Label = React.forwardRef<React.ElementRef<typeof RadixLabel.Root>, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <RadixLabel.Root
      ref={ref}
      className={cn("text-label font-medium text-text-primary", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-danger" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </RadixLabel.Root>
  ),
);
Label.displayName = "Label";
