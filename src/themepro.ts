import { AttrObserver } from "./observer";
import type { ThemeOptions, ThemeSize } from "./types";
import { createTheme } from "./utils/createTheme";
import { generateGradientVars } from "./utils/createVariantVars";
import { injectStylesheet } from "./utils/injectStylesheet";
import { isDark } from "./utils/isDark";

export const presetThemes: Record<string, string> = {
	light: "#b5b5b5",
	dark: "hsl(240 3.7% 44%)",
	blue: "#4096ff",
	red: "#ff4d4f",
	green: "#52c41a",
	orange: "#fa8c16",
	volcano: "#ff7a45",
	yellow: "#fadb14",
	lime: "#a0d911",
	magenta: "#eb2f96",
	purple: "#722ed1",
};

export class Themepro {
	scope!: HTMLElement;
	options: ThemeOptions;
	attrObserver!: AttrObserver;
	dark: boolean = false;
	vars: Record<string, string> = {};
	constructor(scope?: string | HTMLElement, options?: ThemeOptions) {
		this.options = Object.assign(
			{
				theme: "#b5b5b5",
			},
			options,
		);
		if (typeof scope === "string") {
			window.addEventListener("DOMContentLoaded", () => {
				this.scope = document.querySelector(scope) || document.body;
				this._init();
			});
		} else {
			this.scope = scope || document.body;
			this._init();
		}
	}
	private _init() {
		this.attrObserver = new AttrObserver(
			this.scope,
			[
				"data-theme",
				"data-size",
				"data-spacing",
				"data-border",
				"data-radius",
				"data-primary",
				"data-success",
				"data-warning",
				"data-danger",
				"data-info",
			],
			this._onThemeAttrsChange.bind(this),
		);
		this.update();
	}
	get size() {
		return (this.scope.dataset.size || "medium") as ThemeSize;
	}
	set size(value: ThemeSize) {
		this.scope.dataset.size = value;
	}
	get spacing(): ThemeSize {
		return (this.scope.dataset.spacing || "medium") as ThemeSize;
	}
	set spacing(value: ThemeSize | "auto") {
		this.scope.dataset.spacing = String(value);
	}
	get radius(): string {
		return this.scope.dataset.radius || "medium";
	}
	set radius(value: string) {
		this.scope.dataset.radius = value;
	}
	get theme(): string {
		return this.scope.dataset.theme || "light";
	}
	set theme(value: string) {
		this.scope.dataset.theme = value;
	}

	/**
	 * 当属性变化时，更新主题
	 *
	 * @param attrName
	 * @param attrValue
	 */
	private _onThemeAttrsChange(attrName: string, attrValue: string | null) {
		if (attrName === "data-theme") {
			this.update({ theme: attrValue || "light" });
		}
	}
	update(options?: ThemeOptions) {
		const opts = Object.assign({}, this.options, options);
		this.dark = false;
		this.vars = {};
		if (!opts.theme) opts.theme = "light";
		if (this.options.theme in presetThemes) {
			this.options.theme = presetThemes[this.options.theme];
		}

		const themeColorVars = this._createThemeColorVars();
		const variantVars = this._createVariantColorVars();
		this.vars = {
			...themeColorVars,
			...variantVars,
		};

		const style = `${`color-schema: ${this.dark ? "dark" : "light"}`};
        ${Object.entries(this.vars)
			.map(([key, value]) => `${key}:${value}`)
			.join(";\n")}`;
	}
	private _createThemeColorVars() {
		const vars: Record<string, string> = generateGradientVars(this.options.theme, {
			prefix: "--t-color-theme-",
		});
		this.dark = isDark(this.options.theme);
		vars["--t-theme-color"];
		return vars;
	}
	private _createVariantColorVars() {
		const variants = ["primary", "success", "warning", "danger", "info"];
		const vars: Record<string, string> = {};
		variants.forEach((name) => {
			// @ts-expect-error
			if (this.options[name]) {
				// @ts-expect-error
				Object.assign(vars, generateGradientVars(this.options[name], { prefix: `--t-color-${name}-` }));
			}
		});
		return vars;
	}

	private _injectThemeproStyles() {
		const selector: string = `:host,:root[data-theme=${this.options.theme}]`;
		const style = `${selector}{
            ${`color-schema: ${this.dark ? "dark" : "light"}`};
            ${Object.entries(this.vars)
				.map(([key, value]) => `${key}:${value}`)
				.join(";\n")}`;
		injectStylesheet(style, {
			id: `themepro`,
		});
	}
	create(options: ThemeOptions) {
		return createTheme(options);
	}
}

// 创建默认的主题应用
export const themePro = new Themepro();

globalThis.ThemePro = themePro;

declare global {
	var ThemePro: typeof themePro;
}
