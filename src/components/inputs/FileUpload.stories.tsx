import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Inputs/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  args: {
    helperText: "PDF, PNG or JPG up to 10MB",
    onFilesSelected: (files) => console.log("selected", files),
  },
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="w-96">
      <FileUpload {...args} disabled />
    </div>
  ),
};

export const RTL: Story = {
  render: (args) => (
    <div dir="rtl" className="w-96">
      <FileUpload
        {...args}
        label="اضغط للتحميل أو اسحب وأفلت"
        helperText="PDF أو PNG حتى 10 ميجابايت"
      />
    </div>
  ),
};
