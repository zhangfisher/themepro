import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/Loading/index";
import { HTMLLoader } from "../utils/HTMLLoader";

const meta: Meta = {
    title: "工具/HTMLLoader",
    tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 基础示例 - 最简单的用法
 */
export const Default: Story = {
    name: "基础示例",
    render: () => {
        const containerId = "loader-demo-1";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/success",
                onLoading: {
                    message: "正在加载内容...",
                },
                onFail: {
                    retryable: true,
                    closeable: true,
                },
            });

            loader.load();
        }, 100);

        return html`<div id="${containerId}" style="min-height: 200px; position: relative; border: 1px dashed #ccc; padding: 20px;"></div>`;
    },
};

/**
 * 成功加载 - 展示加载成功后的效果
 */
export const SuccessCase: Story = {
    name: "成功加载",
    render: () => {
        const containerId = "loader-demo-2";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/post",
                onLoading: {
                    message: "正在加载数据...",
                    type: "bars",
                },
            });

            loader.load();
        }, 100);

        return html`<div id="${containerId}" style="min-height: 200px; position: relative; border: 1px dashed #ccc; padding: 20px;"></div>`;
    },
};

/**
 * 失败重试 - 展示加载失败时的重试功能
 */
export const ErrorRetry: Story = {
    name: "失败重试",
    render: () => {
        const containerId = "loader-demo-3";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/server-error",
                onLoading: {
                    message: "正在加载...",
                },
                onFail: {
                    retryable: true,
                    closeable: true,
                },
            });

            loader.load();
        }, 100);

        return html`
            <div style="margin-bottom: 10px; color: #666; font-size: 14px;">
                💡 提示：这个示例会故意失败，点击"重试"按钮可以重新发起请求
            </div>
            <div id="${containerId}" style="min-height: 200px; position: relative; border: 1px dashed #ccc; padding: 20px;"></div>
        `;
    },
};

/**
 * 可取消加载 - 展示取消功能
 */
export const Cancelable: Story = {
    name: "可取消加载",
    render: () => {
        const containerId = "loader-demo-4";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/slow",
                onLoading: {
                    message: "正在加载，可以点击取消...",
                    cancelable: true,
                },
                onFail: {
                    closeable: true,
                },
            });

            loader.load();
        }, 100);

        return html`
            <div style="margin-bottom: 10px; color: #666; font-size: 14px;">
                💡 提示：点击"取消"按钮可以中止加载
            </div>
            <div id="${containerId}" style="min-height: 200px; position: relative; border: 1px dashed #ccc; padding: 20px;"></div>
        `;
    },
};

/**
 * 自定义注入目标 - injectTo 参数示例
 */
export const CustomInject: Story = {
    name: "自定义注入目标",
    render: () => {
        const containerId = "loader-demo-5";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/user",
                onLoading: {
                    message: "正在加载...",
                },
                onFail: {
                    retryable: true,
                },
                onSuccess: (html) => {
                    return `<div style="padding: 15px; background: #e3f2fd; border-radius: 4px; color: #1976d2;">
                        <strong>✅ 加载完成！</strong><br>
                        用户卡片已注入到下方区域
                    </div>`;
                },
                // 注入到指定的选择器元素
                injectTo: ".content-area",
            });

            loader.load();
        }, 100);

        return html`
            <div id="${containerId}" style="border: 1px dashed #ccc; padding: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #333;">页面布局</h3>
                <div class="content-area" style="min-height: 100px; border: 2px dashed #999; padding: 10px; background: #fafafa;">
                    <em style="color: #999;">内容将加载到这里...</em>
                </div>
            </div>
        `;
    },
};

/**
 * 不自动注入 - injectTo = false 示例
 */
export const NoAutoInject: Story = {
    name: "不自动注入",
    render: () => {
        const containerId = "loader-demo-6";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/post",
                onLoading: {
                    message: "加载数据...",
                },
                onSuccess: (result) => {
                    // 自定义处理，不自动注入
                    const wrapper = document.createElement("div");
                    wrapper.style.cssText = "padding: 15px; background: #fff3e0; border-left: 4px solid #ff9800; margin-top: 10px;";
                    wrapper.innerHTML = "<strong>✓ 自定义处理:</strong> 内容已在 onSuccess 中手动处理";
                    container?.appendChild(wrapper);

                    // 返回空字符串不注入
                    return "";
                },
                // 不自动注入
                injectTo: false,
            });

            loader.load();
        }, 100);

        return html`
            <div style="margin-bottom: 10px; color: #666; font-size: 14px;">
                💡 提示：injectTo=false，内容不会自动注入，而是在 onSuccess 中手动处理
            </div>
            <div id="${containerId}" style="min-height: 200px; position: relative; border: 1px dashed #ccc; padding: 20px;"></div>
        `;
    },
};

/**
 * 返回 HTMLElement 示例
 */
export const ReturnElement: Story = {
    name: "返回 HTMLElement",
    render: () => {
        const containerId = "loader-demo-7";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/post",
                onLoading: {
                    message: "加载中...",
                },
                onSuccess: () => {
                    // 创建并返回 HTMLElement
                    const element = document.createElement("div");
                    element.style.cssText = "padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);";
                    element.innerHTML = `
                        <h3 style="margin: 0 0 10px 0;">🎨 自定义 HTMLElement</h3>
                        <p style="margin: 0; opacity: 0.9;">这是在 onSuccess 中创建并返回的 DOM 元素</p>
                    `;
                    return element;
                },
            });

            loader.load();
        }, 100);

        return html`<div id="${containerId}" style="min-height: 200px; position: relative; border: 1px dashed #ccc; padding: 20px;"></div>`;
    },
};

/**
 * 异步处理示例
 */
export const AsyncProcessing: Story = {
    name: "异步处理",
    render: () => {
        const containerId = "loader-demo-8";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/post",
                onLoading: {
                    message: "正在加载数据...",
                },
                onSuccess: async (result) => {
                    // 模拟异步处理
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    return `
                        <div style="padding: 20px; background: #f1f8e9; border-radius: 8px;">
                            <h4 style="margin: 0 0 10px 0; color: #33691e;">✓ 异步处理完成</h4>
                            <p style="margin: 0;">内容已成功加载并异步处理</p>
                            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">处理耗时: 1秒（模拟）</p>
                        </div>
                    `;
                },
            });

            loader.load();
        }, 100);

        return html`
            <div style="margin-bottom: 10px; color: #666; font-size: 14px;">
                💡 提示：onSuccess 返回 Promise，支持异步处理
            </div>
            <div id="${containerId}" style="min-height: 200px; position: relative; border: 1px dashed #ccc; padding: 20px;"></div>
        `;
    },
};

/**
 * 完整功能展示
 */
export const FullFeatured: Story = {
    name: "完整功能展示",
    render: () => {
        const containerId = "loader-demo-9";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            // 添加一个按钮来触发加载
            const loadBtn = document.getElementById("load-btn");
            if (loadBtn) {
                loadBtn.addEventListener("click", () => {
                    // 清空容器
                    container.innerHTML = "";

                    const loader = new HTMLLoader({
                        container,
                        url: "/api/htmlloader/success",
                        onLoading: {
                            message: "正在加载完整示例...",
                            type: "bubbles",
                        },
                        onFail: {
                            retryable: true,
                            closeable: true,
                            backable: true,
                        },
                    });

                    loader.load();
                });
            }
        }, 100);

        return html`
            <div style="margin-bottom: 10px;">
                <button id="load-btn" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">
                    开始加载
                </button>
            </div>
            <div id="${containerId}" style="min-height: 250px; position: relative; border: 1px dashed #ccc; padding: 20px;">
                <em style="color: #999;">点击上方按钮开始加载</em>
            </div>
        `;
    },
};

/**
 * 不同内容类型
 */
export const ContentTypes: Story = {
    name: "不同内容类型",
    render: () => {
        const createLoader = (id: number, url: string, label: string) => {
            setTimeout(() => {
                const container = document.getElementById(`loader-${id}`);
                if (!container) return;

                const loader = new HTMLLoader({
                    container,
                    url,
                    onLoading: {
                        message: "加载中...",
                        inline: true,
                    },
                    onFail: {
                        retryable: true,
                    },
                });

                loader.load();
            }, 100);
        };

        setTimeout(() => {
            createLoader(1, "/api/htmlloader/post", "文章");
            createLoader(2, "/api/htmlloader/user", "用户");
            createLoader(3, "/api/htmlloader/product", "产品");
            createLoader(4, "/api/htmlloader/stats", "统计");
        }, 100);

        return html`
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 16px; background: #f5f5f5;">
                <div style="background: white; padding: 12px; border-radius: 8px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">📄 文章内容</h4>
                    <div id="loader-1" style="min-height: 150px; position: relative; border: 1px dashed #ddd; padding: 10px;"></div>
                </div>
                <div style="background: white; padding: 12px; border-radius: 8px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">👤 用户卡片</h4>
                    <div id="loader-2" style="min-height: 150px; position: relative; border: 1px dashed #ddd; padding: 10px;"></div>
                </div>
                <div style="background: white; padding: 12px; border-radius: 8px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">🎁 产品卡片</h4>
                    <div id="loader-3" style="min-height: 150px; position: relative; border: 1px dashed #ddd; padding: 10px;"></div>
                </div>
                <div style="background: white; padding: 12px; border-radius: 8px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">📊 统计数据</h4>
                    <div id="loader-4" style="min-height: 150px; position: relative; border: 1px dashed #ddd; padding: 10px;"></div>
                </div>
            </div>
        `;
    },
};

/**
 * JSON 数据处理
 */
export const JsonData: Story = {
    name: "JSON 数据处理",
    render: () => {
        const containerId = "loader-demo-11";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/json",
                onLoading: {
                    message: "加载 JSON 数据...",
                },
                onFail: {
                    retryable: true,
                },
                onSuccess: (result) => {
                    const data = JSON.parse(result);
                    return `
                        <div style="padding: 20px; background: #e3f2fd; border-radius: 8px;">
                            <h3 style="margin: 0 0 12px 0; color: #1976d2;">📋 JSON 数据</h3>
                            <div style="background: white; padding: 12px; border-radius: 4px; font-family: monospace; font-size: 13px; color: #333;">
                                <div><strong>ID:</strong> ${data.id}</div>
                                <div><strong>标题:</strong> ${data.title}</div>
                                <div><strong>内容:</strong> ${data.content}</div>
                                <div><strong>作者:</strong> ${data.author}</div>
                                <div style="margin-top: 8px; color: #666; font-size: 12px;">
                                    <strong>时间戳:</strong> ${new Date(data.timestamp).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    `;
                },
            });

            loader.load();
        }, 100);

        return html`
            <div style="margin-bottom: 10px; color: #666; font-size: 14px;">
                💡 提示：加载 JSON 数据并在 onSuccess 中解析处理
            </div>
            <div id="${containerId}" style="min-height: 200px; position: relative; border: 1px dashed #ccc; padding: 20px;"></div>
        `;
    },
};

/**
 * 错误堆栈显示
 */
export const ErrorWithStack: Story = {
    name: "错误堆栈显示",
    render: () => {
        const containerId = "loader-demo-12";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/network-error",
                onLoading: {
                    message: "尝试加载网络错误...",
                },
                onFail: {
                    retryable: true,
                    closeable: true,
                },
            });

            loader.load();
        }, 100);

        return html`
            <div style="margin-bottom: 10px; color: #666; font-size: 14px;">
                💡 提示：模拟网络错误，显示错误信息和堆栈
            </div>
            <div id="${containerId}" style="min-height: 200px; position: relative; border: 1px dashed #ccc; padding: 20px;"></div>
        `;
    },
};

/**
 * 功能特性列表
 */
export const FeaturesList: Story = {
    name: "功能特性列表",
    render: () => {
        const containerId = "loader-demo-13";

        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const loader = new HTMLLoader({
                container,
                url: "/api/htmlloader/features",
                onLoading: {
                    message: "加载功能列表...",
                },
            });

            loader.load();
        }, 100);

        return html`<div id="${containerId}" style="min-height: 200px; position: relative; border: 1px dashed #ccc; padding: 20px;"></div>`;
    },
};

