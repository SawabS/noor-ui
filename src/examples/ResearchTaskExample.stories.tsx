import type { Meta, StoryObj } from "@storybook/react";
import { ResearchTaskExample } from "./ResearchTaskExample";

const meta: Meta<typeof ResearchTaskExample> = {
  title: "Examples/3. Research Task",
  component: ResearchTaskExample,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ResearchTaskExample>;

export const LightDesktopLTR: Story = {};
export const DarkDesktopLTR: Story = { globals: { theme: "dark" } };
export const LightMobileLTR: Story = { parameters: { viewport: { defaultViewport: "mobile1" } } };
export const LightDesktopRTL: Story = { globals: { direction: "rtl" } };
export const DarkMobileRTL: Story = {
  globals: { theme: "dark", direction: "rtl" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
