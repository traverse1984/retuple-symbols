import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = compat.config({
  env: { esnext: true, node: true },
  extends: ["plugin:prettier/recommended"],
  plugins: ["prettier", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "test/tsconfig.json"],
    sourceType: "module",
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": "error",
    "prettier/prettier": "error",
  },
  ignorePatterns: ["dist", "coverage", "node_modules", "eslint.config.mjs"],
});

export default eslintConfig;
