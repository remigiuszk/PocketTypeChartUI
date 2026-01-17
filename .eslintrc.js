module.exports = {
  root: true,
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "unused-imports"
  ],
  rules: {
    // Automatyczny porządek importów
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    // Usuwanie nieużywanych importów
    "unused-imports/no-unused-imports": "error",

    // Nie krzycz o nieużywanych zmiennych jeśli zaczynają się od _
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],

    // Expo / RN nie potrzebuje React importu w JSX
    "react/react-in-jsx-scope": "off"
  }
};
