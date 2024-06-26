import { defineConfig } from "vite";
import "vitest/config"
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    css: true,
  },
  build: {
    outDir: 'dist'
  },
  base: 'tic-tac-toe'
});
