import { html } from "lit";
import type { Story } from "./types";

export const PlacementDemo: Story = {
    name: "弹出方向演示",
    render: (args: any) => {
        return html`
            <div style="padding: 20px;">
                <h3>placement 属性演示</h3>
                <p style="color: #666; margin: 10px 0;">
                    placement 属性控制弹出内容相对于触发元素的方向和位置
                </p>

                <div style="margin-top: 30px;">
                    <h4>基础方向演示</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;"
                    >
                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                top
                            </p>
                            <auto-dropdown
                                label="顶部弹出"
                                type="primary"
                                .popupOptions=${{
                                    placement: "top",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    🎯 顶部内容
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    第二选项
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                bottom
                            </p>
                            <auto-dropdown
                                label="底部弹出"
                                type="success"
                                .popupOptions=${{
                                    placement: "bottom",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    ⬇️ 底部内容
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    第二选项
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                left
                            </p>
                            <auto-dropdown
                                label="左侧弹出"
                                type="warning"
                                .popupOptions=${{
                                    placement: "left",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    ⬅️ 左侧内容
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    第二选项
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                right
                            </p>
                            <auto-dropdown
                                label="右侧弹出"
                                type="info"
                                .popupOptions=${{
                                    placement: "right",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    ➡️ 右侧内容
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    第二选项
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>

                    <h4>对齐方向演示</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;"
                    >
                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                top-start
                            </p>
                            <auto-dropdown
                                label="左上角"
                                type="primary"
                                .popupOptions=${{
                                    placement: "top-start",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    📍 左上角对齐
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                top-end
                            </p>
                            <auto-dropdown
                                label="右上角"
                                type="success"
                                .popupOptions=${{
                                    placement: "top-end",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    🎯 右上角对齐
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                bottom-start
                            </p>
                            <auto-dropdown
                                label="左下角"
                                type="warning"
                                .popupOptions=${{
                                    placement: "bottom-start",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    ⬇️ 左下角对齐
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                bottom-end
                            </p>
                            <auto-dropdown
                                label="右下角"
                                type="info"
                                .popupOptions=${{
                                    placement: "bottom-end",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    ➡️ 右下角对齐
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                left-start
                            </p>
                            <auto-dropdown
                                label="左上角"
                                type="danger"
                                .popupOptions=${{
                                    placement: "left-start",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    ⬅️ 左上角对齐
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                left-end
                            </p>
                            <auto-dropdown
                                label="左下角"
                                type="primary"
                                .popupOptions=${{
                                    placement: "left-end",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    ⬅️ 左下角对齐
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                right-start
                            </p>
                            <auto-dropdown
                                label="右上角"
                                type="success"
                                .popupOptions=${{
                                    placement: "right-start",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    ➡️ 右上角对齐
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                right-end
                            </p>
                            <auto-dropdown
                                label="右下角"
                                type="warning"
                                .popupOptions=${{
                                    placement: "right-end",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    ➡️ 右下角对齐
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>

                    <h4>配合动画演示</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                        <div>
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                快速弹跳
                            </p>
                            <auto-dropdown
                                label="快速弹跳"
                                type="primary"
                                .popupOptions=${{
                                    placement: "top",
                                    animationDuration: 200,
                                    animationEasing: "easeOutBack",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    ⚡ 快速弹出
                                </div>
                            </auto-dropdown>
                        </div>

                        <div>
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                缓动效果
                            </p>
                            <auto-dropdown
                                label="缓动弹出"
                                type="success"
                                .popupOptions=${{
                                    placement: "bottom",
                                    animationDuration: 600,
                                    animationEasing: "easeInOutQuint",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    🌊 缓慢弹出
                                </div>
                            </auto-dropdown>
                        </div>

                        <div>
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                弹性动画
                            </p>
                            <auto-dropdown
                                label="弹性弹出"
                                type="warning"
                                .popupOptions=${{
                                    placement: "left",
                                    animationDuration: 500,
                                    animationEasing: "easeOutElastic(1, .5)",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    🎈 弹性效果
                                </div>
                            </auto-dropdown>
                        </div>

                        <div>
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                回弹动画
                            </p>
                            <auto-dropdown
                                label="回弹弹出"
                                type="info"
                                .popupOptions=${{
                                    placement: "right",
                                    animationDuration: 400,
                                    animationEasing: "easeOutBack(1.7)",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    🔄 回弹效果
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>

                    <h4>复杂布局演示</h4>
                    <div
                        style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;"
                    >
                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                内容丰富的下拉菜单
                            </p>
                            <auto-dropdown
                                label="复杂菜单"
                                type="primary"
                                .popupOptions=${{
                                    placement: "bottom-start",
                                    fitWidth: true,
                                    arrow: true
                                }}
                            >
                                <h4 style="margin: 0 0 12px 0; color: #262626;">
                                    菜单标题
                                </h4>
                                <div
                                    style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
                                >
                                    📄 用户管理
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
                                >
                                    ⚙️ 系统设置
                                </div>
                                <hr
                                    style="margin: 8px 0; border: none; border-top: 1px solid #f0f0f0;"
                                />
                                <div
                                    style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
                                >
                                    📊 数据报表
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
                                >
                                    🔒 退出登录
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">
                                侧边导航式菜单
                            </p>
                            <auto-dropdown
                                label="侧边菜单"
                                type="success"
                                .popupOptions=${{
                                    placement: "right-start",
                                    arrow: true
                                }}
                            >
                                <div
                                    style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0;"
                                >
                                    🏠 首页
                                </div>
                                <div
                                    style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0;"
                                >
                                    📧 个人中心
                                </div>
                                <div
                                    style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0;"
                                >
                                    📧 消息中心
                                    <span
                                        style="background: #ff4d4f; color: white; padding: 2px 8px; border-radius: 12px; margin-left: 8px;"
                                        >3</span
                                    >
                                </div>
                                <div
                                    style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0;"
                                >
                                    🔔 通知设置
                                </div>
                                <div
                                    style="padding: 12px 16px; cursor: pointer;"
                                >
                                    ⚙️ 系统管理
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};
