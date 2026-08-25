import type { Meta, StoryObj } from "@storybook/react";
import { ReasoningBlock } from "./ReasoningBlock";

const meta: Meta<typeof ReasoningBlock> = {
  title: "AI/ReasoningBlock",
  component: ReasoningBlock,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj<typeof ReasoningBlock>;

export const Collapsed: Story = {
  args: {
    summary: "Thought for 4 seconds",
    children: "First I considered the user's intent, then checked the available tools...",
  },
};

export const Expanded: Story = {
  args: { ...Collapsed.args, defaultOpen: true },
};

export const Streaming: Story = {
  args: {
    summary: "Thinking…",
    streaming: true,
    defaultOpen: true,
    children: "Working through the problem...",
  },
};
