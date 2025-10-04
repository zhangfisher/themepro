export type ThemeSize = "x-small" | "small" | "medium" | "large" | "x-large";
export type ThemeRadius = "none" | ThemeSize;
export type ThemeVariantType = "primary" | "success" | "warning" | "danger" | "info";

export type ThemeOptions = {
	name?: string;
	/**
	 * 主题颜色
	 */
	theme: string;
	/**
	 * 大小
	 */
	size?: ThemeSize;
	spacing?: ThemeSize;
	shadow?: ThemeSize;
	/**
	 * 圆角大小
	 */
	radius?: ThemeSize;
	/**
	 * 边框大小
	 * @default 1px
	 */
	border?: string;
	primary?: string;
	success?: string;
	warning?: string;
	danger?: string;
	info?: string;
};
