import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended, // base JS rules

  {
    files: ["**/*.js"], // only JS files
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-use-before-define": "error",
      "no-unused-vars": "warn",
      "no-dupe-keys": "error",
      "no-constant-condition": "warn",
      "no-unreachable": "warn",
      semi: ["error", "always"],
    },
  },
]);
