import { LitElement, type PropertyValues, html } from "lit";
import { customElement } from "lit/decorators.js";

import type { Themepro } from "../src/index.ts";
import "../src/index.ts";
import "../src/index.ts";
import "../src/components/index.less";
import "../src/styles/index.less";
import "../src/themes/dark.less";
import "../src/themes/blue.less";
import "../src/themes/light.less";
import "../src/themes/red.less";

declare global {
    var ThemePro: Themepro;
}

@customElement("themepro-controller")
// biome-ignore lint/correctness/noUnusedVariables: <lint/correctness/noUnusedVariables>
class ThemeproController extends LitElement {
    protected updated(_changedProperties: PropertyValues): void {
        this._onTheme();
        this._onSize();
        this._onRadius();
        this._onCreateTheme();
        this._onCreatePrimaryColor();
        this._onDark();
    }
    override render() {
        return html`
            <style>
                .controller {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    gap: 0.5em;
                }
                .controller > .item {
                    margin-right: 4px;
                }
                select {
                    padding: 4px 8px;
                }
            </style>
            <div class="controller">
                <div class="item">
                    <label>
                        Theme:
                        <select id="theme" class="auto-input">
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
                            value="${ThemePro.primaryColor}"
                            class="auto-input"
                        />
                    </label>
                </div>
                <div class="item">
                    <label>
                        PrimaryColor:
                        <input
                            type="color"
                            id="primarycolor"
                            value="${ThemePro.primaryColor}"
                            class="auto-input"
                        />
                    </label>
                </div>
            </div>
        `;
    }
    _onCreateTheme() {
        const colorSelect = this.shadowRoot!.getElementById(
            "customcolor"
        ) as HTMLSelectElement;
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
        const primarySelect = this.shadowRoot!.getElementById(
            "primarycolor"
        ) as HTMLSelectElement;
        primarySelect.addEventListener("input", () => {
            ThemePro.createVariant("primary", primarySelect.value);
        });
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
    _onTheme() {
        const themeSelect = this.shadowRoot!.getElementById("theme");
        if (themeSelect) {
            themeSelect.addEventListener("change", (e: any) => {
                ThemePro.theme = e.target.value;
            });
        }
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
