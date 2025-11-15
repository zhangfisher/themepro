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
