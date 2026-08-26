/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  env: { browser: true, es2022: true, node: true },
  ignorePatterns: ["dist", "storybook-static", "node_modules", "*.config.*"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "jsx-a11y/no-autofocus": "off",
    /**
     * Physical inset/spacing utilities do not mirror under RTL. A toast pinned
     * with `right-5` stayed bottom-right in Arabic and Sorani; the logical
     * `end-5` follows the writing direction for free. Same for the padding,
     * margin, border-side, text-align and inset families.
     *
     * Radix `side="left" | "right"` props are untouched by this rule — those
     * really are physical placements and are mirrored by Radix itself.
     */
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "Literal[value=/(^| )(-?(left|right)-(\\d|\\[|full|auto|px)|p[lr]-|m[lr]-|border-[lr](-| |$)|rounded-[lr](-| |$)|text-(left|right)( |$))/]",
        message:
          "Use the logical equivalent (start/end, ps/pe, ms/me, border-s/border-e, text-start/text-end) so the layout mirrors under RTL.",
      },
      {
        selector:
          "TemplateElement[value.raw=/(^| )(-?(left|right)-(\\d|\\[|full|auto|px)|p[lr]-|m[lr]-|border-[lr](-| |$)|rounded-[lr](-| |$)|text-(left|right)( |$))/]",
        message:
          "Use the logical equivalent (start/end, ps/pe, ms/me, border-s/border-e, text-start/text-end) so the layout mirrors under RTL.",
      },
    ],
  },
  overrides: [
    {
      // Stories and tests may name physical directions deliberately, e.g. to
      // assert that an RTL layout actually mirrored.
      files: ["**/*.stories.tsx", "**/*.test.ts", "**/*.test.tsx"],
      rules: { "no-restricted-syntax": "off" },
    },
  ],
};
