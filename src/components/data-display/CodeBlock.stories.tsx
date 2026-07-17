import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "DataDisplay/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {
    language: "tsx",
    code: `export function Greeting({ name }: { name: string }) {\n  return <p>Hello, {name}</p>;\n}`,
  },
};

export const WithLineNumbersLongContent: Story = {
  args: {
    language: "python",
    showLineNumbers: true,
    code: [
      "import json",
      "from pathlib import Path",
      "",
      "def load_config(path: str) -> dict:",
      "    data = Path(path).read_text(encoding='utf-8')",
      "    return json.loads(data)",
      "",
      "if __name__ == '__main__':",
      "    config = load_config('config.json')",
      "    print(config)",
    ].join("\n"),
  },
};
