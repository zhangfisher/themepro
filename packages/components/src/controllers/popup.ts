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

export interface PopupControllerOptions {
    /**
     * 弹出位置偏好
     */
    placement?:
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
    popupWidth?: number | null;
    /**
     * 弹出容器高度，默认为null由内容决定
     */
    popupHeight?: number | null;
    /**
     * 是否显示指示箭头，默认为false
     */
    arrow?: boolean;
    /**
     * 弹出层显示时触发
     */
    onShow?: () => void;
    /**
     * 弹出层隐藏时触发
     */
    onHide?: () => void;
    /**
     * 位置更新时触发
     */
    onPositionUpdate?: (position: ComputePositionReturn) => void;
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

    constructor(
        host: ReactiveControllerHost,
        options: PopupControllerOptions = {}
    ) {
        this.host = host;
        this.options = this._mergeOptions(options);
        host.addController(this);
    }

    /**
     * 合并配置选项：从 host 属性读取默认值，与传入的 options 合并
     */
    private _mergeOptions(
        userOptions: PopupControllerOptions
    ): PopupControllerOptions {
        const hostElement = this.host as any;

        // 从 host 属性中读取默认配置（如果存在）
        const defaultOptions = {
            placement: hostElement.placement ?? "bottom-start",
            offset: hostElement.offset ?? [0, 4],
            fitWidth: hostElement.fitWidth ?? false,
            persistent: hostElement.persistent ?? false,
            animationDuration: hostElement.animationDuration ?? 100,
            animationEasing: hostElement.animationEasing ?? "easeOutQuart",
            className: hostElement.className ?? "popup",
            popupWidth: hostElement.popupWidth ?? null,
            popupHeight: hostElement.popupHeight ?? null,
            arrow: hostElement.arrow ?? false,
        };

        // 用户传入的选项优先级最高
        return {
            ...defaultOptions,
            ...userOptions,
        };
    }

    /**
     * 从 host 属性中更新配置选项（用户传入的选项不会被覆盖）
     */
    private _updateOptionsFromHost(): void {
        const hostElement = this.host as any;

        // 保存用户传入的选项（不能被 host 属性覆盖）
        const userOptions = {
            onShow: this.options.onShow,
            onHide: this.options.onHide,
            onPositionUpdate: this.options.onPositionUpdate,
        };

        // 从 host 属性读取最新配置
        const hostOptions = {
            placement: hostElement.placement,
            offset: hostElement.offset,
            fitWidth: hostElement.fitWidth,
            persistent: hostElement.persistent,
            animationDuration: hostElement.animationDuration,
            animationEasing: hostElement.animationEasing,
            popupWidth: hostElement.popupWidth,
            popupHeight: hostElement.popupHeight,
            arrow: hostElement.arrow,
        };

        // 合并配置，用户选项优先级最高
        this.options = {
            ...hostOptions,
            ...userOptions,
        };

        // 如果弹出层可见且更新了位置相关配置，重新计算位置
        if (
            this._isVisible &&
            (hostOptions.placement ||
                hostOptions.offset ||
                hostOptions.fitWidth ||
                hostOptions.popupWidth !== undefined ||
                hostOptions.popupHeight !== undefined ||
                hostOptions.arrow !== undefined)
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
            width: 8px;
            height: 8px;
            z-index: 1;
            pointer-events: none;
            opacity: 0;
            transform: rotate(45deg);
        `;
        return arrowElement;
    }

    /**
     * 更新箭头位置和样式
     */
    private _updateArrowPosition(
        middlewareData: ComputePositionReturn["middlewareData"]
    ): void {
        if (
            !this.options.arrow ||
            !this._arrowElement ||
            !middlewareData.arrow ||
            !this._container
        )
            return;

        const { x, y } = middlewareData.arrow;

        const placement = this.options.placement || "bottom-start";

        const side = placement.split("-")[0];
        const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
        }[side] as string;

        // 应用基础样式
        Object.assign(this._arrowElement.style, {
            left: x != null ? `${x}px` : "",
            top: y != null ? `${y}px` : "",
            right: "",
            bottom: "",
            [staticSide]: `${-this._arrowElement / 2}px`,
            transform: "rotate(45deg)",
        });

        // 根据placement设置边框显示
        this._setArrowBorderByPlacement(placement);
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
        `;

        // 监听dropdown-close事件
        this._container.addEventListener("dropdown-close", () => {
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
    }

    /**
     * ReactiveController 生命周期 - host 更新时调用
     */
    hostUpdate(): void {
        // 从 host 属性中读取最新的配置并更新
        this._updateOptionsFromHost();
    }

    /**
     * ReactiveController 生命周期 - host 断开连接时调用
     */
    hostDisconnected(): void {
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
                newOptions.popupWidth !== undefined ||
                newOptions.popupHeight !== undefined ||
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
        this._cloneContent();

        // 停止任何正在进行的隐藏动画
        this._hideAnimation?.pause();

        // 设置初始状态
        container.style.visibility = "visible";
        container.style.pointerEvents = "auto";

        // 设置外部事件监听器
        this._setupExternalListeners();

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

        this.options.onShow?.();
    }

    /**
     * 隐藏弹出层
     */
    hide(): void {
        if (!this._isVisible) return;

        const container = this.container;

        // 停止任何正在进行的显示动画
        this._showAnimation?.pause();

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
     * 同步更新位置
     */
    private async _updatePositionSync(): Promise<void> {
        const middleware = [
            offset({
                mainAxis: this.options.offset?.[1] || 4,
                crossAxis: this.options.offset?.[0] || 0,
            }),
            flip(),
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

        const position = await computePosition(
            this.host as unknown as HTMLElement,
            this.container,
            {
                placement: this.options.placement!,
                middleware,
            }
        );

        this._applyPosition(position);
        this._setupAutoUpdate();
    }

    /**
     * 更新位置
     */
    private _updatePosition(): void {
        const middleware = [
            offset({
                mainAxis: this.options.offset?.[1] || 4,
                crossAxis: this.options.offset?.[0] || 0,
            }),
            flip({
                fallbackAxisSideDirection: "start",
            }),
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

        computePosition(this.host as unknown as HTMLElement, this.container, {
            placement: this.options.placement!,
            middleware,
        }).then((position) => {
            this._applyPosition(position);
        });

        this._setupAutoUpdate();
    }

    /**
     * 应用位置到容器
     */
    private _applyPosition(position: ComputePositionReturn): void {
        const { x, y, middlewareData } = position;
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
                this.options.popupWidth !== null &&
                this.options.popupWidth !== undefined
            ) {
                container.style.minWidth = `${this.options.popupWidth}px`;
            }
        } else if (
            this.options.popupWidth !== null &&
            this.options.popupWidth !== undefined
        ) {
            // 非fitWidth模式下，popupWidth表示确切宽度
            container.style.width = `${this.options.popupWidth}px`;
        }

        // 处理高度控制
        if (
            this.options.popupHeight !== null &&
            this.options.popupHeight !== undefined
        ) {
            container.style.height = `${this.options.popupHeight}px`;
        }

        // 处理箭头位置
        this._updateArrowPosition(middlewareData);

        this.options.onPositionUpdate?.(position);
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
                const middleware = [
                    offset({
                        mainAxis: this.options.offset?.[1] || 4,
                        crossAxis: this.options.offset?.[0] || 0,
                    }),
                    flip({
                        fallbackAxisSideDirection: "start",
                    }),
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

                computePosition(
                    this.host as unknown as HTMLElement,
                    this.container,
                    {
                        placement: this.options.placement!,
                        middleware,
                    }
                ).then((position) => {
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
     * 移除外部事件监听器
     */
    private _removeExternalListeners(): void {
        this._externalClickHandler?.();
        this._externalClickHandler = undefined;
        this._escapeHandler = undefined;
    }

    /**
     * 克隆内容到容器中
     */
    private _cloneContent(): void {
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

        // 获取host元素的slot内容
        const childNodes = getSlots(this.host as LitElement);

        childNodes.forEach((child) => {
            const clonedChild = child.cloneNode(true);
            container.appendChild(clonedChild);
        });
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

        // 清理箭头元素
        if (this._arrowElement && this._arrowElement.parentNode) {
            this._arrowElement.parentNode.removeChild(this._arrowElement);
            this._arrowElement = undefined;
        }
    }
}
