import type { Meta, StoryObj } from "@storybook/react";
import { ArtifactPanel } from "./ArtifactPanel";
import { CodeBlock } from "../data-display/CodeBlock";

const meta: Meta<typeof ArtifactPanel> = {
  title: "AI/ArtifactPanel",
  component: ArtifactPanel,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ArtifactPanel>;

export const Default: Story = {
  render: () => (
    <div className="h-[480px]">
      <ArtifactPanel title="fibonacci.py" subtitle="Python" onClose={() => {}}>
        <CodeBlock
          language="python"
          code={
            "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a"
          }
        />
      </ArtifactPanel>
    </div>
  ),
};
