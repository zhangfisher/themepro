export function parseObjectFromAttr<
    T extends Record<string, any> = Record<string, any>
>(el: HTMLElement, attrName: string, defaultValue?: Partial<T>): T {
    const attr = el.getAttribute(attrName);
    if (!attr) return defaultValue as T;
    const value: T = Object.assign({}, defaultValue) as T;
    try {
        if (typeof attr === "string") {
            Object.assign(value, JSON.parse(attr));
        }
    } catch {}
    return value;
}
