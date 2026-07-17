import type { Meta, StoryObj } from "@storybook/react";
import { AssistantMessage } from "./AssistantMessage";
import { ReasoningBlock } from "./ReasoningBlock";
import { SourceCitationList } from "./SourceCitationList";

const meta: Meta<typeof AssistantMessage> = {
  title: "AI/AssistantMessage",
  component: AssistantMessage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof AssistantMessage>;

export const Default: Story = {
  args: {
    content: <p>Here are three key takeaways from the report: growth, retention, and margin.</p>,
    timestamp: "10:25 AM",
  },
};

export const Streaming: Story = { args: { content: "", streaming: true } };

export const WithReasoningAndSources: Story = {
  args: {
    reasoning: (
      <ReasoningBlock summary="Thought for 3 seconds">
        Checked the report structure, then extracted the three highest-signal metrics.
      </ReasoningBlock>
    ),
    content: <p>Growth is up 12% quarter over quarter, driven mainly by retention.</p>,
    sources: (
      <SourceCitationList
        sources={[
          {
            title: "Q3 performance report",
            href: "https://example.com/report",
            domain: "example.com",
          },
        ]}
      />
    ),
  },
};
