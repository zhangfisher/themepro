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
import {
    PopupController,
    type PopupControllerOptions,
} from "../../controllers/popup";

export interface AutoDropdownProps extends AutoButtonProps {
    /**
     * 弹出层配置选项，所有弹出相关的配置都通过此属性设置
     */
    popupOptions?: PopupControllerOptions;
    /**
     * 是否显示下拉内容
     */
    open?: boolean;
}

@customElement("auto-dropdown")
export class AutoDropdown extends AutoButton {
    static styles = [AutoButton.styles, styles] as any;

    @property({ type: Object })
    popupOptions?: Partial<PopupControllerOptions>;

    @property({ type: Boolean, reflect: true })
    open?: boolean = false;
    private _popupController?: PopupController;

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

        // 如果 popupOptions 发生变化，更新控制器配置
        if (changed.has("popupOptions") && this._popupController) {
            this._popupController.updateOptions({
                ...this.popupOptions,
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

        super.updated(changed);
    }

    /**
     * 初始化PopupController
     */
    private _initializePopupController(): void {
        if (this._popupController) return;

        this._popupController = new PopupController(this, {
            ...this.popupOptions,
            optionAttr: "popup-options",
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
