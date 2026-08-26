/**
 * Bounded rendering for data-heavy components.
 *
 * A consuming app rendered every matching row of three tables — about 18,000
 * rows, 150,415 DOM nodes — and because that markup stays in the document on
 * every route, the cost was paid even on pages that never showed it. A CPU
 * profile taken during interaction showed 86% idle: it was never JS, it was
 * DOM size. Capping the painted rows took the page to 8,612 nodes and cut
 * long-task time from 916ms to 514ms.
 *
 * Only *painting* is bounded. Sorting, filtering, counts and exports still run
 * over the full array — that is what makes a component scale to any input
 * size, because node count stays flat regardless of how much data arrives.
 */

/** Rows painted by default. Comfortably past a tall viewport, far short of
 *  the point where DOM size starts costing frames. */
export const DEFAULT_RENDER_CAP = 250;

export interface RenderCapResult<T> {
  /** The slice to paint. */
  visible: T[];
  /** Full input length — use this for counts, never `visible.length`. */
  total: number;
  /** How many rows exist beyond the cap. */
  hidden: number;
  /** True when anything was withheld, i.e. a notice should be shown. */
  truncated: boolean;
}

/**
 * `cap` of `null` (or a non-positive number) paints everything — the explicit
 * opt-out for a caller who has already bounded the input themselves.
 */
export function applyRenderCap<T>(
  items: readonly T[],
  cap: number | null = DEFAULT_RENDER_CAP,
): RenderCapResult<T> {
  const total = items.length;
  if (cap == null || cap <= 0 || total <= cap) {
    return { visible: items as T[], total, hidden: 0, truncated: false };
  }
  return { visible: items.slice(0, cap), total, hidden: total - cap, truncated: true };
}

export interface RenderCapNoticeOptions {
  shown: number;
  total: number;
  locale?: string;
}

/** Default copy for the footer row. Locale-aware number formatting, because
 *  these are the numbers most likely to be large. */
export function formatRenderCapNotice({ shown, total, locale }: RenderCapNoticeOptions): string {
  const format = (value: number) => new Intl.NumberFormat(locale).format(value);
  return `Showing the first ${format(shown)} of ${format(total)}. Export for the full set.`;
}
