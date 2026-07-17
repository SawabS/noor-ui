import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles } from "lucide-react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Foundations/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { icon: Sparkles },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 text-text-primary">
      <Icon icon={Sparkles} size="xs" />
      <Icon icon={Sparkles} size="sm" />
      <Icon icon={Sparkles} size="md" />
      <Icon icon={Sparkles} size="lg" />
      <Icon icon={Sparkles} size="xl" />
    </div>
  ),
};

export const Labeled: Story = {
  args: { label: "New" },
};
