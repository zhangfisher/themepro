// Card.js - Web Components 卡片组件实现
class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['title', 'content'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const title = this.getAttribute('title') || ''; 

    this.shadowRoot.innerHTML = `
    <style>
    .t-card {
        display: flex;
        flex-direction: column;
        background: var(--auto-bgcolor);
        color: var(--auto-font-color);
        border-radius: var(--t-border-radius-medium);
        border: var(--auto-border);
        padding: 0;
        box-shadow: var(--auto-shadow);
        box-sizing: border-box;
    }
    .t-card-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: var(--auto-border);
        padding: calc(0.6 * var(--auto-spacing));
        border-radius: var(--t-border-radius-medium) var(--t-border-radius-medium) 0 0;
        flex-shrink: 0;
        font: var(--auto-title-font);
        color: var(--auto-title-color);
        background: var(--auto-title-bgcolor);
    }
    .t-card-body {
        flex: 1 1 auto;
        padding: var(--auto-spacing);
        border-radius: 0 0 var(--t-border-radius-medium) var(--t-border-radius-medium);
    }
    </style>
      <div class="t-card">
        <div class="t-card-header">${title}</div>
        <div class="t-card-body"><slot ></slot></div>
      </div>
    `;
  }
}

customElements.define('my-card', CardComponent); 