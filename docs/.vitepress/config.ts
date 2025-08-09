import path from "node:path";
import { defineConfig } from "vitepress";
import { vitepressDemoPlugin } from "vitepress-demo-plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: "/themepro/",
	title: "ThemePro",
	description: "创建动态主题样式",
	themeConfig: {
		outline: {
			label: "目录",
			level: [2, 5],
		},
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "首页", link: "/" },
			{ text: "指南", link: "/guide" },
			{ text: "开源推荐", link: "https://zhangfisher.github.io/repos/" },
		],
		sidebar: [
			{
				text: "关于",
				items: [
					{ text: "安装", link: "/guide/intro/install" },
					{ text: "快速入门", link: "/guide/intro/get-started" },
					{ text: "工作原理", link: "/guide/intro/principle" },
				],
			},
			{
				text: "指南",
				items: [
					{ text: "安装", link: "/guide/intro/install" },
					{ text: "快速入门", link: "/guide/intro/get-started" },
				],
			},
			{
				text: "组件",
				items: [
					{ text: "Title", link: "/guide/components/title" },
					{ text: "Card", link: "/guide/components/card" },
				],
			},
		],

		socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
	},
	markdown: {
		config(md) {
			md.use(vitepressDemoPlugin, {
				demoDir: path.resolve(__dirname, "../demos"),
				stackblitz: {
					show: true,
				},
				codesandbox: {
					show: true,
				},
			});
		},
	},
	vue: {
		template: {
			compilerOptions: {
				whitespace: "preserve",
			},
		},
	},
});
