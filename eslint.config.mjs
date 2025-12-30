import js from "@eslint/js";
import globals from "globals";

export default [
    { 
        ignores: ["node_modules/", "build/", "temp.js", "coverage/", "package-lock.json", "tmp/"] 
    },
    
    js.configs.recommended,
    {
        files: ["**/*.js", "**/*.mjs", "**/*.cjs"], 
        languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
            console: "readonly" 
        }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn"
        }
    }
];