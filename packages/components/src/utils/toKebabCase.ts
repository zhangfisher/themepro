/**
 * 将字符串转换为短横线命名法(kebab-case)
 * @param {string} name - 需要转换的原始字符串
 * @returns {string} 转换后的短横线命名法字符串
 */
export function toKebabCase(name: string) {
    return name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/_/g, '-')
        .toLowerCase()
}
