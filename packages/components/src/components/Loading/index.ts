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
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import {
    BARS_SVG,
    BUBBLES_SVG,
    SPIN_SVG,
    SPINNING_BUBBLES,
    SPOKES,
} from "./icons";

@customElement("auto-loading")
export class AutoLoading extends LitElement {
    static styles = css`
        :host {
            display: flex;
            gap: 0.5em;
            flex-direction: column;
            align-items: center;
            font: var(--auto-font);
            justify-content: center;
            position: relative;
        }

        :host([mask]) {
            background-color: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(2px);
        }

        :host([direction="row"]) {
            flex-direction: row;
        }

        :host([direction="column"]) {
            flex-direction: column;
        }

        :host([fit]) {
            width: 100%;
            height: 100%;
        }

        :host([fit][direction="row"]) {
            justify-content: center;
        }

        :host([fit][direction="column"]) {
            justify-content: center;
        }

        .loading-content {
            display: flex;
            gap: 0.5em;
            flex-direction: column;
            align-items: center;
            z-index: 1;
            background-color: transparent;
        }

        :host([direction="row"]) .loading-content {
            flex-direction: row;
        }

        :host([direction="column"]) .loading-content {
            flex-direction: column;
        }

        span {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            max-width: 200px;
            text-align: center;
            color: inherit;
        }

        :host([direction="row"]) span {
            max-width: 300px;
        }

        :host([mask]) span {
            color: white;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .loading-content svg {
            width: 100%;
            height: 100%;
            display: block;
        }
    `;

    @property({ type: String })
    size?: string;

    @property({ type: Boolean })
    fit?: boolean = false;

    @property({ type: String })
    direction?: "row" | "column" = "column";

    @property({ type: String })
    message?: string;

    @property({ type: String })
    color?: string = "var(--auto-theme-color)";

    @property({ type: Boolean })
    mask?: boolean = false;

    @property({ type: String })
    type?: "bars" | "bubbles" | "spin" | "spinning-bubbles" | "spokes";

    private getSvgIcon() {
        switch (this.type) {
            case "bars":
                return BARS_SVG;
            case "bubbles":
                return BUBBLES_SVG;
            case "spin":
                return SPIN_SVG;
            case "spinning-bubbles":
                return SPINNING_BUBBLES;
            case "spokes":
                return SPOKES;
            default:
                return null;
        }
    }

    render() {
        const svgIcon = this.getSvgIcon();
        const iconColor = this.mask
            ? "white"
            : this.color || "var(--auto-theme-color)";

        return html`
            <div class="loading-content">
                ${svgIcon
                    ? html`<div
                          style="color: ${iconColor}; width: ${ifDefined(
                              this.size
                          )}; height: ${ifDefined(this.size)};"
                      >
                          ${unsafeHTML(svgIcon)}
                      </div>`
                    : html`<auto-icon
                          name="loading"
                          size="${ifDefined(this.size)}"
                          color="${iconColor}"
                      ></auto-icon>`}
                ${this.message ? html`<span>${this.message}</span>` : ""}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "auto-loading": AutoLoading;
    }
}
