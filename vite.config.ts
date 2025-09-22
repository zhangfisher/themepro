import { defineConfig } from "vite";
import cp from "vite-plugin-cp";
import dts from "unplugin-dts/vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: true, // 代码压缩
        sourcemap: true, // 生成 sourceMap
        lib: {
            name: "themepro",
            // 由于 UMD/IIFE 格式不支持多入口，我们需要分别构建
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es", "umd"],
            fileName: (format) => {
                return format === "es" ? "index.js" : "index.umd.js";
            },
        },
        rollupOptions: {
            output: {
                assetFileNames: "index.css",
            },
        },
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    plugins: [
        dts({ bundleTypes: true }),
        cp({
            targets: [
                { src: "./src/themes/*.css", dest: "./dist/" },
                { src: "./dist", dest: "./docs/public" },
            ],
        }),
    ],
});
