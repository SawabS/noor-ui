import * as React from "react";

export type ThemeName = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  /** The theme setting as chosen by the user, including "system". */
  theme: ThemeName;
  /** "system" resolved to an actual light/dark value. */
  resolvedTheme: ResolvedTheme;
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
   * use this to render light/dark side-by-side (e.g. the token showcase).
   */
  scope?: "root" | "scoped";
  className?: string;
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
    return (stored as ThemeName) || defaultTheme;
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

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

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
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [scope, resolvedTheme]);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  if (scope === "scoped") {
    return (
      <ThemeContext.Provider value={value}>
        <div
          data-theme={resolvedTheme}
          className={className}
          style={{ colorScheme: resolvedTheme }}
        >
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
