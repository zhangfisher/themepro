import { toVarStyles } from "./toVarStyles";

export function getVarsStyles(vars: Record<string, Record<string, string>>, selector: string, attrName: string) {
	return Object.entries(vars)
		.map(([key, value]) => {
			return `${selector}[${attrName}=${key}],[${attrName}=${key}]{\n${toVarStyles(value)}\n}`;
		})
		.join("\n");
}
