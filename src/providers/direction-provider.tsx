import * as React from "react";
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";

export type Direction = "ltr" | "rtl";

interface DirectionContextValue {
  direction: Direction;
  setDirection: (direction: Direction) => void;
}

const DirectionContext = React.createContext<DirectionContextValue | null>(null);

export interface DirectionProviderProps {
  children: React.ReactNode;
  direction?: Direction;
  defaultDirection?: Direction;
  onDirectionChange?: (direction: Direction) => void;
  /** Writes dir="rtl"/"ltr" onto <html> so native form controls, scrollbars
   *  and browser UI mirror correctly, not just this subtree. */
  applyToDocument?: boolean;
}

/** Locales that ship as RTL out of the box: Arabic and its Kurdish (Sorani) usage. */
export const RTL_LOCALES = ["ar", "ckb", "fa", "ur", "he"];

export function isRtlLocale(locale: string): boolean {
  return RTL_LOCALES.some((rtl) => locale.toLowerCase().startsWith(rtl));
}

export function DirectionProvider({
  children,
  direction: controlledDirection,
  defaultDirection = "ltr",
  onDirectionChange,
  applyToDocument = true,
}: DirectionProviderProps) {
  const [uncontrolled, setUncontrolled] = React.useState<Direction>(defaultDirection);
  const direction = controlledDirection ?? uncontrolled;

  const setDirection = React.useCallback(
    (next: Direction) => {
      if (controlledDirection === undefined) setUncontrolled(next);
      onDirectionChange?.(next);
    },
    [controlledDirection, onDirectionChange],
  );

  React.useEffect(() => {
    if (!applyToDocument || typeof document === "undefined") return;
    document.documentElement.setAttribute("dir", direction);
  }, [applyToDocument, direction]);

  const value = React.useMemo(() => ({ direction, setDirection }), [direction, setDirection]);

  return (
    <DirectionContext.Provider value={value}>
      <RadixDirectionProvider dir={direction}>{children}</RadixDirectionProvider>
    </DirectionContext.Provider>
  );
}

export function useDirection(): DirectionContextValue {
  const ctx = React.useContext(DirectionContext);
  if (!ctx) throw new Error("useDirection must be used within a DirectionProvider");
  return ctx;
}
