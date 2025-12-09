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

export const 弹出方向: Story = {
    name: "弹出方向",
    render: () => html`
        <tooltip-demo>
            <div style="padding: 40px; max-width: 900px;">
                <h3
                    style="text-align: center; margin-bottom: 30px; color: #333;"
                >
                    Tooltip 12个位置方向 (9宫格布局)
                </h3>

                <div
                    style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); gap: 20px; min-height: 400px;"
                >
                    <!-- 第一行 -->
                    <!-- top-start (左上) -->
                    <div
                        style="display: flex; justify-content: flex-start; align-items: flex-start; padding: 20px; border: 2px dashed #e0e0e0; border-radius: 8px; background: #f9f9f9;"
                    >
                        <button
                            data-tooltip="<strong>Top-Start:</strong><br/> 左上角弹出"
                            data-tooltip-placement="top-start"
                            style="padding: 10px 16px; background: #6f42c1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Top-Start
                        </button>
                    </div>

                    <!-- top (上中) -->
                    <div
                        style="display: flex; justify-content: center; align-items: flex-start; padding: 20px; border: 2px dashed #e0e0e0; border-radius: 8px; background: #f9f9f9;"
                    >
                        <button
                            data-tooltip="<strong>Top:</strong><br/>placement=top<br/>顶部居中弹出"
                            data-tooltip-placement="top"
                            data-tooltip-arrow="true"
                            style="padding: 10px 16px; background: #6f42c1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Top
                        </button>
                    </div>

                    <!-- top-end (右上) -->
                    <div
                        style="display: flex; justify-content: flex-end; align-items: flex-start; padding: 20px; border: 2px dashed #e0e0e0; border-radius: 8px; background: #f9f9f9;"
                    >
                        <button
                            data-tooltip="Top-End: 右上角弹出"
                            data-tooltip-placement="top-end"
                            data-tooltip-arrow="true"
                            style="padding: 10px 16px; background: #6f42c1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Top-End
                        </button>
                    </div>

                    <!-- 第二行 -->
                    <!-- left-start (左中上) -->
                    <div
                        style="display: flex; justify-content: flex-start; align-items: center; padding: 20px; border: 2px dashed #e0e0e0; border-radius: 8px; background: #f9f9f9;"
                    >
                        <button
                            data-tooltip="Left-Start: 左侧顶部对齐"
                            data-tooltip-placement="left-start"
                            data-tooltip-arrow="true"
                            style="padding: 10px 16px; background: #20c997; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Left-Start
                        </button>
                    </div>

                    <!-- 中心占位符 (用于展示网格结构) -->
                    <div
                        style="display: flex; justify-content: center; align-items: center; padding: 20px; border: 2px dashed #e0e0e0; border-radius: 8px; background: #f0f0f0;"
                    >
                        <span
                            style="color: #999; font-size: 16px; font-weight: bold;"
                            >●</span
                        >
                    </div>

                    <!-- right-start (右中上) -->
                    <div
                        style="display: flex; justify-content: flex-end; align-items: center; padding: 20px; border: 2px dashed #e0e0e0; border-radius: 8px; background: #f9f9f9;"
                    >
                        <button
                            data-tooltip="Right-Start: 右侧顶部对齐"
                            data-tooltip-placement="right-start"
                            data-tooltip-arrow="true"
                            style="padding: 10px 16px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Right-Start
                        </button>
                    </div>

                    <!-- 第三行 -->
                    <!-- left-end (左中下) -->
                    <div
                        style="display: flex; justify-content: flex-start; align-items: flex-end; padding: 20px; border: 2px dashed #e0e0e0; border-radius: 8px; background: #f9f9f9;"
                    >
                        <button
                            data-tooltip="Left-End: 左侧底部对齐"
                            data-tooltip-placement="left-end"
                            data-tooltip-arrow="true"
                            style="padding: 10px 16px; background: #20c997; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Left-End
                        </button>
                    </div>

                    <!-- 底部中间区域 -->
                    <div
                        style="display: flex; justify-content: center; align-items: center; gap: 15px; padding: 20px; border: 2px dashed #e0e0e0; border-radius: 8px; background: #f9f9f9;"
                    >
                        <button
                            data-tooltip="Bottom-Start: 左下角弹出"
                            data-tooltip-placement="bottom-start"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #fd7e14; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Bottom-Start
                        </button>
                        <button
                            data-tooltip="Bottom: 底部居中弹出"
                            data-tooltip-placement="bottom"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #fd7e14; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Bottom
                        </button>
                        <button
                            data-tooltip="Bottom-End: 右下角弹出"
                            data-tooltip-placement="bottom-end"
                            data-tooltip-arrow="true"
                            style="padding: 8px 12px; background: #fd7e14; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Bottom-End
                        </button>
                    </div>

                    <!-- right-end (右中下) -->
                    <div
                        style="display: flex; justify-content: flex-end; align-items: flex-end; padding: 20px; border: 2px dashed #e0e0e0; border-radius: 8px; background: #f9f9f9;"
                    >
                        <button
                            data-tooltip="Right-End: 右侧底部对齐"
                            data-tooltip-placement="right-end"
                            data-tooltip-arrow="true"
                            style="padding: 10px 16px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Right-End
                        </button>
                    </div>
                </div>

                <!-- 额外的左侧和右侧居中按钮 (显示剩余的6个方向) -->
                <div
                    style="margin-top: 30px; display: flex; justify-content: space-around; gap: 20px;"
                >
                    <!-- left (左侧居中) -->
                    <div style="text-align: center;">
                        <h4 style="margin-bottom: 15px; color: #666;">
                            左侧居中
                        </h4>
                        <button
                            data-tooltip="Left: 左侧居中弹出"
                            data-tooltip-placement="left"
                            data-tooltip-arrow="true"
                            style="padding: 12px 20px; background: #20c997; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Left
                        </button>
                    </div>

                    <!-- right (右侧居中) -->
                    <div style="text-align: center;">
                        <h4 style="margin-bottom: 15px; color: #666;">
                            右侧居中
                        </h4>
                        <button
                            data-tooltip="Right: 右侧居中弹出"
                            data-tooltip-placement="right"
                            data-tooltip-arrow="true"
                            style="padding: 12px 20px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                        >
                            Right
                        </button>
                    </div>
                </div>

                <!-- 图例说明 -->
                <div
                    style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #007bff;"
                >
                    <h4 style="margin-bottom: 10px; color: #333;">位置说明</h4>
                    <ul
                        style="margin: 0; padding-left: 20px; color: #666; line-height: 1.6;"
                    >
                        <li>
                            <strong>顶部方向 (紫色):</strong> top, top-start,
                            top-end
                        </li>
                        <li>
                            <strong>底部方向 (橙色):</strong> bottom,
                            bottom-start, bottom-end
                        </li>
                        <li>
                            <strong>左侧方向 (青色):</strong> left, left-start,
                            left-end
                        </li>
                        <li>
                            <strong>右侧方向 (粉色):</strong> right,
                            right-start, right-end
                        </li>
                    </ul>
                </div>
            </div></tooltip-demo
        >
    `,
    parameters: {
        docs: {
            description: {
                story: "使用9宫格布局展示Tooltip的12个弹出方向。上方3个位置、下方3个位置、左侧3个位置、右侧3个位置，以及中心参考点。每个位置都有不同的颜色编码以便区分。",
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
