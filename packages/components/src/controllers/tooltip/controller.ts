/**
 * TooltipController - 轻量级提示框控制器
 */
import type { ReactiveController, ReactiveControllerHost } from 'lit'
import { createThemeproContainer } from '../../utils/createThemeproContainer'
import type { LitElement } from 'lit'
import { parseObjectFromAttr } from '@/utils/parseObjectFromAttr'
import type { TooltipControllerOptions, TooltipPlacement } from './types'
import { TooltipManager } from './manager'
import { parseRelaxedJson } from '@/utils'
import { TooltipRegistry } from './registry'

export class TooltipController implements ReactiveController {
    host: ReactiveControllerHost
    options: TooltipControllerOptions

    tooltips: TooltipManager = new TooltipManager(this)
    private _mouseLeaveTimer?: NodeJS.Timeout
    private _tooltipDelegateHandler?: (e: Event) => void
    private _onMouseMove?: (e: MouseEvent) => void
    private _themeproContainer?: HTMLElement
    private readonly _registry = TooltipRegistry.getInstance()
    constructor(host: ReactiveControllerHost, options: TooltipControllerOptions = {}) {
        this.host = host
        this.options = this._initOptions(options)
        host.addController(this)
    }
    get hostElement() {
        return this.host as LitElement
    }
    /**
     * 全局容器
     */
    get themeproContainer() {
        if (!this._themeproContainer) {
            this._themeproContainer = createThemeproContainer(this.host as LitElement)
        }
        return this._themeproContainer!
    }

    /**
     * 合并配置选项：从 host 属性读取默认值，与传入的 options 合并
     */
    private _initOptions(userOptions?: TooltipControllerOptions): TooltipControllerOptions {
        const hostElement = this.host as any

        const defaultOptions: TooltipControllerOptions = {
            placement: 'top' as TooltipPlacement,
            offset: [0, 4],
            animationDuration: 150,
            animationEasing: 'easeOutQuart',
            arrow: true,
            trigger: 'mouseover',
            delayHide: 0,
            extend: true,
        }

        // 从绑定属性读取配置
        const attrOptions = parseObjectFromAttr(hostElement, `data-${userOptions?.dataPrefix}-options`)

        // 合并配置，用户选项优先级最高
        const opts = {
            ...defaultOptions,
            ...userOptions, // 用户传入的配置（中间层）
            ...attrOptions, // 从属性读取的配置（最高优先级）
        }
        if (!opts.dataPrefix) opts.dataPrefix = 'tooltip'
        if (!opts.className) opts.className = opts.dataPrefix
        if (!opts.cssClass) opts.cssClass = `${opts.dataPrefix}-visible`
        return opts
    }

    /**
     * ReactiveController 生命周期 - host 连接时调用
     */
    hostConnected(): void {
        // 注册到全局 registry
        this._registry.register(this)

        this._setupTriggerEvents()
        this._injectDataset()
    }
    private _injectDataset() {
        const dataset: Record<string, any> =
            typeof this.options.dataset === 'object'
                ? this.options.dataset
                : typeof this.options.dataset === 'string'
                  ? parseRelaxedJson(this.options.dataset)
                  : {}
        if (this.host) {
            Object.entries(dataset).forEach(([name, value]) => {
                const v = (this.host as any).dataset[name]
                if (!v) (this.host as any).dataset[name] = value
            })
        }
    }

    /**
     * ReactiveController 生命周期 - host 更新时调用
     */
    hostUpdate(): void {
        // 只在 trigger 选项改变时才重新设置事件监听器
        const currentTrigger = this.options.trigger
        if (currentTrigger !== this._lastTrigger) {
            console.log('[hostUpdate] Trigger changed from', this._lastTrigger, 'to', currentTrigger)
            this._setupTriggerEvents()
            this._lastTrigger = currentTrigger
        }
    }

    private _lastTrigger?: string

    /**
     * 设置tooltip事件监听
     */
    private _setupTriggerEvents(): void {
        const hostElement = this.host as unknown as HTMLElement

        // 清理之前的监听器
        this._removeTriggerEvents()

        // 设置click事件委托
        this._setupClickEventDelegation(hostElement)

        // 设置mouseover事件监听器
        this._setupMouseoverEventDelegation(hostElement)
    }
    /**
     * 检查元素是否为 tooltip 元素
     * 根据配置的 dataPrefix 动态检查对应的 data 属性
     */
    private _isTooltipElement(el: any): el is HTMLElement {
        if (!(el instanceof HTMLElement)) return false

        const prefix = this.options.dataPrefix || 'tooltip'
        const dataset = el.dataset as any

        // 检查 dataset
        const isTooltip = !!(
            dataset[prefix] ||
            dataset[`${prefix}Slot`] ||
            dataset[`${prefix}Query`] ||
            dataset[`${prefix}Link`]
        )

        return isTooltip
    }

    private _getTooltipElement(e: MouseEvent) {
        // 如果 extend=false，直接返回 host 元素
        if (this.options.extend === false) {
            return this.hostElement
        }

        // extend=true（默认），从 composedPath 中查找 TooltipElement
        const composedPath = e.composedPath()
        // 查找当前鼠标位置的具有data-tooltip属性的元素
        let tooltipElement: HTMLElement | null = null
        for (let i = 0; i < composedPath.length; i++) {
            const el = composedPath[i]
            if (this._isTooltipElement(el)) {
                // 确保元素在host范围内，或者在当前controller管理的tooltip容器内
                const isInHost =
                    el === this.hostElement ||
                    this.hostElement.contains(el) ||
                    // @ts-expect-error
                    this.host?.renderRoot?.contains(el)

                // 检查是否在当前controller管理的某个tooltip中（支持嵌套tooltip）
                const isInManagedTooltip = this.tooltips.some((tooltip) => {
                    const tooltipEl = tooltip.el.deref()
                    if (!tooltipEl) return false
                    // 检查元素是否在该tooltip的容器内
                    return tooltip.container?.contains(el) ?? false
                })

                if (isInHost || isInManagedTooltip) {
                    tooltipElement = el
                    break
                }
            }
        }
        return tooltipElement
    }

    /**
     * 设置click事件委托处理
     */
    private _setupClickEventDelegation(hostElement: HTMLElement): void {
        this._tooltipDelegateHandler = (e: Event) => {
            const tooltipEl = this._getTooltipElement(e as any)
            if (tooltipEl) {
                const trigger = this._getTrigger(tooltipEl)
                if (trigger === 'click') {
                    e.preventDefault()
                    e.stopPropagation()

                    // 新的 tooltip 元素，通知 registry
                    if (this._registry.notifyShowing(this, tooltipEl)) {
                        if (this.tooltips.has(tooltipEl)) {
                            this.tooltips.get(tooltipEl)?.show()
                        } else {
                            this.tooltips.hide()
                            this.tooltips
                                .add(tooltipEl, {
                                    ...this.options,
                                    trigger: 'click',
                                })
                                .show()
                        }
                    }
                }
            }
        }

        hostElement.addEventListener('click', this._tooltipDelegateHandler, true)
    }
    private _getTrigger(el: HTMLElement) {
        const prefix = this.options.dataPrefix || 'tooltip'
        return (el.dataset as any)[`${prefix}Trigger`] || this.options.trigger!
    }

    /**
     * 为mouseover触发的tooltip元素添加统一的事件监听器
     */
    private _setupMouseoverEventDelegation(hostElement: HTMLElement): void {
        // 清理之前的监听器
        this._removeMouseMoveEventListeners()

        this._onMouseMove = (e: MouseEvent) => {
            const tooltipEl = this._getTooltipElement(e)
            // 处理data-tooltip元素的进入和离开事件
            if (tooltipEl) {
                const trigger = this._getTrigger(tooltipEl)
                if (trigger !== 'click') {
                    // 新的 tooltip 元素，通知 registry
                    if (this._registry.notifyShowing(this, tooltipEl)) {
                        if (this.tooltips.has(tooltipEl)) {
                            this.tooltips.get(tooltipEl)?.show()
                        } else {
                            // 检查新 tooltip 元素是否是嵌套在某个已显示的 tooltip 容器内
                            const isNestedTooltip = this.tooltips.some(t => {
                                const container = t.container
                                // 检查新 tooltip 元素（触发元素）是否在该 tooltip 的容器内
                                return container?.contains(tooltipEl) ?? false
                            })

                            // 如果是嵌套 tooltip，不隐藏父 tooltip
                            // 如果不是嵌套 tooltip，隐藏所有 tooltip
                            if (!isNestedTooltip) {
                                this.tooltips.hide()
                            }

                            this.tooltips
                                .add(tooltipEl, {
                                    ...this.options,
                                    trigger: 'mouseover',
                                })
                                .show()
                        }
                        // 成功显示 tooltip 后，阻止事件继续冒泡到父级控制器
                        e.stopPropagation()
                    }
                    // else: 通知失败，说明其他 controller 正在显示，不做任何操作
                }
            } else {
                // 鼠标离开了所有 tooltip 元素
                // 但需要检查鼠标是否在某个已显示的 tooltip 容器内
                const isInTooltipContainer = this.tooltips.some(t => {
                    if (!t.isVisible) return false
                    const container = t.container
                    // 检查鼠标事件目标是否在某个可见的 tooltip 容器内
                    return container?.contains(e.target as HTMLElement) ?? false
                })

                // 只有当鼠标不在任何 tooltip 容器内，且没有可见 tooltip 时才通知 registry
                if (!isInTooltipContainer && !this.tooltips.some(t => t.isVisible)) {
                    this._registry.notifyHidden(this)
                }
            }
        }

        // 在host元素上添加mousemove监听器
        hostElement.addEventListener('mousemove', this._onMouseMove)
    }

    /**
     * 移除mouseover触发的tooltip元素的事件监听器
     */
    private _removeMouseMoveEventListeners(): void {
        const hostElement = this.host as unknown as HTMLElement
        if (this._onMouseMove) {
            hostElement.removeEventListener('mousemove', this._onMouseMove)
        }
    }

    /**
     * 移除触发事件监听器
     */
    private _removeTriggerEvents(): void {
        const hostElement = this.host as unknown as HTMLElement

        // 移除click事件委托
        if (this._tooltipDelegateHandler) {
            hostElement.removeEventListener('click', this._tooltipDelegateHandler, true)
            this._tooltipDelegateHandler = undefined
        }

        // 移除mouseover事件监听器
        this._removeMouseMoveEventListeners()
    }

    /**
     * ReactiveController 生命周期 - host 断开连接时调用
     */
    hostDisconnected(): void {
        // 从全局 registry 注销
        this._registry.unregister(this)

        this._removeTriggerEvents()
        this.destroy()
    }

    /**
     * 清理鼠标离开定时器
     */
    private _clearMouseLeaveTimer(): void {
        if (this._mouseLeaveTimer) {
            clearTimeout(this._mouseLeaveTimer)
            this._mouseLeaveTimer = undefined
        }
    }
    /**
     * 销毁控制器
     */
    destroy(): void {
        this._clearMouseLeaveTimer()
        this._removeTriggerEvents()
    }

    hide() {
        this.tooltips.hide()
        // 通知 registry tooltip 已隐藏
        this._registry.notifyHidden(this)
    }
    show() {
        this.tooltips.show()
    }

    /**
     * 处理来自 Tooltip 容器内部的事件
     * 用于支持嵌套 Tooltip 场景
     *
     * 当 Tooltip 内容中包含带有 data-tooltip 属性的元素时，
     * 这些元素的事件需要被 Controller 处理以显示嵌套的 Tooltip
     */
    handleContainerEvent(e: Event): void {
        // 只处理 mousemove 和 click 事件
        if (e.type !== 'mousemove' && e.type !== 'click') {
            return
        }

        // 复用现有的事件处理逻辑
        if (e.type === 'click' && this._tooltipDelegateHandler) {
            this._tooltipDelegateHandler(e)
        } else if (e.type === 'mousemove' && this._onMouseMove) {
            this._onMouseMove(e as MouseEvent)
        }
    }
}
export const PopupController = TooltipController
