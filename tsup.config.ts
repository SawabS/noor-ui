import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "providers/index": "src/providers/index.ts",
    "tokens/index": "src/tokens/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  // Code splitting is required, not cosmetic: "noor-ui" and
  // "noor-ui/providers" both pull in the provider modules (ThemeToggle and
  // ThemePicker call useTheme). Without a shared chunk each entry inlines its
  // own React context, so the documented setup — ThemeProvider from
  // "noor-ui/providers", ThemeToggle from "noor-ui" — throws
  // "useTheme must be used within a ThemeProvider".
  splitting: true,
  treeshake: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
