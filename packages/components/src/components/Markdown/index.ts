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
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";
import { when } from "lit/directives/when.js";

import { styles } from "./styles";
import type { ThemeSize } from "packages/core/src/types";

@customElement("auto-button")
export class AutoButton extends LitElement {
	static styles = styles;

	@property({ type: String })
	type?: "primary" | "success" | "warning" | "danger" | "info";

	@property({ type: String })
	size?: ThemeSize;

	@property({ type: String })
	icon?: string;

	@property({ type: String })
	shape?: "circle" | "pill";

	@property({ type: Boolean })
	caret?: boolean;

	@property({ type: Boolean })
	disabled?: boolean;

	@property({ type: Boolean })
	loading?: boolean;

	render() {
		return html`
        <div class="auto-btn ${this.type} ${this.size}">
            ${when(this.icon, () => html`<auto-icon name="${this.icon!}"></auto-icon>`)}
            <slot></slot>
            ${when(this.caret, () => html`<auto-icon name="arrow" rotate="90"></auto-icon>`)}
        </div>
        `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-button": AutoButton;
	}
}
