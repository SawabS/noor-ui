import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModelSelector } from "./ModelSelector";

const meta: Meta<typeof ModelSelector> = {
  title: "AI/ModelSelector",
  component: ModelSelector,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ModelSelector>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState("fast");
      return (
        <ModelSelector
          models={[
            { value: "fast", label: "Fast" },
            { value: "balanced", label: "Balanced" },
            { value: "reasoning", label: "Reasoning" },
          ]}
          value={value}
          onValueChange={setValue}
        />
      );
    }
    return <Demo />;
  },
};
