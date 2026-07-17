import * as React from "react";
import { cn } from "../../utilities/cn";

export interface MessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Scrollable message stream. Sticks to the bottom as new content streams in
 * (growing assistant text, new turns) as long as the user hasn't scrolled up
 * to read history — the moment they do, autoscroll disengages until they
 * scroll back down themselves, matching standard chat-UI behavior.
 */
export const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const pinnedToBottom = React.useRef(true);

    React.useImperativeHandle(forwardedRef, () => scrollRef.current as HTMLDivElement);

    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      pinnedToBottom.current = distanceFromBottom < 80;
    };

    React.useEffect(() => {
      const content = contentRef.current;
      const scroller = scrollRef.current;
      if (!content || !scroller) return;
      const observer = new ResizeObserver(() => {
        if (pinnedToBottom.current) {
          scroller.scrollTop = scroller.scrollHeight;
        }
      });
      observer.observe(content);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={cn("flex-1 overflow-y-auto", className)}
        {...props}
      >
        <div ref={contentRef} className="mx-auto flex max-w-content-md flex-col gap-6 px-4 py-6">
          {children}
        </div>
      </div>
    );
  },
);
MessageList.displayName = "MessageList";
