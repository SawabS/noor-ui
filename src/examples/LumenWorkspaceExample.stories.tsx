import type { Meta, StoryObj } from "@storybook/react";
import { LumenWorkspaceExample } from "./LumenWorkspaceExample";

const meta: Meta<typeof LumenWorkspaceExample> = {
  title: "Examples/LumenWorkspace",
  component: LumenWorkspaceExample,
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
  globals: { appearance: "lumen", theme: "dark" },
};

export default meta;
type Story = StoryObj<typeof LumenWorkspaceExample>;

export const Desktop: Story = {};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

export const ArabicRTL: Story = {
  globals: { appearance: "lumen", theme: "dark", direction: "rtl" },
};

export const ReducedTransparency: Story = {
  globals: { appearance: "lumen", theme: "dark", transparency: "reduce" },
};
