import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { js }, 
    languageOptions: { globals: globals.browser },
    rules: {
      'react/react-in-jsx-scope': 'off', 
      'react/prop-types': 'warn',
      'no-alert': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-props-no-spreading': 'off',
      'max-len': 'off', 
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'no-param-reassign': 'off',
      'react/forbid-prop-types': 'off'
    }
  },
  pluginReact.configs.flat.recommended,
]);

