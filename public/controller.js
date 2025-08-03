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
        select{
          padding: 4px 8px;
        }
      </style>
      <div class="controller">
        <div class="item">
            <label><input id="dark" type="checkbox" ${ThemePro.dark ? 'checked' : ''}>Dark</label>            
        </div>
        <div>
            <label>
              Size:
                <select id="size" value="${ThemePro.size}">
                    <option value="x-small" ${ThemePro.size==="x-small" ? 'selected' : ''}>x-small</option>
                    <option value="small" ${ThemePro.size==="small" ? 'selected' : ''}>small</option>
                    <option value="medium" ${ThemePro.size==="medium" ? 'selected' : ''} >medium</option>
                    <option value="large" ${ThemePro.size==="large" ? 'selected' : ''}>large</option>
                    <option value="x-large" ${ThemePro.size==="x-large" ? 'selected' : ''}>x-large</option>
                </select>            
            </label>
        </div>
      </div>
    `;
    this._onDark()
    this._onSize()
  }
  _onSize(){
    const sizeSelect = this.shadowRoot.getElementById("size");
    if (sizeSelect) {
      sizeSelect.addEventListener("change", (e) => {
        const size = e.target.value;
        ThemePro.size = size; 
      });
    }
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
