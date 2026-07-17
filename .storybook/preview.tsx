import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";
import "../src/tokens/build-entry.css";
import { ThemeProvider } from "../src/providers/theme-provider";
import { DirectionProvider } from "../src/providers/direction-provider";

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
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
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
  },
  decorators: [
    (Story, context) => {
      const { theme, direction } = context.globals;
      useEffect(() => {
        document.body.style.margin = "0";
      }, []);
      return (
        <ThemeProvider theme={theme} scope="scoped">
          <DirectionProvider direction={direction} applyToDocument={false}>
            <div
              dir={direction}
              className="bg-canvas text-text-primary font-sans min-h-screen"
              style={{ padding: "1.5rem" }}
            >
              <Story />
            </div>
          </DirectionProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
