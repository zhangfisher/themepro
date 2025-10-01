import { LitElement, type PropertyValues, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import type { Themepro } from "../src/index.ts";
import "../src/index.ts";
import { generate } from "@ant-design/colors";
import { isDark } from "@/utils/isDark.ts";
declare global {
	var ThemePro: Themepro;
}

@customElement("themepro-controller")
// biome-ignore lint/correctness/noUnusedVariables: <lint/correctness/noUnusedVariables>
class ThemeproController extends LitElement {
	static styles = css`
        :host{
            background-color: var(--auto-bgcolor);
        }
        .row {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
            padding: 0.2em;
        }
        .row>* {
            flex-grow: 1;
        }

        .col {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1em;
        }
        .col>* {
            width: 100%;
        }

        .controller {
            display: flex;
            align-items: center;
            padding: 16px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            gap: 0.5em;
            flex-direction: column;
        }
        .controller  .item {
            margin-right: 4px;
        }
        select {
            padding: 4px 8px;
        }

        .theme-color{
            flex-grow:1;
            padding:1em;
            border: 1px solid var(--auto-border-color);
            border-radius: 4px;
        }
    `;
	protected updated(_changedProperties: PropertyValues): void {
		// this._onTheme();
		// this._onSize();
		// this._onRadius();
		// this._onCreateTheme();
		// this._onCreatePrimaryColor();
		// this._onDark();
	}
	override render() {
		return html` 
            <div class="controller">
                <div class="row">
                    <div class="item">
                        <label>
                            Theme:
                            <select id="theme" class="auto-input" @input=${this._onPresetTheme}>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="blue">Blue</option>
                                <option value="red">Red</option>
                                <option value="custom">Custom</option>
                            </select>
                        </label>
                    </div>
                    <div class="item">
                        <label>
                            Size:
                            <select id="size" class="auto-input">
                                <option value="x-small">x-small</option>
                                <option value="small">small</option>
                                <option value="medium">medium</option>
                                <option value="large">large</option>
                                <option value="x-large">x-large</option>
                            </select>
                        </label>
                    </div>
                    <div class="item">
                        <label>
                            Radius:
                            <select id="radius" class="auto-input">
                                <option value="x-small">x-small</option>
                                <option value="small">small</option>
                                <option value="medium">medium</option>
                                <option value="large">large</option>
                                <option value="x-large">x-large</option>
                            </select>
                        </label>
                    </div>
                    <div class="item">
                        <label>
                            ThemeColor:
                            <input
                                type="color"
                                id="customcolor"
                                @input="${this._onCreateTheme}" 
                                class="auto-input"
                            />
                        </label>
                    </div>
                    <div class="item">
                        <label>
                            PrimaryColor:
                            <input
                                @input="${this._onCreatePrimaryColor}" 
                                type="color"
                                id="primarycolor"
                                class="auto-input"
                            />
                        </label>
                    </div>
                </div>
                <div class="row">                    
                    ${repeat(this.lightThemeColors, (color) => {
						return html`<span class="theme-color" style="background-color: ${color};"></span>`;
					})}
                </div>
            </div>
        `;
	}

	darkThemeColors: string[] = [];
	lightThemeColors: string[] = [];
	@state()
	themeColor: string = "blue";
	@state()
	themeBgColor: string = "#141414";

	_generateThemeColors() {
		this.darkThemeColors = generate(this.themeColor, {
			theme: "dark",
			backgroundColor: this.themeBgColor,
		});
		const colors = generate(this.themeColor, {
			theme: "default",
			backgroundColor: this.themeBgColor,
		});
		this.lightThemeColors = isDark(this.themeColor) ? colors.reverse() : colors;
		console.log("ThemeColors=", this.lightThemeColors);
	}
	_onCreateTheme(e: any) {
		this.themeColor = e.target.value;
		this._generateThemeColors();
		// ThemePro.create({
		// 	name: "custom",
		// 	theme: {
		// 		color: colorSelect.value,
		// 	},
		// });
		// ThemePro.theme = "custom";
	}
	_onCreatePrimaryColor(e: any) {
		this.themeBgColor = e.target.value;
		this._generateThemeColors();
		// ThemePro.createVariant("primary", primarySelect.value);
	}
	_onSize() {
		const sizeSelect = this.shadowRoot!.getElementById("size");
		if (sizeSelect) {
			sizeSelect.addEventListener("change", (e: any) => {
				const size = e.target.value;
				ThemePro.size = size;
			});
		}
	}
	_onRadius() {
		const radiusSelect = this.shadowRoot!.getElementById("radius");
		if (radiusSelect) {
			radiusSelect.addEventListener("change", (e: any) => {
				ThemePro.radius = e.target.value;
			});
		}
	}
	_onPresetTheme(e: any) {
		ThemePro.theme = e.target.value;
	}
	_onDark() {
		// 添加对id=dark的事件处理
		const darkModeCheckbox = this.shadowRoot!.getElementById("dark");
		if (darkModeCheckbox) {
			darkModeCheckbox.addEventListener("change", (e: any) => {
				const isDarkMode = e.target.checked;
				ThemePro.dark = isDarkMode;
			});
		}
	}
}
