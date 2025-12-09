/**
 * 应用样式到指定元素的子元素
 * @example
 * ```ts
 * const el = document.querySelector("#app") as HTMLElement;
 * const styles = {
 *     ".title": "color: red;",
 *     ".subtitle": "color: blue;",
 * };
 * applyStylesToElement(el, styles);
 * ```
 * @param el - 目标 HTML 元素
 * @param styles - 样式映射对象，键为 CSS 选择器，值为 CSS 文本
 */
export function applyStylesToElement(
    el: HTMLElement,
    styles: Record<string, string>
): void {
    if (!el || !styles || typeof styles !== "object") {
        return;
    }

    Object.entries(styles).forEach(([selector, cssText]) => {
        if (!selector || typeof cssText !== "string") {
            return;
        }
        const elements = el.querySelectorAll(
            selector
        ) as NodeListOf<HTMLElement>;
        if (elements.length > 0) {
            elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.style.cssText = cssText;
                }
            });
        }
    });
}
