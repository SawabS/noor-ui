import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";
import { IconButton } from "./IconButton";
import { Icon } from "../primitives/Icon";

const meta: Meta<typeof IconButton> = {
  title: "Inputs/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { "aria-label": "Search" },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Variants: Story = {
  render: () => (
    <div className="flex gap-3">
      <IconButton aria-label="Search" variant="primary">
        <Icon icon={Search} size="sm" />
      </IconButton>
      <IconButton aria-label="Search" variant="secondary">
        <Icon icon={Search} size="sm" />
      </IconButton>
      <IconButton aria-label="Search" variant="outline">
        <Icon icon={Search} size="sm" />
      </IconButton>
      <IconButton aria-label="Search" variant="ghost">
        <Icon icon={Search} size="sm" />
      </IconButton>
    </div>
  ),
};
