import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../utilities/cn";
import { Icon } from "../primitives/Icon";
import { VisuallyHidden } from "../primitives/VisuallyHidden";
import { useSidebarCollapsed } from "./Sidebar";

export interface SidebarItemProps extends React.HTMLAttributes<HTMLElement> {
  icon: LucideIcon;
  label: React.ReactNode;
  active?: boolean;
  href?: string;
  disabled?: boolean;
}

/** A single sidebar row. Renders as an <a> when `href` is passed, a
 *  <button> otherwise. Label collapses to a visually-hidden node (kept in
 *  the a11y tree) when the parent Sidebar is collapsed. */
export const SidebarItem = React.forwardRef<HTMLElement, SidebarItemProps>(
  ({ icon, label, active = false, href, disabled, className, onClick, ...props }, ref) => {
    const collapsed = useSidebarCollapsed();
    const Comp = (href ? "a" : "button") as React.ElementType;

    return (
      <li>
        <Comp
          ref={ref}
          href={href}
          type={href ? undefined : "button"}
          disabled={!href ? disabled : undefined}
          aria-disabled={href ? disabled : undefined}
          aria-current={active ? "page" : undefined}
          title={collapsed ? String(label) : undefined}
          onClick={disabled ? undefined : onClick}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-body-sm transition-colors duration-fast ease-standard",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
            disabled && "pointer-events-none opacity-disabled",
            active
              ? "bg-surface-active font-medium text-text-primary"
              : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
            collapsed && "justify-center px-0",
            className,
          )}
          {...props}
        >
          <Icon icon={icon} size="sm" />
          {collapsed ? (
            <VisuallyHidden>{label}</VisuallyHidden>
          ) : (
            <span className="truncate">{label}</span>
          )}
        </Comp>
      </li>
    );
  },
);
SidebarItem.displayName = "SidebarItem";
