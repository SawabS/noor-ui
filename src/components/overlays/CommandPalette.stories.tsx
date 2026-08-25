import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MessageSquarePlus, Settings, Sun } from "lucide-react";
import { CommandPalette } from "./CommandPalette";
import { Button } from "../inputs/Button";

const meta: Meta<typeof CommandPalette> = {
  title: "Overlays/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj<typeof CommandPalette>;

function DefaultCommandPalette() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open command palette (⌘K)</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={[
          {
            group: "Actions",
            items: [
              {
                id: "new",
                label: "New chat",
                icon: <MessageSquarePlus className="size-4" />,
                onSelect: () => {},
              },
              {
                id: "settings",
                label: "Settings",
                icon: <Settings className="size-4" />,
                onSelect: () => {},
              },
              {
                id: "theme",
                label: "Toggle theme",
                icon: <Sun className="size-4" />,
                onSelect: () => {},
              },
            ],
          },
        ]}
      />
    </>
  );
}

export const Default: Story = {
  render: () => <DefaultCommandPalette />,
};
