/**
 *
 *  loadingRef: Ref<HTMLInputElement> = createRef();
 *  <auto-loading ${ref(this.loadingRef)}></auto-loading>
 *  this.loadingRef.value
 *
 *  loadingEl = this.loadingRef.value
 *
 *  loadingEl
 *
 *
 *
 */
import { LitElement, html } from "lit";
import { property, query } from "lit/decorators.js";
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
import { styles } from "./styles";

const presetSizes = {
    "x-small": "var(--t-icon-size-x-small)",
    small: "var(--t-icon-size-small)",
    medium: "var(--t-icon-size-medium)",
    large: "var(--t-icon-size-large)",
    "x-large": "var(--t-icon-size-x-large)",
};
@customElement("auto-loading")
export class AutoLoading extends LitElement {
    static styles = styles;

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

    /**
     * 可重试
     */
    @property({ type: Boolean, reflect: true })
    retryable: boolean = false;

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

    @query(".actions")
    actionsEl?: HTMLElement;

    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => {
            this.actionsEl?.addEventListener(
                "click",
                this._onActionClick as EventListener,
                true
            );
        });
    }

    disconnectedCallback() {
        this.actionsEl?.removeEventListener(
            "click",
            this._onActionClick as EventListener
        );
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
                actionEl as HTMLElement,
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
                                ${spread(action)}
                                data-id="${action.id || action.label}"
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
