import * as React from "react";
import { cn } from "../../utilities/cn";

export interface MarkdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Raw HTML to render (e.g. output of your own markdown parser). Mutually
   *  exclusive with `children` — if both are given, `html` wins. */
  html?: string;
}

/**
 * Styles markdown-shaped content (headings, paragraphs, lists, code,
 * blockquotes, links, tables) using semantic tokens. This component does
 * NOT parse markdown itself — pass already-rendered HTML via `html`, or
 * already-rendered React elements via `children` from your own pipeline
 * (e.g. react-markdown, remark, or a server-rendered string).
 */
export const MarkdownContent = React.forwardRef<HTMLDivElement, MarkdownContentProps>(
  ({ html, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-body text-text-primary",
        "[&_h1]:text-heading-lg [&_h1]:font-semibold [&_h1]:mt-6 [&_h1]:mb-3",
        "[&_h2]:text-heading-md [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3",
        "[&_h3]:text-heading-sm [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2",
        "[&_p]:mb-3 [&_p]:leading-relaxed",
        "[&_ul]:list-disc [&_ul]:ps-6 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:ps-6 [&_ol]:mb-3",
        "[&_li]:mb-1",
        "[&_a]:text-text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-text-secondary",
        "[&_strong]:font-semibold",
        "[&_blockquote]:border-s-2 [&_blockquote]:border-border-strong [&_blockquote]:ps-4 [&_blockquote]:text-text-secondary [&_blockquote]:italic [&_blockquote]:mb-3",
        "[&_code]:rounded-xs [&_code]:bg-surface-raised [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-body-sm [&_code]:font-mono",
        "[&_pre]:rounded-md [&_pre]:bg-surface-raised [&_pre]:border [&_pre]:border-border [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-3",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "[&_table]:w-full [&_table]:border-collapse [&_table]:mb-3",
        "[&_th]:border-b [&_th]:border-border [&_th]:text-start [&_th]:px-3 [&_th]:py-2 [&_th]:text-label [&_th]:text-text-secondary",
        "[&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-body-sm",
        "[&_hr]:border-border [&_hr]:my-6",
        className,
      )}
      {...(html ? { dangerouslySetInnerHTML: { __html: html } } : {})}
      {...props}
    >
      {html ? undefined : children}
    </div>
  ),
);
MarkdownContent.displayName = "MarkdownContent";
