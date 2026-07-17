import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../../utilities/cn";
import { IconButton } from "../inputs/IconButton";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

/** Styled <pre><code> block. Does not perform syntax highlighting — bring
 *  your own tokenizer and pass pre-highlighted markup as children instead
 *  of `code` if you need colorized tokens. */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ code, language, showLineNumbers, className, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);
    const lines = code.replace(/\n$/, "").split("\n");

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-md border border-border bg-surface-raised text-body-sm font-mono",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-caption uppercase tracking-wide text-text-muted">
            {language ?? "text"}
          </span>
          <IconButton
            aria-label={copied ? "Copied" : "Copy code"}
            variant="ghost"
            size="sm"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="size-4 text-success" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
          </IconButton>
        </div>
        <pre className="overflow-x-auto p-4">
          <code>
            {lines.map((line, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="flex gap-4">
                {showLineNumbers ? (
                  <span className="select-none text-text-muted">{i + 1}</span>
                ) : null}
                <span className="whitespace-pre text-text-primary">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";
