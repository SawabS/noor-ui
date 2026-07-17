import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "chat", label: "Chat" },
  { value: "research", label: "Research" },
  { value: "code", label: "Code" },
];

const meta: Meta<typeof SegmentedControl> = {
  title: "Inputs/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  args: { options, defaultValue: "chat", "aria-label": "Mode" },
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {};

export const WithDisabled: Story = {
  args: { options: [...options.slice(0, 2), { ...options[2]!, disabled: true }] },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <SegmentedControl
        aria-label="الوضع"
        defaultValue="chat"
        options={[
          { value: "chat", label: "محادثة" },
          { value: "research", label: "بحث" },
          { value: "code", label: "برمجة" },
        ]}
      />
    </div>
  ),
};
