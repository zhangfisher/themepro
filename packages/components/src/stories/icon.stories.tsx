import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../components/Flex";
import "../components/Icon";
import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";

const icons: string[] = [
    "home",
    "info",
    "close",
    "settings",
    "star",
    "tag",
    "checked",
    "unchecked",
    "yes",
    "no",
    "important",
    "file",
    "folder",
    "folder-open",
    "triangle",
    "save",
    "loading",
    "alert",
    "bell",
    "arrow",
    "error",
    "success",
    "focus",
];

const renderIcon = (args: any) => html`
    <h3>默认自动尺寸: 由var(--auto-icon-size)控制</h3>
    <auto-flex
        wrap
        gap="1em"
        style="border: var(--auto-border);padding:1em;font-size:2em"
    >
        ${repeat(icons, (name) => {
            return html`<auto-icon name=${name}></auto-icon>`;
        })}
    </auto-flex>
    <h3>继承尺寸: 继承容器字体尺寸</h3>
    <auto-flex
        wrap
        gap="1em"
        style="border: var(--auto-border);padding:1em;font-size:2em"
    >
        ${repeat(icons, (name) => {
            return html`<auto-icon inherit name=${name}></auto-icon>`;
        })}
    </auto-flex>
    <h3>指定尺寸: 通过size属性指定</h3>
    <auto-flex
        wrap
        gap="1em"
        style="border: var(--auto-border);padding:1em;font-size:2em"
    >
        ${repeat(icons, (name) => {
            return html`<auto-icon ze="12px" name=${name}></auto-icon>`;
        })}
    </auto-flex>
    <h3>圆形</h3>
    <auto-flex wrap gap="1em" style="border: var(--auto-border);padding:1em;">
        ${repeat(icons, (name) => {
            return html`<auto-icon
                size=${args.size}
                name=${name}
                title="${name}"
                color=${args.color}
                rotate=${args.rotate}
                shape="circle"
                .strokeWidth=${typeof args.strokeWidth === "number"
                    ? args.strokeWidth
                    : undefined}
            ></auto-icon>`;
        })}
    </auto-flex>
    <h3>圆角矩形</h3>
    <auto-flex wrap gap="1em" style="border: var(--auto-border);padding:1em;">
        ${repeat(icons, (name) => {
            return html`<auto-icon
                size=${args.size}
                name=${name}
                title="${name}"
                color=${args.color}
                rotate=${args.rotate}
                shape="round"
                .strokeWidth=${typeof args.strokeWidth === "number"
                    ? args.strokeWidth
                    : undefined}
            ></auto-icon>`;
        })}
    </auto-flex>
`;

const meta = {
    title: "通用/Icon",
    tags: ["autodocs"],
    render: renderIcon,
    argTypes: {
        name: {
            control: "text",
            description: "图标名称，对应 CSS 变量 --auto-icon-{name}",
        },
        shape: {
            control: "select",
            options: ["none", "circle", "r"],
            description: "形状，取值 'none' | 'circle' | 'r'",
        },
        size: {
            control: "text",
            description: "图标尺寸，如 '24px' 或 '1.5em'",
        },
        color: { control: "color", description: "图标颜色" },
        rotate: { control: "number", description: "旋转角度（deg）" },
        strokeWidth: {
            control: "number",
            description: "描边宽度（传递到 CSS 变量 --stroke-width）",
        },
    },
    args: {
        name: "star",
        size: "24px",
        color: undefined,
        rotate: 0,
        strokeWidth: undefined,
    },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = { args: {} };
