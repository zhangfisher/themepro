/**
 * 将驼峰式命名字符串转换为短横线分隔式(kebab-case)
 * @param {string} str - 需要转换的驼峰式字符串
 * @returns {string} 转换后的短横线分隔式字符串
 */
export function camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
