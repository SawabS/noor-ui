import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Determinate: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <Progress value={20} />
      <Progress value={55} />
      <Progress value={90} />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="w-64">
      <Progress value={null} />
    </div>
  ),
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="w-64">
      <Progress value={65} />
    </div>
  ),
};
