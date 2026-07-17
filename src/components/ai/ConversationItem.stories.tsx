import type { Meta, StoryObj } from "@storybook/react";
import { ConversationItem } from "./ConversationItem";

const meta: Meta<typeof ConversationItem> = {
  title: "AI/ConversationItem",
  component: ConversationItem,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ConversationItem>;

export const Default: Story = {
  render: () => (
    <ul className="w-64">
      <ConversationItem title="Kurdish grammar rules" onRename={() => {}} onDelete={() => {}} />
      <ConversationItem
        title="Active conversation"
        active
        onRename={() => {}}
        onDelete={() => {}}
      />
    </ul>
  ),
};
