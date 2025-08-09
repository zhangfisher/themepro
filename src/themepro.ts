import { createKeyColors, createTheme, type ThemeOptions } from "./utils/createTheme";
import type { GenerateGradientOptions } from "./utils/generateGradientColors";
import { injectStylesheet } from "./utils/injectStylesheet";

export type ThemeproMeta = {
	// 指定使用ThemePro生效的的选择器，多个选择器使用,分隔,默认值是body
	selector: string;
};

export type ThemeproOptions = {
	// 指定生效的区域，通常情况下是根元素，但是你也可以设置scope，比如一个div。
	selector?: string;
	theme?: string;
	size?: "x-small" | "small" | "medium" | "large" | "x-large";
	primaryColor?: string;
	successColor?: string;
	warningColor?: string;
	dangerColor?: string;
	infoColor?: string;
	radius?: string;
	// 启用紧凑时的计算因子，默认是0.5，主要作用于spaces,padding,margin
	compact?: boolean;
	/**
	 * 基于基准颜色生成梯度颜色
	 * @param baseColor
	 * @returns
	 */
	onGenerateGradientColors?: (baseColor: string, options: GenerateGradientOptions) => {};
};

export type ThemeSize = "x-small" | "small" | "medium" | "large" | "x-large";
export type ThemeRadius = "none" | ThemeSize;
export type ThemeVariants = "info" | "primary" | "success" | "warning" | "danger";

export class Themepro {
	_theme: string = "light";
	_size: ThemeSize = "medium";
	_radius: string = "none";
	options: ThemeproOptions;
	defaultScope!: HTMLElement;
	scopes!: HTMLElement[];
	constructor(options?: ThemeproOptions) {
		this.options = Object.assign(
			{
				container: "body",
			},
			options,
		);
		document.addEventListener("DOMContentLoaded", this._onDomContentLoaded.bind(this));
	}
	get size() {
		return this._size;
	}
	set size(value: ThemeSize) {
		this.defaultScope.setAttribute("size", value);
		this._size = value;
	}
	get radius(): string {
		return this._radius;
	}
	set radius(value: string) {
		this.defaultScope.setAttribute("radius", value);
		this._radius = value;
	}
	get theme(): string {
		return this._theme;
	}
	set theme(value: string) {
		if (value === "light") {
			this.defaultScope.removeAttribute("theme");
		} else {
			this.defaultScope.setAttribute("theme", value);
		}
		this._theme = value;
	}
	createVariantColor(variant: ThemeVariants, color: string, options?: GenerateGradientOptions) {
		const vars = {};
		createKeyColors(
			vars,
			`--t-color-${variant}-`,
			Object.assign(
				{
					baseColor: color,
				},
				options,
			),
		);
		const selector = this.theme === "light" ? `:root,:host` : `:host,\n[theme=${this.theme}]`;
		const styles = `${selector}{
            ${Object.entries(vars)
				.map(([name, value]) => `${name}: ${value};`)
				.join("\n")}`;
		injectStylesheet(styles, {
			id: `t-${this.theme}-${variant}`,
			mode: "replace",
		});
	}

	getContainer() {
		if (!this.defaultScope) {
			this.defaultScope = (document.querySelector(this.options.selector || "body") ||
				document.querySelector("body")) as HTMLElement;
		}
		return this.defaultScope;
	}

    _loadThemeScope(){
        const 
    }

	_resetScopeStyles() {
		const selector = this.options.selector;
		const resetStyles = `
            ${selector} {
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                color: var(--auto-color);
                background: var(--auto-bgcolor);

            }
            ${selector} ::selection {
                background-color: var(--t-color-theme-3);
                color: var(--t-theme-color); 
            }
            ${selector} table {
                border-collapse: collapse;
                border-spacing: 0;
            }
            ${selector} h1,h2,h3,h4,h5,h6 {
                font: var(--auto-title-font);
                margin: 0;
            }
            ${selector} [draggable] {
                cursor: move;
            }
        `;
		injectStylesheet(resetStyles, {
			id: "themepro-reset",
		});
	}
	_getThemeMetas() {
		const metas = Array.from(document.querySelectorAll("meta[name=themepro]") || []);
        return metas.map(meta=>{
            return {
				selector: meta.getAttribute("selector"),
				size: meta.getAttribute("size") || "medium",
				radius: meta.getAttribute("radius") || "medium",
				theme: meta.getAttribute("theme") || "light",
				primaryColor: meta.getAttribute("primarycolor"),
				successColor: meta.getAttribute("successcolor"),
				warningColor: meta.getAttribute("warningcolor"),
				dangerColor: meta.getAttribute("dangercolor"),
				infoColor: meta.getAttribute("infocolor"),
				compact: meta.getAttribute("compact")
			};
        })
	}

	_onDomContentLoaded() {
		this._resetScopeStyles();
		this.defaultScope = this.getContainer();
		if (this.defaultScope) {
			this._size = (this.defaultScope.getAttribute("size") as ThemeSize) || "medium";
			this._theme = this.defaultScope.getAttribute("theme") || "light";
			this._radius = (this.defaultScope.getAttribute("radius") as ThemeRadius) || "medium";
		}
	}
	createTheme(options?: ThemeOptions) {
		createTheme(options);
	}
}

// 创建默认的主题应用
export const themePro = new Themepro();

globalThis.ThemePro = themePro;

declare global {
	var ThemePro: typeof themePro;
}
