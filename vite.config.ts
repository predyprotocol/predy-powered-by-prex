import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      plugins: [react(), visualizer()],

      output: {
        manualChunks: {
          vendor: ["react", "react-router-dom", "@prex0/uikit"]
        },
      },
    },
  },
})