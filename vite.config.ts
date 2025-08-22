import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/KillVille-Augury/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
