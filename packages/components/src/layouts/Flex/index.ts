/**
 * AutoFlex - 基于 Web Components 的灵活布局容器
 */
import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { styles } from './styles'
import type { FlexAlign, FlexDirection, FlexJustifyContent, FlexShrink } from '@/types/csstypes'

@customElement('auto-flex')
export class AutoFlex extends LitElement {
    static styles = styles
    /** 显示边框 */
    @property({ type: Number, reflect: true })
    border: number = 0
    /** 是否换行 */
    @property({ type: Boolean, reflect: true })
    wrap: boolean = true

    @property({ type: Boolean, reflect: true })
    equal: boolean = false

    /** 主轴对齐 */
    @property({ type: String, reflect: true })
    justify: FlexJustifyContent = 'center'

    /** 主轴方向 */
    @property({ type: String, reflect: true })
    direction: FlexDirection = 'row'

    /** 交叉轴对齐 */
    @property({ type: String, reflect: true })
    align: FlexAlign = 'center'

    /** 间距（如 '8px'） */
    @property({ type: String, reflect: true })
    gap?: string

    /** 充满父容器 */
    @property({ type: Boolean, reflect: true })
    fit?: boolean

    /** flex-grow 值（当本组件作为父容器子项时生效） */
    @property({ type: Number, reflect: true })
    grow?: number

    /** flex-shrink 值（当本组件作为父容器子项时生效） */
    @property({ type: Number, reflect: true })
    shrink?: FlexShrink

    protected updated(): void {
        // gap -> CSS var --gap
        if (typeof this.gap === 'string' && this.gap.trim().length > 0) {
            this.style.setProperty('--gap', this.gap)
        } else {
            this.style.removeProperty('--gap')
        }

        // grow -> CSS var --flex-grow
        if (typeof this.grow === 'number' && !Number.isNaN(this.grow)) {
            this.style.setProperty('--flex-grow', String(this.grow))
        } else {
            this.style.removeProperty('--flex-grow')
        }

        // shrink -> CSS var --flex-shrink
        const shrinkNum = typeof this.shrink === 'number' ? this.shrink : undefined
        if (typeof shrinkNum === 'number' && !Number.isNaN(shrinkNum)) {
            this.style.setProperty('--flex-shrink', String(shrinkNum))
        } else {
            this.style.removeProperty('--flex-shrink')
        }
    }

    render() {
        return html`<slot></slot>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-flex': AutoFlex
    }
}
