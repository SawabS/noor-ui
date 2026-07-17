import * as React from "react";
import { Sparkles } from "lucide-react";
import { Typography } from "../components/primitives/Typography";
import { Separator } from "../components/primitives/Separator";
import { Icon } from "../components/primitives/Icon";
import { Spinner } from "../components/primitives/Spinner";
import { Skeleton } from "../components/primitives/Skeleton";
import { Button } from "../components/inputs/Button";
import { Badge } from "../components/feedback/Badge";
import { ThemeProvider } from "../providers/theme-provider";
import { DirectionProvider } from "../providers/direction-provider";
import { typeScale, spacingScale, radiiScale, shadowScale } from "../tokens";

const colorSwatches: { name: string; twClass: string; cssVar: string }[] = [
  { name: "canvas", twClass: "bg-canvas border border-border", cssVar: "--n-canvas" },
  { name: "sidebar", twClass: "bg-sidebar border border-border", cssVar: "--n-sidebar" },
  { name: "surface", twClass: "bg-surface border border-border", cssVar: "--n-surface" },
  { name: "surface-raised", twClass: "bg-surface-raised", cssVar: "--n-surface-raised" },
  { name: "surface-hover", twClass: "bg-surface-hover", cssVar: "--n-surface-hover" },
  { name: "surface-active", twClass: "bg-surface-active", cssVar: "--n-surface-active" },
  { name: "text-primary", twClass: "bg-text-primary", cssVar: "--n-text-primary" },
  { name: "text-secondary", twClass: "bg-text-secondary", cssVar: "--n-text-secondary" },
  { name: "text-muted", twClass: "bg-text-muted", cssVar: "--n-text-muted" },
  { name: "border", twClass: "bg-border", cssVar: "--n-border" },
  { name: "border-strong", twClass: "bg-border-strong", cssVar: "--n-border-strong" },
  { name: "primary-action", twClass: "bg-primary-action", cssVar: "--n-primary-action" },
  { name: "focus-ring", twClass: "bg-focus-ring", cssVar: "--n-focus-ring" },
  { name: "success", twClass: "bg-success", cssVar: "--n-success" },
  { name: "warning", twClass: "bg-warning", cssVar: "--n-warning" },
  { name: "danger", twClass: "bg-danger", cssVar: "--n-danger" },
  { name: "info", twClass: "bg-info", cssVar: "--n-info" },
];

const radiusClasses: Record<string, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  pill: "rounded-pill",
};

const shadowClasses: Record<string, string> = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const spacingClasses: Record<string, string> = {
  "0.5": "w-0.5",
  "1": "w-1",
  "1.5": "w-1.5",
  "2": "w-2",
  "3": "w-3",
  "4": "w-4",
  "5": "w-5",
  "6": "w-6",
  "8": "w-8",
  "10": "w-10",
  "12": "w-12",
  "16": "w-16",
  "20": "w-20",
  "24": "w-24",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <Typography variant="heading-sm" as="h2">
        {title}
      </Typography>
      {children}
    </section>
  );
}

/** A single-page reference of every design token and core component state,
 *  for visual QA and for tooling (e.g. design-sync) to inspect at a glance. */
export function DesignSystemShowcase() {
  return (
    <div className="mx-auto flex max-w-content-xl flex-col gap-12 px-6 py-10">
      <header>
        <Typography variant="display" as="h1">
          Noor
        </Typography>
        <Typography variant="body-lg" color="secondary" className="mt-1">
          Design token and component reference.
        </Typography>
      </header>

      <Section title="Color">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {colorSwatches.map((c) => (
            <div key={c.name} className="flex flex-col gap-1.5">
              <div className={`h-14 rounded-md ${c.twClass}`} />
              <Typography variant="caption" weight="medium">
                {c.name}
              </Typography>
              <Typography variant="caption" color="muted" className="font-mono">
                {c.cssVar}
              </Typography>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Typography">
        <div className="flex flex-col gap-3">
          {typeScale.map((variant) => (
            <div key={variant} className="flex items-baseline gap-4 border-b border-border pb-3">
              <Typography variant="caption" color="muted" className="w-28 shrink-0 font-mono">
                {variant}
              </Typography>
              <Typography variant={variant}>The quick brown fox jumps — نص عربي تجريبي</Typography>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Spacing (4px base)">
        <div className="flex flex-col gap-2">
          {spacingScale.map((step) => (
            <div key={step} className="flex items-center gap-3">
              <Typography variant="caption" color="muted" className="w-10 shrink-0 font-mono">
                {step}
              </Typography>
              <div className={`h-4 bg-primary-action ${spacingClasses[step]}`} />
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Radii">
        <div className="flex flex-wrap gap-6">
          {Object.entries(radiiScale).map(([name]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className={`size-16 border border-border-strong bg-surface-raised ${radiusClasses[name]}`}
              />
              <Typography variant="caption" color="muted">
                {name}
              </Typography>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Shadows">
        <div className="flex flex-wrap gap-8">
          {shadowScale.map((name) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <div className={`size-16 rounded-md bg-surface ${shadowClasses[name]}`} />
              <Typography variant="caption" color="muted">
                {name}
              </Typography>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Icon sizing">
        <div className="flex items-end gap-6 text-text-primary">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Icon icon={Sparkles} size={size} />
              <Typography variant="caption" color="muted">
                {size}
              </Typography>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Component states">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" loading>
              Loading
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Neutral</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Spinner />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="Light / dark comparison">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ThemeProvider
            theme="light"
            scope="scoped"
            className="rounded-lg border border-border p-6"
          >
            <Typography variant="label" color="muted" className="mb-3 block">
              Light
            </Typography>
            <div className="flex flex-col gap-3 rounded-lg bg-surface p-4">
              <Typography variant="body-sm" weight="medium">
                Card surface
              </Typography>
              <Button variant="primary" size="sm">
                Continue
              </Button>
            </div>
          </ThemeProvider>
          <ThemeProvider
            theme="dark"
            scope="scoped"
            className="rounded-lg border border-border p-6"
          >
            <Typography variant="label" color="muted" className="mb-3 block">
              Dark
            </Typography>
            <div className="flex flex-col gap-3 rounded-lg bg-surface p-4">
              <Typography variant="body-sm" weight="medium">
                Card surface
              </Typography>
              <Button variant="primary" size="sm">
                Continue
              </Button>
            </div>
          </ThemeProvider>
        </div>
      </Section>

      <Separator />

      <Section title="LTR / RTL comparison">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DirectionProvider direction="ltr" applyToDocument={false}>
            <div dir="ltr" className="rounded-lg border border-border bg-surface p-4">
              <Typography variant="label" color="muted" className="mb-3 block">
                LTR
              </Typography>
              <div className="flex items-center gap-2">
                <Badge variant="info">New</Badge>
                <Typography variant="body-sm">Message sent successfully</Typography>
              </div>
            </div>
          </DirectionProvider>
          <DirectionProvider direction="rtl" applyToDocument={false}>
            <div dir="rtl" className="rounded-lg border border-border bg-surface p-4">
              <Typography variant="label" color="muted" className="mb-3 block">
                RTL
              </Typography>
              <div className="flex items-center gap-2">
                <Badge variant="info">جديد</Badge>
                <Typography variant="body-sm">تم إرسال الرسالة بنجاح</Typography>
              </div>
            </div>
          </DirectionProvider>
        </div>
      </Section>
    </div>
  );
}
