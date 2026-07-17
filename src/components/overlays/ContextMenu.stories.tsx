import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from "./ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  title: "Overlays/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu
      trigger={
        <div className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed border-border text-body-sm text-text-secondary">
          Right-click here
        </div>
      }
    >
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem>Regenerate</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem destructive>Delete</ContextMenuItem>
    </ContextMenu>
  ),
};
