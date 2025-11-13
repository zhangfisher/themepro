/**
 *
 *  下拉菜单组件
 *
 */
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";
import { styles } from "./styles";
import { AutoElementBase } from "../../elements/base";
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
    animationDuration?: number = 300;

    @property({ type: String })
    animationEasing?: string = "easeOutQuart";

    @state()
    private _isAnimating: boolean = false;

    private _dropdownContainer?: HTMLElement;
    private _cleanup?: () => void;
    private _externalClickHandler?: () => void;
    private _escapeHandler?: (e: KeyboardEvent) => void;
    private _showAnimation?: any;
    private _hideAnimation?: any;
    onInitState(): void {
        if (!this.state) this.state = {};
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener("click", this._onTriggerClick as EventListener);
        this.addEventListener("keydown", this._onKeydown as EventListener);
        // 延迟初始化dropdown内容，确保DOM已完全加载
        requestAnimationFrame(() => {
            this._initializeDropdown();
        });
    }

    disconnectedCallback(): void {
        this.removeEventListener(
            "click",
            this._onTriggerClick as EventListener
        );
        this.removeEventListener("keydown", this._onKeydown as EventListener);
        this._cleanup?.();
        this._destroyDropdown();
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
     * 初始化dropdown：移动内容到body中的auto-container
     */
    private _initializeDropdown(): void {
        const dropdownElement = this.querySelector(".dropdown") as HTMLElement;
        if (!dropdownElement) return;

        // 确保auto-container存在
        let container = this.ownerDocument.querySelector(
            ".auto-container"
        ) as HTMLElement;
        if (!container) {
            container = this.ownerDocument.createElement("div");
            container.className = "auto-container";
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 9999;
            `;
            this.ownerDocument.body.appendChild(container);
        }

        // 创建dropdown容器
        this._dropdownContainer = this.ownerDocument.createElement("div");
        this._dropdownContainer.className = "auto-dropdown-popup";
        this._dropdownContainer.style.cssText = `
            position: absolute;
            pointer-events: auto;
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
            visibility: hidden;
        `;

        // 克隆dropdown内容
        const clone = dropdownElement.cloneNode(true) as HTMLElement;
        clone.style.display = "block";
        this._dropdownContainer.appendChild(clone);

        container.appendChild(this._dropdownContainer);
    }

    private _destroyDropdown(): void {
        if (this._dropdownContainer?.parentNode) {
            this._dropdownContainer.parentNode.removeChild(
                this._dropdownContainer
            );
            this._dropdownContainer = undefined;
        }
        this._cleanup?.();
        this._showAnimation?.cancel();
        this._hideAnimation?.cancel();
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

    private _showDropdown(): void {
        if (!this._dropdownContainer) return;

        this._isAnimating = true;

        // 停止任何正在进行的隐藏动画
        this._hideAnimation?.cancel();

        // 设置初始状态
        this._dropdownContainer.style.visibility = "visible";
        this._dropdownContainer.style.pointerEvents = "auto";

        // 使用Web Animations API创建显示动画
        const keyframes = [
            {
                opacity: 0,
                transform: 'scale(0.9) translateY(-10px)'
            },
            {
                opacity: 1,
                transform: 'scale(1) translateY(0)'
            }
        ];

        const options = {
            duration: this.animationDuration,
            easing: this.animationEasing || 'ease-out',
            fill: 'forwards' as FillMode
        };

        this._showAnimation = this._dropdownContainer.animate(keyframes, options);

        // 设置动画回调
        this._showAnimation.addEventListener('finish', () => {
            this._isAnimating = false;
            this._showAnimation = undefined;
        });

        this._updatePosition();
        this._setupExternalListeners();

        this.dispatchEvent(
            new CustomEvent("dropdown-show", {
                bubbles: true,
                composed: true,
            })
        );
    }

    private _hideDropdown(): void {
        if (!this._dropdownContainer) return;

        this._isAnimating = true;

        // 停止任何正在进行的显示动画
        this._showAnimation?.cancel();

        // 使用Web Animations API创建隐藏动画
        const keyframes = [
            {
                opacity: 1,
                transform: 'scale(1) translateY(0)'
            },
            {
                opacity: 0,
                transform: 'scale(0.9) translateY(-10px)'
            }
        ];

        const options = {
            duration: this.animationDuration,
            easing: this.animationEasing || 'ease-in',
            fill: 'forwards' as FillMode
        };

        this._hideAnimation = this._dropdownContainer.animate(keyframes, options);

        // 设置动画回调
        this._hideAnimation.addEventListener('finish', () => {
            this._isAnimating = false;
            this._dropdownContainer!.style.visibility = "hidden";
            this._dropdownContainer!.style.pointerEvents = "none";
            this._hideAnimation = undefined;
            this._removeExternalListeners();
        });

        this.dispatchEvent(
            new CustomEvent("dropdown-hide", {
                bubbles: true,
                composed: true,
            })
        );
    }

    private _updatePosition(): void {
        if (!this._dropdownContainer) return;

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
            this.ownerDocument.addEventListener("keydown", this._escapeHandler);

            this._externalClickHandler = () => {
                this.ownerDocument.removeEventListener(
                    "click",
                    handleDocumentClick,
                    true
                );
                this.ownerDocument.removeEventListener(
                    "keydown",
                    this._escapeHandler!
                );
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
            <div class="dropdown" style="display: none;">
                <slot name="dropdown"></slot>
            </div>
        `;
    }
}
