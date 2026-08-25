/** Shared vocabulary used across component prop types, kept in one place so
 *  "sm"/"md"/"lg" and status semantics stay consistent system-wide. */

export type Size = "sm" | "md" | "lg";

export type Status = "neutral" | "success" | "warning" | "danger" | "info";

export type Align = "start" | "center" | "end";

export type Orientation = "horizontal" | "vertical";

/** Shared surface vocabulary used by containers throughout Noor UI. */
export type SurfaceVariant = "solid" | "tonal" | "material" | "elevated";

export type OverlaySurfaceVariant = "auto" | SurfaceVariant;
