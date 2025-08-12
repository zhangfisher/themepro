import { defineConfig } from "vite";
import cp from "vite-plugin-cp";
import dts from "unplugin-dts/vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		minify: true, // 禁用代码压缩
		sourcemap: true, // 生成 sourceMap
		lib: {
			name: "themepro",
			entry: ["src/index.ts"],
			formats: ["es", "umd"],
			fileName: (format) => (format === "es" ? "index.js" : "index.umd.js"),
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
