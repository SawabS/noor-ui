import * as React from "react";
import { cn } from "../../utilities/cn";

const SidebarCollapsedContext = React.createContext(false);
export const useSidebarCollapsed = () => React.useContext(SidebarCollapsedContext);

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/** Fixed-width app sidebar. `border-e` (inline-end) keeps the divider on the
 *  correct side automatically under RTL. Collapse animates width only,
 *  which is skipped for prefers-reduced-motion users. */
export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed = false, header, footer, children, className, ...props }, ref) => (
    <SidebarCollapsedContext.Provider value={collapsed}>
      <aside
        ref={ref}
        className={cn(
          "flex h-full flex-col border-e border-border bg-sidebar",
          "transition-[width] duration-base ease-standard motion-reduce:transition-none",
          collapsed ? "w-16" : "w-64",
          className,
        )}
        {...props}
      >
        {header && <div className="flex items-center px-3 py-3">{header}</div>}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <ul className="flex flex-col gap-0.5">{children}</ul>
        </nav>
        {footer && <div className="border-t border-border px-3 py-3">{footer}</div>}
      </aside>
    </SidebarCollapsedContext.Provider>
  ),
);
Sidebar.displayName = "Sidebar";
