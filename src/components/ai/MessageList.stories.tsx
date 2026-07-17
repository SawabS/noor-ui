import type { Meta, StoryObj } from "@storybook/react";
import { MessageList } from "./MessageList";
import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./AssistantMessage";

const meta: Meta<typeof MessageList> = {
  title: "AI/MessageList",
  component: MessageList,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof MessageList>;

export const Default: Story = {
  render: () => (
    <div className="flex h-[480px] flex-col">
      <MessageList>
        <UserMessage content="What's the difference between RTL and bidi text?" />
        <AssistantMessage
          content={
            <p>
              RTL means the whole layout reads right-to-left; bidi means individual runs of text
              within a line can switch direction.
            </p>
          }
        />
        <UserMessage content="Got it, thanks!" />
      </MessageList>
    </div>
  ),
};
