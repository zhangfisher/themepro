class ThemeproController extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .controller {
            display: flex;
            align-items: center;
            padding: 16px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .controller>.item{
            margin-right: 4px;
        }
      </style>
      <div class="controller">
        <div class="item">
            <label>
                <input type="checkbox" checked=${ThemePro.dark} >
            Dark
            </label>
        </div>
      </div>
    `;
  }
}

customElements.define("themepro-controller", ThemeproController);
