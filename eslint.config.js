const { defineConfig } = require("eslint/config");

const { fixupConfigRules, fixupPluginRules } = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const unusedImports = require("eslint-plugin-unused-imports");
const reactPlugin = require("eslint-plugin-react"); // <-- NOWE
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
        "expo",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended", // <-- NOWE (zalecane reguły React)
        "prettier",
      ),
    ),

    languageOptions: {
      parser: tsParser,
    },

    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      react: fixupPluginRules(reactPlugin), // <-- NOWE
    },

    rules: {
      // importy + sprzątanie
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // RN/Expo
      "react/react-in-jsx-scope": "off",

      // ✅ 1) Komponenty mają być arrow-function (export const X = () => {})
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],

      // ✅ 2) Funkcje (nie-komponenty) mają być function declaration
      // Uwaga: to będzie zgłaszać błąd na: const test = () => {}
      // Ale dalej pozwala na arrow-func komponentów dzięki regule powyżej.
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
