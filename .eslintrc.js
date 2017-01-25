// @flow
module.exports = {
  env: {
    browser: true,
    es6: true,
    meteor: true,
    node: true,
    'shared-node-browser': true,
  },
  extends: [
    'airbnb-base',
    'plugin:meteor/recommended',
  ],
  parser: 'babel-eslint',
  plugins: [
    'meteor',
    'no-unused-vars-rest',
    'no-use-extend-native',
    'prefer-object-spread',
  ],
  rules: {
    'import/extensions': ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': ['error', {
      ignore: ['^meteor/'],
    }],
    'max-len': ['error', 120, 2, {
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
    }],
    'max-params': ['warn', 1],
    'no-param-reassign': ['warn', {
      props: true,
    }],
    'no-unused-vars': 'off',
    'no-unused-vars-rest/no-unused-vars': ['error', {
      ignoreDestructuredVarsWithRest: true,
    }],
    'no-use-extend-native/no-use-extend-native': 'error',
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: true,
    }],
    'prefer-object-spread/prefer-object-spread': 'error',
    'sort-keys': 'warn',
    'sort-vars': 'warn',
  },
};
