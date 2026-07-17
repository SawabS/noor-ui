import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "DataDisplay/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Aram Xani" size="sm" />
      <Avatar name="Aram Xani" size="md" />
      <Avatar name="Aram Xani" size="lg" />
    </div>
  ),
};

export const NoName: Story = {
  render: () => <Avatar />,
};

export const WithImage: Story = {
  render: () => (
    <Avatar
      name="Sana Karim"
      src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=128&h=128&fit=crop"
    />
  ),
};
