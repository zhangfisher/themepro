import { defineConfig } from "vite";
import { resolve } from "node:path";
// import cp from "vite-plugin-cp";
// import dts from "unplugin-dts/vite";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    server: {
        open: "examples/index.html",
    },
    // root: "./examples",
});
