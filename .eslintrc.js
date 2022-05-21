module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "react-hooks",
    "babel",
    "import",
    "jsx-a11y",
    "react",
    "prettier",
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    "plugin:react/recommended",
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
    "react": {
      pragma: "React",
      version: "detect",
    }
  },
  rules: {
    // prettier
    'arrow-parens': 'off', // Несовместимо с prettier
    'object-curly-newline': 'off', // Несовместимо с prettier
    'no-mixed-operators': 'off', // Несовместимо с prettier
    'function-paren-newline': 'off', // Несовместимо с prettier
    'space-before-function-paren': 0, // Несовместимо с prettier

    'prettier/prettier': ['error'],

    'arrow-body-style': 'off',
    'no-plusplus': 'off',

    // react
    "react/prop-types": "off",
    "react/function-component-definition": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",

    '@typescript-eslint/dot-notation': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      // Allow camelCase functions (23.2), and PascalCase functions (23.8)
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
      {
        selector: 'typeLike',
        format: ['PascalCase', 'UPPER_CASE'],
      },
    ],
    "no-param-reassign": "off",
    "class-methods-use-this": "off",

    // import
    "import/prefer-default-export": "off",
    "import/no-unused-modules": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-floating-promises": "off",

  },
};
