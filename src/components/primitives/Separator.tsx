import * as React from "react";
import * as RadixSeparator from "@radix-ui/react-separator";
import { cn } from "../../utilities/cn";

export type SeparatorProps = React.ComponentPropsWithoutRef<typeof RadixSeparator.Root>;

export const Separator = React.forwardRef<
  React.ElementRef<typeof RadixSeparator.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <RadixSeparator.Root
    ref={ref}
    orientation={orientation}
    decorative={decorative}
    className={cn(
      "bg-border",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className,
    )}
    {...props}
  />
));
Separator.displayName = "Separator";
