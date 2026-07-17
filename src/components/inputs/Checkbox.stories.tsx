import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { label: "Remember this conversation" } };
export const WithDescription: Story = {
  args: {
    label: "Enable web search",
    description: "Allow the assistant to browse the web for up-to-date answers.",
  },
};
export const Checked: Story = { args: { label: "Checked", defaultChecked: true } };
export const Disabled: Story = { args: { label: "Disabled", disabled: true } };

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Checkbox label="تذكر هذه المحادثة" />
    </div>
  ),
};
