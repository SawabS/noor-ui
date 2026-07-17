import type { Meta, StoryObj } from "@storybook/react";
import { StreamingIndicator } from "./StreamingIndicator";

const meta: Meta<typeof StreamingIndicator> = {
  title: "AI/StreamingIndicator",
  component: StreamingIndicator,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof StreamingIndicator>;

export const Default: Story = {};
