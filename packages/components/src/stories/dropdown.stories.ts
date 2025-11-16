import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../components/Dropdown/index";
import { fn } from "storybook/test";

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

type Story = StoryObj<typeof meta>;

export const BaseDropdown: Story = {
    name: "基础下拉菜单",
    render: (args: any) => {
        return html`
            <div
                style="padding: 20px; display: flex; gap: 20px; flex-wrap: wrap;"
            >
                <auto-dropdown
                    label="点击我"
                    type="primary"
                    .open=${args.open}
                    .fitWidth=${args.fitWidth}
                    .placement=${args.placement}
                    .offset=${args.offset}
                    .persistent=${args.persistent}
                    .arrow=${args.arrow}
                    .animationDuration=${args.animationDuration}
                    .animationEasing=${args.animationEasing}
                >
                    <div style="padding: 8px 16px; cursor: pointer; ">
                        选项 1
                    </div>
                    <div style="padding: 8px 16px; cursor: pointer; ">
                        选项 2
                    </div>
                    <div style="padding: 8px 16px; cursor: pointer; ">
                        选项 3
                    </div>
                    <hr
                        style="margin: 4px 0; border: none; border-top: 1px solid #e0e0e0;"
                    />
                    <div style="padding: 8px 16px; cursor: pointer; ">
                        更多选项
                    </div>
                </auto-dropdown>

                <auto-dropdown
                    label="右侧菜单"
                    placement="right-start"
                    type="info"
                >
                    <div
                        class="dropdown"
                        style="padding: 8px 0; min-width: 140px; background: white; border: 1px solid #d9d9d9; border-radius: 6px;"
                    >
                        <div style="padding: 8px 16px; cursor: pointer;">
                            右侧选项 1
                        </div>
                        <div style="padding: 8px 16px; cursor: pointer;">
                            右侧选项 2
                        </div>
                    </div>
                </auto-dropdown>

                <auto-dropdown
                    label="上方菜单自动反转"
                    placement="top"
                    type="warning"
                >
                    <div
                        class="dropdown"
                        style="padding: 8px 0; background: white; border: 1px solid #d9d9d9; border-radius: 6px;"
                    >
                        <div style="padding: 8px 16px; cursor: pointer;">
                            上方选项 1
                        </div>
                        <div style="padding: 8px 16px; cursor: pointer;">
                            上方选项 2
                        </div>
                    </div>
                </auto-dropdown>
            </div>
            <div
                style="padding: 20px; display: flex; gap: 20px; flex-wrap: wrap;"
            >
                <auto-dropdown
                    label="点击我"
                    type="primary"
                    .open=${args.open}
                    .fitWidth=${args.fitWidth}
                    .placement=${args.placement}
                    .offset=${args.offset}
                    .persistent=${args.persistent}
                    .arrow=${args.arrow}
                    .animationDuration=${args.animationDuration}
                    .animationEasing=${args.animationEasing}
                >
                    <div
                        class="dropdown"
                        style="padding: 8px 0; min-width: 160px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                    >
                        <div
                            style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;"
                        >
                            选项 1
                        </div>
                        <div
                            style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;"
                        >
                            选项 2
                        </div>
                        <div
                            style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;"
                        >
                            选项 3
                        </div>
                        <hr
                            style="margin: 4px 0; border: none; border-top: 1px solid #e0e0e0;"
                        />
                        <div
                            style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;"
                        >
                            更多选项
                        </div>
                    </div>
                </auto-dropdown>

                <auto-dropdown
                    label="右侧菜单"
                    placement="right-start"
                    type="info"
                >
                    <div
                        class="dropdown"
                        style="padding: 8px 0; min-width: 140px; background: white; border: 1px solid #d9d9d9; border-radius: 6px;"
                    >
                        <div style="padding: 8px 16px; cursor: pointer;">
                            右侧选项 1
                        </div>
                        <div style="padding: 8px 16px; cursor: pointer;">
                            右侧选项 2
                        </div>
                    </div>
                </auto-dropdown>

                <auto-dropdown label="上方菜单2" placement="top" type="warning">
                    <div
                        class="dropdown"
                        style="padding: 8px 0; background: white; border: 1px solid #d9d9d9; border-radius: 6px;"
                    >
                        <div style="padding: 8px 16px; cursor: pointer;">
                            上方选项 1
                        </div>
                        <div style="padding: 8px 16px; cursor: pointer;">
                            上方选项 2
                        </div>
                    </div>
                </auto-dropdown>
            </div>
        `;
    },
};

export const CustomAnimation: Story = {
    name: "自定义动画效果",
    render: () => {
        return html`
            <div style="padding: 20px;">
                <h3>不同的动画效果</h3>
                <div
                    style="display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap;"
                >
                    <auto-dropdown
                        label="弹性动画"
                        animationDuration="500"
                        animationEasing="easeInOutElastic(1, .5)"
                        type="primary"
                    >
                        <div
                            class="dropdown"
                            style="padding: 12px; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 8px;"
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                ✨ 弹性选项 1
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                ✨ 弹性选项 2
                            </div>
                        </div>
                    </auto-dropdown>

                    <auto-dropdown
                        label="回弹动画"
                        animationDuration="400"
                        animationEasing="easeOutBack(1.7)"
                        type="success"
                    >
                        <div
                            class="dropdown"
                            style="padding: 12px; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 8px;"
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                🎯 回弹选项 1
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                🎯 回弹选项 2
                            </div>
                        </div>
                    </auto-dropdown>

                    <auto-dropdown
                        label="缓慢动画"
                        animationDuration="800"
                        animationEasing="easeInOutQuad"
                        type="warning"
                    >
                        <div
                            class="dropdown"
                            style="padding: 12px; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 8px;"
                        >
                            <div style="padding: 8px 12px; cursor: pointer;">
                                🐌 缓慢选项 1
                            </div>
                            <div style="padding: 8px 12px; cursor: pointer;">
                                🐌 缓慢选项 2
                            </div>
                        </div>
                    </auto-dropdown>
                </div>
            </div>
        `;
    },
};

export const ComplexContent: Story = {
    name: "复杂内容示例",
    render: () => {
        return html`
            <div style="padding: 20px;">
                <h3>包含表单的复杂下拉内容</h3>
                <div style="margin-top: 20px;">
                    <auto-dropdown
                        label="包含表单的复杂下拉内容"
                        placement="bottom-start"
                        fitWidth
                        type="primary"
                        block
                    >
                        <div
                            class="dropdown"
                            style="padding: 20px; min-width: 320px; background: white; border: 1px solid #d9d9d9; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);"
                        >
                            <h4
                                style="margin: 0 0 16px 0; color: #262626; font-size: 16px;"
                            >
                                用户设置
                            </h4>

                            <div style="margin-bottom: 16px;">
                                <label
                                    style="display: block; margin-bottom: 6px; color: #595959; font-size: 14px;"
                                    >用户名:</label
                                >
                                <input
                                    type="text"
                                    value="张三"
                                    style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px;"
                                />
                            </div>

                            <div style="margin-bottom: 16px;">
                                <label
                                    style="display: block; margin-bottom: 6px; color: #595959; font-size: 14px;"
                                    >邮箱:</label
                                >
                                <input
                                    type="email"
                                    value="zhangsan@example.com"
                                    style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px;"
                                />
                            </div>

                            <div style="margin-bottom: 16px;">
                                <label
                                    style="display: block; margin-bottom: 6px; color: #595959; font-size: 14px;"
                                    >主题:</label
                                >
                                <select
                                    style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px;"
                                >
                                    <option>浅色</option>
                                    <option>深色</option>
                                    <option>自动</option>
                                </select>
                            </div>

                            <div
                                style="display: flex; gap: 8px; justify-content: flex-end;"
                            >
                                <button
                                    style="padding: 8px 16px; border: 1px solid #d9d9d9; background: #fff; cursor: pointer; border-radius: 4px; font-size: 14px;"
                                >
                                    取消
                                </button>
                                <button
                                    style="padding: 8px 16px; border: 1px solid #1890ff; background: #1890ff; color: white; cursor: pointer; border-radius: 4px; font-size: 14px;"
                                >
                                    保存
                                </button>
                            </div>
                        </div>
                    </auto-dropdown>
                </div>
            </div>
        `;
    },
};

export const PersistentDropdown: Story = {
    args: {},

    name: "持久化菜单",

    render: () => {
        return html`
            <div style="padding: 20px;">
                <h3>持久化下拉菜单（点击外部不关闭）</h3>
                <p style="color: #666; margin: 10px 0;">
                    需要通过按钮或按ESC键手动关闭
                </p>
                <div style="margin-top: 20px;">
                    <auto-dropdown
                        label="持久化下拉菜单（点击外部不关闭）"
                        persistent
                        type="danger"
                    >
                        <p
                            style="margin: 0 0 16px 0; color: #666; line-height: 1.5;"
                        >
                            这是一个持久化下拉菜单，点击外部区域不会关闭它。您需要手动点击关闭按钮或按ESC键来关闭。
                        </p>
                        <div
                            style="display: flex; gap: 8px; justify-content: flex-end;"
                        >
                            <button
                                style="padding: 8px 16px; border: 1px solid #d9d9d9; background: #fff; cursor: pointer; border-radius: 4px;"
                                onclick="this.dispatchEvent(new CustomEvent('dropdown-close', { bubbles: true, composed: true }))"
                            >
                                手动关闭
                            </button>
                        </div>
                    </auto-dropdown>
                </div>
            </div>
        `;
    },
};

export const ArrowDemo: Story = {
    name: "指示箭头演示",
    render: (args: any) => {
        return html`
            <div style="padding: 20px;">
                <h3>箭头指示器演示</h3>
                <p style="color: #666; margin: 10px 0;">
                    arrow 属性控制是否显示指向触发元素的指示箭头
                </p>

                <div style="margin-top: 30px;">
                    <h4>不同位置的箭头演示</h4>
                    <div
                        style="display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;"
                    >
                        <auto-dropdown
                            label="底部箭头"
                            type="primary"
                            placement="bottom-start"
                            ?arrow=${true}
                        >
                            <div
                                class="dropdown"
                                style="padding: 12px; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                            >
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    📍 底部箭头指向按钮
                                </div>
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    箭头自动定位
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="顶部箭头"
                            type="success"
                            placement="top-start"
                            ?arrow=${true}
                        >
                            <div
                                class="dropdown"
                                style="padding: 12px; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #52c41a;"
                            >
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    🎯 顶部箭头指向按钮
                                </div>
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    智能定位系统
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="右侧箭头"
                            type="warning"
                            placement="right-start"
                            ?arrow=${true}
                        >
                            <div
                                class="dropdown"
                                style="padding: 12px; min-width: 160px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #faad14;"
                            >
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    ➡️ 右侧箭头
                                </div>
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    横向指示
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="左侧箭头"
                            type="info"
                            placement="left-start"
                            ?arrow=${true}
                        >
                            <div
                                class="dropdown"
                                style="padding: 12px; min-width: 160px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                            >
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    ⬅️ 左侧箭头
                                </div>
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    侧向指示
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>

                    <h4>对比演示：有箭头 vs 无箭头</h4>
                    <div
                        style="display: flex; gap: 30px; margin-bottom: 30px; flex-wrap: wrap;"
                    >
                        <div>
                            <p style="font-weight: bold; color: #333; margin-bottom: 10px;">无箭头 (默认)</p>
                            <auto-dropdown label="无箭头菜单" type="default">
                                <div
                                    style="padding: 12px; min-width: 160px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        普通选项 1
                                    </div>
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        普通选项 2
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div>
                            <p style="font-weight: bold; color: #333; margin-bottom: 10px;">有箭头</p>
                            <auto-dropdown label="有箭头菜单" type="default" ?arrow=${true}>
                                <div
                                    style="padding: 12px; min-width: 160px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #d9d9d9;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        指示选项 1
                                    </div>
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        指示选项 2
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>

                    <h4>箭头颜色自定义</h4>
                    <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
                        通过 CSS 变量 --popup-arrow-bg 自定义箭头颜色
                    </p>
                    <div
                        style="display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;"
                    >
                        <auto-dropdown
                            label="蓝色箭头"
                            type="primary"
                            ?arrow=${true}
                        >
                            <div
                                class="dropdown"
                                style="padding: 12px; min-width: 140px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                            >
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    蓝色主题
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="绿色箭头"
                            type="success"
                            ?arrow=${true}
                        >
                            <div
                                class="dropdown"
                                style="padding: 12px; min-width: 140px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #52c41a;"
                            >
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    绿色主题
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="橙色箭头"
                            type="warning"
                            ?arrow=${true}
                        >
                            <div
                                class="dropdown"
                                style="padding: 12px; min-width: 140px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #faad14;"
                            >
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    橙色主题
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="红色箭头"
                            type="danger"
                            ?arrow=${true}
                        >
                            <div
                                class="dropdown"
                                style="padding: 12px; min-width: 140px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #ff4d4f;"
                            >
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    红色主题
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>

                    <h4>配合其他功能使用</h4>
                    <div
                        style="display: flex; gap: 20px; flex-direction: column; max-width: 400px;"
                    >
                        <auto-dropdown
                            label="箭头 + fitWidth"
                            type="primary"
                            ?arrow=${true}
                            fitWidth
                        >
                            <div
                                style="padding: 16px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                            >
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    🎯 fitWidth + 箭头
                                </div>
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    宽度匹配按钮
                                </div>
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    智能箭头定位
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="箭头 + 自定义动画"
                            type="success"
                            ?arrow=${true}
                            animationDuration="500"
                            animationEasing="easeOutBack(1.7)"
                        >
                            <div
                                style="padding: 16px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #52c41a;"
                            >
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    ✨ 自定义动画效果
                                </div>
                                <div style="padding: 8px 12px; cursor: pointer;">
                                    箭头参与动画
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>
                </div>
            </div>
        `;
    },
};

export const PlacementDemo: Story = {
    name: "弹出方向演示",
    render: (args: any) => {
        return html`
            <div style="padding: 20px;">
                <h3>placement 属性演示</h3>
                <p style="color: #666; margin: 10px 0;">
                    placement 属性控制弹出内容相对于触发元素的方向和位置
                </p>

                <div style="margin-top: 30px;">
                    <h4>基础方向演示</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;"
                    >
                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">top</p>
                            <auto-dropdown
                                label="顶部弹出"
                                type="primary"
                                placement="top"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        🎯 顶部内容
                                    </div>
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        第二选项
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">bottom</p>
                            <auto-dropdown
                                label="底部弹出"
                                type="success"
                                placement="bottom"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #52c41a;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        ⬇️ 底部内容
                                    </div>
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        第二选项
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">left</p>
                            <auto-dropdown
                                label="左侧弹出"
                                type="warning"
                                placement="left"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #faad14;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        ⬅️ 左侧内容
                                    </div>
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        第二选项
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">right</p>
                            <auto-dropdown
                                label="右侧弹出"
                                type="info"
                                placement="right"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        ➡️ 右侧内容
                                    </div>
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        第二选项
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>

                    <h4>对齐方向演示</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;"
                    >
                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">top-start</p>
                            <auto-dropdown
                                label="左上角"
                                type="primary"
                                placement="top-start"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        📍 左上角对齐
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">top-end</p>
                            <auto-dropdown
                                label="右上角"
                                type="success"
                                placement="top-end"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #52c41a;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        🎯 右上角对齐
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">bottom-start</p>
                            <auto-dropdown
                                label="左下角"
                                type="warning"
                                placement="bottom-start"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #faad14;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        ⬇️ 左下角对齐
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">bottom-end</p>
                            <auto-dropdown
                                label="右下角"
                                type="info"
                                placement="bottom-end"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        ➡️ 右下角对齐
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">left-start</p>
                            <auto-dropdown
                                label="左上角"
                                type="danger"
                                placement="left-start"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #ff4d4f;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        ⬅️ 左上角对齐
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">left-end</p>
                            <auto-dropdown
                                label="左下角"
                                type="primary"
                                placement="left-end"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        ⬅️ 左下角对齐
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">right-start</p>
                            <auto-dropdown
                                label="右上角"
                                type="success"
                                placement="right-start"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #52c41a;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        ➡️ 右上角对齐
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">right-end</p>
                            <auto-dropdown
                                label="右下角"
                                type="warning"
                                placement="right-end"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 120px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #faad14;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        ➡️ 右下角对齐
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>

                    <h4>配合动画演示</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                        <div>
                            <p style="margin-bottom: 10px; font-weight: 500;">快速弹跳</p>
                            <auto-dropdown
                                label="快速弹跳"
                                type="primary"
                                placement="top"
                                animationDuration="200"
                                animationEasing="easeOutBack"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 100px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        ⚡ 快速弹出
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div>
                            <p style="margin-bottom: 10px; font-weight: 500;">缓动效果</p>
                            <auto-dropdown
                                label="缓动弹出"
                                type="success"
                                placement="bottom"
                                animationDuration="600"
                                animationEasing="easeInOutQuint"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 100px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #52c41a;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        🌊 缓慢弹出
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div>
                            <p style="margin-bottom: 10px; font-weight: 500;">弹性动画</p>
                            <auto-dropdown
                                label="弹性弹出"
                                type="warning"
                                placement="left"
                                animationDuration="500"
                                animationEasing="easeOutElastic(1, .5)"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 100px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #faad14;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        🎈 弹性效果
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div>
                            <p style="margin-bottom: 10px; font-weight: 500;">回弹动画</p>
                            <auto-dropdown
                                label="回弹弹出"
                                type="info"
                                placement="right"
                                animationDuration="400"
                                animationEasing="easeOutBack(1.7)"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 12px; min-width: 100px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                                >
                                    <div style="padding: 8px 12px; cursor: pointer;">
                                        🔄 回弹效果
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>

                    <h4>复杂布局演示</h4>
                    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">内容丰富的下拉菜单</p>
                            <auto-dropdown
                                label="复杂菜单"
                                type="primary"
                                placement="bottom-start"
                                fitWidth
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 16px; background: white; border: 1px solid #d9d9d9; border-radius: 8px; box-shadow: 0 6px 16px rgba(0,0,0,0.1); --popup-arrow-bg: #ffffff; --popup-arrow-border: #1890ff;"
                                >
                                    <h4 style="margin: 0 0 12px 0; color: #262626;">菜单标题</h4>
                                    <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;">
                                        📄 用户管理
                                    </div>
                                    <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;">
                                        ⚙️ 系统设置
                                    </div>
                                    <hr style="margin: 8px 0; border: none; border-top: 1px solid #f0f0f0;">
                                    <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;">
                                        📊 数据报表
                                    </div>
                                    <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;">
                                        🔒 退出登录
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div style="text-align: center;">
                            <p style="margin-bottom: 10px; font-weight: 500;">侧边导航式菜单</p>
                            <auto-dropdown
                                label="侧边菜单"
                                type="success"
                                placement="right-start"
                                ?arrow=${true}
                            >
                                <div
                                    style="padding: 0; background: white; border: 1px solid #d9d9d9; border-radius: 8px; box-shadow: 0 6px 16px rgba(0,0,0,0.1); --popup-arrow-bg: #ffffff; --popup-arrow-border: #52c41a;"
                                >
                                    <div style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0;">
                                        🏠 首页
                                    </div>
                                    <div style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0;">
                                        📧 个人中心
                                    </div>
                                    <div style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0;">
                                        📧 消息中心
                                        <span style="background: #ff4d4f; color: white; padding: 2px 8px; border-radius: 12px; margin-left: 8px;">3</span>
                                    </div>
                                    <div style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0;">
                                        🔔 通知设置
                                    </div>
                                    <div style="padding: 12px 16px; cursor: pointer;">
                                        ⚙️ 系统管理
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};

export const FitWidthDemo: Story = {
    name: "宽度适配演示",
    render: () => {
        return html`
            <div style="padding: 20px;">
                <h3>fitWidth 属性演示</h3>
                <p style="color: #666; margin: 10px 0;">
                    fitWidth 属性控制下拉内容宽度是否匹配触发按钮的宽度
                </p>

                <div style="margin-top: 30px;">
                    <h4>不使用 fitWidth (默认行为)</h4>
                    <p
                        style="color: #666; font-size: 14px; margin-bottom: 15px;"
                    >
                        下拉内容使用内容的自然宽度（min-width 或内容宽度）
                    </p>
                    <div
                        style="display: flex; gap: 20px; margin-bottom: 40px; flex-wrap: wrap;"
                    >
                        <auto-dropdown label="短按钮" type="primary">
                            <div
                                style="padding: 12px; min-width: 200px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    这是一个较长的选项内容
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    另一个长内容选项
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    短选项
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="这是一个很长的按钮文本"
                            type="success"
                        >
                            <div
                                style="padding: 12px; min-width: 180px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 1
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 2
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 3
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>

                    <h4>使用 fitWidth="true"</h4>
                    <p
                        style="color: #666; font-size: 14px; margin-bottom: 15px;"
                    >
                        下拉内容宽度强制匹配触发按钮的宽度
                    </p>
                    <div
                        style="display: flex; gap: 20px; margin-bottom: 40px; flex-wrap: wrap;"
                    >
                        <auto-dropdown label="短按钮" type="primary" fitWidth>
                            <div
                                style="padding: 12px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    这是一个较长的选项内容
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    另一个长内容选项
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    短选项
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="这是一个很长的按钮文本"
                            type="success"
                            fitWidth
                        >
                            <div
                                style="padding: 12px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 1
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 2
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    选项 3
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>

                    <h4>对比演示</h4>
                    <p
                        style="color: #666; font-size: 14px; margin-bottom: 15px;"
                    >
                        相同内容，不同 fitWidth 设置的对比效果
                    </p>
                    <div
                        style="display: flex; gap: 20px; flex-direction: column; max-width: 500px;"
                    >
                        <auto-dropdown
                            label="fitWidth=false (默认)"
                            type="warning"
                        >
                            <div
                                style="padding: 12px; min-width: 250px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    这是一个具有相当长度内容的菜单项
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    另一个很长的菜单内容示例
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    短
                                </div>
                            </div>
                        </auto-dropdown>

                        <auto-dropdown
                            label="fitWidth=true"
                            type="info"
                            fitWidth
                        >
                            <div
                                style="padding: 12px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    这是一个具有相当长度内容的菜单项
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    另一个很长的菜单内容示例
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer;"
                                >
                                    短
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>

                    <h4>在表单中的应用示例</h4>
                    <div style="margin-top: 30px; max-width: 400px;">
                        <auto-dropdown
                            label="选择用户角色"
                            type="primary"
                            fitWidth
                            block
                        >
                            <div
                                style="padding: 16px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                            >
                                <div
                                    style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
                                >
                                    <strong>系统管理员</strong>
                                    <div
                                        style="font-size: 12px; color: #666; margin-top: 2px;"
                                    >
                                        拥有所有系统权限
                                    </div>
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
                                >
                                    <strong>普通用户</strong>
                                    <div
                                        style="font-size: 12px; color: #666; margin-top: 2px;"
                                    >
                                        基础使用权限
                                    </div>
                                </div>
                                <div
                                    style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
                                >
                                    <strong>访客</strong>
                                    <div
                                        style="font-size: 12px; color: #666; margin-top: 2px;"
                                    >
                                        只读权限
                                    </div>
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>
                </div>
            </div>
        `;
    },
};
