import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // HIGHLIGHT: Added proxy for API requests to backend
  server: {
    proxy: {
      '/api': {
        target: 'https://real-time-chat-app-d9ie.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
