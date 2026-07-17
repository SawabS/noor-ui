import * as React from "react";
import { ChatLayout } from "../components/ai/ChatLayout";
import { ConversationSidebar } from "../components/ai/ConversationSidebar";
import { MessageList } from "../components/ai/MessageList";
import { UserMessage } from "../components/ai/UserMessage";
import { AssistantMessage } from "../components/ai/AssistantMessage";
import { ResearchProgress } from "../components/ai/ResearchProgress";
import { SourceCitationList } from "../components/ai/SourceCitationList";
import { PromptComposer } from "../components/ai/PromptComposer";
import { TopNavigation } from "../components/navigation/TopNavigation";
import { UserMenu } from "../components/navigation/UserMenu";
import { ThemeToggle } from "../components/primitives/ThemeToggle";

/** Screen 3: a research task in progress, with step tracking and sources. */
export function ResearchTaskExample() {
  const [value, setValue] = React.useState("");

  return (
    <ChatLayout
      sidebar={
        <ConversationSidebar
          groups={[{ label: "Today", items: [{ id: "1", title: "State of RTL support in CSS" }] }]}
          activeId="1"
          onNewConversation={() => {}}
        />
      }
      topNavigation={
        <TopNavigation
          start={
            <span className="text-body-sm font-medium text-text-primary">
              State of RTL support in CSS
            </span>
          }
          end={
            <>
              <ThemeToggle />
              <UserMenu name="Sawab S." compact />
            </>
          }
        />
      }
      composer={
        <PromptComposer
          value={value}
          onValueChange={setValue}
          onSubmit={() => setValue("")}
          researchMode
          onResearchModeChange={() => {}}
        />
      }
    >
      <MessageList>
        <UserMessage
          content="Research the current state of logical CSS properties support across major browsers."
          timestamp="2:03 PM"
        />

        <AssistantMessage
          content={
            <ResearchProgress
              steps={[
                { id: "1", label: "Planning research approach", status: "done" },
                {
                  id: "2",
                  label: "Searching for sources",
                  status: "done",
                  detail: "9 sources found",
                },
                { id: "3", label: "Reading MDN and caniuse data", status: "active" },
                { id: "4", label: "Drafting summary", status: "pending" },
              ]}
            />
          }
        />

        <AssistantMessage
          content={
            <p>
              Based on current data, logical properties (<code>margin-inline-start</code>,{" "}
              <code>inset-inline-end</code>, etc.) have full support in all evergreen browsers as of
              2023, making them safe to use as the default instead of physical left/right
              properties.
            </p>
          }
          sources={
            <SourceCitationList
              sources={[
                {
                  title: "CSS Logical Properties and Values",
                  href: "https://example.com/mdn-logical",
                  domain: "developer.mozilla.org",
                },
                {
                  title: "Can I use: CSS Logical Properties",
                  href: "https://example.com/caniuse",
                  domain: "caniuse.com",
                },
              ]}
            />
          }
          timestamp="2:04 PM"
        />
      </MessageList>
    </ChatLayout>
  );
}
