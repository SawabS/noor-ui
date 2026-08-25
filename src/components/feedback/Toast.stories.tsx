import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../inputs/Button";

const meta: Meta = {
  title: "Feedback/Toast",
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj;

function Demo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast({ variant: "neutral", title: "Copied", description: "Link copied to clipboard." })
        }
      >
        Neutral
      </Button>
      <Button
        onClick={() =>
          toast({ variant: "success", title: "Saved", description: "Your settings were updated." })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast({ variant: "warning", title: "Slow connection", description: "Responses may lag." })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toast({
            variant: "danger",
            title: "Failed to send",
            description: "Try again in a moment.",
          })
        }
      >
        Danger
      </Button>
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };
