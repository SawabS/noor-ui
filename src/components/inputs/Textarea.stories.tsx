import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Inputs/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { placeholder: "Write a message…" },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

function AutoResizeTextarea() {
  const [value, setValue] = React.useState("");
  return (
    <Textarea
      autoResize
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type across multiple lines and watch it grow…"
      className="max-w-content-sm"
    />
  );
}

export const AutoResize: Story = {
  render: () => <AutoResizeTextarea />,
};

export const ErrorState: Story = { args: { error: true, defaultValue: "Too short" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Read only" } };
