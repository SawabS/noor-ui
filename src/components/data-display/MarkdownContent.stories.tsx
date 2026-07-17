import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownContent } from "./MarkdownContent";

const meta: Meta<typeof MarkdownContent> = {
  title: "DataDisplay/MarkdownContent",
  component: MarkdownContent,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof MarkdownContent>;

export const Default: Story = {
  render: () => (
    <MarkdownContent className="max-w-content-sm">
      <h2>Renewable energy trends</h2>
      <p>
        Solar deployment <strong>accelerated</strong> in 2025, driven by falling panel costs. See{" "}
        <a href="https://example.com/dataset">the full dataset</a> for details.
      </p>
      <ul>
        <li>Global capacity grew 32% year over year</li>
        <li>Storage costs fell 18%</li>
      </ul>
      <blockquote>Grid parity was reached in 41 markets.</blockquote>
      <pre>
        <code>capacity_gw = 1_402</code>
      </pre>
    </MarkdownContent>
  ),
};

export const FromHtmlString: Story = {
  render: () => (
    <MarkdownContent
      className="max-w-content-sm"
      html="<h3>From a string</h3><p>Rendered via <code>dangerouslySetInnerHTML</code>.</p>"
    />
  ),
};
