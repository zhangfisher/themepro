/**
 * 创建全局 ThemePro 容器工具函数
 * 用于在 ownerDocument 中创建 .kylinbits-container div 元素
 * 全局只需要一个容器，如果已存在则不重复创建
 */

import type { LitElement } from 'lit'

export function createThemeproContainer(element: LitElement): HTMLElement {
    // 检查是否已经存在 .kylinbits-container
    let container = element.ownerDocument.querySelector('.kylinbits-container') as HTMLElement

    if (container) {
        return container
    }

    // 创建新的 .kylinbits-container
    container = element.ownerDocument.createElement('div')
    container.className = 'kylinbits-container'
    container.style.cssText = `
        pointer-events: none;
        z-index: 9999;
        top: 0;
        left: 0;
    `

    element.ownerDocument.body.appendChild(container)
    return container
}
