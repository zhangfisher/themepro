/**
 *
 *  下拉菜单组件
 *
 */
import { html } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";
import { styles } from "./styles";

import { AutoButton, type AutoButtonProps } from "../Button";
import { PopupController } from "../../controllers/popup";

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
    /**
     * 是否显示指示箭头
     */
    arrow?: boolean;
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

    @property({ type: Boolean })
    arrow?: boolean = false;

    private _popupController?: PopupController;

    onInitState(): void {
        if (!this.state) this.state = {};
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener("click", this._onTriggerClick as EventListener);
        this.addEventListener("keydown", this._onKeydown as EventListener);
        this.addEventListener(
            "popup:close",
            this._onCloseEvent as EventListener
        );

        // 初始化PopupController（会自动创建容器）
        this._initializePopupController();
    }

    disconnectedCallback(): void {
        this.removeEventListener(
            "click",
            this._onTriggerClick as EventListener
        );
        this.removeEventListener("keydown", this._onKeydown as EventListener);
        this.removeEventListener(
            "popup:close",
            this._onCloseEvent as EventListener
        );
        this._popupController = undefined;
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
        super.updated(changed);
    }

    /**
     * 初始化PopupController
     */
    private _initializePopupController(): void {
        if (this._popupController) return;

        this._popupController = new PopupController(this, {
            onShow: () => {
                // this.dispatchEvent(
                //     new CustomEvent("dropdown-show", {
                //         bubbles: true,
                //         composed: true,
                //     })
                // );
            },
            onHide: () => {
                // this.dispatchEvent(
                //     new CustomEvent("dropdown-hide", {
                //         bubbles: true,
                //         composed: true,
                //     })
                // );
            },
        });
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

    private _onCloseEvent = (_e: CustomEvent): void => {
        if (this.open) {
            this.open = false;
        }
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
        if (!this._popupController) {
            this._initializePopupController();
        }

        if (this._popupController) {
            await this._popupController.show();
        }
    }

    private _hideDropdown(): void {
        if (this._popupController) {
            this._popupController.hide();
        }
    }

    render() {
        return html`
            ${super.render()}
            <slot style="display:none"></slot>
        `;
    }
}
