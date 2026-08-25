import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mic } from "lucide-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { placeholder: "Ask anything" },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-content-sm">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Input
      placeholder="Search"
      leadingIcon={<Search className="size-4" />}
      trailingIcon={<Mic className="size-4" />}
    />
  ),
};

export const ErrorState: Story = {
  args: { error: true, defaultValue: "invalid@" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Can't edit this" },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Input placeholder="ابحث هنا" leadingIcon={<Search className="size-4" />} />
    </div>
  ),
};
