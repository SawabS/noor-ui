import type { Meta, StoryObj } from "@storybook/react";
import { ResearchProgress } from "./ResearchProgress";

const meta: Meta<typeof ResearchProgress> = {
  title: "AI/ResearchProgress",
  component: ResearchProgress,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ResearchProgress>;

export const InProgress: Story = {
  args: {
    steps: [
      { id: "1", label: "Planning research approach", status: "done" },
      { id: "2", label: "Searching for sources", status: "done", detail: "14 sources found" },
      { id: "3", label: "Reading and cross-referencing", status: "active" },
      { id: "4", label: "Drafting summary", status: "pending" },
    ],
  },
};

export const Complete: Story = {
  args: {
    steps: [
      { id: "1", label: "Planning research approach", status: "done" },
      { id: "2", label: "Searching for sources", status: "done" },
      { id: "3", label: "Drafting summary", status: "done" },
    ],
  },
};
