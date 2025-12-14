import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./TooltipDemo";

const meta: Meta = {
    title: "控制器/Tooltip/远程内容加载",
    tags: ["autodocs"],
    render: () => html`<tooltip-demo></tooltip-demo>`,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "演示 TooltipController 的远程 HTML 内容加载功能，使用 MSW (Mock Service Worker) 模拟 API 服务，无需真实的后端服务器即可测试远程内容加载。",
            },
        },
        msw: {
            handlers: [
                // 这个故事需要所有的 tooltip 模拟 API 处理程序
                // 这些处理程序已经在 .storybook/api.ts 中定义
            ],
        },
    },
};

export default meta;
type Story = StoryObj;

export const HTTP远程内容: Story = {
    name: "HTTP 远程内容",
    render: () => html`
        <tooltip-demo>
            <div
                style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;"
            >
                <!-- MSW模拟API内容加载示例 -->
                <button
                    data-tooltip="link://api/tooltip/post"
                    data-tooltip-placement="top"
                    data-tooltip-predict-size="400,200"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    加载模拟文章内容
                </button>

                <button
                    data-tooltip="http://localhost:3000/api/tooltip/comment"
                    data-tooltip-placement="bottom"
                    data-tooltip-predict-size="300,150"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    加载模拟评论内容
                </button>

                <button
                    data-tooltip="http://localhost:3000/api/tooltip/html-sample"
                    data-tooltip-placement="right"
                    data-tooltip-predict-size="500,300"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    加载 HTML 示例
                </button>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "使用 `data-tooltip='http://localhost:3000/...'` 通过 MSW 模拟 API 加载 HTML 内容。所有请求都被 MSW 拦截并返回模拟数据，无需真实的后端服务器。支持预设置尺寸以优化加载体验。",
            },
        },
    },
};

export const Link协议内容: Story = {
    name: "Link 协议内容",
    render: () => html`
        <tooltip-demo>
            <div
                style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;"
            >
                <button
                    data-tooltip="link://http://localhost:3000/api/tooltip/todo"
                    data-tooltip-placement="top"
                    data-tooltip-predict-size="350,150"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    Link协议加载Todo
                </button>

                <button
                    data-tooltip-link="http://localhost:3000/api/tooltip/user"
                    data-tooltip-placement="bottom"
                    data-tooltip-predict-size="400,250"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    使用 data-tooltip-link 属性
                </button>

                <button
                    data-tooltip="link://http://localhost:3000/api/tooltip/text-content"
                    data-tooltip-placement="left"
                    data-tooltip-predict-size="500,200"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    加载文本内容
                </button>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "使用 `link://` 协议或 `data-tooltip-link` 属性通过 MSW 模拟 API 加载内容。这两种方式是等效的，都通过 fetch API 获取 MSW 提供的模拟 HTML 内容。",
            },
        },
    },
};

export const 带加载状态的远程内容: Story = {
    name: "带加载状态的远程内容",
    render: () => html`
        <tooltip-demo>
            <div
                style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;"
            >
                <!-- 模拟慢速加载 -->
                <button
                    data-tooltip="http://localhost:3000/api/tooltip/delay"
                    data-tooltip-placement="top"
                    data-tooltip-predict-size="300,120"
                    data-tooltip-loading='<div style="padding: 10px; display: flex; align-items: center; gap: 8px;"><div class="loading-spinner"></div><span>正在加载...</span></div>'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    慢速加载示例(2秒延迟)
                </button>

                <!-- 自定义加载尺寸 -->
                <button
                    data-tooltip="http://localhost:3000/api/tooltip/json-content"
                    data-tooltip-placement="bottom"
                    data-tooltip-predict-size="400,200"
                    data-tooltip-loading='<div style="padding: 15px; text-align: center; color: #666;">🔄 加载中请稍候...</div>'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    自定义加载状态和尺寸
                </button>

                <!-- 带尺寸预测的加载 -->
                <button
                    data-tooltip="http://localhost:3000/api/tooltip/image-info"
                    data-tooltip-placement="right"
                    data-tooltip-predict-size="450,300"
                    data-tooltip-loading='<div style="padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div class="loading" style="width: 32px; height: 32px;"></div><span>获取图片信息...</span></div>'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    预测尺寸的加载
                </button>
            </div>

            <!-- 添加加载动画样式 -->
            <style>
                .loading-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                .loading {
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid #3498db;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            </style>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "演示带自定义加载状态的远程内容加载。使用 `data-tooltip-loading` 属性定义加载时显示的内容，使用 `data-tooltip-predict-size` 预设内容尺寸以优化用户体验。",
            },
        },
    },
};

export const 错误处理示例: Story = {
    name: "错误处理示例",
    render: () => html`
        <tooltip-demo>
            <div
                style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;"
            >
                <!-- 404 错误 -->
                <button
                    data-tooltip="http://localhost:3000/api/tooltip/status/404"
                    data-tooltip-placement="top"
                    data-tooltip-predict-size="300,100"
                    data-tooltip-loading='<div style="padding: 10px; color: #666;">⏳ 请求中...</div>'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    404 错误示例
                </button>

                <!-- 500 错误 -->
                <button
                    data-tooltip="http://localhost:3000/api/tooltip/status/500"
                    data-tooltip-placement="bottom"
                    data-tooltip-predict-size="300,100"
                    data-tooltip-loading='<div style="padding: 10px; color: #666;">⏳ 加载中...</div>'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    500 错误示例
                </button>

                <!-- 无效URL -->
                <button
                    data-tooltip="http://localhost:3000/api/tooltip/network-error"
                    data-tooltip-placement="right"
                    data-tooltip-predict-size="300,100"
                    data-tooltip-loading='<div style="padding: 10px; color: #666;">⏳ 连接中...</div>'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    网络错误示例
                </button>

                <!-- 空内容URL -->
                <button
                    data-tooltip="http://localhost:3000/api/tooltip/empty"
                    data-tooltip-placement="left"
                    data-tooltip-predict-size="200,80"
                    data-tooltip-loading='<div style="padding: 10px; color: #666;">⏳ 获取空内容...</div>'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    空内容示例
                </button>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "演示远程内容加载时的错误处理。当请求失败时，tooltip 会显示错误信息而不是崩溃。支持处理网络错误、HTTP错误状态码和空内容等情况。",
            },
        },
    },
};

export const 点击触发的远程内容: Story = {
    name: "点击触发的远程内容",
    render: () => html`
        <tooltip-demo>
            <div
                style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;"
            >
                <button
                    data-tooltip="http://localhost:3000/api/tooltip/post-detail"
                    data-tooltip-trigger="click"
                    data-tooltip-placement="top"
                    data-tooltip-predict-size="400,200"
                    data-tooltip-delay-hide="5000"
                    data-tooltip-loading='<div style="padding: 10px; display: flex; align-items: center; gap: 8px;"><div class="loading-spinner"></div><span>加载内容...</span></div>'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    点击加载文章
                </button>

                <button
                    data-tooltip="link://http://localhost:3000/api/tooltip/user-detail"
                    data-tooltip-trigger="click"
                    data-tooltip-placement="bottom"
                    data-tooltip-predict-size="350,250"
                    data-tooltip-delay-hide="8000"
                    data-tooltip-loading='<div style="padding: 15px; text-align: center; color: #666;">🔄 获取用户信息...</div>'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    点击获取用户信息(8秒后自动关闭)
                </button>

                <button
                    data-tooltip="http://localhost:3000/api/tooltip/uuid"
                    data-tooltip-trigger="click"
                    data-tooltip-placement="right"
                    data-tooltip-predict-size="300,120"
                    data-tooltip-delay-hide="3000"
                    data-tooltip-loading='<div style="padding: 12px; color: #666;">🎲 生成UUID...</div>'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    点击获取UUID(3秒后关闭)
                </button>
            </div>

            <style>
                .loading-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            </style>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "演示通过点击触发远程内容加载。使用 `data-tooltip-trigger='click'` 和 `data-tooltip-delay-hide` 控制显示行为，适合加载较重的远程内容。",
            },
        },
    },
};

export const 远程内容综合演示: Story = {
    name: "远程内容综合演示",
    render: () => html`
        <tooltip-demo>
            <div
                style="display: flex; flex-direction: column; gap: 30px; padding: 40px;"
            >
                <!-- 说明信息 -->
                <div
                    style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #007bff;"
                >
                    <h3 style="margin: 0 0 10px 0; color: #007bff;">
                        🌐 MSW 模拟内容加载功能
                    </h3>
                    <p style="margin: 0; font-size: 14px; color: #6c757d;">
                        TooltipController 支持通过以下方式加载 MSW 模拟内容：
                    </p>
                    <ul
                        style="margin: 10px 0 0 0; padding-left: 20px; font-size: 13px; color: #495057;"
                    >
                        <li>
                            <code
                                >data-tooltip="http://localhost:3000/..."</code
                            >
                            - HTTP 模拟内容
                        </li>
                        <li>
                            <code
                                >data-tooltip="link://http://localhost:3000/..."</code
                            >
                            - Link 协议模拟内容
                        </li>
                        <li>
                            <code
                                >data-tooltip-link="http://localhost:3000/..."</code
                            >
                            - Link 属性模拟内容
                        </li>
                    </ul>
                    <p
                        style="margin: 10px 0 0 0; font-size: 12px; color: #28a745; font-style: italic;"
                    >
                        💡 所有请求都被 MSW (Mock Service Worker)
                        拦截，返回模拟数据，无需真实服务器
                    </p>
                </div>

                <!-- 演示按钮组 -->
                <div
                    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;"
                >
                    <!-- 基础远程加载 -->
                    <div
                        style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;"
                    >
                        <h4
                            style="margin: 0 0 10px 0; color: #495057; font-size: 14px;"
                        >
                            基础远程加载
                        </h4>
                        <button
                            data-tooltip="http://localhost:3000/api/tooltip/post"
                            data-tooltip-placement="bottom"
                            data-tooltip-predict-size="380,200"
                            style="width: 100%; padding: 10px; border: 1px solid #007bff; border-radius: 4px; background: #007bff; color: white; cursor: pointer;"
                        >
                            📄 加载文章内容
                        </button>
                    </div>

                    <!-- 自定义加载状态 -->
                    <div
                        style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;"
                    >
                        <h4
                            style="margin: 0 0 10px 0; color: #495057; font-size: 14px;"
                        >
                            自定义加载状态
                        </h4>
                        <button
                            data-tooltip="http://localhost:3000/api/tooltip/delay"
                            data-tooltip-placement="top"
                            data-tooltip-predict-size="300,120"
                            data-tooltip-loading='<div style="padding: 12px; text-align: center;"><div style="width: 20px; height: 20px; border: 2px solid #e3e3e3; border-top: 2px solid #007bff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div><div style="margin-top: 8px; font-size: 12px; color: #666;">正在获取数据...</div></div>'
                            style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 4px; background: #28a745; color: white; cursor: pointer;"
                        >
                            ⏳ 带加载动画
                        </button>
                    </div>

                    <!-- 点击触发 -->
                    <div
                        style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;"
                    >
                        <h4
                            style="margin: 0 0 10px 0; color: #495057; font-size: 14px;"
                        >
                            点击触发模式
                        </h4>
                        <button
                            data-tooltip="link://http://localhost:3000/api/tooltip/comment"
                            data-tooltip-trigger="click"
                            data-tooltip-placement="right"
                            data-tooltip-predict-size="350,180"
                            data-tooltip-delay-hide="6000"
                            data-tooltip-loading='<div style="padding: 15px; text-align: center; color: #28a745;">💬 获取评论中...</div>'
                            style="width: 100%; padding: 10px; border: 1px solid #ffc107; border-radius: 4px; background: #ffc107; color: #212529; cursor: pointer;"
                        >
                            💬 点击查看评论
                        </button>
                    </div>

                    <!-- 错误处理 -->
                    <div
                        style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;"
                    >
                        <h4
                            style="margin: 0 0 10px 0; color: #495057; font-size: 14px;"
                        >
                            错误处理示例
                        </h4>
                        <button
                            data-tooltip="http://localhost:3000/api/tooltip/status/404"
                            data-tooltip-placement="left"
                            data-tooltip-predict-size="250,80"
                            data-tooltip-loading='<div style="padding: 8px; color: #dc3545;">⚠️ 检查链接...</div>'
                            style="width: 100%; padding: 10px; border: 1px solid #dc3545; border-radius: 4px; background: #dc3545; color: white; cursor: pointer;"
                        >
                            ❌ 模拟404错误
                        </button>
                    </div>
                </div>

                <!-- 特性说明 -->
                <div
                    style="background: #e9ecef; padding: 15px; border-radius: 6px;"
                >
                    <h4
                        style="margin: 0 0 10px 0; color: #495057; font-size: 14px;"
                    >
                        🔧 配置选项
                    </h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; font-size: 12px;"
                    >
                        <div>
                            <strong>data-tooltip-predict-size:</strong>
                            <div style="color: #6c757d;">
                                预测内容尺寸 "width,height"
                            </div>
                        </div>
                        <div>
                            <strong>data-tooltip-loading:</strong>
                            <div style="color: #6c757d;">
                                自定义加载状态HTML
                            </div>
                        </div>
                        <div>
                            <strong>data-tooltip-trigger:</strong>
                            <div style="color: #6c757d;">
                                触发方式 "mouseover"|"click"
                            </div>
                        </div>
                        <div>
                            <strong>data-tooltip-delay-hide:</strong>
                            <div style="color: #6c757d;">
                                延迟隐藏时间(毫秒)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "综合展示 TooltipController 远程内容加载的完整功能，包括不同的URL格式、加载状态、错误处理和配置选项。",
            },
        },
    },
};
