import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Inputs/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: { "aria-label": "Value" },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <Slider {...args} defaultValue={[40]} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-64">
      <Slider aria-label="Range" defaultValue={[20, 70]} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <Slider aria-label="Value" defaultValue={[40]} disabled />
    </div>
  ),
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="w-64">
      <Slider aria-label="القيمة" defaultValue={[40]} />
    </div>
  ),
};
