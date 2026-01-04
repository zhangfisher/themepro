import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./WebComponentDemo";

const meta: Meta = {
    title: "控制器/Tooltip/Web Component 集成示例",
    tags: ["autodocs"],
    render: () => html`<webcomponent-demo></webcomponent-demo>`,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "演示如何在自定义的 Web Component 中集成 TooltipController。这个示例展示了一个独立的 Web Component 如何使用 TooltipController 为其子元素添加提示功能。",
            },
        },
    },
};
export default meta;
type Story = StoryObj;

export const 基础WebComponent集成: Story = {
    name: "基础 Web Component 集成",
    render: () => html` <webcomponent-demo></webcomponent-demo> `,
    parameters: {
        docs: {
            description: {
                story: "展示了一个完整的 Web Component 组件如何集成 TooltipController。组件内部的按钮元素通过添加 `data-tooltip` 属性即可自动获得提示功能，无需额外的 JavaScript 代码。",
            },
        },
    },
};

export const 多个WebComponent实例: Story = {
    name: "多个 Web Component 实例",
    render: () => html`
        <div style="display: flex; gap: 40px; padding: 20px; flex-wrap: wrap;">
            <webcomponent-demo></webcomponent-demo>
            <webcomponent-demo></webcomponent-demo>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: "展示了可以在同一个页面中使用多个 Web Component 实例。每个实例都有自己独立的 TooltipController，不会相互干扰。",
            },
        },
    },
};

export const 嵌套WebComponent: Story = {
    name: "嵌套 Web Component",
    render: () => html`
        <div style="padding: 40px;">
            <h4 style="margin-bottom: 20px;">
                外部容器 - 鼠标悬停查看外部提示
            </h4>
            <div
                data-tooltip="这是外部容器的提示"
                style="
                    border: 2px dashed #ccc;
                    padding: 30px;
                    border-radius: 8px;
                    background: #f9f9f9;
                "
            >
                <webcomponent-demo></webcomponent-demo>
            </div>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: "展示了 Web Component 的嵌套使用。外层容器和内部组件都可以独立使用 Tooltip 功能，互不影响。这得益于 TooltipController 的事件委托机制和冒泡处理。",
            },
        },
    },
};
