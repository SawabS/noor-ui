import { Menu } from "lucide-react";
import {
  ConversationSidebar,
  type ConversationSidebarProps,
} from "../components/ai/ConversationSidebar";
import { IconButton } from "../components/inputs/IconButton";
import { Drawer } from "../components/overlays/Drawer";
import { cn } from "../utilities/cn";

export function DesktopConversationSidebar(props: ConversationSidebarProps) {
  return (
    <div className="hidden h-full md:block">
      <ConversationSidebar {...props} />
    </div>
  );
}

export function MobileConversationDrawer(props: ConversationSidebarProps) {
  return (
    <div className="md:hidden">
      <Drawer
        side="start"
        title="Conversations"
        trigger={
          <IconButton aria-label="Open conversations" size="sm">
            <Menu className="size-4" aria-hidden="true" />
          </IconButton>
        }
      >
        <ConversationSidebar {...props} className={cn("w-full border-0", props.className)} />
      </Drawer>
    </div>
  );
}
