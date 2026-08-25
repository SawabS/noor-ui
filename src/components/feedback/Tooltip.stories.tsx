import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipProvider } from "./Tooltip";
import { Button } from "../inputs/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip content="Copy to clipboard">
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-6">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={side} side={side}>
          <Button variant="outline">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Tooltip content="نسخ إلى الحافظة">
        <Button variant="secondary">مرر الفأرة هنا</Button>
      </Tooltip>
    </div>
  ),
};
