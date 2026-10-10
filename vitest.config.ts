import { defineConfig } from 'vite-plus'
import { fumadocsMdx } from 'fumadocs-mdx/vite'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [fumadocsMdx()],
})
