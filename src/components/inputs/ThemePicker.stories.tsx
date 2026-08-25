import type { Meta, StoryObj } from "@storybook/react";
import { ThemePicker } from "./ThemePicker";

const meta: Meta<typeof ThemePicker> = {
  title: "Foundations/ThemePicker",
  component: ThemePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemePicker>;

export const Default: Story = {};
