import * as React from "react";
import { ChatLayout } from "../components/ai/ChatLayout";
import { MessageList } from "../components/ai/MessageList";
import { UserMessage } from "../components/ai/UserMessage";
import { AssistantMessage } from "../components/ai/AssistantMessage";
import { SystemMessage } from "../components/ai/SystemMessage";
import { ReasoningBlock } from "../components/ai/ReasoningBlock";
import { ToolCallCard } from "../components/ai/ToolCallCard";
import { PromptComposer } from "../components/ai/PromptComposer";
import { ModelSelector } from "../components/ai/ModelSelector";
import { AttachmentChip } from "../components/ai/AttachmentChip";
import { TopNavigation } from "../components/navigation/TopNavigation";
import { UserMenu } from "../components/navigation/UserMenu";
import { ThemeToggle } from "../components/primitives/ThemeToggle";
import {
  DesktopConversationSidebar,
  MobileConversationDrawer,
} from "./ResponsiveConversationSidebar";

const activeConversationGroups = [
  { label: "Today", items: [{ id: "1", title: "Comparing hosting providers" }] },
];

/** Screen 2: an active chat with a user turn, tool use, and a streaming assistant reply. */
export function ActiveChatExample() {
  const [value, setValue] = React.useState("");
  const [model, setModel] = React.useState("balanced");

  return (
    <ChatLayout
      sidebar={
        <DesktopConversationSidebar
          groups={activeConversationGroups}
          activeId="1"
          onNewConversation={() => {}}
        />
      }
      topNavigation={
        <TopNavigation
          start={
            <>
              <MobileConversationDrawer
                groups={activeConversationGroups}
                activeId="1"
                onNewConversation={() => {}}
              />
              <span className="truncate text-body-sm font-medium text-text-primary">
                Comparing hosting providers
              </span>
            </>
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
          onAttachClick={() => {}}
          modelSelector={
            <ModelSelector
              models={[
                { value: "fast", label: "Fast" },
                { value: "balanced", label: "Balanced" },
              ]}
              value={model}
              onValueChange={setModel}
            />
          }
        />
      }
    >
      <MessageList>
        <SystemMessage>Conversation started</SystemMessage>

        <UserMessage
          content="I need to move a small Node app off Heroku. Can you compare Render, Fly.io, and Railway on price and ease of setup?"
          attachments={<AttachmentChip name="current-config.yaml" meta="2 KB" />}
          timestamp="10:24 AM"
        />

        <AssistantMessage
          reasoning={
            <ReasoningBlock summary="Thought for 4 seconds">
              Comparing pricing tiers and deployment friction across the three platforms for a small
              Node service.
            </ReasoningBlock>
          }
          toolCalls={
            <ToolCallCard
              toolName="search_web"
              status="success"
              summary="Pricing pages for Render, Fly.io, Railway"
              args={{ query: "Render vs Fly.io vs Railway pricing 2026" }}
              result="Fetched current pricing for all three."
            />
          }
          content={
            <>
              <p>Here&apos;s a quick comparison for a small Node app:</p>
              <p>
                <strong>Render</strong> has the simplest setup — connect a repo and it deploys. Free
                tier sleeps after inactivity.
              </p>
              <p>
                <strong>Railway</strong> is usage-based billing, which is cheaper at low traffic but
                less predictable.
              </p>
              <p>
                <strong>Fly.io</strong> gives you the most control (regions, scaling) but has the
                steepest setup curve.
              </p>
            </>
          }
          timestamp="10:24 AM"
        />

        <UserMessage
          content="Let's go with Render then. What do I need to change in my config?"
          timestamp="10:26 AM"
        />

        <AssistantMessage streaming content="" />
      </MessageList>
    </ChatLayout>
  );
}
