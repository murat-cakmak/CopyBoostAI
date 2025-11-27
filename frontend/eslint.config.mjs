import nextPlugin from "eslint-plugin-next";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["node_modules/**", ".next/**", "dist/**"]
  },
  {
    files: ["**/*.{ts,tsx}"]
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}", "app/**/*.{js,jsx,ts,tsx}", "components/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      next: nextPlugin
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules
    }
  }
];
