import * as React from "react";
import { cn } from "../../utilities/cn";

export interface UserMessageProps {
  content: React.ReactNode;
  attachments?: React.ReactNode;
  timestamp?: string;
  className?: string;
}

/** A user turn: end-aligned bubble, since it's the one message role that
 *  benefits from a clear visual container against the assistant's plain text. */
export function UserMessage({ content, attachments, timestamp, className }: UserMessageProps) {
  return (
    <div className={cn("flex flex-col items-end gap-1.5", className)}>
      {attachments ? <div className="flex flex-wrap justify-end gap-2">{attachments}</div> : null}
      <div className="max-w-[80%] rounded-lg bg-surface-raised px-4 py-2.5 text-body text-text-primary sm:max-w-[70%]">
        {content}
      </div>
      {timestamp ? <span className="text-caption text-text-muted">{timestamp}</span> : null}
    </div>
  );
}
