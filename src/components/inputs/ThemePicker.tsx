import { isThemeName, themeOptions, useTheme } from "../../providers/theme-provider";
import { Select, type SelectProps } from "./Select";

const options = themeOptions.map(({ value, label }) => ({ value, label }));

export interface ThemePickerProps {
  className?: string;
  size?: SelectProps["size"];
  "aria-label"?: string;
}

/** Selects any built-in Noor UI color palette and persists it through ThemeProvider. */
export function ThemePicker({
  className,
  size,
  "aria-label": ariaLabel = "Color theme",
}: ThemePickerProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      aria-label={ariaLabel}
      className={className}
      size={size}
      options={options}
      value={theme}
      onValueChange={(value) => {
        if (isThemeName(value)) setTheme(value);
      }}
    />
  );
}
