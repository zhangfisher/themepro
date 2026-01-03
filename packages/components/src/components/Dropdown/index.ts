/**
 *
 *  下拉菜单组件
 *
 *  使用 TooltipController 实现弹出控制,通过 dataPrefix="popup" 自定义 data 属性前缀
 *
 *  工作原理:
 *  - 点击组件时,触发具有 data-popup 属性的元素的显示
 *  - 通过 TooltipController 管理弹出层的创建、定位、动画和生命周期
 *  - 支持通过 data-popup-* 属性配置弹出行为
 *
 */
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";
import { styles } from "./styles";
import { AutoButton, type AutoButtonProps } from "../Button";
import {
    TooltipController,
    type TooltipControllerOptions,
} from "../../controllers/tooltip";
import { objectProperty } from "@/utils";

export interface AutoDropdownProps extends AutoButtonProps {
    /**
     * 弹出层配置选项,所有弹出相关的配置都通过此属性设置
     */
    popupOptions?: Partial<TooltipControllerOptions>;
    /**
     * 是否显示下拉内容
     */
    open?: boolean;
    /**
     * 显示一个下拉方向指示箭头
     * 使用<auto-icon name="arrow" rotate="<角度>"></auto-icon>
     *
     * - none: 不显示箭头
     * - auto: 会根据_tooltipController.options.placement的值来自动决定显示的指示箭头的方向和显示位置
     *        当placement.startsWith("left")时,并在open=true叶指示箭头向右显示(rotate=0),open=false时指示箭头向左显示(rotate=180),在renderBefore中渲染
     *        当placement.startsWith("right")时,相反方向,在renderAfter中渲染
     *        当placement.startsWith("top")时,并在open=true叶指示箭头向上显示(rotate=-90),open=false时指示箭头向下显示(rotate=90),在renderAfter中渲染
     *        当placement.startsWith("bottom")时,并在open=true叶指示箭头向下显示(rotate=90),open=false时指示箭头向上显示(rotate=-90),在renderAfter中渲染
     * - before: 强制在renderBefore中渲染指示箭头,使用auto相同的方向逻辑
     * - after: 强制在renderAfter中渲染指示箭头,箭头始终指向弹出方向
     * - top | bottom | left | right: 强制箭头方向,不受placement和open状态影响
     */
    caret?: "none" | "auto" | "before" | "after";
}

@customElement("auto-dropdown")
export class AutoDropdown extends AutoButton {
    static styles = [AutoButton.styles, styles] as any;

    @objectProperty()
    popupOptions?: Partial<TooltipControllerOptions>;

    @property({ type: Boolean, reflect: true })
    open?: boolean = false;

    @property({ type: String, reflect: true })
    caret?: AutoDropdownProps["caret"] = "auto";

    /**
     * 使用 TooltipController 管理弹出层
     * 通过 dataPrefix="popup" 使其监听 data-popup-* 属性
     */
    private _tooltipController?: TooltipController;

    // 内部状态标记,避免循环触发
    private _isInternalUpdate: boolean = false;
    private _isPopupVisible: boolean = false;

    // 保存当前箭头旋转值
    @state()
    private _currentRotate: number = 0;

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener("click", this._onTriggerClick as EventListener);
        this.addEventListener("keydown", this._onKeydown as EventListener);
        this.addEventListener(
            "tooltip:close",
            this._onCloseEvent as EventListener
        );

        // 初始化 TooltipController
        this._initializeTooltipController();
    }

    disconnectedCallback(): void {
        this.removeEventListener(
            "click",
            this._onTriggerClick as EventListener
        );
        this.removeEventListener("keydown", this._onKeydown as EventListener);
        this.removeEventListener(
            "tooltip:close",
            this._onCloseEvent as EventListener
        );
        this._tooltipController = undefined;
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

        // 如果 popupOptions 发生变化,更新控制器配置
        if (changed.has("popupOptions") && this._tooltipController) {
            this._updateControllerOptions();
            // placement 可能变化,需要更新箭头方向
            this._updateArrowRotation();
        }

        // 如果 caret 属性发生变化,更新箭头方向
        if (changed.has("caret")) {
            this._updateArrowRotation();
        }

        // 重置内部更新标记
        if (this._isInternalUpdate) {
            this._isInternalUpdate = false;
        }

        super.updated(changed);
    }

    /**
     * 初始化 TooltipController
     * 使用 dataPrefix="popup" 使其监听 data-popup-* 属性而非默认的 data-tooltip-*
     */
    private _initializeTooltipController(): void {
        if (this._tooltipController) return;

        this._tooltipController = new TooltipController(this, {
            dataPrefix: "popup", // 关键: 使用 "popup" 作为 data 属性前缀
            optionAttr: "popupOptions",
            trigger: "click",
            className: "dropdown",
            onShow: () => this._onPopupShow(),
            onHide: () => this._onPopupHide(),
            ...this.popupOptions,
        });
    }

    /**
     * 更新控制器配置
     */
    private _updateControllerOptions(): void {
        if (!this._tooltipController) return;

        // 更新基础配置
        Object.assign(this._tooltipController.options, {
            ...this.popupOptions,
            dataPrefix: "popup",
            trigger: "click",
            className: "dropdown",
            onShow: () => this._onPopupShow(),
            onHide: () => this._onPopupHide(),
        });
    }

    /**
     * TooltipController 显示时回调
     */
    private _onPopupShow(): void {
        if (this._isPopupVisible) return;

        this._isInternalUpdate = true;
        this._isPopupVisible = true;
        this.open = true;

        // 更新箭头旋转角度并触发重新渲染
        this._updateArrowRotation();
        this.requestUpdate();
    }

    /**
     * TooltipController 隐藏时回调
     */
    private _onPopupHide(): void {
        if (!this._isPopupVisible) return;

        this._isInternalUpdate = true;
        this._isPopupVisible = false;
        this.open = false;

        // 更新箭头旋转角度并触发重新渲染
        this._updateArrowRotation();
        this.requestUpdate();
    }

    private _onTriggerClick = (e: MouseEvent) => {
        if (this.disabled) {
            e.preventDefault();
            return;
        }

        // 阻止事件冒泡,避免触发其他点击事件
        e.stopPropagation();

        // 切换弹出层状态
        // TooltipController 会自动查找具有 data-popup 属性的元素并显示
        if (this._isPopupVisible) {
            this._hideDropdown();
        } else {
            this._showDropdown();
        }
    };

    private _onCloseEvent = (_e: CustomEvent): void => {
        if (this.open) {
            this._hideDropdown();
        }
    };

    private _onKeydown = (e: KeyboardEvent) => {
        if (this.disabled) return;

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (this._isPopupVisible) {
                this._hideDropdown();
            } else {
                this._showDropdown();
            }
        } else if (e.key === "Escape" && this.open) {
            e.preventDefault();
            this._hideDropdown();
        }
    };

    /**
     * 显示下拉菜单
     * 通过 TooltipController 的 tooltips 管理器添加并显示当前元素
     */
    private async _showDropdown(): Promise<void> {
        if (!this._tooltipController) {
            this._initializeTooltipController();
        }

        if (this._tooltipController && !this._isPopupVisible) {
            // 添加当前元素到 tooltips 管理器并显示
            // TooltipController 会查找元素上的 data-popup-* 属性
            this._tooltipController.tooltips
                .add(this, {
                    ...this._tooltipController.options,
                    trigger: "click",
                })
                .show();
        }
    }

    /**
     * 隐藏下拉菜单
     */
    private _hideDropdown(): void {
        if (this._isPopupVisible) {
            // 隐藏所有 tooltips
            this._tooltipController?.tooltips.hide();
        }
    }

    protected override renderAfter() {
        if (["none", "before"].includes(this.caret!)) return;
        if (this.caret === "auto" && this._shouldRenderInBefore())
            return html``;

        return html`<auto-icon
            name="arrow"
            rotate="${this._currentRotate}"
        ></auto-icon>`;
    }

    protected override renderBefore() {
        if (["none", "after"].includes(this.caret!)) return;
        if (this.caret === "auto" && !this._shouldRenderInBefore())
            return html``;

        return html`<auto-icon
            name="arrow"
            rotate="${this._currentRotate}"
        ></auto-icon>`;
    }

    /**
     * 判断在 auto 模式下是否应该在 renderBefore 中渲染箭头
     * 根据设计注释:当placement.startsWith("left")时在renderBefore中渲染,其他情况在renderAfter中渲染
     */
    private _shouldRenderInBefore(): boolean {
        const placement =
            this._tooltipController?.options?.placement || "bottom-start";
        return placement.startsWith("left");
    }

    /**
     * 强制重新计算并更新箭头旋转角度
     */
    private _updateArrowRotation(): void {
        this._currentRotate = this._calculateArrowRotation();
    }

    /**
     * 计算箭头旋转角度
     */
    private _calculateArrowRotation(): number {
        const placement =
            this._tooltipController?.options?.placement || "bottom-start";
        const isOpen = this.open;
        if (placement.startsWith("left")) {
            return isOpen ? 0 : 180; // open: 向右(0°), close: 向左(180°)
        } else if (placement.startsWith("right")) {
            return isOpen ? 180 : 0; // open: 向左(180°), close: 向右(0°)
        } else if (placement.startsWith("top")) {
            return isOpen ? 90 : -90; // open: 向上(-90°), close: 向下(90°)
        } else {
            // bottom (默认)
            return isOpen ? -90 : 90; // open: 向下(90°), close: 向上(-90°)
        }
    }

    render() {
        return html`
            ${super.render()}
            <!-- 下拉内容插槽,通过 TooltipController 的 data-popup-slot 机制使用 -->
            <slot style="display:none"></slot>
        `;
    }
}
