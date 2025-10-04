import { getId } from "./getId";

export interface InjectStylesheetOptions {
	id?: string;
	location?: "head" | "body" | HTMLElement;
	mode?: "replace" | "append";
}

export function injectStylesheet(css: string, options?: InjectStylesheetOptions) {
	if (globalThis.document === undefined) return;
	const { id, mode, location = "head" } = Object.assign({ mode: "replace" }, options);
	let style = document.head.querySelector(`#${id}`) as HTMLStyleElement;
	const scopeId: string = id || getId();
	if (!style) {
		style = document.createElement("style");
		style.id = scopeId;
		if (location === "body") {
			document.body.appendChild(style);
		} else if (location instanceof HTMLElement) {
			location.appendChild(style);
		} else {
			document.head.appendChild(style);
		}
	}
	if (mode === "append") {
		style.innerHTML += css;
	} else {
		style.innerHTML = css;
	}
	return scopeId;
}
