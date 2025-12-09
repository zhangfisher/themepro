import { html } from "lit";
import type { Story } from "./types";

export const CustomAnimation: Story = {
    name: "自定义动画效果",
    render: () => {
        return html`
            <div style="padding: 20px;">
                <h3>不同的动画效果</h3>
                <div
                    style="display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap;"
                >
                    <auto-dropdown
                        label="弹性动画"
                        .popupOptions=${{
                            animationDuration: 500,
                            animationEasing: "easeInOutElastic(1, .5)"
                        }}
                        type="primary"
                    >
                        <div
                            class="dropdown"
                            style="padding: 12px; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 8px;"
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                ✨ 弹性选项 1
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                ✨ 弹性选项 2
                            </div>
                        </div>
                    </auto-dropdown>

                    <auto-dropdown
                        label="回弹动画"
                        .popupOptions=${{
                            animationDuration: 400,
                            animationEasing: "easeOutBack(1.7)"
                        }}
                        type="success"
                    >
                        <div
                            class="dropdown"
                            style="padding: 12px; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 8px;"
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                🎯 回弹选项 1
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                🎯 回弹选项 2
                            </div>
                        </div>
                    </auto-dropdown>

                    <auto-dropdown
                        label="缓慢动画"
                        .popupOptions=${{
                            animationDuration: 800,
                            animationEasing: "easeInOutQuad"
                        }}
                        type="warning"
                    >
                        <div
                            class="dropdown"
                            style="padding: 12px; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 8px;"
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                🐌 缓慢选项 1
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                🐌 缓慢选项 2
                            </div>
                        </div>
                    </auto-dropdown>
                </div>
            </div>
        `;
    },
};
