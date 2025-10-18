import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../components/Flex";
import { html } from "lit";

// 通用子项渲染，便于观察布局效果
const Box = (label: string, i: number) => {
    // 用可变的行数与字符数制造不同的固有尺寸（不直接设置宽高）
    const lineCounts = [1, 2, 1, 3, 2, 4, 1, 3];
    const charCounts = [4, 8, 12, 16, 10, 14, 6, 11];
    const lines = lineCounts[i % lineCounts.length];
    const chars = charCounts[i % charCounts.length];
    const text = "█".repeat(chars);
    return html`<div
        style="background:#409eff;color:#fff;padding:8px 12px;border-radius:4px;"
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

const renderFlex = (args: any) => html`
    <auto-flex
        ?wrap=${args.wrap}
        justify=${args.justify}
        direction=${args.direction}
        align=${args.align}
        gap=${args.gap}
        ?equal=${args.equal}
        border=${args.border}
        ?fit=${args.fit}
        ?radius=${args.radius}
        grow=${args.grow}
        shrink=${typeof args.shrink === "number"
            ? String(args.shrink)
            : args.shrink}
        style="width:100%;max-width:960px;padding:12px;"
    >
        ${Boxes(8)}
    </auto-flex>
    <br />
    <auto-flex
        justify=${args.justify}
        direction=${args.direction}
        align=${args.align}
        gap=${args.gap}
        border=${args.border}
        ?fit=${args.fit}
        ?radius=${args.radius}
        grow="last"
        equal
        style="width:100%;max-width:960px;padding:12px;"
    >
        ${Boxes(5)}
    </auto-flex>
`;

const meta = {
    title: "布局/Flex",
    tags: ["autodocs"],
    render: renderFlex,
    argTypes: {
        radius: { control: "boolean", description: "是否显示圆角" },
        wrap: { control: "boolean", description: "是否自动换行" },
        equal: { control: "boolean", description: "是否等高或等宽" },
        border: {
            control: { type: "radio" },
            options: [0, 1, 2],
            description: "边框模式：0无，1外框，2网格",
        },
        justify: {
            control: { type: "select" },
            options: [
                "flex-start",
                "center",
                "flex-end",
                "space-between",
                "space-around",
                "space-evenly",
            ],
            description: "主轴对齐方式",
        },
        direction: {
            control: { type: "select" },
            options: ["row", "row-reverse", "column", "column-reverse"],
            description: "主轴方向",
        },
        align: {
            control: { type: "select" },
            options: [
                "stretch",
                "flex-start",
                "center",
                "flex-end",
                "baseline",
            ],
            description: "交叉轴对齐方式",
        },
        gap: { control: "text", description: "项目间距，如 '8px'" },
        fit: { control: "boolean", description: "充满父容器" },
        grow: {
            control: { type: "text" },
            description:
                "指定哪个子元素 flex-grow:1，可填 'first' | 'last' | CSS 选择器字符串",
        },
        shrink: {
            control: { type: "text" },
            description:
                "指定哪个子元素 flex-shrink:1，可填 'first' | 'last' | CSS 选择器字符串",
        },
    },
    args: {
        wrap: true,
        justify: "center",
        direction: "row",
        align: "center",
        gap: "8px",
        border: 0,
        fit: false,
        grow: undefined,
        shrink: undefined,
        radius: undefined,
    },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// 默认示例
export const Primary: Story = { args: {} };
