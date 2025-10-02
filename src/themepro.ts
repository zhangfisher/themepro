import { AttrObserver } from "./observer";
import type { ThemeOptions, ThemeSize } from "./types";
import { createTheme } from "./utils/createTheme";
import { generateGradientVars } from "./utils/createVariantVars";
import { getVarsStyles } from "./utils/getVarsStyles";
import { injectStylesheet } from "./utils/injectStylesheet";
import { isDark } from "./utils/isDark";
import { toVarStyles } from "./utils/toVarStyles";
import { baseVars, radiusVars, derivedVars, shadowVars, spacingVars, sizeVars } from "./vars";

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
	options: Required<ThemeOptions>;
	attrObserver!: AttrObserver;
	dark: boolean = false;
	vars: Record<string, string> = {};
	selector: string = ":host,:root";
	constructor(scope?: string | HTMLElement, options?: ThemeOptions) {
		this.options = Object.assign(
			{
				theme: "#b5b5b5",
				size: "medium",
				radius: "medium",
				spacing: "medium",
				shadow: "medium",
				border: "1px",
			},
			options,
		) as Required<ThemeOptions>;
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
				"data-shadow",
				"data-primary",
				"data-success",
				"data-warning",
				"data-danger",
				"data-info",
			],
			this._onThemeAttrsChange.bind(this),
		);
		this._injectBaseStyles();
		this.update();
	}
	get size() {
		return this.options.size || ("medium" as ThemeSize);
	}
	set size(value: ThemeSize) {
		if (value === "medium") {
			this.scope.removeAttribute("data-size");
		} else {
			this.scope.dataset.size = value;
		}
	}
	get spacing(): ThemeSize {
		return (this.options.spacing || "medium") as ThemeSize;
	}
	set spacing(value: ThemeSize) {
		if (value === "medium") {
			this.scope.removeAttribute("data-spacing");
		} else {
			this.scope.dataset.spacing = value;
		}
	}
	get shadow() {
		return this.options.shadow || "medium";
	}
	set shadow(value: ThemeSize) {
		if (value === "medium") {
			this.scope.removeAttribute("data-shadow");
		} else {
			this.scope.dataset.shadow = value;
		}
	}
	get radius(): ThemeSize {
		return this.options.radius || "medium";
	}
	set radius(value: ThemeSize) {
		if (value === "medium") {
			this.scope.removeAttribute("data-radius");
		} else {
			this.scope.dataset.radius = value;
		}
	}
	get theme(): string {
		return this.options.theme || "light";
	}
	set theme(value: string) {
		if (value === "medium") {
			this.scope.removeAttribute("data-theme");
		} else {
			this.scope.dataset.theme = value;
		}
		this.update({ theme: value });
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
	/**
	 *
	 */
	update(options?: ThemeOptions) {
		const { theme = "light", size, radius, spacing, shadow } = Object.assign({}, this.options, options);
		this.dark = false;
		this.vars = {};
		if (theme in presetThemes) {
			this.options.theme = presetThemes[this.options.theme];
		}
		this.size = size;
		this.radius = radius;
		this.spacing = spacing;
		this.shadow = shadow;

		const themeColorVars = this._createThemeColorVars();
		const variantVars = this._createVariantColorVars();
		this.vars = {
			...baseVars,
			...themeColorVars,
			...variantVars,
		};

		const style = `${this.selector}[data-theme=${theme}],[data-theme=${theme}]{
            ${`color-schema: ${this.dark ? "dark" : "light"}`};
            ${Object.entries(this.vars)
				.map(([key, value]) => `${key}:${value}`)
				.join(";\n")};
            }`;

		injectStylesheet(style, {
			id: `themepro`,
		});
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
	private _injectThemeStyles() {
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
	private _injectBaseStyles() {
		const baseStyles = `${this.selector}[data-theme],[data-theme]{\n${toVarStyles(baseVars)}\n}\n`;

		const derivedStyles = `${this.selector}[data-theme],[data-theme]{\n${toVarStyles(derivedVars)}\n}\n`;

		const sizeStyles = getVarsStyles(sizeVars, this.selector, "data-size");
		const radiusStyles = getVarsStyles(radiusVars, this.selector, "data-radius");
		const spacingStyles = getVarsStyles(spacingVars, this.selector, "data-spacing");
		const shadowStyles = getVarsStyles(shadowVars, this.selector, "data-shadow");
		injectStylesheet(
			`${baseStyles}\n${derivedStyles}\n${sizeStyles}\n${radiusStyles}\n${spacingStyles}\n${shadowStyles}
        `,
			{
				id: "themepro-vars",
			},
		);
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
