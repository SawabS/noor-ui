import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "lucide-react";
import { TopNavigation } from "./TopNavigation";
import { IconButton } from "../inputs/IconButton";
import { Icon } from "../primitives/Icon";
import { Typography } from "../primitives/Typography";
import { UserMenu } from "./UserMenu";

const meta: Meta<typeof TopNavigation> = {
  title: "Navigation/TopNavigation",
  component: TopNavigation,
  tags: ["autodocs"],
  parameters: { a11y: { test: "error" } },
};
export default meta;
type Story = StoryObj<typeof TopNavigation>;

export const Default: Story = {
  render: () => (
    <TopNavigation
      start={
        <>
          <IconButton aria-label="Toggle menu" variant="ghost" size="sm">
            <Icon icon={Menu} size="sm" />
          </IconButton>
          <Typography variant="label">Noor</Typography>
        </>
      }
      end={<UserMenu name="Sarah Ahmed" email="sarah@example.com" onSignOut={() => {}} />}
    />
  ),
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <TopNavigation
        start={
          <>
            <IconButton aria-label="فتح القائمة" variant="ghost" size="sm">
              <Icon icon={Menu} size="sm" />
            </IconButton>
            <Typography variant="label">نور</Typography>
          </>
        }
        end={<UserMenu name="سارة أحمد" email="sarah@example.com" onSignOut={() => {}} />}
      />
    </div>
  ),
};
