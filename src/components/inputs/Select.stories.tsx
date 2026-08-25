import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const options = [
  { value: "noor-1", label: "Noor 1" },
  { value: "noor-1-mini", label: "Noor 1 Mini" },
  { value: "noor-1-research", label: "Noor 1 Research" },
  { value: "legacy", label: "Legacy (deprecated)", disabled: true },
];

const meta: Meta<typeof Select> = {
  title: "Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { options, placeholder: "Choose a model" },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <Select {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className="w-64">
      <Select options={options} defaultValue="noor-1" aria-label="Model" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <Select options={options} disabled placeholder="Unavailable" aria-label="Model" />
    </div>
  ),
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="w-64">
      <Select
        options={[
          { value: "a", label: "الوضع السريع" },
          { value: "b", label: "وضع البحث" },
        ]}
        placeholder="اختر الوضع"
        aria-label="الوضع"
      />
    </div>
  ),
};
