import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../components/Loading/index";

const meta: Meta = {
    title: "通用/AutoLoading",
    args: {
        size: undefined,
        tips: undefined,
        color: undefined,
        direction: "column",
        fit: false,
        mask: false,
        type: undefined,
    },
    argTypes: {
        size: {
            control: "select",
            options: ["x-small", "small", "medium", "large", "x-large"],
        },
        tips: { control: "text" },
        color: { control: "color" },
        direction: {
            control: "select",
            options: ["row", "column"],
        },
        fit: { control: "boolean" },
        mask: { control: "boolean" },
        type: {
            control: "select",
            options: [
                "balls",
                "bars",
                "bubbles",
                "cubes",
                "cylon",
                "spin",
                "spinning-bubbles",
                "spokes",
            ],
        },
    },
    render: (args: any) => html`
        <auto-loading
            size=${ifDefined(args.size)}
            message=${ifDefined(args.tips)}
            color=${ifDefined(args.color)}
            direction=${ifDefined(args.direction)}
            ?fit=${args.fit}
            ?mask=${args.mask}
            type=${ifDefined(args.type)}
        ></auto-loading>
    `,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "默认加载",
};

export const LoadingSizes: Story = {
    name: "不同尺寸",
    render: () => {
        return html`
            <auto-flex gap="1em" align="center">
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading message="默认"></auto-loading>
                </auto-flex>
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading size="8px" message="微小"></auto-loading>
                </auto-flex>
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading size="12px" message="小"></auto-loading>
                </auto-flex>
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading size="16px" message="默认"></auto-loading>
                </auto-flex>
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading size="24px" message="大"></auto-loading>
                </auto-flex>
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading size="32px" message="超大"></auto-loading>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LoadingWithTips: Story = {
    name: "带提示文字",
    render: () => {
        return html`
            <auto-flex direction="column" gap="1.5em" align="center">
                <auto-loading size="small" message="加载中..."></auto-loading>
                <auto-loading
                    size="medium"
                    message="正在处理您的请求"
                ></auto-loading>
                <auto-loading
                    size="large"
                    message="请稍候，系统正在加载资源"
                ></auto-loading>
            </auto-flex>
        `;
    },
};

export const LoadingWithColors: Story = {
    name: "自定义颜色",
    render: () => {
        return html`
            <auto-flex gap="1.5em" align="center">
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading
                        color="#1890ff"
                        message="主要颜色"
                    ></auto-loading>
                </auto-flex>
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading
                        color="#52c41a"
                        message="成功颜色"
                    ></auto-loading>
                </auto-flex>
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading
                        color="#faad14"
                        message="警告颜色"
                    ></auto-loading>
                </auto-flex>
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading
                        color="#f5222d"
                        message="错误颜色"
                    ></auto-loading>
                </auto-flex>
                <auto-flex direction="column" align="center" gap="0.5em">
                    <auto-loading color="#722ed1" message="紫色"></auto-loading>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LoadingInContext: Story = {
    name: "实际应用场景",
    render: () => {
        return html`
            <auto-card title="数据加载示例" style="width: 400px;">
                <auto-flex direction="column" gap="1em">
                    <auto-flex justify="space-between" align="center">
                        <auto-loading
                            size="small"
                            message="加载中"
                        ></auto-loading>
                    </auto-flex>

                    <auto-divider></auto-divider>

                    <auto-flex justify="space-between" align="center">
                        <auto-loading
                            size="medium"
                            message="上传中..."
                        ></auto-loading>
                    </auto-flex>

                    <auto-divider></auto-divider>

                    <auto-flex justify="space-between" align="center">
                        <auto-loading
                            size="large"
                            color="#1890ff"
                            message="同步数据中..."
                        ></auto-loading>
                    </auto-flex>
                </auto-flex>
            </auto-card>
        `;
    },
};

export const LoadingVariants: Story = {
    name: "加载变体",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em">
                <auto-flex gap="2em" align="center">
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading></auto-loading>
                    </auto-flex>
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            size="medium"
                            message="请稍候..."
                        ></auto-loading>
                    </auto-flex>
                </auto-flex>

                <auto-flex gap="2em" align="center">
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            color="#1890ff"
                            size="large"
                            message="处理中..."
                        ></auto-loading>
                    </auto-flex>
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            color="#f5222d"
                            size="small"
                            message="错误重试"
                        ></auto-loading>
                    </auto-flex>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LoadingDirections: Story = {
    name: "布局方向",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em">
                <auto-flex gap="2em" align="center">
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            direction="column"
                            size="medium"
                            message="垂直布局"
                            color="#1890ff"
                        ></auto-loading>
                        <auto-text>垂直布局</auto-text>
                    </auto-flex>
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            direction="row"
                            size="medium"
                            message="水平布局"
                            color="#52c41a"
                        ></auto-loading>
                        <auto-text>水平布局</auto-text>
                    </auto-flex>
                </auto-flex>

                <auto-flex gap="2em" align="center">
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            direction="column"
                            size="small"
                            message="垂直加载中..."
                            color="#faad14"
                        ></auto-loading>
                        <auto-text>垂直小尺寸</auto-text>
                    </auto-flex>
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            direction="row"
                            size="small"
                            message="水平加载中..."
                            color="#f5222d"
                        ></auto-loading>
                        <auto-text>水平小尺寸</auto-text>
                    </auto-flex>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LoadingFit: Story = {
    name: "充满容器",
    render: () => {
        return html`
            <auto-flex
                direction="column"
                gap="1.5em"
                style="width: 500px;    width: 100%;"
            >
                <auto-card
                    title="垂直充满"
                    style="height: 200px;border:1px solid #ccc;width: 100%;"
                >
                    <auto-loading
                        fit
                        direction="column"
                        size="large"
                        message="垂直居中加载..."
                        color="#1890ff"
                    ></auto-loading>
                </auto-card>

                <auto-card
                    title="水平充满"
                    style="height: 200px;border:1px solid #ccc;width: 100%;"
                >
                    <auto-loading
                        fit
                        direction="row"
                        size="large"
                        message="水平居中加载..."
                        color="#52c41a"
                    ></auto-loading>
                </auto-card>

                <auto-card
                    title="表单加载"
                    style="height: 300px;border:1px solid #ccc;width: 100%;"
                >
                    <auto-loading
                        fit
                        direction="column"
                        size="x-large"
                        message="表单提交中，请稍候..."
                        color="#722ed1"
                    ></auto-loading>
                </auto-card>
            </auto-flex>
        `;
    },
};

export const LoadingTextOverflow: Story = {
    name: "文本截断",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em">
                <auto-text>文本最多显示2行，超过显示省略号：</auto-text>

                <auto-flex gap="2em" align="center">
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            direction="column"
                            size="medium"
                            message="短文本"
                            color="#1890ff"
                        ></auto-loading>
                        <auto-text>短文本</auto-text>
                    </auto-flex>
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            direction="column"
                            size="medium"
                            message="这是一段中等长度的文本内容示例"
                            color="#52c41a"
                        ></auto-loading>
                        <auto-text>中等长度文本</auto-text>
                    </auto-flex>
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            direction="column"
                            size="medium"
                            message="这是一段非常长的文本内容，用来测试文本截断功能，当文本超过两行时会显示省略号，这样可以保持界面整洁"
                            color="#faad14"
                        ></auto-loading>
                        <auto-text>长文本截断</auto-text>
                    </auto-flex>
                </auto-flex>

                <auto-flex gap="2em" align="center">
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            direction="row"
                            size="medium"
                            message="短文本"
                            color="#1890ff"
                        ></auto-loading>
                        <auto-text>水平短文本</auto-text>
                    </auto-flex>
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            direction="row"
                            size="medium"
                            message="这是一段中等长度的水平文本示例"
                            color="#52c41a"
                        ></auto-loading>
                        <auto-text>水平中等长度</auto-text>
                    </auto-flex>
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            direction="row"
                            size="medium"
                            message="这是一段非常长的水平文本内容，用来测试水平布局下的文本截断功能效果"
                            color="#faad14"
                        ></auto-loading>
                        <auto-text>水平长文本</auto-text>
                    </auto-flex>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LoadingMask: Story = {
    name: "遮盖模式",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em">
                <auto-text>遮盖模式示例：</auto-text>

                <auto-flex gap="2em">
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-text>普通模式</auto-text>
                        <div
                            style="width: 200px; height: 150px; border: 1px solid #ccc; position: relative; padding: 1em;"
                        >
                            <auto-text size="small"
                                >这是一些背景内容，用于对比遮盖效果</auto-text
                            >
                            <auto-loading
                                direction="column"
                                size="medium"
                                message="普通加载"
                                color="#1890ff"
                            ></auto-loading>
                        </div>
                    </auto-flex>

                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-text>遮盖模式</auto-text>
                        <div
                            style="width: 200px; height: 150px; border: 1px solid #ccc; position: relative; padding: 1em;"
                        >
                            <auto-text size="small"
                                >这是一些背景内容，用于对比遮盖效果</auto-text
                            >
                            <auto-loading
                                mask
                                direction="column"
                                size="medium"
                                message="遮盖加载"
                                color="#1890ff"
                            ></auto-loading>
                        </div>
                    </auto-flex>
                </auto-flex>

                <auto-flex gap="2em">
                    <auto-card
                        title="无遮盖 - 表单加载"
                        style="width: 300px; height: 200px;"
                    >
                        <auto-flex direction="column" gap="1em">
                            <auto-text>用户名：</auto-text>
                            <auto-text>密码：</auto-text>
                            <auto-text>邮箱：</auto-text>
                        </auto-flex>
                        <auto-loading
                            fit
                            direction="column"
                            size="large"
                            message="正在提交表单..."
                            color="#52c41a"
                        ></auto-loading>
                    </auto-card>

                    <auto-card
                        title="有遮盖 - 表单加载"
                        style="width: 300px; height: 200px;"
                    >
                        <auto-flex direction="column" gap="1em">
                            <auto-text>用户名：</auto-text>
                            <auto-text>密码：</auto-text>
                            <auto-text>邮箱：</auto-text>
                        </auto-flex>
                        <auto-loading
                            fit
                            mask
                            direction="column"
                            size="large"
                            message="正在提交表单..."
                            color="#52c41a"
                        ></auto-loading>
                    </auto-card>
                </auto-flex>

                <auto-card
                    title="数据表格 - 遮盖加载"
                    style="width: 600px; height: 300px;"
                >
                    <auto-flex direction="column" gap="1em">
                        <auto-flex gap="2em">
                            <auto-text>列1</auto-text>
                            <auto-text>列2</auto-text>
                            <auto-text>列3</auto-text>
                            <auto-text>列4</auto-text>
                        </auto-flex>
                        <auto-divider></auto-divider>
                        <auto-flex direction="column" gap="0.5em">
                            <auto-text>数据行1</auto-text>
                            <auto-text>数据行2</auto-text>
                            <auto-text>数据行3</auto-text>
                        </auto-flex>
                    </auto-flex>
                    <auto-loading
                        fit
                        mask
                        direction="column"
                        size="x-large"
                        message="正在加载数据，请稍候..."
                        color="#1890ff"
                    ></auto-loading>
                </auto-card>
            </auto-flex>
        `;
    },
};

export const LoadingTypes: Story = {
    name: "加载图标类型",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em">
                <auto-flex gap="2em" align="center" ?wrap=${true}>
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            size="32px"
                            message="小球"
                            color="#eb2f96"
                        ></auto-loading>
                    </auto-flex>
                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            type="bars"
                            size="medium"
                            message="条形"
                            color="#52c41a"
                        ></auto-loading>
                    </auto-flex>

                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            type="bubbles"
                            size="medium"
                            message="气泡"
                            color="#faad14"
                        ></auto-loading>
                    </auto-flex>

                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            type="spin"
                            size="medium"
                            message="旋转"
                            color="#13c2c2"
                        ></auto-loading>
                    </auto-flex>

                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            type="spinning-bubbles"
                            size="medium"
                            message="旋转气泡"
                            color="#eb2f96"
                        ></auto-loading>
                    </auto-flex>

                    <auto-flex direction="column" align="center" gap="0.5em">
                        <auto-loading
                            type="spokes"
                            size="medium"
                            message="辐射"
                            color="#595959"
                        ></auto-loading>
                    </auto-flex>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LoadingAdvanced: Story = {
    name: "高级应用",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em">
                <auto-card
                    title="数据表格加载"
                    style="width: 600px; height: 300px;border:1px solid #ccc"
                >
                    <auto-loading
                        fit
                        type="spinning-bubbles"
                        direction="column"
                        size="large"
                        message="正在加载数据..."
                        color="#1890ff"
                    ></auto-loading>
                </auto-card>

                <auto-flex gap="2em">
                    <auto-card
                        title="按钮加载"
                        style="width: 200px; height: 60px;border:1px solid #ccc"
                    >
                        <auto-loading
                            fit
                            type="bars"
                            direction="row"
                            size="medium"
                            message="提交中..."
                            color="#52c41a"
                        ></auto-loading>
                    </auto-card>

                    <auto-card
                        title="弹窗加载"
                        style="width: 200px; height: 150px;border:1px solid #ccc"
                    >
                        <auto-loading
                            fit
                            type="spin"
                            direction="column"
                            size="medium"
                            message="处理请求..."
                            color="#f5222d"
                        ></auto-loading>
                    </auto-card>
                </auto-flex>
            </auto-flex>
        `;
    },
};
