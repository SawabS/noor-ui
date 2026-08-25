import * as React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../../utilities/cn";

export const TabsRoot = RadixTabs.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={cn("n-tabs flex items-center gap-4 border-b border-border", className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      "relative -mb-px inline-flex items-center border-b-2 border-transparent px-1 py-2.5",
      "text-body-sm font-medium text-text-secondary transition-colors duration-fast ease-standard",
      "hover:text-text-primary",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:rounded-xs",
      "disabled:pointer-events-none disabled:opacity-disabled",
      "data-[state=active]:border-text-primary data-[state=active]:text-text-primary",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn(
      "pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:rounded-sm",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  listClassName?: string;
}

/** Underline-style tabs. For advanced composition, use TabsRoot/TabsList/
 *  TabsTrigger/TabsContent directly instead of the `items` shorthand. */
export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
  listClassName,
}: TabsProps) {
  const firstItem = items[0];
  return (
    <TabsRoot
      defaultValue={defaultValue ?? firstItem?.value}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList className={listClassName}>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
