import type { Meta, StoryObj } from "@storybook/web-components";
import { fn } from "storybook/test";
import "../../components/Dropdown/index";
import { BaseDropdown } from "./BaseDropdown";
import { CustomAnimation } from "./CustomAnimation";
import { ComplexContent } from "./ComplexContent";
import { PersistentDropdown } from "./PersistentDropdown";
import { ArrowDemo } from "./ArrowDemo";
import { PlacementDemo } from "./PlacementDemo";
import { FitWidthDemo } from "./FitWidthDemo";

const meta: Meta = {
    title: "通用/AutoDropdown",
    component: "auto-dropdown",
    args: {
        label: "按钮",
        type: "default",
        size: "medium",
        shape: undefined,
        loading: false,
        disabled: false,
        block: false,
        icon: undefined,
        variant: undefined,
        labelGrow: undefined,
        checked: undefined,
        open: false,
        fitWidth: false,
        placement: "bottom-start",
        offset: [0, 4],
        persistent: false,
        arrow: false,
        animationDuration: 300,
        animationEasing: "easeOutQuart",
        onClick: fn(),
        onChange: fn(),
        onAutoClick: fn(),
    },
    argTypes: {
        label: { control: "text" },
        checkPos: {
            control: "select",
            options: ["default", "before", "after", "corner"],
        },
        type: {
            control: "select",
            options: [
                "default",
                "primary",
                "info",
                "danger",
                "warning",
                "success",
                "link",
            ],
        },
        size: {
            control: "select",
            options: ["x-small", "small", "medium", "large", "x-large"],
        },
        shape: { control: "select", options: ["circle", "pill", undefined] },
        loading: { control: "boolean" },
        disabled: { control: "boolean" },
        value: { control: "text" },
        checked: { control: "boolean" },
        checkValues: { control: "text" },
        block: { control: "boolean" },
        variant: {
            control: "select",
            options: [undefined, "default", "ghost", "link", "outline"],
        },
        icon: { control: "text" },
        labelGrow: { control: "boolean" },
        open: { control: "boolean", description: "是否显示下拉内容" },
        fitWidth: {
            control: "boolean",
            description: "弹出内容宽度是否匹配触发按钮宽度",
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
            description: "弹出位置偏好",
        },
        offset: {
            control: "object",
            description: "弹出偏移量 [crossAxis, mainAxis]",
        },
        persistent: { control: "boolean", description: "禁止弹出内容自动关闭" },
        arrow: { control: "boolean", description: "是否显示指示箭头" },
        animationDuration: {
            control: "number",
            description: "动画持续时间（毫秒）",
        },
        animationEasing: { control: "text", description: "动画缓动函数" },
    },
} satisfies Meta;

export default meta;

export type Story = StoryObj<typeof meta>;

export const 基础下拉菜单: Story = BaseDropdown;
export const 自定义动画效果: Story = CustomAnimation;
export const 复杂内容示例: Story = ComplexContent;
export const 持久化菜单: Story = PersistentDropdown;
export const 指示箭头演示: Story = ArrowDemo;
export const 弹出方向演示: Story = PlacementDemo;
export const 宽度适配演示: Story = FitWidthDemo;
