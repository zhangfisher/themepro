import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../components/Feedback/index";

const meta: Meta = {
    title: "通用/AutoFeedBack",
    args: {
        message: undefined,
        description: undefined,
        icon: undefined,
        type: undefined,
        fit: false,
    },
    argTypes: {
        message: { control: "text" },
        description: { control: "text" },
        icon: { control: "text" },
        type: {
            control: "select",
            options: ["info", "success", "warning", "error"],
        },
        fit: { control: "boolean" },
    },
    render: (args: any) => html`
        <auto-feedback
            message=${ifDefined(args.message)}
            description=${ifDefined(args.description)}
            icon=${ifDefined(args.icon)}
            type=${ifDefined(args.type)}
            ?fit=${args.fit}
        ></auto-feedback>
    `,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
    name: "信息提示",
    render: () => {
        return html`
            <auto-flex direction="column" gap="1.5em" align="center">
                <auto-feedback
                    type="info"
                    message="信息提示"
                    description="这是一条信息提示内容"
                ></auto-feedback>
                <auto-feedback
                    type="info"
                    message="操作成功"
                    description="您的操作已经成功完成"
                ></auto-feedback>
                <auto-feedback type="info" message="提示信息"></auto-feedback>
            </auto-flex>
        `;
    },
};

export const Success: Story = {
    name: "成功提示",
    render: () => {
        return html`
            <auto-flex direction="column" gap="1.5em" align="center">
                <auto-feedback
                    type="success"
                    message="操作成功"
                    description="您的操作已经成功完成"
                ></auto-feedback>
                <auto-feedback
                    type="success"
                    message="保存成功"
                    description="数据已成功保存到服务器"
                ></auto-feedback>
                <auto-feedback
                    type="success"
                    message="提交成功"
                ></auto-feedback>
            </auto-flex>
        `;
    },
};

export const Warning: Story = {
    name: "警告提示",
    render: () => {
        return html`
            <auto-flex direction="column" gap="1.5em" align="center">
                <auto-feedback
                    type="warning"
                    message="警告信息"
                    description="请注意您的操作可能会影响系统性能"
                ></auto-feedback>
                <auto-feedback
                    type="warning"
                    message="注意事项"
                    description="请确保您有足够的权限执行此操作"
                ></auto-feedback>
                <auto-feedback type="warning" message="警告"></auto-feedback>
            </auto-flex>
        `;
    },
};

export const ErrorStory: Story = {
    name: "错误提示",
    render: () => {
        return html`
            <auto-flex direction="column" gap="1.5em" align="center">
                <auto-feedback
                    type="error"
                    message="操作失败"
                    description="网络连接失败，请检查您的网络设置"
                ></auto-feedback>
                <auto-feedback
                    type="error"
                    message="错误"
                    description="服务器返回错误，请稍后重试"
                ></auto-feedback>
                <auto-feedback type="error" message="加载失败"></auto-feedback>
            </auto-flex>
        `;
    },
};

export const CustomIcon: Story = {
    name: "自定义图标",
    render: () => {
        return html`
            <auto-flex direction="column" gap="1.5em" align="center">
                <auto-feedback
                    icon="heart"
                    message="感谢支持"
                    description="感谢您对我们产品的支持"
                ></auto-feedback>
                <auto-feedback
                    icon="star"
                    message="收藏成功"
                    description="已添加到您的收藏夹"
                ></auto-feedback>
                <auto-feedback
                    icon="setting"
                    message="设置中"
                    description="正在为您配置系统设置"
                ></auto-feedback>
            </auto-flex>
        `;
    },
};

export const WithSlots: Story = {
    name: "使用插槽自定义内容",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em" align="center">
                <!-- 自定义图标 slot -->
                <auto-feedback message="自定义图标示例" description="使用 slot 自定义图标">
                    <svg
                        slot="icon"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#52c41a"
                            stroke-width="2"
                        />
                        <path
                            d="M8 12L11 15L16 9"
                            stroke="#52c41a"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </auto-feedback>

                <!-- 自定义消息 slot -->
                <auto-feedback
                    type="success"
                    description="这是一个使用自定义消息 slot 的示例"
                >
                    <div slot="message" style="font-size: 1.5em; font-weight: bold;">
                        🎉 恭喜您完成操作！
                    </div>
                </auto-feedback>

                <!-- 自定义描述 slot -->
                <auto-feedback type="info" message="详细信息">
                    <div slot="description" style="line-height: 1.8;">
                        <p>这是一个自定义描述内容</p>
                        <p>可以包含多行文本和 HTML 元素</p>
                        <p>支持完全自定义样式和结构</p>
                    </div>
                </auto-feedback>

                <!-- 同时使用多个 slot -->
                <auto-feedback>
                    <div slot="icon" style="font-size: 4em;">🚀</div>
                    <div slot="message" style="color: #1890ff; font-weight: bold;">
                        启动成功
                    </div>
                    <div slot="description">
                        应用已成功启动，所有服务运行正常
                    </div>
                </auto-feedback>
            </auto-flex>
        `;
    },
};

export const WithActions: Story = {
    name: "带操作按钮",
    render: () => {
        return html`
            <auto-flex direction="column" gap="2em" align="center">
                <auto-feedback
                    type="info"
                    message="确认删除"
                    description="此操作将永久删除该文件，无法恢复"
                    .actions=${[
                        {
                            label: "取消",
                            type: "default",
                            variant: "outline",
                            onClick: () => alert("点击了取消按钮"),
                        },
                        {
                            label: "确认删除",
                            type: "danger",
                            onClick: () => alert("点击了确认删除按钮"),
                        },
                    ]}
                ></auto-feedback>

                <auto-feedback
                    type="warning"
                    message="未保存的更改"
                    description="您有未保存的更改，离开页面将丢失这些内容"
                    .actions=${[
                        {
                            label: "留在页面",
                            type: "default",
                            variant: "outline",
                            onClick: () => alert("选择留在页面"),
                        },
                        {
                            label: "保存并离开",
                            type: "primary",
                            onClick: () => alert("保存并离开页面"),
                        },
                    ]}
                ></auto-feedback>

                <auto-feedback
                    type="success"
                    message="操作成功"
                    description="您的更改已成功保存"
                    .actions=${[
                        {
                            label: "返回列表",
                            type: "default",
                            variant: "outline",
                            onClick: () => alert("返回到列表页"),
                        },
                        {
                            label: "继续编辑",
                            type: "primary",
                            onClick: () => alert("继续编辑内容"),
                        },
                    ]}
                ></auto-feedback>
            </auto-flex>
        `;
    },
};

export const WithActionsAndFeedback: Story = {
    name: "带事件响应的操作按钮",
    render: () => {
        // 创建一个状态管理函数
        const handleDeleteConfirm = () => {
            const result = confirm("确定要删除此文件吗？此操作无法撤销！");
            if (result) {
                alert("文件已删除");
            }
        };

        const handleSaveAndLeave = () => {
            alert("正在保存您的更改...");
            setTimeout(() => {
                alert("保存成功！即将离开页面");
            }, 1000);
        };

        const handleRetry = () => {
            alert("正在重新连接服务器...");
        };

        const handleContactSupport = () => {
            alert("正在打开客服对话框...");
        };

        return html`
            <auto-flex direction="column" gap="2em" align="center">
                <!-- 删除确认场景 -->
                <auto-feedback
                    type="error"
                    message="删除确认"
                    description="此操作将永久删除该文件，删除后无法恢复"
                    .actions=${[
                        {
                            label: "取消",
                            type: "default",
                            variant: "outline",
                            onClick: () => alert("已取消删除操作"),
                        },
                        {
                            label: "确认删除",
                            type: "danger",
                            onClick: handleDeleteConfirm,
                        },
                    ]}
                ></auto-feedback>

                <!-- 保存场景 -->
                <auto-feedback
                    type="warning"
                    message="未保存的更改"
                    description="您有未保存的更改，是否要在离开前保存？"
                    .actions=${[
                        {
                            label: "放弃更改",
                            type: "default",
                            variant: "outline",
                            onClick: () => alert("已放弃更改，将离开页面"),
                        },
                        {
                            label: "保存并离开",
                            type: "primary",
                            onClick: handleSaveAndLeave,
                        },
                    ]}
                ></auto-feedback>

                <!-- 网络错误场景 -->
                <auto-feedback
                    type="error"
                    message="连接失败"
                    description="无法连接到服务器，请检查您的网络连接"
                    .actions=${[
                        {
                            label: "重试",
                            type: "primary",
                            onClick: handleRetry,
                        },
                        {
                            label: "联系支持",
                            type: "default",
                            variant: "outline",
                            onClick: handleContactSupport,
                        },
                    ]}
                ></auto-feedback>
            </auto-flex>
        `;
    },
};

export const FitContainer: Story = {
    name: "充满容器",
    render: () => {
        return html`
            <auto-flex gap="1.5em" wrap style="width: 100%">
                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="width: 300px; height: 200px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1em;"
                >
                    <auto-feedback
                        type="info"
                        message="暂无数据"
                        description="当前没有任何数据可供显示"
                    ></auto-feedback>
                </auto-flex>

                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="width: 300px; height: 200px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1em;"
                >
                    <auto-feedback
                        type="success"
                        message="上传成功"
                        description="文件已成功上传到服务器"
                    ></auto-feedback>
                </auto-flex>

                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="width: 300px; height: 200px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1em;"
                >
                    <auto-feedback
                        type="error"
                        message="加载失败"
                        description="无法加载内容，请刷新页面重试"
                        .actions=${[
                            {
                                label: "刷新",
                                type: "primary",
                                onClick: () => alert("正在刷新页面..."),
                            },
                        ]}
                    ></auto-feedback>
                </auto-flex>

                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="width: 300px; height: 200px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1em;"
                >
                    <auto-feedback
                        fit
                        type="warning"
                        message="警告"
                        description="此内容可能不适合所有用户"
                        .actions=${[
                            {
                                label: "我知道了",
                                type: "default",
                                onClick: () => alert("已确认警告"),
                            },
                        ]}
                    ></auto-feedback>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const LongContent: Story = {
    name: "长文本内容",
    render: () => {
        return html`
            <auto-flex
                direction="column"
                gap="2em"
                align="center"
                style="width: 100%; max-width: 600px; padding: 2em;"
            >
                <auto-feedback
                    type="info"
                    message="这是一段很长的标题内容，用来测试文本换行和截断效果"
                    description="这是一段很长的描述内容，用来测试描述文本在多行显示时的效果。反馈组件支持自动换行和行数限制，确保界面保持整洁美观。这段文字应该能够很好地展示多行文本的显示效果。"
                ></auto-feedback>

                <auto-feedback
                    type="success"
                    message="操作成功完成"
                    description="恭喜您！您的操作已经成功完成。系统已经保存了您的所有更改，并且所有相关数据都已经更新。您可以继续使用系统的其他功能，或者稍后回来查看您的更改。"
                ></auto-feedback>

                <auto-feedback
                    type="warning"
                    message="重要提示"
                    description="请注意，此操作将会影响系统的多个部分。我们建议您在执行此操作之前，先备份所有重要数据。如果您不确定是否应该继续，请联系系统管理员获取更多帮助和技术支持。"
                ></auto-feedback>

                <auto-feedback
                    type="error"
                    message="系统错误"
                    description="系统遇到了一个未预期的错误，无法完成您的请求。错误代码：ERR-5001。请记录下此错误代码，并联系技术支持团队。我们的工程师将尽快为您解决问题。同时，您可以尝试刷新页面或重新登录系统。"
                    .actions=${[
                        {
                            label: "刷新页面",
                            type: "primary",
                            onClick: () => alert("正在刷新页面..."),
                        },
                        {
                            label: "联系支持",
                            type: "default",
                            variant: "outline",
                            onClick: () => alert("正在联系技术支持..."),
                        },
                    ]}
                ></auto-feedback>
            </auto-flex>
        `;
    },
};

export const AllTypes: Story = {
    name: "所有类型展示",
    render: () => {
        return html`
            <auto-flex gap="2em" wrap>
                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="width: 250px; height: 180px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1em;"
                >
                    <auto-feedback
                        type="info"
                        message="信息"
                        description="这是一条信息提示"
                    ></auto-feedback>
                </auto-flex>

                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="width: 250px; height: 180px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1em;"
                >
                    <auto-feedback
                        type="success"
                        message="成功"
                        description="操作已完成"
                    ></auto-feedback>
                </auto-flex>

                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="width: 250px; height: 180px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1em;"
                >
                    <auto-feedback
                        type="warning"
                        message="警告"
                        description="请注意"
                    ></auto-feedback>
                </auto-flex>

                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="width: 250px; height: 180px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1em;"
                >
                    <auto-feedback
                        type="error"
                        message="错误"
                        description="操作失败"
                    ></auto-feedback>
                </auto-flex>
            </auto-flex>
        `;
    },
};

export const RealWorldScenarios: Story = {
    name: "实际应用场景",
    render: () => {
        return html`
            <auto-flex
                direction="column"
                gap="2em"
                style="width: 100%; padding: 2em;"
            >
                <!-- 表单提交成功 -->
                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="min-height: 200px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 2em; background: #fafafa;"
                >
                    <auto-feedback
                        type="success"
                        message="表单提交成功"
                        description="您的信息已成功提交，我们将在1-2个工作日内与您联系"
                        .actions=${[
                            {
                                label: "返回首页",
                                type: "default",
                                variant: "outline",
                                onClick: () => alert("返回到首页"),
                            },
                            {
                                label: "提交另一个",
                                type: "primary",
                                onClick: () => alert("打开新的表单"),
                            },
                        ]}
                    ></auto-feedback>
                </auto-flex>

                <!-- 网络错误 -->
                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="min-height: 200px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 2em; background: #fafafa;"
                >
                    <auto-feedback
                        type="error"
                        message="网络连接失败"
                        description="无法连接到服务器，请检查您的网络连接"
                        .actions=${[
                            {
                                label: "重试",
                                type: "primary",
                                onClick: () => alert("正在重新连接..."),
                            },
                            {
                                label: "取消",
                                type: "default",
                                variant: "outline",
                                onClick: () => alert("取消操作"),
                            },
                        ]}
                    ></auto-feedback>
                </auto-flex>

                <!-- 空状态 -->
                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="min-height: 200px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 2em; background: #fafafa;"
                >
                    <auto-feedback
                        icon="inbox"
                        message="暂无数据"
                        description="您还没有任何数据，开始创建您的第一条数据吧"
                        .actions=${[
                            {
                                label: "创建数据",
                                type: "primary",
                                onClick: () => alert("打开创建数据表单"),
                            },
                        ]}
                    ></auto-feedback>
                </auto-flex>

                <!-- 权限提示 -->
                <auto-flex
                    direction="column"
                    align="center"
                    justify="center"
                    style="min-height: 200px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 2em; background: #fafafa;"
                >
                    <auto-feedback
                        type="warning"
                        icon="lock"
                        message="权限不足"
                        description="您没有权限访问此内容，请联系管理员获取访问权限"
                        .actions=${[
                            {
                                label: "返回",
                                type: "default",
                                onClick: () => alert("返回上一页"),
                            },
                            {
                                label: "联系管理员",
                                type: "primary",
                                variant: "outline",
                                onClick: () =>
                                    alert("正在打开管理员联系方式..."),
                            },
                        ]}
                    ></auto-feedback>
                </auto-flex>
            </auto-flex>
        `;
    },
};
