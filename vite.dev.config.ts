import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: "themepro",
      entry: "src/index.ts",
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        font: resolve(__dirname, 'examples/font.html'),
        colors: resolve(__dirname, 'examples/colors.html'),
        input: resolve(__dirname, 'examples/input.html'),
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
