import { generateGradientColors } from "./generateGradientColors";
import { getId } from "./getId";
import { injectStylesheet } from "./injectStylesheet";

/**
 * 在header中创建主题颜色CSS变量
 *
 *
 *
 *
 */

export type ThemeKeyColorOptions = {
	// 主题色，一般应该选择一个中间色调的值
	baseColor: string;
	// 是否为深色系主题，如果没有指定则根据主题基础颜色color来判断
	dark?: boolean;
	//指定主题梯度颜色的范围，取值0-100
	range?: [number, number];
	// 指定主题背景梯度颜色，默认取值: [10,1,2,3,4]
	keyLevels?: number[];
};

export type ThemeOptions = {
	name?: string;
	primary?: string | ThemeKeyColorOptions;
	success?: string | ThemeKeyColorOptions;
	danger?: string | ThemeKeyColorOptions;
	warning?: string | ThemeKeyColorOptions;
	info?: string | ThemeKeyColorOptions;
	theme?: ThemeKeyColorOptions;
};

export function createKeyColors(vars: Record<string, string>, prefix: string, options: string | ThemeKeyColorOptions) {
	const opts = Object.assign(
		{
			keyLevels: [5, 1, 2, 3, 4, 5],
			range: [10, 98],
			count: 5,
		},
		typeof options === "string" ? { baseColor: options } : options,
	) as ThemeKeyColorOptions;

	const { colors, dark } = generateGradientColors(opts.baseColor, opts);

	colors.reduce((all, cur, i) => {
		vars[`${prefix}${i}`] = cur;
		return all;
	}, {}) as Required<ThemeOptions>;

	const ps = prefix.split("-");
	const levelPrefix: string = `--t-${ps[4]}`;

	if (opts.keyLevels) {
		vars[`${levelPrefix}-color`] = `var(${prefix}${opts.keyLevels[0]})`;
		vars[`${levelPrefix}-bgcolor`] = `var(${prefix}${opts.keyLevels[1]})`;
		opts.keyLevels.slice(2).forEach((level, i) => {
			vars[`${levelPrefix}-bgcolor-${i + 1}`] = `var(${prefix}${level})`;
		});
	}
	return [colors, dark];
}

export function createTheme(options?: ThemeOptions) {
	const opts = Object.assign(
		{
			name: getId(),
		},
		options,
	);

	const themeOpts = Object.assign(
		{
			prefix: "--t-color-theme-",
			range: [10, 100],
			keyLevels: [10, 1, 2, 3, 4, 5],
		},
		opts.theme,
	);

	const vars: Record<string, string> = {};

	const [_, dark] = createKeyColors(vars, "--t-color-theme-", themeOpts);
	if (opts.primary) createKeyColors(vars, "--t-color-primary-", opts.primary);
	if (opts.danger) createKeyColors(vars, "--t-color-danger-", opts.danger);
	if (opts.info) createKeyColors(vars, "--t-color-info-", opts.info);
	if (opts.success) createKeyColors(vars, "--t-color-success-", opts.success);
	if (opts.warning) createKeyColors(vars, "--t-color-warning-", opts.warning);

	injectStylesheet(
		`:host,[theme=${opts.name}]{
        ${`color-schema: ${dark ? "dark" : "light"}`}
        ${Object.entries(vars)
			.map(([key, value]) => `${key}:${value}`)
			.join(";\n")}}`,
		{
			id: `theme-${opts.name || getId()}`,
			mode: "replace",
		},
	);
}
