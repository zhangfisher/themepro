/**
 *
 * <auto-button>确定</auto-button>
 * <auto-button type="primary">取消</auto-button>
 * <auto-button type="success">确定</auto-button>
 * <auto-button type="warning">确定</auto-button>
 * <auto-button type="d">确定</auto-button>
 * <auto-button type="info">确定</auto-button>
 *
 * - 图标默认尺寸
 * <auto-icon auto></auto-icon>
 * - inherit
 * 由图标容器的font-size
 * - 指定尺寸
 * <auto-icon size="32px"></auto-icon>
 *
 */
import { LitElement, type TemplateResult, html } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";
import { styles } from "./styles";
import { toggleWrapper } from "../../utils/toggleWrapper";

@customElement("auto-icon")
export class AutoIcon extends LitElement {
    static styles = styles;

    /**
     * 指定尺寸
     */
    @property({ type: String })
    size?: string;
    /**
     * 图标尺寸继承父元素的font-size
     */
    @property({ type: Boolean, reflect: true })
    inherit?: boolean;

    @property({ type: String })
    name: string = "star";

    @property({ type: String })
    color?: string;

    @property({ type: String })
    rotate?: string;

    @property({ type: Number })
    strokeWidth?: number;

    @property({ type: String })
    shape?: "circle" | "square" | "round";

    private _renderIcon() {
        const style: Record<string, any> = {
            "mask-image": `var(--auto-icon-${this.name})`,
        };
        if (this.size) {
            style["font-size"] = this.size;
        }
        if (this.color) {
            style.color = this.color;
        }
        if (this.rotate) {
            style.transform = `rotate(${this.rotate}deg)`;
        }
        if (this.strokeWidth) {
            style["--stroke-width"] = this.strokeWidth;
        }

        return html`
            <div
                class="${classMap({
                    "auto-icon": true,
                })} "
                style="${styleMap(style)}"
            ></div>
        `;
    }
    private _renderShape(content: TemplateResult) {
        return html`<div class="shape ${this.shape}">${content}</div>`;
    }

    render() {
        return toggleWrapper(!!this.shape, this._renderIcon(), (content) => {
            return html`${when(
                this.shape,
                () => this._renderShape(content),
                () => content
            )}`;
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "auto-icon": AutoIcon;
    }
}
