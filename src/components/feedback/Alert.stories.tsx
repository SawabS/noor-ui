import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-content-sm">
      <Alert variant="info" title="Heads up" description="This model has a 128k context window." />
      <Alert variant="success" title="Saved" description="Your changes were saved." />
      <Alert
        variant="warning"
        title="Approaching limit"
        description="You've used 90% of your quota."
      />
      <Alert
        variant="danger"
        title="Request failed"
        description="Check your connection and try again."
      />
    </div>
  ),
};

export const Dismissible: Story = {
  args: {
    variant: "info",
    title: "New model available",
    description: "Switch to try the latest release.",
    onDismiss: () => {},
  },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="max-w-content-sm">
      <Alert variant="warning" title="تنبيه" description="لقد استخدمت 90٪ من حصتك." />
    </div>
  ),
};
