import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			name: "themepro",
			entry: "src/index.ts",
		},
		rollupOptions: {},
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});
