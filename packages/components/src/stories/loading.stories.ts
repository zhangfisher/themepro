import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../components/Loading/index";
import "../components/Watermark/index";

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
        mask: { control: "text" },
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
            maskColor="${args.mask}"
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
            <auto-flex gap="2em" align="center" style="padding:2em">
                <auto-loading
                    inline
                    direction="row"
                    message="默认"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="8px"
                    message="微小"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="12px"
                    message="小"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="16px"
                    message="默认"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="24px"
                    message="大"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="32px"
                    message="超大"
                ></auto-loading>
            </auto-flex>
            <auto-flex gap="2em" align="center" style="padding:2em">
                <auto-loading
                    inline
                    direction="row"
                    size="x-small"
                    message="X-Small"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="small"
                    message="Small"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="medium"
                    message="Medium"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="large"
                    message="Large"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="x-large"
                    message="X-Large"
                ></auto-loading>
            </auto-flex>
        `;
    },
};

export const LoadingWithTips: Story = {
    name: "带提示文字",
    render: () => {
        return html`
            <auto-flex direction="column" gap="1.5em" align="center">
                <auto-loading
                    inline
                    direction="row"
                    size="x-small"
                    message="加载中..."
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="small"
                    message="加载中..."
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="medium"
                    message="正在处理您的请求"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="large"
                    message="请稍候，系统正在加载资源"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    size="x-large"
                    message="加载中..."
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
                <auto-loading
                    inline
                    color="#1890ff"
                    message="主要颜色"
                ></auto-loading>
                <auto-loading
                    inline
                    color="#52c41a"
                    message="成功颜色"
                ></auto-loading>
                <auto-loading
                    inline
                    color="#faad14"
                    message="警告颜色"
                ></auto-loading>
                <auto-loading
                    inline
                    color="#f5222d"
                    message="错误颜色"
                ></auto-loading>
                <auto-loading
                    inline
                    color="#722ed1"
                    message="紫色"
                ></auto-loading>
            </auto-flex>
            <auto-flex gap="1.5em" align="center" style="margin-top:2em">
                <auto-loading
                    inline
                    direction="row"
                    color="#1890ff"
                    message="主要颜色"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    color="#52c41a"
                    message="成功颜色"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    color="#faad14"
                    message="警告颜色"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    color="#f5222d"
                    message="错误颜色"
                ></auto-loading>
                <auto-loading
                    inline
                    direction="row"
                    color="#722ed1"
                    message="紫色"
                ></auto-loading>
            </auto-flex>
        `;
    },
};

export const LoadingDirections: Story = {
    name: "布局方向",
    render: () => {
        return html`
            <auto-flex direction="column" gap="3em">
                <auto-flex gap="2em" align="center">
                    <auto-loading
                        inline
                        direction="column"
                        size="x-small"
                        message="垂直布局"
                        color="#1890ff"
                    ></auto-loading>
                    <auto-loading
                        inline
                        direction="column"
                        size="small"
                        message="垂直加载中..."
                        color="#faad14"
                    ></auto-loading>
                    <auto-loading
                        inline
                        direction="column"
                        size="medium"
                        message="水平布局"
                        color="#52c41a"
                    ></auto-loading>
                    <auto-loading
                        inline
                        size="large"
                        direction="column"
                        message="水平加载中..."
                        color="#f5222d"
                    ></auto-loading>
                    <auto-loading
                        inline
                        size="x-large"
                        direction="column"
                        message="水平加载中..."
                        color="#f5222d"
                    ></auto-loading>
                </auto-flex>

                <auto-flex gap="2em" align="center">
                    <auto-loading
                        inline
                        size="x-small"
                        direction="row"
                        message="垂直布局"
                        color="#1890ff"
                    ></auto-loading>
                    <auto-loading
                        inline
                        size="small"
                        direction="row"
                        message="垂直加载中..."
                        color="#faad14"
                    ></auto-loading>
                    <auto-loading
                        inline
                        size="medium"
                        direction="row"
                        message="水平布局"
                        color="#52c41a"
                    ></auto-loading>
                    <auto-loading
                        inline
                        size="large"
                        direction="row"
                        message="水平加载中..."
                        color="#f5222d"
                    ></auto-loading>
                    <auto-loading
                        inline
                        size="x-large"
                        direction="row"
                        message="水平加载中..."
                        color="#f5222d"
                    ></auto-loading>
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
                column
                gap="1.5em"
                style="width: 500px;width: 100%;position: relative;"
                ><auto-card
                    title="垂直充满"
                    style="height: 200px;border:1px solid #ccc;width: 100%;position: relative;"
                >
                    <auto-watermark></auto-watermark>
                    <auto-loading
                        direction="column"
                        size="x-small"
                        message="垂直居中加载..."
                    ></auto-loading>
                </auto-card>
                <auto-card
                    title="垂直充满"
                    style="height: 200px;border:1px solid #ccc;width: 100%;position: relative;"
                    ><auto-watermark></auto-watermark>
                    <auto-loading
                        direction="column"
                        size="small"
                        message="垂直居中加载..."
                    ></auto-loading>
                </auto-card>
                <auto-card
                    title="垂直充满"
                    style="height: 200px;border:1px solid #ccc;width: 100%;position: relative;"
                    ><auto-watermark></auto-watermark>
                    <auto-loading
                        direction="column"
                        size="medium"
                        message="垂直居中加载..."
                    ></auto-loading>
                </auto-card>

                <auto-card
                    title="水平充满"
                    style="height: 200px;border:1px solid #ccc;width: 100%;;position: relative;"
                    ><auto-watermark></auto-watermark>
                    <auto-loading
                        direction="row"
                        size="large"
                        message="水平居中加载..."
                        color="#52c41a"
                    ></auto-loading>
                </auto-card>

                <auto-card
                    title="表单加载"
                    style="height: 300px;border:1px solid #ccc;width: 100%;position: relative;"
                    ><auto-watermark></auto-watermark>
                    <auto-loading
                        direction="column"
                        size="x-large"
                        message="表单提交中，请稍候..."
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
            <div style="width:400px;margin:0 auto">
                <auto-flex
                    column
                    gap="1.5em"
                    style="width: 500px;width: 100%;position: relative;"
                    ><auto-card
                        title="垂直充满"
                        style="height: 200px;border:1px solid #ccc;width: 100%;position: relative;"
                        ><auto-watermark></auto-watermark>
                        <auto-loading
                            direction="column"
                            size="x-small"
                            message="这是一段非常长的文本内容，用来测试文本截断功能，当文本超过两行时会显示省略号，这样可以保持界面整洁"
                        ></auto-loading>
                    </auto-card>
                    <auto-card
                        title="垂直充满"
                        style="height: 200px;border:1px solid #ccc;width: 100%;position: relative;"
                        ><auto-watermark></auto-watermark>
                        <auto-loading
                            direction="column"
                            size="small"
                            message="这是一段非常长的文本内容，用来测试文本截断功能，当文本超过两行时会显示省略号，这样可以保持界面整洁"
                        ></auto-loading>
                    </auto-card>
                    <auto-card
                        title="垂直充满"
                        style="height: 200px;border:1px solid #ccc;width: 100%;position: relative;"
                        ><auto-watermark></auto-watermark>
                        <auto-loading
                            direction="column"
                            size="medium"
                            message="这是一段非常长的文本内容，用来测试文本截断功能，当文本超过两行时会显示省略号，这样可以保持界面整洁"
                        ></auto-loading>
                    </auto-card>

                    <auto-card
                        title="水平充满"
                        style="height: 200px;border:1px solid #ccc;width: 100%;;position: relative;"
                        ><auto-watermark></auto-watermark>
                        <auto-loading
                            direction="row"
                            size="large"
                            message="这是一段非常长的文本内容，用来测试文本截断功能，当文本超过两行时会显示省略号，这样可以保持界面整洁"
                        ></auto-loading>
                    </auto-card>

                    <auto-card
                        title="表单加载"
                        style="height: 300px;border:1px solid #ccc;width: 100%;position: relative;"
                        ><auto-watermark></auto-watermark>
                        <auto-loading
                            direction="column"
                            size="x-large"
                            message="这是一段非常长的文本内容，用来测试文本截断功能，当文本超过两行时会显示省略号，这样可以保持界面整洁"
                        ></auto-loading>
                    </auto-card>
                </auto-flex>
            </div>
        `;
    },
};

export const LoadingMask: Story = {
    name: "遮盖模式",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em">
                <!-- 遮盖模式对比 -->
                <auto-flex gap="2em" wrap>
                    <!-- 普通模式 -->
                    <auto-flex
                        direction="column"
                        align="center"
                        gap="0.5em"
                        style="width: 200px; height: 150px; border: 1px solid #e0e0e0; position: relative; padding: 1em; border-radius: 8px;"
                    >
                        <auto-watermark text="themepro"></auto-watermark>
                        <auto-loading
                            direction="column"
                            size="small"
                            message="加载中"
                            color="#1890ff"
                        ></auto-loading>
                    </auto-flex>

                    <!-- 遮盖模式 -->
                    <auto-flex
                        direction="column"
                        align="center"
                        gap="0.5em"
                        style="width: 200px; height: 150px; border: 1px solid #e0e0e0; position: relative; padding: 1em; border-radius: 8px;"
                    >
                        <auto-watermark text="themepro"></auto-watermark>
                        <auto-loading
                            mask="dark"
                            fit
                            direction="column"
                            size="small"
                            message="加载中"
                            color="#1890ff"
                        ></auto-loading>
                    </auto-flex>
                </auto-flex>

                <!-- 实际应用场景 -->
                <auto-flex direction="column" gap="1.5em">
                    <!-- 表单提交场景 -->
                    <auto-card
                        title="表单提交"
                        style="position: relative; width: 100%; height:200px;max-width: 500px;border:1px solid #ccc"
                    >
                        <auto-watermark text="themepro"></auto-watermark>
                        <auto-loading
                            fit
                            direction="row"
                            size="medium"
                            message="正在保存..."
                            color="#52c41a"
                        ></auto-loading>
                    </auto-card>

                    <!-- 数据表格场景 -->
                    <auto-card
                        title="数据加载"
                        style="position: relative; width: 100%; height:200px;max-width: 700px;border:1px solid #ccc"
                    >
                        <auto-watermark text="themepro"></auto-watermark>
                        <auto-loading
                            fit
                            direction="column"
                            size="large"
                            message="正在加载数据..."
                            color="#1890ff"
                            type="spinning-bubbles"
                        ></auto-loading>
                    </auto-card>

                    <!-- 按钮操作场景 -->
                    <auto-flex gap="2em" wrap equal>
                        <auto-card
                            title="按钮操作"
                            style="position: relative; width: 200px;height: 100px;border:1px solid #ccc"
                        >
                            <auto-watermark text="themepro"></auto-watermark>
                            <auto-loading
                                fit
                                direction="row"
                                size="small"
                                message="提交中..."
                                color="#1890ff"
                            ></auto-loading>
                        </auto-card>

                        <auto-card
                            title="文件上传"
                            style="position: relative; width: 200px; height: 100px;border: 1px solid #ccc"
                        >
                            <auto-watermark text="themepro"></auto-watermark>
                            <auto-loading
                                fit
                                direction="column"
                                size="small"
                                message="上传中..."
                                color="#52c41a"
                            ></auto-loading>
                        </auto-card>
                    </auto-flex>
                </auto-flex>

                <!-- 不同类型的遮盖加载 -->
                <auto-flex gap="1.5em" wrap>
                    ${[
                        { type: "", label: "默认", color: "#1890ff" },
                        { type: "bars", label: "条形", color: "#52c41a" },
                        { type: "bubbles", label: "气泡", color: "#faad14" },
                        { type: "spin", label: "旋转", color: "#13c2c2" },
                        {
                            type: "spinning-bubbles",
                            label: "旋转气泡",
                            color: "#eb2f96",
                        },
                        { type: "spokes", label: "辐射", color: "#595959" },
                    ].map(
                        (item) => html`
                            <auto-flex
                                direction="column"
                                align="center"
                                gap="0.5em"
                            >
                                <div
                                    style="width: 160px; height: 100px; border: 1px solid #e0e0e0; position: relative; border-radius: 6px;"
                                >
                                    <auto-watermark
                                        text="themepro"
                                    ></auto-watermark>
                                    <auto-loading
                                        fit
                                        type=${item.type as any}
                                        direction="column"
                                        size="small"
                                        message="加载中..."
                                        color=${item.color}
                                    ></auto-loading>
                                </div>
                            </auto-flex>
                        `
                    )}
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LoadingTypes: Story = {
    name: "加载图标类型",
    render: () => {
        return html`
            <auto-flex gap="2em" wrap>
                <auto-flex
                    gap="1em"
                    style="position: relative; width: 30%; height: 200px;border:1px solid #ccc"
                    ><auto-watermark text="themepro"></auto-watermark>
                    <auto-loading
                        message="小球"
                        description="旋转气泡旋转气泡旋转气泡旋转气泡旋转气泡"
                        color="#eb2f96"
                        actions="[{label:'确认'},{label:'取消'}]"
                    ></auto-loading
                ></auto-flex>
                <auto-flex
                    gap="1em"
                    style="position: relative; width: 30%; height: 200px;border:1px solid #ccc"
                    ><auto-watermark text="themepro"></auto-watermark>
                    <auto-loading
                        type="bars"
                        message="条形"
                        color="#52c41a"
                        cancelable
                    ></auto-loading
                ></auto-flex>
                <auto-flex
                    gap="1em"
                    style="position: relative; width: 30%; height: 200px;border:1px solid #ccc"
                    ><auto-watermark text="themepro"></auto-watermark>
                    <auto-loading
                        type="bubbles"
                        message="气泡"
                        color="#faad14"
                    ></auto-loading
                ></auto-flex>
                <auto-flex
                    gap="1em"
                    style="position: relative; width: 30%; height: 200px;border:1px solid #ccc"
                    ><auto-watermark text="themepro"></auto-watermark>
                    <auto-loading
                        type="spin"
                        message="旋转"
                        color="#13c2c2"
                        mask="dark"
                    ></auto-loading
                ></auto-flex>
                <auto-flex
                    gap="1em"
                    style="position: relative; width: 30%; height: 200px;border:1px solid #ccc"
                    ><auto-watermark text="themepro"></auto-watermark>
                    <auto-loading
                        type="spinning-bubbles"
                        message="旋转气泡"
                        description="旋转气泡旋转气泡旋转气泡旋转气泡旋转气泡"
                        color="#eb2f96"
                        mask="dark"
                    ></auto-loading
                ></auto-flex>
                <auto-flex
                    gap="1em"
                    style="position: relative; width: 30%; height: 200px;border:1px solid #ccc"
                    ><auto-watermark text="themepro"></auto-watermark>
                    <auto-loading
                        type="spokes"
                        message="辐射"
                        color="#fefefe"
                        mask="dark"
                    ></auto-loading>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LoadingStatus: Story = {
    name: "状态展示",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em">
                <h3>不同状态展示</h3>
                <auto-flex gap="2em" wrap>
                    <!-- Loading 状态 -->
                    <auto-flex
                        direction="column"
                        align="center"
                        gap="0.5em"
                        style="width: 250px; height: 180px; border: 1px solid #e0e0e0; position: relative; padding: 1em; border-radius: 8px;"
                    >
                        <auto-watermark text="loading"></auto-watermark>
                        <auto-loading
                            status="loading"
                            message="正在加载..."
                            color="#1890ff"
                        ></auto-loading>
                        <span
                            style="position: absolute; bottom: 10px; font-size: 12px; color: #999;"
                            >Loading 状态</span
                        >
                    </auto-flex>

                    <!-- Error 状态 -->
                    <auto-flex
                        direction="column"
                        align="center"
                        gap="0.5em"
                        style="width: 250px; height: 180px; border: 1px solid #e0e0e0; position: relative; padding: 1em; border-radius: 8px;"
                    >
                        <auto-watermark text="error"></auto-watermark>
                        <auto-loading
                            status="error"
                            error="加载失败"
                            color="#f5222d"
                        ></auto-loading>
                        <span
                            style="position: absolute; bottom: 10px; font-size: 12px; color: #999;"
                            >Error 状态</span
                        >
                    </auto-flex>

                    <!-- Success 状态 -->
                    <auto-flex
                        direction="column"
                        align="center"
                        gap="0.5em"
                        style="width: 250px; height: 180px; border: 1px solid #e0e0e0; position: relative; padding: 1em; border-radius: 8px;"
                    >
                        <auto-watermark text="success"></auto-watermark>
                        <auto-loading
                            status="success"
                            message="操作成功！"
                            color="#52c41a"
                        ></auto-loading>
                        <span
                            style="position: absolute; bottom: 10px; font-size: 12px; color: #999;"
                            >Success 状态</span
                        >
                    </auto-flex>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LoadingStatusWithActions: Story = {
    name: "状态与操作按钮",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em">
                <h3>Loading 状态 - 可取消</h3>
                <auto-flex gap="2em" wrap>
                    <auto-card
                        title="可取消加载"
                        style="position: relative; width: 300px; height: 150px;border:1px solid #ccc"
                    >
                        <auto-watermark text="cancelable"></auto-watermark>
                        <auto-loading
                            status="loading"
                            message="正在处理..."
                            cancelable
                        ></auto-loading>
                    </auto-card>
                </auto-flex>

                <h3>Error 状态 - 重试和返回</h3>
                <auto-flex gap="2em" wrap>
                    <auto-card
                        title="可重试"
                        style="position: relative; width: 300px; height: 150px;border:1px solid #ccc"
                    >
                        <auto-watermark text="retryable"></auto-watermark>
                        <auto-loading
                            status="error"
                            error="网络连接失败"
                            retryable
                        ></auto-loading>
                    </auto-card>

                    <auto-card
                        title="可返回"
                        style="position: relative; width: 300px; height: 150px;border:1px solid #ccc"
                    >
                        <auto-watermark text="backable"></auto-watermark>
                        <auto-loading
                            status="error"
                            error="加载失败，请返回"
                            backable
                        ></auto-loading>
                    </auto-card>

                    <auto-card
                        title="可重试和返回"
                        style="position: relative; width: 300px; height: 150px;border:1px solid #ccc"
                    >
                        <auto-watermark
                            text="retryable+backable"
                        ></auto-watermark>
                        <auto-loading
                            status="error"
                            error="服务器错误"
                            retryable
                            backable
                        ></auto-loading>
                    </auto-card>
                </auto-flex>

                <h3>Success 状态 - 可关闭</h3>
                <auto-flex gap="2em" wrap>
                    <auto-card
                        title="可关闭"
                        style="position: relative; width: 300px; height: 150px;border:1px solid #ccc"
                    >
                        <auto-watermark text="closeable"></auto-watermark>
                        <auto-loading
                            status="success"
                            message="保存成功！"
                            closeable
                        ></auto-loading>
                    </auto-card>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LoadingStatusInteractive: Story = {
    name: "状态切换交互示例",
    render: () => {
        return html`
            <style>
                .demo-container {
                    padding: 1.5em;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    background: #fafafa;
                }
                .demo-buttons {
                    display: flex;
                    gap: 1em;
                    margin-top: 1em;
                    flex-wrap: wrap;
                }
            </style>

            <script>
                window.loadingDemo = {
                    // 模拟成功加载
                    simulateSuccess: function (loadingId) {
                        const loading = document.getElementById(loadingId);
                        if (!loading) return;

                        loading.status = "loading";
                        loading.message = "正在加载...";

                        setTimeout(() => {
                            loading.status = "success";
                            loading.message = "操作成功！";
                        }, 1500);
                    },

                    // 模拟失败加载
                    simulateError: function (loadingId) {
                        const loading = document.getElementById(loadingId);
                        if (!loading) return;

                        loading.status = "loading";
                        loading.message = "正在加载...";

                        setTimeout(() => {
                            loading.status = "error";
                            loading.setAttribute("error", "加载失败，请重试");
                        }, 1500);
                    },

                    // 随机加载结果
                    simulateRandom: function (loadingId) {
                        const loading = document.getElementById(loadingId);
                        if (!loading) return;

                        loading.status = "loading";
                        loading.message = "正在加载...";
                        loading.removeAttribute("error");

                        setTimeout(() => {
                            const isSuccess = Math.random() > 0.5;
                            if (isSuccess) {
                                loading.status = "success";
                                loading.message = "加载成功！";
                            } else {
                                loading.status = "error";
                                loading.setAttribute(
                                    "error",
                                    "网络错误，请重试"
                                );
                            }
                        }, 1500);
                    },

                    // 重置状态
                    reset: function (loadingId) {
                        const loading = document.getElementById(loadingId);
                        if (!loading) return;
                        loading.status = "loading";
                        loading.message = "准备就绪";
                        loading.removeAttribute("error");
                    },
                };
            </script>

            <auto-flex direction="column" gap="3em" style="padding: 1em;">
                <div>
                    <h3 style="margin-bottom: 1em;">场景1: 可取消的加载操作</h3>
                    <div class="demo-container">
                        <div
                            id="demo-cancel"
                            style="position: relative; height: 200px; border: 1px dashed #d9d9d9; border-radius: 4px;"
                        >
                            <auto-loading
                                id="demo-cancel"
                                status="loading"
                                message="准备就绪"
                                cancelable
                            ></auto-loading>
                        </div>
                        <div class="demo-buttons">
                            <auto-button
                                type="primary"
                                onclick="loadingDemo.simulateSuccess('demo-cancel')"
                            >
                                模拟成功
                            </auto-button>
                            <auto-button
                                type="default"
                                onclick="loadingDemo.simulateError('demo-cancel')"
                            >
                                模拟失败
                            </auto-button>
                            <auto-button
                                type="default"
                                onclick="loadingDemo.reset('demo-cancel')"
                            >
                                重置
                            </auto-button>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 style="margin-bottom: 1em;">场景2: 可重试的错误处理</h3>
                    <div class="demo-container">
                        <div
                            id="demo-retry"
                            style="position: relative; height: 200px; border: 1px dashed #d9d9d9; border-radius: 4px;"
                        >
                            <auto-loading
                                id="demo-retry"
                                status="loading"
                                message="准备就绪"
                                retryable
                            ></auto-loading>
                        </div>
                        <div class="demo-buttons">
                            <auto-button
                                type="primary"
                                onclick="loadingDemo.simulateRandom('demo-retry')"
                            >
                                随机加载结果
                            </auto-button>
                            <auto-button
                                type="default"
                                onclick="loadingDemo.reset('demo-retry')"
                            >
                                重置
                            </auto-button>
                        </div>
                        <p
                            style="color: #666; font-size: 12px; margin-top: 0.5em;"
                        >
                            提示: 失败时可点击"重试"按钮重新加载
                        </p>
                    </div>
                </div>

                <div>
                    <h3 style="margin-bottom: 1em;">场景3: 可关闭的成功提示</h3>
                    <div class="demo-container">
                        <div
                            id="demo-close"
                            style="position: relative; height: 200px; border: 1px dashed #d9d9d9; border-radius: 4px;"
                        >
                            <auto-loading
                                id="demo-close"
                                status="loading"
                                message="准备就绪"
                                closeable
                            ></auto-loading>
                        </div>
                        <div class="demo-buttons">
                            <auto-button
                                type="primary"
                                onclick="loadingDemo.simulateSuccess('demo-close')"
                            >
                                保存操作
                            </auto-button>
                            <auto-button
                                type="default"
                                onclick="loadingDemo.reset('demo-close')"
                            >
                                重置
                            </auto-button>
                        </div>
                        <p
                            style="color: #666; font-size: 12px; margin-top: 0.5em;"
                        >
                            提示: 成功后可点击"关闭"按钮隐藏提示
                        </p>
                    </div>
                </div>

                <div>
                    <h3 style="margin-bottom: 1em;">场景4: 完整的状态流转</h3>
                    <div class="demo-container">
                        <div
                            id="demo-full"
                            style="position: relative; height: 200px; border: 1px dashed #d9d9d9; border-radius: 4px;"
                        >
                            <auto-loading
                                id="demo-full"
                                status="loading"
                                message="准备就绪"
                                retryable
                                backable
                                closeable
                            ></auto-loading>
                        </div>
                        <div class="demo-buttons">
                            <auto-button
                                type="primary"
                                onclick="loadingDemo.simulateRandom('demo-full')"
                            >
                                开始加载
                            </auto-button>
                            <auto-button
                                type="default"
                                onclick="loadingDemo.simulateSuccess('demo-full')"
                            >
                                直接成功
                            </auto-button>
                            <auto-button
                                type="default"
                                onclick="loadingDemo.simulateError('demo-full')"
                            >
                                直接失败
                            </auto-button>
                            <auto-button
                                type="default"
                                onclick="loadingDemo.reset('demo-full')"
                            >
                                重置
                            </auto-button>
                        </div>
                        <p
                            style="color: #666; font-size: 12px; margin-top: 0.5em;"
                        >
                            提示: 失败时可"重试"或"返回"，成功时可"关闭"
                        </p>
                    </div>
                </div>
            </auto-flex>
        `;
    },
};
