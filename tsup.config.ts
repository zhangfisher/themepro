import { gzip } from "zlib";
import { promisify } from "node:util";
import { readFileSync } from "node:fs";
import { defineConfig } from "tsup";
import copy from "esbuild-copy-files-plugin";
import path from "node:path";
import fs from "node:fs";

const gzipPromise = promisify(gzip);
// import Sonda from 'sonda/esbuild';

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs", "iife"],
    dts: true,
    splitting: true,
    sourcemap: true,
    globalName: "AutoForm",
    clean: true,
    treeshake: true,
    minify: true,
    noExternal: ["flex-tools"],
    esbuildPlugins: [
      copy({
        source: ["./src/themes"],
        target: "./dist",
        copyWithFolder: true,
      }),
    ],
  },
]);
