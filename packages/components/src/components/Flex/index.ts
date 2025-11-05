/**
 * AutoFlex - 基于 Web Components 的灵活布局容器
 */
import { LitElement, PropertyValues, html } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { styles } from './styles'
import type { FlexAlign, FlexDirection, FlexJustifyContent } from '@/types/csstypes'

@customElement('auto-flex')
export class AutoFlex extends LitElement {
    static styles = styles
    /** 显示边框 */
    @property({ type: Number })
    border: number = 0
    /** 是否换行 */
    @property({ type: Boolean, reflect: true })
    wrap: boolean = false

    /** 是否显示圆角 */
    @property({ type: Boolean, reflect: true })
    radius: boolean = false

    @property({ type: Boolean, reflect: true })
    equal: boolean = false

    /** 主轴对齐 */
    @property({ type: String })
    justify: FlexJustifyContent = 'center'

    /** 主轴方向 */
    @property({ type: String })
    direction: FlexDirection = 'row'

    /** 交叉轴对齐 */
    @property({ type: String })
    align: FlexAlign = 'center'

    /** 间距（如 '8px'） */
    @property({ type: String })
    gap: string = '0px'

    /** 充满父容器 */
    @property({ type: Boolean, reflect: true })
    fit?: boolean

    /** flex-grow */
    @property({ type: String })
    grow?: string

    /** flex-shrink */
    @property({ type: String })
    shrink?: string

    private _updateFlexGrowShrink(attr: 'grow' | 'shrink') {
        const assigned = this._getChildren()
        let target: Element | null = null
        if (typeof this[attr] === 'string' && this[attr].trim().length > 0) {
            const gv = this[attr].trim()
            if (gv === 'first') {
                target = assigned[0] ?? null
            } else if (gv === 'last') {
                target = assigned.length ? assigned[assigned.length - 1] : null
            } else {
                // selector in light DOM scope
                try {
                    target = this.querySelector(gv)
                } catch {
                    target = null
                }
            }
        }
        if (target instanceof HTMLElement) {
            target.style[attr === 'grow' ? 'flexGrow' : 'flexShrink'] = '1'
        }
    }
    protected firstUpdated(_changedProperties: PropertyValues): void {
        this._updateGap()
        this._updateGap()
        this._updateFlexGrowShrink('grow')
        this._updateFlexGrowShrink('shrink')
        this._updateRadius()
    }
    private _getChildren() {
        const slot = this.renderRoot.querySelector('slot')
        return Array.from(slot ? (slot as HTMLSlotElement).assignedElements({ flatten: true }) : []) as HTMLElement[]
    }
    private _updateGap() {
        // gap -> CSS var --gap
        if (typeof this.gap === 'string' && this.gap.trim().length > 0) {
            this.style.setProperty('--gap', this.gap)
        } else {
            this.style.removeProperty('--gap')
        }
    }
    private _updateRadius() {
        const children = this._getChildren()
        if (children.length === 0) return
        if (!this.radius) return
        if (this.direction === 'row') {
            children[0].style.borderTopLeftRadius = 'var(--auto-border-radius)'
            children[0].style.borderBottomLeftRadius = 'var(--auto-border-radius)'
            children[children.length - 1].style.borderTopRightRadius = 'var(--auto-border-radius)'
            children[children.length - 1].style.borderBottomRightRadius = 'var(--auto-border-radius)'
        } else {
            children[0].style.borderTopLeftRadius = 'var(--auto-border-radius)'
            children[0].style.borderTopRightRadius = 'var(--auto-border-radius)'
            children[children.length - 1].style.borderBottomLeftRadius = 'var(--auto-border-radius)'
            children[children.length - 1].style.borderBottomRightRadius = 'var(--auto-border-radius)'
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
