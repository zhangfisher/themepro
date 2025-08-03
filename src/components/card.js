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
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          margin: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .card-title {
          font-size: 18px;
          margin-bottom: 8px;
          color: #333;
        }
        .card-content {
          font-size: 14px;
          color: #666;
        }
      </style>
      <div class="card">
        <h3 class="card-title">${title}</h3>
        <p class="card-content"><slot ></slot></p>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

customElements.define('my-card', CardComponent); 