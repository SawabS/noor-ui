import * as React from "react";
import { cn } from "../../utilities/cn";

export interface ChatLayoutProps {
  /** Typically a ConversationSidebar. Omit for a sidebar-less layout. */
  sidebar?: React.ReactNode;
  /** Typically a TopNavigation. */
  topNavigation?: React.ReactNode;
  /** Typically a MessageList (or WelcomeScreen when there's no history yet). */
  children: React.ReactNode;
  /** Typically a PromptComposer, pinned to the bottom of the content column. */
  composer?: React.ReactNode;
  /** Optional right-hand rail, e.g. ArtifactPanel — pushes content to share width. */
  artifactPanel?: React.ReactNode;
  className?: string;
}

/**
 * Top-level chat page shell: an optional fixed-width sidebar, a content
 * column (top nav + scrollable message area + composer), and an optional
 * right-hand artifact rail. All three regions are true siblings in a flex
 * row, so RTL mirrors the whole layout automatically via the `dir`
 * attribute — nothing here hardcodes left/right.
 */
export function ChatLayout({
  sidebar,
  topNavigation,
  children,
  composer,
  artifactPanel,
  className,
}: ChatLayoutProps) {
  return (
    <div className={cn("flex h-dvh w-full overflow-hidden bg-canvas", className)}>
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {topNavigation}
        <div className="flex min-h-0 flex-1">{children}</div>
        {composer && (
          <div className="mx-auto w-full max-w-content-md shrink-0 px-4 pb-4 pt-2 sm:pb-6">
            {composer}
          </div>
        )}
      </div>
      {artifactPanel}
    </div>
  );
}
