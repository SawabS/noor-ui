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
  dangerContrast: "--n-danger-contrast",
  info: "--n-info",
} as const;

export const appearanceTokens = {
  atmosphereCanvas: "--n-atmosphere-canvas",
  atmosphereGlow: "--n-atmosphere-glow",
  atmosphereGrid: "--n-atmosphere-grid",
  accentFocal: "--n-accent-focal",
  accentFocalText: "--n-accent-focal-text",
  accentGlow: "--n-accent-glow",
  surfaceTonal: "--n-surface-tonal",
  surfaceElevated: "--n-surface-elevated",
  materialFallback: "--n-material-fallback",
  materialFill: "--n-material-fill",
  materialFillStrong: "--n-material-fill-strong",
  materialBorder: "--n-material-border",
  materialHighlight: "--n-material-highlight",
  materialBlur: "--n-material-blur",
  materialBlurStrong: "--n-material-blur-strong",
  materialSaturation: "--n-material-saturation",
} as const;

export const lumenValues = {
  light: {
    canvas: "#F5F8FC",
    tonal: "#EEF3F9",
    materialFallback: "#F8FAFD",
    materialFill: "rgb(255 255 255 / 0.76)",
    focalAccent: "#1468D8",
    glow: "rgb(44 123 255 / 0.18)",
  },
  dark: {
    canvas: "#080B12",
    tonal: "#101722",
    materialFallback: "#121A25",
    materialFill: "rgb(15 23 35 / 0.72)",
    focalAccent: "#70AEFF",
    glow: "rgb(47 134 255 / 0.28)",
  },
  material: {
    blur: "20px",
    blurStrong: "28px",
    saturation: "125%",
  },
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
  "github-light": {
    canvas: "#FFFFFF",
    sidebar: "#F6F8FA",
    surface: "#FFFFFF",
    surfaceRaised: "#F6F8FA",
    surfaceHover: "#EFF2F5",
    surfaceActive: "#E7ECF0",
    textPrimary: "#1F2328",
    textSecondary: "#59636E",
    textMuted: "#6E7781",
    border: "#D1D9E0",
    borderStrong: "#818B98",
    primaryAction: "#1F883D",
    primaryActionText: "#FFFFFF",
    focusRing: "#0969DA",
  },
  "github-dark": {
    canvas: "#0D1117",
    sidebar: "#010409",
    surface: "#161B22",
    surfaceRaised: "#21262D",
    surfaceHover: "#292E36",
    surfaceActive: "#30363D",
    textPrimary: "#E6EDF3",
    textSecondary: "#8B949E",
    textMuted: "#7D8590",
    border: "#30363D",
    borderStrong: "#484F58",
    primaryAction: "#238636",
    primaryActionText: "#FFFFFF",
    focusRing: "#1F6FEB",
  },
  dracula: {
    canvas: "#282A36",
    sidebar: "#21222C",
    surface: "#2D303E",
    surfaceRaised: "#383B4C",
    surfaceHover: "#44475A",
    surfaceActive: "#50546A",
    textPrimary: "#F8F8F2",
    textSecondary: "#C9C9C2",
    textMuted: "#9AA7CF",
    border: "#44475A",
    borderStrong: "#6272A4",
    primaryAction: "#BD93F9",
    primaryActionText: "#282A36",
    focusRing: "#8BE9FD",
  },
  "one-dark-pro": {
    canvas: "#282C34",
    sidebar: "#21252B",
    surface: "#2C313A",
    surfaceRaised: "#353B45",
    surfaceHover: "#3E4451",
    surfaceActive: "#4B5263",
    textPrimary: "#ABB2BF",
    textSecondary: "#9DA5B4",
    textMuted: "#8C93A2",
    border: "#3E4451",
    borderStrong: "#5C6370",
    primaryAction: "#61AFEF",
    primaryActionText: "#21252B",
    focusRing: "#61AFEF",
  },
  nord: {
    canvas: "#2E3440",
    sidebar: "#292E39",
    surface: "#3B4252",
    surfaceRaised: "#434C5E",
    surfaceHover: "#4C566A",
    surfaceActive: "#56647A",
    textPrimary: "#ECEFF4",
    textSecondary: "#D8DEE9",
    textMuted: "#AEB8C8",
    border: "#4C566A",
    borderStrong: "#69778F",
    primaryAction: "#88C0D0",
    primaryActionText: "#2E3440",
    focusRing: "#88C0D0",
  },
  "catppuccin-mocha": {
    canvas: "#1E1E2E",
    sidebar: "#181825",
    surface: "#24243A",
    surfaceRaised: "#313244",
    surfaceHover: "#45475A",
    surfaceActive: "#585B70",
    textPrimary: "#CDD6F4",
    textSecondary: "#BAC2DE",
    textMuted: "#9399B2",
    border: "#45475A",
    borderStrong: "#6C7086",
    primaryAction: "#CBA6F7",
    primaryActionText: "#1E1E2E",
    focusRing: "#89B4FA",
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

export const motionDistances = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  stagger: "40ms",
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

export const componentDimensions = {
  composerMaxHeight: "15rem",
  artifactPanelWidth: "32rem",
  atmosphereGridSize: "2rem",
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
