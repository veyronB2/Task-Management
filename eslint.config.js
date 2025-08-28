import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

const eslintConfig = tseslint.config(
    {
        ignores: ["dist/*"],
        extends: [
            js.configs.recommended,
            react.configs.flat.recommended,
            ...tseslint.configs.recommended
        ],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        settings: {
            react: {
                version: "detect"
            }
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "@stylistic": stylistic
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "@stylistic/comma-dangle": ["error", "only-multiline"],
            "@stylistic/comma-spacing": ["error", { "before": false, "after": true }],
            "@stylistic/eol-last": ["error", "always"],
            "@stylistic/function-call-spacing": ["error", "never"],
            "@stylistic/indent": [
                "error",
                4,
                { SwitchCase: 1}
            ],
            "@stylistic/jsx-curly-spacing": [2, "never"],
            "@stylistic/jsx-pascal-case": ["error", {}],
            "@stylistic/jsx-quotes": ["error", "prefer-double"],
            "@stylistic/jsx-tag-spacing": ["error", {
                "closingSlash": "never",
                "beforeSelfClosing": "always",
                "afterOpening": "never",
                "beforeClosing": "never"
            }],
            "@stylistic/key-spacing": ["error", { "beforeColon": false }],
            "@stylistic/keyword-spacing": "error",
            "@stylistic/max-len": ["error", {
                "code": 150,
                "tabWidth": 4,
                "ignoreUrls": true,
                "ignoreStrings": true,
                "ignoreTemplateLiterals": true,
                "ignoreComments": true
            }],
            "@stylistic/member-delimiter-style": "error",
            "@stylistic/no-multi-spaces": "error",
            "@stylistic/no-trailing-spaces": "error",
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/space-before-function-paren": ["error", {
                "anonymous": "never",
                "named": "never",
                "asyncArrow": "always",
            }],
            "@stylistic/type-annotation-spacing": "error",
            "@typescript-eslint/explicit-function-return-type": ["off", {
                allowExpressions: true,
            }],
            "@typescript-eslint/no-explicit-any": ["off"],
            "array-callback-return": "error",
            "no-console": ["warn", {
                "allow": ["warn", "error"]
            }],
            "no-duplicate-imports": "error",
            "no-extra-boolean-cast": "off",
            "no-self-compare": "error",
            "no-throw-literal": "error",
            "react-hooks/exhaustive-deps": "error",
            "react-hooks/rules-of-hooks": "error",
            "react/display-name": "off",
            "react/react-in-jsx-scope": "off",
            "react-refresh/only-export-components": ["warn", {
                allowConstantExport: true
            }],
            "react/self-closing-comp": ["error", {
                "component": true,
                "html": true
            }],
            "sort-imports": ["error", {
                "ignoreCase": false,
                "ignoreDeclarationSort": false,
                "ignoreMemberSort": false,
                "memberSyntaxSortOrder": [
                    "none",
                    "all",
                    "multiple",
                    "single"
                ]
            }],
        },
    },
);

export default eslintConfig