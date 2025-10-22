/**
 *
 *
 *
 */
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { when } from 'lit/directives/when.js'

import { styles } from './styles'
import { AutoElementBase } from '../../elements/base'
import { styleMap } from 'lit/directives/style-map.js'

export interface AutoButtonProps {
    /**
     * 按钮文字
     */
    label?: string

    /**
     * 按钮文字最大宽度
     */
    labelWidth?: string
    /**
     * 垂直布局显示图标和文字
     */
    vertical?: boolean
    /**
     *
     */
    /**
     * 按钮类型
     */
    type?: 'default' | 'primary' | 'info' | 'danger' | 'warning' | 'success'
    /**
     * 按钮样式
     *
     * - default: 同时显示图标和文字
     * - icon: 只显示图标
     * - text: 只显示文字
     * - ghost: 背景透明
     * - link: 链接样式
     * - outline:
     *
     */
    variant?: 'default' | 'outline' | 'ghost' | 'link'
    /**
     * 按钮尺寸
     */
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
    /**
     * 图标名称
     */
    icon?: string
    /**
     * 形状
     */
    shape?: 'default' | 'circle' | 'pill'
    /**
     * 在按钮文字后面显示
     */
    loading?: boolean
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 是否选中
     */
    checked?: boolean
    /**
     * 是否显示块级按钮
     */
    block?: boolean
}

@customElement('auto-button')
export class AutoButton extends AutoElementBase {
    static styles = styles

    @property({ type: String, reflect: true })
    type?: 'default' | 'primary' | 'info' | 'danger' | 'warning' | 'success' | 'link' = 'default'

    @property({ type: String })
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

    @property({ type: String })
    label?: string

    @property({ type: String })
    labelWidth?: string

    @property({ type: String })
    icon?: string

    @property({ type: String, reflect: true })
    variant?: 'default' | 'outline' | 'ghost' | 'link'

    @property({ type: String, reflect: true })
    shape?: 'circle' | 'round' | 'pill'

    @property({ type: Boolean, reflect: true })
    loading?: boolean

    @property({ type: Boolean, reflect: true })
    disabled?: boolean

    @property({ type: Boolean, reflect: true })
    checked?: boolean

    @property({ type: Boolean, reflect: true })
    block?: boolean

    @property({ type: Boolean, reflect: true })
    vertical?: boolean

    @property()
    value?: any

    protected firstUpdated(): void {
        this.setAttribute('role', 'button')
        if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0')
        this.updateA11y()
        this.applySizeAttributes()
    }

    protected updated(changed: Map<string | number | symbol, unknown>): void {
        if (changed.has('size')) this.applySizeAttributes()
        if (changed.has('disabled') || changed.has('loading')) this.updateA11y()
    }

    private applySizeAttributes() {
        const sizes = ['x-small', 'small', 'medium', 'large', 'x-large'] as const
        sizes.forEach((s) => {
            this.removeAttribute(s)
        })
        const size = this.size
        if (size && size !== 'medium') {
            this.setAttribute(size, '')
        }
    }

    private updateA11y() {
        const disabled = !!this.disabled
        const loading = !!this.loading
        if (disabled) {
            this.setAttribute('aria-disabled', 'true')
        } else {
            this.removeAttribute('aria-disabled')
        }
        if (loading) {
            this.setAttribute('aria-busy', 'true')
        } else {
            this.removeAttribute('aria-busy')
        }
    }

    connectedCallback(): void {
        super.connectedCallback()
        this.addEventListener('click', this.onClick as EventListener)
        this.addEventListener('keydown', this.onKeyDown as EventListener)
    }

    disconnectedCallback(): void {
        this.removeEventListener('click', this.onClick as EventListener)
        this.removeEventListener('keydown', this.onKeyDown as EventListener)
        super.disconnectedCallback()
    }

    private onClick = (e: MouseEvent) => {
        if (this.disabled || this.loading) {
            e.stopImmediatePropagation()
            e.preventDefault()
            return
        }
        // 触发组件自定义点击事件，便于外部监听（如 Storybook actions）
        this.dispatchEvent(
            new CustomEvent('autoclick', {
                detail: this.value,
                bubbles: true,
                composed: true,
            }),
        )
    }

    private onKeyDown = (e: KeyboardEvent) => {
        if (this.disabled || this.loading) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.stopImmediatePropagation()
                e.preventDefault()
            }
            return
        }
        if (e.key === ' ') {
            // 防止页面滚动，模拟按钮按下行为
            e.preventDefault()
            this.click()
        }
    }

    render() {
        return html`
            ${when(this.icon, () => html`<auto-icon name="${this.icon!}"></auto-icon>`)}
            ${when(
                this.label,
                () =>
                    html`<span class='label' style=${styleMap({
                        '--label-width': this.labelWidth,
                    })}>${this.label}</span>`,
            )}
            ${when(this.loading, () => html`<auto-icon name="loading"></auto-icon>`)}
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-button': AutoButton
    }
}
