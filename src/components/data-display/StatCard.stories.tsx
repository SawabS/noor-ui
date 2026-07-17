import type { Meta, StoryObj } from "@storybook/react";
import { Activity, Clock, Users } from "lucide-react";
import { StatCard } from "./StatCard";

const meta: Meta<typeof StatCard> = {
  title: "DataDisplay/StatCard",
  component: StatCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  render: () => (
    <div className="grid max-w-content-md grid-cols-3 gap-4">
      <StatCard
        label="Active sessions"
        value="1,204"
        icon={Activity}
        trend={{ direction: "up", value: "12%" }}
      />
      <StatCard
        label="Avg. response time"
        value="1.2s"
        icon={Clock}
        trend={{ direction: "down", value: "8%" }}
      />
      <StatCard label="Weekly users" value="8,412" icon={Users} />
    </div>
  ),
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="grid max-w-content-sm grid-cols-2 gap-4">
      <StatCard
        label="الجلسات النشطة"
        value="١٬٢٠٤"
        icon={Activity}
        trend={{ direction: "up", value: "١٢٪" }}
      />
      <StatCard
        label="وقت الاستجابة"
        value="١٫٢ث"
        icon={Clock}
        trend={{ direction: "down", value: "٨٪" }}
      />
    </div>
  ),
};
