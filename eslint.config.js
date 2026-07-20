import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  {
    ignores: [
      '.next/**',
      'build/**',
      'dist/**',
      'coverage/**',
      'node_modules/**',
      'public/**',
      '*.css',
      '*.min.js',
    ],
  },

  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
    ],

    parser: '@typescript-eslint/parser',

    plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort'],

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      /* ---------- General ---------- */

      'no-console': 'warn',

      /* ---------- React ---------- */

      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',

      /* ---------- TS ---------- */

      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      /* ---------- Imports ---------- */

      'unused-imports/no-unused-imports': 'warn',

      'simple-import-sort/imports': 'warn',

      'simple-import-sort/exports': 'warn',
    },
  }),
];
