import type { Meta, StoryObj } from "@storybook/react";
import { ModeSelector } from "./ModeSelector";

const meta: Meta<typeof ModeSelector> = {
  title: "AI/ModeSelector",
  component: ModeSelector,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ModeSelector>;

export const Default: Story = {
  args: {
    modes: [
      { value: "chat", label: "Chat" },
      { value: "research", label: "Research" },
      { value: "code", label: "Code" },
    ],
    defaultValue: "chat",
  },
};
