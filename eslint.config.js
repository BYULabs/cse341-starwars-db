import pluginJs from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/", "dist/"]
  },

  // Backend / Server-side Node code
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": "off"
    }
  },

  // Frontend / Client-side Browser code
  {
    files: ["public/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser // Enables document, window, fetch, etc.
      }
    }
  }
];