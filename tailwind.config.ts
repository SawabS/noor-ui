import type { Config } from "tailwindcss";

/**
 * Tailwind is used purely as a utility engine here. All color, radius,
 * spacing, shadow, and motion values resolve to the semantic CSS custom
 * properties defined in src/tokens/*.css so theme switching (light/dark)
 * and future retheming never require touching component files.
 */
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        canvas: "var(--n-canvas)",
        sidebar: "var(--n-sidebar)",
        surface: {
          DEFAULT: "var(--n-surface)",
          raised: "var(--n-surface-raised)",
          hover: "var(--n-surface-hover)",
          active: "var(--n-surface-active)",
        },
        text: {
          primary: "var(--n-text-primary)",
          secondary: "var(--n-text-secondary)",
          muted: "var(--n-text-muted)",
        },
        border: {
          DEFAULT: "var(--n-border)",
          strong: "var(--n-border-strong)",
        },
        primary: {
          action: "var(--n-primary-action)",
          "action-text": "var(--n-primary-action-text)",
        },
        "focus-ring": "var(--n-focus-ring)",
        success: {
          DEFAULT: "var(--n-success)",
          bg: "var(--n-success-bg)",
        },
        warning: {
          DEFAULT: "var(--n-warning)",
          bg: "var(--n-warning-bg)",
        },
        danger: {
          DEFAULT: "var(--n-danger)",
          bg: "var(--n-danger-bg)",
        },
        info: {
          DEFAULT: "var(--n-info)",
          bg: "var(--n-info-bg)",
        },
      },
      fontFamily: {
        sans: "var(--n-font-sans)",
        mono: "var(--n-font-mono)",
      },
      fontSize: {
        caption: ["var(--n-text-caption-size)", { lineHeight: "var(--n-text-caption-line)" }],
        label: ["var(--n-text-label-size)", { lineHeight: "var(--n-text-label-line)" }],
        "body-sm": ["var(--n-text-body-sm-size)", { lineHeight: "var(--n-text-body-sm-line)" }],
        body: ["var(--n-text-body-size)", { lineHeight: "var(--n-text-body-line)" }],
        "body-lg": ["var(--n-text-body-lg-size)", { lineHeight: "var(--n-text-body-lg-line)" }],
        "heading-sm": ["var(--n-text-heading-sm-size)", { lineHeight: "var(--n-text-heading-sm-line)" }],
        "heading-md": ["var(--n-text-heading-md-size)", { lineHeight: "var(--n-text-heading-md-line)" }],
        "heading-lg": ["var(--n-text-heading-lg-size)", { lineHeight: "var(--n-text-heading-lg-line)" }],
        display: ["var(--n-text-display-size)", { lineHeight: "var(--n-text-display-line)" }],
      },
      fontWeight: {
        regular: "var(--n-weight-regular)",
        medium: "var(--n-weight-medium)",
        semibold: "var(--n-weight-semibold)",
        bold: "var(--n-weight-bold)",
      },
      spacing: {
        "0.5": "var(--n-space-0-5)",
        "1": "var(--n-space-1)",
        "1.5": "var(--n-space-1-5)",
        "2": "var(--n-space-2)",
        "3": "var(--n-space-3)",
        "4": "var(--n-space-4)",
        "5": "var(--n-space-5)",
        "6": "var(--n-space-6)",
        "8": "var(--n-space-8)",
        "10": "var(--n-space-10)",
        "12": "var(--n-space-12)",
        "16": "var(--n-space-16)",
        "20": "var(--n-space-20)",
        "24": "var(--n-space-24)",
        "control-sm": "var(--n-control-height-sm)",
        "control-md": "var(--n-control-height-md)",
        "control-lg": "var(--n-control-height-lg)",
      },
      maxWidth: {
        "content-sm": "var(--n-content-sm)",
        "content-md": "var(--n-content-md)",
        "content-lg": "var(--n-content-lg)",
        "content-xl": "var(--n-content-xl)",
      },
      borderRadius: {
        xs: "var(--n-radius-xs)",
        sm: "var(--n-radius-sm)",
        md: "var(--n-radius-md)",
        lg: "var(--n-radius-lg)",
        xl: "var(--n-radius-xl)",
        pill: "var(--n-radius-pill)",
      },
      borderWidth: {
        DEFAULT: "var(--n-border-width-default)",
        "0": "0",
        "2": "var(--n-border-width-thick)",
      },
      boxShadow: {
        xs: "var(--n-shadow-xs)",
        sm: "var(--n-shadow-sm)",
        md: "var(--n-shadow-md)",
        lg: "var(--n-shadow-lg)",
        none: "none",
      },
      opacity: {
        disabled: "var(--n-opacity-disabled)",
        muted: "var(--n-opacity-muted)",
      },
      transitionDuration: {
        instant: "var(--n-duration-instant)",
        fast: "var(--n-duration-fast)",
        base: "var(--n-duration-base)",
        slow: "var(--n-duration-slow)",
      },
      transitionTimingFunction: {
        standard: "var(--n-ease-standard)",
        enter: "var(--n-ease-enter)",
        exit: "var(--n-ease-exit)",
      },
      zIndex: {
        dropdown: "var(--n-z-dropdown)",
        sticky: "var(--n-z-sticky)",
        overlay: "var(--n-z-overlay)",
        modal: "var(--n-z-modal)",
        popover: "var(--n-z-popover)",
        toast: "var(--n-z-toast)",
        tooltip: "var(--n-z-tooltip)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-out": { from: { opacity: "1" }, to: { opacity: "0" } },
        "slide-in-from-bottom": {
          from: { transform: "translateY(8px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "drawer-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "drawer-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "drawer-in-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "drawer-in-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down var(--n-duration-base) var(--n-ease-standard)",
        "accordion-up": "accordion-up var(--n-duration-base) var(--n-ease-standard)",
        "fade-in": "fade-in var(--n-duration-fast) var(--n-ease-enter)",
        "fade-out": "fade-out var(--n-duration-fast) var(--n-ease-exit)",
        "slide-in-from-bottom": "slide-in-from-bottom var(--n-duration-base) var(--n-ease-enter)",
        "pulse-soft": "pulse-soft 1.6s var(--n-ease-standard) infinite",
        "drawer-in-left": "drawer-in-left var(--n-duration-slow) var(--n-ease-enter)",
        "drawer-in-right": "drawer-in-right var(--n-duration-slow) var(--n-ease-enter)",
        "drawer-in-top": "drawer-in-top var(--n-duration-slow) var(--n-ease-enter)",
        "drawer-in-bottom": "drawer-in-bottom var(--n-duration-slow) var(--n-ease-enter)",
      },
    },
  },
  plugins: [],
};

export default config;
