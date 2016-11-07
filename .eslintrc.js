// @flow
module.exports = {
  env: {
    browser: true,
    meteor: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:meteor/recommended',
  ],
  parser: 'babel-eslint',
  plugins: [
    'meteor',
    'no-use-extend-native',
    'prefer-object-spread',
  ],
  rules: {
    'import/extensions': ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': ['error',
      {
        ignore: ['^meteor/'],
      },
    ],
    'max-params': ['warn', 1],
    'no-use-extend-native/no-use-extend-native': 'error',
    'prefer-object-spread/prefer-object-spread': 'error',
    'sort-keys': 'warn',
    'sort-vars': 'warn',
  },
};
