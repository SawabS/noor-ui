import * as React from "react";

export type AppearanceName = "default" | "lumen";
export type TransparencyPreference = "system" | "reduce";
export type AppearanceScope = "root" | "scoped";

export interface AppearanceContextValue {
  appearance: AppearanceName;
  transparency: TransparencyPreference;
  setAppearance: (appearance: AppearanceName) => void;
  setTransparency: (transparency: TransparencyPreference) => void;
}

interface InternalAppearanceContextValue extends AppearanceContextValue {
  portalContainer: HTMLElement | null;
}

export interface AppearanceProviderProps {
  children: React.ReactNode;
  appearance?: AppearanceName;
  defaultAppearance?: AppearanceName;
  onAppearanceChange?: (appearance: AppearanceName) => void;
  appearanceStorageKey?: string | null;
  transparency?: TransparencyPreference;
  defaultTransparency?: TransparencyPreference;
  onTransparencyChange?: (transparency: TransparencyPreference) => void;
  transparencyStorageKey?: string | null;
  scope?: AppearanceScope;
  className?: string;
}

const AppearanceContext = React.createContext<InternalAppearanceContextValue | null>(null);

export function isAppearanceName(value: string | null): value is AppearanceName {
  return value === "default" || value === "lumen";
}

export function isTransparencyPreference(value: string | null): value is TransparencyPreference {
  return value === "system" || value === "reduce";
}

function readStoredValue<T extends string>(
  storageKey: string | null,
  fallback: T,
  validate: (value: string | null) => value is T,
): T {
  if (typeof window === "undefined" || !storageKey) return fallback;
  const stored = window.localStorage.getItem(storageKey);
  return validate(stored) ? stored : fallback;
}

function restoreAttribute(element: HTMLElement, name: string, previous: string | null) {
  if (previous === null) element.removeAttribute(name);
  else element.setAttribute(name, previous);
}

export function AppearanceProvider({
  children,
  appearance: controlledAppearance,
  defaultAppearance = "default",
  onAppearanceChange,
  appearanceStorageKey = "noor-ui-appearance",
  transparency: controlledTransparency,
  defaultTransparency = "system",
  onTransparencyChange,
  transparencyStorageKey = "noor-ui-transparency",
  scope = "root",
  className,
}: AppearanceProviderProps) {
  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);
  const [uncontrolledAppearance, setUncontrolledAppearance] = React.useState<AppearanceName>(() =>
    readStoredValue(appearanceStorageKey, defaultAppearance, isAppearanceName),
  );
  const [uncontrolledTransparency, setUncontrolledTransparency] =
    React.useState<TransparencyPreference>(() =>
      readStoredValue(transparencyStorageKey, defaultTransparency, isTransparencyPreference),
    );

  const appearance = controlledAppearance ?? uncontrolledAppearance;
  const transparency = controlledTransparency ?? uncontrolledTransparency;

  const setAppearance = React.useCallback(
    (next: AppearanceName) => {
      if (controlledAppearance === undefined) setUncontrolledAppearance(next);
      if (appearanceStorageKey && typeof window !== "undefined") {
        window.localStorage.setItem(appearanceStorageKey, next);
      }
      onAppearanceChange?.(next);
    },
    [appearanceStorageKey, controlledAppearance, onAppearanceChange],
  );

  const setTransparency = React.useCallback(
    (next: TransparencyPreference) => {
      if (controlledTransparency === undefined) setUncontrolledTransparency(next);
      if (transparencyStorageKey && typeof window !== "undefined") {
        window.localStorage.setItem(transparencyStorageKey, next);
      }
      onTransparencyChange?.(next);
    },
    [controlledTransparency, onTransparencyChange, transparencyStorageKey],
  );

  React.useEffect(() => {
    if (scope !== "root" || typeof document === "undefined") return;
    const root = document.documentElement;
    const previousAppearance = root.getAttribute("data-noor-appearance");
    const previousTransparency = root.getAttribute("data-noor-transparency");

    root.setAttribute("data-noor-appearance", appearance);
    root.setAttribute("data-noor-transparency", transparency);

    return () => {
      restoreAttribute(root, "data-noor-appearance", previousAppearance);
      restoreAttribute(root, "data-noor-transparency", previousTransparency);
    };
  }, [appearance, scope, transparency]);

  const value = React.useMemo(
    () => ({ appearance, transparency, setAppearance, setTransparency, portalContainer }),
    [appearance, portalContainer, setAppearance, setTransparency, transparency],
  );

  if (scope === "scoped") {
    return (
      <AppearanceContext.Provider value={value}>
        <div
          data-noor-appearance={appearance}
          data-noor-transparency={transparency}
          className={className}
        >
          {children}
          <div ref={setPortalContainer} data-noor-portal-root="" />
        </div>
      </AppearanceContext.Provider>
    );
  }

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

export function useAppearance(): AppearanceContextValue {
  const context = React.useContext(AppearanceContext);
  if (!context) throw new Error("useAppearance must be used within an AppearanceProvider");
  return context;
}

/** Internal bridge used by composed Radix overlays so portals stay inside a
 * scoped appearance boundary. Returns undefined without a provider, which
 * preserves Radix's default document.body target. */
export function useAppearancePortalContainer(): HTMLElement | undefined {
  return React.useContext(AppearanceContext)?.portalContainer ?? undefined;
}
