import { AutoElementBase } from "@/elements/base";
import { customElement } from "lit/decorators.js";
import { property } from "lit/decorators.js";
import { styles } from "./styles";
import type { AutoButtonProps } from "../Button";
import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import "../Icon";
import "../Flex";

// type 到 icon 的映射
const TYPE_ICONS: Record<string, string> = {
    info: "info",
    success: "success",
    warning: "alert",
    error: "error",
};

// type 到 color 的映射
const TYPE_COLORS: Record<string, string> = {
    info: "#1890ff",
    success: "#52c41a",
    warning: "#faad14",
    error: "#f5222d",
};

export type AutoFeedbackProps = {
    message?: string;
    description?: string;
    /**
     * 自定义图标
     * 可以是图标名称（使用 auto-icon 显示）
     * 或者是图片地址
     */
    icon?: string;
    /**
     * 预设类型，会自动显示对应的图标
     */
    type?: "info" | "success" | "warning" | "error";
    /**
     * 操作按钮列表
     */
    actions?: AutoButtonProps[];
    /**
     * 是否充满父容器
     */
    fit?: boolean;
};

@customElement("auto-feedback")
export class AutoFeedBack extends AutoElementBase<AutoFeedbackProps> {
    static styles = [styles];

    @property({ type: String })
    message?: string;

    @property({ type: String })
    description?: string;

    @property({ type: String })
    icon?: string;

    @property({ type: String })
    type?: "info" | "success" | "warning" | "error";

    @property({ type: Array })
    actions?: Partial<AutoButtonProps>[];

    @property({ type: Boolean, reflect: true })
    fit: boolean = false;

    /**
     * 判断 icon 是否为图片地址
     * 简单判断：包含 / 或 . 或 http 等特征
     */
    private _isImageUrl(url: string): boolean {
        return (
            /\.(jpg|jpeg|png|gif|svg|webp|bmp|ico)(\?.*)?$/i.test(url) ||
            /^https?:\/\//i.test(url) ||
            /^data:image\//i.test(url) ||
            url.includes("/")
        );
    }

    /**
     * 获取要显示的图标
     * 优先级：icon > type 对应的图标
     */
    private _getIcon(): string | undefined {
        if (this.icon) return this.icon;
        if (this.type) return TYPE_ICONS[this.type];
        return undefined;
    }

    /**
     * 获取要显示的颜色
     * 优先级：使用 type 对应的颜色
     */
    private _getIconColor(): string | undefined {
        if (this.type) return TYPE_COLORS[this.type];
        return undefined;
    }

    /**
     * 渲染图标部分
     */
    private _renderIcon() {
        const icon = this._getIcon();
        const iconColor = this._getIconColor();

        // 如果有 slot 内容，使用 slot；否则使用默认渲染逻辑
        if (this.querySelector('[slot="icon"]')) {
            return html`<slot name="icon"></slot>`;
        }

        if (!icon) return html``;

        // 判断是否为图片地址
        if (this._isImageUrl(icon)) {
            return html`<div class="feedback-icon">
                <img src="${icon}" alt="feedback icon" />
            </div>`;
        }

        // 使用 auto-icon 组件，并应用颜色
        return html`<div class="feedback-icon">
            <auto-icon
                name="${icon}"
                size="4em"
                style="color: ${iconColor || "var(--auto-theme-color)"}"
            ></auto-icon>
        </div>`;
    }

    /**
     * 渲染消息部分（最多2行）
     */
    private _renderMessage() {
        // 如果有 slot 内容，使用 slot；否则使用 message 属性
        if (this.querySelector('[slot="message"]')) {
            return html`<slot name="message"></slot>`;
        }

        if (!this.message) return html``;
        return html`<div class="feedback-message">${this.message}</div>`;
    }

    /**
     * 渲染描述部分（最多3行）
     */
    private _renderDescription() {
        // 如果有 slot 内容，使用 slot；否则使用 description 属性
        if (this.querySelector('[slot="description"]')) {
            return html`<slot name="description"></slot>`;
        }

        if (!this.description) return html``;
        return html`<div class="feedback-description">
            ${this.description}
        </div>`;
    }

    /**
     * 渲染操作按钮部分
     */
    private _renderActions() {
        if (!this.actions || this.actions.length === 0) return html``;

        return html`<div class="feedback-actions">
            <auto-flex gap="0.5em" justifyContent="center">
                ${repeat(
                    this.actions,
                    (action) => html`
                        <auto-button
                            label="${action.label || ""}"
                            type="${action.type || "default"}"
                            variant="${action.variant || "outline"}"
                            size="${action.size || "medium"}"
                            ?disabled="${action.disabled}"
                            ?loading="${action.loading}"
                            icon="${action.icon || ""}"
                            @auto:click="${action.onClick}"
                        ></auto-button>
                    `
                )}
            </auto-flex>
        </div>`;
    }

    render() {
        return html`
            ${this._renderIcon()} ${this._renderMessage()}
            ${this._renderDescription()} ${this._renderActions()}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "auto-feedback": AutoFeedBack;
    }
}
