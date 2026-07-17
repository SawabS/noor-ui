import type { Meta, StoryObj } from "@storybook/react";
import { Home } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

const meta: Meta<typeof SidebarItem> = {
  title: "Navigation/SidebarItem",
  component: SidebarItem,
  tags: ["autodocs"],
  args: { icon: Home, label: "Home" },
};
export default meta;
type Story = StoryObj<typeof SidebarItem>;

export const Default: Story = {
  render: (args) => (
    <ul className="w-56">
      <SidebarItem {...args} />
    </ul>
  ),
};

export const Active: Story = {
  render: (args) => (
    <ul className="w-56">
      <SidebarItem {...args} active />
    </ul>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <ul className="w-56">
      <SidebarItem {...args} disabled />
    </ul>
  ),
};
