import { classMap } from 'lit/directives/class-map.js'
import { spread } from '@open-wc/lit-helpers'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { when } from 'lit/directives/when.js'
import { styles } from './styles'
import { AutoElementBase } from '../../elements/base'
import { styleMap } from 'lit/directives/style-map.js'
import { ClickRipple } from '@/controllers/clickRipple'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'
import { getId } from '@/utils/getId'
import { isFunction } from '@/utils/isFunction'
import { camelToKebab } from '@/utils/camelToKebab'
import '../Flex'
import '../Icon'

export type AutoButtonTag = {
    id?: string
    /**
     * 如果checkable=true
     * 可以使用多个图标，使用,分开，如：icon="icon1,icon2"
     * 当checkable=true时，可以切换图标
     */
    icon: string
    label?: string
    tooltip?: string
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
    /**
     * 当checkable=true时，表示当前选中状态的值
     */
    value?: any
    /**
     * 额外添加dataset数据
     */
    dataset?: Record<string, string>
    onClick?: (args: { tag: AutoButtonTag; button: AutoButton; event: MouseEvent }) => void
    /**
     * 可复选时
     * @param e
     * @returns
     */
    onChange?: (args: { tag: AutoButtonTag; button: AutoButton; event: MouseEvent }) => void
}

export type AutoButtonTags = AutoButtonTag[]

export interface AutoButtonProps {
    id?: string
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
     * outline样式别名，相当于variant='outline'
     */
    outline?: boolean
    /**
     * ghost样式别名，相当于variant='ghost'
     */
    ghost?: boolean
    /**
     * link样式别名，相当于variant='link'
     */
    link?: boolean
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
     * 是否显示阴影
     */
    shadow?: boolean
    /**
     *  复选值
     */
    checkValues?: any[]
    /**
     * 复选标识位置

     * - default: 默认样式,显示不一样的背景
     * - before: 前置打勾
     * - after: 后置打勾
     * - corner: 角标
     * 
     */
    checkPos?: 'default' | 'before' | 'after' | 'corner'
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
     */
    tags?: AutoButtonTags

    onClick?: (args: AutoButton) => void

    onChange?: (args: AutoButton) => void
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
    variant?: 'default' | 'outline' | 'ghost' | 'link' = 'outline'

    @property({ type: String, reflect: true })
    shape?: 'default' | 'circle' | 'pill' | 'rectangle' | 'rect'

    @property({ type: Boolean, reflect: true })
    loading?: boolean

    @property({ type: Boolean, reflect: true })
    shadow?: boolean

    @property({ type: Boolean, reflect: true })
    disabled?: boolean

    @property({ type: Boolean, reflect: true })
    block?: boolean

    @property({ type: Boolean, reflect: true })
    vertical?: boolean

    @property({ type: Boolean, reflect: true })
    outline?: boolean

    @property({ type: Boolean, reflect: true })
    ghost?: boolean

    @property({ type: Boolean, reflect: true })
    link?: boolean

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
    @property({ type: String, reflect: true })
    checkPos?: 'default' | 'before' | 'after' | 'corner'

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

        // 处理属性别名逻辑
        this._handleVariantAliases(changed)
    }

    private _handleVariantAliases(changed: Map<string | number | symbol, unknown>): void {
        // 检查是否有属性别名变化
        if (changed.has('outline') || changed.has('ghost') || changed.has('link')) {
            // 根据boolean属性设置variant
            if (this.outline) {
                this.variant = 'outline'
            } else if (this.ghost) {
                this.variant = 'ghost'
            } else if (this.link) {
                this.variant = 'link'
            } else {
                // 如果所有boolean属性都为false，则重置为default
                this.variant = 'default'
            }
        }
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
    onInitState(): void {
        if (!this.state) this.state = {}
        if (this.state) {
            if (!this.state.tags) this.state.tags = this._getTags()
        }

        // 初始化时处理属性别名
        this._initializeVariantAliases()
    }

    private _initializeVariantAliases(): void {
        // 检查boolean属性并设置对应的variant
        if (this.outline) {
            this.variant = 'outline'
        } else if (this.ghost) {
            this.variant = 'ghost'
        } else if (this.link) {
            this.variant = 'link'
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

    private _handleCheckEvent(_e: MouseEvent) {
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
                this._handleTagClick(element, e)
                return true
            }
        }
        return false
    }

    private _execCallback(callback: undefined | ((...args: any[]) => any), args: any) {
        if (isFunction(callback)) {
            callback(args)
        }
    }
    private _handleTagClick(el: HTMLElement, e: MouseEvent) {
        const tagId = el.dataset.id
        if (this.state?.tags) {
            const tag = this.state.tags.find((tag) => tag.id === tagId)
            if (tag) {
                const args = { tag, button: this, event: e }
                this._execCallback(tag.onClick, args)
                this.trigger('tag/Click', tag)
                if (tag.checkable) {
                    const checkValues = tag.checkValues!
                    const newVal = tag.value === checkValues[0] ? checkValues[1] : checkValues[0]
                    this.checked = newVal
                    tag.value = newVal
                    this._execCallback(tag.onChange, args)
                    this.trigger('tag/change', tag)
                    this.requestUpdate()
                }
            }
        }
    }

    private _onClick = (e: MouseEvent) => {
        if (this._isClickTag(e)) {
            // e.stopPropagation();
            return
        }
        if (this.disabled || this.loading) {
            //e.stopImmediatePropagation();
            e.preventDefault()
            return
        }
        this._handleCheckEvent(e)

        // 触发组件自定义点击事件，便于外部监听（如 Storybook actions）
        const params: Record<string, any> = {}
        if (this.checkable) params.checked = this.value

        this.dispatchEvent(
            new CustomEvent('auto:click', {
                detail: params,
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
        // 如果是字符串，则以逗号分隔
        const tags = (typeof this.tags === 'string' ? this.tags.split(',') : this.tags || []) as any[]
        return tags
            .filter((tag) => tag)
            .map((tagArgs) => {
                const tag = Object.assign(
                    {
                        id: getId(),
                        checkValues: [true, false],
                        checkable: false,
                        value: false,
                    },
                    typeof tagArgs === 'string'
                        ? tagArgs.startsWith('@')
                            ? { label: tagArgs.substring(1) }
                            : { icon: tagArgs }
                        : tagArgs,
                ) as Required<AutoButtonTag>
                if (tag.checkValues.length === 0) tag.checkValues.push(true, false)
                if (tag.checkValues.length === 1) tag.checkValues.push(tag.checkValues[0])
                return tag
            })
    }

    protected _renderTag(tag: AutoButtonTag) {
        const icons = tag.icon!.split(',')

        if (icons.length < 2) icons.push(icons[0])

        const tagClasss: Record<string, any> = {}
        if (tag.checkable) {
            tagClasss.checkable = true
            tagClasss.checked = tag.value === tag.checkValues![0]
        }
        const icon = tag.checkable ? (tag.value === tag.checkValues![0] ? icons[0] : icons[1]) : tag.icon

        const dataset = Object.entries(tag.dataset || {}).reduce<Record<string, string>>((acc, [key, value]) => {
            try {
                acc[`data-${camelToKebab(key)}`] = typeof value === 'object' ? JSON.stringify(value) : value
            } catch {
                acc[`data-${camelToKebab(key)}`] = String(value)
            }
            return acc
        }, {})

        return html`<span
            class="tag ${classMap(tagClasss)}"
            data-id="${tag.id || tag.icon}"
            data-tooltip=${ifDefined(tag.tooltip)}
            ${spread(dataset)}
        >
            ${when(tag.icon, () => html`<auto-icon inherit name="${icon!}"> </auto-icon>`)}
            ${tag.label}
        </span>`
    }

    private _renderTags() {
        const tags = this.state?.tags || []
        if (tags.length === 0) return
        return html`<auto-flex class="tags" gap="0.1em">
            ${repeat(tags, (tag) => {
                return html`${this._renderTag(tag)}`
            })}
        </auto-flex>`
    }
    private _renderChecked(before: boolean = false) {
        return html`<auto-icon
            class="checked ${before ? 'before' : 'after'}"
            inherit
            name="yes"
        ></auto-icon>`
    }
    private _renderUnchecked(before: boolean = false) {
        return html`<auto-icon
            class="checked ${before ? 'before' : 'after'}"
            inherit
            name="empty"
        ></auto-icon>`
    }
    protected renderBefore() {}
    protected renderAfter() {}
    render() {
        if (this.shape === 'circle') this.ripple.center = true
        const isChecked = this.checkable && this.checked
        return html`
            ${this.renderBefore()}
            ${when(this.loading, () => html`<auto-icon inherit name="loading"></auto-icon>`)}
            ${when(!this.loading && !isChecked && this.checkPos === 'before', () => this._renderUnchecked())}
            ${when(!this.loading && isChecked && this.checkPos === 'before', () => this._renderChecked(true))}
            ${when(
                this.icon,
                () =>
                    html`<auto-icon
                        inherit
                        size=${ifDefined(this.vertical || this.shape === 'circle' ? '1.5em' : undefined)}
                        name="${this.icon!}"
                    ></auto-icon>`,
            )}
            ${when(
                this.label,
                () =>
                    html`<span
                        class="label"
                        style=${styleMap({
                            '--label-width': this.labelWidth,
                        })}
                        >${this.label}</span
                    >`,
                () => html`<slot></slot>`,
            )}
            ${this._renderBadge()} ${this._renderTags()}
            ${when(isChecked && this.checkPos === 'after', () => this._renderChecked())}
            ${this.renderAfter()}
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-button': AutoButton
    }
}
