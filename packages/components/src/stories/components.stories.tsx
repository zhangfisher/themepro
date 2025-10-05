import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit"; // 导入 html 函数

const meta: Meta = {
    title: "组件",
    render: (args) => {
        return html`<div>args.label</div>`;
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
    args: {
        primary: true,
        label: "切换主题色",
    },
};
