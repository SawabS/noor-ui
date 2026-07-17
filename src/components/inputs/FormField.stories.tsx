import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { Input } from "./Input";

const meta: Meta<typeof FormField> = {
  title: "Inputs/FormField",
  component: FormField,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <FormField label="Display name" helperText="Shown to other collaborators.">
        <Input placeholder="Jane Doe" />
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-72">
      <FormField label="Email" required errorText="Enter a valid email address.">
        <Input defaultValue="not-an-email" error />
      </FormField>
    </div>
  ),
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="w-72">
      <FormField label="الاسم المعروض" helperText="يظهر للمتعاونين الآخرين.">
        <Input placeholder="مثال" />
      </FormField>
    </div>
  ),
};
