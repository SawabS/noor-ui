import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  { value: "overview", label: "Overview", content: "Overview panel content." },
  { value: "activity", label: "Activity", content: "Activity panel content." },
  { value: "settings", label: "Settings", content: "Settings panel content." },
];

export const Default: Story = {
  args: { items },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Tabs
        items={[
          { value: "overview", label: "نظرة عامة", content: "محتوى لوحة النظرة العامة." },
          { value: "activity", label: "النشاط", content: "محتوى لوحة النشاط." },
          { value: "settings", label: "الإعدادات", content: "محتوى لوحة الإعدادات." },
        ]}
      />
    </div>
  ),
};
