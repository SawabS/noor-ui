import type { Meta, StoryObj } from "@storybook/react";
import { WelcomeScreenExample } from "./WelcomeScreenExample";

const meta: Meta<typeof WelcomeScreenExample> = {
  title: "Examples/1. Welcome Screen",
  component: WelcomeScreenExample,
  parameters: { layout: "fullscreen", a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj<typeof WelcomeScreenExample>;

export const LightDesktopLTR: Story = {};

export const DarkDesktopLTR: Story = { globals: { theme: "dark" } };

export const LightMobileLTR: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

export const LightDesktopRTL: Story = { globals: { direction: "rtl" } };

export const DarkMobileRTL: Story = {
  globals: { theme: "dark", direction: "rtl" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
