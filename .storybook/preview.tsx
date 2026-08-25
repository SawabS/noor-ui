import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";
import "../src/tokens/build-entry.css";
import { ThemeProvider, themeOptions } from "../src/providers/theme-provider";
import { DirectionProvider } from "../src/providers/direction-provider";
import { AppearanceProvider } from "../src/providers/appearance-provider";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
    layout: "fullscreen",
    a11y: { test: "todo" },
  },
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: themeOptions.map(({ value, label }) => ({ value, title: label })),
        dynamicTitle: true,
      },
    },
    direction: {
      description: "Direction",
      defaultValue: "ltr",
      toolbar: {
        title: "Direction",
        icon: "arrowleftright",
        items: [
          { value: "ltr", title: "LTR" },
          { value: "rtl", title: "RTL (Arabic/Kurdish)" },
        ],
        dynamicTitle: true,
      },
    },
    appearance: {
      description: "Appearance profile",
      defaultValue: "default",
      toolbar: {
        title: "Appearance",
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default Noor" },
          { value: "lumen", title: "Noor Lumen" },
        ],
        dynamicTitle: true,
      },
    },
    transparency: {
      description: "Transparency preference",
      defaultValue: "system",
      toolbar: {
        title: "Transparency",
        icon: "contrast",
        items: [
          { value: "system", title: "System preference" },
          { value: "reduce", title: "Reduce transparency" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme, direction, appearance, transparency } = context.globals;
      useEffect(() => {
        document.body.style.margin = "0";
      }, []);
      return (
        <ThemeProvider theme={theme} scope="scoped">
          <AppearanceProvider appearance={appearance} transparency={transparency} scope="scoped">
            <DirectionProvider direction={direction} applyToDocument={false}>
              <div
                dir={direction}
                className="min-h-screen bg-canvas p-6 font-sans text-text-primary"
              >
                <Story />
              </div>
            </DirectionProvider>
          </AppearanceProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
