import { AttrObserver } from "./observer";
import { presetThemes } from "./presets";
import type { ThemeOptions, ThemeSize } from "./types";
import { createTheme } from "./utils/createTheme";
import { generateGradientVars } from "./utils/generateGradientVars";
import { getVarsStyles } from "./utils/getVarsStyles";
import { injectStylesheet } from "./utils/injectStylesheet";
import { isDark } from "./utils/isDark";
import { toRGB, toRGBString } from "./utils/toRGB";
import { toVarStyles } from "./utils/toVarStyles";
import { baseVars, radiusVars, derivedVars, shadowVars, spacingVars, sizeVars } from "./vars";

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
				selector: ":host,:root",
				theme: "light",
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
				this.scope = document.querySelector(scope) || document.documentElement;
				this._init();
			});
		} else {
			this.scope = scope || document.documentElement;
			this._init();
		}
	}
	private _init() {
		this.attrObserver = new AttrObserver(
			this.scope,
			["data-theme", "data-primary", "data-success", "data-warning", "data-danger", "data-info"],
			this._onThemeAttrsChange.bind(this),
		);
		this._injectBaseStyles();
		this.update();
	}
	get size() {
		return (this.scope.dataset.size || this.options.size || "medium") as ThemeSize;
	}
	set size(value: ThemeSize) {
		if (value === "medium") {
			this.scope.removeAttribute("data-size");
		} else {
			this.scope.dataset.size = value;
		}
	}
	get spacing(): ThemeSize {
		return (this.scope.dataset.spacing || this.options.spacing || "medium") as ThemeSize;
	}
	set spacing(value: ThemeSize) {
		if (value === "medium") {
			this.scope.removeAttribute("data-spacing");
		} else {
			this.scope.dataset.spacing = value;
		}
	}
	get shadow() {
		return (this.scope.dataset.shadow || this.options.shadow || "medium") as ThemeSize;
	}
	set shadow(value: ThemeSize) {
		if (value === "medium") {
			this.scope.removeAttribute("data-shadow");
		} else {
			this.scope.dataset.shadow = value;
		}
	}
	get radius(): ThemeSize {
		return (this.scope.dataset.radius || this.options.radius || "medium") as ThemeSize;
	}
	set radius(value: ThemeSize) {
		if (value === "medium") {
			this.scope.removeAttribute("data-radius");
		} else {
			this.scope.dataset.radius = value;
		}
	}
	get theme(): string {
		return (this.scope.dataset.theme || this.options.theme || "light") as string;
	}
	set theme(value: string) {
		if (value === "medium") {
			this.scope.removeAttribute("data-theme");
		} else {
			this.scope.dataset.theme = value in presetThemes ? presetThemes[value][0] : toRGBString(value);
		}
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
		Object.assign(this.options, options);
		const { theme = "light", size, radius, spacing, shadow } = this.options;
		this.dark = false;
		if (theme in presetThemes) {
			this.options.theme = presetThemes[theme][0];
		}

		this.size = size;
		this.radius = radius;
		this.spacing = spacing;
		this.shadow = shadow;

		const themeColorVars = this._createThemeColorVars();
		const variantVars = this._createVariantColorVars();
		const vars = {
			...themeColorVars,
			...variantVars,
		};

		this.dark = isDark(this.theme);
		const themeName = theme;
		const style = `${this.selector}[data-theme='${themeName}'],[data-theme='${themeName}']{
            ${`color-scheme: ${this.dark ? "dark" : "light"}`};
            ${Object.entries(vars)
				.map(([key, value]) => `${key}:${value}`)
				.join(";\n")};
            }`;

		injectStylesheet(style, {
			id: `themepro-theme`,
		});
	}
	/**
	 * 获取默认主题的样式字符串
	 * @returns {string} 包含CSS变量和颜色模式的主题样式字符串
	 * @private
	 */
	private _getDefaultThemeStyles() {
		const dark = isDark(presetThemes.light[0]);
		return `${this.selector}{\n${`color-scheme: ${dark ? "dark" : "light"}`};\n${toVarStyles(this._createThemeColorVars(presetThemes.light[0]))}\n}\n`;
	}
	private _createThemeColorVars(theme: string = this.theme) {
		const themeColor = theme in presetThemes ? presetThemes[theme][0] : theme;
		const vars: Record<string, string> = generateGradientVars(themeColor, {
			prefix: "--t-color-theme-",
		});
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
	private _injectBaseStyles() {
		const baseStyles = `${this.selector}{\n${toVarStyles(baseVars)}\n${toVarStyles(derivedVars)}\n}\n`;
		const sizeStyles = getVarsStyles(sizeVars, this.selector, "data-size");
		const radiusStyles = getVarsStyles(radiusVars, this.selector, "data-radius");
		const spacingStyles = getVarsStyles(spacingVars, this.selector, "data-spacing");
		const shadowStyles = getVarsStyles(shadowVars, this.selector, "data-shadow");
		const lightStyles = this._getDefaultThemeStyles();
		injectStylesheet(
			`${baseStyles}\n${sizeStyles}\n${radiusStyles}\n${spacingStyles}\n${shadowStyles}\n${lightStyles}
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
