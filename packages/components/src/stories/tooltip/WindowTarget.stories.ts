import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./TooltipDemo";

const meta: Meta = {
    title: "控制器/Tooltip/窗口目标定位",
    tags: ["autodocs"],
    render: () => html`<tooltip-demo></tooltip-demo>`,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "演示使用 target='window' 将提示框定位到窗口边缘的特殊场景,适用于全局通知、固定位置提示等用例。",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

export const 窗口顶部定位: Story = {
    name: "窗口顶部定位",
    render: () => html`
        <tooltip-demo>
            <style>
                .window-target-demo {
                    padding: 60px;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 30px;
                }
                .demo-content {
                    text-align: center;
                    max-width: 600px;
                }
                .trigger-button {
                    padding: 14px 28px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600;
                    transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                }
                .trigger-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
                }
                .info-box {
                    background: #f8f9fa;
                    border-left: 4px solid #667eea;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 4px;
                    text-align: left;
                }
                .info-box h4 {
                    margin: 0 0 10px 0;
                    color: #667eea;
                }
                .info-box p {
                    margin: 5px 0;
                    color: #495057;
                    line-height: 1.6;
                }
            </style>

            <div class="window-target-demo">
                <div class="demo-content">
                    <h2>窗口目标定位示例</h2>
                    <p>使用 target="window" 将提示框定位到窗口边缘</p>

                    <div class="info-box">
                        <h4>💡 使用场景</h4>
                        <p>• 全局通知消息</p>
                        <p>• 固定位置的操作提示</p>
                        <p>• 窗口级别的状态指示</p>
                        <p>• 始终可见的重要提醒</p>
                    </div>

                    <button
                        class="trigger-button"
                        data-tooltip="这是一个定位到窗口顶部的提示框"
                        data-tooltip-target="window"
                        data-tooltip-placement="bottom"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="click"
                    >
                        显示窗口顶部提示
                    </button>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "通过设置 target='window'，提示框会定位到窗口顶部。适用于需要在页面顶部显示全局通知或提醒的场景。",
            },
        },
    },
};

export const 窗口底部定位: Story = {
    name: "窗口底部定位",
    render: () => html`
        <tooltip-demo>
            <style>
                .window-bottom-demo {
                    padding: 60px;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 30px;
                }
                .notification-card {
                    background: white;
                    border-radius: 12px;
                    padding: 30px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                    max-width: 500px;
                    text-align: center;
                }
                .notification-card h3 {
                    margin: 0 0 15px 0;
                    color: #333;
                }
                .notification-card p {
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 25px;
                }
                .action-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .action-btn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s;
                }
                .btn-success {
                    background: #28a745;
                    color: white;
                }
                .btn-info {
                    background: #17a2b8;
                    color: white;
                }
                .btn-warning {
                    background: #ffc107;
                    color: #212529;
                }
                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
            </style>

            <div class="window-bottom-demo">
                <div class="notification-card">
                    <h3>窗口底部通知</h3>
                    <p>点击下方按钮,提示框将显示在窗口底部。这种布局模式模仿了常见的 toast 通知系统。</p>

                    <div class="action-buttons">
                        <button
                            class="action-btn btn-success"
                            data-tooltip="✅ 操作成功完成！"
                            data-tooltip-target="window"
                            data-tooltip-placement="top"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="click"
                            data-tooltip-delay-hide="2000"
                        >
                            成功通知
                        </button>

                        <button
                            class="action-btn btn-info"
                            data-tooltip="ℹ️ 这是一条信息提示"
                            data-tooltip-target="window"
                            data-tooltip-placement="top"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="click"
                            data-tooltip-delay-hide="2000"
                        >
                            信息提示
                        </button>

                        <button
                            class="action-btn btn-warning"
                            data-tooltip="⚠️ 请注意这条警告信息"
                            data-tooltip-target="window"
                            data-tooltip-placement="top"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="click"
                            data-tooltip-delay-hide="2000"
                        >
                            警告提醒
                        </button>
                    </div>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "提示框定位到窗口底部，配合自动隐藏功能，可以实现类似 toast 通知的效果。适用于临时通知和状态反馈。",
            },
        },
    },
};

export const 窗口左侧定位: Story = {
    name: "窗口左侧定位",
    render: () => html`
        <tooltip-demo>
            <style>
                .window-left-demo {
                    padding: 60px;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 30px;
                }
                .feature-list {
                    background: white;
                    border-radius: 12px;
                    padding: 40px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                }
                .feature-list h2 {
                    margin: 0 0 30px 0;
                    text-align: center;
                    color: #333;
                }
                .feature-item {
                    display: flex;
                    align-items: center;
                    padding: 20px;
                    margin: 15px 0;
                    background: #f8f9fa;
                    border-radius: 8px;
                    transition: all 0.3s;
                    cursor: pointer;
                }
                .feature-item:hover {
                    background: #e9ecef;
                    transform: translateX(5px);
                }
                .feature-icon {
                    font-size: 24px;
                    margin-right: 15px;
                }
                .feature-text h4 {
                    margin: 0 0 5px 0;
                    color: #333;
                }
                .feature-text p {
                    margin: 0;
                    color: #666;
                    font-size: 14px;
                }
            </style>

            <div class="window-left-demo">
                <div class="feature-list">
                    <h2>功能特性列表</h2>
                    <p style="text-align: center; color: #666; margin-bottom: 30px;">
                        将鼠标悬停在功能项上，查看详细说明
                    </p>

                    <div
                        class="feature-item"
                        data-tooltip="智能定位系统可以自动检测窗口边界，确保提示框始终可见"
                        data-tooltip-target="window"
                        data-tooltip-placement="right"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        <span class="feature-icon">🎯</span>
                        <div class="feature-text">
                            <h4>智能定位</h4>
                            <p>自动检测边界并调整位置</p>
                        </div>
                    </div>

                    <div
                        class="feature-item"
                        data-tooltip="完全响应式设计，适配各种屏幕尺寸和设备类型"
                        data-tooltip-target="window"
                        data-tooltip-placement="right"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        <span class="feature-icon">📱</span>
                        <div class="feature-text">
                            <h4>响应式设计</h4>
                            <p>完美适配各种设备</p>
                        </div>
                    </div>

                    <div
                        class="feature-item"
                        data-tooltip="支持自定义主题、样式和动画效果，满足个性化需求"
                        data-tooltip-target="window"
                        data-tooltip-placement="right"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        <span class="feature-icon">🎨</span>
                        <div class="feature-text">
                            <h4>高度可定制</h4>
                            <p>自定义样式和主题</p>
                        </div>
                    </div>

                    <div
                        class="feature-item"
                        data-tooltip="内置多种动画效果和平滑过渡，提升用户体验"
                        data-tooltip-target="window"
                        data-tooltip-placement="right"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        <span class="feature-icon">✨</span>
                        <div class="feature-text">
                            <h4>流畅动画</h4>
                            <p>优雅的过渡效果</p>
                        </div>
                    </div>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "提示框定位到窗口左侧，适合显示功能特性、菜单项说明等侧边栏类型的内容。",
            },
        },
    },
};

export const 窗口右侧定位: Story = {
    name: "窗口右侧定位",
    render: () => html`
        <tooltip-demo>
            <style>
                .window-right-demo {
                    padding: 60px;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 30px;
                }
                .card-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 25px;
                    max-width: 900px;
                }
                .info-card {
                    background: white;
                    border-radius: 12px;
                    padding: 25px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s;
                    cursor: pointer;
                    border-top: 4px solid #667eea;
                }
                .info-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
                }
                .info-card h3 {
                    margin: 0 0 15px 0;
                    color: #333;
                    font-size: 18px;
                }
                .info-card p {
                    color: #666;
                    line-height: 1.6;
                    margin: 0;
                    font-size: 14px;
                }
                .card-icon {
                    font-size: 32px;
                    margin-bottom: 15px;
                }
            </style>

            <div class="window-right-demo">
                <h2 style="text-align: center; color: #333;">产品信息卡片</h2>
                <p style="text-align: center; color: #666;">悬停卡片查看详细信息</p>

                <div class="card-container">
                    <div
                        class="info-card"
                        data-tooltip="我们的产品采用最新的技术栈，确保高性能和稳定性，适合各种规模的项目使用。"
                        data-tooltip-target="window"
                        data-tooltip-placement="left"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        <div class="card-icon">🚀</div>
                        <h3>高性能</h3>
                        <p>采用最新技术栈，确保系统运行流畅高效</p>
                    </div>

                    <div
                        class="info-card"
                        data-tooltip="我们注重安全性，采用多层加密和严格的权限管理，保护您的数据安全。"
                        data-tooltip-target="window"
                        data-tooltip-placement="left"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        <div class="card-icon">🔒</div>
                        <h3>安全可靠</h3>
                        <p>多层加密保护，确保数据安全无忧</p>
                    </div>

                    <div
                        class="info-card"
                        data-tooltip="提供专业的技术支持团队，7x24小时在线，随时解决您的问题。"
                        data-tooltip-target="window"
                        data-tooltip-placement="left"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        <div class="card-icon">💬</div>
                        <h3>专业支持</h3>
                        <p>7x24小时技术支持，快速响应解决问题</p>
                    </div>

                    <div
                        class="info-card"
                        data-tooltip="灵活的定价方案，支持按需付费，帮助您优化成本，获得最佳性价比。"
                        data-tooltip-target="window"
                        data-tooltip-placement="left"
                        data-tooltip-arrow="true"
                        data-tooltip-trigger="mouseover"
                    >
                        <div class="card-icon">💰</div>
                        <h3>成本优化</h3>
                        <p>灵活定价方案，按需付费更经济</p>
                    </div>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "提示框定位到窗口右侧，适合展示卡片、列表项的详细信息，保持界面整洁。",
            },
        },
    },
};

export const 实际应用场景: Story = {
    name: "实际应用场景",
    render: () => html`
        <tooltip-demo>
            <style>
                .real-world-demo {
                    padding: 40px;
                    min-height: 100vh;
                }
                .dashboard {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .dashboard-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px;
                    border-radius: 12px;
                    margin-bottom: 30px;
                    text-align: center;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }
                .stat-card {
                    background: white;
                    padding: 25px;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                    text-align: center;
                    transition: all 0.3s;
                    cursor: pointer;
                }
                .stat-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
                }
                .stat-number {
                    font-size: 36px;
                    font-weight: bold;
                    color: #667eea;
                    margin-bottom: 10px;
                }
                .stat-label {
                    color: #666;
                    font-size: 14px;
                }
                .action-bar {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                .action-btn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s;
                    color: white;
                }
                .btn-primary { background: #667eea; }
                .btn-success { background: #28a745; }
                .btn-danger { background: #dc3545; }
                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
            </style>

            <div class="real-world-demo">
                <div class="dashboard">
                    <div class="dashboard-header">
                        <h1 style="margin: 0;">数据分析仪表板</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">
                            使用 target='window' 实现全局通知系统
                        </p>
                    </div>

                    <div class="stats-grid">
                        <div
                            class="stat-card"
                            data-tooltip="总访问量比上月增长 23%，主要来自移动端用户"
                            data-tooltip-target="window"
                            data-tooltip-placement="bottom"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="mouseover"
                        >
                            <div class="stat-number">12.5K</div>
                            <div class="stat-label">总访问量</div>
                        </div>

                        <div
                            class="stat-card"
                            data-tooltip="新增用户数提升 15%，转化率达到 8.5%"
                            data-tooltip-target="window"
                            data-tooltip-placement="bottom"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="mouseover"
                        >
                            <div class="stat-number">3.2K</div>
                            <div class="stat-label">新增用户</div>
                        </div>

                        <div
                            class="stat-card"
                            data-tooltip="总收入超过目标 18%，其中订阅收入占 65%"
                            data-tooltip-target="window"
                            data-tooltip-placement="bottom"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="mouseover"
                        >
                            <div class="stat-number">$45.2K</div>
                            <div class="stat-label">月度收入</div>
                        </div>

                        <div
                            class="stat-card"
                            data-tooltip="用户满意度评分提升，积极反馈占比 89%"
                            data-tooltip-target="window"
                            data-tooltip-placement="bottom"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="mouseover"
                        >
                            <div class="stat-number">4.8</div>
                            <div class="stat-label">满意度评分</div>
                        </div>
                    </div>

                    <div class="action-bar">
                        <button
                            class="action-btn btn-primary"
                            data-tooltip="导出数据报表为 PDF 格式"
                            data-tooltip-target="window"
                            data-tooltip-placement="top"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="click"
                        >
                            📊 导出报表
                        </button>

                        <button
                            class="action-btn btn-success"
                            data-tooltip="刷新数据将获取最新的统计信息"
                            data-tooltip-target="window"
                            data-tooltip-placement="top"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="click"
                        >
                            🔄 刷新数据
                        </button>

                        <button
                            class="action-btn btn-danger"
                            data-tooltip="重置所有筛选条件到默认状态"
                            data-tooltip-target="window"
                            data-tooltip-placement="top"
                            data-tooltip-arrow="true"
                            data-tooltip-trigger="click"
                        >
                            🔃 重置筛选
                        </button>
                    </div>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "综合演示：在数据分析仪表板中使用 target='window' 实现全局级别的提示和通知系统，确保重要信息始终可见。",
            },
        },
    },
};
