export function toVarStyles(vars: Record<string, string>) {
    return `${Object.entries(vars)
        .filter((e): e is [string, string] => e[1] !== undefined)
        .map(([key, value]) => {
            return value ? `${key}:${value}` : undefined
        })
        .join(';\n')};`
}
