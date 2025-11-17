import { html } from "lit";
import type { Story } from "./types";

export const ComplexContent: Story = {
    name: "复杂内容示例",
    render: () => {
        return html`
            <div style="padding: 20px;">
                <h3>包含表单的复杂下拉内容</h3>
                <div style="margin-top: 20px;">
                    <auto-dropdown
                        label="包含表单的复杂下拉内容"
                        .popupOptions=${{
                            placement: "bottom-start",
                            fitWidth: true
                        }}
                        type="primary"
                        block
                    >
                        <div
                            class="dropdown"
                            style="padding: 20px; min-width: 320px; background: white; border: 1px solid #d9d9d9; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);"
                        >
                            <h4
                                style="margin: 0 0 16px 0; color: #262626; font-size: 16px;"
                            >
                                用户设置
                            </h4>

                            <div style="margin-bottom: 16px;">
                                <label
                                    style="display: block; margin-bottom: 6px; color: #595959; font-size: 14px;"
                                    >用户名:</label
                                >
                                <input
                                    type="text"
                                    value="张三"
                                    style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px;"
                                />
                            </div>

                            <div style="margin-bottom: 16px;">
                                <label
                                    style="display: block; margin-bottom: 6px; color: #595959; font-size: 14px;"
                                    >邮箱:</label
                                >
                                <input
                                    type="email"
                                    value="zhangsan@example.com"
                                    style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px;"
                                />
                            </div>

                            <div style="margin-bottom: 16px;">
                                <label
                                    style="display: block; margin-bottom: 6px; color: #595959; font-size: 14px;"
                                    >主题:</label
                                >
                                <select
                                    style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px;"
                                >
                                    <option>浅色</option>
                                    <option>深色</option>
                                    <option>自动</option>
                                </select>
                            </div>

                            <div
                                style="display: flex; gap: 8px; justify-content: flex-end;"
                            >
                                <button
                                    style="padding: 8px 16px; border: 1px solid #d9d9d9; background: #fff; cursor: pointer; border-radius: 4px; font-size: 14px;"
                                >
                                    取消
                                </button>
                                <button
                                    style="padding: 8px 16px; border: 1px solid #1890ff; background: #1890ff; color: white; cursor: pointer; border-radius: 4px; font-size: 14px;"
                                >
                                    保存
                                </button>
                            </div>
                        </div>
                    </auto-dropdown>
                </div>
            </div>
        `;
    },
};
