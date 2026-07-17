import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";
import { Typography } from "./Typography";

const meta: Meta<typeof Separator> = {
  title: "Foundations/Separator",
  component: Separator,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <Typography variant="body-sm">Above</Typography>
      <Separator className="my-3" />
      <Typography variant="body-sm">Below</Typography>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-3">
      <Typography variant="body-sm">Left</Typography>
      <Separator orientation="vertical" />
      <Typography variant="body-sm">Right</Typography>
    </div>
  ),
};
