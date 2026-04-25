import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/elmenzelcar/',
  envDir: path.resolve(__dirname, '.'),
  envPrefix: 'VITE_',
  define: {
    'process.env': {},
  },
})

