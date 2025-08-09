import type { ThemeOptions, ThemeRadius, ThemeSize, ThemeVariantOptions, ThemeVariants } from "./types";
import { createVariantVars } from "./utils/createTheme";
import type { GenerateGradientOptions } from "./utils/generateGradientColors";
import { getVariantOptions } from "./utils/getVariantOptions";
import { injectStylesheet } from "./utils/injectStylesheet";

export class ThemeScope {
	constructor(public root: HTMLElement) {}
	get size() {
		return (this.root.dataset.size || "medium") as ThemeSize;
	}
	set size(value: ThemeSize) {
		this.root.dataset.size = value;
	}
	get sparse(): number {
		return parseInt(this.root.dataset.sparse || "1");
	}
	set sparse(value: number) {
		this.root.dataset.sparse = String(value);
	}
	get radius(): string {
		return (this.root.dataset.radius || "medium") as ThemeRadius;
	}
	set radius(value: string) {
		this.root.dataset.radius = value;
	}
	get theme(): string {
		return this.root.dataset.theme || "light";
	}
	set theme(value: string) {
		this.root.dataset.theme = value;
	}

	createVariant(variant: ThemeVariants, options: GenerateGradientOptions) {
		const vars = {};
		createVariantVars(vars, `--t-color-${variant}-`, options);
		const selector = this.theme === "light" ? `:root,:host` : `:host,\n[data-theme=${this.theme}]`;
		const styles = `${selector}{${Object.entries(vars)
			.map(([name, value]) => `${name}: ${value};`)
			.join("\n")}`;

		injectStylesheet(styles, {
			id: `t-${this.theme}-${variant}`,
			mode: "replace",
		});
	}

	createTheme(options: ThemeOptions) {
		this.createTheme(options);
	}
}
