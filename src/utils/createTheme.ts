import type { ThemeOptions } from "../types";
import { generateGradientVars } from "./generateGradientVars";
import { getId } from "./getId";
import { injectStylesheet } from "./injectStylesheet";
import { isDark } from "./isDark";

export function createTheme(options: ThemeOptions) {
	const opts = Object.assign(
		{
			name: getId(),
			theme: "#FF0000",
		},
		options,
	) as Required<ThemeOptions>;

	const vars = generateGradientVars(opts.theme, {
		prefix: "--t-color-theme-",
	});

	const dark = isDark(opts.theme);

	const variants = ["primary", "success", "warning", "danger", "info"];
	variants.forEach((name) => {
		// @ts-expect-error
		if (opts[name]) {
			// @ts-expect-error
			Object.assign(vars, generateGradientVars(opts[name], { prefix: `--t-color-${name}-` }));
		}
	});

	const style = `${`color-schema: ${dark ? "dark" : "light"}`};
        ${Object.entries(vars)
			.map(([key, value]) => `${key}:${value}`)
			.join(";\n")}`;

	// 将样式注入到页面中
	injectStylesheet(style, {
		id: `themepro-${opts.name || getId()}`,
		wrapper: (css: string) => {
			return `:host,:root[data-theme=${opts.name}]{\n${css}\n}`;
		},
	});
	return {
		dark,
		vars,
	};
}

// console.log(
// 	JSON.stringify(
// 		createTheme({
// 			theme: "#fadb14",
// 		}),
// 		null,
// 		4,
// 	),
// );
