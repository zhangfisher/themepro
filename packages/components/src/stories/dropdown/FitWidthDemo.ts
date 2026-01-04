import { html } from "lit";
import type { Story } from "./types";

export const FitWidthDemo: Story = {
    name: "宽度适配演示",
    render: () => {
        return html`
            <div style="padding: 20px;">
                <h3>fit 属性演示</h3>
                <p style="color: #666; margin: 10px 0;">
                    fit 属性控制下拉内容宽度是否匹配触发按钮的宽度
                </p>

                <div style="margin-top: 30px;">
                    <h4>不使用 fit (默认行为)</h4>
                    <p
                        style="color: #666; font-size: 14px; margin-bottom: 15px;"
                    >
                        下拉内容使用内容的自然宽度（min-width 或内容宽度）
                    </p>
                    <div
                        style="display: flex; gap: 20px; margin-bottom: 40px; flex-wrap: wrap;"
                    >
                        <auto-dropdown label="短按钮" type="primary">
                            <div
                                style="padding: 12px; min-width: 200px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    这是一个较长的选项内容
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    另一个长内容选项
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    短选项
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="这是一个很长的按钮文本"
                            type="success"
                        >
                            <div
                                style="padding: 12px; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 1
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 2
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 3
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>

                    <h4>使用 fit="true"</h4>
                    <p
                        style="color: #666; font-size: 14px; margin-bottom: 15px;"
                    >
                        下拉内容宽度强制匹配触发按钮的宽度
                    </p>
                    <div
                        style="display: flex; gap: 20px; margin-bottom: 40px; flex-wrap: wrap;"
                    >
                        <auto-dropdown
                            label="短按钮"
                            type="primary"
                            .popupOptions=${{ fit: true }}
                        >
                            <div
                                style="padding: 12px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    这是一个较长的选项内容
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    另一个长内容选项
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    短选项
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="这是一个很长的按钮文本"
                            type="success"
                            .popupOptions=${{ fit: true }}
                        >
                            <div
                                style="padding: 12px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 1
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 2
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 3
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>

                    <h4>对比演示</h4>
                    <p
                        style="color: #666; font-size: 14px; margin-bottom: 15px;"
                    >
                        相同内容，不同 fit 设置的对比效果
                    </p>
                    <div
                        style="display: flex; gap: 20px; flex-direction: column; max-width: 500px;"
                    >
                        <auto-dropdown label="fit=false (默认)" type="warning">
                            <div
                                style="padding: 12px; min-width: 250px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    这是一个具有相当长度内容的菜单项
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    另一个很长的菜单内容示例
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    短
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="fit=true"
                            type="info"
                            .popupOptions=${{ fit: true }}
                        >
                            <div
                                style="padding: 12px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    这是一个具有相当长度内容的菜单项
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    另一个很长的菜单内容示例
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    短
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>

                    <h4>在表单中的应用示例</h4>
                    <div style="margin-top: 30px; max-width: 400px;">
                        <auto-dropdown
                            label="选择用户角色"
                            type="primary"
                            .popupOptions=${{ fit: true }}
                            block
                        >
                            <div
                                style="padding: 16px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
                                >
                                    <strong>系统管理员</strong>
                                    <div
                                        style="font-size: 12px; color: #666; margin-top: 2px;"
                                    >
                                        拥有所有系统权限
                                    </div>
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
                                >
                                    <strong>普通用户</strong>
                                    <div
                                        style="font-size: 12px; color: #666; margin-top: 2px;"
                                    >
                                        基础使用权限
                                    </div>
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
                                >
                                    <strong>访客</strong>
                                    <div
                                        style="font-size: 12px; color: #666; margin-top: 2px;"
                                    >
                                        只读权限
                                    </div>
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>
                </div>
            </div>
        `;
    },
};
