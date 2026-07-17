import { Sun, Moon, MonitorCog } from "lucide-react";
import { useTheme, type ThemeName } from "../../providers/theme-provider";
import { IconButton } from "../inputs/IconButton";
import { Icon } from "./Icon";

const cycle: Record<ThemeName, ThemeName> = {
  light: "dark",
  dark: "system",
  system: "light",
};

const iconFor: Record<ThemeName, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: MonitorCog,
};

const labelFor: Record<ThemeName, string> = {
  light: "Light theme active. Switch to dark theme.",
  dark: "Dark theme active. Switch to system theme.",
  system: "System theme active. Switch to light theme.",
};

export interface ThemeToggleProps {
  className?: string;
}

/** Cycles light → dark → system. A single control keeps the header compact. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  return (
    <IconButton
      className={className}
      variant="ghost"
      aria-label={labelFor[theme]}
      onClick={() => setTheme(cycle[theme])}
    >
      <Icon icon={iconFor[theme]} size="sm" />
    </IconButton>
  );
}
