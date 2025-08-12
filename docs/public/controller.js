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
            gap:0.5em;
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
            <label>
              Theme:
                <select id="theme" class="auto-input">
                    <option value="light" ${ThemePro.theme === "light" ? "light" : ""}>Light</option>
                    <option value="dark" ${ThemePro.theme === "dark" ? "dark" : ""}>Dark</option>
                    <option value="blue" ${ThemePro.theme === "blue" ? "blue" : ""} >Blue</option>
                    <option value="red" ${ThemePro.theme === "red" ? "red" : ""} >Red</option>
                    <option value="custom" ${ThemePro.theme === "custom" ? "custom" : ""} >Custom</option>
                </select>            
            </label>
        </div>
        <div class="item">
            <label>
              Size:
                <select id="size" value="${ThemePro.size}" class="auto-input">
                    <option value="x-small" ${ThemePro.size === "x-small" ? "selected" : ""}>x-small</option>
                    <option value="small" ${ThemePro.size === "small" ? "selected" : ""}>small</option>
                    <option value="medium" ${ThemePro.size === "medium" ? "selected" : ""} >medium</option>
                    <option value="large" ${ThemePro.size === "large" ? "selected" : ""}>large</option>
                    <option value="x-large" ${ThemePro.size === "x-large" ? "selected" : ""}>x-large</option>
                </select>            
            </label>
        </div>
        <div class="item">
            <label>
              Radius:
                <select id="radius" value="${ThemePro.radius}" class="auto-input">
                    <option value="x-small" ${ThemePro.radius === "x-small" ? "selected" : ""}>x-small</option>
                    <option value="small" ${ThemePro.radius === "small" ? "selected" : ""}>small</option>
                    <option value="medium" ${ThemePro.radius === "medium" ? "selected" : ""} >medium</option>
                    <option value="large" ${ThemePro.radius === "large" ? "selected" : ""}>large</option>
                    <option value="x-large" ${ThemePro.radius === "x-large" ? "selected" : ""}>x-large</option>
                </select>            
            </label>
        </div>
        <div class="item">
            <label> 
                ThemeColor:
                <input type="color" id="customcolor" value="${ThemePro.primaryColor}" class="auto-input" />
            </label>
        </div>
        <div class="item">
            <label> 
                PrimaryColor:
                <input type="color" id="primarycolor" value="${ThemePro.primaryColor}" class="auto-input" />
            </label>
        </div>
      </div>
    `;
		this._onTheme();
		this._onSize();
		this._onRadius();
		this._onCreateTheme();
		this._onCreatePrimaryColor();
	}
	_onCreateTheme() {
		const colorSelect = this.shadowRoot.getElementById("customcolor");
		colorSelect.addEventListener("input", () => {
			ThemePro.create({
				name: "custom",
				theme: {
					color: colorSelect.value,
				},
			});
			ThemePro.theme = "custom";
		});
	}
	_onCreatePrimaryColor() {
		const primarySelect = this.shadowRoot.getElementById("primarycolor");
		primarySelect.addEventListener("input", () => {
			ThemePro.createVariant("primary", primarySelect.value);
		});
	}
	_onSize() {
		const sizeSelect = this.shadowRoot.getElementById("size");
		if (sizeSelect) {
			sizeSelect.addEventListener("change", (e) => {
				const size = e.target.value;
				ThemePro.size = size;
			});
		}
	}
	_onRadius() {
		const radiusSelect = this.shadowRoot.getElementById("radius");
		if (radiusSelect) {
			radiusSelect.addEventListener("change", (e) => {
				ThemePro.radius = e.target.value;
			});
		}
	}
	_onTheme() {
		const themeSelect = this.shadowRoot.getElementById("theme");
		if (themeSelect) {
			themeSelect.addEventListener("change", (e) => {
				ThemePro.theme = e.target.value;
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
