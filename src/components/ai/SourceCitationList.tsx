import { Citation } from "../data-display/Citation";
import { Typography } from "../primitives/Typography";
import { cn } from "../../utilities/cn";

export interface Source {
  title: string;
  href: string;
  domain?: string;
}

export interface SourceCitationListProps {
  sources: Source[];
  className?: string;
}

/** Numbered list of sources cited by an assistant/research turn. */
export function SourceCitationList({ sources, className }: SourceCitationListProps) {
  if (sources.length === 0) return null;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Typography variant="caption" color="muted" className="uppercase tracking-wide">
        Sources
      </Typography>
      <ol className="flex flex-col gap-1">
        {sources.map((source, i) => (
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
      </ol>
    </div>
  );
}
