const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json')
  },
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'react'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  env: {
    browser: true,
    node: true
  },
  rules: {
    indent: [
      'error',
      'tab',
      {
        SwitchCase: 1
      }
    ],
    '@typescript-eslint/indent': [
      'error',
      'tab',
      {
        SwitchCase: 1
      }
    ],
    'react/jsx-indent': ['error', 'tab'],
    'react/jsx-indent-props': ['error', 'tab'],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] }
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-tabs': 0,
    'no-undef': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 0,
    'arrow-parens': 0
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['**/*.spec.{ts,tsx}'],
      env: {
        jest: true
      },
      plugins: ['jest'],
      rules: {
        'no-unused-expressions': 0,
        'import/no-extraneous-dependencies': 0
      },
      globals: {
        fetchMock: true
      }
    },
    {
      files: ['**/*.stories.{ts,tsx}'],
      rules: {
        'import/no-extraneous-dependencies': 0
      }
    }
  ]
}
