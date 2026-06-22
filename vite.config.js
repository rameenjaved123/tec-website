import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  define: {
    global: 'globalThis',
  },

  server: {
    port: 5173,
    watch: {
      // public/uploads has 13,500+ files — exclude from chokidar to avoid 60s startup
      ignored: ['**/public/uploads/**'],
    },
  },
})
