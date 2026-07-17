import type { Meta, StoryObj } from "@storybook/react";
import { DesignSystemShowcase } from "./DesignSystemShowcase";

const meta: Meta<typeof DesignSystemShowcase> = {
  title: "Examples/0. Design System Showcase",
  component: DesignSystemShowcase,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof DesignSystemShowcase>;

export const Light: Story = {};
export const Dark: Story = { globals: { theme: "dark" } };
