import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './TooltipDemo'

const meta: Meta = {
    title: '控制器/Tooltip/JSON对象配置',
    tags: ['autodocs'],
    render: () => html`<tooltip-demo></tooltip-demo>`,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                story: '演示如何使用 data-tooltip 属性传递 JSON 对象配置，同时设置内容和选项。',
            },
        },
    },
}

export default meta
type Story = StoryObj

export const JSON对象配置基础示例: Story = {
    name: 'JSON对象配置基础示例',
    render: () => html`
        <tooltip-demo>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
                <button
                    data-tooltip='{content:"这是JSON配置的提示内容",placement:"bottom",arrow:true}'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    JSON配置 - 底部显示
                </button>

                <button
                    data-tooltip='{content:"<b>加粗内容</b>和<i>斜体</i>",placement:"right",animationDuration:300}'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    JSON配置 - 右侧显示
                </button>

                <button
                    data-tooltip='{content:"延迟2秒隐藏",trigger:"click",delayHide:2000}'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    JSON配置 - 点击触发
                </button>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: '使用 data-tooltip 属性传递 JSON 对象，支持宽松 JSON 语法（无需给键名加引号）。可以同时配置内容和各种选项。',
            },
        },
    },
}

export const JSON对象与单独属性混合: Story = {
    name: 'JSON对象与单独属性混合',
    render: () => html`
        <tooltip-demo>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
                <button
                    data-tooltip='{content:"JSON中的内容",placement:"top"}'
                    data-tooltip-arrow="false"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    JSON + data-tooltip-arrow
                </button>

                <button
                    data-tooltip='{content:"基础内容",placement:"left"}'
                    data-tooltip-placement="right"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    JSON + data-tooltip-placement
                </button>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: 'JSON 对象配置优先级高于单独的 data-tooltip-* 属性。可以混合使用，JSON 对象中的配置会覆盖单独属性的值。',
            },
        },
    },
}

export const 复杂JSON配置: Story = {
    name: '复杂JSON配置',
    render: () => html`
        <tooltip-demo>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
                <button
                    data-tooltip='{content:"<div style=\"padding:10px;background:#f0f0f0;border-radius:4px;\"><h4 style=\"margin:0 0 8px 0;\">📋 复杂内容</h4><p style=\"margin:0;font-size:13px;\">支持复杂的HTML内容和样式配置</p></div>",placement:"top",animationDuration:200,offset:[0,8]}'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    复杂样式配置
                </button>

                <button
                    data-tooltip='{content:"自定义尺寸的提示框",placement:"bottom",size:[300,150]}'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    自定义尺寸
                </button>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: 'JSON 对象支持所有 tooltip 选项配置，包括尺寸、偏移、动画时长等。',
            },
        },
    },
}

export const 优先级演示: Story = {
    name: '优先级演示',
    render: () => html`
        <tooltip-demo>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
                <!-- 只有 JSON 配置 -->
                <button
                    data-tooltip='{content:"只有JSON",placement:"top"}'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    只有JSON配置
                </button>

                <!-- JSON + tooltipOptions -->
                <button
                    data-tooltip='{content:"JSON内容",placement:"bottom"}'
                    data-tooltip-options='{"placement":"left","arrow":false}'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    JSON + tooltipOptions
                </button>

                <!-- JSON + 单独属性 -->
                <button
                    data-tooltip='{content:"JSON内容",placement:"right"}'
                    data-tooltip-placement="left"
                    data-tooltip-arrow="false"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    JSON + 单独属性
                </button>

                <!-- 全部混合 -->
                <button
                    data-tooltip='{content:"JSON内容",placement:"top",arrow:true}'
                    data-tooltip-options='{"placement":"bottom","arrow":false}'
                    data-tooltip-placement="right"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    全部混合（JSON优先）
                </button>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: '演示配置优先级：data-tooltip JSON 对象 > tooltipOptions > data-tooltip-* 单独属性。JSON 对象中的配置具有最高优先级。',
            },
        },
    },
}

export const 错误处理: Story = {
    name: '错误处理',
    render: () => html`
        <tooltip-demo>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
                <!-- 无效的 JSON -->
                <button
                    data-tooltip='{content:"无效的 JSON"'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    无效JSON（当作普通内容）
                </button>

                <!-- 空的 JSON 对象 -->
                <button
                    data-tooltip='{}'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    空JSON对象（无内容）
                </button>

                <!-- 只有 { 没有 } -->
                <button
                    data-tooltip='{这是普通文本内容}'
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    不完整括号（当作普通内容）
                </button>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: '演示错误处理：如果 JSON 解析失败，data-tooltip 的值会被当作普通内容字符串处理。',
            },
        },
    },
}

export const 实际应用场景: Story = {
    name: '实际应用场景',
    render: () => html`
        <tooltip-demo>
            <div style="display: flex; flex-direction: column; gap: 20px; padding: 40px;">
                <!-- 用户信息卡片 -->
                <div style="display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa;">
                    <div
                        style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;"
                    >
                        JD
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: bold; margin-bottom: 4px;">John Doe</div>
                        <div style="font-size: 13px; color: #666;">john.doe@example.com</div>
                    </div>
                    <button
                        data-tooltip='{content:"<div style=\"padding:8px;\"><div style=\"font-weight:bold;margin-bottom:8px;\">👤 用户详情</div><div style=\"font-size:13px;\"><div>• 角色：管理员</div><div>• 部门：技术部</div><div>• 状态：在线</div></div></div>",placement:"left",trigger:"click",delayHide:5000}'
                        style="padding: 6px 12px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer; font-size: 13px;"
                    >
                        查看详情
                    </button>
                </div>

                <!-- 操作按钮组 -->
                <div style="display: flex; gap: 10px;">
                    <button
                        data-tooltip='{content:"<div style=\"color:#dc3545;\">⚠️ 此操作将永久删除数据，无法恢复！</div>",placement:"bottom",animationDuration:200}'
                        style="padding: 8px 16px; border: 1px solid #dc3545; border-radius: 4px; background: #dc3545; color: white; cursor: pointer;"
                    >
                        删除
                    </button>

                    <button
                        data-tooltip='{content:"💾 保存当前更改到服务器",placement:"top"}'
                        style="padding: 8px 16px; border: 1px solid #28a745; border-radius: 4px; background: #28a745; color: white; cursor: pointer;"
                    >
                        保存
                    </button>

                    <button
                        data-tooltip='{content:"<div style=\"padding:8px;\"><strong>📤 导出选项：</strong><div style=\"font-size:12px;margin-top:4px;\">• PDF 格式<br/>• Excel 格式<br/>• CSV 格式</div></div>",placement:"bottom",trigger:"click"}'
                        style="padding: 8px 16px; border: 1px solid #007bff; border-radius: 4px; background: #007bff; color: white; cursor: pointer;"
                    >
                        导出
                    </button>
                </div>

                <!-- 表格操作 -->
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <thead>
                        <tr style="background: #f5f5f5;">
                            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">产品名称</th>
                            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">价格</th>
                            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">库存</th>
                            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;">
                                <span
                                    data-tooltip='{content:"<div style=\"padding:8px;\"><strong>📦 产品详情</strong><div style=\"font-size:12px;margin-top:4px;\">SKU: PROD-001<br/>分类：电子产品<br/>品牌：TechCorp</div></div>",placement:"right",trigger:"click"}'
                                    style="cursor: help; border-bottom: 1px dashed #999;"
                                >
                                    iPhone 15 Pro
                                </span>
                            </td>
                            <td style="padding: 10px; border: 1px solid #ddd;">¥7,999</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">
                                <span
                                    data-tooltip='{content:"库存充足，可以正常发货",placement:"top",arrow:false}'
                                    style="color: #28a745; font-weight: bold;"
                                >
                                    ✓ 156
                                </span>
                            </td>
                            <td style="padding: 10px; border: 1px solid #ddd;">
                                <button
                                    data-tooltip='{content:"编辑产品信息",placement:"top"}'
                                    style="padding: 4px 8px; font-size: 12px; cursor: pointer;"
                                >
                                    编辑
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: '展示 JSON 配置在实际应用场景中的使用：用户信息卡片、操作按钮、表格数据提示等。JSON 配置让 tooltip 内容和样式更加灵活。',
            },
        },
    },
}

export const 性能优化示例: Story = {
    name: '性能优化示例',
    render: () => html`
        <tooltip-demo>
            <div style="padding: 40px;">
                <h3 style="margin-top: 0;">性能优化说明</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px; font-size: 14px; line-height: 1.6;">
                    <p style="margin: 0 0 10px 0;">
                        <strong>🚀 性能优化机制：</strong>
                    </p>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li>先检查字符串格式（<code>{</code> 开头、<code>}</code> 结尾）</li>
                        <li>只有符合格式才尝试 JSON 解析</li>
                        <li>解析失败自动降级为普通内容处理</li>
                        <li>避免对普通内容字符串进行不必要的解析</li>
                    </ul>
                </div>

                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <button
                        data-tooltip='简单文本提示'
                        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        普通文本（不会解析JSON）
                    </button>

                    <button
                        data-tooltip='{这是以花括号开头的内容}'
                        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        不完整JSON（不会解析）
                    </button>

                    <button
                        data-tooltip='{content:"有效的JSON对象",placement:"bottom"}'
                        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        有效JSON（会解析）
                    </button>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: '演示性能优化机制：通过快速格式检查避免不必要的 JSON 解析，确保对普通文本内容的性能影响最小化。',
            },
        },
    },
}
