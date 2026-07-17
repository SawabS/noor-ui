import type { Meta, StoryObj } from "@storybook/react";
import { UserMessage } from "./UserMessage";

const meta: Meta<typeof UserMessage> = {
  title: "AI/UserMessage",
  component: UserMessage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof UserMessage>;

export const Default: Story = {
  args: {
    content: "Can you summarize the attached report in three bullet points?",
    timestamp: "10:24 AM",
  },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <UserMessage content="هل يمكنك تلخيص التقرير المرفق في ثلاث نقاط؟" timestamp="10:24 ص" />
    </div>
  ),
};
