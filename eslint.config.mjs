import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  stylistic: false,
  isInEditor: false,
  ignores: ['src/routeTree.gen.ts'],
  rules: {
    'node/prefer-global/process': 'off',
    'perfectionist/sort-imports': 'off',
    'perfectionist/sort-named-imports': 'off',
    'react-refresh/only-export-components': 'off',
  },
})
