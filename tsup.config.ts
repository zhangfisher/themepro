import { defineConfig } from "tsup";
// @ts-expect-error
import copy from "esbuild-copy-files-plugin";

export default defineConfig([
	{
		entry: ["src/index.ts"],
		outDir: "dist",
		format: ["esm", "iife"],
		splitting: false,
		sourcemap: true,
		clean: false,
		esbuildPlugins: [
			copy({
				source: "dist",
				target: "docs/public",
				copyWithFolder: false,
			}),
		],
	},
	{
		entry: ["src/components/lit.ts"],
		outDir: "dist",
		format: ["esm"],
		splitting: false,
		clean: false,
	},
	{
		entry: ["examples/card.ts"],
		outDir: "docs/public",
		format: ["iife"],
		splitting: false,
		clean: false,
	},
	{
		entry: ["examples/list.ts"],
		outDir: "docs/public",
		format: ["iife"],
		splitting: false,
		clean: false,
	},
]);
