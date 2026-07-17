import type { Meta, StoryObj } from "@storybook/react";
import { AttachmentChip } from "./AttachmentChip";

const meta: Meta<typeof AttachmentChip> = {
  title: "AI/AttachmentChip",
  component: AttachmentChip,
  tags: ["autodocs"],
  args: { name: "quarterly-report.pdf", meta: "1.2 MB" },
};
export default meta;
type Story = StoryObj<typeof AttachmentChip>;

export const Default: Story = { args: { onRemove: () => {} } };
export const Uploading: Story = { args: { uploading: true } };

export const Row: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <AttachmentChip name="design-spec.pdf" meta="840 KB" onRemove={() => {}} />
      <AttachmentChip name="screenshot.png" meta="212 KB" onRemove={() => {}} />
      <AttachmentChip name="notes.txt" meta="4 KB" uploading />
    </div>
  ),
};
