import type { Meta, StoryObj } from "@storybook/react";
import { ConversationSidebar } from "./ConversationSidebar";

const meta: Meta<typeof ConversationSidebar> = {
  title: "AI/ConversationSidebar",
  component: ConversationSidebar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ConversationSidebar>;

const groups = [
  {
    label: "Today",
    items: [
      { id: "1", title: "Kurdish grammar rules" },
      { id: "2", title: "RTL layout debugging" },
    ],
  },
  {
    label: "Previous 7 days",
    items: [
      { id: "3", title: "Design system tokens" },
      { id: "4", title: "Restaurant recommendations in Duhok" },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <div className="h-[520px]">
      <ConversationSidebar groups={groups} activeId="1" onNewConversation={() => {}} />
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div className="h-[520px]">
      <ConversationSidebar groups={groups} activeId="1" collapsed onNewConversation={() => {}} />
    </div>
  ),
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="h-[520px]">
      <ConversationSidebar
        groups={[{ label: "اليوم", items: [{ id: "1", title: "قواعد اللغة الكردية" }] }]}
        activeId="1"
        onNewConversation={() => {}}
      />
    </div>
  ),
};
