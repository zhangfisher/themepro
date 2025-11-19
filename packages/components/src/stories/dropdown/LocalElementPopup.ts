import { html } from "lit";
import type { Story } from "./types";

export const LocalElementPopup: Story = {
    name: "局部元素弹出",
    render: (args: any) => {
        return html`
            <div
                style="padding: 40px; display: flex; flex-direction: column; gap: 30px;"
            >
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <h3>局部元素弹出功能</h3>
                    <p style="color: #666; font-size: 14px;">
                        通过trigger选择器指定host内部的具体元素作为触发器，支持data-tooltip和data-slot属性
                    </p>
                </div>

                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <auto-dropdown
                        .tags=${[
                            {
                                icon: "settings",
                                tips: "系统设置",
                            },
                            "tag",
                            "info",
                        ]}
                        style="width: 300px;"
                        icon="home"
                        label="设置按钮"
                        labelGrow
                        data-tooltip="<strong>设置按钮</strong><br>点击打开系统设置面板"
                        .popupOptions=${{
                            trigger: ".tag",
                            placement: "top",
                            animationDuration: 200,
                            arrow: true,
                        }}
                    ></auto-dropdown>

                    <auto-dropdown
                        .tags=${["save", "tag", "checked"]}
                        .labelGrow=${args.labelGrow}
                        style="width: 300px;"
                        icon="tag"
                        size="x-small"
                        label="保存操作"
                        type="primary"
                        data-tooltip="<strong>保存操作</strong><br>将当前更改保存到文档中"
                        .popupOptions=${{
                            trigger: ".tag",
                            placement: "top",
                            animationDuration: 200,
                            arrow: true,
                        }}
                    ></auto-dropdown>

                    <auto-dropdown
                        .tags=${["copy", "tag", "clipboard"]}
                        .labelGrow=${args.labelGrow}
                        style="width: 300px;"
                        icon="folder"
                        size="x-small"
                        label="复制内容"
                        type="success"
                        data-tooltip="<strong>复制功能</strong><br>复制选中的内容到剪贴板"
                        .popupOptions=${{
                            trigger: ".tag",
                            placement: "top",
                            animationDuration: 200,
                            arrow: true,
                        }}
                    ></auto-dropdown>

                    <auto-dropdown
                        .tags=${["delete", "tag", "trash"]}
                        .labelGrow=${args.labelGrow}
                        style="width: 300px;"
                        icon="checked"
                        size="x-small"
                        label="删除项目"
                        type="danger"
                        data-tooltip="<strong>删除操作</strong><br>此操作不可撤销，请谨慎操作"
                        .popupOptions=${{
                            trigger: ".tag",
                            placement: "top",
                            animationDuration: 200,
                            arrow: true,
                        }}
                    ></auto-dropdown>
                </div>

                <auto-dropdown
                    .popupOptions=${{
                        trigger: ".info-icon",
                        placement: "right",
                        animationDuration: 150,
                        arrow: true,
                    }}
                >
                    <div
                        style="display: flex; flex-direction: column; gap: 20px;"
                    >
                        <div
                            style="display: flex; align-items: center; gap: 10px;"
                        >
                            <span>用户名</span>
                            <span
                                class="info-icon"
                                data-tooltip="用户名必须是唯一的，长度在3-20个字符之间"
                                style="color: #1890ff; cursor: help; font-weight: bold;"
                                >ℹ️</span
                            >
                        </div>

                        <div
                            style="display: flex; align-items: center; gap: 10px;"
                        >
                            <span>邮箱地址</span>
                            <span
                                class="info-icon"
                                data-tooltip="请输入有效的邮箱地址，格式如：user@example.com"
                                style="color: #1890ff; cursor: help; font-weight: bold;"
                                >ℹ️</span
                            >
                        </div>

                        <div
                            style="display: flex; align-items: center; gap: 10px;"
                        >
                            <span>密码强度</span>
                            <span
                                class="info-icon"
                                data-tooltip="密码应包含大小写字母、数字和特殊字符，至少8位"
                                style="color: #1890ff; cursor: help; font-weight: bold;"
                                >ℹ️</span
                            >
                        </div>
                    </div>
                </auto-dropdown>

                <auto-dropdown
                    .popupOptions=${{
                        trigger: [".action-btn", ".status-indicator"],
                        placement: "bottom",
                        animationDuration: 250,
                        offset: [0, 8],
                    }}
                >
                    <div
                        style="display: flex; flex-direction: column; gap: 20px;"
                    >
                        <div
                            style="display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #d9d9d9; border-radius: 6px;"
                        >
                            <button
                                class="action-btn"
                                data-slot="menu-content"
                                style="padding: 6px 12px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 4px; cursor: pointer;"
                            >
                                操作菜单
                            </button>

                            <div
                                class="status-indicator"
                                data-slot="status-content"
                                style="width: 20px; height: 20px; background: #52c41a; border-radius: 50%; cursor: pointer;"
                            ></div>

                            <span>点击按钮或状态圆圈查看不同的弹出内容</span>
                        </div>

                        <!-- 默认slot内容 -->
                        <div
                            slot="menu-content"
                            style="padding: 8px 0; min-width: 150px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                        >
                            <div style="padding: 8px 16px; cursor: pointer;">
                                📝 编辑
                            </div>
                            <div style="padding: 8px 16px; cursor: pointer;">
                                📋 复制
                            </div>
                            <div style="padding: 8px 16px; cursor: pointer;">
                                🗑️ 删除
                            </div>
                            <hr
                                style="margin: 4px 0; border: none; border-top: 1px solid #e0e0e0;"
                            />
                            <div style="padding: 8px 16px; cursor: pointer;">
                                ⚙️ 设置
                            </div>
                        </div>

                        <div
                            slot="status-content"
                            style="padding: 12px; min-width: 200px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                        >
                            <div style="font-weight: 600; margin-bottom: 8px;">
                                系统状态
                            </div>
                            <div style="color: #52c41a;">
                                ✅ 所有服务正常运行
                            </div>
                            <div
                                style="color: #666; font-size: 12px; margin-top: 8px;"
                            >
                                最后更新: ${new Date().toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                </auto-dropdown>

                <auto-dropdown
                    .popupOptions=${{
                        trigger: ".hover-trigger",
                        on: "mouseover",
                        placement: "top",
                        animationDuration: 150,
                        delayHide: 500,
                        arrow: true,
                    }}
                >
                    <div style="display: flex; gap: 30px;">
                        <span
                            class="hover-trigger"
                            data-tooltip="这是一个悬停提示"
                            style="padding: 4px 8px; background: #e6f7ff; border: 1px solid #91d5ff; border-radius: 4px; cursor: default;"
                        >
                            悬停我
                        </span>

                        <span
                            class="hover-trigger"
                            data-tooltip="<strong>复杂提示</strong><br>支持<strong>HTML</strong>格式的提示内容"
                            style="padding: 4px 8px; background: #fff7e6; border: 1px solid #ffd591; border-radius: 4px; cursor: default;"
                        >
                            悬停我(HTML)
                        </span>

                        <span
                            class="hover-trigger"
                            data-slot="custom-slot-content"
                            style="padding: 4px 8px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 4px; cursor: default;"
                        >
                            悬停我(slot)
                        </span>
                    </div>

                    <!-- 自定义slot内容 -->
                    <div
                        slot="custom-slot-content"
                        style="padding: 16px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                    >
                        <div
                            style="font-weight: 600; color: #52c41a; margin-bottom: 8px;"
                        >
                            🎉 自定义Slot内容
                        </div>
                        <div style="color: #666; font-size: 14px;">
                            这是通过data-slot属性指定的自定义内容
                        </div>
                    </div>
                </auto-dropdown>

                <div
                    style="padding: 20px; margin-top: 20px; background: #f8f9fa; border-radius: 6px;"
                >
                    <h4 style="margin: 0 0 15px 0; color: #333;">使用说明:</h4>
                    <div
                        style="display: flex; flex-direction: column; gap: 10px;"
                    >
                        <div>
                            <strong style="color: #1890ff;"
                                >trigger选择器:</strong
                            >
                            <code
                                style="background: #f1f3f4; padding: 2px 6px; border-radius: 3px;"
                                >trigger: ".tag"</code
                            >
                            - 指定auto-button组件内的tag元素作为触发器
                        </div>
                        <div>
                            <strong style="color: #52c41a;"
                                >data-tooltip:</strong
                            >
                            <code
                                style="background: #f1f3f4; padding: 2px 6px; border-radius: 3px;"
                                >data-tooltip="&lt;strong&gt;HTML&lt;/strong&gt;内容"</code
                            >
                            - 支持HTML格式的提示内容
                        </div>
                        <div>
                            <strong style="color: #722ed1;">data-slot:</strong>
                            <code
                                style="background: #f1f3f4; padding: 2px 6px; border-radius: 3px;"
                                >data-slot="slot-name"</code
                            >
                            - 指定要显示的slot内容
                        </div>
                        <div>
                            <strong style="color: #fa8c16;">优先级:</strong>
                            data-tooltip &gt; data-slot &gt; 默认slot内容
                        </div>
                        <div>
                            <strong style="color: #ff4d4f;">事件委托:</strong>
                            使用事件委托模式，在host元素上监听冒泡事件
                        </div>
                        <div>
                            <strong style="color: #13c2c2;">位置计算:</strong>
                            自动以触发元素为基准计算弹出位置
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};
