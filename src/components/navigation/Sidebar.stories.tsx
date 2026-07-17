import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Home, Search, Settings, MessageSquare } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { SidebarItem } from "./SidebarItem";
import { Typography } from "../primitives/Typography";

const meta: Meta<typeof Sidebar> = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

function DemoSidebar({ dir = "ltr" as "ltr" | "rtl" }) {
  const [active, setActive] = useState("chats");
  const [collapsed, setCollapsed] = useState(false);
  const labels =
    dir === "rtl"
      ? { home: "الرئيسية", search: "بحث", chats: "المحادثات", settings: "الإعدادات" }
      : { home: "Home", search: "Search", chats: "Chats", settings: "Settings" };

  return (
    <div dir={dir} className="h-96">
      <Sidebar
        collapsed={collapsed}
        header={
          <button onClick={() => setCollapsed((c) => !c)}>
            <Typography variant="label">Noor</Typography>
          </button>
        }
      >
        <SidebarItem
          icon={Home}
          label={labels.home}
          active={active === "home"}
          onClick={() => setActive("home")}
        />
        <SidebarItem
          icon={Search}
          label={labels.search}
          active={active === "search"}
          onClick={() => setActive("search")}
        />
        <SidebarItem
          icon={MessageSquare}
          label={labels.chats}
          active={active === "chats"}
          onClick={() => setActive("chats")}
        />
        <SidebarItem
          icon={Settings}
          label={labels.settings}
          active={active === "settings"}
          onClick={() => setActive("settings")}
        />
      </Sidebar>
    </div>
  );
}

export const Default: Story = { render: () => <DemoSidebar /> };
export const RTL: Story = { render: () => <DemoSidebar dir="rtl" /> };
