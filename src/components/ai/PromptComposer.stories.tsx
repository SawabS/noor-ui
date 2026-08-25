import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PromptComposer } from "./PromptComposer";
import { AttachmentChip } from "./AttachmentChip";
import { ModelSelector } from "./ModelSelector";

const meta: Meta<typeof PromptComposer> = {
  title: "AI/PromptComposer",
  component: PromptComposer,
  tags: ["autodocs"],
  parameters: { layout: "padded", a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj<typeof PromptComposer>;

function Controlled(props: Partial<React.ComponentProps<typeof PromptComposer>>) {
  const [value, setValue] = useState(props.value ?? "");
  return (
    <div className="max-w-content-sm">
      <PromptComposer
        value={value}
        onValueChange={setValue}
        onSubmit={() => setValue("")}
        onAttachClick={() => {}}
        onResearchModeChange={() => {}}
        {...props}
      />
    </div>
  );
}

export const Default: Story = { render: () => <Controlled /> };

export const WithModelSelector: Story = {
  render: () => (
    <Controlled
      modelSelector={
        <ModelSelector
          models={[
            { value: "fast", label: "Fast" },
            { value: "reasoning", label: "Reasoning" },
          ]}
          value="fast"
          onValueChange={() => {}}
        />
      }
    />
  ),
};

export const WithAttachments: Story = {
  render: () => (
    <Controlled
      attachments={
        <>
          <AttachmentChip name="brief.pdf" meta="1.1 MB" onRemove={() => {}} />
          <AttachmentChip name="mock.png" meta="320 KB" onRemove={() => {}} />
        </>
      }
    />
  ),
};

export const ResearchModeOn: Story = {
  render: () => <Controlled researchMode value="Compare the latest research on..." />,
};

export const Loading: Story = {
  render: () => <Controlled value="Explain quantum computing" loading />,
};

export const Streaming: Story = {
  render: () => (
    <Controlled value="" streaming onStop={() => {}} placeholder="Generating a response..." />
  ),
};

export const Disabled: Story = {
  render: () => <Controlled disabled value="Sign in to continue" />,
};

export const Mobile: Story = {
  render: () => <Controlled />,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Controlled
        placeholder="اكتب رسالة..."
        modelSelector={
          <ModelSelector
            models={[{ value: "fast", label: "سريع" }]}
            value="fast"
            onValueChange={() => {}}
          />
        }
      />
    </div>
  ),
};

export const LumenDark: Story = {
  render: () => <Controlled value="Design a multilingual research workspace" />,
  globals: { appearance: "lumen", theme: "dark" },
};

export const LumenReducedTransparency: Story = {
  render: () => <Controlled value="Summarize this document" />,
  globals: { appearance: "lumen", theme: "dark", transparency: "reduce" },
};

export const LumenArabicRTL: Story = {
  render: () => (
    <Controlled
      value="لخّص أحدث الأبحاث في هذا الموضوع"
      placeholder="اكتب رسالة..."
      researchMode
      modelSelector={
        <ModelSelector
          models={[{ value: "reasoning", label: "استدلال" }]}
          value="reasoning"
          onValueChange={() => {}}
        />
      }
    />
  ),
  globals: { appearance: "lumen", theme: "dark", direction: "rtl" },
};

export const LumenSoraniRTL: Story = {
  render: () => (
    <Controlled
      value="پوختەی ئەم توێژینەوەیە بنووسەوە"
      placeholder="نامەیەک بنووسە..."
      researchMode
      modelSelector={
        <ModelSelector
          models={[{ value: "reasoning", label: "بیرکردنەوە" }]}
          value="reasoning"
          onValueChange={() => {}}
        />
      }
    />
  ),
  globals: { appearance: "lumen", theme: "light", direction: "rtl" },
};
