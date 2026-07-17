import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Inputs/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: () => <SearchInput className="max-w-content-sm" />,
};

export const WithValue: Story = {
  render: () => <SearchInput defaultValue="design tokens" className="max-w-content-sm" />,
};

function ControlledSearchInput() {
  const [value, setValue] = React.useState("design tokens");
  return <SearchInput value={value} onValueChange={setValue} className="max-w-content-sm" />;
}

export const Controlled: Story = {
  render: () => <ControlledSearchInput />,
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <SearchInput
        defaultValue="بحث"
        placeholder="ابحث في المحادثات"
        className="max-w-content-sm"
      />
    </div>
  ),
};
