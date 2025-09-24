import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm", "iife"],
    splitting: false,
    sourcemap: true,
    clean: true,
});
