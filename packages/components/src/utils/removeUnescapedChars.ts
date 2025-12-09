/**
 * 移除字符串中的未转义字符（换行符、回车符、制表符和空白字符）
 * @param {string} str - 需要处理的原始字符串
 * @returns {string} 处理后的字符串，移除了所有未转义字符
 */
export function removeUnescapedChars(str: string): string {
    if (!str || typeof str !== "string") {
        return str;
    }
    return str
        .replace(/\n\s*/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, "")
        .trim();
}
