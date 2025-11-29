import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./TooltipDemo";

const meta: Meta = {
    title: "控制器/Tooltip",
    tags: ["autodocs"],
    render: () => html`<tooltip-placement-demo></tooltip-placement-demo>`,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "演示提示框的各种位置选项，包括12个不同的定位方向。",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

export const 基础位置: Story = {
    name: "基础位置",
    render: () => html`
        <tooltip-demo>
            <div
                style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; padding: 40px; max-width: 600px;"
            >
                <!-- 顶部居中 -->
                <div
                    style="display: flex; justify-content: center; align-items: center; height: 80px; border: 1px dashed #ccc; position: relative;"
                >
                    <button
                        data-tooltip="顶部提示"
                        data-tooltip-placement="top"
                        data-tooltip-arrow="true"
                        style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    >
                        Top
                    </button>
                </div>

                <!-- 右侧居中 -->
                <div
                    style="display: flex; justify-content: center; align-items: center; height: 80px; border: 1px dashed #ccc; position: relative;"
                >
                    <button
                        data-tooltip="右侧提示"
                        data-tooltip-placement="right"
                        data-tooltip-arrow="true"
                        style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    >
                        Right
                    </button>
                </div>

                <!-- 底部居中 -->
                <div
                    style="display: flex; justify-content: center; align-items: center; height: 80px; border: 1px dashed #ccc; position: relative;"
                >
                    <button
                        data-tooltip="底部提示"
                        data-tooltip-placement="bottom"
                        data-tooltip-arrow="true"
                        style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    >
                        Bottom
                    </button>
                </div>

                <!-- 左侧居中 -->
                <div
                    style="display: flex; justify-content: center; align-items: center; height: 80px; border: 1px dashed #ccc; position: relative;"
                >
                    <button
                        data-tooltip="左侧提示"
                        data-tooltip-placement="left"
                        data-tooltip-arrow="true"
                        style="padding: 8px 16px; background: #ffc107; color: black; border: none; border-radius: 4px; cursor: pointer;"
                    >
                        Left
                    </button>
                </div>
            </div></tooltip-demo
        >
    `,
    parameters: {
        docs: {
            description: {
                story: "四个基础位置：top、right、bottom、left。提示框会根据目标元素的位置自动调整，确保在视口内可见。",
            },
        },
    },
};

export const 带对齐的位置: Story = {
    name: "带对齐的位置",
    render: () => html`
        <tooltip-demo>
            <div
                style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; padding: 40px; max-width: 800px;"
            >
                <!-- 顶部对齐选项 -->
                <div style="text-align: center;">
                    <h4>顶部对齐</h4>
                    <div
                        style="display: flex; justify-content: space-around; margin-top: 20px;gap:0.5em"
                    >
                        <button
                            data-tooltip="左对齐"
                            data-tooltip-placement="top-start"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #6f42c1; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Top-Start
                        </button>
                        <button
                            data-tooltip="居中"
                            data-tooltip-placement="top"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #6f42c1; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Top
                        </button>
                        <button
                            data-tooltip="右对齐"
                            data-tooltip-placement="top-end"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #6f42c1; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Top-End
                        </button>
                    </div>
                </div>

                <!-- 底部对齐选项 -->
                <div style="text-align: center;">
                    <h4>底部对齐</h4>
                    <div
                        style="display: flex; justify-content: space-around; margin-top: 20px;gap:0.5em"
                    >
                        <button
                            data-tooltip="左对齐"
                            data-tooltip-placement="bottom-start"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #fd7e14; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Bottom-Start
                        </button>
                        <button
                            data-tooltip="居中"
                            data-tooltip-placement="bottom"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #fd7e14; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Bottom
                        </button>
                        <button
                            data-tooltip="右对齐"
                            data-tooltip-placement="bottom-end"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #fd7e14; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Bottom-End
                        </button>
                    </div>
                </div>

                <!-- 左侧对齐选项 -->
                <div style="text-align: center;">
                    <h4>左侧对齐</h4>
                    <div
                        style="display: flex; justify-content: space-around; margin-top: 20px;gap:0.5em"
                    >
                        <button
                            data-tooltip="顶部对齐"
                            data-tooltip-placement="left-start"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #20c997; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Left-Start
                        </button>
                        <button
                            data-tooltip="居中"
                            data-tooltip-placement="left"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #20c997; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Left
                        </button>
                        <button
                            data-tooltip="底部对齐"
                            data-tooltip-placement="left-end"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #20c997; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            Left-End
                        </button>
                    </div>
                </div>
            </div></tooltip-demo
        >
    `,
    parameters: {
        docs: {
            description: {
                story: "12个精确的位置选项：top、top-start、top-end、right、right-start、right-end、bottom、bottom-start、bottom-end、left、left-start、left-end。",
            },
        },
    },
};

export const 右侧对齐选项: Story = {
    name: "右侧对齐选项",
    render: () => html`
        <tooltip-demo>
            <div style="text-align: center; padding: 40px;">
                <h4>右侧对齐</h4>
                <div
                    style="display: flex; justify-content: space-around; margin-top: 20px;gap:0.5em"
                >
                    <button
                        data-tooltip="顶部对齐"
                        data-tooltip-placement="right-start"
                        data-tooltip-arrow="true"
                        style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    >
                        Right-Start
                    </button>
                    <button
                        data-tooltip="居中"
                        data-tooltip-placement="right"
                        data-tooltip-arrow="true"
                        style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    >
                        Right
                    </button>
                    <button
                        data-tooltip="底部对齐"
                        data-tooltip-placement="right-end"
                        data-tooltip-arrow="true"
                        style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    >
                        Right-End
                    </button>
                </div>
            </div></tooltip-demo
        >
    `,
    parameters: {
        docs: {
            description: {
                story: "右侧的三个对齐选项：right-start（顶部对齐）、right（居中对齐）、right-end（底部对齐）。",
            },
        },
    },
};

export const 实际应用场景: Story = {
    name: "实际应用场景",
    render: () => html`
        <tooltip-demo>
            <div style="padding: 40px; max-width: 900px;">
                <!-- 表单场景 -->
                <div style="margin-bottom: 40px;">
                    <h4 style="margin-bottom: 20px;">表单字段提示</h4>
                    <div
                        style="display: grid; grid-template-columns: 200px 1fr; gap: 15px; align-items: center;"
                    >
                        <label style="font-size:1rem;">用户名：</label>
                        <div style="position: relative;">
                            <input
                                type="text"
                                placeholder="请输入用户名"
                                data-tooltip="用户名必须包含字母和数字，长度在6-20个字符之间"
                                data-tooltip-placement="right-start"
                                data-tooltip-arrow="true"
                                style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; width: 200px;"
                            />
                        </div>

                        <label style="font-size:1rem;">密码：</label>
                        <div style="position: relative;">
                            <input
                                type="password"
                                placeholder="请输入密码"
                                data-tooltip="密码至少8位，包含大小写字母和数字"
                                data-tooltip-placement="right"
                                data-tooltip-arrow="true"
                                style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; width: 200px;"
                            />
                        </div>

                        <label style="font-size:1rem;">邮箱：</label>
                        <div style="position: relative;">
                            <input
                                type="email"
                                placeholder="请输入邮箱地址"
                                data-tooltip="请输入有效的邮箱地址，如：user@example.com"
                                data-tooltip-placement="right-end"
                                data-tooltip-arrow="true"
                                style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; width: 200px;"
                            />
                        </div>
                    </div>
                </div>

                <!-- 按钮组场景 -->
                <div>
                    <h4 style="margin-bottom: 20px;">操作按钮组</h4>
                    <div
                        style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;"
                    >
                        <button
                            data-tooltip="保存当前修改的内容"
                            data-tooltip-placement="top"
                            data-tooltip-arrow="true"
                            style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            保存
                        </button>

                        <button
                            data-tooltip="取消操作并返回"
                            data-tooltip-placement="top"
                            data-tooltip-arrow="true"
                            style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            取消
                        </button>

                        <button
                            data-tooltip="删除选中的项目"
                            data-tooltip-placement="bottom"
                            data-tooltip-arrow="true"
                            style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            删除
                        </button>

                        <button
                            data-tooltip="查看更多选项"
                            data-tooltip-placement="bottom"
                            data-tooltip-arrow="true"
                            style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            更多
                        </button>
                    </div>
                </div>
            </div></tooltip-demo
        >
    `,
    parameters: {
        docs: {
            description: {
                story: "在实际的表单和按钮组中，合理使用不同的提示框位置可以避免遮挡重要的UI元素，提供更好的用户体验。",
            },
        },
    },
};
