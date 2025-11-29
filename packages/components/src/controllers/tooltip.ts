/**
 * TooltipController - 轻量级提示框控制器
 *
 * 为组件内的任意元素添加tooltip功能
 *
 * 使用方法：
 *
 * class MyComponent extends LitElement {
 *   tooltip = new TooltipController(this, {
 *      trigger: 'mouseover' | 'click',
 *      placement: 'top',
 *   })
 * }
 *
 * 工作方式：
 * - host元素侦听click和mousemove事件，包括冒泡委托事件，
 *   当trigger为mouseover时，鼠标进入时调用tooltip.show()，离开时调用tooltip.hide()，控制tooltip显示和隐藏
 *   当trigger为click时，点击时调用tooltip.show()，再次点击时调用tooltip.hide()，控制tooltip显示和隐藏
 * - 当触发元素具有data-tooltip属性时，在进入时调用tooltip.show()，离开时调用tooltip.hide()
 * - data-tooltip属性支持html内容，也可以形如data-tooltip="slot::<slotname>"，从host内部具名slot作为提示信息
 * - data-tooltip-options用于传入TooltipOptions，覆盖全局TooltipControllerOptions，这样可以为不同的元素设置不同的提示信息和样式
 * - 也支持为data-tooltip-options每一个成员单独指定data-tooltip-<options.key>属性，用于覆盖全局TooltipControllerOptions的对应成员，比如data-tooltip-placement="bottom"
 * - data-tooltip-options支持json格式，比如data-tooltip-options='{"placement":"bottom"}'
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
import type { LitElement } from "lit";
import { parseObjectFromAttr } from "@/utils/parseObjectFromAttr";
import { getSlotNodes } from "@/utils/getSlotNodes";

export type TooltipPlacement =
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

export type TooltipTriggerEvent = "click" | "mouseover";

export interface TooltipControllerOptions {
    /**
     * 提示框位置
     */
    placement?: TooltipPlacement;
    /**
     * 提示框偏移量 [crossAxis, mainAxis]
     */
    offset?: [number, number];
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
     * 是否显示指示箭头，默认为false
     */
    arrow?: boolean;
    /**
     * 绑定属性名称，配置参数将从host的该属性中读取参数
     */
    optionAttr?: string;
    /**
     * 触发显示的事件类型，默认为'mouseover'
     */
    trigger?: "click" | "mouseover";
    /**
     * 延迟隐藏时间（毫秒），大于0的值将在指定时间后自动隐藏
     */
    delayHide?: number;
    /**
     * 提示框显示时触发
     */
    onShow?: () => void;
    /**
     * 提示框隐藏时触发
     */
    onHide?: () => void;
}

export class TooltipController implements ReactiveController {
    private host: ReactiveControllerHost;
    options: TooltipControllerOptions;
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
    private _mouseLeaveTimer?: NodeJS.Timeout;
    private _currentTooltipElement?: HTMLElement;
    private _tooltipDelegateHandler?: (e: Event) => void;
    private _mouseoverMouseMoveHandler?: (e: MouseEvent) => void;
    private _previousTooltipElement?: HTMLElement;
    private _isMouseInValidArea: boolean = false;
    private _tooltipContainerMouseEnterHandler?: (e: MouseEvent) => void;
    private _tooltipContainerMouseLeaveHandler?: (e: MouseEvent) => void;
    private _containerEventListenersAdded: boolean = false;
    private _userOptions?: Record<string, any>;

    /**
     * 检查是否应该显示新的tooltip
     */
    private async _shouldShowNewTooltip(): Promise<boolean> {
        // 如果已经可见，检查是否是切换场景
        if (this._isVisible && this._currentTooltipElement) {
            // 检查当前容器是否已经被隐藏
            const currentContainer = this._container;
            if (
                currentContainer &&
                currentContainer.style.visibility === "hidden"
            ) {
                console.log(
                    "current container is hidden, should show new tooltip"
                );
                return true;
            } else {
                console.log(
                    "current container is visible, should not show new tooltip"
                );
                return false;
            }
        }

        // 如果不可见，应该显示
        if (!this._isVisible) {
            console.log("not visible, should show new tooltip");
            return true;
        }

        // 默认情况，应该显示
        console.log("default case, should show new tooltip");
        return true;
    }

    constructor(
        host: ReactiveControllerHost,
        options: TooltipControllerOptions = {}
    ) {
        this.host = host;
        this._userOptions = options;
        this.options = this._initOptions(options);
        host.addController(this);
    }

    /**
     * 合并配置选项：从 host 属性读取默认值，与传入的 options 合并
     */
    private _initOptions(
        userOptions?: TooltipControllerOptions
    ): TooltipControllerOptions {
        const hostElement = this.host as any;
        const optionAttr = userOptions?.optionAttr ?? "tooltipOptions";
        const defaultOptions: TooltipControllerOptions = {
            placement: "top" as TooltipPlacement,
            offset: [0, 8],
            animationDuration: 150,
            animationEasing: "easeOutQuart",
            className: "tooltip",
            arrow: true,
            trigger: "mouseover",
            delayHide: 0,
        };

        // 从绑定属性读取配置
        const attrOptions = parseObjectFromAttr(
            hostElement,
            optionAttr,
            defaultOptions
        );

        // 合并配置，用户选项优先级最高
        return {
            ...userOptions, // 用户传入的配置（中间层）
            ...attrOptions, // 从属性读取的配置（最高优先级）
            onShow: this._userOptions?.onShow,
            onHide: this._userOptions?.onHide,
        };
    }

    /**
     * 获取提示框容器
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
        const currentOptions = this._getCurrentTooltipOptions();
        const arrowElement = hostElement.ownerDocument!.createElement("div");
        arrowElement.className = "tooltip-arrow";
        arrowElement.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            z-index: 1;
            pointer-events: none;
            transform: rotate(45deg);
            display: ${currentOptions.arrow ? "block" : "none"};
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
        const currentOptions = this._getCurrentTooltipOptions();
        if (
            !currentOptions.arrow ||
            !this._arrowElement ||
            !middlewareData.arrow ||
            !this._container
        ) {
            if (this._arrowElement) {
                this._arrowElement.style.display = "none";
            }
            return;
        }

        this._arrowElement.style.display = "block";

        const { x, y } = middlewareData.arrow;
        const currentPlacement = placement || currentOptions.placement || "top";

        const side = currentPlacement.split("-")[0];
        const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
        }[side] as string;

        const arrowLen = this._arrowElement.offsetWidth;

        Object.assign(this._arrowElement.style, {
            left: x != null ? `${x}px` : "",
            top: y != null ? `${y}px` : "",
            right: "",
            bottom: "",
            [staticSide]: `${-arrowLen / 2}px`,
            transform: "rotate(45deg)",
        });

        this._setArrowBorderByPlacement(currentPlacement);
    }

    /**
     * 根据placement设置箭头边框显示
     */
    private _setArrowBorderByPlacement(placement: string): void {
        if (!this._arrowElement || !this._container) return;

        const containerStyle = window.getComputedStyle(this._container);
        this._arrowElement.style.border = containerStyle.border;

        if (placement.startsWith("bottom")) {
            Object.assign(this._arrowElement.style, {
                borderBottomColor: "transparent",
                borderRightColor: "transparent",
            });
        } else if (placement.startsWith("top")) {
            Object.assign(this._arrowElement.style, {
                borderLeftColor: "transparent",
                borderTopColor: "transparent",
            });
        } else if (placement.startsWith("left")) {
            Object.assign(this._arrowElement.style, {
                borderLeftColor: "transparent",
                borderBottomColor: "transparent",
            });
        } else if (placement.startsWith("right")) {
            Object.assign(this._arrowElement.style, {
                borderTopColor: "transparent",
                borderRightColor: "transparent",
            });
        }
    }

    /**
     * 创建tooltip容器
     */
    private _createTooltipContainer(): void {
        if (this._container) return;

        const hostElement = this.host as unknown as LitElement;
        const currentOptions = this._getCurrentTooltipOptions();

        this._container = hostElement.ownerDocument!.createElement("div");
        this._container.className = currentOptions.className || "tooltip";

        this._container.style.cssText = `
            position: absolute;
            pointer-events: auto;
            opacity: 0;
            transform: scale(0.9) translateY(-5px);
            visibility: hidden;
            z-index: 1000;
            background-color: var(--auto-bgcolor);
            border-radius: 6px;
            padding: 8px 12px;
            font-size: 14px;
            color: var(--auto-color);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            max-width: 300px;
            word-wrap: break-word;
            white-space: pre-wrap;
        `;

        // 监听tooltip-close事件
        this._container.addEventListener("tooltip:close", () => {
            this.hide();
        });

        if (currentOptions.arrow) {
            this._arrowElement = this._createArrowElement();
            if (this._arrowElement) {
                this._container.appendChild(this._arrowElement);
            }
        }

        if (
            currentOptions.className &&
            currentOptions.className !== "tooltip"
        ) {
            this._container.classList.add(currentOptions.className);
        }
    }

    /**
     * 创建容器
     */
    private _createContainer(): void {
        if (this._container) return;

        const themeproContainer = createThemeproContainer(
            this.host as LitElement
        );
        if (!this._container) {
            this._createTooltipContainer();
            if (this._container && themeproContainer) {
                themeproContainer.appendChild(this._container);
            }
        }
    }

    /**
     * ReactiveController 生命周期 - host 连接时调用
     */
    hostConnected(): void {
        this._setupTriggerEvents();
    }

    /**
     * ReactiveController 生命周期 - host 更新时调用
     */
    hostUpdate(): void {
        this._setupTriggerEvents();
    }

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
        this._setupMouseoverEventListeners(hostElement);
    }

    /**
     * 设置click事件委托处理
     */
    private _setupClickEventDelegation(hostElement: HTMLElement): void {
        this._tooltipDelegateHandler = (e: Event) => {
            const matchedElement = this._findTooltipElement(e);

            if (matchedElement) {
                const elementOptions =
                    this._getElementTooltipOptions(matchedElement);
                const trigger = elementOptions.trigger || this.options.trigger!;

                if (trigger === "click") {
                    e.preventDefault();
                    e.stopPropagation();

                    if (
                        this._isVisible &&
                        this._currentTooltipElement === matchedElement
                    ) {
                        this.hide();
                    } else {
                        this._currentTooltipElement = matchedElement;
                        this.show();
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

    /**
     * 为mouseover触发的tooltip元素添加统一的事件监听器
     */
    private _setupMouseoverEventListeners(hostElement: HTMLElement): void {
        const currentOptions = this._getCurrentTooltipOptions();

        // 清理之前的监听器
        this._removeMouseoverEventListeners();

        this._mouseoverMouseMoveHandler = (e: MouseEvent) => {
            const composedPath = e.composedPath();
            const hostElement = this.host as unknown as HTMLElement;

            // 查找当前鼠标位置的具有data-tooltip属性的元素
            let currentTooltipElement: HTMLElement | null = null;

            for (let i = 0; i < composedPath.length; i++) {
                const element = composedPath[i];

                // 检查是否是具有data-tooltip属性的元素
                if (
                    element instanceof HTMLElement &&
                    element.hasAttribute?.("data-tooltip")
                ) {
                    // 确保元素在host范围内
                    if (
                        element === hostElement ||
                        hostElement.contains(element)
                    ) {
                        currentTooltipElement = element;
                        break;
                    }
                }
            }

            // 设置鼠标在有效区域的标志 - 只针对data-tooltip元素
            this._isMouseInValidArea = currentTooltipElement !== null;

            // 处理data-tooltip元素的进入和离开事件
            if (currentTooltipElement) {
                // 检查是否切换到不同的tooltip元素
                if (this._currentTooltipElement !== currentTooltipElement) {
                    // 如果当前已有tooltip元素，先离开它（传递当前元素，不触发hide）
                    if (this._currentTooltipElement) {
                        this._onLeaveTooltipElementForSwitch();
                    }
                    // 然后进入新的tooltip元素
                    this._onEnterTooltipElement(currentTooltipElement);
                }
                // 如果是同一个元素，不做处理（避免重复触发）
            } else if (this._currentTooltipElement) {
                // 没有找到任何tooltip元素，离开当前的tooltip元素
                this._onLeaveTooltipElement(e as MouseEvent);
            }
        };

        // 在host元素上添加mousemove监听器
        hostElement.addEventListener(
            "mousemove",
            this._mouseoverMouseMoveHandler
        );
    }

    /**
     * 移除mouseover触发的tooltip元素的事件监听器
     */
    private _removeMouseoverEventListeners(): void {
        const hostElement = this.host as unknown as HTMLElement;

        if (this._mouseoverMouseMoveHandler) {
            hostElement.removeEventListener(
                "mousemove",
                this._mouseoverMouseMoveHandler
            );
            this._mouseoverMouseMoveHandler = undefined;
        }

        this._previousTooltipElement = undefined;
    }

    /**
     * 处理进入tooltip元素
     */
    private _onEnterTooltipElement(element: HTMLElement): void {
        const elementOptions = this._getElementTooltipOptions(element);
        const trigger = elementOptions.trigger || this.options.trigger!;

        if (trigger === "mouseover") {
            // 防止重复显示同一个元素的tooltip
            const previousElement = this._currentTooltipElement;
            this._currentTooltipElement = element;
            this._previousTooltipElement = element;

            // 如果是同一个元素且已可见，直接返回（避免重复显示）
            if (previousElement === element && this._isVisible) {
                console.log("same element already visible, skip");
                return;
            }

            // 清理之前的延迟隐藏定时器
            this._clearMouseLeaveTimer();

            // 如果当前可见且是不同的元素，先隐藏再显示
            if (this._isVisible && previousElement !== element) {
                this.hide();
                // 使用较短的延迟后显示新的tooltip
                setTimeout(() => {
                    this.show();
                }, 50);
            } else {
                // 直接显示新元素的tooltip
                this.show();
            }
        }
    }

    /**
     * 处理离开tooltip元素
     */
    private _onLeaveTooltipElement(event?: MouseEvent): void {
        if (!this._currentTooltipElement) {
            return;
        }

        // 事件源检测：如果事件来自当前tooltip元素内部，不处理
        if (event && this._isEventFromCurrentTooltipElement(event)) {
            return;
        }

        // 如果已经有延迟隐藏定时器在运行，不重复设置
        if (this._mouseLeaveTimer) {
            return;
        }

        const elementOptions = this._getElementTooltipOptions(
            this._currentTooltipElement
        );
        const trigger = elementOptions.trigger || this.options.trigger!;

        if (trigger === "mouseover" && this._isMouseInValidArea === false) {
            // 不在任何有效区域，启动延迟隐藏
            const delayHide = this.options.delayHide ?? 30; // 使用全局配置，默认30ms
            this._mouseLeaveTimer = setTimeout(() => {
                // 再次检查当前鼠标位置是否在有效范围内
                if (!this._isMouseInValidArea) {
                    this.hide();
                }
                // 清除定时器引用
                this._mouseLeaveTimer = undefined;
            }, delayHide);
        }
    }

    /**
     * 处理tooltip元素切换时的离开逻辑
     */
    private _onLeaveTooltipElementForSwitch(): void {
        if (!this._currentTooltipElement) {
            return;
        }

        const elementOptions = this._getElementTooltipOptions(
            this._currentTooltipElement
        );
        const trigger = elementOptions.trigger || this.options.trigger!;

        if (trigger === "mouseover") {
            // 立即清理当前元素的延迟隐藏定时器
            this._clearMouseLeaveTimer();

            // 保存当前容器引用，避免影响新的tooltip容器
            const currentContainer = this._container;
            const currentIsVisible = this._isVisible;

            // 立即隐藏当前tooltip容器，避免影响新tooltip
            if (currentContainer && currentIsVisible) {
                console.log("hiding current container for switch");
                currentContainer.style.visibility = "hidden";
                currentContainer.style.pointerEvents = "none";
                // 注意：不要立即设置 this._isVisible = false，让后续的 show() 正常工作
                // this._isVisible = false; // 移除这行，让 show() 方法来管理状态

                // 清理外部监听器
                this._removeExternalListeners();

                // 清理自动更新
                this._cleanup?.();
                this._cleanup = undefined;
            }

            // 保持当前tooltip状态，但允许新元素覆盖内容
        }
    }

    /**
     * 检测事件是否来自当前tooltip元素内部
     */
    private _isEventFromCurrentTooltipElement(event: MouseEvent): boolean {
        if (!this._currentTooltipElement) {
            return false;
        }

        const composedPath = event.composedPath();
        const targetElement = composedPath[0] as HTMLElement;

        // 如果事件的直接目标元素在当前tooltip元素内部，则不处理
        return (
            targetElement &&
            targetElement !== this._currentTooltipElement &&
            this._currentTooltipElement.contains(targetElement)
        );
    }

    /**
     * 查找具有data-tooltip属性的元素
     */
    private _findTooltipElement(e: Event): HTMLElement | null {
        const composedPath = e.composedPath();
        const hostElement = this.host as unknown as HTMLElement;

        for (let i = 0; i < composedPath.length; i++) {
            const element = composedPath[i];
            if (
                element instanceof HTMLElement &&
                element.hasAttribute?.("data-tooltip")
            ) {
                // 确保元素在host范围内
                if (element === hostElement || hostElement.contains(element)) {
                    return element;
                }
            }
        }

        return null;
    }

    /**
     * 移除触发事件监听器
     */
    private _removeTriggerEvents(): void {
        const hostElement = this.host as unknown as HTMLElement;

        this._clearMouseLeaveTimer();

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
        this._removeMouseoverEventListeners();

        // 清理状态
        this._currentTooltipElement = undefined;

        // 移除容器事件监听器
        this._removeContainerEventListeners();
    }

    /**
     * ReactiveController 生命周期 - host 断开连接时调用
     */
    hostDisconnected(): void {
        this._removeTriggerEvents();
        this.destroy();
    }

    /**
     * 获取提示框可见状态
     */
    get isVisible(): boolean {
        return this._isVisible;
    }

    /**
     * 获取当前tooltip元素的配置选项
     */
    private _getCurrentTooltipOptions(): TooltipControllerOptions {
        const hostElement = this.host as unknown as HTMLElement;

        // 如果当前tooltip元素是host元素，直接使用this.options
        if (
            !this._currentTooltipElement ||
            this._currentTooltipElement === hostElement
        ) {
            return this.options;
        }

        const elementOptions = this._getElementTooltipOptions(
            this._currentTooltipElement
        );

        // 合并基础选项和元素选项，元素选项优先级更高
        return Object.assign({}, this.options, elementOptions);
    }

    /**
     * 获取元素的tooltip配置选项
     */
    private _getElementTooltipOptions(
        element: HTMLElement
    ): Partial<TooltipControllerOptions> {
        const elementOptions: Record<string, any> = {};

        // 解析data-tooltip-<option>属性
        const optionKeys: (keyof TooltipControllerOptions)[] = [
            "placement",
            "offset",
            "animationDuration",
            "animationEasing",
            "className",
            "arrow",
            "trigger",
            // 移除 delayHide，不在元素级别解析此属性
        ];

        for (const key of optionKeys) {
            const attrName = `data-tooltip-${key}`;
            if (element.hasAttribute(attrName)) {
                const value = element.getAttribute(attrName);
                if (key === "offset" && value) {
                    try {
                        elementOptions[key] = JSON.parse(value) as [
                            number,
                            number
                        ];
                    } catch {
                        console.warn(`Failed to parse ${attrName} as JSON`);
                    }
                } else if (key === "arrow") {
                    elementOptions[key] = value === "true";
                } else {
                    elementOptions[key] = value as any;
                }
            }
        }

        // 解析data-tooltip-options JSON格式配置
        const tooltipOptionsStr = element.getAttribute("data-tooltip-options");
        if (tooltipOptionsStr) {
            try {
                const parsedOptions = JSON.parse(tooltipOptionsStr);
                Object.assign(elementOptions, parsedOptions);
            } catch (error) {
                console.warn("Failed to parse data-tooltip-options:", error);
            }
        }

        return elementOptions;
    }

    /**
     * 获取tooltip内容
     */
    private _getTooltipContent(): string | null {
        if (!this._currentTooltipElement) return null;

        const tooltipAttr =
            this._currentTooltipElement.getAttribute("data-tooltip");
        if (!tooltipAttr) return null;

        // 检查是否是slot引用：slot::<slotname>
        if (tooltipAttr.startsWith("slot::")) {
            const slotName = tooltipAttr.substring(6); // 去掉 "slot::"
            const slotNodes = getSlotNodes(this.host as LitElement, slotName);

            if (slotNodes.length > 0) {
                // 将slot内容转换为HTML字符串
                const tempDiv = document.createElement("div");
                slotNodes.forEach((node) => {
                    tempDiv.appendChild(node.cloneNode(true));
                });
                return tempDiv.innerHTML;
            }
        }

        // 直接返回tooltip内容（支持HTML）
        return tooltipAttr;
    }

    /**
     * 显示提示框
     */
    async show(): Promise<void> {
        // 检查是否需要显示新的tooltip
        const shouldShow = await this._shouldShowNewTooltip();
        if (!shouldShow) {
            console.log("should not show new tooltip, skipping");
            return;
        }

        const container = this.container;
        const currentOptions = this._getCurrentTooltipOptions();
        const content = this._getTooltipContent();

        if (!content) {
            console.warn("No tooltip content available");
            return;
        }

        // 停止任何正在进行的隐藏动画
        this._hideAnimation?.pause();

        // 清理之前的延迟隐藏定时器
        this._clearDelayHideTimer();

        // 设置内容
        this._setTooltipContent(content);

        // 设置初始状态
        container.style.visibility = "visible";
        container.style.pointerEvents = "auto";

        // 设置外部事件监听器
        this._setupExternalListeners();

        // 先同步计算显示位置，确保定位准确
        await this._updatePosition(true, true);

        // 位置计算完成后再开始显示动画
        const targets = [container];
        if (currentOptions.arrow && this._arrowElement) {
            targets.push(this._arrowElement);
        }

        this._showAnimation = animate(targets, {
            opacity: [0, 1],
            scale: [0.9, 1],
            translateY: [-5, 0],
            duration: currentOptions.animationDuration!,
            easing: currentOptions.animationEasing || "easeOutQuart",
        });

        this._isVisible = true;
        currentOptions.onShow?.();

        // 延迟自动隐藏
        this._setDelayHide();
    }

    /**
     * 设置tooltip内容
     */
    private _setTooltipContent(content: string): void {
        if (!this._container) return;

        // 清除之前的内容（保留箭头元素）
        const nodesToRemove: Node[] = [];
        this._container.childNodes.forEach((child) => {
            if (child !== this._arrowElement) {
                nodesToRemove.push(child);
            }
        });

        nodesToRemove.forEach((node) => {
            this._container!.removeChild(node);
        });

        // 创建内容包装器
        const contentWrapper = document.createElement("div");
        contentWrapper.innerHTML = content;
        this._container.appendChild(contentWrapper);
    }

    /**
     * 设置延迟隐藏
     */
    private _setDelayHide() {
        const currentOptions = this._getCurrentTooltipOptions();
        if (currentOptions.delayHide && currentOptions.delayHide > 0) {
            this._delayHideTimer = setTimeout(() => {
                this.hide();
            }, currentOptions.delayHide);
        }
    }

    /**
     * 隐藏提示框
     */
    hide(): void {
        if (!this._isVisible) return;

        const container = this.container;
        const currentOptions = this._getCurrentTooltipOptions();

        // 停止任何正在进行的显示动画
        this._showAnimation?.pause();

        // 清理延迟隐藏定时器
        this._clearDelayHideTimer();

        // 使用animejs创建隐藏动画
        const targets = [container];
        if (currentOptions.arrow && this._arrowElement) {
            targets.push(this._arrowElement);
        }

        this._hideAnimation = animate(targets, {
            opacity: [1, 0],
            scale: [1, 0.9],
            translateY: [0, -5],
            duration:
                currentOptions.animationDuration ||
                this.options.animationDuration!,
            easing:
                currentOptions.animationEasing ||
                this.options.animationEasing ||
                "easeInQuart",
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
            }, currentOptions.animationDuration || this.options.animationDuration!);
        }

        this._isVisible = false;
        this._currentTooltipElement = undefined;
        currentOptions.onHide?.();

        // 移除容器事件监听器
        this._removeContainerEventListeners();
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
     * 清理鼠标离开定时器
     */
    private _clearMouseLeaveTimer(): void {
        if (this._mouseLeaveTimer) {
            clearTimeout(this._mouseLeaveTimer);
            this._mouseLeaveTimer = undefined;
        }
    }

    /**
     * 切换提示框显示状态
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
        const currentOptions = this._getCurrentTooltipOptions();

        // 计算基础偏移量和箭头偏移量
        const baseOffset = currentOptions.offset?.[1] || 8;
        const middleware = [
            offset({
                crossAxis: currentOptions.offset?.[0] || 0,
                mainAxis: baseOffset + (currentOptions.arrow ? 4 : 0),
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
        if (currentOptions.arrow && this._arrowElement) {
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
        // 如果有tooltip元素，使用tooltip元素
        if (this._currentTooltipElement) {
            return this._currentTooltipElement;
        }

        // 默认使用host元素
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
        const currentOptions = this._getCurrentTooltipOptions();
        const middleware = this._createMiddleware();
        const position = await computePosition(
            referenceElement,
            this.container,
            {
                placement: currentOptions.placement!,
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
     * 统一的位置更新函数
     * @param setupAutoUpdate 是否设置自动更新，默认为true
     * @param async 是否异步执行，默认为true（用于show时的同步等待）
     * @returns 如果async为true则返回Promise
     */
    private _updatePosition(
        setupAutoUpdate: boolean = true,
        async: boolean = true
    ): Promise<void> | void {
        const positionTask = this._calculatePosition((position) => {
            if (this._isVisible) {
                this._applyPosition(position);
            }
        });

        if (async) {
            return positionTask.then(() => {
                if (setupAutoUpdate) {
                    this._setupAutoUpdate();
                }
            });
        } else {
            positionTask.then(() => {
                if (setupAutoUpdate) {
                    this._setupAutoUpdate();
                }
            });
        }
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
            this._getReferenceElement(),
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

        // 为tooltip容器添加mouseenter和mouseleave事件监听器
        this._setupContainerEventListeners();

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
     * 设置tooltip容器的事件监听器
     */
    private _setupContainerEventListeners(): void {
        if (!this._container || this._containerEventListenersAdded) {
            return;
        }

        this._tooltipContainerMouseEnterHandler = (e: MouseEvent) => {
            e.stopPropagation();
            // 鼠标进入tooltip容器，清除延迟隐藏定时器
            this._clearMouseLeaveTimer();
        };

        this._tooltipContainerMouseLeaveHandler = (e: MouseEvent) => {
            e.stopPropagation();
            // 鼠标离开tooltip容器，启动延迟隐藏
            this._mouseLeaveTimer = setTimeout(() => {
                this.hide();
            }, 100);
        };

        this._container.addEventListener(
            "mouseenter",
            this._tooltipContainerMouseEnterHandler
        );

        this._container.addEventListener(
            "mouseleave",
            this._tooltipContainerMouseLeaveHandler
        );

        this._containerEventListenersAdded = true;
    }

    /**
     * 移除tooltip容器的事件监听器
     */
    private _removeContainerEventListeners(): void {
        if (!this._container || !this._containerEventListenersAdded) {
            return;
        }

        if (this._tooltipContainerMouseEnterHandler) {
            this._container.removeEventListener(
                "mouseenter",
                this._tooltipContainerMouseEnterHandler
            );
            this._tooltipContainerMouseEnterHandler = undefined;
        }

        if (this._tooltipContainerMouseLeaveHandler) {
            this._container.removeEventListener(
                "mouseleave",
                this._tooltipContainerMouseLeaveHandler
            );
            this._tooltipContainerMouseLeaveHandler = undefined;
        }

        this._containerEventListenersAdded = false;
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
     * 销毁控制器
     */
    destroy(): void {
        this.hide();
        this._cleanup?.();
        this._showAnimation?.pause();
        this._hideAnimation?.pause();
        this._clearDelayHideTimer();
        this._clearMouseLeaveTimer();
        this._removeTriggerEvents();

        // 清理箭头元素
        if (this._arrowElement?.parentNode) {
            this._arrowElement.parentNode.removeChild(this._arrowElement);
            this._arrowElement = undefined;
        }

        // 清理容器
        if (this._container?.parentNode) {
            this._container.parentNode.removeChild(this._container);
            this._container = undefined;
        }
    }
}
