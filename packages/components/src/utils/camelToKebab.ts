/**
 * 将驼峰式命名字符串转换为短横线分隔(kebab-case)格式
 * @param str - 需要转换的驼峰式命名字符串
 * @returns 转换后的短横线分隔格式字符串
 */
export function camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
