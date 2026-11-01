import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5175,
    strictPort: true,
    proxy: {
      "/meoportfolious-assets": "http://localhost:8000",
      "/api": {
        target: "https://manual-improper-cottage.ngrok-free.dev",
        changeOrigin: true,
        headers: { "ngrok-skip-browser-warning": "true" },
      },
    },
  }
})