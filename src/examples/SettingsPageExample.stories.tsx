import type { Meta, StoryObj } from "@storybook/react";
import { SettingsPageExample } from "./SettingsPageExample";

const meta: Meta<typeof SettingsPageExample> = {
  title: "Examples/4. Settings",
  component: SettingsPageExample,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof SettingsPageExample>;

export const LightDesktopLTR: Story = {};
export const DarkDesktopLTR: Story = { globals: { theme: "dark" } };
export const LightMobileLTR: Story = { parameters: { viewport: { defaultViewport: "mobile1" } } };
export const LightDesktopRTL: Story = { globals: { direction: "rtl" } };
export const DarkMobileRTL: Story = {
  globals: { theme: "dark", direction: "rtl" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
