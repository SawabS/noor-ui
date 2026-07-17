import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";

const options = [
  { value: "fast", label: "Fast", description: "Quick answers, lower latency." },
  { value: "balanced", label: "Balanced", description: "Good default for most tasks." },
  {
    value: "research",
    label: "Research",
    description: "Deeper reasoning, slower.",
    disabled: false,
  },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: { options, defaultValue: "balanced" },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};
export const Horizontal: Story = { args: { orientation: "horizontal" } };
export const Disabled: Story = {
  args: { options: options.map((o) => ({ ...o, disabled: true })) },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <RadioGroup
        defaultValue="balanced"
        options={[
          { value: "fast", label: "سريع" },
          { value: "balanced", label: "متوازن" },
          { value: "research", label: "بحث" },
        ]}
      />
    </div>
  ),
};
