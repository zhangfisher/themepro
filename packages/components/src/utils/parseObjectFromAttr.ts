import { parseRelaxedJson } from "./parseRelaxedJson";

/**
 * 从HTML元素的属性中解析JSON对象
 * @template T - 返回对象的类型，默认为Record<string, any>
 * @param {HTMLElement} el - 包含属性的HTML元素
 * @param {string} attrName - 要解析的属性名称
 * @param {Partial<T>} [defaultValue] - 当属性不存在时返回的默认值
 * @returns {T} 解析后的对象，包含默认值和属性值的合并结果
 * @throws 当JSON解析失败时静默失败，返回合并后的对象
 */
export function parseObjectFromAttr<
    T extends Record<string, any> = Record<string, any>
>(el: HTMLElement, attrName: string, defaultValue?: Partial<T>): T {
    // @ts-expect-error
    const attrValue = el[attrName] || el.getAttribute(attrName);
    if (!attrValue) return defaultValue as T;
    const value: T = Object.assign({}, defaultValue) as T;
    try {
        if (typeof attrValue === "string") {
            return parseRelaxedJson(attrValue);
            // Object.assign(value, JSON.parse(attrValue));
        } else if (typeof attrValue === "object") {
            Object.assign(value, attrValue);
        }
    } catch {}
    return value;
}
