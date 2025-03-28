const js = require("@eslint/js");
const globals = require("globals");

module.exports = {
  ...js.configs.recommended,
  ignores: [
    "**/*.min.js",
    "dist/**",
    "**/*.config.js",
    "node_modules/**",
    "package*.json",
  ],
  files: ["**/*.js", "**/*.json"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
    },
  },
  rules: {
    "no-undef": "off",
    "no-unused-vars": "off",
    indent: ["error", 2],
    semi: ["error", "always"],
  },
};
