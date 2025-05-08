import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  base: "/",
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3300/v1/api/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
                secure: true
            }
        }
    }
})
