import type { Meta, StoryObj } from "@storybook/react";
import { Pencil, Trash2, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./DropdownMenu";
import { Button } from "../inputs/Button";

const meta: Meta<typeof DropdownMenu> = {
  title: "Overlays/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu trigger={<Button variant="outline">Actions</Button>}>
      <DropdownMenuLabel>Conversation</DropdownMenuLabel>
      <DropdownMenuItem icon={<Pencil className="size-4" />}>Rename</DropdownMenuItem>
      <DropdownMenuItem icon={<Copy className="size-4" />}>Duplicate</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem destructive icon={<Trash2 className="size-4" />}>
        Delete
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <DropdownMenu trigger={<Button variant="outline">إجراءات</Button>}>
        <DropdownMenuLabel>المحادثة</DropdownMenuLabel>
        <DropdownMenuItem icon={<Pencil className="size-4" />}>إعادة تسمية</DropdownMenuItem>
        <DropdownMenuItem destructive icon={<Trash2 className="size-4" />}>
          حذف
        </DropdownMenuItem>
      </DropdownMenu>
    </div>
  ),
};
