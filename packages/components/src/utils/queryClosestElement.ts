/**
 *
 * 从元素本身开始,然后是祖先(父,祖元素,...),直到找到匹配项。 如果未找到匹配项,则 closest() 方法返回 null。
 *
 * 与标准HTMLElement.closest方法的区别在于：
 *
 * - 如果输入的el是一个WebComponent，则会在当前组件的shadowRoot中调用querySelector查找
 * - 如果找不到则向上在el的上一个WebComponent元素中调用querySelector查找，直到找到或找到document的根元素为止
 *
 * @param el
 * @param selector
 */
export function queryClosestElement(
    el: HTMLElement,
    selector: string
): Element | null {
    // 检查当前元素是否匹配选择器
    if (el.matches?.(selector)) {
        return el;
    }

    // 获取当前元素的宿主元素（如果当前元素在 Shadow DOM 中）
    let currentElement: Element | null = el;
    let currentHost: Element | null = null;

    // 如果当前元素在 Shadow DOM 中，先在当前 Shadow DOM 中查找
    if (currentElement.shadowRoot) {
        const matchedElement =
            currentElement.shadowRoot.querySelector(selector);
        if (matchedElement) {
            return matchedElement;
        }
        //@ts-expect-error
        currentHost = currentElement.getRootNode();
    } else {
        // 如果不在 Shadow DOM 中，使用标准的 closest 方法
        return currentElement.querySelector(selector);
    }

    // 向上遍历 Web Components 的宿主元素
    while (currentHost) {
        // 检查宿主元素本身是否匹配
        if (currentHost.matches?.(selector)) {
            return currentHost;
        }

        // 如果宿主元素有 Shadow DOM，在其 Shadow DOM 中查找
        if (currentHost.shadowRoot) {
            const matchedElement =
                currentHost.shadowRoot.querySelector(selector);
            if (matchedElement) {
                return matchedElement;
            }
        }

        // 获取宿主元素的宿主（如果它在另一个 Shadow DOM 中）
        const hostRootNode = currentHost.getRootNode();
        if (hostRootNode instanceof ShadowRoot) {
            currentHost = hostRootNode.host;
        } else {
            // 如果到达了 document 的根节点，使用标准的 closest 方法
            return currentHost.querySelector(selector);
        }
    }

    // 如果没有找到，返回 null
    return null;
}
