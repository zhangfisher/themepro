/**
 * 弹窗控制器 - 负责管理弹出层的容器创建、位置计算、动画和事件处理
 */
import {
    computePosition,
    flip,
    offset,
    shift,
    autoUpdate,
    hide,
    arrow,
    type ComputePositionReturn,
} from "@floating-ui/dom";
import { animate } from "animejs";
import type { ReactiveController, ReactiveControllerHost } from "lit";
import { createThemeproContainer } from "../utils/createThemeproContainer";
import { getSlots } from "../utils/getSlots";
import type { LitElement } from "lit";
import { parseObjectFromAttr } from "@/utils/parseObjectFromAttr";

export type PopupPlacement =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";

export type PopupTriggerEvent = "click" | "mouseover";

export interface PopupControllerOptions {
    /**
     * 弹出位置
     */
    placement?: PopupPlacement;
    /**
     * 弹出偏移量 [crossAxis, mainAxis]
     */
    offset?: [number, number];
    /**
     * 弹出内容宽度是否匹配触发按钮宽度
     */
    fitWidth?: boolean;
    /**
     * 禁止弹出内容自动关闭
     */
    persistent?: boolean;
    /**
     * 动画持续时间（毫秒）
     */
    animationDuration?: number;
    /**
     * 动画缓动函数
     */
    animationEasing?: string;
    /**
     * 自定义样式类名
     */
    className?: string;
    /**
     * 弹出容器宽度，默认为null由内容决定
     */
    width?: number | null;
    /**
     * 弹出容器高度，默认为null由内容决定
     */
    height?: number | null;
    /**
     * 是否显示指示箭头，默认为false
     */
    arrow?: boolean;
    /**
     * 绑定属性名称，配置参数将从host的该属性中读取参数
     */
    optionAttr?: string;
    /**
     * 指定要获取的slot名称，默认获取默认slot
     */
    slot?: string;
    /**
     * 延迟隐藏时间（毫秒），大于0的值将在指定时间后自动隐藏弹出内容
     */
    delayHide?: number;
    /**
     * 触发显示的事件类型，默认为'click'
     */
    on?: PopupTriggerEvent;
    /**
     * 声明定义内部额外的热点区域选择器
     *
     * 满足条件的元素均可以通过
     *
     * 允许Host内部符合选择器的元素也可以弹出内容
     * - 通过data-tips
     * - data-popup-slot="xxx"
     *
     */
    hotspots1?: string | string[];
    /**
     * 触发元素选择器，可以是单个选择器或选择器数组
     *
     */
    hotspots?: string | string[];
    /**
     * 弹出层显示时触发
     */
    onShow?: () => void;
    /**
     * 弹出层隐藏时触发
     */
    onHide?: () => void;
}

export class PopupController implements ReactiveController {
    private host: ReactiveControllerHost;
    private options: PopupControllerOptions;
    private _container?: HTMLElement;

    // 内部状态
    private _isVisible: boolean = false;
    private _cleanup?: () => void;
    private _externalClickHandler?: () => void;
    private _escapeHandler?: (e: KeyboardEvent) => void;
    private _showAnimation?: any;
    private _hideAnimation?: any;
    private _arrowElement?: HTMLElement;
    private _delayHideTimer?: NodeJS.Timeout;
    private _mouseEnterHandler?: (e: MouseEvent) => void;
    private _mouseLeaveHandler?: (e: MouseEvent) => void;
    private _mouseLeaveTimer?: NodeJS.Timeout;
    private _shouldHideOnMouseLeave: boolean = false;
    private _currentHotspotElement?: HTMLElement;
    private _hotspotSelectors?: string[];
    private _hotspotDelegateHandler?: (e: Event) => void;
    private _hotspotMouseLeaveHandler?: (e: MouseEvent) => void;
    private _currentTriggerMode?: PopupTriggerEvent;

    constructor(
        host: ReactiveControllerHost,
        options: PopupControllerOptions = {}
    ) {
        this.host = host;
        this.options = this._initOptions(options);
        host.addController(this);
    }

    /**
     * 合并配置选项：从 host 属性读取默认值，与传入的 options 合并
     */
    private _initOptions(
        userOptions: PopupControllerOptions
    ): PopupControllerOptions {
        const hostElement = this.host as any;
        const optionAttr = userOptions.optionAttr ?? "popupOptions";
        const defaultOptions: PopupControllerOptions = {
            placement: "top" as PopupPlacement,
            offset: [0, 4],
            fitWidth: false,
            persistent: false,
            animationDuration: 100,
            animationEasing: "easeOutQuart",
            className: "popup",
            width: null,
            height: null,
            arrow: false,
            on: "click",
        };
        // 从绑定属性读取配置
        const attrOptions = parseObjectFromAttr(
            hostElement,
            optionAttr,
            defaultOptions
        );
        //
        return {
            ...userOptions,
            ...attrOptions,
        };
    }

    /**
     * 从 host 属性中更新配置选项（用户传入的选项不会被覆盖）
     */
    private _updateOptionsFromHost(): void {
        // 合并配置，用户选项优先级最高
        this.options = this._initOptions({});

        // 如果弹出层可见且更新了位置相关配置，重新计算位置
        if (
            this._isVisible &&
            (this.options.placement ||
                this.options.offset ||
                this.options.fitWidth ||
                this.options.width !== undefined ||
                this.options.height !== undefined ||
                this.options.arrow !== undefined)
        ) {
            this._updatePosition();
        }
    }

    /**
     * 获取弹出容器
     */
    get container(): HTMLElement {
        if (!this._container) {
            this._createContainer();
        }
        return this._container!;
    }

    /**
     * 创建箭头元素
     */
    private _createArrowElement(): HTMLElement {
        const hostElement = this.host as unknown as LitElement;
        const arrowElement = hostElement.ownerDocument!.createElement("div");
        arrowElement.className = "popup-arrow";
        arrowElement.style.cssText = `
            position: absolute;
            width: 12px;
            height: 12px;
            z-index: 1;
            pointer-events: none;
            transform: rotate(45deg);
            display: ${this.options.arrow ? "block" : "none"};
        `;

        arrowElement.style.backgroundColor =
            this._container!.style.backgroundColor;
        return arrowElement;
    }

    /**
     * 更新箭头位置和样式
     */
    private _updateArrowPosition(
        middlewareData: ComputePositionReturn["middlewareData"],
        placement?: string
    ): void {
        if (
            !this.options.arrow ||
            !this._arrowElement ||
            !middlewareData.arrow ||
            !this._container
        ) {
            // 如果不需要箭头，隐藏箭头元素
            if (this._arrowElement) {
                this._arrowElement.style.display = "none";
            }
            return;
        }

        // 确保箭头元素可见
        this._arrowElement.style.display = "block";

        const { x, y } = middlewareData.arrow;
        const currentPlacement =
            placement || this.options.placement || "bottom-start";

        const side = currentPlacement.split("-")[0];
        const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
        }[side] as string;

        // 获取箭头元素的尺寸（参照floating-offset示例）
        const arrowLen = this._arrowElement.offsetWidth;

        // 应用基础样式 - 参照floating-offset示例的完整逻辑
        Object.assign(this._arrowElement.style, {
            left: x != null ? `${x}px` : "",
            top: y != null ? `${y}px` : "",
            // 确保静态边在翻转时被重置（参照floating-offset示例）
            right: "",
            bottom: "",
            [staticSide]: `${-arrowLen / 2}px`,
            transform: "rotate(45deg)",
        });

        // 根据placement设置边框显示
        this._setArrowBorderByPlacement(currentPlacement);
    }

    /**
     * 根据placement设置箭头边框显示
     */
    private _setArrowBorderByPlacement(placement: string): void {
        if (!this._arrowElement || !this._container) return;

        // 获取容器的计算样式
        const containerStyle = window.getComputedStyle(this._container);

        // 重置所有边框，使用容器的边框样式
        this._arrowElement.style.border = containerStyle.border;

        // 根据placement设置需要透明的边框，形成指向效果
        if (placement.startsWith("bottom")) {
            // 底部弹出：箭头在上方，上边框应该透明（与弹出内容背景融合）
            Object.assign(this._arrowElement.style, {
                borderBottomColor: "transparent",
                borderRightColor: "transparent",
            });
        } else if (placement.startsWith("top")) {
            // 顶部弹出：箭头在下方，下边框应该透明
            Object.assign(this._arrowElement.style, {
                borderLeftColor: "transparent",
                borderTopColor: "transparent",
            });
        } else if (placement.startsWith("left")) {
            // 左侧弹出：箭头在右侧，右边框应该透明
            Object.assign(this._arrowElement.style, {
                borderLeftColor: "transparent",
                borderBottomColor: "transparent",
            });
        } else if (placement.startsWith("right")) {
            // 右侧弹出：箭头在左侧，左边框应该透明
            Object.assign(this._arrowElement.style, {
                borderTopColor: "transparent",
                borderRightColor: "transparent",
            });
        }
    }

    /**
     * 创建弹窗容器
     */
    private _createPopupContainer(): void {
        if (this._container) return;

        const hostElement = this.host as unknown as LitElement;

        // 创建dropdown容器
        this._container = hostElement.ownerDocument!.createElement("div");
        this._container.className = this.options.className || "popup";

        // 设置容器初始样式
        this._container.style.cssText = `
            position: absolute;
            pointer-events: auto;
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
            visibility: hidden;
            z-index: 1000;
            background-color: var(--auto-bgcolor);
        `;

        // 监听dropdown-close事件
        this._container.addEventListener("popup:close", () => {
            this.hide();
        });

        // 创建并添加箭头元素到容器内部
        if (this.options.arrow) {
            this._arrowElement = this._createArrowElement();
            if (this._arrowElement) {
                this._container.appendChild(this._arrowElement);
            }
        }

        // 添加自定义类名（额外类名）
        if (this.options.className && this.options.className !== "popup") {
            this._container.classList.add(this.options.className);
        }
    }

    /**
     * 创建容器
     */
    private _createContainer(): void {
        if (this._container) return;

        // 使用工具函数创建全局.themepro-container并添加弹窗容器
        const themeproContainer = createThemeproContainer(
            this.host as LitElement
        );
        if (!this._container) {
            this._createPopupContainer();
            if (this._container && themeproContainer) {
                themeproContainer.appendChild(this._container);
            }
        }
    }

    /**
     * ReactiveController 生命周期 - host 连接时调用
     */
    hostConnected(): void {
        // 容器将在第一次show调用时创建
        this._setupTriggerEvents();
        this._setupTriggerElements();
    }

    /**
     * ReactiveController 生命周期 - host 更新时调用
     */
    hostUpdate(): void {
        // 从 host 属性中读取最新的配置并更新
        this._updateOptionsFromHost();
        // 重新设置触发事件
        this._setupTriggerEvents();
        this._setupTriggerElements();
    }

    /**
     * 设置trigger元素监听 - 使用事件委托模式
     */
    private _setupTriggerElements(): void {
        const hostElement = this.host as unknown as HTMLElement;

        // 清理之前的触发器监听
        this._removeHotspotElements();

        if (!this.options.hotspots) return;

        // 将触发器选择器转换为数组并存储
        this._hotspotSelectors = Array.isArray(this.options.hotspots)
            ? this.options.hotspots
            : [this.options.hotspots];

        // 存储当前的触发模式
        this._currentTriggerMode = this.options.on;

        // 创建获取匹配触发器的函数
        const getMatchedTrigger = (e: Event): HTMLElement | null => {
            const composedPath = e.composedPath();

            // 找到host元素在事件路径中的索引位置
            let hostIndex = -1;
            for (let i = 0; i < composedPath.length; i++) {
                if (composedPath[i] === hostElement) {
                    hostIndex = i;
                    break;
                }
            }

            // 如果在路径中找不到host元素，使用整个路径
            if (hostIndex === -1) {
                hostIndex = composedPath.length;
            }

            // 遍历事件路径，从开始到host元素为止，寻找匹配的触发器元素
            for (let i = 0; i <= hostIndex; i++) {
                const pathElement = composedPath[i];
                if (pathElement instanceof HTMLElement) {
                    // 检查当前元素是否匹配任何触发器选择器
                    for (const selector of this._hotspotSelectors!) {
                        // 使用matches方法直接检查元素是否匹配选择器
                        if (pathElement.matches?.(selector)) {
                            return pathElement;
                        }
                        // 对于复杂的CSS选择器，尝试在父元素链中查找（限制在路径范围内）
                        let parent = pathElement.parentElement;
                        while (
                            parent &&
                            parent !== hostElement &&
                            composedPath.includes(parent)
                        ) {
                            if (parent.matches?.(selector)) {
                                return parent;
                            }
                            parent = parent.parentElement;
                        }
                    }
                }
            }

            return null;
        };

        // 创建委托事件处理器
        this._hotspotDelegateHandler = (e: Event) => {
            const matchedElement = getMatchedTrigger(e);

            if (matchedElement) {
                // 阻止事件冒泡和默认行为
                e.preventDefault();
                e.stopPropagation();

                // 设置当前触发元素
                this._currentHotspotElement = matchedElement;

                // 根据事件类型和触发模式处理
                if (
                    this._currentTriggerMode === "click" &&
                    e.type === "click"
                ) {
                    this.show();
                } else if (
                    this._currentTriggerMode === "mouseover" &&
                    e.type === "mouseover"
                ) {
                    // 对于mouseover，检查是否是从外部进入
                    const mouseEvent = e as MouseEvent;
                    const relatedTarget = mouseEvent.relatedTarget as Node;
                    const isComingFromOutside =
                        !hostElement.contains(relatedTarget) &&
                        !matchedElement.contains(relatedTarget);

                    if (isComingFromOutside) {
                        this._clearMouseLeaveTimer();
                        this.show();
                    }
                }
            }
        };

        // 在host元素上监听事件（事件委托）
        if (this._currentTriggerMode === "click") {
            hostElement.addEventListener(
                "click",
                this._hotspotDelegateHandler,
                true
            );
        } else if (this._currentTriggerMode === "mouseover") {
            // 对于mouseover模式，监听mouseover事件并处理mouseenter逻辑
            hostElement.addEventListener(
                "mouseover",
                this._hotspotDelegateHandler,
                true
            );

            // 同时添加mouseleave监听来处理隐藏逻辑
            this._hotspotMouseLeaveHandler = (e: MouseEvent) => {
                const matchedElement = getMatchedTrigger(e);

                if (matchedElement) {
                    // 检查是否移动到外部
                    const relatedTarget = e.relatedTarget as Node;
                    const isGoingOutside =
                        !hostElement.contains(relatedTarget) &&
                        !matchedElement.contains(relatedTarget) &&
                        !this._container?.contains(relatedTarget);

                    if (isGoingOutside) {
                        this._mouseLeaveTimer = setTimeout(() => {
                            this.hide();
                        }, 30);
                    }
                }
            };

            hostElement.addEventListener(
                "mouseout",
                this._hotspotMouseLeaveHandler,
                true
            );
        }
    }

    /**
     * 移除trigger元素监听 - 事件委托模式清理
     */
    private _removeHotspotElements(): void {
        const hostElement = this.host as unknown as HTMLElement;

        // 移除委托事件监听器
        if (this._hotspotDelegateHandler) {
            if (this._currentTriggerMode === "click") {
                hostElement.removeEventListener(
                    "click",
                    this._hotspotDelegateHandler,
                    true
                );
            } else if (this._currentTriggerMode === "mouseover") {
                hostElement.removeEventListener(
                    "mouseover",
                    this._hotspotDelegateHandler,
                    true
                );
            }
            this._hotspotDelegateHandler = undefined;
        }

        if (this._hotspotMouseLeaveHandler) {
            hostElement.removeEventListener(
                "mouseout",
                this._hotspotMouseLeaveHandler,
                true
            );
            this._hotspotMouseLeaveHandler = undefined;
        }

        // 清理状态
        this._hotspotSelectors = undefined;
        this._currentHotspotElement = undefined;
        this._currentTriggerMode = undefined;
    }

    /**
     * ReactiveController 生命周期 - host 断开连接时调用
     */
    hostDisconnected(): void {
        this._removeTriggerEvents();
        this._removeHotspotElements();
        this.destroy();
    }

    /**
     * 获取弹出层可见状态
     */
    get isVisible(): boolean {
        return this._isVisible;
    }

    /**
     * 更新配置选项
     */
    updateOptions(newOptions: Partial<PopupControllerOptions>): void {
        this.options = { ...this.options, ...newOptions };

        // 如果弹出层可见且更新了位置相关配置，重新计算位置
        if (
            this._isVisible &&
            (newOptions.placement ||
                newOptions.offset ||
                newOptions.fitWidth ||
                newOptions.width !== undefined ||
                newOptions.height !== undefined ||
                newOptions.arrow !== undefined)
        ) {
            this._updatePosition();
        }
    }

    /**
     * 显示弹出层
     */
    async show(): Promise<void> {
        if (this._isVisible) return;

        const container = this.container;

        // 克隆内容到容器中（只在第一次显示时执行）
        const hasContent = this._cloneContent();

        // 如果没有内容，则不显示弹出层
        if (!hasContent) {
            this._createPopupContainer();
            this.container.style.visibility = "hidden";
            return;
        }

        // 停止任何正在进行的隐藏动画
        this._hideAnimation?.pause();

        // 清理之前的延迟隐藏定时器
        this._clearDelayHideTimer();

        // 设置初始状态
        container.style.visibility = "visible";
        container.style.pointerEvents = "auto";

        // 设置外部事件监听器
        this._setupExternalListeners();

        // 如果是mouseover触发模式，为容器设置鼠标事件
        if (this.options.on === "mouseover") {
            this._setupContainerMouseEvents();
        }

        // 先同步计算显示位置，确保定位准确
        await this._updatePositionSync();

        // 位置计算完成后再开始显示动画
        const targets = [container];
        if (this.options.arrow && this._arrowElement) {
            targets.push(this._arrowElement);
        }

        this._showAnimation = animate(targets, {
            opacity: [0, 1],
            scale: [0.9, 1],
            translateY: [-10, 0],
            duration: this.options.animationDuration!,
            easing: this.options.animationEasing || "easeOutQuart",
        });

        // 设置动画回调
        if (this._showAnimation?.finished) {
            this._showAnimation.finished.then(() => {
                this._showAnimation = undefined;
            });
        }

        this._isVisible = true;

        // 触发自定义事件
        this._triggerShowEvent(container);
        // 延迟隐藏
        this._setDelayHide();
        // 调用显示回调
        this.options.onShow?.();
    }

    private _setDelayHide() {
        // 如果配置了延迟隐藏，设置定时器
        if (this.options.delayHide && this.options.delayHide > 0) {
            this._delayHideTimer = setTimeout(() => {
                this.hide();
            }, this.options.delayHide);
        }
    }

    /**
     * 隐藏弹出层
     */
    hide(): void {
        if (!this._isVisible) return;

        const container = this.container;

        // 停止任何正在进行的显示动画
        this._showAnimation?.pause();

        // 清理延迟隐藏定时器
        this._clearDelayHideTimer();

        // 触发自定义事件
        this._triggerHideEvent(container);

        // 使用animejs创建隐藏动画
        const targets = [container];
        if (this.options.arrow && this._arrowElement) {
            targets.push(this._arrowElement);
        }

        this._hideAnimation = animate(targets, {
            opacity: [1, 0],
            scale: [1, 0.9],
            translateY: [0, -10],
            duration: this.options.animationDuration!,
            easing: this.options.animationEasing || "easeInQuart",
        });

        // 设置动画回调
        if (this._hideAnimation?.finished) {
            this._hideAnimation.finished.then(() => {
                container.style.visibility = "hidden";
                container.style.pointerEvents = "none";
                this._hideAnimation = undefined;
                this._removeExternalListeners();
            });
        } else {
            // 如果动画对象异常，直接执行完成逻辑
            setTimeout(() => {
                container.style.visibility = "hidden";
                container.style.pointerEvents = "none";
                this._hideAnimation = undefined;
                this._removeExternalListeners();
            }, this.options.animationDuration!);
        }

        this._isVisible = false;
        this.options.onHide?.();
    }

    /**
     * 清理延迟隐藏定时器
     */
    private _clearDelayHideTimer(): void {
        if (this._delayHideTimer) {
            clearTimeout(this._delayHideTimer);
            this._delayHideTimer = undefined;
        }
    }

    /**
     * 切换弹出层显示状态
     */
    toggle(): void {
        if (this._isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * 创建浮层中间件配置
     */
    private _createMiddleware(isAutoUpdate: boolean = false): any[] {
        // 计算基础偏移量和箭头偏移量
        const baseOffset = this.options.offset?.[1] || 4;
        const middleware = [
            offset({
                crossAxis: this.options.offset?.[0] || 0,
                mainAxis: baseOffset + (this.options.arrow ? 6 : 0),
            }),
            flip(isAutoUpdate ? { fallbackAxisSideDirection: "start" } : {}),
            shift({
                padding: 8,
            }),
            hide({
                strategy: "referenceHidden",
            }),
        ];

        // 如果需要箭头，添加arrow middleware
        if (this.options.arrow && this._arrowElement) {
            middleware.push(
                arrow({
                    element: this._arrowElement,
                    padding: 4,
                })
            );
        }

        return middleware;
    }

    /**
     * 获取当前触发元素或host元素
     */
    private _getReferenceElement(): HTMLElement {
        if (this._currentHotspotElement) {
            return this._currentHotspotElement;
        }
        return this.host as unknown as HTMLElement;
    }

    /**
     * 统一的位置计算函数 - 消除重复代码
     * @param callback 可选的回调函数，用于处理计算结果
     */
    private async _calculatePosition(
        callback?: (position: ComputePositionReturn) => void
    ): Promise<ComputePositionReturn> {
        const referenceElement = this._getReferenceElement();
        const middleware = this._createMiddleware();
        const position = await computePosition(
            referenceElement,
            this.container,
            {
                placement: this.options.placement!,
                middleware,
            }
        );

        // 如果提供了回调函数，则执行回调
        if (callback) {
            callback(position);
        }

        return position;
    }

    /**
     * 计算并应用位置
     */
    private async _computeAndApplyPosition(
        setupAutoUpdate: boolean = true
    ): Promise<void> {
        await this._calculatePosition((position) => {
            this._applyPosition(position);
        });

        if (setupAutoUpdate) {
            this._setupAutoUpdate();
        }
    }

    /**
     * 同步更新位置
     */
    private async _updatePositionSync(): Promise<void> {
        await this._computeAndApplyPosition();
    }

    /**
     * 更新位置
     */
    private _updatePosition(): void {
        // 使用统一的位置计算函数
        this._calculatePosition((position) => {
            this._applyPosition(position);
        });

        this._setupAutoUpdate();
    }

    /**
     * 应用位置到容器
     */
    private _applyPosition(position: ComputePositionReturn): void {
        const { x, y, placement, middlewareData } = position;
        const { referenceHidden } = middlewareData.hide || {};
        const container = this.container;

        Object.assign(container.style, {
            left: `${x}px`,
            top: `${y}px`,
            visibility: referenceHidden ? "hidden" : "visible",
        });

        // 处理宽度适配
        if (this.options.fitWidth) {
            const triggerWidth = (
                this.host as unknown as HTMLElement
            ).getBoundingClientRect().width;
            container.style.width = `${triggerWidth}px`;

            // 当指定fitWidth时，popupWidth表示minWidth
            if (
                this.options.width !== null &&
                this.options.width !== undefined
            ) {
                container.style.minWidth = `${this.options.width}px`;
            }
        } else if (
            this.options.width !== null &&
            this.options.width !== undefined
        ) {
            // 非fitWidth模式下，popupWidth表示确切宽度
            container.style.width = `${this.options.width}px`;
        }

        // 处理高度控制
        if (this.options.height !== null && this.options.height !== undefined) {
            container.style.height = `${this.options.height}px`;
        }

        // 处理箭头位置，传递实际的placement（可能已翻转）
        this._updateArrowPosition(middlewareData, placement);
    }

    /**
     * 设置自动更新
     */
    private _setupAutoUpdate(): void {
        // 清理之前的自动更新
        this._cleanup?.();

        // 设置新的自动更新
        this._cleanup = autoUpdate(
            this.host as unknown as HTMLElement,
            this.container,
            () => {
                // 使用统一的位置计算函数进行自动更新
                this._calculatePosition((position) => {
                    if (this._isVisible) {
                        this._applyPosition(position);
                    }
                });
            }
        );
    }

    /**
     * 设置外部事件监听器
     */
    private _setupExternalListeners(): void {
        if (this.options.persistent) return;

        const container = this.container;
        const hostElement = this.host as unknown as HTMLElement;

        const handleDocumentClick = (e: Event) => {
            const path = e.composedPath();
            if (!path.includes(hostElement) && !path.includes(container)) {
                this.hide();
            }
        };

        this._escapeHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && this._isVisible) {
                this.hide();
            }
        };

        // 延迟添加事件监听器，避免当前事件触发
        setTimeout(() => {
            const document = hostElement.ownerDocument;
            document.addEventListener("click", handleDocumentClick, true);

            if (this._escapeHandler) {
                document.addEventListener("keydown", this._escapeHandler);
            }

            this._externalClickHandler = () => {
                document.removeEventListener(
                    "click",
                    handleDocumentClick,
                    true
                );
                if (this._escapeHandler) {
                    document.removeEventListener(
                        "keydown",
                        this._escapeHandler
                    );
                }
            };
        }, 0);
    }

    /**
     * 设置触发事件
     */
    private _setupTriggerEvents(): void {
        const hostElement = this.host as unknown as HTMLElement;

        // 清理之前的事件监听器
        this._removeTriggerEvents();

        if (this.options.on === "mouseover") {
            this._mouseEnterHandler = (e: MouseEvent) => {
                e.stopPropagation();
                // 清除任何待处理的隐藏定时器
                this._clearMouseLeaveTimer();
                this.show();
            };

            this._mouseLeaveHandler = (e: MouseEvent) => {
                e.stopPropagation();
                // 立即清除任何待处理的隐藏定时器
                this._clearMouseLeaveTimer();

                // 标记应该隐藏，但延迟执行以检查鼠标是否进入了容器
                this._shouldHideOnMouseLeave = true;
                this._mouseLeaveTimer = setTimeout(() => {
                    // 首先快速检查relatedTarget
                    const relatedTarget = e.relatedTarget as Node;
                    const isInHost = hostElement.contains(relatedTarget);
                    const isInContainer =
                        this._container?.contains(relatedTarget);

                    // 如果relatedTarget不在容器内，再做精确的位置检查
                    if (!isInContainer) {
                        // 使用鼠标位置做最终验证
                        const mouseX = e.clientX;
                        const mouseY = e.clientY;
                        const elements = document.elementsFromPoint(
                            mouseX,
                            mouseY
                        );
                        const isMouseOverContainer = elements.some((el) =>
                            this._container?.contains(el)
                        );

                        // 如果鼠标既不在host也不在container内，则隐藏
                        if (!isInHost && !isMouseOverContainer) {
                            this.hide();
                        }
                    }
                    this._shouldHideOnMouseLeave = false;
                }, 30); // 30ms延迟，足够快但有足够时间给DOM更新
            };

            hostElement.addEventListener("mouseenter", this._mouseEnterHandler);
            hostElement.addEventListener("mouseleave", this._mouseLeaveHandler);

            // 为容器添加鼠标事件监听器（容器创建后再设置）
            if (this._container) {
                this._setupContainerMouseEvents();
            }
        }
    }

    /**
     * 清理鼠标离开定时器
     */
    private _clearMouseLeaveTimer(): void {
        if (this._mouseLeaveTimer) {
            clearTimeout(this._mouseLeaveTimer);
            this._mouseLeaveTimer = undefined;
        }
        this._shouldHideOnMouseLeave = false;
    }

    /**
     * 为容器设置鼠标事件
     */
    private _setupContainerMouseEvents(): void {
        if (!this._container || this.options.on !== "mouseover") return;

        const containerMouseEnterHandler = () => {
            // 鼠标进入容器，清除任何待处理的隐藏操作
            this._clearMouseLeaveTimer();
            this._clearDelayHideTimer();
        };

        const containerMouseLeaveHandler = (e: MouseEvent) => {
            // 立即清除任何待处理的隐藏定时器
            this._clearMouseLeaveTimer();

            // 延迟检查鼠标最终位置，给浏览器时间更新DOM
            this._shouldHideOnMouseLeave = true;
            this._mouseLeaveTimer = setTimeout(() => {
                const hostElement = this.host as unknown as HTMLElement;

                // 使用当前鼠标位置而不是relatedTarget，因为相关目标可能已经改变
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                // 检查鼠标是否在任何相关元素上方
                const elements = document.elementsFromPoint(mouseX, mouseY);
                const isInHost = elements.some((el) =>
                    hostElement?.contains(el)
                );
                const isInContainer = elements.some((el) =>
                    this._container?.contains(el)
                );

                // 如果鼠标既不在host也不在container内，则隐藏
                if (!isInHost && !isInContainer) {
                    this.hide();
                }
                this._shouldHideOnMouseLeave = false;
            }, 50); // 50ms延迟，确保准确检测
        };

        this._container.addEventListener(
            "mouseenter",
            containerMouseEnterHandler
        );
        this._container.addEventListener(
            "mouseleave",
            containerMouseLeaveHandler
        );
    }

    /**
     * 移除触发事件监听器
     */
    private _removeTriggerEvents(): void {
        const hostElement = this.host as unknown as HTMLElement;

        // 清理定时器
        this._clearMouseLeaveTimer();

        if (this._mouseEnterHandler) {
            hostElement.removeEventListener(
                "mouseenter",
                this._mouseEnterHandler
            );
            this._mouseEnterHandler = undefined;
        }

        if (this._mouseLeaveHandler) {
            hostElement.removeEventListener(
                "mouseleave",
                this._mouseLeaveHandler
            );
            this._mouseLeaveHandler = undefined;
        }
    }

    /**
     * 移除外部事件监听器
     */
    private _removeExternalListeners(): void {
        this._externalClickHandler?.();
        this._externalClickHandler = undefined;
        this._escapeHandler = undefined;
    }

    /**
     * 克隆内容到容器中
     * @returns 是否成功添加了内容
     */
    private _cloneContent(): boolean {
        const container = this.container;

        // 清除之前的内容（保留箭头元素）
        const nodesToRemove: Node[] = [];
        container.childNodes.forEach((child) => {
            if (child !== this._arrowElement) {
                nodesToRemove.push(child);
            }
        });

        nodesToRemove.forEach((node) => {
            container.removeChild(node);
        });

        // 如果有hotspot元素且有data-tooltip或data-slot属性，优先使用
        if (this._currentHotspotElement) {
            const tooltip = this._currentHotspotElement.dataset.tips;
            const slot = this._currentHotspotElement.dataset.popupSlot;

            if (tooltip) {
                // 使用data-tips内容（HTML格式）
                const tooltipWrapper = document.createElement("div");
                tooltipWrapper.innerHTML = tooltip;
                container.appendChild(tooltipWrapper);
                return true;
            }

            if (slot) {
                // 使用指定的slot内容
                const childNodes = getSlots(this.host as LitElement, slot);
                if (childNodes.length > 0) {
                    childNodes.forEach((child) => {
                        const clonedChild = child.cloneNode(true);
                        container.appendChild(clonedChild);
                    });
                    return true;
                }
            }
        }

        // 获取host元素的指定slot内容（默认行为）
        const childNodes = getSlots(this.host as LitElement, this.options.slot);

        if (childNodes.length > 0) {
            childNodes.forEach((child) => {
                const clonedChild = child.cloneNode(true);
                container.appendChild(clonedChild);
            });
            return true;
        }

        return false;
    }

    /**
     * 清空容器内容
     */
    clearContent(): void {
        const container = this.container;

        // 清除内容（保留箭头元素）
        const nodesToRemove: Node[] = [];
        container.childNodes.forEach((child) => {
            if (child !== this._arrowElement) {
                nodesToRemove.push(child);
            }
        });

        nodesToRemove.forEach((node) => {
            container.removeChild(node);
        });
    }

    /**
     * 触发弹出层显示事件
     */
    private _triggerShowEvent(container: HTMLElement): void {
        const event = new CustomEvent("popup:show", {
            bubbles: true,
            composed: true,
            detail: {
                container: container,
                controller: this,
                timestamp: Date.now(),
            },
        });

        // 从host元素触发事件
        (this.host as unknown as HTMLElement).dispatchEvent(event);
    }

    /**
     * 触发弹出层隐藏事件
     */
    private _triggerHideEvent(container: HTMLElement): void {
        const event = new CustomEvent("popup:hide", {
            bubbles: true,
            composed: true,
            detail: {
                container: container,
                controller: this,
                timestamp: Date.now(),
            },
        });

        // 从host元素触发事件
        (this.host as unknown as HTMLElement).dispatchEvent(event);
    }
    /**
     * 销毁控制器
     */
    destroy(): void {
        this.hide();
        this._cleanup?.();
        this._showAnimation?.pause();
        this._hideAnimation?.pause();
        this._clearDelayHideTimer();
        this._clearMouseLeaveTimer();
        this._removeHotspotElements();

        // 清理箭头元素
        if (this._arrowElement?.parentNode) {
            this._arrowElement.parentNode.removeChild(this._arrowElement);
            this._arrowElement = undefined;
        }
    }
}
