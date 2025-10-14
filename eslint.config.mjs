import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-console": ["warn", { "allow": ["warn", "error"] }],
    },
  },
];
