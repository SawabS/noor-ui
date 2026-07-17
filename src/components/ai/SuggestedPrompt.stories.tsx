import type { Meta, StoryObj } from "@storybook/react";
import { Lightbulb, Code2, FileText } from "lucide-react";
import { SuggestedPrompt } from "./SuggestedPrompt";

const meta: Meta<typeof SuggestedPrompt> = {
  title: "AI/SuggestedPrompt",
  component: SuggestedPrompt,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SuggestedPrompt>;

export const Grid: Story = {
  render: () => (
    <div className="grid max-w-content-sm grid-cols-1 gap-3 sm:grid-cols-2">
      <SuggestedPrompt
        icon={Lightbulb}
        label="Explain a concept"
        description="Break down a hard idea simply"
      />
      <SuggestedPrompt
        icon={Code2}
        label="Debug this code"
        description="Paste an error and get help"
      />
      <SuggestedPrompt
        icon={FileText}
        label="Summarize a document"
        description="Upload a file to get started"
      />
    </div>
  ),
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl" className="max-w-content-sm">
      <SuggestedPrompt icon={Lightbulb} label="اشرح مفهوماً" description="تبسيط فكرة معقدة" />
    </div>
  ),
};
