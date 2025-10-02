export function toVarStyles(vars: Record<string, string>) {
	return Object.entries(vars)
		.map(([key, value]) => `${key}:${value}`)
		.join(";\n");
}
