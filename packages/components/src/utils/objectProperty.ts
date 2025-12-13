import { property } from "lit/decorators.js";
import { parseRelaxedJson } from "./parseRelaxedJson";
import type { PropertyDeclaration } from "lit";

/**
 * 对象属性装饰器，用于包装 property 装饰器
 * 专门处理对象类型的属性，使用 jsonParser 进行值转换
 *
 * 支持宽松JSON字符串
 *
 * @param options - Lit property 装饰器选项
 * @returns 装饰器函数
 *
 * @example
 * ```typescript
 * class MyElement extends LitElement {
 *   @objectProperty()
 *   data: Record<string, any> = {};
 * }
 * ```
 */
export function objectProperty<
    T extends Record<string, any> = Record<string, any>
>(options?: PropertyDeclaration) {
    return function (target: any, propertyKey: string) {
        // 设置属性类型为 Object
        const propertyOptions = {
            ...options,
            type: Object as any,
            reflect: false,
            converter: {
                fromAttribute: (value: string | null): T | undefined => {
                    if (value === null || value === undefined) return undefined;
                    try {
                        return parseRelaxedJson<T>(value);
                    } catch (error) {
                        console.warn(
                            `Failed to parse object property "${propertyKey}" from attribute:`,
                            error
                        );
                        return undefined;
                    }
                },
                toAttribute: (value: T | undefined): string | null => {
                    if (value === undefined || value === null) return null;
                    try {
                        return JSON.stringify(value);
                    } catch (error) {
                        console.warn(
                            `Failed to stringify object property "${propertyKey}":`,
                            error
                        );
                        return null;
                    }
                },
            },
        };

        // 应用 Lit 的 property 装饰器
        return property(propertyOptions)(target, propertyKey);
    };
}
