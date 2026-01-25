import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './TooltipDemo'
import '../../components/Button/index'

const meta: Meta = {
    title: '控制器/Tooltip',
    tags: ['autodocs'],
    render: () => html`<tooltip-basic-demo></tooltip-basic-demo>`,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                story: '基础提示框功能演示，包括简单的文本提示和基本的悬停交互。',
            },
        },
    },
}
export default meta
type Story = StoryObj

export const 默认提示框: Story = {
    name: '默认提示框',
    render: () => html` 
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
                        data-tooltip="query://.content"
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
                        没有内容
                    </button>
                </div> 
    `,
    parameters: {
        docs: {
            description: {
                story: '最基础的提示框，只需在元素上添加 `data-tooltip` 属性即可。鼠标悬停时显示提示信息。',
            },
        },
    },
}

export const 带箭头的提示框: Story = {
    name: '带箭头的提示框',
    render: () => html`
        <tooltip-demo>
            <div
                style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;"
            >
                <button
                    data-tooltip="带箭头的提示框"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    上方箭头提示
                </button>

                <button
                    data-tooltip="底部箭头提示"
                    data-tooltip-placement="bottom"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    下方箭头提示
                </button>

                <button
                    data-tooltip="左侧箭头提示"
                    data-tooltip-placement="left"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    左侧箭头提示
                </button>

                <button
                    data-tooltip="右侧箭头提示"
                    data-tooltip-placement="right"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    右侧箭头提示
                </button>
            </div></tooltip-demo
        >
    `,
    parameters: {
        docs: {
            description: {
                story: '通过 `data-tooltip-arrow="true"` 属性启用箭头指示器，让提示框的指向更加明确。',
            },
        },
    },
}

export const 延迟隐藏提示框: Story = {
    name: '延迟自动隐藏',
    render: () => html`<tooltip-demo>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <button
                data-tooltip="延迟1秒后隐藏"
                data-tooltip-trigger="click"
                data-tooltip-delay-hide="1000"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                1秒延迟
            </button>

            <button
                data-tooltip="延迟3秒后隐藏"
                data-tooltip-delay-hide="3000"
                data-tooltip-trigger="click"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                3秒延迟
            </button>

            <button
                data-tooltip="延迟5秒后自动消失"
                data-tooltip-delay-hide="5000"
                data-tooltip-trigger="click"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                5秒延迟
            </button>
        </div></tooltip-demo>
    </tooltip-demo> `,
    parameters: {
        docs: {
            description: {
                story: '使用 `data-tooltip-delay-hide` 属性设置提示框在鼠标离开后延迟隐藏的时间（毫秒），方便用户阅读较长的提示信息。',
            },
        },
    },
}
