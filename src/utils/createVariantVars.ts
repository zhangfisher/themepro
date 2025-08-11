import type { ThemeOptions, ThemeVariantOptions } from "../types";
import { generateGradientColors } from "./generateGradientColors";

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
