import { createKeyColors, createTheme, type ThemeOptions } from "./utils/createTheme";
import type { GenerateGradientOptions } from "./utils/generateGradientColors";
import { injectStylesheet } from "./utils/injectStylesheet";

export type ThemeproOptions = {
	theme?: string;
	size?: "x-small" | "small" | "medium" | "large" | "x-large";
	primaryColor?: string;
	radius?: string;
	container?: string;
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
	container!: HTMLElement;
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
		this.container.setAttribute("size", value);
		this._size = value;
	}
	get radius(): string {
		return this._radius;
	}
	set radius(value: string) {
		this.container.setAttribute("radius", value);
		this._radius = value;
	}
	get theme(): string {
		return this._theme;
	}
	set theme(value: string) {
		if (value === "light") {
			this.container.removeAttribute("theme");
		} else {
			this.container.setAttribute("theme", value);
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
		if (!this.container) {
			this.container = (document.querySelector(this.options.container || "body") ||
				document.querySelector("body")) as HTMLElement;
		}
		return this.container;
	}

	_resetContainerStyles() {
		const selector = this.options.container;
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

	_onDomContentLoaded() {
		this._resetContainerStyles();
		this.container = this.getContainer();
		if (this.container) {
			this._size = (this.container.getAttribute("size") as ThemeSize) || "medium";
			this._theme = this.container.getAttribute("theme") || "light";
			this._radius = (this.container.getAttribute("radius") as ThemeRadius) || "medium";
		}
	}
	createTheme(options?: ThemeOptions) {
		createTheme(options);
	}
}

export const themePro = new Themepro();

globalThis.ThemePro = themePro;

declare global {
	var ThemePro: typeof themePro;
}
