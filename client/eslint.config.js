import globals from 'globals';
import pluginJs from '@eslint/js';
import tselint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  { settings: { react: { version: '18.2.0' } } },
  pluginJs.configs.recommended,
  ...tselint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {},
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off"
    }

  }
];
