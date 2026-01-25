import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./TooltipDemo";
import "../../components/Button/index";

const meta: Meta = {
    title: "控制器/Tooltip",
    tags: ["autodocs"],
    render: () => html`<tooltip-basic-demo></tooltip-basic-demo>`,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "基础提示框功能演示，包括简单的文本提示和基本的悬停交互。",
            },
        },
    },
};
export default meta;
type Story = StoryObj;

export const 自定义样式: Story = {
    name: "自定义样式",
    render: () => html`
        <tooltip-demo>
            <div
                slot="info"
                style="padding: 4px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                <b>元素容器也可以添加提示</b>
                <p>提示信息可以是HTML内容，也可以是其他元素的slot</p>
            </div>
            <div
                style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;flex-direction:column"
            >
                <button
                    data-tooltip="这是一个简单的提示信息"
                    data-tooltip-styles="{.content: 'color:red'}"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    悬停查看提示
                </button>
                <kylin-button
                    data-tooltip="<h3>提示</h3><p>文字也可以有提示<p>"
                    label="HTML弹出内容"
                >
                </kylin-button>
                <kylin-button
                    data-tooltip="slot://info"
                    label="显示使用具名slot"
                >
                </kylin-button>
                <button
                    data-tooltip="selector://.content"
                    data-tooltip-selector=".content"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    查询指定元素内容
                    <div class="content" style="display:none">
                        <h3>默认从当前元素开始查找</h3>
                        可以通过data-tooltip-selector指定查找范围
                    </div>
                </button>
                <button
                    data-tooltip="query://"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    查询指定元素内容
                </button>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "最基础的提示框，只需在元素上添加 `data-tooltip` 属性即可。鼠标悬停时显示提示信息。",
            },
        },
    },
};
