import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
	reporters: 'verbose'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
    },
  },
  server: {
	watch: {
		ignored: ['**/backend/**']
	}
  }
})
