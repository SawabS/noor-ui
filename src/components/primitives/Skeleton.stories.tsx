import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Foundations/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const MessageLoading: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-content-sm">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
};

export const Avatar: Story = {
  render: () => <Skeleton className="size-10 rounded-pill" />,
};
