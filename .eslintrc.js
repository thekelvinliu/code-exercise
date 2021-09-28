module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  globals: { fetch: 'readonly' },
  parserOptions: { ecmaVersion: 2021 },
  rules: {
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off'
  }
};
