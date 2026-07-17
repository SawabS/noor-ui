/**
 * Programmatic mirror of the CSS custom properties in ./*.css.
 * This is the statically-discoverable token manifest — CSS remains the
 * runtime source of truth, this object exists so tooling (Storybook's
 * showcase page, Claude Design's /design-sync) can enumerate tokens
 * without parsing stylesheets.
 */

export const colorTokens = {
  canvas: "--n-canvas",
  sidebar: "--n-sidebar",
  surface: "--n-surface",
  surfaceRaised: "--n-surface-raised",
  surfaceHover: "--n-surface-hover",
  surfaceActive: "--n-surface-active",
  textPrimary: "--n-text-primary",
  textSecondary: "--n-text-secondary",
  textMuted: "--n-text-muted",
  border: "--n-border",
  borderStrong: "--n-border-strong",
  primaryAction: "--n-primary-action",
  primaryActionText: "--n-primary-action-text",
  focusRing: "--n-focus-ring",
  success: "--n-success",
  warning: "--n-warning",
  danger: "--n-danger",
  info: "--n-info",
} as const;

export const themeValues = {
  light: {
    canvas: "#FFFFFF",
    sidebar: "#F7F7F7",
    surface: "#FFFFFF",
    surfaceRaised: "#F4F4F4",
    surfaceHover: "#EEEEEE",
    surfaceActive: "#E7E7E7",
    textPrimary: "#171717",
    textSecondary: "#666666",
    textMuted: "#929292",
    border: "#E5E5E5",
    borderStrong: "#D4D4D4",
    primaryAction: "#171717",
    primaryActionText: "#FFFFFF",
    focusRing: "#737373",
  },
  dark: {
    canvas: "#0D0D0D",
    sidebar: "#151515",
    surface: "#191919",
    surfaceRaised: "#202020",
    surfaceHover: "#292929",
    surfaceActive: "#303030",
    textPrimary: "#F2F2F2",
    textSecondary: "#A3A3A3",
    textMuted: "#707070",
    border: "#303030",
    borderStrong: "#424242",
    primaryAction: "#F2F2F2",
    primaryActionText: "#111111",
    focusRing: "#A3A3A3",
  },
} as const;

export const supportingColors = {
  success: "#16A36A",
  warning: "#D98B18",
  danger: "#DC4C4C",
  info: "#4385F5",
} as const;

export const typeScale = [
  "caption",
  "label",
  "body-sm",
  "body",
  "body-lg",
  "heading-sm",
  "heading-md",
  "heading-lg",
  "display",
] as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const spacingScale = [
  "0.5",
  "1",
  "1.5",
  "2",
  "3",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
  "16",
  "20",
  "24",
] as const;

export const radiiScale = {
  xs: "6px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  pill: "9999px",
} as const;

export const shadowScale = ["xs", "sm", "md", "lg"] as const;

export const motionDurations = {
  instant: "80ms",
  fast: "120ms",
  base: "180ms",
  slow: "260ms",
} as const;

export const zIndexLayers = {
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
} as const;

export const controlHeights = {
  sm: "32px",
  md: "40px",
  lg: "48px",
} as const;

export const contentWidths = {
  sm: "640px",
  md: "768px",
  lg: "896px",
  xl: "1152px",
} as const;

export const breakpoints = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export type ThemeName = keyof typeof themeValues;
