import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
  },
  preview: {
    port: 8080,
  },
  base: '/tic_tac_toe',
  build: {
    outDir: 'dist/tic_tac_toe'
  },
});
