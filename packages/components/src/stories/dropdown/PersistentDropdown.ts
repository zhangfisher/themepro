import { html } from "lit";
import type { Story } from "./types";

export const PersistentDropdown: Story = {
    args: {},

    name: "持久化菜单",

    render: () => {
        return html`
            <div style="padding: 20px;">
                <h3>持久化下拉菜单（点击外部不关闭）</h3>
                <p style="color: #666; margin: 10px 0;">
                    需要通过按钮或按ESC键手动关闭
                </p>
                <div style="margin-top: 20px;">
                    <auto-dropdown
                        label="持久化下拉菜单（点击外部不关闭）"
                        .popupOptions=${{
                            cache: true,
                        }}
                        type="danger"
                    >
                        <p
                            style="margin: 0 0 16px 0; color: #666; line-height: 1.5;"
                        >
                            这是一个持久化下拉菜单，点击外部区域不会关闭它。您需要手动点击关闭按钮或按ESC键来关闭。
                        </p>
                        <div
                            style="display: flex; gap: 8px; justify-content: flex-end;"
                        >
                            <button
                                style="padding: 8px 16px; border: 1px solid #d9d9d9; background: #fff; cursor: pointer; border-radius: 4px;"
                                onclick="this.dispatchEvent(new CustomEvent('popup:close', { bubbles: true, composed: true }))"
                            >
                                手动关闭
                            </button>
                        </div>
                    </auto-dropdown>
                </div>
            </div>
        `;
    },
};
