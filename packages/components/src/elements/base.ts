import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { toKebabCase } from "@/utils/toKebabCase";
import { getVal } from "autostore";
import { isPrimitive } from "@/utils/isPrimitive";
import { parseRelaxedJson } from "@/utils/parseRelaxedJson";

/**
 *
 */
export class AutoElementBase<
    State extends Record<string, any> = Record<string, any>
> extends LitElement {
    /**
     * 反射属性，用于将state中的值反射到元素的属性中
     *
     * - 全部反射：reflectAttrs="all"，将state所有项均反射到元素属性上
     * - 只反射state中的指定属性：reflectAttrs="path1,path2,a.b.c,fromPath:attrName"
     *    代表：
     *    - 将state.path1反射到元素的path1属性上
     *    - 将state.path2反射到元素的path2属性上
     *    - 将state.a.b.c反射到元素的c属性上
     *    - 将state.fromPath反射到元素的attrName属性上
     */
    @property({ type: String })
    reflectAttrs: string = "all";

    @property({ type: Object })
    state: State = {} as State;

    /**
     *
     * 初始化状态
     */
    onInitState() {}

    trigger(eventName: string, detail?: any) {
        this.dispatchEvent(
            new CustomEvent(eventName, {
                detail,
                bubbles: true,
                composed: true,
            })
        );
    }

    private applyValueToElement(key: string, value: unknown) {
        const attr = toKebabCase(key);
        // 布尔与空值优先处理：布尔用存在性表示，空值删除属性
        if (typeof value === "boolean") {
            if (value) {
                this.setAttribute(attr, "");
            } else {
                this.removeAttribute(attr);
            }
        } else if (value === null || value === undefined) {
            this.removeAttribute(attr);
        } else {
            this.setAttribute(attr, String(value));
        }
    }

    /**
     * 将组件的state属性同步到DOM元素的属性上
     *
     * 根据reflectAttrs配置决定同步方式：
     * 1. 当reflectAttrs为'all'时，同步所有state属性
     * 2. 当reflectAttrs为字符串时，按指定路径同步特定属性
     *
     * 属性路径支持两种格式：
     * 1. 直接映射：'propName' 将state.propName映射到同名属性
     * 2. 重命名映射：'stateProp:attrName' 将state.stateProp映射到attrName属性
     *
     * 注意：只同步非对象类型的值，避免将复杂对象映射到DOM属性
     */
    private syncStateToAttrs() {
        if (!this.renderRoot) return;
        const state =
            typeof this.state === "object"
                ? this.state
                : ((typeof this.state === "string"
                      ? parseRelaxedJson(this.state)
                      : {}) as Record<string, any>);
        if (this.reflectAttrs === "all") {
            Object.entries(state).forEach(([key, value]) => {
                this.applyValueToElement(key, value);
            });
        } else if (typeof this.reflectAttrs === "string") {
            const attrs = this.reflectAttrs
                .split(",")
                .map((attr) => attr.trim());
            const Empty = Symbol();
            attrs.forEach((attr) => {
                const [statePath, attrName] = attr.split(":");
                const key = attrName || statePath;
                const value = getVal(this.state, statePath, Empty);
                if (value !== Empty) {
                    if (isPrimitive(typeof value)) {
                        this.applyValueToElement(key, value);
                    }
                }
            });
        }
    }
    protected firstUpdated(): void {
        // 初次渲染后同步
        this.syncStateToAttrs();
    }

    protected updated(changed: Map<string | number | symbol, unknown>): void {
        // 当 props 引用发生变化时，同步到具有同名属性的元素
        if (changed.has("state") || changed.has("reflectAttrs")) {
            this.syncStateToAttrs();
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.onInitState();
        // 在已连接阶段确保存在时也进行一次兜底同步（如自定义渲染时机不同步）
        queueMicrotask(() => this.syncStateToAttrs());
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
    }
    refresh() {
        this.requestUpdate();
    }
}
