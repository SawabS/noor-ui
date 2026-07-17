import type { Meta, StoryObj } from "@storybook/react";
import { ErrorState } from "./ErrorState";

const meta: Meta<typeof ErrorState> = {
  title: "Feedback/ErrorState",
  component: ErrorState,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  args: {
    heading: "Something went wrong",
    description: "We couldn't load this conversation. Check your connection.",
    onRetry: () => {},
  },
};

export const NoRetry: Story = {
  args: {
    heading: "Access denied",
    description: "You don't have permission to view this workspace.",
  },
};
