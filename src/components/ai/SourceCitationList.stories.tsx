import type { Meta, StoryObj } from "@storybook/react";
import { SourceCitationList } from "./SourceCitationList";

const meta: Meta<typeof SourceCitationList> = {
  title: "AI/SourceCitationList",
  component: SourceCitationList,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SourceCitationList>;

export const Default: Story = {
  args: {
    sources: [
      {
        title: "Understanding RTL layout in modern web apps",
        href: "https://example.com/rtl",
        domain: "example.com",
      },
      {
        title: "WCAG 2.2 target size guidance",
        href: "https://example.com/wcag",
        domain: "w3.org",
      },
    ],
  },
};
