module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'avoid',
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports'
  ],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^react$',
    '^@/(.*)$',
    '^../(.*)$',
    '^./(.*)$'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
