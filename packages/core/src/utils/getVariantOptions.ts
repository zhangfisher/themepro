import type { ThemeVariantOptions } from "../types";

export function getVariantOptions(el: HTMLElement, name: string, defaultValue?: string): ThemeVariantOptions {
	const options: ThemeVariantOptions = {
		color: (el.dataset[name] || defaultValue || "").trim(),
	};
	const value = options.color.trim();
	try {
		if (value.startsWith("{") && value.endsWith("}")) {
			Object.assign(options, JSON.parse(value));
		}
	} catch {}
	return options;
}
