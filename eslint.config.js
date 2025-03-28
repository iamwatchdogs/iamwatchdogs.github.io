const js = require("@eslint/js");
const globals = require("globals");
const eslintConfigPrettier = require("eslint-config-prettier/flat");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  {
    ignores: [
      "**/dist/**",
      "**/config/**",
      "**/node_modules/**",
      "**/*.min.js",
      "**/*.config.js",
      "**/package*.json",
      "package-lock.json",
      ".prettierrc"
    ]
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      }
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      "no-undef": "warn",
      "no-unused-vars": "warn",
      indent: ["error", 2],
      semi: ["error", "always"],
    },
  },
  {
    files: ["**/webpack*.js", "**/config/*.js"],
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly"
      },
      sourceType: "commonjs"
    },
    rules: {
      "no-undef": "off"
    }
  }
];