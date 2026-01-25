import { customElement } from "lit/decorators/custom-element.js";
import { html } from "lit";
import { KylinStateElement } from "../../elements/state";
import { TooltipController } from "../../controllers/tooltip/controller";
import type {
    TooltipControllerOptions,
    TooltipOptions,
} from "../../controllers/tooltip/types";
import { styles } from "./styles";

export interface KylinApplicationrops {
    tooltip?: TooltipOptions;
}
/**a
 * AutoTooltip - Tooltip 提示框组件
 *
 * @example
 * ```html
 * <kylin-application>
 *   <kylin-button data-tooltip="提示内容">悬停我</kylin-button>
 * </kylin-application>
 * ```
 *
 * @example
 * ```html
 * <!-- 使用 data 属性 -->
 * <div data-tooltip="提示内容" data-tooltip-placement="top">
 *   目标元素
 * </div>
 * ```
 */
@customElement("kylin-application")
export class KylinApplication extends KylinStateElement<KylinApplicationrops> {
    static styles = styles;

    /**
     * Tooltip 控制器
     */
    private _tooltipController?: TooltipController;

    /**
     * 连接回调 - 初始化控制器
     */
    connectedCallback(): void {
        super.connectedCallback();
        this._createTooltipController();
    }

    /**
     * 断开连接 - 清理控制器
     */
    disconnectedCallback(): void {
        this._tooltipController?.destroy();
        this._tooltipController = undefined;
        super.disconnectedCallback();
    }

    /**
     * 初始化 Tooltip 控制器
     */
    private _createTooltipController(): void {
        const options: TooltipControllerOptions = {
            ...(this.state.tooltip ?? {}),
            dataPrefix: "tooltip",
        };
        this._tooltipController = new TooltipController(this, options);
    }

    /**
     * 渲染方法
     */
    render() {
        // 将内容传递给子元素
        return html` <slot></slot> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "kylin-application": KylinApplication;
    }
}
