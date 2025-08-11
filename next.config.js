import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      "react/no-unescaped-entities": "off",           // Disable unescaped entity errors
      "@next/next/no-page-custom-font": "off",        // Example: disable custom font warning if you want
      "@typescript-eslint/no-explicit-any": "off",    // Disable 'any' usage error (only if you want)
    },
  },
];

export default eslintConfig;
