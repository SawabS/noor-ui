import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utilities/cn";

export const textareaVariants = cva(
  [
    "flex w-full rounded-md border bg-surface text-text-primary text-body-sm py-2.5 px-3",
    "placeholder:text-text-muted transition-colors duration-fast ease-standard resize-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "disabled:pointer-events-none disabled:opacity-disabled",
  ],
  {
    variants: {
      hasError: {
        true: "border-danger focus-visible:ring-danger",
        false: "border-border hover:border-border-strong",
      },
    },
    defaultVariants: { hasError: false },
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
  error?: boolean;
  autoResize?: boolean;
  maxHeightPx?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, hasError, error, autoResize, maxHeightPx = 240, rows = 3, value, ...props },
    forwardedRef,
  ) => {
    const innerRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLTextAreaElement);

    // Only mutates height when autoResize is enabled — a fixed-rows textarea
    // must keep native scroll behavior instead of being pinned to content size.
    React.useLayoutEffect(() => {
      if (!autoResize) return;
      const node = innerRef.current;
      if (!node) return;
      node.style.height = "auto";
      const next = Math.min(node.scrollHeight, maxHeightPx);
      node.style.height = `${next}px`;
      node.style.overflowY = node.scrollHeight > maxHeightPx ? "auto" : "hidden";
    }, [autoResize, value, maxHeightPx]);

    return (
      <textarea
        ref={innerRef}
        rows={rows}
        value={value}
        className={cn(textareaVariants({ hasError: error ?? hasError }), className)}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
