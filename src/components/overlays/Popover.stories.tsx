import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button } from "../inputs/Button";
import { Typography } from "../primitives/Typography";

const meta: Meta<typeof Popover> = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <Button variant="outline">Open popover</Button>,
    content: (
      <div className="flex flex-col gap-1 w-56">
        <Typography variant="label">Quick settings</Typography>
        <Typography variant="body-sm" color="secondary">
          Popover content goes here.
        </Typography>
      </div>
    ),
  },
};
