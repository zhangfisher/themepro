import type { ThemeOptions, ThemeSize, ThemeVariantType } from "./types";
import { createTheme } from "./utils/createTheme";
import { createVariantVars } from "./utils/createVariantVars";
import type { GenerateGradientOptions } from "./utils/generateGradientColors";
import { injectStylesheet } from "./utils/injectStylesheet";

export class Themepro {
	root!: HTMLElement;
	constructor() {
		this.root = document.documentElement;
		document.addEventListener("DOMContentLoaded", this._onDomContentLoaded.bind(this));
	}
	get size() {
		return (this.root.dataset.size || "medium") as ThemeSize;
	}
	set size(value: ThemeSize) {
		this.root.dataset.size = value;
	}
	get spacing(): ThemeSize {
		return (this.root.dataset.spacing || "medium") as ThemeSize;
	}
	set spacing(value: ThemeSize | "auto") {
		this.root.dataset.spacing = String(value);
	}
	get radius(): string {
		return this.root.dataset.radius || "medium";
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
	_onDomContentLoaded() {
		this.root = document.documentElement;
	}

	createVariant(variant: ThemeVariantType, options: GenerateGradientOptions) {
		const { vars } = createVariantVars(`--t-color-${variant}-`, options);
		const selector = this.theme === "light" ? `:root,:host` : `:host,\n:root[data-theme=${this.theme}]`;
		const styles = `${selector}{${Object.entries(vars)
			.map(([name, value]) => `${name}: ${value};`)
			.join("\n")}`;

		injectStylesheet(styles, {
			id: `t-${this.theme}-${variant}`,
			mode: "replace",
		});
	}

	create(options: ThemeOptions) {
		createTheme(options);
	}
}

// 创建默认的主题应用
export const themePro = new Themepro();

globalThis.ThemePro = themePro;

declare global {
	var ThemePro: typeof themePro;
}
