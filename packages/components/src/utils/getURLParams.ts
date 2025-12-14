/**
 * 获取URL参数
 * @param url 需要解析的URL字符串
 * @returns 包含所有查询参数的对象
 */
/**
 * 从URL中解析查询参数
 * @param {string} url - 包含查询参数的URL字符串
 * @param {string} [name] - 可选参数，指定要获取的特定参数名
 * @returns {Record<string, any>|any} 当name参数未提供时返回包含所有参数的键值对对象，否则返回指定参数的值
 */
export function getURLQueryParams<R = Record<string, any>>(
    url: string | undefined | null,
    name?: string
): R | undefined {
    if (!url) return;
    const params: Record<string, any> = {};
    const search = url.split("?")[1];
    if (search) {
        const searchParams = new URLSearchParams(search);
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
    }
    return (name ? params[name] : params) as R;
}
