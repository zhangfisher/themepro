import type { Meta, StoryObj } from "@storybook/web-components";
import "../../components/Dropdown/index";
import "./NestedDropdownTest";
import { BaseDropdown } from "./BaseDropdown";
import { CustomAnimation } from "./CustomAnimation";
import { ComplexContent } from "./ComplexContent";
import { PersistentDropdown } from "./PersistentDropdown";
import { ArrowDemo } from "./ArrowDemo";
import { PlacementDemo } from "./PlacementDemo";
import { FitWidthDemo } from "./FitWidthDemo";
import { MouseOverDropdown } from "./MouseOverDropdown";
import { HotshopPopup } from "./HotshopPopup";
import { RefReferenceDemo } from "./RefReferenceDemo";
import { OpenControlDemo } from "./OpenControlDemo";
import { CaretDemo } from "./CaretDemo";
import { NestedDropdownDemo } from "./NestedDropdownTest";
import { fn } from "storybook/internal/test";

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
        caret: "auto",
        popupOptions: {
            fitWidth: false,
            placement: "bottom-start",
            offset: [0, 4],
            persistent: false,
            arrow: false,
            animationDuration: 300,
            animationEasing: "easeOutQuart",
        },
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
        popupOptions: {
            control: "object",
            description: "弹出层配置选项，包含所有弹出相关的配置",
        },
        "popupOptions.ref": {
            control: "text",
            description:
                "弹出层位置基准元素选择器，指定后弹出层将相对于该元素定位而不是触发按钮",
        },
        caret: {
            control: { type: "select" },
            options: [
                "none",
                "auto",
                "before",
                "after",
                "top",
                "bottom",
                "left",
                "right",
            ],
            description: "指示箭头显示模式",
            table: {
                defaultValue: { summary: "auto" },
                type: {
                    summary:
                        "none | auto | before | after | top | bottom | left | right",
                },
            },
        },
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
export const 悬停显示触发: Story = MouseOverDropdown;
export const 热点元素弹出: Story = HotshopPopup;
export const 弹出基准元素: Story = RefReferenceDemo;
export const 属性控制弹出: Story = OpenControlDemo;
export const 方向箭头演示: Story = CaretDemo;
export const 嵌套组件弹出: Story = NestedDropdownDemo;
