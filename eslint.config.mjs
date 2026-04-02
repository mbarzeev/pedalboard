import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import pedalboardCraftsmanlint from "@pedalboard/eslint-plugin-craftsmanlint";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import react from "eslint-plugin-react";

export default defineConfig([
    js.configs.recommended,
    react.configs.flat.recommended,
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
            "@pedalboard/craftsmanlint": pedalboardCraftsmanlint,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                describe: true,
                it: true,
                expect: true,
                jest: true,
                beforeAll: true,
                beforeEach: true,
                process: true,
            },

            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: "module",
        },

        settings: {
            react: {
                version: "18.0",
            },
        },

        rules: {
            "@pedalboard/craftsmanlint/no-namespace-imports": ["error"],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "error",
        },
    },
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    },
]);
