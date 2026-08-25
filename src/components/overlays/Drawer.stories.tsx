import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { Button } from "../inputs/Button";
import { Typography } from "../primitives/Typography";

const meta: Meta<typeof Drawer> = {
  title: "Overlays/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  argTypes: { side: { control: "select", options: ["start", "end", "top", "bottom"] } },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    trigger: <Button variant="outline">Open drawer</Button>,
    title: "Conversation settings",
    description: "Adjust how this conversation behaves.",
    side: "end",
    children: <Typography variant="body-sm">Drawer content goes here.</Typography>,
  },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Drawer
        trigger={<Button variant="outline">فتح اللوحة</Button>}
        title="إعدادات المحادثة"
        side="end"
      >
        <Typography variant="body-sm">
          في اتجاه RTL، الجانب &quot;end&quot; ينزلق من اليسار.
        </Typography>
      </Drawer>
    </div>
  ),
};
