import * as React from "react";
import {
  LOCALE_CHANGE_EVENT,
  applyStaticTranslations,
  interpolate,
  type ApplyStaticTranslationsResult,
  type TranslationArgs,
  type Translate,
} from "../utilities/i18n";

export type Messages = Record<string, string>;

export interface I18nBridge {
  locale: string;
  /** Resolve a key and fill its positional `{n}` slots. */
  t: (key: string, args?: TranslationArgs) => string;
  /** Raw template lookup, without interpolation. */
  lookup: Translate;
  /** Translate a subtree of non-React DOM in place. */
  apply: (root: ParentNode, slots?: Record<string, string>) => ApplyStaticTranslationsResult;
}

export interface I18nContextValue extends I18nBridge {
  setLocale: (locale: string) => void;
}

declare global {
  interface Window {
    /**
     * Published by `I18nProvider` so vanilla-JS, third-party and
     * server-rendered surfaces can read translations without a React import.
     */
    noorI18n?: I18nBridge;
  }
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

export interface I18nProviderProps {
  children: React.ReactNode;
  /** Message catalogues keyed by locale, then by message key. */
  messages: Record<string, Messages>;
  locale?: string;
  defaultLocale?: string;
  onLocaleChange?: (locale: string) => void;
  /** Locale consulted when a key is missing from the active one. */
  fallbackLocale?: string;
  /**
   * Publishes the bridge on `window.noorI18n` and dispatches a
   * `locale-change` event on every change. Turn this off only if something
   * else on the page already owns that global.
   */
  publishToWindow?: boolean;
}

/**
 * Publishes the active locale and a message lookup to non-React code.
 *
 * A React-only i18n layer leaves embedded legacy markup untranslated. This
 * provider exposes `window.noorI18n` and fires a `locale-change` CustomEvent
 * whenever the locale changes, which is the signal a vanilla-JS surface needs
 * in order to repaint itself:
 *
 * ```js
 * window.addEventListener("locale-change", () => {
 *   window.noorI18n.apply(document.getElementById("legacy-panel"));
 * });
 * ```
 */
export function I18nProvider({
  children,
  messages,
  locale: controlledLocale,
  defaultLocale = "en",
  onLocaleChange,
  fallbackLocale,
  publishToWindow = true,
}: I18nProviderProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultLocale);
  const locale = controlledLocale ?? uncontrolled;

  const setLocale = React.useCallback(
    (next: string) => {
      if (controlledLocale === undefined) setUncontrolled(next);
      onLocaleChange?.(next);
    },
    [controlledLocale, onLocaleChange],
  );

  const bridge = React.useMemo<I18nBridge>(() => {
    const lookup: Translate = (key) =>
      messages[locale]?.[key] ??
      (fallbackLocale ? messages[fallbackLocale]?.[key] : undefined) ??
      null;

    // Callers pass raw numbers and they are formatted here, at render, because
    // only this layer knows the active locale.
    const t = (key: string, args: TranslationArgs = []) => {
      const template = lookup(key);
      return template == null ? key : interpolate(template, args, locale);
    };

    return {
      locale,
      t,
      lookup,
      apply: (root, slots) => applyStaticTranslations(root, { translate: lookup, locale, slots }),
    };
  }, [fallbackLocale, locale, messages]);

  React.useEffect(() => {
    if (!publishToWindow || typeof window === "undefined") return;
    const previous = window.noorI18n;
    window.noorI18n = bridge;
    window.dispatchEvent(
      new CustomEvent(LOCALE_CHANGE_EVENT, { detail: { locale: bridge.locale } }),
    );
    return () => {
      window.noorI18n = previous;
    };
  }, [bridge, publishToWindow]);

  const value = React.useMemo<I18nContextValue>(
    () => ({ ...bridge, setLocale }),
    [bridge, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = React.useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within an I18nProvider");
  return context;
}

/**
 * Translates a subtree of non-React DOM and re-translates it on every locale
 * change. Use for a legacy panel that React renders a container for but does
 * not own the contents of.
 */
export function useStaticTranslations(
  ref: React.RefObject<HTMLElement | null>,
  slots?: Record<string, string>,
): void {
  const { apply, locale } = useI18n();
  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    apply(root, slots);
  }, [apply, locale, ref, slots]);
}
