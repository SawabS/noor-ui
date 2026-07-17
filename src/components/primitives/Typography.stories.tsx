import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Foundations/Typography",
  component: Typography,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(
        [
          "display",
          "heading-lg",
          "heading-md",
          "heading-sm",
          "body-lg",
          "body",
          "body-sm",
          "label",
          "caption",
        ] as const
      ).map((variant) => (
        <Typography key={variant} variant={variant}>
          {variant} — The quick brown fox / خطر يهدد الثعلب البني
        </Typography>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography color="primary">Primary text</Typography>
      <Typography color="secondary">Secondary text</Typography>
      <Typography color="muted">Muted text</Typography>
    </div>
  ),
};

export const Arabic: Story = {
  render: () => (
    <div dir="rtl" lang="ar" className="flex flex-col gap-4">
      <Typography variant="heading-md">مرحباً بك في نظام التصميم نور</Typography>
      <Typography variant="body">
        هذا مثال على نص عربي طويل يوضح كيفية التعامل مع الحروف والتشكيل دون أي اقتصاص عمودي.
      </Typography>
    </div>
  ),
};
