import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./TooltipDemo";

const meta: Meta = {
    title: "控制器/Tooltip/目标定位",
    tags: ["autodocs"],
    render: () => html`<tooltip-demo></tooltip-demo>`,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "演示如何使用 target 属性指定提示框的目标元素，实现基于其他元素的位置计算。",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

export const 基础目标定位: Story = {
    name: "基础目标定位",
    render: () => html`
        <tooltip-demo>
            <style>
                .target-demo {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    align-items: center;
                }
                .target-container {
                    position: relative;
                    width: 300px;
                    height: 150px;
                    border: 2px solid #007bff;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 20px 0;
                }
                .target-label {
                    font-size: 18px;
                    font-weight: 600;
                    color: #007bff;
                }
                .trigger-button {
                    padding: 10px 16px;
                    background: #28a745;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    margin: 10px;
                    transition: all 0.2s;
                }
                .trigger-button:hover {
                    background: #218838;
                    transform: translateY(-1px);
                }
                .description {
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                    margin-top: 20px;
                }
            </style>

            <div class="target-demo">
                <div class="description">
                    点击按钮，提示框将基于蓝色目标容器定位显示
                </div>

                <!-- 目标容器 -->
                <div id="target-box" class="target-container">
                    <span class="target-label">目标容器</span>
                </div>

                <!-- 触发按钮 -->
                <button
                    class="trigger-button"
                    data-tooltip="这个提示框基于目标容器定位"
                    data-tooltip-target="#target-box"
                    data-tooltip-placement="top"
                    data-tooltip-arrow="true"
                    data-tooltip-trigger="click"
                >
                    上方显示提示框
                </button>

                <button
                    class="trigger-button"
                    data-tooltip="提示框位于目标容器下方"
                    data-tooltip-target="#target-box"
                    data-tooltip-placement="bottom"
                    data-tooltip-arrow="true"
                    data-tooltip-trigger="click"
                >
                    下方显示提示框
                </button>

                <button
                    class="trigger-button"
                    data-tooltip="提示框在目标容器左侧"
                    data-tooltip-target="#target-box"
                    data-tooltip-placement="left"
                    data-tooltip-arrow="true"
                    data-tooltip-trigger="click"
                >
                    左侧显示提示框
                </button>

                <button
                    class="trigger-button"
                    data-tooltip="提示框在目标容器右侧"
                    data-tooltip-target="#target-box"
                    data-tooltip-placement="right"
                    data-tooltip-arrow="true"
                    data-tooltip-trigger="click"
                >
                    右侧显示提示框
                </button>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "使用 `data-tooltip-target` 属性指定目标元素选择器，提示框将基于该目标元素计算位置，而不是基于触发元素本身。",
            },
        },
    },
};

export const 多个触发器同一目标: Story = {
    name: "多个触发器同一目标",
    render: () => html`
        <tooltip-demo>
            <style>
                .multi-trigger-demo {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }
                .main-target {
                    position: relative;
                    width: 400px;
                    height: 200px;
                    border: 3px solid #6f42c1;
                    border-radius: 12px;
                    background: linear-gradient(45deg, #f8f9fa, #e9ecef);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 25px rgba(111, 66, 193, 0.2);
                }
                .main-target h3 {
                    color: #6f42c1;
                    margin: 0;
                    font-size: 24px;
                }
                .triggers-row {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .info-button {
                    padding: 8px 14px;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 500;
                    transition: all 0.3s;
                    color: white;
                }
                .info-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
                .info-btn-primary { background: #007bff; }
                .info-btn-success { background: #28a745; }
                .info-btn-warning { background: #ffc107; color: #212529; }
                .info-btn-danger { background: #dc3545; }
                .info-btn-info { background: #17a2b8; }
            </style>

            <div class="multi-trigger-demo">
                <!-- 主要目标元素 -->
                <div id="main-content" class="main-target">
                    <h3>主要内容区域</h3>
                </div>

                <!-- 多个触发按钮 -->
                <div class="triggers-row">
                    <button
                        class="info-button info-btn-primary"
                        data-tooltip="这是一个主要内容区域，包含了重要的信息和功能"
                        data-tooltip-target="#main-content"
                        data-tooltip-placement="top"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        查看信息
                    </button>

                    <button
                        class="info-button info-btn-success"
                        data-tooltip="操作成功！内容已保存到主要内容区域"
                        data-tooltip-target="#main-content"
                        data-tooltip-placement="right"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        成功状态
                    </button>

                    <button
                        class="info-button info-btn-warning"
                        data-tooltip="⚠️ 警告：此操作将影响主要内容区域的数据"
                        data-tooltip-target="#main-content"
                        data-tooltip-placement="bottom"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        警告提示
                    </button>

                    <button
                        class="info-button info-btn-danger"
                        data-tooltip="❌ 错误：无法访问主要内容区域，请检查权限"
                        data-tooltip-target="#main-content"
                        data-tooltip-placement="left"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        错误信息
                    </button>

                    <button
                        class="info-button info-btn-info"
                        data-tooltip="💡 提示：双击主要内容区域可以快速编辑"
                        data-tooltip-target="#main-content"
                        data-tooltip-placement="top-start"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        使用提示
                    </button>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "多个不同的触发元素可以指向同一个目标元素，每个触发器可以显示不同的提示内容，但都基于同一个目标进行定位。",
            },
        },
    },
};

export const 动态目标选择: Story = {
    name: "动态目标选择",
    render: () => html`
        <tooltip-demo>
            <style>
                .dynamic-demo {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }
                .targets-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                }
                .target-box {
                    height: 120px;
                    border: 2px solid;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .target-box:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                .target-red {
                    background: #ffebee;
                    border-color: #f44336;
                    color: #f44336;
                }
                .target-green {
                    background: #e8f5e8;
                    border-color: #4caf50;
                    color: #4caf50;
                }
                .target-blue {
                    background: #e3f2fd;
                    border-color: #2196f3;
                    color: #2196f3;
                }
                .target-orange {
                    background: #fff3e0;
                    border-color: #ff9800;
                    color: #ff9800;
                }
                .controls {
                    text-align: center;
                    margin: 20px 0;
                }
                .select-button {
                    padding: 12px 24px;
                    margin: 0 10px;
                    border: none;
                    border-radius: 6px;
                    background: #673ab7;
                    color: white;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s;
                }
                .select-button:hover {
                    background: #512da8;
                    transform: translateY(-1px);
                }
                .select-button.active {
                    background: #311b92;
                    box-shadow: 0 2px 8px rgba(103, 58, 183, 0.4);
                }
                .current-selection {
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                    margin: 15px 0;
                }
            </style>

            <div class="dynamic-demo">
                <div class="controls">
                    <button
                        class="select-button active"
                        data-tooltip="选择红色目标作为定位基准"
                        data-tooltip-target="#red-target"
                        data-tooltip-placement="top"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        选择红色目标
                    </button>

                    <button
                        class="select-button"
                        data-tooltip="选择绿色目标作为定位基准"
                        data-tooltip-target="#green-target"
                        data-tooltip-placement="top"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        选择绿色目标
                    </button>

                    <button
                        class="select-button"
                        data-tooltip="选择蓝色目标作为定位基准"
                        data-tooltip-target="#blue-target"
                        data-tooltip-placement="top"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        选择蓝色目标
                    </button>

                    <button
                        class="select-button"
                        data-tooltip="选择橙色目标作为定位基准"
                        data-tooltip-target="#orange-target"
                        data-tooltip-placement="top"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        选择橙色目标
                    </button>
                </div>

                <div class="current-selection">
                    提示框将基于您选择的目标元素进行定位
                </div>

                <div class="targets-container">
                    <div id="red-target" class="target-box target-red">
                        红色目标
                    </div>
                    <div id="green-target" class="target-box target-green">
                        绿色目标
                    </div>
                    <div id="blue-target" class="target-box target-blue">
                        蓝色目标
                    </div>
                    <div id="orange-target" class="target-box target-orange">
                        橙色目标
                    </div>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "演示如何动态选择不同的目标元素。每个按钮使用不同的 `data-tooltip-target` 值来指定相应的目标元素。",
            },
        },
    },
};

export const 复杂布局应用: Story = {
    name: "复杂布局应用",
    render: () => html`
        <tooltip-demo>
            <style>
                .complex-demo {
                    padding: 40px;
                }
                .dashboard {
                    display: grid;
                    grid-template-columns: 250px 1fr;
                    gap: 20px;
                    min-height: 400px;
                }
                .sidebar {
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 20px;
                    border: 1px solid #dee2e6;
                }
                .main-content {
                    display: grid;
                    grid-template-rows: auto 1fr auto;
                    gap: 20px;
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                }
                .content-area {
                    background: #fff;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    padding: 20px;
                    min-height: 200px;
                }
                .footer {
                    background: #e9ecef;
                    padding: 15px 20px;
                    border-radius: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .nav-item {
                    padding: 10px 15px;
                    margin: 5px 0;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: #495057;
                    font-size: 14px;
                }
                .nav-item:hover {
                    background: #e9ecef;
                }
                .action-button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 13px;
                    transition: all 0.2s;
                }
                .btn-primary {
                    background: #007bff;
                    color: white;
                }
                .btn-success {
                    background: #28a745;
                    color: white;
                }
                .btn-warning {
                    background: #ffc107;
                    color: #212529;
                }
                .action-button:hover {
                    transform: translateY(-1px);
                    opacity: 0.9;
                }
            </style>

            <div class="complex-demo">
                <div class="dashboard">
                    <!-- 侧边栏 -->
                    <div class="sidebar">
                        <h4 style="margin-top: 0;">导航菜单</h4>
                        <div
                            class="nav-item"
                            data-tooltip="显示主内容区域的详细信息"
                            data-tooltip-target=".content-area"
                            data-tooltip-placement="right"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="mouseover"
                        >
                            📊 仪表板
                        </div>
                        <div
                            class="nav-item"
                            data-tooltip="查看和管理用户数据"
                            data-tooltip-target=".content-area"
                            data-tooltip-placement="right"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="mouseover"
                        >
                            👥 用户管理
                        </div>
                        <div
                            class="nav-item"
                            data-tooltip="系统设置和配置选项"
                            data-tooltip-target=".content-area"
                            data-tooltip-placement="right"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="mouseover"
                        >
                            ⚙️ 系统设置
                        </div>
                        <div
                            class="nav-item"
                            data-tooltip="查看数据分析和报表"
                            data-tooltip-target=".content-area"
                            data-tooltip-placement="right"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="mouseover"
                        >
                            📈 数据分析
                        </div>
                    </div>

                    <!-- 主内容区 -->
                    <div class="main-content">
                        <!-- 头部 -->
                        <div class="header">
                            <h2 style="margin: 0;">控制面板头部</h2>
                            <p style="margin: 5px 0 0 0; opacity: 0.9;">主内容区域的标题和描述</p>
                        </div>

                        <!-- 内容区域 -->
                        <div class="content-area">
                            <h3>主要内容区域</h3>
                            <p>这是应用程序的主要内容显示区域。将鼠标悬停在侧边栏的菜单项上，提示框会基于这个内容区域进行定位。</p>
                            <br>
                            <p>这种设计模式在复杂的仪表板应用中非常有用，可以让用户明确知道每个操作会影响哪个界面区域。</p>
                        </div>

                        <!-- 底部操作栏 -->
                        <div class="footer">
                            <button
                                class="action-button btn-primary"
                                data-tooltip="保存当前内容的所有更改"
                                data-tooltip-target=".content-area"
                                data-tooltip-placement="top"
                                data-tooltip-arrow="true"
                                data-tooltip-trigger="mouseover"
                            >
                                💾 保存
                            </button>
                            <button
                                class="action-button btn-success"
                                data-tooltip="应用设置到主内容区域"
                                data-tooltip-target=".content-area"
                                data-tooltip-placement="top"
                                data-tooltip-arrow="true"
                                data-tooltip-trigger="mouseover"
                            >
                                ✅ 应用
                            </button>
                            <button
                                class="action-button btn-warning"
                                data-tooltip="重置主内容区域到默认状态"
                                data-tooltip-target=".content-area"
                                data-tooltip-placement="top"
                                data-tooltip-arrow="true"
                                data-tooltip-trigger="mouseover"
                            >
                                🔄 重置
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "在复杂布局中，使用 target 属性可以让提示框基于相关的界面元素进行定位，提供更好的用户体验和视觉引导。",
            },
        },
    },
};