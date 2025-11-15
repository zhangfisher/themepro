/**
 *
 *  下拉菜单组件
 *
 */
import { html } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";
import { styles } from "./styles";
import {
    computePosition,
    flip,
    offset,
    shift,
    autoUpdate,
    hide,
} from "@floating-ui/dom";
import { animate } from "animejs";

import { AutoButton, type AutoButtonProps } from "../Button";
import { createThemeproContainer } from "../../utils/createThemeproContainer";
import { getSlots } from "@/utils/getSlots";

export interface AutoDropdownProps extends AutoButtonProps {
    /**
     * 弹出内容宽度是否匹配触发按钮宽度
     */
    fitWidth?: boolean;
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
     * 是否显示下拉内容
     */
    open?: boolean;
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
}

@customElement("auto-dropdown")
export class AutoDropdown extends AutoButton {
    static styles = [AutoButton.styles, styles] as any;

    @property({ type: Boolean })
    fitWidth?: boolean = false;

    @property({ type: String })
    placement:
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
        | "right-end" = "bottom-start";

    @property({ type: Array })
    offset?: [number, number] = [0, 4];

    @property({ type: Boolean, reflect: true })
    open?: boolean = false;

    @property({ type: Boolean })
    persistent?: boolean = false;

    @property({ type: Number })
    animationDuration: number = 50;

    @property({ type: String })
    animationEasing?: string = "easeOutQuart";

    private _dropdownContainer?: HTMLElement;
    private _cleanup?: () => void;
    private _externalClickHandler?: () => void;
    private _escapeHandler?: (e: KeyboardEvent) => void;
    private _showAnimation?: any;
    private _hideAnimation?: any;
    private _containerInitialized?: boolean;

    onInitState(): void {
        if (!this.state) this.state = {};
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener("click", this._onTriggerClick as EventListener);
        this.addEventListener("keydown", this._onKeydown as EventListener);

        // 创建容器和弹窗容器（不依赖slot内容）
        this._createDropdownContainer();
    }

    disconnectedCallback(): void {
        this.removeEventListener(
            "click",
            this._onTriggerClick as EventListener
        );
        this.removeEventListener("keydown", this._onKeydown as EventListener);
        this._cleanup?.();
        this._destroyDropdownContainer();
        super.disconnectedCallback();
    }

    protected updated(changed: Map<string | number | symbol, unknown>): void {
        if (changed.has("open")) {
            if (this.open) {
                this._showDropdown();
            } else {
                this._hideDropdown();
            }
        }
        if (
            changed.has("placement") ||
            changed.has("offset") ||
            changed.has("fitWidth")
        ) {
            if (this.open) {
                this._updatePosition();
            }
        }
        super.updated(changed);
    }

    /**
     * 创建dropdown容器（不依赖slot内容）
     */
    private _createDropdownContainer(): void {
        if (this._containerInitialized) return;

        // 使用工具函数创建全局.themepro-container
        const container = createThemeproContainer(this);

        // 创建dropdown容器
        this._dropdownContainer = this.ownerDocument.createElement("div");
        this._dropdownContainer.className = "dropdown";
        this._dropdownContainer.style.cssText = `
            position: absolute;
            pointer-events: auto;
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
            visibility: hidden;
        `;

        container.appendChild(this._dropdownContainer);
        this._containerInitialized = true;
    }

    /**
     * 初始化slot内容：将slot内容克隆到容器中
     */
    private _updateDropdownContent(): void {
        if (!this._dropdownContainer) {
            console.error("Dropdown container not initialized");
            return;
        }
        if (this._dropdownContainer.children.length !== 0) return;

        // 克隆Slots元素
        const childNodes = getSlots(this);

        childNodes.forEach((child) => {
            const clonedChild = child.cloneNode(true);
            this._dropdownContainer!.appendChild(clonedChild);
        });
    }

    /**
     * 销毁dropdown容器
     */
    private _destroyDropdownContainer(): void {
        if (this._dropdownContainer?.parentNode) {
            this._dropdownContainer.parentNode.removeChild(
                this._dropdownContainer
            );
            this._dropdownContainer = undefined;
        }
        this._cleanup?.();
        this._showAnimation?.pause();
        this._hideAnimation?.pause();
        this._containerInitialized = false;
    }

    private _onTriggerClick = (e: MouseEvent) => {
        if (this.disabled) {
            e.preventDefault();
            return;
        }

        // 阻止事件冒泡，避免触发其他点击事件
        e.stopPropagation();

        this.open = !this.open;
        this.dispatchEvent(
            new CustomEvent("dropdown-toggle", {
                detail: { open: this.open },
                bubbles: true,
                composed: true,
            })
        );
    };

    private _onKeydown = (e: KeyboardEvent) => {
        if (this.disabled) return;

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.open = !this.open;
        } else if (e.key === "Escape" && this.open) {
            e.preventDefault();
            this.open = false;
        }
    };

    private async _showDropdown(): Promise<void> {
        // 确保slot内容已初始化
        this._updateDropdownContent();

        if (!this._dropdownContainer) return;

        // 停止任何正在进行的隐藏动画
        this._hideAnimation?.pause();

        // 设置初始状态
        this._dropdownContainer.style.visibility = "visible";
        this._dropdownContainer.style.pointerEvents = "auto";

        // 设置外部事件监听器
        this._setupExternalListeners();

        // 先同步计算显示位置，确保定位准确
        await this._updatePositionSync();

        // 位置计算完成后再开始显示动画
        // 使用animejs创建显示动画
        this._showAnimation = animate(this._dropdownContainer, {
            opacity: [0, 1],
            scale: [0.9, 1],
            translateY: [-10, 0],
            duration: this.animationDuration,
            easing: this.animationEasing || "easeOutQuart",
        });

        // 设置动画回调
        if (this._showAnimation?.finished) {
            this._showAnimation.finished.then(() => {
                this._showAnimation = undefined;
            });
        }

        this.dispatchEvent(
            new CustomEvent("dropdown-show", {
                bubbles: true,
                composed: true,
            })
        );
    }

    private _hideDropdown(): void {
        if (!this._dropdownContainer) return;

        // 停止任何正在进行的显示动画
        this._showAnimation?.pause();

        // 使用animejs创建隐藏动画
        this._hideAnimation = animate(this._dropdownContainer, {
            opacity: [1, 0],
            scale: [1, 0.9],
            translateY: [0, -10],
            duration: this.animationDuration || 300,
            easing: this.animationEasing || "easeInQuart",
        });

        // 设置动画回调
        if (this._hideAnimation?.finished) {
            this._hideAnimation.finished.then(() => {
                this._dropdownContainer!.style.visibility = "hidden";
                this._dropdownContainer!.style.pointerEvents = "none";
                this._hideAnimation = undefined;
                this._removeExternalListeners();
            });
        } else {
            // 如果动画对象异常，直接执行完成逻辑
            setTimeout(() => {
                if (this._dropdownContainer) {
                    this._dropdownContainer.style.visibility = "hidden";
                    this._dropdownContainer.style.pointerEvents = "none";
                }
                this._hideAnimation = undefined;
                this._removeExternalListeners();
            }, this.animationDuration || 300);
        }

        this.dispatchEvent(
            new CustomEvent("dropdown-hide", {
                bubbles: true,
                composed: true,
            })
        );
    }

    private async _updatePositionSync(): Promise<void> {
        if (!this._dropdownContainer) return;

        // 同步计算位置，确保首次显示时的定位准确
        const { x, y, middlewareData } = await computePosition(
            this,
            this._dropdownContainer,
            {
                placement: this.placement,
                middleware: [
                    offset({
                        mainAxis: this.offset?.[1] || 4,
                        crossAxis: this.offset?.[0] || 0,
                    }),
                    flip(),
                    shift({
                        padding: 8,
                    }),
                    hide({
                        strategy: "referenceHidden",
                    }),
                ],
            }
        );

        if (this._dropdownContainer) {
            const { referenceHidden } = middlewareData.hide || {};

            Object.assign(this._dropdownContainer.style, {
                left: `${x}px`,
                top: `${y}px`,
                visibility: referenceHidden ? "hidden" : "visible",
            });

            // 处理宽度适配
            if (this.fitWidth) {
                const triggerWidth = this.getBoundingClientRect().width;
                this._dropdownContainer.style.width = `${triggerWidth}px`;
            }
        }

        // 设置自动更新，用于响应后续的位置变化
        this._cleanup = autoUpdate(this, this._dropdownContainer, () => {
            computePosition(this, this._dropdownContainer!, {
                placement: this.placement,
                middleware: [
                    offset({
                        mainAxis: this.offset?.[1] || 4,
                        crossAxis: this.offset?.[0] || 0,
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
                ],
            }).then(({ x, y, middlewareData }) => {
                if (this._dropdownContainer) {
                    const { referenceHidden } = middlewareData.hide || {};

                    Object.assign(this._dropdownContainer.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                        visibility: referenceHidden ? "hidden" : "visible",
                    });

                    // 处理宽度适配
                    if (this.fitWidth) {
                        const triggerWidth = this.getBoundingClientRect().width;
                        this._dropdownContainer.style.width = `${triggerWidth}px`;
                    }
                }
            });
        });
    }

    private _updatePosition(): void {
        if (!this._dropdownContainer) return;

        // 立即计算一次位置，确保首次显示时的定位准确
        computePosition(this, this._dropdownContainer, {
            placement: this.placement,
            middleware: [
                offset({
                    mainAxis: this.offset?.[1] || 4,
                    crossAxis: this.offset?.[0] || 0,
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
            ],
        }).then(({ x, y, middlewareData }) => {
            if (this._dropdownContainer) {
                const { referenceHidden } = middlewareData.hide || {};

                Object.assign(this._dropdownContainer.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                    visibility: referenceHidden ? "hidden" : "visible",
                });

                // 处理宽度适配
                if (this.fitWidth) {
                    const triggerWidth = this.getBoundingClientRect().width;
                    this._dropdownContainer.style.width = `${triggerWidth}px`;
                }
            }
        });

        // 设置自动更新，用于响应后续的位置变化
        this._cleanup = autoUpdate(this, this._dropdownContainer, () => {
            computePosition(this, this._dropdownContainer!, {
                placement: this.placement,
                middleware: [
                    offset({
                        mainAxis: this.offset?.[1] || 4,
                        crossAxis: this.offset?.[0] || 0,
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
                ],
            }).then(({ x, y, middlewareData }) => {
                if (this._dropdownContainer) {
                    const { referenceHidden } = middlewareData.hide || {};

                    Object.assign(this._dropdownContainer.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                        visibility: referenceHidden ? "hidden" : "visible",
                    });

                    // 处理宽度适配
                    if (this.fitWidth) {
                        const triggerWidth = this.getBoundingClientRect().width;
                        this._dropdownContainer.style.width = `${triggerWidth}px`;
                    }
                }
            });
        });
    }

    private _setupExternalListeners(): void {
        if (this.persistent) return;

        const handleDocumentClick = (e: Event) => {
            const path = e.composedPath();
            if (
                !path.includes(this) &&
                !path.includes(this._dropdownContainer!)
            ) {
                this.open = false;
            }
        };

        this._escapeHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && this.open) {
                this.open = false;
            }
        };

        setTimeout(() => {
            this.ownerDocument.addEventListener(
                "click",
                handleDocumentClick,
                true
            );

            if (this._escapeHandler) {
                this.ownerDocument.addEventListener(
                    "keydown",
                    this._escapeHandler
                );
            }

            this._externalClickHandler = () => {
                this.ownerDocument.removeEventListener(
                    "click",
                    handleDocumentClick,
                    true
                );
                if (this._escapeHandler) {
                    this.ownerDocument.removeEventListener(
                        "keydown",
                        this._escapeHandler
                    );
                }
            };
        }, 0);
    }

    private _removeExternalListeners(): void {
        this._externalClickHandler?.();
        this._externalClickHandler = undefined;
        this._escapeHandler = undefined;
    }

    render() {
        return html`
            ${super.render()}
            <slot style="display:none"></slot>
        `;
    }
}
