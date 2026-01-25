import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../components/Flex";
import { html, LitElement } from "lit";
import { ClickRipple } from "@/controllers/clickRipple";
import { customElement } from "lit/decorators.js";

// 通用子项渲染，便于观察布局效果
const Box = (label: string, i: number) => {
    // 用可变的行数与字符数制造不同的固有尺寸（不直接设置宽高）
    const lineCounts = [1, 2, 1, 3, 2, 4, 1, 3];
    const charCounts = [4, 8, 12, 16, 10, 14, 6, 11];
    const lines = lineCounts[i % lineCounts.length];
    const chars = charCounts[i % charCounts.length];
    const text = "█".repeat(chars);
    return html`<div
        class="box"
        style="background:#409eff;color:#fff;padding:8px 12px;border-radius:4px;margin:1em"
    >
        <div>${label} ${text}</div>
        ${Array.from(
            { length: Math.max(0, lines - 1) },
            () => html`<div>${text}</div>`
        )}
    </div>`;
};
const Boxes = (count = 6) => html`
    ${Array.from({ length: count }, (_, i) => Box(String(i + 1), i))}
`;

const meta = {
    title: "控制器/ClickRipple",
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

@customElement("auto-demo-box")
class BoxComponent extends LitElement {
    static styles = [ClickRipple.styles];
    ripple = new ClickRipple(this);
    render() {
        return html`
            <kylin-flex
                style="width:100%;height:100px;border:var(--auto-border);"
            >
                单击涟漪动画
            </kylin-flex>
        `;
    }
}

export const DefaultStory: Story = {
    name: "标准用法",
    render: () => {
        return html`<auto-demo-box></auto-demo-box>`;
    },
};
