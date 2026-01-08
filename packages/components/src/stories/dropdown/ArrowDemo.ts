import { html } from "lit";
import type { Story } from "./types";
export const ArrowDemo: Story = {
    name: "指示箭头演示",
    render: (args: any) => {
        return html`
            <div style="padding: 20px;">
                <h3>箭头指示器演示</h3>
                <p style="color: #666; margin: 10px 0;">
                    arrow 属性控制是否显示指向触发元素的指示箭头
                </p>

                <div style="margin-top: 30px;">
                    <h4 data-tooltip="不同位置的箭头演示">
                        不同位置的箭头演示
                    </h4>
                    <div
                        style="display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;"
                    >
                        <auto-dropdown
                            label="底部箭头"
                            type="primary"
                            .popupOptions=${{
                                placement: "bottom-start",
                                arrow: true,
                            }}
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                📍 底部箭头指向按钮
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                箭头自动定位
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="顶部箭头"
                            type="success"
                            .popupOptions=${{
                                placement: "top-start",
                                arrow: true,
                            }}
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                🎯 顶部箭头指向按钮
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                智能定位系统
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="右侧箭头"
                            type="warning"
                            .popupOptions=${{
                                placement: "right-start",
                                arrow: true,
                            }}
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                ➡️ 右侧箭头
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                横向指示
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="左侧箭头"
                            type="info"
                            .popupOptions=${{
                                placement: "left-start",
                                arrow: true,
                            }}
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                ⬅️ 左侧箭头
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                侧向指示
                            </div>
                        </auto-dropdown>
                    </div>

                    <h4>对比演示：有箭头 vs 无箭头</h4>
                    <div
                        style="display: flex; gap: 30px; margin-bottom: 30px; flex-wrap: wrap;"
                    >
                        <div>
                            <p
                                style="font-weight: bold; color: #333; margin-bottom: 10px;"
                            >
                                无箭头 (默认)
                            </p>
                            <auto-dropdown label="无箭头菜单" type="default">
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    普通选项 1
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    普通选项 2
                                </div>
                            </auto-dropdown>
                        </div>

                        <div>
                            <p
                                style="font-weight: bold; color: #333; margin-bottom: 10px;"
                            >
                                有箭头
                            </p>
                            <auto-dropdown
                                label="有箭头菜单"
                                type="default"
                                .popupOptions=${{ arrow: true }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    指示选项 1
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    指示选项 2
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>

                    <h4>箭头颜色自定义</h4>
                    <p
                        style="color: #666; font-size: 14px; margin-bottom: 15px;"
                    >
                        通过 CSS 变量 --popup-arrow-bg 自定义箭头颜色
                    </p>
                    <div
                        style="display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;"
                    >
                        <auto-dropdown
                            label="蓝色箭头"
                            type="primary"
                            .popupOptions=${{ arrow: true }}
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                蓝色主题
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="绿色箭头"
                            type="success"
                            .popupOptions=${{ arrow: true }}
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                绿色主题
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="橙色箭头"
                            type="warning"
                            .popupOptions=${{ arrow: true }}
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                橙色主题
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="红色箭头"
                            type="danger"
                            .popupOptions=${{ arrow: true }}
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                红色主题
                            </div>
                        </auto-dropdown>
                    </div>

                    <h4>配合其他功能使用</h4>
                    <div
                        style="display: flex; gap: 20px; flex-direction: column; max-width: 400px;"
                    >
                        <auto-dropdown
                            label="箭头 + fit"
                            type="primary"
                            .popupOptions=${{
                                arrow: true,
                                fit: true,
                            }}
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                🎯 fit + 箭头
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                宽度匹配按钮
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                智能箭头定位
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="箭头 + 自定义动画"
                            type="success"
                            .popupOptions=${{
                                arrow: true,
                                animationDuration: 500,
                                animationEasing: "easeOutBack(1.7)",
                            }}
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                ✨ 自定义动画效果
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                箭头参与动画
                            </div>
                        </auto-dropdown>
                    </div>
                </div>
            </div>
        `;
    },
};
