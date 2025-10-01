import type { ThemeOptions } from "../types";
import { generateGradientVars } from "./createVariantVars";
import { getId } from "./getId";
import { injectStylesheet } from "./injectStylesheet";
import { isDark } from "./isDark";

export function createTheme(options: ThemeOptions) {
	const opts = Object.assign(
		{
			name: getId(),
			theme: "#FF0000",
			variants: {},
			injector: {},
		},
		options,
	) as Required<ThemeOptions>;

	opts.injector = Object.assign({
		location: (css: string) => {
			console.log(opts.name);
			return `:host,:root[data-theme=${opts.name}]{\n${css}\n}`;
		},
	});

	const vars = generateGradientVars(opts.theme, {
		prefix: "--t-color-theme-",
	});

	const dark = isDark(opts.theme);

	Object.entries(opts.variants).forEach(([key, value]) => {
		Object.assign(vars, generateGradientVars(value, { prefix: `--t-color-${key}-` }));
	});

	const style = `${`color-schema: ${dark ? "dark" : "light"}`};
        ${Object.entries(vars)
			.map(([key, value]) => `${key}:${value}`)
			.join(";\n")}`;

	// 将样式注入到页面中
	injectStylesheet(
		style,
		Object.assign(
			{
				id: `themepro-${opts.name || getId()}`,
				mode: "replace",
			},
			opts.injector,
		),
	);
	return {
		dark,
		vars,
	};
}

console.log(
	JSON.stringify(
		createTheme({
			theme: "#1677ff",
		}),
		null,
		4,
	),
);
