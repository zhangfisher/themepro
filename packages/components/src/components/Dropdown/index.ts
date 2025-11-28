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
    /**
     * 显示一个下拉方向指示箭头
     * 使用<auto-icon name="arrow" rotate="<角度>"></auto-icon>
     *
     * - none: 显示
     * - auto: 会根据_popupController.options.placement的值来自动决定显示的指示箭头的方向和显示位置
     *        当placement.startsWith("left")时，并在open=true叶指示箭头向右显示(rotate=0)，open=false时指示箭头向左显示(rotate=180)，在renderBefore中渲染
     *        当placement.startsWith("right")时，相反方向，在renderAfter中渲染
     *        当placement.startsWith("top")时，并在open=true叶指示箭头向上显示(rotate=-90)，open=false时指示箭头向下显示(rotate=90)，在renderAfter中渲染
     *        当placement.startsWith("bottom")时，并在open=true叶指示箭头向下显示(rotate=90)，open=false时指示箭头向上显示(rotate=-90)，在renderAfter中渲染
     *
     * - "before" | "after": 强制在renderBefore和renderAfter中渲染指示箭头
     *
     */
    caret?: "none" | "auto" | "before" | "after";
}

@customElement("auto-dropdown")
export class AutoDropdown extends AutoButton {
    static styles = [AutoButton.styles, styles] as any;

    @property({ type: Object })
    popupOptions?: Partial<PopupControllerOptions>;

    @property({ type: Boolean, reflect: true })
    open?: boolean = false;

    @property({ type: String, reflect: true })
    caret?: AutoDropdownProps["caret"] = "auto";

    private _popupController?: PopupController;

    // 内部状态标记，避免循环触发
    private _isInternalUpdate: boolean = false;
    private _isPopupVisible: boolean = false;

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
        // 只在非内部更新时响应 open 属性变化
        if (changed.has("open") && !this._isInternalUpdate) {
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
                onShow: () => this._onPopupShow(),
                onHide: () => this._onPopupHide(),
            });
        }

        // 重置内部更新标记
        if (this._isInternalUpdate) {
            this._isInternalUpdate = false;
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
            onShow: () => this._onPopupShow(),
            onHide: () => this._onPopupHide(),
        });
    }

    /**
     * PopupController 显示时回调
     */
    private _onPopupShow(): void {
        if (!this.open || this._isPopupVisible) return;

        this._isInternalUpdate = true;
        this._isPopupVisible = true;
        this.open = true;

        this.requestUpdate();
    }

    /**
     * PopupController 隐藏时回调
     */
    private _onPopupHide(): void {
        if (!this.open || !this._isPopupVisible) return;

        this._isInternalUpdate = true;
        this._isPopupVisible = false;
        this.open = false;

        this.requestUpdate();
    }

    private _onTriggerClick = (e: MouseEvent) => {
        if (this.disabled) {
            e.preventDefault();
            return;
        }

        // 阻止事件冒泡，避免触发其他点击事件
        e.stopPropagation();

        // 切换弹出层状态
        if (this._popupController) {
            this._popupController.toggle();
        }
    };

    private _onCloseEvent = (_e: CustomEvent): void => {
        if (this._popupController && this.open) {
            this._popupController.hide();
        }
    };

    private _onKeydown = (e: KeyboardEvent) => {
        if (this.disabled) return;

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (this._popupController) {
                this._popupController.toggle();
            }
        } else if (e.key === "Escape" && this.open) {
            e.preventDefault();
            if (this._popupController) {
                this._popupController.hide();
            }
        }
    };

    private async _showDropdown(): Promise<void> {
        if (!this._popupController) {
            this._initializePopupController();
        }

        if (this._popupController && !this._isPopupVisible) {
            await this._popupController.show();
        }
    }

    private _hideDropdown(): void {
        if (this._popupController && this._isPopupVisible) {
            this._popupController.hide();
        }
    }

    protected override renderAfter() {
        return html`<auto-icon name="arrow"></auto-icon>`;
    }

    render() {
        return html`
            ${super.render()}
            <slot style="display:none"></slot>
        `;
    }
}
