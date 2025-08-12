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
					{ text: "工作原理", link: "/guide/intro/principle" },
					{ text: "快速入门", link: "/guide/intro/get-started" },
				],
			},
			{
				text: "指南",
				items: [
					{ text: "主题色", link: "/guide/use/theme" },
					{ text: "关键色", link: "/guide/use/variant" },
					{ text: "尺寸", link: "/guide/use/size" },
					{ text: "圆角", link: "/guide/use/radius" },
					{ text: "间距", link: "/guide/use/spacing" },
					{ text: "自动变量", link: "/guide/use/autovars" },
					{ text: "颜色", link: "/guide/use/colors" },
					{ text: "工具类", link: "/guide/use/classs" },
				],
			},
			{
				text: "组件",
				items: [
					{ text: "Button", link: "/guide/components/button" },
					{ text: "Card", link: "/guide/components/card" },
				],
			},
		],

		socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
	},
	markdown: {
		config(md) {
			md.use(vitepressDemoPlugin, {
				demoDir: path.resolve(__dirname, "./demos"),
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
