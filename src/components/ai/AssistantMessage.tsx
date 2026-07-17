import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { StreamingIndicator } from "./StreamingIndicator";

export interface AssistantMessageProps {
  content: React.ReactNode;
  /** Rendered above content, e.g. a ReasoningBlock. */
  reasoning?: React.ReactNode;
  /** Rendered inline within the content flow, e.g. one or more ToolCallCard. */
  toolCalls?: React.ReactNode;
  /** Rendered below content, e.g. SourceCitationList. */
  sources?: React.ReactNode;
  streaming?: boolean;
  timestamp?: string;
  /** Custom mark, defaults to a small sparkle glyph. Pass null to hide. */
  avatar?: React.ReactNode;
  className?: string;
}

/** An assistant turn: full-width plain text (no bubble), mirroring the
 *  restrained, low-chrome reading experience of the reference AI products. */
export function AssistantMessage({
  content,
  reasoning,
  toolCalls,
  sources,
  streaming = false,
  timestamp,
  avatar,
  className,
}: AssistantMessageProps) {
  const showTypingOnly = streaming && !content;
  return (
    <div className={cn("flex gap-3", className)}>
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-pill bg-surface-raised text-text-secondary">
        {avatar === null ? null : (avatar ?? <Icon icon={Sparkles} size="xs" />)}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {reasoning}
        {showTypingOnly ? (
          <StreamingIndicator />
        ) : (
          <div className="text-body text-text-primary [&_p]:mb-3 [&_p:last-child]:mb-0">
            {content}
          </div>
        )}
        {toolCalls}
        {sources}
        {timestamp ? <span className="text-caption text-text-muted">{timestamp}</span> : null}
      </div>
    </div>
  );
}
