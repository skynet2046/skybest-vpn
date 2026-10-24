import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration.
// `host: true` lets the dev server listen on your computer's local IP so you
// can open the prototype on a real phone that is on the same Wi-Fi network.
//
// If a preview/hosting environment proxies the app through its own hostname,
// pass it in the ALLOWED_HOST environment variable when starting the dev
// server, otherwise Vite replies 403 "Blocked request" for that host:
//   ALLOWED_HOST=my-preview.example.com npm start
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: process.env.ALLOWED_HOST ? [process.env.ALLOWED_HOST] : [],
  },
})
