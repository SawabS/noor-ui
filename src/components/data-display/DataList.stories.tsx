import type { Meta, StoryObj } from "@storybook/react";
import { DataList } from "./DataList";

const meta: Meta<typeof DataList> = {
  title: "DataDisplay/DataList",
  component: DataList,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DataList>;

export const Default: Story = {
  args: {
    items: [
      { label: "Model", value: "Noor-Reasoning-Large" },
      { label: "Created", value: "2026-06-14" },
      { label: "Owner", value: "research-team@noor.ai" },
      { label: "Region", value: "eu-west-1" },
      {
        label: "Description",
        value:
          "A long value to prove wrapping behaves correctly across both the stacked mobile layout and the two-column desktop layout without clipping.",
      },
    ],
  },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" lang="ckb" className="max-w-content-sm">
      <DataList
        items={[
          { label: "مۆدێل", value: "نوور-بیرکردنەوە-گەورە" },
          { label: "بەروار", value: "٢٠٢٦-٠٦-١٤" },
        ]}
      />
    </div>
  ),
};
