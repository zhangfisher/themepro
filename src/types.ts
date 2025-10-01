import type { InjectStylesheetOptions } from "./utils";

export type ThemeSize = "x-small" | "small" | "medium" | "large" | "x-large";
export type ThemeRadius = "none" | ThemeSize;
export type ThemeVariantType = "primary" | "success" | "warning" | "danger" | "info";

export type ThemeproMeta = {
	// 指定使用ThemePro生效的的选择器，多个选择器使用,分隔,默认值是body
	selector: string;
};
export type ThemeSchema = {
	name?: string;
	theme: string;
	size?: "x-small" | "small" | "medium" | "large" | "x-large";
	variants?: {
		primary?: string;
		success?: string;
		warning?: string;
		danger?: string;
		info?: string;
	};
	/**
	 * 圆角大小
	 */
	radius?: string;
	// 启用紧凑时的计算因子，默认是1，主要作用于spaces,padding,margin
	sparse?: number;
};
export type ThemeOptions = ThemeSchema & {
	/**
	 * 将主题样式注入到页面中，默认是注入到head
	 */
	injector?: InjectStylesheetOptions;
};
