/**
 * KylinLoading 组件
 *
 * @component
 * @description 功能丰富的加载状态组件,支持加载中、错误、成功三种状态,提供多种动画效果和操作按钮
 *
 * @example
 * <!-- 基础加载 --><kylin-loading message="加载中..."></kylin-loading>
 * <!-- 成功状态 --><kylin-loading status="success" success="操作成功!" closeable></kylin-loading>
 * <!-- 错误状态 --><kylin-loading status="error" error="加载失败" retryable backable></kylin-loading>
 * <!-- 内联模式 --><kylin-loading inline message="处理中..." type="bars"></kylin-loading>
 * <!-- 水平布局 --><kylin-loading row message="请稍候..." description="正在同步数据"></kylin-loading>
 * <!-- 自定义按钮 --><kylin-loading status="loading" message="上传中..." .actions=${[{id:'pause',label:'暂停',icon:'pause'}]}></kylin-loading>
 * <!-- 事件监听 --><script>document.querySelector('kylin-loading').addEventListener('actionclick',e=>console.log(e.detail))</script>
 *
 * @features
 * - 三种状态: loading(加载中)、error(错误)、success(成功)
 * - 五种动画: spin、bars、bubbles、spinning-bubbles、spokes
 * - 内联/覆盖两种显示模式
 * - 水平/垂直两种布局方向
 * - 遮罩层: none/light/dark
 * - 预设操作按钮: cancelable、retryable、backable、closeable
 * - 自定义操作按钮数组,支持状态过滤
 * - 事件委托机制处理按钮点击
 */
import { LitElement, html } from 'lit'
import { property, query } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { BARS_SVG, BUBBLES_SVG, SPIN_SVG, SPINNING_BUBBLES, SPOKES } from './icons'
import { objectProperty } from '@/utils/objectProperty'
import type { KylinButtonProps } from '../Button'
import { repeat } from 'lit/directives/repeat.js'
import { spread } from '@open-wc/lit-helpers'
import '../Button'
import '../Icon'
import { triggerCustomEvent } from '@/utils/triggerCustomEvent'
import { styles } from './styles'
import { assignObject } from 'flex-tools/object/assignObject'
import type { RequiredKeys } from 'flex-tools/types'

const presetSizes = {
    'x-small': 'var(--k-icon-size-x-small)',
    small: 'var(--k-icon-size-small)',
    medium: 'var(--k-icon-size-medium)',
    large: 'var(--k-icon-size-large)',
    'x-large': 'var(--k-icon-size-x-large)',
}

/**
 * KylinLoading 组件的属性类型
 * 从组件类中提取所有 @property 装饰器定义的响应式属性
 *
 * 使用方法：
 * ```ts
 * const props: KylinLoadingProps = {
 *   message: '加载中...',
 *   status: 'loading',
 *   size: 'large',
 *   cancelable: true
 * };
 * ```
 */

export type KylinLoadingStauts = 'loading' | 'error' | 'success'
export type KylinLoadingActions = Array<KylinButtonProps & { status?: KylinLoadingStauts[] }>
export type KylinLoadingActionEventDetail = RequiredKeys<
    KylinButtonProps & {
        status?: KylinLoadingStauts[]
    },
    'id'
>
export interface KylinLoadingProps {
    /** 尺寸：可使用预设值或自定义 CSS 值 */
    size?: string
    /** 内联模式：loading 显示在内容中，而不是覆盖内容 */
    inline?: boolean
    /** 布局方向：row（水平）或 column（垂直），默认 column */
    direction?: 'row' | 'column'
    /** 水平方向别名（等同于 direction="row"） */
    row?: boolean
    /** 垂直方向别名（等同于 direction="column"） */
    column?: boolean
    /** 隐藏加载状态 */
    hide?: boolean
    /** 主要消息文本，默认 "Loading..." */
    message?: string
    /** 错误信息（当 status='error' 时显示） */
    error?: string
    /** 成功信息（当 status='success' 时替代 message） */
    success?: string
    /** 描述文本 */
    description?: string
    /** 主题颜色，默认 "var(--auto-theme-color)" */
    color?: string
    /** 遮罩层样式：none、light 或 dark，默认 "light" */
    mask?: 'none' | 'light' | 'dark'
    /** 深色模式，默认 false */
    dark?: boolean
    /** 浅色模式，默认 false */
    light?: boolean
    /** 加载状态：loading、error 或 success */
    status?: KylinLoadingStauts
    /** 是否显示取消按钮（status='loading' 时），默认 false */
    cancelable?: boolean
    /** 是否显示重试按钮（status='error' 时），默认 false */
    retryable?: boolean
    /** 是否显示返回按钮（status='error' 时），默认 false */
    backable?: boolean
    /** 是否显示关闭按钮（status='success' 时），默认 false */
    closeable?: boolean
    /** 加载动画类型：spin、bars、bubbles、spinning-bubbles 或 spokes */
    type?: 'spin' | 'bars' | 'bubbles' | 'spinning-bubbles' | 'spokes'
    /**
     * 自定义操作按钮数组
     * status决定actions在哪一种状态下显示
     * - 如果为空则在所有状态显示
     * - 如果是数组，则仅在指定状态下显示
     */
    actions?: KylinLoadingActions
}

@customElement('kylin-loading')
export class KylinLoading extends LitElement {
    static styles = styles

    @property({ type: String })
    size?: string

    @property({ type: Boolean, reflect: true })
    inline?: boolean = false

    @property({ type: String, reflect: true })
    direction?: 'row' | 'column' = 'column'

    @property({ type: Boolean, reflect: true })
    row?: boolean

    @property({ type: Boolean, reflect: true })
    column?: boolean

    @property({ type: Boolean, reflect: true })
    hide?: boolean

    @property({
        type: String,
    })
    message: string = 'Loading...'
    /**
     * 当status='error'时，error 为错误信息
     */
    @property({ type: String })
    error?: string
    /**
     * 当status='success'时，success为用于替代message
     */
    @property({ type: String })
    success?: string

    @property({ type: String })
    description?: string

    @property({ type: String })
    color?: string = 'var(--auto-theme-color)'

    @property({ type: String, reflect: true })
    mask: 'none' | 'light' | 'dark' = 'light'

    @property({ type: Boolean, reflect: true })
    dark: boolean = false

    @property({ type: Boolean, reflect: true })
    light: boolean = false

    @property({
        type: String,
        reflect: true,
    })
    status?: 'loading' | 'error' | 'success' = 'loading'

    /**
     * 在status='loading'时是否显示一个cancel action
     * 显示一个{id:'cancel',label:'取消',icon:'no'}的action
     * 可取消
     */
    @property({ type: Boolean, reflect: true })
    cancelable: boolean = false
    /**
     * 在status='error'时是否显示一个retry action
     * 显示一个{id:'refresh',label:'重试',icon:'refresh'}的action
     * 可重试
     */
    @property({ type: Boolean, reflect: true })
    retryable: boolean = false

    /**
     *  在status='error'时是否显示一个back action
     * 显示一个{id:'back',label:'返回',icon:'back'}的action
     * 可返回
     */
    @property({ type: Boolean, reflect: true })
    backable: boolean = false
    /**
     *  在status='success'时是否显示一个close action
     * 显示一个{id:'close',label:'关闭',icon:'no'}的action
     * 可关闭
     */
    @property({ type: Boolean, reflect: true })
    closeable: boolean = false

    @property({ type: String, reflect: true })
    type?: 'spin' | 'bars' | 'bubbles' | 'spinning-bubbles' | 'spokes'
    /**
     * 提供额外的动作
     */
    @objectProperty()
    actions?: Array<KylinButtonProps & { status?: KylinLoadingStauts[] }>

    @query('.actions')
    actionsEl?: HTMLElement

    @query('.content')
    contentEl?: HTMLElement

    updated(changedProperties: Map<string, any>) {
        super.updated(changedProperties)
        // 当 cancelable 属性变化时，确保组件重新渲染以显示/隐藏取消按钮
        if (changedProperties.has('cancelable')) {
            this.requestUpdate()
        }
    }

    connectedCallback() {
        super.connectedCallback()
        setTimeout(() => {
            // 使用事件委托，将监听器绑定到始终存在的 .content 容器上
            // 这样即使 .actions 元素动态创建/销毁，事件监听依然有效
            this.contentEl?.addEventListener('click', this._onActionClick as EventListener, true)
        })
    }

    disconnectedCallback() {
        this.contentEl?.removeEventListener('click', this._onActionClick as EventListener)
        super.disconnectedCallback()
    }

    /**
     * 处理 action 按钮的 click 事件
     *
     * 使用事件委托机制：监听器绑定在 .content 容器上，
     * 通过检查 event.target 是否包含 .action 类来过滤点击事件
     *
     * 优势：
     * 1. 避免动态创建/销毁 .actions 元素时事件监听器失效
     * 2. 减少事件监听器数量，提升性能
     * 3. 无需在每次 actions 更新时重新绑定事件
     *
     * 1. 触发 action:click 事件（向后兼容）
     * 2. 触发 actionclick 事件（新功能，传递完整 action 对象）
     */
    private _onActionClick = (event: Event) => {
        const actionEl = event.target as HTMLElement

        // 事件委托：只处理具有 .action 类的按钮元素
        // closest() 方法确保即使点击的是按钮内部元素（如 icon、文本），也能正确识别
        const actualButton = actionEl?.closest('.action')
        if (!actualButton) {
            return
        }

        // 从实际的按钮元素上获取 data-id
        const actionId = (actualButton as HTMLElement).dataset.id

        // 2. 查找对应的 action 对象
        const displayActions = this._getActions()
        const action = displayActions?.find((a) => a.id === actionId || a.label === actionId)

        if (action) {
            // 处理取消和关闭按钮的默认行为
            if (['cancel', 'close', 'back'].includes(actionId as any)) {
                this.hide = true
            }
            // 3. 触发 actionclick 事件，传递完整的 action 对象
            triggerCustomEvent(this, 'actionclick', action)
        }

        event.stopPropagation()
    }

    private getSvgIcon() {
        switch (this.type) {
            case 'bars':
                return BARS_SVG
            case 'bubbles':
                return BUBBLES_SVG
            case 'spinning-bubbles':
                return SPINNING_BUBBLES
            case 'spokes':
                return SPOKES
            default:
                return SPIN_SVG
        }
    }
    private _getActions() {
        const status = this.status
        const actions = [...(this.actions || [])]
        const presetActions = [
            {
                id: 'cancel',
                label: '取消',
                icon: 'no',
                type: 'danger',
                status: 'loading',
            },
            {
                id: 'retry',
                label: '重试',
                icon: 'refresh',
                type: 'primary',
                status: 'error',
            },
            {
                id: 'back',
                label: '返回',
                icon: 'back',
                status: [],
            },
            {
                id: 'close',
                label: '关闭',
                icon: 'no',
            },
        ] as KylinLoadingActions
        //
        presetActions.forEach((presetAction) => {
            const index = actions.findIndex((act) => act.id === presetAction.id)
            if (index === -1) {
                // @ts-expect-error
                if (this[`${presetAction.id}able`]) {
                    actions.push(presetAction)
                }
            } else {
                actions[index] = assignObject({}, presetAction, actions[index])
            }
        })
        //
        const displayActions = actions.filter((action) => {
            if (!action.status) return true
            return status ? action.status.includes(status) : false
        })

        return displayActions.length > 0 ? displayActions : undefined
    }

    private _renderIcon() {
        // 根据状态渲染不同的图标
        if (this.status === 'error') {
            return html`<kylin-icon
                size="calc(2 * var(--auto-font-size))"
                color="red"
                name="error"
            ></kylin-icon>`
        }
        if (this.status === 'success') {
            return html`<kylin-icon
                size="calc(2 * var(--auto-font-size))"
                color="green"
                name="success"
            ></kylin-icon>`
        }
        // 默认 loading 状态使用 SVG 动画
        const svgIcon = this.getSvgIcon()
        return html`${unsafeHTML(svgIcon)}`
    }

    private _renderMessage() {
        if (!this.message && !this.error) return html``
        const content =
            this.status === 'error' && this.error
                ? this.error // 当 status 为 error 时，优先显示 error 属性的内容
                : this.message

        return html`<div class="message">${unsafeHTML(content)}</div>`
    }
    private _renderActions() {
        const displayActions = this._getActions()
        if (!displayActions || displayActions.length === 0) return
        return html`<div class="actions">
            ${repeat(displayActions!, (action: any) => {
                return html`<kylin-button
                    class="action"
                    ${spread(action)}
                    data-id="${action.id || action.label}"
                ></kylin-button>`
            })}
        </div>`
    }
    private _renderDetail() {
        if (!this.description) return
        return html`<div class="detail">${unsafeHTML(this.description)}</div>`
    }
    render() {
        const iconColor = this.color || 'var(--auto-theme-color)'
        const size = this.size
            ? this.size in presetSizes
                ? (presetSizes as any)[this.size]
                : this.size
            : 'var(--auto-font-size)'
        const isRow = this.row || this.direction === 'row'
        const iconSize = isRow ? size : `calc(1.5 * ${size})`
        const mask = this.mask === 'light' ? 'var(--auto-bgcolor)' : this.mask === 'dark' ? 'black' : 'transparent'

        return html`
            <style>
                :host {
                    --mask-bgcolor: ${mask};
                    --icon-size: ${iconSize};
                    --hide: ${this.hide ? 'block' : 'none'};
                }
            </style>
            <div class="mask"></div>
            <div class="content" style="color:${iconColor};">
                ${this._renderIcon()} ${this._renderMessage()}
                ${this._renderDetail()} ${this._renderActions()}
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'kylin-loading': KylinLoading
    }
}
