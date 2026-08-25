import * as React from "react";

export const themeOptions = [
  { value: "system", label: "System", colorScheme: "system" },
  { value: "light", label: "Noor Light", colorScheme: "light" },
  { value: "dark", label: "Noor Dark", colorScheme: "dark" },
  { value: "github-light", label: "GitHub Light", colorScheme: "light" },
  { value: "github-dark", label: "GitHub Dark", colorScheme: "dark" },
  { value: "dracula", label: "Dracula", colorScheme: "dark" },
  { value: "one-dark-pro", label: "One Dark Pro", colorScheme: "dark" },
  { value: "nord", label: "Nord", colorScheme: "dark" },
  { value: "catppuccin-mocha", label: "Catppuccin Mocha", colorScheme: "dark" },
] as const;

export type ThemeName = (typeof themeOptions)[number]["value"];
export type ResolvedTheme = "light" | "dark";
export type ActiveTheme = Exclude<ThemeName, "system">;

interface ThemeContextValue {
  /** The theme setting as chosen by the user, including "system". */
  theme: ThemeName;
  /** "system" resolved to an actual light/dark value. */
  resolvedTheme: ResolvedTheme;
  /** The concrete palette applied to the DOM. */
  activeTheme: ActiveTheme;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Controlled theme. Omit to let ThemeProvider manage its own state. */
  theme?: ThemeName;
  defaultTheme?: ThemeName;
  onThemeChange?: (theme: ThemeName) => void;
  /** Persists the choice under this localStorage key. Pass null to disable. */
  storageKey?: string | null;
  /**
   * "root" (default) writes data-theme onto <html> so the whole document
   * themes consistently. "scoped" instead wraps children in a themed div —
   * use this to render palettes side-by-side (e.g. the token showcase).
   */
  scope?: "root" | "scoped";
  className?: string;
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function isThemeName(value: string | null): value is ThemeName {
  return themeOptions.some((option) => option.value === value);
}

function getThemeColorScheme(theme: ActiveTheme): ResolvedTheme {
  return themeOptions.find((option) => option.value === theme)?.colorScheme === "light"
    ? "light"
    : "dark";
}

export function ThemeProvider({
  children,
  theme: controlledTheme,
  defaultTheme = "system",
  onThemeChange,
  storageKey = "noor-ui-theme",
  scope = "root",
  className,
}: ThemeProviderProps) {
  const [uncontrolledTheme, setUncontrolledTheme] = React.useState<ThemeName>(() => {
    if (typeof window === "undefined" || !storageKey) return defaultTheme;
    const stored = window.localStorage.getItem(storageKey);
    return isThemeName(stored) ? stored : defaultTheme;
  });

  const theme = controlledTheme ?? uncontrolledTheme;
  const [systemTheme, setSystemTheme] = React.useState<ResolvedTheme>(getSystemTheme);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setSystemTheme(mql.matches ? "dark" : "light");
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  const activeTheme: ActiveTheme = theme === "system" ? systemTheme : theme;
  const resolvedTheme = getThemeColorScheme(activeTheme);

  const setTheme = React.useCallback(
    (next: ThemeName) => {
      if (controlledTheme === undefined) setUncontrolledTheme(next);
      if (storageKey && typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, next);
      }
      onThemeChange?.(next);
    },
    [controlledTheme, onThemeChange, storageKey],
  );

  React.useEffect(() => {
    if (scope !== "root" || typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", activeTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [scope, activeTheme, resolvedTheme]);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, activeTheme, setTheme }),
    [theme, resolvedTheme, activeTheme, setTheme],
  );

  if (scope === "scoped") {
    return (
      <ThemeContext.Provider value={value}>
        <div data-theme={activeTheme} className={className} style={{ colorScheme: resolvedTheme }}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
