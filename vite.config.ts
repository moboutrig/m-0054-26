import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 5173, // Standard Vite port, aligns with README example
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Local Express API server
        changeOrigin: true,
        // No rewrite needed as server.js uses /api prefix for routes
        // rewrite: (path) => path.replace(/^\/api/, '/api'),
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
