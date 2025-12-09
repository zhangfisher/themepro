import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./TooltipDemo";

const meta: Meta = {
    title: "控制器/Tooltip/触发方式",
    tags: ["autodocs"],
    render: () => html`<tooltip-trigger-demo></tooltip-trigger-demo>`,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "演示不同的提示框触发方式，包括鼠标悬停和点击两种主要交互模式。",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

export const 点击触发: Story = {
    name: "点击触发",
    render: () => html`
        <tooltip-demo>
            <div
                style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;"
            >
                <button
                    data-tooltip="点击显示提示"
                    data-tooltip-trigger="click"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    点击我
                </button>

                <div
                    data-tooltip="这个提示框需要再次点击才能关闭"
                    data-tooltip-trigger="click"
                    data-tooltip-placement="bottom"
                    style="padding: 15px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; cursor: pointer;"
                >
                    点击切换提示
                </div>

                <span
                    data-tooltip="点击图标显示详细信息"
                    data-tooltip-trigger="click"
                    data-tooltip-placement="right"
                    style="font-size: 20px; cursor: pointer; color: #666;"
                >
                    ℹ️
                </span>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: '使用 `data-tooltip-trigger="click"` 设置点击触发。第一次点击显示提示框，再次点击隐藏。适合需要用户明确操作的场景。',
            },
        },
    },
};

export const 混合触发方式: Story = {
    name: "混合触发方式",
    render: () => html`
        <tooltip-demo>
            <div style="display: grid; gap: 30px; padding: 40px;">
                <div>
                    <h3 style="margin-bottom: 15px;">
                        同一页面中的不同触发方式
                    </h3>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                        <button
                            data-tooltip="我是悬停提示"
                            data-tooltip-trigger="mouseover"
                            data-tooltip-placement="top"
                            style="padding: 10px 16px; border: 1px solid #007bff; background: #007bff; color: white; cursor: pointer;"
                        >
                            悬停按钮
                        </button>

                        <button
                            data-tooltip="我是点击提示"
                            data-tooltip-trigger="click"
                            data-tooltip-placement="top"
                            style="padding: 10px 16px; border: 1px solid #28a745; background: #28a745; color: white; cursor: pointer;"
                        >
                            点击按钮
                        </button>

                        <button
                            data-tooltip="我是右侧点击提示"
                            data-tooltip-trigger="click"
                            data-tooltip-placement="right"
                            style="padding: 10px 16px; border: 1px solid #dc3545; background: #dc3545; color: white; cursor: pointer;"
                        >
                            右侧提示
                        </button>
                    </div>
                </div>

                <div>
                    <h3 style="margin-bottom: 15px;">带图标的交互元素</h3>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <div
                            style="display: flex; align-items: center; gap: 8px;"
                        >
                            <span
                                data-tooltip="悬停查看帮助信息"
                                data-tooltip-trigger="mouseover"
                                style="font-size: 16px; cursor: help;"
                            >
                                ❓
                            </span>
                            <span>悬停帮助</span>
                        </div>

                        <div
                            style="display: flex; align-items: center; gap: 8px;"
                        >
                            <span
                                data-tooltip="点击查看设置"
                                data-tooltip-trigger="click"
                                style="font-size: 16px; cursor: pointer;"
                            >
                                ⚙️
                            </span>
                            <span>点击设置</span>
                        </div>

                        <div
                            style="display: flex; align-items: center; gap: 8px;"
                        >
                            <span
                                data-tooltip="悬停显示警告信息"
                                data-tooltip-trigger="mouseover"
                                data-tooltip-placement="bottom"
                                style="font-size: 16px; cursor: pointer; color: #ffc107;"
                            >
                                ⚠️
                            </span>
                            <span>悬停警告</span>
                        </div>
                    </div>
                </div>
            </div></tooltip-demo
        >
    `,
    parameters: {
        docs: {
            description: {
                story: "在同一页面中可以混合使用不同的触发方式，根据具体的使用场景选择最合适的交互模式。",
            },
        },
    },
};

export const 长时间显示提示: Story = {
    name: "长时间显示提示",
    render: () => html`<tooltip-demo>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <button
                data-tooltip="这个提示框会持续显示10秒，方便用户复制或阅读长内容"
                data-tooltip-trigger="click"
                data-tooltip-delay-hide="10000"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                长时间显示
            </button>

            <button
                data-tooltip="重要提示信息
这个提示框包含多行文本内容，
用户需要更多时间来阅读和理解。
显示时间：15秒"
                data-tooltip-trigger="click"
                data-tooltip-delay-hide="15000"
                data-tooltip-placement="bottom"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                多行长提示
            </button>
        </div></tooltip-demo
    > `,
    parameters: {
        docs: {
            description: {
                story: "对于包含重要信息或长文本的提示框，可以设置较长的显示时间，确保用户有足够的时间阅读内容。",
            },
        },
    },
};
