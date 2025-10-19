import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: ["@storybook/addon-docs", "./addons/preview-doc-grabber", "./addons/preview-popover-tool"],
	framework: {
		name: "@storybook/web-components-vite",
		options: {},
	},
};
export default config;
