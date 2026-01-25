import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "./TooltipDemo";
import "../../components/Button/index";
const meta: Meta = {
    title: "控制器/Tooltip/适应宽度和高度",
    tags: ["autodocs"],
    argTypes: {
        fit: {
            control: "select",
            options: ["none", "auto", "width", "height"],
            description: "弹出内容宽度/高度与target元素的宽度/高度是否一致",
            table: {
                defaultValue: { summary: "none" },
                type: { summary: "string" },
            },
        },
        placement: {
            control: "select",
            options: [
                "top",
                "bottom",
                "left",
                "right",
                "top-start",
                "top-end",
                "bottom-start",
                "bottom-end",
                "left-start",
                "left-end",
                "right-start",
                "right-end",
            ],
            description: "提示框位置",
            table: {
                defaultValue: { summary: "top" },
            },
        },
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FitNone: Story = {
    name: "Fit: None (默认)",
    render: () => html`<tooltip-demo>
        <div style="padding: 2em; display: flex; gap: 2em; flex-wrap: wrap;">
            <div>
                <h4>Fit: None - 不启用适应</h4>
                <p>Tooltip 将使用内容自适应尺寸</p>
                <div style="margin-top: 1em;">
                    <kylin-button
                        label="悬停查看 Tooltip (Fit: None)"
                        data-tooltip="这是一个不适应目标元素尺寸的提示内容，会根据文本内容自动调整宽度"
                        data-tooltip-fit="none"
                    ></kylin-button>
                </div>
            </div>

            <div>
                <h4>不同位置 - Fit: None</h4>
                <div style="display: flex; gap: 1em; margin-top: 1em;">
                    <kylin-button
                        label="上方"
                        data-tooltip="上方提示"
                        data-tooltip-placement="top"
                        data-tooltip-fit="none"
                    ></kylin-button>
                    <kylin-button
                        label="右侧"
                        data-tooltip="右侧提示"
                        data-tooltip-placement="right"
                        data-tooltip-fit="none"
                    ></kylin-button>
                    <kylin-button
                        label="下方"
                        data-tooltip="下方提示"
                        data-tooltip-placement="bottom"
                        data-tooltip-fit="none"
                    ></kylin-button>
                    <kylin-button
                        label="左侧"
                        data-tooltip="左侧提示"
                        data-tooltip-placement="left"
                        data-tooltip-fit="none"
                    ></kylin-button>
                </div>
            </div>
        </div>
    </tooltip-demo> `,
};

export const FitWidth: Story = {
    name: "Fit: Width",
    render: () => html`<tooltip-demo>
        <div style="padding: 2em; display: flex; gap: 2em; flex-wrap: wrap;">
            <div>
                <h4>Fit: Width - 宽度适应</h4>
                <p>Tooltip 宽度将与目标元素宽度一致</p>
                <div
                    style="margin-top: 1em; display: flex; flex-direction: column; gap: 1em;"
                >
                    <kylin-button
                        label="小按钮 (150px)"
                        data-tooltip="这个提示内容的宽度会适应按钮的宽度"
                        data-tooltip-fit="width"
                        style="width: 150px;"
                    ></kylin-button>

                    <kylin-button
                        label="大按钮 (300px)"
                        data-tooltip="这个提示内容的宽度会适应按钮的宽度，无论内容多长都会被限制在这个宽度内"
                        data-tooltip-fit="width"
                        style="width: 300px;"
                    ></kylin-button>
                </div>
            </div>

            <div>
                <h4>不同元素类型 - Fit: Width</h4>
                <div
                    style="margin-top: 1em; display: flex; flex-direction: column; gap: 1em;"
                >
                    <div style="display: inline-block;">
                        <span
                            data-tooltip="span元素的tooltip"
                            data-tooltip-fit="width"
                            style="display: inline-block; padding: 8px 16px; background: #f0f0f0; border-radius: 4px; cursor: pointer; width: 200px;"
                        >
                            Span 元素 (200px)
                        </span>
                    </div>

                    <div style="display: inline-block;">
                        <div
                            data-tooltip="div元素的tooltip内容"
                            data-tooltip-fit="width"
                            style="display: inline-block; padding: 12px 20px; background: #e0f0ff; border-radius: 4px; cursor: pointer; width: 250px;"
                        >
                            Div 元素 (250px)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </tooltip-demo> `,
};

export const FitHeight: Story = {
    name: "Fit: Height",
    render: () => html`<tooltip-demo>
        <div style="padding: 2em; display: flex; gap: 2em; flex-wrap: wrap;">
            <div>
                <h4>Fit: Height - 高度适应</h4>
                <p>Tooltip 高度将与目标元素高度一致</p>
                <div
                    style="margin-top: 1em; display: flex; align-items: center; gap: 1em;"
                >
                    <kylin-button
                        label="普通高度"
                        data-tooltip="高度适应的提示"
                        data-tooltip-fit="height"
                        style="height: 40px;"
                    ></kylin-button>

                    <kylin-button
                        label="高按钮"
                        data-tooltip="这个tooltip的高度会适应按钮的高度"
                        data-tooltip-fit="height"
                        style="height: 80px; padding: 0 20px;"
                    ></kylin-button>

                    <kylin-button
                        label="超高按钮"
                        data-tooltip="超高高按钮的tooltip"
                        data-tooltip-fit="height"
                        style="height: 120px; padding: 0 20px;"
                    ></kylin-button>
                </div>
            </div>

            <div>
                <h4>左侧/右侧位置 - Fit: Height</h4>
                <div
                    style="margin-top: 1em; display: flex; align-items: center; gap: 1em;"
                >
                    <kylin-button
                        label="高按钮"
                        data-tooltip="左侧提示，高度适应"
                        data-tooltip-fit="height"
                        data-tooltip-placement="left"
                        style="height: 100px; width: 80px;"
                    ></kylin-button>

                    <kylin-button
                        label="高按钮"
                        data-tooltip="右侧提示，高度适应"
                        data-tooltip-fit="height"
                        data-tooltip-placement="right"
                        style="height: 100px; width: 80px;"
                    ></kylin-button>
                </div>
            </div>
        </div>
    </tooltip-demo> `,
};

export const FitAuto: Story = {
    name: "Fit: Auto",
    render: () => html`<tooltip-demo>
        <div style="padding: 2em;">
            <h4>Fit: Auto - 自动适应</h4>
            <p>根据弹出方向自动适应：上下位置适应宽度，左右位置适应高度</p>

            <div style="margin-top: 2em;">
                <h5>上下位置 (适应宽度)</h5>
                <div
                    style="display: flex; gap: 1em; align-items: center; margin-bottom: 2em;"
                >
                    <kylin-button
                        label="上方 (200px 宽)"
                        data-tooltip="这个提示在上方，自动适应按钮宽度"
                        data-tooltip-fit="auto"
                        data-tooltip-placement="top"
                        style="width: 200px;"
                    ></kylin-button>

                    <kylin-button
                        label="下方 (300px 宽)"
                        data-tooltip="这个提示在下方，自动适应按钮宽度"
                        data-tooltip-fit="auto"
                        data-tooltip-placement="bottom"
                        style="width: 300px;"
                    ></kylin-button>
                </div>

                <h5>左右位置 (适应高度)</h5>
                <div style="display: flex; gap: 2em; align-items: center;">
                    <kylin-button
                        label="高按钮"
                        data-tooltip="左侧提示，自动适应高度"
                        data-tooltip-fit="auto"
                        data-tooltip-placement="left"
                        style="height: 80px; width: 100px;"
                    ></kylin-button>

                    <kylin-button
                        label="超高按钮"
                        data-tooltip="右侧提示，自动适应高度"
                        data-tooltip-fit="auto"
                        data-tooltip-placement="right"
                        style="height: 120px; width: 100px;"
                    ></kylin-button>
                </div>
            </div>

            <div style="margin-top: 2em;">
                <h5>综合演示</h5>
                <div
                    style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2em; margin-top: 1em;"
                >
                    <div style="text-align: center;">
                        <kylin-button
                            label="Top-Start"
                            data-tooltip="顶部起始位置"
                            data-tooltip-fit="auto"
                            data-tooltip-placement="top-start"
                            style="width: 120px;"
                        ></kylin-button>
                    </div>

                    <div style="text-align: center;">
                        <kylin-button
                            label="Right-Start"
                            data-tooltip="右侧起始位置，高度适应"
                            data-tooltip-fit="auto"
                            data-tooltip-placement="right-start"
                            style="height: 60px; width: 100px;"
                        ></kylin-button>
                    </div>

                    <div style="text-align: center;">
                        <kylin-button
                            label="Bottom-End"
                            data-tooltip="底部结束位置"
                            data-tooltip-fit="auto"
                            data-tooltip-placement="bottom-end"
                            style="width: 120px;"
                        ></kylin-button>
                    </div>
                </div>
            </div>
        </div>
    </tooltip-demo> `,
};

export const ComparisonDemo: Story = {
    name: "对比演示",
    render: () => html`<tooltip-demo>
        <div style="padding: 2em;">
            <h4>Fit 模式对比</h4>
            <p>相同的按钮，不同的 fit 模式效果对比</p>

            <div style="margin-top: 2em;">
                <h5>相同内容，不同 Fit 模式</h5>
                <div style="display: flex; gap: 2em; margin-top: 1em;">
                    <div>
                        <div style="margin-bottom: 1em; font-weight: bold;">
                            Fit: None
                        </div>
                        <kylin-button
                            label="按钮 (200px)"
                            data-tooltip="这是相同内容的提示文本，用于对比不同fit模式的效果差异"
                            data-tooltip-fit="none"
                            style="width: 200px;"
                        ></kylin-button>
                    </div>

                    <div>
                        <div style="margin-bottom: 1em; font-weight: bold;">
                            Fit: Width
                        </div>
                        <kylin-button
                            label="按钮 (200px)"
                            data-tooltip="这是相同内容的提示文本，用于对比不同fit模式的效果差异"
                            data-tooltip-fit="width"
                            style="width: 200px;"
                        ></kylin-button>
                    </div>

                    <div>
                        <div style="margin-bottom: 1em; font-weight: bold;">
                            Fit: Auto
                        </div>
                        <kylin-button
                            label="按钮 (200px)"
                            data-tooltip="这是相同内容的提示文本，用于对比不同fit模式的效果差异"
                            data-tooltip-fit="auto"
                            data-tooltip-placement="top"
                            style="width: 200px;"
                        ></kylin-button>
                    </div>
                </div>
            </div>

            <div style="margin-top: 3em;">
                <h5>左右位置对比</h5>
                <div
                    style="display: flex; gap: 3em; margin-top: 1em; align-items: center;"
                >
                    <div>
                        <div style="margin-bottom: 1em; font-weight: bold;">
                            Fit: None (Left)
                        </div>
                        <kylin-button
                            label="按钮"
                            data-tooltip="适应模式对比"
                            data-tooltip-fit="none"
                            data-tooltip-placement="left"
                            style="height: 60px; width: 80px;"
                        ></kylin-button>
                    </div>

                    <div>
                        <div style="margin-bottom: 1em; font-weight: bold;">
                            Fit: Height (Left)
                        </div>
                        <kylin-button
                            label="按钮"
                            data-tooltip="适应模式对比"
                            data-tooltip-fit="height"
                            data-tooltip-placement="left"
                            style="height: 60px; width: 80px;"
                        ></kylin-button>
                    </div>

                    <div>
                        <div style="margin-bottom: 1em; font-weight: bold;">
                            Fit: Auto (Right)
                        </div>
                        <kylin-button
                            label="按钮"
                            data-tooltip="适应模式对比"
                            data-tooltip-fit="auto"
                            data-tooltip-placement="right"
                            style="height: 60px; width: 80px;"
                        ></kylin-button>
                    </div>
                </div>
            </div>
        </div>
    </tooltip-demo> `,
};

export const ComplexContent: Story = {
    name: "复杂内容适配",
    render: () => html`<tooltip-demo>
        <div style="padding: 2em;">
            <h4>复杂内容的 Fit 适配</h4>

            <div
                style="margin-top: 2em; display: flex; gap: 2em; flex-wrap: wrap;"
            >
                <div>
                    <h5>HTML 内容 - Fit Width</h5>
                    <div style="margin-top: 1em;">
                        <kylin-button
                            label="HTML 内容"
                            data-tooltip="<div style='padding: 8px;'><strong>标题</strong><br/><em>斜体文本</em><br/><span style='color: red;'>红色文本</span></div>"
                            data-tooltip-fit="width"
                            style="width: 200px;"
                        ></kylin-button>
                    </div>
                </div>

                <div>
                    <h5>长文本 - Fit Width</h5>
                    <div style="margin-top: 1em;">
                        <kylin-button
                            label="长文本测试"
                            data-tooltip="这是一个很长的提示内容，用于测试在宽度适应模式下的文本换行效果，看看是否能正确处理长文本的显示"
                            data-tooltip-fit="width"
                            style="width: 180px;"
                        ></kylin-button>
                    </div>
                </div>

                <div>
                    <h5>列表内容 - Fit Auto</h5>
                    <div style="margin-top: 1em;">
                        <kylin-button
                            label="列表内容"
                            data-tooltip="<ul style='margin: 0; padding-left: 20px;'><li>第一项</li><li>第二项</li><li>第三项</li></ul>"
                            data-tooltip-fit="auto"
                            data-tooltip-placement="top"
                            style="width: 150px;"
                        ></kylin-button>
                    </div>
                </div>
            </div>

            <div style="margin-top: 2em;">
                <h5>不同尺寸的目标元素</h5>
                <div
                    style="display: flex; gap: 1em; align-items: center; margin-top: 1em;"
                >
                    <kylin-button
                        label="小按钮"
                        data-tooltip="小按钮的提示"
                        data-tooltip-fit="auto"
                        data-tooltip-placement="right"
                        size="small"
                        style="height: 32px;"
                    ></kylin-button>

                    <kylin-button
                        label="中等按钮"
                        data-tooltip="中等大小按钮的提示内容"
                        data-tooltip-fit="auto"
                        data-tooltip-placement="right"
                        size="medium"
                        style="height: 40px;"
                    ></kylin-button>

                    <kylin-button
                        label="大按钮"
                        data-tooltip="大型按钮的提示内容展示"
                        data-tooltip-fit="auto"
                        data-tooltip-placement="right"
                        size="large"
                        style="height: 48px;"
                    ></kylin-button>
                </div>
            </div>
        </div>
    </tooltip-demo> `,
};
