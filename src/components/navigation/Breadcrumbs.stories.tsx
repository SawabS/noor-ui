import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const items = [
  { label: "Workspace", href: "#" },
  { label: "Research", href: "#" },
  { label: "Q3 market scan" },
];

export const Default: Story = { args: { items } };

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Breadcrumbs
        items={[
          { label: "مساحة العمل", href: "#" },
          { label: "البحث", href: "#" },
          { label: "مسح السوق للربع الثالث" },
        ]}
      />
    </div>
  ),
};
