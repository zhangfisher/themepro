/**
 *
 * <kylin-button>确定</kylin-button>
 * <kylin-button type="primary">取消</kylin-button>
 * <kylin-button type="success">确定</kylin-button>
 * <kylin-button type="warning">确定</kylin-button>
 * <kylin-button type="d">确定</kylin-button>
 * <kylin-button type="info">确定</kylin-button>
 *
 *
 */
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";
import { when } from "lit/directives/when.js";

import { styles } from "./styles";
import type { ThemeSize } from "packages/core/src/types";

@customElement("kylin-button")
export class KylinButton extends LitElement {
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
            ${when(this.icon, () => html`<kylin-icon name="${this.icon!}"></kylin-icon>`)}
            <slot></slot>
            ${when(this.caret, () => html`<kylin-icon name="arrow" rotate="90"></kylin-icon>`)}
        </div>
        `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"kylin-button": KylinButton;
	}
}
