import type { Meta, StoryObj } from "@storybook/react";
import { ActiveChatExample } from "./ActiveChatExample";

const meta: Meta<typeof ActiveChatExample> = {
  title: "Examples/2. Active Chat",
  component: ActiveChatExample,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ActiveChatExample>;

export const LightDesktopLTR: Story = {};
export const DarkDesktopLTR: Story = { globals: { theme: "dark" } };
export const LightMobileLTR: Story = { parameters: { viewport: { defaultViewport: "mobile1" } } };
export const LightDesktopRTL: Story = { globals: { direction: "rtl" } };
export const DarkMobileRTL: Story = {
  globals: { theme: "dark", direction: "rtl" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
