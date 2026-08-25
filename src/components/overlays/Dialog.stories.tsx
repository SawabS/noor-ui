import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import { Button } from "../inputs/Button";

const meta: Meta<typeof Dialog> = {
  title: "Overlays/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    trigger: <Button>Open dialog</Button>,
    title: "Delete conversation",
    description: "This action cannot be undone. This will permanently delete the conversation.",
    children: (
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>
    ),
  },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Dialog
        trigger={<Button>فتح الحوار</Button>}
        title="حذف المحادثة"
        description="لا يمكن التراجع عن هذا الإجراء."
      >
        <div className="flex justify-end gap-2">
          <Button variant="outline">إلغاء</Button>
          <Button variant="danger">حذف</Button>
        </div>
      </Dialog>
    </div>
  ),
};
