module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
      },
    ],
    'newline-before-return': 'warn',
    'no-multi-spaces': 'warn',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
      { blankLine: 'never', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: 'multiline-const'  },
    ],
  },
};
