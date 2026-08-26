/**
 * i18n bridge for non-React content.
 *
 * Consumers embed legacy markup, third-party widgets and server-rendered HTML
 * inside a Noor shell. Those surfaces cannot call a React hook, so they need a
 * way to be translated and repainted from the outside. This module is the
 * DOM half of that bridge; `I18nProvider` (src/providers/i18n-provider.tsx) is
 * the React half that publishes the lookup and announces locale changes.
 */

export type TranslationArgs = ReadonlyArray<string | number>;

/** Resolves a message key to a template, or returns `null` if unknown. */
export type Translate = (key: string) => string | null | undefined;

export const LOCALE_CHANGE_EVENT = "locale-change";

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  middot: "·",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
};

/**
 * Message values are written with `textContent`, which does *not* decode HTML
 * entities — so a catalogue entry lifted straight out of markup prints
 * `&middot;` literally. Copy extracted from HTML must be decoded on the way
 * in; this is that decoder.
 */
export function decodeHtmlEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const code = Number.parseInt(entity.slice(2), 16);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }
    if (entity.startsWith("#")) {
      const code = Number.parseInt(entity.slice(1), 10);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }
    const named = NAMED_ENTITIES[entity.toLowerCase()];
    return named ?? match;
  });
}

/** Read through `globalThis` so this stays free of a Node type dependency and
 *  survives bundlers that do not define `process` in browser builds. */
function isProduction(): boolean {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    ?.env;
  return env?.NODE_ENV === "production";
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Fills positional `{n}` slots.
 *
 * Numbers are formatted with the active locale at render time rather than by
 * the caller. Only the React layer knows which locale is active, so callers
 * pass raw numbers and get `1,234` or `١٬٢٣٤` depending on where the string
 * ends up. A slot with no corresponding argument is left as-is so a
 * short-changed call is visible rather than silently blank.
 */
export function interpolate(template: string, args: TranslationArgs = [], locale?: string): string {
  return template.replace(/\{(\d+)\}/g, (match, index: string) => {
    const arg = args[Number(index)];
    if (arg === undefined) return match;
    return typeof arg === "number" ? new Intl.NumberFormat(locale).format(arg) : String(arg);
  });
}

export interface ApplyStaticTranslationsOptions {
  /** Message lookup. Usually `window.noorI18n.t` or the provider's own. */
  translate: Translate;
  /** Locale used for number formatting inside `{n}` slots. */
  locale?: string;
  /**
   * Raw HTML fragments, keyed by the names listed in `data-i18n-args`. Only
   * consulted for `data-i18n-html` elements.
   */
  slots?: Record<string, string>;
  /**
   * Dev-mode assertion that warns when a `[data-i18n]` element's text does not
   * match its resolved translation after the pass. Defaults to on outside
   * production. See `auditStaticTranslations`.
   */
  audit?: boolean;
  onWarn?: (message: string, element: Element) => void;
}

export interface ApplyStaticTranslationsResult {
  /** Elements whose text was written. */
  translated: number;
  /** Keys that had no entry in the catalogue; left untouched. */
  missing: string[];
}

/**
 * Walks `root` and translates tagged elements in place.
 *
 * - `[data-i18n="key"]` sets `textContent`.
 * - `[data-i18n-html="key"][data-i18n-args="a,b"]` escapes the *template*
 *   first and only then fills `{n}` slots with caller-supplied HTML, so
 *   translator copy can never inject markup while the caller still can.
 *
 * `data-i18n-html` exists because mixed content has to be one message.
 * Tagging only the `<strong>` children of a sentence leaves the prose around
 * them untranslated, and RTL languages reorder clauses, so pre-cut fragments
 * cannot be reassembled in the right order. The whole paragraph must be a
 * single template with slots.
 */
export function applyStaticTranslations(
  root: ParentNode,
  options: ApplyStaticTranslationsOptions,
): ApplyStaticTranslationsResult {
  const { translate, locale, slots = {} } = options;
  const missing: string[] = [];
  let translated = 0;

  const textTargets = root.querySelectorAll<HTMLElement>("[data-i18n]");
  for (const element of Array.from(textTargets)) {
    const key = element.getAttribute("data-i18n");
    if (!key) continue;
    const template = translate(key);
    if (template == null) {
      missing.push(key);
      continue;
    }
    element.textContent = decodeHtmlEntities(interpolate(template, [], locale));
    translated += 1;
  }

  const htmlTargets = root.querySelectorAll<HTMLElement>("[data-i18n-html]");
  for (const element of Array.from(htmlTargets)) {
    const key = element.getAttribute("data-i18n-html");
    if (!key) continue;
    const template = translate(key);
    if (template == null) {
      missing.push(key);
      continue;
    }
    const argNames = (element.getAttribute("data-i18n-args") ?? "")
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);
    const values = argNames.map((name) => slots[name] ?? "");
    // Escape the template, then substitute. Doing it the other way round would
    // escape the caller's HTML too.
    const escaped = escapeHtml(decodeHtmlEntities(template));
    element.innerHTML = escaped.replace(/\{(\d+)\}/g, (match, index: string) => {
      const value = values[Number(index)];
      return value === undefined ? match : value;
    });
    translated += 1;
  }

  const shouldAudit = options.audit ?? !isProduction();
  if (shouldAudit) auditStaticTranslations(root, translate, locale, options.onWarn);

  return { translated, missing };
}

/**
 * Warns when a `[data-i18n]` element's text does not match its resolved
 * translation.
 *
 * This catches the single most common failure: statically labelling an
 * element that host code also writes into. A `data-i18n` label and live data
 * fight over the same node, and whichever runs last wins — so the bug is
 * intermittent and reads as "the translation didn't apply". It cannot be
 * found by scanning for `setText('x', …)` calls either, because the indirect
 * form is just as common:
 *
 * ```js
 * const el = document.getElementById('x');
 * el.textContent = value;
 * ```
 *
 * Comparing the DOM against the catalogue after a render pass finds both.
 */
export function auditStaticTranslations(
  root: ParentNode,
  translate: Translate,
  locale?: string,
  onWarn?: (message: string, element: Element) => void,
): Element[] {
  const conflicts: Element[] = [];
  const warn =
    onWarn ??
    ((message: string) => {
      // eslint-disable-next-line no-console
      console.warn(message);
    });

  for (const element of Array.from(root.querySelectorAll<HTMLElement>("[data-i18n]"))) {
    const key = element.getAttribute("data-i18n");
    if (!key) continue;
    const template = translate(key);
    if (template == null) continue;
    const expected = decodeHtmlEntities(interpolate(template, [], locale));
    if (element.textContent === expected) continue;
    conflicts.push(element);
    warn(
      `[noor-ui i18n] <${element.tagName.toLowerCase()} data-i18n="${key}"> shows ` +
        `${JSON.stringify(element.textContent)} but the catalogue says ` +
        `${JSON.stringify(expected)}. Host code is very likely writing into this ` +
        `node — never statically label an element that live data owns.`,
      element,
    );
  }

  return conflicts;
}
