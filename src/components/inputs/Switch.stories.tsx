import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = { render: () => <Switch aria-label="Toggle" /> };
export const WithLabel: Story = {
  render: () => (
    <div className="w-72">
      <Switch label="Streaming responses" description="Show tokens as they're generated." />
    </div>
  ),
};
export const Checked: Story = { render: () => <Switch aria-label="Toggle" defaultChecked /> };
export const Disabled: Story = { render: () => <Switch aria-label="Toggle" disabled /> };

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="w-72">
      <Switch label="الاستجابات المتدفقة" />
    </div>
  ),
};
