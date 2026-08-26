import { Citation } from "../data-display/Citation";
import { Typography } from "../primitives/Typography";
import { cn } from "../../utilities/cn";
import {
  DEFAULT_RENDER_CAP,
  applyRenderCap,
  formatRenderCapNotice,
} from "../../utilities/render-cap";

export interface Source {
  title: string;
  href: string;
  domain?: string;
}

export interface SourceCitationListProps {
  sources: Source[];
  /**
   * Maximum sources painted. `null` paints everything. Only painting is
   * bounded; `sources` is untouched, so counts stay accurate.
   */
  renderCap?: number | null;
  className?: string;
}

/** Numbered list of sources cited by an assistant/research turn. */
export function SourceCitationList({
  sources,
  renderCap = DEFAULT_RENDER_CAP,
  className,
}: SourceCitationListProps) {
  const { visible, total, truncated } = applyRenderCap(sources, renderCap);
  if (sources.length === 0) return null;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Typography variant="caption" color="muted" className="uppercase tracking-wide">
        Sources
      </Typography>
      <ol className="flex flex-col gap-1">
        {visible.map((source, i) => (
          <li key={source.href} className="flex items-center gap-2">
            <Citation index={i + 1} href={source.href} title={source.title} />
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 truncate text-body-sm text-text-secondary hover:text-text-primary hover:underline"
            >
              {source.title}
            </a>
            {source.domain ? (
              <Typography variant="caption" color="muted" className="shrink-0">
                {source.domain}
              </Typography>
            ) : null}
          </li>
        ))}
        {truncated && (
          <li className="text-caption text-text-muted">
            {formatRenderCapNotice({ shown: visible.length, total })}
          </li>
        )}
      </ol>
    </div>
  );
}
