import * as React from "react";
import type { LucideIcon } from "lucide-react";

/**
 * Distinguishes an icon *component* from already-rendered icon markup.
 *
 * `typeof icon === "function"` is not enough: lucide icons are built with
 * React.forwardRef, so they are objects carrying a `$$typeof` tag, as are
 * React.memo components. Rendered elements carry `$$typeof` too, which is why
 * this also has to exclude anything React.isValidElement accepts.
 */
export function isIconComponent(icon: unknown): icon is LucideIcon {
  if (typeof icon === "function") return true;
  return (
    typeof icon === "object" &&
    icon !== null &&
    "$$typeof" in icon &&
    !React.isValidElement(icon)
  );
}
