import type { Meta, StoryObj } from "@storybook/react";
import { ToolCallCard } from "./ToolCallCard";

const meta: Meta<typeof ToolCallCard> = {
  title: "AI/ToolCallCard",
  component: ToolCallCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ToolCallCard>;

export const Running: Story = {
  args: {
    toolName: "search_web",
    status: "running",
    summary: 'Searching for "noor ui design system"',
  },
};

export const Success: Story = {
  args: {
    toolName: "search_web",
    status: "success",
    summary: "3 results found",
    args: { query: "noor ui design system", limit: 3 },
    result: "Found 3 relevant sources.",
    defaultOpen: true,
  },
};

export const ErrorState: Story = {
  args: {
    toolName: "run_code",
    status: "error",
    summary: "Execution failed",
    result: "TypeError: cannot read property of undefined",
    defaultOpen: true,
  },
};
