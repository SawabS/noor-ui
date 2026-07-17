import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ChatLayout } from "./ChatLayout";
import { ConversationSidebar } from "./ConversationSidebar";
import { TopNavigation } from "../navigation/TopNavigation";
import { MessageList } from "./MessageList";
import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./AssistantMessage";
import { PromptComposer } from "./PromptComposer";
import { Typography } from "../primitives/Typography";

const meta: Meta<typeof ChatLayout> = {
  title: "AI/ChatLayout",
  component: ChatLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ChatLayout>;

function DefaultChatLayout() {
  const [value, setValue] = React.useState("");
  return (
    <div className="h-[640px]">
      <ChatLayout
        sidebar={
          <ConversationSidebar
            groups={[{ label: "Today", items: [{ id: "1", title: "Active conversation" }] }]}
            activeId="1"
            onNewConversation={() => {}}
          />
        }
        topNavigation={<TopNavigation start={<Typography variant="label">Noor</Typography>} />}
        composer={<PromptComposer value={value} onValueChange={setValue} onSubmit={() => {}} />}
      >
        <MessageList>
          <UserMessage content="Give me a two-sentence summary of RTL layout." />
          <AssistantMessage
            content={
              <p>
                RTL flips the reading direction and, with logical CSS properties, the whole
                interface mirrors automatically.
              </p>
            }
          />
        </MessageList>
      </ChatLayout>
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultChatLayout />,
};
