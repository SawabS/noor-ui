import type { Meta, StoryObj } from "@storybook/react";
import { MessageSquare } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { Button } from "../inputs/Button";

const meta: Meta<typeof EmptyState> = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: MessageSquare,
    heading: "No conversations yet",
    description: "Start a new chat to see it appear here.",
    action: <Button>New chat</Button>,
  },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <EmptyState
        icon={MessageSquare}
        heading="لا توجد محادثات بعد"
        description="ابدأ محادثة جديدة لرؤيتها هنا."
        action={<Button>محادثة جديدة</Button>}
      />
    </div>
  ),
};
