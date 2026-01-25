import { defineConfig } from 'tsup'
// import copy from 'esbuild-copy-files-plugin'

export default defineConfig([
    {
        entry: ['src/index.ts'],
        outDir: 'dist',
        format: ['esm', 'iife'],
        splitting: false,
        dts: true,
        sourcemap: true,
        clean: false,
        noExternal: [],
        // esbuildPlugins: [
        //     copy({
        //         source: 'dist/',
        //         target: 'docs/public',
        //         copyWithFolder: false,
        //     }),
        // ],
    },
])
