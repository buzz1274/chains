import { globalIgnores } from 'eslint/config'
import {
  defineConfigWithVueTs,
  vueTsConfigs
} from '@vue/eslint-config-typescript'
import unicorn from 'eslint-plugin-unicorn'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import importPlugin from 'eslint-plugin-import'
import { configureVueProject } from '@vue/eslint-config-typescript'
configureVueProject({ scriptLangs: ['ts', 'tsx', 'js', 'jsx'] })

export default defineConfigWithVueTs(
  {
    name: 'treadmilltracker',
    files: ['src/**/*.{ts,mts,tsx,vue,js,json,html,yaml}'],
    languageOptions: {parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: false,
      },
    }},
  },

  globalIgnores(
    [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/volt/**',
      'node_modules/',
      '**/public/**'
    ]
  ),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,
  skipFormatting,

  {
    plugins: {
      import: importPlugin, unicorn
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'pascalCase',
          ignore: [
            '^env\\.d\\.ts$',
            '^eslint\\.config\\.js$',
            '^vite\\.config\\.ts$',
          ],
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: true,
          },
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          custom: {
            regex: '^T([A-Z][a-zA-Z0-9]*)?$',
            match: true,
          },
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
      'no-var': 'error',
      'prefer-const': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',

      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': 'error',
      'vue/no-mutating-props': 'error',
      'vue/no-unused-refs': 'error',
      'vue/no-ref-as-operand': 'error',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
        },
      ],

      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],

      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': 'error',

      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',

      'no-param-reassign': ['error', { props: true }],
      'no-plusplus': 'off',

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-empty-function': 'warn',

      'max-len': [
        'error',
        {
          code: 80,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: false,
        },
      ],
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'max-len': 'off',
      'vue/max-len': ['error', {
        code: 80,
        template: 80,
        ignoreHTMLAttributeValues: true,
      }],
    },
  }
)
