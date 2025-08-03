class ThemeproController extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
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
            <label><input id="dark" type="checkbox" value=${ThemePro.dark} checked=${ThemePro.dark}>Dark</label>
        </div>
      </div>
    `;
    this._onDark()
  }
  _onDark() {
    // 添加对id=dark的事件处理
    const darkModeCheckbox = this.shadowRoot.getElementById("dark");
    if (darkModeCheckbox) {
      darkModeCheckbox.addEventListener("change", (e) => {
        const isDarkMode = e.target.checked;
        ThemePro.dark = isDarkMode; 
      });
    }
  }
}

customElements.define("themepro-controller", ThemeproController);
