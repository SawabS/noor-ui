import type { OverlaySurfaceVariant, SurfaceVariant } from "../foundations/types";

const surfaceClassNames: Record<SurfaceVariant, string> = {
  solid: "bg-surface",
  tonal: "bg-surface-tonal",
  material: "n-material",
  elevated: "bg-surface-elevated shadow-md",
};

export function getSurfaceClassName(surface: SurfaceVariant): string {
  return surfaceClassNames[surface];
}

export function getOverlaySurfaceClassName(surface: OverlaySurfaceVariant): string {
  return surface === "auto" ? "n-surface-auto bg-surface" : getSurfaceClassName(surface);
}
