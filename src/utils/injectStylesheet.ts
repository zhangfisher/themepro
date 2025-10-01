import { getId } from "./getId";

export interface InjectStylesheetOptions {
	location?: "head" | "body" | HTMLElement | ((css: string) => string);
	/**
	 * 注入样式时的回调
	 * onInjectStyles(css){
	 *      return `:host{\n${css}\n}`
	 * }
	 *
	 * @param css
	 * @returns
	 */
	onInjectStyles?: (themeName: string, themeStyle: string) => string;
	id?: string;
	// 默认仅当指定id的样式不存在时注入
	mode?: "replace" | "append" | "default";
}

export function injectStylesheet(css: string, options?: InjectStylesheetOptions) {
	if (globalThis.document === undefined) return;
	const { id, mode, location = "head" } = Object.assign({ mode: "default" }, options);
	let style = document.head.querySelector(`#${id}`) as HTMLStyleElement;
	const scopeId: string = id || getId();
	if (!style) {
		style = document.createElement("style");
		style.id = scopeId;
		style.innerHTML = css;
		if (location === "head") {
			document.head.appendChild(style);
		} else if (location === "body") {
			document.body.appendChild(style);
		} else if (typeof location === "function") {
			style.innerHTML = location(css);
		} else {
			location.appendChild(style);
		}
	}
	if (mode === "replace") {
		style.innerHTML = css;
	} else if (mode === "append") {
		style.innerHTML += css;
	}
	return scopeId;
}
