import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "chat", label: "Chat" },
  { value: "research", label: "Research" },
  { value: "code", label: "Code" },
];

const meta: Meta<typeof SegmentedControl> = {
  title: "Inputs/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  args: { options, defaultValue: "chat", "aria-label": "Mode" },
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {};

export const WithDisabled: Story = {
  args: { options: [...options.slice(0, 2), { ...options[2]!, disabled: true }] },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <SegmentedControl
        aria-label="الوضع"
        defaultValue="chat"
        options={[
          { value: "chat", label: "محادثة" },
          { value: "research", label: "بحث" },
          { value: "code", label: "برمجة" },
        ]}
      />
    </div>
  ),
};

/** Acceptance fixture for the travelling marker (tests/visual/upstream.spec.ts):
 *  the transform must be *interpolating* mid-transition, not already parked at
 *  the destination. Labels are deliberately different widths so the marker has
 *  to resize as well as move. */
export const MarkerAcceptance: Story = {
  args: {
    options: [
      { value: "a", label: "A" },
      { value: "b", label: "Considerably wider label" },
      { value: "c", label: "C" },
    ],
    defaultValue: "a",
  },
};

/** A wrapped horizontal group: the case that only works because both axes are
 *  measured. With X-only measurement the marker stays stranded on row one. */
export const Wrapped: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <SegmentedControl
        aria-label="Mode"
        defaultValue="chat"
        options={[
          { value: "chat", label: "Chat" },
          { value: "research", label: "Research" },
          { value: "code", label: "Code" },
          { value: "review", label: "Review" },
        ]}
      />
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
};
