import { queryClosestElement } from "@/utils/queryClosestElement";
import type { TooltipController } from "./controller";
import type { TooltipControllerOptions, TooltipPlacement } from "./types";
import {
    arrow,
    autoUpdate,
    computePosition,
    type ComputePositionReturn,
    flip,
    hide,
    offset,
    shift,
} from "@floating-ui/dom";
import { animate } from "animejs";
import { getSlotNodes } from "@/utils/getSlotNodes";
import type { LitElement } from "lit";
import { parseObjectFromAttr } from "@/utils/parseObjectFromAttr";
import { getDatasetFromElement } from "@/utils/getDatasetFromElement";

export class Tooltip {
    options: TooltipControllerOptions;
    private _container?: HTMLElement;
    private _arrowElement?: HTMLElement;
    private _showAnimation?: any;
    private _hideAnimation?: any;
    private _delayHideTimer?: NodeJS.Timeout;
    private _mouseLeaveTimer?: NodeJS.Timeout;
    private _isVisible: boolean = false;
    private _target?: HTMLElement;
    private _onEscapeKeyPress?: (e: KeyboardEvent) => void;
    private _onContainerMouseEnter?: (e: MouseEvent) => void;
    private _onContainerMouseLeave?: (e: MouseEvent) => void;
    private _onRefMouseLeave?: () => void;
    private _onExternalClick?: () => void;
    private _cleanup?: () => void;
    el: WeakRef<HTMLElement>;
    constructor(
        el: HTMLElement,
        public controller: TooltipController,
        options: TooltipControllerOptions = {}
    ) {
        this.el = new WeakRef(el);
        this.options = Object.assign(
            {
                placement: "top" as TooltipPlacement,
                offset: [0, 4],
                animationDuration: 150,
                animationEasing: "easeOutQuart",
                className: "tooltip",
                arrow: true,
                trigger: "mouseover",
                delayHide: 0,
            },
            options
        );
        this._parseAttrOptions();
        this._init();
    }
    get ref() {
        return this.el.deref()!;
    }
    get container() {
        return this._container!;
    }
    get host() {
        return this.controller.hostElement;
    }
    /**
     *  获取目标元素，即tooltip的显示位置
     *  用于计算tooltip的位置
     */
    get target() {
        if (!this._target) {
            if (typeof this.options.transfer === "string") {
                const target = queryClosestElement(
                    this.ref,
                    this.options.transfer
                );
                if (target instanceof HTMLElement) {
                    this._target = target;
                    return this._target;
                }
            }
            this._target = this.ref;
        }
        return this._target!;
    }
    private _init() {
        const content = this._getTooltipContent();
        if (content) {
            this._container = this._createTooltipContainer();
            this._setTooltipContent(content);
            this.controller.themeproContainer.appendChild(this._container);
        }
    }
    /**
     * 解析元素上的工具提示选项属性
     *
     * 1. 从指定的属性名（默认为"tooltipOptions"）中解析JSON格式的选项
     * 2. 从data-tooltip-*属性中解析单个选项值
     * 3. 根据选项值的类型自动转换属性值（数字、布尔值、对象或字符串）
     *
     * @private 这是一个内部方法
     */
    private _parseAttrOptions() {
        if (this.ref instanceof HTMLElement) {
            const optionAttr = this.options.optionAttr ?? "tooltipOptions";
            const attrOptions = parseObjectFromAttr(this.ref, optionAttr);
            Object.assign(
                this.options,
                attrOptions,
                getDatasetFromElement(
                    this.ref,
                    Object.keys(this.options),
                    "tooltip"
                )
            );
            // 解析data-tooltip-<option>属性
        }
    }

    /**
     * 根据配置读取tooltip内容
     *
     * tooltip内容的解析原则:
     *
     * - data-tooltip="html字符串"
     * - data-tooltip="slot://<从host元素读取指定slotname>"
     * - data-tooltip="query://<指定CSS选择器>"
     * - data-tooltip="query://<在ref元素内部查询>"
     *
     *
     */
    private _getTooltipContent(): string | undefined {
        const tooltipAttr = this.ref.getAttribute("data-tooltip");
        if (!tooltipAttr) return;

        // 检查是否是slot引用：slot::<slotname>
        if (tooltipAttr.startsWith("slot://")) {
            const slotName = tooltipAttr.substring(7); // 去掉 "slot::"
            const slotNodes = getSlotNodes(
                this.controller.host as LitElement,
                slotName
            );
            if (slotNodes.length > 0) {
                // 将slot内容转换为HTML字符串
                const tempDiv = document.createElement("div");
                slotNodes.forEach((node) => {
                    tempDiv.appendChild(node.cloneNode(true));
                });
                return tempDiv.innerHTML;
            }
        } else if (tooltipAttr.startsWith("query://")) {
            const query = tooltipAttr.substring(8);
            const queryResult = this.ref.querySelector(query);
            if (queryResult) {
                return queryResult.innerHTML;
            }
        } else {
            return tooltipAttr;
        }
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
        contentWrapper.classList.add("tooltip-content");
        contentWrapper.innerHTML = content;
        this._container.appendChild(contentWrapper);
    }
    /**
     * 创建tooltip容器
     */
    private _createTooltipContainer() {
        const container = this.host.ownerDocument!.createElement("div");
        if (this.options.className) {
            container.classList.add(this.options.className);
        }
        container.style.cssText = `
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
        container.addEventListener("tooltip:close", () => {
            this.hide();
        });
        if (this.options.arrow) {
            const arrowElement = this._createArrowElement(container);
            if (arrowElement) {
                container.appendChild(arrowElement);
            }
            this._arrowElement = arrowElement;
        }
        container.style.visibility = "visible";
        container.style.pointerEvents = "auto";
        return container;
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
     * 设置外部事件监听器
     */
    private _setupEventListeners(): void {
        const container = this.container;
        const hostElement = this.host as unknown as HTMLElement;

        const handleDocumentClick = (e: Event) => {
            const path = e.composedPath();
            if (!path.includes(hostElement) && !path.includes(container)) {
                this.hide();
            }
        };

        this._onEscapeKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Escape" && this._isVisible) {
                this.hide();
            }
        };

        // 为tooltip容器添加mouseenter和mouseleave事件监听器
        this._onContainerEventListeners();

        // 为this.ref添加mouseleave事件监听器
        this._onRefMouseLeave = () => {
            this._mouseLeaveTimer = setTimeout(() => {
                this.hide();
            }, 100);
        };
        this.ref.addEventListener("mouseleave", this._onRefMouseLeave);

        // 延迟添加事件监听器，避免当前事件触发
        setTimeout(() => {
            const document = hostElement.ownerDocument;
            document.addEventListener("click", handleDocumentClick, true);

            if (this._onEscapeKeyPress) {
                document.addEventListener("keydown", this._onEscapeKeyPress);
            }

            this._onExternalClick = () => {
                document.removeEventListener(
                    "click",
                    handleDocumentClick,
                    true
                );
                if (this._onEscapeKeyPress) {
                    document.removeEventListener(
                        "keydown",
                        this._onEscapeKeyPress
                    );
                }
            };
        }, 0);
    }
    /**
     * 移除外部事件监听器
     */
    private _removeEventListeners(): void {
        this._onExternalClick?.();
        this._onExternalClick = undefined;
        this._onEscapeKeyPress = undefined;

        // 移除this.ref的mouseleave事件监听器
        if (this._onRefMouseLeave) {
            this.ref.removeEventListener("mouseleave", this._onRefMouseLeave);
            this._onRefMouseLeave = undefined;
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
     * 设置tooltip容器的事件监听器
     */
    private _onContainerEventListeners(): void {
        if (!this._container) return;
        this._onContainerMouseEnter = (e: MouseEvent) => {
            e.stopPropagation();
            // 鼠标进入tooltip容器，清除延迟隐藏定时器
            this._clearMouseLeaveTimer();
        };

        this._onContainerMouseLeave = (e: MouseEvent) => {
            e.stopPropagation();
            // 鼠标离开tooltip容器，启动延迟隐藏
            this._mouseLeaveTimer = setTimeout(() => {
                this.hide();
            }, 100);
        };

        this._container.addEventListener(
            "mouseenter",
            this._onContainerMouseEnter
        );

        this._container.addEventListener(
            "mouseleave",
            this._onContainerMouseLeave
        );
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
     * 创建箭头元素
     */
    private _createArrowElement(container: HTMLElement): HTMLElement {
        const arrowElement = this.host.ownerDocument!.createElement("div");
        arrowElement.className = "tooltip-arrow";
        arrowElement.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            z-index: 1;
            pointer-events: none;
            transform: rotate(45deg);
            display: ${this.options.arrow ? "block" : "none"};
        `;
        arrowElement.style.backgroundColor = container.style.backgroundColor;
        return arrowElement;
    }

    /**
     * 设置自动更新
     */
    private _setupAutoUpdate(): void {
        // 清理之前的自动更新
        this._cleanup?.();
        // 设置新的自动更新
        this._cleanup = autoUpdate(this.target, this.container, () => {
            // 使用统一的位置计算函数进行自动更新
            this._calculatePosition((position) => {
                if (this._isVisible) {
                    this._applyPosition(position);
                }
            });
        });
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
            if (this._arrowElement) {
                this._arrowElement.style.display = "none";
            }
            return;
        }

        this._arrowElement.style.display = "block";

        const { x, y } = middlewareData.arrow;
        const currentPlacement = placement || this.options.placement || "top";

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
     * 创建浮层中间件配置
     */
    private _createMiddleware(isAutoUpdate: boolean = false): any[] {
        // 计算基础偏移量和箭头偏移量
        const baseOffset = this.options.offset?.[1] || 8;
        const middleware = [
            offset({
                crossAxis: this.options.offset?.[0] || 0,
                mainAxis: baseOffset + (this.options.arrow ? 4 : 0),
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
     * 统一的位置计算函数 - 消除重复代码
     * @param callback 可选的回调函数，用于处理计算结果
     */
    private async _calculatePosition(
        callback?: (position: ComputePositionReturn) => void
    ): Promise<ComputePositionReturn> {
        const currentOptions = this.options;
        const middleware = this._createMiddleware();
        const position = await computePosition(this.target, this.container, {
            placement: currentOptions.placement!,
            middleware,
        });

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
    async show() {
        if (this._isVisible) return;
        // 停止任何正在进行的隐藏动画
        this._hideAnimation?.pause();

        // 清理之前的延迟隐藏定时器
        this._clearDelayHideTimer();
        // 设置外部事件监听器
        this._setupEventListeners();

        // 先同步计算显示位置，确保定位准确
        await this._updatePosition(true, true);

        // 位置计算完成后再开始显示动画
        const targets = [this.container];
        if (this.options.arrow && this._arrowElement) {
            targets.push(this._arrowElement);
        }

        this._showAnimation = animate(targets, {
            opacity: [0, 1],
            scale: [0.9, 1],
            translateY: [-5, 0],
            duration: this.options.animationDuration!,
            easing: this.options.animationEasing || "easeOutQuart",
        });

        this._isVisible = true;
        this.options.onShow?.();

        // 延迟自动隐藏
        this._setDelayHide();
    }
    /**
     * 设置延迟隐藏
     */
    private _setDelayHide() {
        if (this.options.delayHide && this.options.delayHide > 0) {
            this._delayHideTimer = setTimeout(() => {
                this.hide();
            }, this.options.delayHide);
        }
    }
    /**
     * 隐藏提示框
     */
    hide() {
        if (!this._isVisible) return;

        const container = this.container;
        const options = this.options;
        // 停止任何正在进行的显示动画
        this._showAnimation?.pause();

        // 清理延迟隐藏定时器
        this._clearDelayHideTimer();

        // 使用animejs创建隐藏动画
        const targets = [container];
        if (options.arrow && this._arrowElement) {
            targets.push(this._arrowElement);
        }

        this._hideAnimation = animate(targets, {
            opacity: [1, 0],
            scale: [1, 0.9],
            translateY: [0, -5],
            duration: options.animationDuration || options.animationDuration!,
            easing:
                options.animationEasing ||
                options.animationEasing ||
                "easeInQuart",
        });

        // 设置动画回调
        if (this._hideAnimation?.finished) {
            this._hideAnimation.finished.then(() => {
                container.style.visibility = "hidden";
                container.style.pointerEvents = "none";
                this._hideAnimation = undefined;
                this._removeEventListeners();
            });
        } else {
            // 如果动画对象异常，直接执行完成逻辑
            setTimeout(() => {
                container.style.visibility = "hidden";
                container.style.pointerEvents = "none";
                this._hideAnimation = undefined;
                this._removeEventListeners();
            }, options.animationDuration || options.animationDuration!);
        }

        this._isVisible = false;
        options.onHide?.();

        // 移除容器事件监听器
        this._removeContainerEventListeners();
    }
    /**
     * 移除tooltip容器的事件监听器
     */
    private _removeContainerEventListeners(): void {
        if (!this._container) return;
        if (this._onContainerMouseEnter) {
            this._container.removeEventListener(
                "mouseenter",
                this._onContainerMouseEnter
            );
            this._onContainerMouseEnter = undefined;
        }

        if (this._onContainerMouseLeave) {
            this._container.removeEventListener(
                "mouseleave",
                this._onContainerMouseLeave
            );
            this._onContainerMouseLeave = undefined;
        }
    }
    destroy() {
        this.hide();
        this._removeEventListeners();
        this._removeContainerEventListeners();
        this.controller.themeproContainer?.removeChild(this.container);
    }
}
