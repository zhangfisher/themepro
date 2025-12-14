/**
 * 检查一个值是否是 Promise-like 对象（具有 then 方法的对象）
 * @param {any} value - 要检查的值
 * @returns {boolean} 如果值是 Promise-like 对象则返回 true，否则返回 false
 */
export function isPromiseLike(value: any): value is PromiseLike<any> {
    return (
        value !== null &&
        typeof value === "object" &&
        typeof value.then === "function"
    );
}
