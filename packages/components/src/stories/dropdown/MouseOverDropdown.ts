import { html } from "lit";
import type { Story } from "./types";

export const MouseOverDropdown: Story = {
    name: "MouseOver触发",
    render: (args: any) => {
        return html`
            <div
                style="padding: 40px; display: flex; gap: 30px; flex-wrap: wrap; align-items: flex-start;"
            >
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <h3>MouseOver触发的下拉菜单</h3>
                    <p style="color: #666; font-size: 14px;">
                        将鼠标移到按钮上会自动显示下拉内容，移开时会自动隐藏
                    </p>

                    <auto-dropdown
                        label="悬停显示菜单"
                        type="primary"
                        .popupOptions=${{
                            trigger: "mouseover",
                            placement: "bottom-start",
                            offset: [0, 8],
                            animationDuration: 200,
                            animationEasing: "easeOutQuart",
                        }}
                    >
                        <div
                            style="padding: 8px 16px; cursor: pointer; &:hover { background-color: #f5f5f5; }"
                        >
                            📁 打开文件
                        </div>
                        <div
                            style="padding: 8px 16px; cursor: pointer; &:hover { background-color: #f5f5f5; }"
                        >
                            💾 保存文件
                        </div>
                        <div
                            style="padding: 8px 16px; cursor: pointer; &:hover { background-color: #f5f5f5; }"
                        >
                            📋 复制内容
                        </div>
                        <hr
                            style="margin: 4px 0; border: none; border-top: 1px solid #e0e0e0;"
                        />
                        <div
                            style="padding: 8px 16px; cursor: pointer; &:hover { background-color: #f5f5f5; }"
                        >
                            🚪 退出
                        </div>
                    </auto-dropdown>

                    <auto-dropdown
                        label="用户信息"
                        type="info"
                        .popupOptions=${{
                            trigger: "mouseover",
                            placement: "right-start",
                            animationDuration: 150,
                            arrow: true,
                        }}
                    >
                        <div
                            style="display: flex; align-items: center; margin-bottom: 12px;"
                        >
                            <div
                                style="width: 40px; height: 40px; background: #1890ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 12px;"
                            >
                                U
                            </div>
                            <div>
                                <div style="font-weight: 600;">用户名</div>
                                <div style="color: #666; font-size: 12px;">
                                    user@example.com
                                </div>
                            </div>
                        </div>
                        <hr
                            style="margin: 12px 0; border: none; border-top: 1px solid #e0e0e0;"
                        />
                        <div
                            style="padding: 6px 0; cursor: pointer; color: #666;"
                        >
                            👤 个人资料
                        </div>
                        <div
                            style="padding: 6px 0; cursor: pointer; color: #666;"
                        >
                            ⚙️ 设置
                        </div>
                        <div
                            style="padding: 6px 0; cursor: pointer; color: #666;"
                        >
                            🚪 退出登录
                        </div>
                    </auto-dropdown>

                    <auto-dropdown
                        label="工具提示"
                        type="warning"
                        .popupOptions=${{
                            trigger: "mouseover",
                            placement: "top",
                            delayHide: 1000,
                            animationDuration: 100,
                            arrow: true,
                        }}
                    >
                        <div
                            class="dropdown"
                            style="padding: 12px 16px; max-width: 250px; background: #fffbe6; border: 1px solid #ffe58f; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); color: #874d00;"
                        >
                            <strong>提示:</strong>
                            这是一个通过鼠标悬停触发的工具提示，适用于简短的辅助信息展示。
                        </div>
                    </auto-dropdown>
                </div>

                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <h3>对比：Click触发</h3>
                    <p style="color: #666; font-size: 14px;">
                        传统的点击触发模式，需要点击按钮才会显示下拉内容
                    </p>

                    <auto-dropdown
                        label="点击显示菜单"
                        type="default"
                        .popupOptions=${{
                            on: "click",
                            placement: "bottom-start",
                            offset: [0, 8],
                            animationDuration: 200,
                            animationEasing: "easeOutQuart",
                        }}
                    >
                        <div
                            class="dropdown"
                            style="padding: 8px 0; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                        >
                            <div style="padding: 8px 16px; cursor: pointer;">
                                📁 打开文件
                            </div>
                            <div style="padding: 8px 16px; cursor: pointer;">
                                💾 保存文件
                            </div>
                            <div style="padding: 8px 16px; cursor: pointer;">
                                📋 复制内容
                            </div>
                            <hr
                                style="margin: 4px 0; border: none; border-top: 1px solid #e0e0e0;"
                            />
                            <div style="padding: 8px 16px; cursor: pointer;">
                                🚪 退出
                            </div>
                        </div>
                    </auto-dropdown>
                </div>
            </div>

            <div
                style="padding: 20px; margin-top: 20px; background: #f8f9fa; border-radius: 6px;"
            >
                <h4 style="margin: 0 0 10px 0; color: #333;">使用说明:</h4>
                <ul
                    style="margin: 0; padding-left: 20px; color: #666; line-height: 1.6;"
                >
                    <li>
                        <code>trigger: "mouseover"</code> -
                        设置为鼠标悬停触发模式
                    </li>
                    <li>鼠标移入按钮区域时自动显示弹出内容</li>
                    <li>鼠标移出按钮且不在弹出内容内时自动隐藏</li>
                    <li>鼠标在按钮和弹出内容之间移动时保持显示状态</li>
                    <li>可配合 <code>delayHide</code> 设置延迟隐藏时间</li>
                </ul>
            </div>
        `;
    },
};
