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
import { KylinButton, type KylinButtonProps } from "../Button";
import {
    type PopupControllerOptions,
    PopupController,
    type TooltipControllerOptions,
} from "../../controllers/tooltip";
import { objectProperty } from "@/utils";

export interface KylinDropdownProps extends KylinButtonProps {
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
     * 使用<kylin-icon name="arrow" rotate="<角度>"></kylin-icon>
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
    /**
     * 用于指定弹出内容的slot名称
     */
    forSlot?: string;
}

@customElement("kylin-dropdown")
export class KylinDropdown extends KylinButton {
    static styles = [KylinButton.styles, styles] as any;

    @objectProperty()
    popupOptions?: Partial<PopupControllerOptions>;

    @property({ type: Boolean, reflect: true })
    open?: boolean = false;
    @property({ type: Boolean, reflect: true })
    cache?: boolean = false;
    @property({ type: String, reflect: true })
    caret?: KylinDropdownProps["caret"] = "auto";
    /**
     * 使用 TooltipController 管理弹出层
     * 通过 dataPrefix="popup" 使其监听 data-popup-* 属性
     */
    private _popupController?: InstanceType<typeof PopupController>;

    // 内部状态标记,避免循环触发
    private _isInternalUpdate: boolean = false;
    private _isPopupVisible: boolean = false;

    // 保存当前箭头旋转值
    @state()
    private _currentRotate: number = 0;

    connectedCallback(): void {
        super.connectedCallback();
        // 初始化 TooltipController
        this._initializePopupController();
    }

    disconnectedCallback(): void {
        this._popupController = undefined;
        super.disconnectedCallback();
    }

    protected updated(changed: Map<string | number | symbol, unknown>): void {
        // 只在非内部更新时响应 open 属性变化
        if (changed.has("open") && !this._isInternalUpdate) {
            if (this.open) {
                this.show();
            } else {
                this.hide();
            }
        }

        // 如果 popupOptions 发生变化,更新控制器配置
        if (changed.has("popupOptions") && this._popupController) {
            this._updateControllerOptions();
            this._updateArrowRotation(); // placement 可能变化,需要更新箭头方向
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
    private _initializePopupController(): void {
        if (this._popupController) return;

        this._popupController = new PopupController(this, {
            dataPrefix: "popup", // 关键: 使用 "popup" 作为 data 属性前缀
            trigger: "mouseover",
            className: "dropdown",
            onShow: () => this._onPopupShow(),
            onHide: () => this._onPopupHide(),
            ...this.popupOptions,
            cache: this.cache,
            dataset: {
                popup: "slot://",
            },
        });
    }

    /**
     * 更新控制器配置
     */
    private _updateControllerOptions(): void {
        if (!this._popupController) return;

        // 更新基础配置
        Object.assign(this._popupController.options, {
            ...this.popupOptions,
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

    /**
     * 显示下拉菜单
     * 通过 TooltipController 的 tooltips 管理器添加并显示当前元素
     */
    show() {
        if (!this._popupController) {
            this._initializePopupController();
        }
        this._popupController?.show();
    }
    /**
     * 隐藏下拉菜单
     */
    hide(): void {
        this._popupController?.hide();
    }

    protected override renderAfter() {
        if (["none", "before"].includes(this.caret!)) return;
        if (this.caret === "auto" && this._shouldRenderInBefore())
            return html``;

        return html`<kylin-icon
            name="triangle"
            rotate="${this._currentRotate}"
        ></kylin-icon>`;
    }

    protected override renderBefore() {
        if (["none", "after"].includes(this.caret!)) return;
        if (this.caret === "auto" && !this._shouldRenderInBefore())
            return html``;

        return html`<kylin-icon
            name="triangle"
            rotate="${this._currentRotate}"
        ></kylin-icon>`;
    }

    /**
     * 判断在 auto 模式下是否应该在 renderBefore 中渲染箭头
     * 根据设计注释:当placement.startsWith("left")时在renderBefore中渲染,其他情况在renderAfter中渲染
     */
    private _shouldRenderInBefore(): boolean {
        const placement =
            this._popupController?.options?.placement || "bottom-start";
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
            this._popupController?.options?.placement || "bottom-start";
        const isOpen = this.open;
        if (placement.startsWith("left")) {
            return isOpen ? 0 : 180; // open: 向右(0°), close: 向左(180°)
        } else if (placement.startsWith("right")) {
            return isOpen ? 180 : 0; // open: 向左(180°), close: 向右(0°)
        } else if (placement.startsWith("top")) {
            return isOpen ? 90 : -90; // open: 向上(-90°), close: 向下(90°)
        } else {
            return isOpen ? -90 : 90; // open: 向下(90°), close: 向上(-90°)
        }
    }

    render() {
        return html`
            ${super.render()}
            <slot style="display:none"></slot>
        `;
    }
}
