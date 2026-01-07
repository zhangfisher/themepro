/**
 * TooltipController - 轻量级提示框控制器
 */
import type { ReactiveController, ReactiveControllerHost } from "lit";
import { createThemeproContainer } from "../../utils/createThemeproContainer";
import type { LitElement } from "lit";
import { parseObjectFromAttr } from "@/utils/parseObjectFromAttr";
import type { TooltipControllerOptions, TooltipPlacement } from "./types";
import { TooltipManager } from "./manager";
import { parseRelaxedJson } from "@/utils";

export class TooltipController implements ReactiveController {
    host: ReactiveControllerHost;
    options: TooltipControllerOptions;

    tooltips: TooltipManager = new TooltipManager(this);
    private _mouseLeaveTimer?: NodeJS.Timeout;
    private _tooltipDelegateHandler?: (e: Event) => void;
    private _onMouseMove?: (e: MouseEvent) => void;
    private _themeproContainer?: HTMLElement;
    constructor(
        host: ReactiveControllerHost,
        options: TooltipControllerOptions = {}
    ) {
        this.host = host;
        this.options = this._initOptions(options);
        host.addController(this);
    }
    get hostElement() {
        return this.host as LitElement;
    }
    /**
     * 全局容器
     */
    get themeproContainer() {
        if (!this._themeproContainer) {
            this._themeproContainer = createThemeproContainer(
                this.host as LitElement
            );
        }
        return this._themeproContainer!;
    }

    /**
     * 合并配置选项：从 host 属性读取默认值，与传入的 options 合并
     */
    private _initOptions(
        userOptions?: TooltipControllerOptions
    ): TooltipControllerOptions {
        const hostElement = this.host as any;

        const defaultOptions: TooltipControllerOptions = {
            placement: "top" as TooltipPlacement,
            offset: [0, 4],
            animationDuration: 150,
            animationEasing: "easeOutQuart",
            arrow: true,
            trigger: "mouseover",
            delayHide: 0,
        };

        // 从绑定属性读取配置
        const attrOptions = parseObjectFromAttr(
            hostElement,
            `data-${userOptions?.dataPrefix}-options`
        );

        // 合并配置，用户选项优先级最高
        const opts = {
            ...defaultOptions,
            ...userOptions, // 用户传入的配置（中间层）
            ...attrOptions, // 从属性读取的配置（最高优先级）
        };
        if (!opts.dataPrefix) opts.dataPrefix = "tooltip";
        if (!opts.className) opts.className = opts.dataPrefix;
        if (!opts.cssClass) opts.cssClass = `${opts.dataPrefix}-visible`;
        return opts;
    }

    /**
     * ReactiveController 生命周期 - host 连接时调用
     */
    hostConnected(): void {
        this._setupTriggerEvents();
        this._injectDataset();
    }
    private _injectDataset() {
        const dataset: Record<string, any> =
            typeof this.options.dataset === "object"
                ? this.options.dataset
                : typeof this.options.dataset === "string"
                ? parseRelaxedJson(this.options.dataset)
                : {};
        if (this.host) {
            Object.entries(dataset).forEach(([name, value]) => {
                const v = (this.host as any).dataset[name];
                if (!v) (this.host as any).dataset[name] = value;
            });
        }
    }

    /**
     * ReactiveController 生命周期 - host 更新时调用
     */
    hostUpdate(): void {
        // 只在 trigger 选项改变时才重新设置事件监听器
        const currentTrigger = this.options.trigger;
        if (currentTrigger !== this._lastTrigger) {
            console.log(
                "[hostUpdate] Trigger changed from",
                this._lastTrigger,
                "to",
                currentTrigger
            );
            this._setupTriggerEvents();
            this._lastTrigger = currentTrigger;
        }
    }

    private _lastTrigger?: string;

    /**
     * 设置tooltip事件监听
     */
    private _setupTriggerEvents(): void {
        const hostElement = this.host as unknown as HTMLElement;

        // 清理之前的监听器
        this._removeTriggerEvents();

        // 设置click事件委托
        this._setupClickEventDelegation(hostElement);

        // 设置mouseover事件监听器
        this._setupMouseoverEventDelegation(hostElement);
    }
    /**
     * 检查元素是否为 tooltip 元素
     * 根据配置的 dataPrefix 动态检查对应的 data 属性
     */
    private _isTooltipElement(el: any): el is HTMLElement {
        if (!(el instanceof HTMLElement)) return false;

        const prefix = this.options.dataPrefix || "tooltip";
        const dataset = el.dataset as any;

        // 检查 dataset
        const isTooltip = !!(
            dataset[prefix] ||
            dataset[`${prefix}Slot`] ||
            dataset[`${prefix}Query`] ||
            dataset[`${prefix}Link`]
        );

        return isTooltip;
    }

    private _getTooltipElement(e: MouseEvent) {
        const composedPath = e.composedPath();
        // 查找当前鼠标位置的具有data-tooltip属性的元素
        let tooltipElement: HTMLElement | null = null;
        for (let i = 0; i < composedPath.length; i++) {
            const el = composedPath[i];
            if (this._isTooltipElement(el)) {
                // 确保元素在host范围内
                if (
                    el === this.hostElement ||
                    this.hostElement.contains(el) ||
                    // @ts-expect-error
                    this.host?.renderRoot?.contains(el)
                ) {
                    tooltipElement = el;
                    break;
                }
            }
        }
        return tooltipElement;
    }

    /**
     * 设置click事件委托处理
     */
    private _setupClickEventDelegation(hostElement: HTMLElement): void {
        this._tooltipDelegateHandler = (e: Event) => {
            const tooltipEl = this._getTooltipElement(e as any);
            if (tooltipEl) {
                const trigger = this._getTrigger(tooltipEl);
                if (trigger === "click") {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.tooltips.has(tooltipEl)) {
                        this.tooltips.get(tooltipEl)?.show();
                    } else {
                        this.tooltips.hide();
                        this.tooltips
                            .add(tooltipEl, {
                                ...this.options,
                                trigger: "click",
                            })
                            .show();
                    }
                }
            }
        };

        hostElement.addEventListener(
            "click",
            this._tooltipDelegateHandler,
            true
        );
    }
    private _getTrigger(el: HTMLElement) {
        const prefix = this.options.dataPrefix || "tooltip";
        return (el.dataset as any)[`${prefix}Trigger`] || this.options.trigger!;
    }

    /**
     * 为mouseover触发的tooltip元素添加统一的事件监听器
     */
    private _setupMouseoverEventDelegation(hostElement: HTMLElement): void {
        // 清理之前的监听器
        this._removeMouseMoveEventListeners();

        this._onMouseMove = (e: MouseEvent) => {
            const tooltipEl = this._getTooltipElement(e);
            // 处理data-tooltip元素的进入和离开事件
            if (tooltipEl) {
                const trigger = this._getTrigger(tooltipEl);
                if (trigger !== "click") {
                    if (this.tooltips.has(tooltipEl)) {
                        this.tooltips.get(tooltipEl)?.show();
                    } else {
                        // 马上隐藏已经显示的Tooltip
                        this.tooltips.hide();
                        this.tooltips
                            .add(tooltipEl, {
                                ...this.options,
                                trigger: "mouseover",
                            })
                            .show();
                    }
                }
            }
        };

        // 在host元素上添加mousemove监听器
        hostElement.addEventListener("mousemove", this._onMouseMove);
    }

    /**
     * 移除mouseover触发的tooltip元素的事件监听器
     */
    private _removeMouseMoveEventListeners(): void {
        const hostElement = this.host as unknown as HTMLElement;
        if (this._onMouseMove) {
            hostElement.removeEventListener("mousemove", this._onMouseMove);
            this._onMouseMove = undefined;
        }
    }

    /**
     * 移除触发事件监听器
     */
    private _removeTriggerEvents(): void {
        const hostElement = this.host as unknown as HTMLElement;

        // 移除click事件委托
        if (this._tooltipDelegateHandler) {
            hostElement.removeEventListener(
                "click",
                this._tooltipDelegateHandler,
                true
            );
            this._tooltipDelegateHandler = undefined;
        }

        // 移除mouseover事件监听器
        this._removeMouseMoveEventListeners();
    }

    /**
     * ReactiveController 生命周期 - host 断开连接时调用
     */
    hostDisconnected(): void {
        this._removeTriggerEvents();
        this.destroy();
    }

    /**
     * 清理鼠标离开定时器
     */
    private _clearMouseLeaveTimer(): void {
        if (this._mouseLeaveTimer) {
            clearTimeout(this._mouseLeaveTimer);
            this._mouseLeaveTimer = undefined;
        }
    }
    /**
     * 销毁控制器
     */
    destroy(): void {
        this._clearMouseLeaveTimer();
        this._removeTriggerEvents();
    }
    hide() {
        this.tooltips.hide();
    }
    show() {
        this.tooltips.show();
    }
}
export const PopupController = TooltipController;
