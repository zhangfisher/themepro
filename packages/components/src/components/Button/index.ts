/**
 *
 *
 *
 */
import { html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { when } from 'lit/directives/when.js'

import { styles } from './styles'
import { AutoElementBase } from '../../elements/base'
import { styleMap } from 'lit/directives/style-map.js'
import { ClickRipple } from '@/controllers/clickRipple'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

export type AutoButtonTag = {
    id: string
    /**
     * 如果checkable=true
     * 可以使用多个图标，使用,分开，如：icon="icon1,icon2"
     * 当checkable=true时，可以切换图标
     */
    icon?: string
    label?: string
    tips?: string
    /**
     * 显示额外的形状
     */
    shape?: 'none' | 'circle' | 'radius' | 'rectangle'
    /**
     * 可复选
     */
    checkable?: boolean
    /**
     *  复选值
     * 当为可复选时，表示当前选中状态的值
     * 默认是[true,false]
     * 比如：values:[1,2]，则表示选中时是1，否则是2
     */
    checkValues?: any[]
    onClick?: (e: MouseEvent) => void
    /**
     * 可复选时
     * @param e
     * @returns
     */
    onChange?: (e: MouseEvent) => void
}

export type AutoButtonTags = AutoButtonTag[]

export interface AutoButtonProps {
    /**
     * 按钮尺寸
     */
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
    /**
     * 按钮文字
     */
    label?: string
    /**
     * 按钮文字最大宽度
     */
    labelWidth?: string
    /**
     * 指定label的flex-grow=1
     */
    labelGrow?: boolean
    /**
     * 垂直布局显示图标和文字
     */
    vertical?: boolean
    /**
     * 当按钮为checked时
     */
    value?: any
    /**
     * 按钮类型
     */
    type?: 'default' | 'primary' | 'info' | 'danger' | 'warning' | 'success' | 'error'
    /**
     * 按钮样式
     *
     * - default: 同时显示图标和文字
     * - icon: 只显示图标
     * - text: 只显示文字
     * - ghost: 背景透明
     * - link: 链接样式
     * - outline:
     */
    variant?: 'default' | 'outline' | 'ghost' | 'link'
    /**
     * 图标名称
     */
    icon?: string
    /**
     * 形状
     */
    shape?: 'default' | 'circle' | 'pill'
    /**
     * 显示加载中图标
     * 如果是数字，则表示n毫秒后自动隐藏
     */
    loading?: boolean | number
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     *  复选值
     */
    checkValues?: any[]
    /**
     * 复选样式

     * - default: 默认样式,显示不一样的背景
     * - before-check: 前置打勾
     * - after-check: 后置打勾
     * - corner-mark: 角标
     * 
     */
    checkStyle?: 'default' | 'before-check' | 'after-check' | 'corner-mark'
    /**
     * 是否可以复选
     */
    checkable?: boolean
    /**
     * 是否选中
     */
    checked?: boolean
    /**
     * 是否显示块级按钮
     */
    block?: boolean
    /**
     * 显示额外的标签,标签可以是:
     * - 图标:
     * - 文字:
     *
     */
    tags: string | string[] | AutoButtonTags

    onClick?: (e: MouseEvent) => void

    onChange?: (e: MouseEvent) => void
}

@customElement('auto-button')
export class AutoButton extends AutoElementBase<AutoButtonProps> {
    static styles = [styles, ClickRipple.styles]

    ripple = new ClickRipple(this)

    @property({ type: String, reflect: true })
    type?: 'default' | 'primary' | 'info' | 'danger' | 'warning' | 'success' | 'link' = 'default'

    @property({ type: String })
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

    @property({ type: String })
    label?: string

    @property({ type: String })
    labelWidth?: string

    @property({ type: Boolean, reflect: true })
    labelGrow: boolean = false

    @property({ type: String })
    icon?: string

    @property({ type: String, reflect: true })
    variant?: 'default' | 'outline' | 'ghost' | 'link'

    @property({ type: String, reflect: true })
    shape?: 'default' | 'circle' | 'pill' | 'rectangle' | 'rect'

    @property({ type: Boolean, reflect: true })
    loading?: boolean

    @property({ type: Boolean, reflect: true })
    disabled?: boolean

    @property({ type: Boolean, reflect: true })
    block?: boolean

    @property({ type: Boolean, reflect: true })
    vertical?: boolean

    @property({ type: Boolean, reflect: true })
    checkable: boolean = false
    /**
     * 复选值，默认是[true,false]
     * 点击时在checkValues中轮换
     */
    @property({ type: Array, reflect: true })
    checkValues?: any[]

    @property({ type: Boolean, reflect: true })
    checked: boolean = false

    @property({ type: Number })
    badge: number = 0

    @property({ type: String })
    tags?: string | string[] | AutoButtonTags

    @property()
    value?: any = false

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
        this.addEventListener('click', this._onClick as EventListener, true)
        this.addEventListener('keydown', this._onKeyDown as EventListener)
    }

    disconnectedCallback(): void {
        this.removeEventListener('click', this._onClick as EventListener, true)
        this.removeEventListener('keydown', this._onKeyDown as EventListener)
        super.disconnectedCallback()
    }

    private _handleCheckEvent(e: MouseEvent) {
        const checkValues = this.state?.checkValues || this.checkValues || [true, false]
        if (checkValues.length < 2) checkValues.push(false)
        this.value = this.value === checkValues[0] ? checkValues[1] : checkValues[0]
        // 触发组件自定义点击事件，便于外部监听（如 Storybook actions）
        this.checked = this.value === checkValues[0]
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: this.value,
                bubbles: true,
                composed: true,
            }),
        )
    }
    private _isClickTag(e: MouseEvent) {
        const path = e.composedPath()
        for (const element of path) {
            if (element instanceof HTMLElement && element.classList.contains('tag')) {
                this._handleTagClick(element)
                return true
            }
        }
        return false
    }

    private _handleTagClick(el: HTMLElement) {
        console.log('click tag', el)
    }

    private _onClick = (e: MouseEvent) => {
        if (this._isClickTag(e)) {
            e.stopPropagation()
            return
        }
        if (this.disabled || this.loading) {
            e.stopImmediatePropagation()
            e.preventDefault()
            return
        }
        this._handleCheckEvent(e)
        // 触发组件自定义点击事件，便于外部监听（如 Storybook actions）
        this.dispatchEvent(
            new CustomEvent('autoclick', {
                detail: {
                    checked: this.value,
                },
                bubbles: true,
                composed: true,
            }),
        )
    }

    private _onKeyDown = (e: KeyboardEvent) => {
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

    private _renderBadge() {
        return html`${when(this.badge > 0, () => html`<span class="badge"></span>`)}`
    }
    private _getTags(): AutoButtonTags {
        const tags = (typeof this.tags === 'string' ? this.tags.split(',') : this.tags || []) as any[]
        return tags
            .map((tag) => {
                return Object.assign(
                    {},
                    typeof tag === 'string' ? (tag.startsWith('@') ? { label: tag.substring(1) } : { icon: tag }) : tag,
                )
            })
            .filter((tag) => tag) as AutoButtonTags
    }
    private _renderTag(tag: AutoButtonTag) {
        return html`<span class="tag">
                ${when(tag.icon, () => html`<auto-icon inherit name="${tag.icon!}"></auto-icon>`)}
                ${tag.label}
            </span>`
    }
    private _renderTags() {
        const tags = this._getTags()
        if (tags.length === 0) return
        return html`${when(this.tags, () => {
            return html`<auto-flex class="tags" gap="0.1em">
                ${repeat(tags, (tag) => {
                    return html`${this._renderTag(tag)}`
                })}
            </auto-flex>`
        })}`
    }
    render() {
        if (this.shape === 'circle') this.ripple.center = true
        return html`
                ${when(this.loading, () => html`<auto-icon inherit name="loading"></auto-icon>`)} 
                ${when(this.icon, () => html`<auto-icon inherit size=${ifDefined(this.vertical || this.shape === 'circle' ? '1.5em' : undefined)} name="${this.icon!}"></auto-icon>`)}
                ${when(
                    this.label,
                    () =>
                        html`<span class='label' style=${styleMap({
                            '--label-width': this.labelWidth,
                        })}>${this.label}</span>`,
                )}
                ${this._renderBadge()}
                ${this._renderTags()}
                
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-button': AutoButton
    }
}
