/**
 * 将CSS选择器与属性映射结合，生成新的选择器字符串
 *
 * @example
 *
 * const selectors = [':host','.button' ]
 * const attrs = { 'data-type': 'primary', 'aria-label': 'submit' }
 * const result = mapCssSelector(selectors, attrs)
 * console.log(result)
 * // 输出: ':host([data-type="primary"][aria-label="submit"]),.button([data-type="primary"][aria-label="submit"])'
 *
 * const result = mapCssSelector(selectors, attrs,true)
 * console.log(result)
 * // 输出: ':host,:root,:host([data-type="primary"][aria-label="submit"]),.button([data-type="primary"][aria-label="submit"])'
 *
 * @param {string[]} selectors - 原始CSS选择器数组
 * @param {Record<string, string>} attrs - 需要映射的属性键值对
 * @param {boolean} includeEmpty - 是否包含空属性选择器，默认为false
 * @returns {string} 组合后的CSS选择器字符串，多个选择器用逗号分隔
 */
export function mapCssSelector(selectors: string[], attrs: Record<string, string>, includeEmpty: boolean = false) {
    const attrMap = Object.entries(attrs)
        .map(([name, value]) => {
            return !value || (typeof value === 'string' && value.trim() === '') ? `[${name}]` : `[${name}='${value}']`
        })
        .join('')
    const results: string[] = []
    if (includeEmpty) results.push(selectors.join(','))
    if (Object.keys(attrs).length > 0) {
        results.push(
            selectors
                .map((selector) => {
                    if (selector === ':host') {
                        return `${selector}(${attrMap})`
                    } else {
                        return `${selector}${attrMap}`
                    }
                })
                .join(','),
        )
    } else {
        if (!includeEmpty) results.push(selectors.join(','))
    }
    return results.join(',')
}
// const selectors = [':host', '.button']
// const attrs = { 'data-type': 'primary', 'aria-label': 'submit' }
// let result = mapCssSelector(selectors, attrs)
// console.log(result)
// result = mapCssSelector(selectors, attrs, true)
// console.log(result)
// result = mapCssSelector(selectors, {}, true)
// console.log(result)
// result = mapCssSelector(selectors, {}, false)
// console.log(result)
