import type { Meta, StoryObj } from "@storybook/react";
import { SystemMessage } from "./SystemMessage";

const meta: Meta<typeof SystemMessage> = {
  title: "AI/SystemMessage",
  component: SystemMessage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SystemMessage>;

export const Default: Story = {
  args: { children: "Research mode enabled" },
};
