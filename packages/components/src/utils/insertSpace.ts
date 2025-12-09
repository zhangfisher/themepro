/**
 * 在两个中文之间插入空格
 * @param str
 * @returns
 */
export function insertSpace(str: string) {
    return str.replace(/([^\u3000])([\u4e00-\u9fa5])/g, '$1&nbsp;$2')
}
