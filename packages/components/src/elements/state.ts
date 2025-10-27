import { consume } from '@lit/context'
import { ThemeProContext, type ThemeProStore } from '../context'
import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { toKebabCase } from '@/utils/toKebabCase'

export class AutoStateElement<State extends Record<string, any> = Record<string, any>> extends LitElement {
    @consume({ context: ThemeProContext })
    @property({ attribute: false })
    store!: ThemeProStore

    @property({ type: String })
    stateKey?: string

    /**
     * 将state中的值同步到属性上，默认不开启
     */
    @property({ type: Boolean })
    reflectState?: boolean

    /**
     * 当前组件的引用
     */
    @property({ type: Object })
    state?: State

    private applyValueToAttribute(key: string, value: unknown) {
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

    private syncStateToAttributes() {
        if (!this.renderRoot) return
        if (!this.state) return
        Object.entries(this.state ?? {}).forEach(([key, value]) => {
            this.applyValueToAttribute(key, value)
        })
    }

    protected firstUpdated(): void {
        // 初次渲染后同步
        this.syncStateToAttributes()
    }

    protected updated(changed: Map<string | number | symbol, unknown>): void {
        // 当 state 引用发生变化时，同步到具有同名属性的元素
        if (changed.has('state')) {
            this.syncStateToAttributes()
        }
    }

    connectedCallback(): void {
        super.connectedCallback()
        // 在已连接阶段确保存在时也进行一次兜底同步（如自定义渲染时机不同步）
        queueMicrotask(() => this.syncStateToAttributes())
    }
}
