/**
 *
 * <auto-button>确定</auto-button>
 * <auto-button type="primary">取消</auto-button>
 * <auto-button type="success">确定</auto-button>
 * <auto-button type="warning">确定</auto-button>
 * <auto-button type="d">确定</auto-button>
 * <auto-button type="info">确定</auto-button>
 *
 *
 */
import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import {
    BARS_SVG,
    BUBBLES_SVG,
    SPIN_SVG,
    SPINNING_BUBBLES,
    SPOKES,
} from "./icons";
import { objectProperty } from "@/utils/objectProperty";
import type { AutoButtonProps } from "../Button";
import { when } from "lit-html/directives/when.js";
import { repeat } from "lit/directives/repeat.js";
import { spread } from "@open-wc/lit-helpers";
import "../Button";
import { triggerCustomEvent } from "@/utils/triggerCustomEvent";

const presetSizes = {
    "x-small": "var(--t-icon-size-x-small)",
    small: "var(--t-icon-size-small)",
    medium: "var(--t-icon-size-medium)",
    large: "var(--t-icon-size-large)",
    "x-large": "var(--t-icon-size-x-large)",
};
@customElement("auto-loading")
export class AutoLoading extends LitElement {
    static styles = css`
        :host {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        :host([hide]) {
            display: none !important;
        }

        :host([direction="row"]),
        :host([row]) {
            & > .content {
                flex-direction: row;
            }
        }

        :host([direction="column"]),
        :host([column]) {
            & > .content {
                flex-direction: column;
            }
        }

        :host([inline]) {
            position: relative;
            display: inline-flex;
            width: auto;
            height: auto;
            top: auto;
            left: auto;
        }

        :host > .mask {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background-color: var(--mask-bgcolor);
            opacity: 0.5;
        }
        :host > .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.5em;
            z-index: 1;
            & > .message,
            & > .memo {
                display: -webkit-box;
                font-size: var(--auto-font-size);
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-word;
                text-align: center;
                z-index: 1;
                color: var(--auto-color) !important;
            }
            & > .memo {
                color: var(--auto-secondary-color) !important;
                font-size: calc(0.9 * var(--auto-font-size));
            }
            & > .actions {
                display: flex;
                gap: 0.5em;
                flex-wrap: wrap;
                align-items: center;
            }
            & > svg {
                font-size: var(--icon-size);
            }
        }
        :host(:not([inline])[mask="dark"]),
        :host(:not([inline])[dark]) {
            & > .content > .message {
                color: var(--auto-bgcolor) !important;
            }
        }
        :host(:not([inline])[mask="light"]),
        :host(:not([inline])[light]) {
            & > .content > .message {
                color: var(--auto-color) !important;
            }
        }
    `;

    @property({ type: String })
    size?: string;

    @property({ type: Boolean, reflect: true })
    inline?: boolean = false;

    @property({ type: String, reflect: true })
    direction?: "row" | "column" = "column";

    @property({ type: Boolean, reflect: true })
    row?: boolean;

    @property({ type: Boolean, reflect: true })
    column?: boolean;

    @property({ type: Boolean, reflect: true })
    hide?: boolean;

    @property({ type: String })
    message: string = "Loading...";

    @property({ type: String })
    description?: string;

    @property({ type: String })
    color?: string = "var(--auto-theme-color)";

    @property({ type: String, reflect: true })
    mask: "none" | "light" | "dark" = "light";

    @property({ type: Boolean, reflect: true })
    dark: boolean = false;

    @property({ type: Boolean, reflect: true })
    light: boolean = false;

    /**
     * 可关闭
     */
    @property({ type: Boolean, reflect: true })
    cancelable: boolean = false;

    updated(changedProperties: Map<string, any>) {
        super.updated(changedProperties);

        // 当 cancelable 属性变化时，确保组件重新渲染以显示/隐藏取消按钮
        if (changedProperties.has("cancelable")) {
            this.requestUpdate();
        }
    }

    @property({ type: String, reflect: true })
    type?: "spin" | "bars" | "bubbles" | "spinning-bubbles" | "spokes";

    @objectProperty()
    actions?: Array<AutoButtonProps>;

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("click", this._onActionClick as EventListener);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this._onActionClick as EventListener);
        super.disconnectedCallback();
    }

    private _onActionClick = (event: CustomEvent) => {
        const actionEl = event.target as HTMLElement;
        if (actionEl?.classList.contains("action")) {
            const actionId = actionEl.dataset.id;
            // 处理取消按钮点击
            if (actionId === "cancel") {
                this.hide = true;
            }

            triggerCustomEvent(
                event.target as HTMLElement,
                "action:click",
                actionId
            );
        }

        event.stopPropagation();
    };

    private getSvgIcon() {
        switch (this.type) {
            case "bars":
                return BARS_SVG;
            case "bubbles":
                return BUBBLES_SVG;
            case "spinning-bubbles":
                return SPINNING_BUBBLES;
            case "spokes":
                return SPOKES;
            default:
                return SPIN_SVG;
        }
    }
    private _getActions() {
        if (this.cancelable) {
            const displayActions = [...(this.actions || [])];
            if (!displayActions.some((action) => action.label === "取消")) {
                displayActions.push({
                    id: "cancel",
                    label: "取消",
                    type: "danger",
                });
            }
            return displayActions;
        }
        return this.actions;
    }
    render() {
        const svgIcon = this.getSvgIcon();
        const iconColor = this.color || "var(--auto-theme-color)";
        const size = this.size
            ? this.size in presetSizes
                ? (presetSizes as any)[this.size]
                : this.size
            : "var(--auto-font-size)";
        const isRow = this.row || this.direction === "row";
        const iconSize = isRow ? size : `calc(1.5 * ${size})`;
        const mask =
            this.mask === "light"
                ? "var(--auto-bgcolor)"
                : this.mask === "dark"
                ? "black"
                : "transparent";

        // 当 closeable 为 true 时，自动添加取消按钮到 actions 数组中
        const displayActions = this._getActions();
        return html`
            <style>
                :host {
                    --mask-bgcolor: ${mask};
                    --icon-size: ${iconSize};
                    --hide: ${this.hide ? "block" : "none"};
                }
            </style>
            <div class="mask"></div>
            <div class="content" style="color:${iconColor};">
                ${html`${unsafeHTML(svgIcon)}`}
                ${when(this.message, () => {
                    return html`<span class="message"
                        >${unsafeHTML(this.message)}</span
                    >`;
                })}
                ${when(this.description, () => {
                    return html`<span class="memo">${this.description}</span>`;
                })}
                ${when(displayActions && displayActions.length > 0, () => {
                    return html`<div class="actions">
                        ${repeat(displayActions!, (action: any) => {
                            return html`<auto-button
                                class="action"
                                size="small"
                                data-id="${action.id || action.label}"
                                ${spread(action)}
                                ghost
                            ></auto-button>`;
                        })}
                    </div>`;
                })}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "auto-loading": AutoLoading;
    }
}
