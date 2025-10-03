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
import { styles } from "./styles";
import type { ThemeSize } from "@/types";

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

	render() {
		return html`
        <div class="auto-btn ${this.type} ${this.size}">
            <slot></slot>
        </div>
        `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-button": AutoButton;
	}
}
