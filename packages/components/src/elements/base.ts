import type { Primitive } from '@/types'
import { LitElement } from 'lit'
import { state } from 'lit/decorators.js'

export class AutoElementBase<Props extends Record<string, Primitive> = Record<string, Primitive>> extends LitElement {
    @state()
    props: Props = {} as Props

    getSlots() {
        const slot = this.renderRoot.querySelector('slot')
        return Array.from(slot ? (slot as HTMLSlotElement).assignedElements({ flatten: true }) : []) as HTMLElement[]
    }

    private toKebabCase(name: string): string {
        return name
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/_/g, '-')
            .toLowerCase()
    }

    private applyValueToElement(key: string, value: unknown) {
        const attr = this.toKebabCase(key)
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

    private syncPropsToElements() {
        if (!this.renderRoot) return
        Object.entries(this.props ?? {}).forEach(([key, value]) => {
            this.applyValueToElement(key, value)
        })
    }

    protected firstUpdated(): void {
        // 初次渲染后同步
        this.syncPropsToElements()
    }

    protected updated(changed: Map<string | number | symbol, unknown>): void {
        // 当 props 引用发生变化时，同步到具有同名属性的元素
        if (changed.has('props')) {
            this.syncPropsToElements()
        }
    }

    connectedCallback(): void {
        super.connectedCallback()
        // 在已连接阶段确保存在时也进行一次兜底同步（如自定义渲染时机不同步）
        queueMicrotask(() => this.syncPropsToElements())
    }
}
