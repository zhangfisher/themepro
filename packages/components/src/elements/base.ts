import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { toKebabCase } from '@/utils/toKebabCase'
import { getVal } from 'autostore'

/**
 *
 */
export class AutoElementBase<State extends Record<string, any> = Record<string, any>> extends LitElement {
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
    reflectAttrs: string = 'all'

    @property({ type: Object })
    state?: State

    get shadow() {
        return this.shadowRoot!
    }

    private applyValueToElement(key: string, value: unknown) {
        const attr = toKebabCase(key)
        // 布尔与空值优先处理：布尔用存在性表示，空值删除属性
        if (typeof value === 'boolean') {
            if (value) {
                this.setAttribute(attr, '')
            } else {
                this.removeAttribute(attr)
            }
        } else if (value === null || value === undefined) {
            this.removeAttribute(attr)
        } else if (typeof value === 'string' || typeof value === 'number') {
            this.setAttribute(attr, String(value))
        }
    }

    private syncStateToAttrs() {
        if (!this.renderRoot) return
        if (this.reflectAttrs === 'all') {
            Object.entries(this.state ?? {}).forEach(([key, value]) => {
                this.applyValueToElement(key, value)
            })
        } else if (typeof this.reflectAttrs === 'string') {
            const attrs = this.reflectAttrs.split(',').map((attr) => attr.trim())
            attrs.forEach((attr) => {
                const [statePath, attrName] = attr.split(':')
                const key = attrName || statePath
                const value = getVal(this.state, statePath)
                if (value !== undefined && typeof value !== 'object') {
                    this.applyValueToElement(key, value)
                }
            })
        }
    }
    protected firstUpdated(): void {
        // 初次渲染后同步
        this.syncStateToAttrs()
    }

    protected updated(changed: Map<string | number | symbol, unknown>): void {
        // 当 props 引用发生变化时，同步到具有同名属性的元素
        if (changed.has('state') || changed.has('reflectAttrs')) {
            this.syncStateToAttrs()
        }
    }

    connectedCallback(): void {
        super.connectedCallback()
        // 在已连接阶段确保存在时也进行一次兜底同步（如自定义渲染时机不同步）
        queueMicrotask(() => this.syncStateToAttrs())
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
    }
    refresh() {
        this.requestUpdate()
    }
}
