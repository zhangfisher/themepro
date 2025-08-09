import type { ThemeOptions, ThemeVariantOptions } from "../types";
import { generateGradientColors } from "./generateGradientColors";
import { getId } from "./getId";
import { injectStylesheet } from "./injectStylesheet";

export function createVariantVars(prefix: string, options: string | ThemeVariantOptions) {
	const opts = Object.assign(
		{
			levels: [5, 1, 2, 3, 4, 5],
			range: [10, 98],
			count: 5,
		},
		typeof options === "string" ? { color: options } : options,
	) as ThemeVariantOptions;

	const { colors, dark } = generateGradientColors(opts);

	const vars: Record<string, string> = {};
	colors.reduce((all, cur, i) => {
		vars[`${prefix}${i}`] = cur;
		return all;
	}, {}) as Required<ThemeOptions>;

	const ps = prefix.split("-");
	const levelPrefix: string = `--t-${ps[4]}`;

	if (opts.levels) {
		vars[`${levelPrefix}-color`] = `var(${prefix}${opts.levels[0]})`;
		vars[`${levelPrefix}-bgcolor`] = `var(${prefix}${opts.levels[1]})`;
		opts.levels.slice(2).forEach((level, i) => {
			vars[`${levelPrefix}-bgcolor-${i + 1}`] = `var(${prefix}${level})`;
		});
	}
	return { vars, colors, dark };
}

export function createTheme(options: ThemeOptions) {
	const opts = Object.assign(
		{
			name: getId(),
			variants: {},
		},
		options,
	) as Required<ThemeOptions>;

	const themeOpts = Object.assign(
		{
			prefix: "--t-color-theme-",
			range: [10, 100],
			levels: [10, 1, 2, 3, 4, 5],
		},
		opts.theme,
	);

	const { vars, dark } = createVariantVars("--t-color-theme-", themeOpts);

	if (opts.variants.primary) createVariantVars("--t-color-primary-", opts.variants.primary);
	if (opts.variants.danger) createVariantVars("--t-color-danger-", opts.variants.danger);
	if (opts.variants.success) createVariantVars("--t-color-success-", opts.variants.success);
	if (opts.variants.warning) createVariantVars("--t-color-warning-", opts.variants.warning);
	if (opts.variants.info) createVariantVars("--t-color-info-", opts.variants.info);

	injectStylesheet(
		`:host,[data-theme=${opts.name}]{
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
