import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Sparkles, Code2, PenLine } from "lucide-react";
import { WelcomeScreen } from "./WelcomeScreen";
import { PromptComposer } from "./PromptComposer";

const meta: Meta<typeof WelcomeScreen> = {
  title: "AI/WelcomeScreen",
  component: WelcomeScreen,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj<typeof WelcomeScreen>;

function DefaultWelcomeScreen() {
  const [value, setValue] = React.useState("");
  return (
    <div className="flex h-[600px] flex-col">
      <WelcomeScreen
        greeting="How can I help you today?"
        description="Ask anything — Noor keeps the interface out of the way."
        composer={<PromptComposer value={value} onValueChange={setValue} onSubmit={() => {}} />}
        suggestedPrompts={[
          {
            icon: Sparkles,
            label: "Summarize an article",
            description: "Paste a link or text",
            onClick: () => {},
          },
          {
            icon: Code2,
            label: "Explain this code",
            description: "Debug or refactor",
            onClick: () => {},
          },
          {
            icon: PenLine,
            label: "Draft an email",
            description: "Professional tone",
            onClick: () => {},
          },
        ]}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultWelcomeScreen />,
};

export const Lumen: Story = {
  render: () => <DefaultWelcomeScreen />,
  globals: { appearance: "lumen", theme: "dark" },
};
