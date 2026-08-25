import { Sun, Moon, MonitorCog } from "lucide-react";
import { themeOptions, useTheme } from "../../providers/theme-provider";
import { IconButton } from "../inputs/IconButton";
import { Icon } from "./Icon";

export interface ThemeToggleProps {
  className?: string;
}

/** Cycles light → dark → system. A single control keeps the header compact. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const icon = theme === "system" ? MonitorCog : resolvedTheme === "dark" ? Moon : Sun;
  const currentLabel = themeOptions.find((option) => option.value === theme)?.label ?? theme;
  const nextLabel = themeOptions.find((option) => option.value === nextTheme)?.label ?? nextTheme;
  const label = `${currentLabel} theme active. Switch to ${nextLabel} theme.`;
  return (
    <IconButton
      className={className}
      variant="ghost"
      aria-label={label}
      onClick={() => setTheme(nextTheme)}
    >
      <Icon icon={icon} size="sm" />
    </IconButton>
  );
}
