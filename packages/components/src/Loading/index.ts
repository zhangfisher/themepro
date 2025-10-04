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
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("auto-loading")
export class AutoLoading extends LitElement {
	@property({ type: String })
	size?: string;

	@property({ type: String })
	tips?: string;

	@property({ type: String })
	color?: string;
	render() {
		return html`
            <auto-icon name="loading" size="${ifDefined(this.size)}" color="${ifDefined(this.color)}"></auto-icon>
            ${this.tips}
        `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-loading": AutoLoading;
	}
}
