import { ThemeScope } from "./scope";
import type { ThemeOptions, ThemeVariants } from "./types";
import { createVariantVars, createTheme } from "./utils/createTheme";
import type { GenerateGradientOptions } from "./utils/generateGradientColors";
import { injectStylesheet } from "./utils/injectStylesheet";

export class Themepro {
	scopes: ThemeScope[] = [];
	constructor() {
		document.addEventListener("DOMContentLoaded", this._onDomContentLoaded.bind(this));
	}

	_loadThemeScopes() {
		const scopeEls = Array.from(document.querySelectorAll("[data-theme]") || []) as HTMLElement[];
		this.scopes = scopeEls.map((el) => new ThemeScope(el));
	}

	_onDomContentLoaded() {
		this._loadThemeScopes();
	}
	createTheme(options: ThemeOptions) {
		this.scopes.forEach((scope) => scope.createTheme(options));
	}
}

// 创建默认的主题应用
export const themePro = new Themepro();

globalThis.ThemePro = themePro;

declare global {
	var ThemePro: typeof themePro;
}
