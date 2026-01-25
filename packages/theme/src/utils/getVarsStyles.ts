import { mapCssSelector } from './mapSelector'
import { toVarStyles } from './toVarStyles'

/**
 * 根据变量映射和选择器生成CSS变量样式
 * @example
 *
 * const vars = {
 *   '--k-color-primary': '#000',
 *   '--k-color-secondary': '#333',
 *   '--k-color-tertiary': '#666',
 * }
 *
 * const styles = getVarsStyles(vars, [':host', ':root'], 'data-theme')
 * console.log(styles)
 * 输出：
 * :host([data-theme='primary']),:root([data-theme='primary']) {
 *   --k-color-primary: #000;
 *   --k-color-secondary: #333;
 *   --k-color-tertiary: #666;
 * }
 *
 * @param {Record<string, Record<string, string>>} vars - 包含CSS变量键值对的对象
 * @param {string[]} selectors - 需要应用变量的CSS选择器数组
 * @param {string} attrName - 用于生成属性选择器的属性名
 * @returns {string} 生成的CSS变量样式字符串
 */
export function getVarsStyles(vars: Record<string, Record<string, string>>, selectors: string[], attrName: string) {
    return Object.entries(vars)
        .map(([key, value]) => {
            const strSelector = mapCssSelector(selectors, { [attrName]: key })
            return `${strSelector},[${attrName}=${key}]{\n${toVarStyles(value)}\n}`
        })
        .join('\n')
}
