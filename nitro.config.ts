import { defineConfig } from 'nitro'

export default defineConfig({
  preset: process.env.NODE_ENV === 'production' ? 'cloudflare_module' : 'nitro_dev',
})
