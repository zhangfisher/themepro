// Card.js - Web Components 卡片组件实现
class CardComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();
	}

	static get observedAttributes() {
		return ["title", "content"];
	}

	attributeChangedCallback(_, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.render();
		}
	}

	render() {
		const title = this.getAttribute("title") || "";
		this.shadowRoot.innerHTML = `
    <style>
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
    </style>
      <div class="auto-card">
        <div class="auto-card-header">${title}</div>
        <div class="auto-card-body"><slot ></slot></div>
      </div>
    `;
	}
}

customElements.define("my-card", CardComponent);
