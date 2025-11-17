export function parseObjectFromAttr<
    T extends Record<string, any> = Record<string, any>
>(el: HTMLElement, attrName: string, defaultValue?: Partial<T>): T {
    // @ts-expect-error
    const attrValue = el[attrName] || el.getAttribute(attrName);
    if (!attrValue) return defaultValue as T;
    const value: T = Object.assign({}, defaultValue) as T;
    try {
        if (typeof attrValue === "string") {
            Object.assign(value, JSON.parse(attrValue));
        } else if (typeof attrValue === "object") {
            Object.assign(value, attrValue);
        }
    } catch {}
    return value;
}
