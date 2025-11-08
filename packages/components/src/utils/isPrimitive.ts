export function isPrimitive(value: any): boolean {
    // 使用 typeof 检查大多数原始类型
    if (value === null) {
        return true // null 是原始类型
    }

    const type = typeof value
    return type !== 'object' && type !== 'function'
}
