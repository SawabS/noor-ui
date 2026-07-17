import type { Meta, StoryObj } from "@storybook/react";
import { Paperclip } from "lucide-react";
import { ComposerToolbar } from "./ComposerToolbar";
import { IconButton } from "../inputs/IconButton";
import { Button } from "../inputs/Button";

const meta: Meta<typeof ComposerToolbar> = {
  title: "AI/ComposerToolbar",
  component: ComposerToolbar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ComposerToolbar>;

export const Default: Story = {
  render: () => (
    <ComposerToolbar
      leading={
        <IconButton aria-label="Attach" variant="ghost" size="sm">
          <Paperclip className="size-4" />
        </IconButton>
      }
      trailing={<Button size="sm">Send</Button>}
    />
  ),
};
