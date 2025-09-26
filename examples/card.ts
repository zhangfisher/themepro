// card-lit.ts - Lit 实现的卡片组件
import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";

@customElement("auto-card")
export class AutoCardComponent extends LitElement {
	@property({ type: String, reflect: true })
	title: string = "";

	static styles = css`
    :host {
      display: block;
    }
    .auto-card {
      display: flex;
      flex-direction: column;
      background: var(--auto-panel-bgcolor);
      color: var(--auto-color);
      border-radius: var(--auto-border-radius);
      border: var(--auto-border);
      padding: 0;
      box-shadow: var(--auto-shadow);
      box-sizing: border-box;
    }
    .auto-card-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: var(--auto-border);
      padding: calc(0.6 * var(--auto-spacing));
      border-radius: var(--auto-border-radius) var(--auto-border-radius) 0 0;
      flex-shrink: 0;
      font: var(--auto-title-font);
      color: var(--auto-title-color);
      background: var(--auto-title-bgcolor);
    }
    .auto-card-body {
      flex: 1 1 auto;
      padding: var(--auto-spacing);
      border-radius: 0 0 var(--auto-border-radius) var(--auto-border-radius);        
    }  
  `;

	render() {
		return html`
      <div class="auto-card">
        <div class="auto-card-header">${this.title}</div>
        <div class="auto-card-body">
          <slot></slot>
          
            <auto-list>
                <auto-list-item title="标题1">内容1</auto-list-item>
                <auto-list-item title="标题2">内容2</auto-list-item>
                <auto-list-item title="标题3">内容3</auto-list-item>
            </auto-list>
        </div>
      </div>
    `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-card": AutoCardComponent;
	}
}
