import { eslintConfig } from '@kolhe/eslint-config'

export default eslintConfig(
  { prettier: true, markdown: true },
  {
    files: ['src/server.ts'],
    rules: {
      'import/no-default-export': 'off'
    }
  }
)
