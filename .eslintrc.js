module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: { ecmaVersion: 8 }, // to enable features such as async/await
  ignorePatterns: [
    'node_modules/*',
    '.next/*',
    '.out/*',
    '!.prettierrc.js',
    '*.min.js'
  ], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  plugins: ['promise', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:react/recommended', // React rules
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:jsx-a11y/recommended', // Accessibility rules
    'plugin:prettier/recommended', // Prettier plugin,
    'next/core-web-vitals'
  ],
  globals: {
    JSX: 'readonly',
    globalThis: 'readonly',
    NodeJS: 'readonly',
    google: 'readonly',
    window: true,
    cloudinary: 'readonly',
    IntersectionObserverCallback: true,
    IntersectionObserverInit: true,
    MutationCallback: true,
    jest: true
  },
  rules: {
    'comma-dangle': 'error',
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true }
    ],
    curly: ['error', 'multi-line'],
    'no-await-in-loop': 'error',
    'no-constant-binary-expression': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    '@next/next/no-html-link-for-pages': ['error', 'apps/customer/src/pages/'],
    'import/no-default-export': 'error',
    'import/no-unresolved': 'off',
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/export': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'type',
          'internal',
          ['parent', 'sibling', 'index'],
          'object'
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '+(!{src/**,@ui/**,ui,.,./**,../**})',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '{@ui/*(!(types)),@ui/*(!(types))/**/*}',
            group: 'type',
            position: 'after'
          },
          {
            pattern: 'src/**',
            group: 'type',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        distinctGroup: true
      }
    ],
    eqeqeq: ['error', 'always'],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
    // We will use TypeScript's types for component props instead
    'react/prop-types': 'off',
    // No need to import React when using Next.js
    'react/react-in-jsx-scope': 'off',
    // This rule is not compatible with Next.js's <Link /> components
    'jsx-a11y/anchor-is-valid': 'off',
    // Why would you want unused vars?
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    // I suggest this setting for requiring return types on functions only where useful
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true
      }
    ],
    '@typescript-eslint/no-empty-function': 'warn',
    'no-constant-condition': [
      'error',
      {
        checkLoops: true
      }
    ],
    'no-unsafe-finally': 'error',
    'dot-notation': [
      'error',
      {
        allowKeywords: true,
        allowPattern: ''
      }
    ],
    'guard-for-in': 'off',
    'no-eq-null': 'error',
    'no-fallthrough': [
      'warn',
      {
        commentPattern: ''
      }
    ],
    'no-floating-decimal': 'warn',
    'no-implicit-coercion': [
      'error',
      {
        boolean: false,
        number: false,
        string: true
      }
    ],
    'no-labels': 'error',
    'no-magic-numbers': [
      'warn',
      {
        detectObjects: false,
        enforceConst: false,
        ignoreArrayIndexes: true,
        ignore: [0, 1, 100]
      }
    ],
    'no-implicit-globals': 'error',
    'no-param-reassign': 'error',
    'no-useless-catch': 'error',
    'no-useless-concat': 'warn',
    'no-useless-escape': 'warn',
    'no-useless-return': 'error',
    'no-shadow': [
      'warn',
      {
        builtinGlobals: false,
        hoist: 'functions'
      }
    ],
    'no-undef': [
      'error',
      {
        typeof: false
      }
    ],

    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '',
        caughtErrors: 'none',
        caughtErrorsIgnorePattern: ''
      }
    ],
    'prefer-arrow-callback': [
      'warn',
      {
        allowNamedFunctions: false,
        allowUnboundThis: false
      }
    ],
    'prefer-const': [
      'warn',
      {
        ignoreReadBeforeAssign: false,
        destructuring: 'any'
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: true,
          object: true
        },
        AssignmentExpression: {
          array: true,
          object: false
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ]
  },
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          node: {
            extensions: ['.js', '.ts', '.d.ts', '.tsx']
          }
          // alias: {
          //   map: [['src/services', path.join(__dirname, 'src/services')]]
          // }
        },
        'import/core-modules': ['electron', 'vscode']
      }
    },
    {
      files: ['src/{layouts,app}/**/*.tsx', 'src/'],
      rules: {
        'import/no-default-export': 'off'
      }
    },
    {
      files: ['**/enums/*.ts'],
      rules: {
        'no-shadow': 'off'
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        'no-undef': 'off'
      }
    }
  ]
};
