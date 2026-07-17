import type { Meta, StoryObj } from "@storybook/react";
import { UserMenu } from "./UserMenu";

const meta: Meta<typeof UserMenu> = {
  title: "Navigation/UserMenu",
  component: UserMenu,
  tags: ["autodocs"],
  args: { name: "Sarah Ahmed", email: "sarah@example.com" },
};
export default meta;
type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {};
export const Compact: Story = { args: { compact: true } };

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <UserMenu name="سارة أحمد" email="sarah@example.com" />
    </div>
  ),
};
