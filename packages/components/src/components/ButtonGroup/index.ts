/**
 *
 *
 *  按钮组
 *
 *
 */
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { when } from 'lit/directives/when.js'

import { styles } from './styles'
import { AutoElementBase } from '../../elements/base'
import { ifDefined } from 'lit/directives/if-defined.js'
import { styleMap } from 'lit/directives/style-map.js'

export interface AutoButtonGroupProps {
    /**
     * 垂直布局显示图标和文字
     */
    vertical?: boolean

    gap?: string | number
}

@customElement('auto-button-group')
export class AutoButtonGroup extends AutoElementBase {
    static styles = styles

    @property({ type: String })
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

    @property({ type: String })
    labelWidth?: string

    @property({ type: String })
    icon?: string

    @property({ type: String })
    gap?: string

    @property({ type: String })
    variant?: 'outline' | 'text' | 'ghost'

    @property({ type: String, reflect: true })
    pill?: boolean

    @property({ type: Boolean, reflect: true })
    disabled?: boolean

    @property({ type: Boolean, reflect: true })
    block?: boolean

    @property({ type: Boolean })
    ghost?: boolean

    @property({ type: Boolean })
    checkgroup?: boolean

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
        }
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
        'auto-button-group': AutoButtonGroup
    }
}
