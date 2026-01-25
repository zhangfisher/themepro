import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './TooltipDemo'

const meta: Meta = {
    title: '控制器/Tooltip/默认Slot内容',
    tags: ['autodocs'],
    render: () => html`<tooltip-demo></tooltip-demo>`,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                story: "演示如何使用默认 slot(unnamed slot)来作为 tooltip 的内容来源。当 slot 名称为空或 'default' 时，会读取 host 元素中没有 slot 属性的默认子元素。",
            },
        },
    },
}

export default meta
type Story = StoryObj

export const 默认Slot基本用法: Story = {
    name: '默认Slot基本用法',
    render: () => html`
        <tooltip-demo>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
                <button
                    data-tooltip="slot://"
                    data-tooltip-placement="top"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    默认 Slot 提示
                </button>

                <button
                    data-tooltip-slot=""
                    data-tooltip-placement="bottom"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    空名称 Slot
                </button>

                <button
                    data-tooltip="slot://default"
                    data-tooltip-placement="right"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    Default 关键字
                </button>

                <!-- 默认 slot 内容 -->
                <div style="padding: 12px; max-width: 300px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px;">
                    <h4 style="margin: 0 0 10px 0; color: #495057;">📝 默认 Slot 内容</h4>
                    <p style="margin: 0; font-size: 13px; line-height: 1.4; color: #6c757d;">
                        这是一个没有 slot 属性的默认子元素，当使用 slot:// 或 slot://default 时，会读取这个内容作为提示。
                    </p>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "使用 `data-tooltip='slot://'` 或 `data-tooltip-slot=''` 来引用默认 slot 内容。默认 slot 是指没有 slot 属性的子元素。",
            },
        },
    },
}

export const 默认Slot和命名Slot混用: Story = {
    name: '默认Slot和命名Slot混用',
    render: () => html`
        <tooltip-demo>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
                <button
                    data-tooltip="slot://"
                    data-tooltip-placement="top"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    默认 Slot
                </button>

                <button
                    data-tooltip="slot://help"
                    data-tooltip-placement="bottom"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    帮助 Slot
                </button>

                <button
                    data-tooltip="slot://warning"
                    data-tooltip-placement="right"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    警告 Slot
                </button>

                <!-- 默认 slot 内容 -->
                <div style="padding: 10px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 18px;">💡</span>
                        <strong style="color: #1976d2;">默认内容</strong>
                    </div>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #424242;">
                        这是默认 slot 的内容，没有 slot 属性。
                    </p>
                </div>

                <!-- 命名 slot 内容 -->
                <div slot="help" style="padding: 10px; background: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 18px;">❓</span>
                        <strong style="color: #2e7d32;">帮助信息</strong>
                    </div>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #424242;">
                        这是名为 'help' 的 slot 内容。
                    </p>
                </div>

                <div slot="warning" style="padding: 10px; background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 18px;">⚠️</span>
                        <strong style="color: #e65100;">警告信息</strong>
                    </div>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #424242;">
                        这是名为 'warning' 的 slot 内容。
                    </p>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: '演示如何在同一个组件中同时使用默认 slot 和多个命名 slot。默认 slot 不设置 slot 属性，命名 slot 需要指定 slot 属性。',
            },
        },
    },
}

export const 默认Slot复杂内容: Story = {
    name: '默认Slot复杂内容',
    render: () => html`
        <tooltip-demo>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
                <button
                    data-tooltip="slot://"
                    data-tooltip-placement="top"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    用户资料
                </button>

                <!-- 默认 slot 内容：用户资料卡片 -->
                <div style="padding: 16px; background: white; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); min-width: 250px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">
                            U
                        </div>
                        <div>
                            <div style="font-weight: bold; font-size: 16px; color: #333;">用户名</div>
                            <div style="font-size: 12px; color: #888;">user@example.com</div>
                        </div>
                    </div>

                    <div style="padding: 10px; background: #f5f5f5; border-radius: 6px; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                            <span style="font-size: 12px; color: #666;">等级</span>
                            <span style="font-size: 12px; font-weight: bold; color: #2196f3;">VIP 3</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                            <span style="font-size: 12px; color: #666;">积分</span>
                            <span style="font-size: 12px; font-weight: bold; color: #ff9800;">2,580</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="font-size: 12px; color: #666;">注册时间</span>
                            <span style="font-size: 12px; color: #666;">2024-01-15</span>
                        </div>
                    </div>

                    <div style="display: flex; gap: 8px;">
                        <button style="flex: 1; padding: 6px; font-size: 12px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;">
                            查看详情
                        </button>
                        <button style="flex: 1; padding: 6px; font-size: 12px; background: #f5f5f5; color: #666; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">
                            发消息
                        </button>
                    </div>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: '默认 slot 可以包含复杂的 HTML 结构，包括布局、样式和交互元素。适用于展示用户资料、产品信息等需要富文本展示的场景。',
            },
        },
    },
}

export const 默认Slot动态内容示例: Story = {
    name: '默认Slot动态内容示例',
    render: () => html`
        <tooltip-demo>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
                <div style="display: flex; gap: 12px; align-items: center;">
                    <div
                        data-tooltip="slot://"
                        data-tooltip-placement="right"
                        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        <!-- 默认 slot 内容：实时状态 -->
                <div  style="display:none;padding: 12px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px; min-width: 200px;">
                    <div style="font-weight: bold; margin-bottom: 10px; color: #333; display: flex; align-items: center; gap: 6px;">
                        <span style="font-size: 16px;">📊</span>
                        系统状态
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 12px; color: #666;">CPU 使用率</span>
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <div style="width: 60px; height: 6px; background: #e0e0e0; border-radius: 3px; overflow: hidden;">
                                    <div style="width: 45%; height: 100%; background: #4caf50;"></div>
                                </div>
                                <span style="font-size: 11px; color: #4caf50; font-weight: bold;">45%</span>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 12px; color: #666;">内存使用</span>
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <div style="width: 60px; height: 6px; background: #e0e0e0; border-radius: 3px; overflow: hidden;">
                                    <div style="width: 72%; height: 100%; background: #2196f3;"></div>
                                </div>
                                <span style="font-size: 11px; color: #2196f3; font-weight: bold;">72%</span>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 12px; color: #666;">磁盘空间</span>
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <div style="width: 60px; height: 6px; background: #e0e0e0; border-radius: 3px; overflow: hidden;">
                                    <div style="width: 28%; height: 100%; background: #ff9800;"></div>
                                </div>
                                <span style="font-size: 11px; color: #ff9800; font-weight: bold;">28%</span>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e0e0e0; font-size: 11px; color: #888; display: flex; justify-content: space-between;">
                        <span>运行时间: 15天 8小时</span>
                        <span style="color: #4caf50;">● 正常</span>
                    </div>
                </div><span style="font-size: 13px; color: #666;">悬停查看实时状态</span>
                </div>
                </div>                
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: '默认 slot 可以展示动态更新的信息，如系统状态、进度条、数据统计等。内容可以是静态的，也可以通过 JavaScript 动态更新。',
            },
        },
    },
}

export const 多个默认Slot示例: Story = {
    name: '多个默认Slot示例',
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px; padding: 40px;">
            <!-- 示例 1 -->
            <tooltip-demo>
                <div style="display: flex; gap: 12px; align-items: center;">
                    <button
                        data-tooltip="slot://"
                        data-tooltip-placement="top"
                        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        产品 A
                    </button>
                    <span style="font-size: 13px; color: #666;">查看产品详情</span>

                    <!-- 默认 slot 1 -->
                    <div style="padding: 12px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px;">
                        <h4 style="margin: 0 0 8px 0; color: #495057;">产品 A</h4>
                        <p style="margin: 0; font-size: 13px; color: #6c757d;">高端产品，性能卓越</p>
                    </div>
                </div>
            </tooltip-demo>

            <!-- 示例 2 -->
            <tooltip-demo>
                <div style="display: flex; gap: 12px; align-items: center;">
                    <button
                        data-tooltip-slot=""
                        data-tooltip-placement="top"
                        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        产品 B
                    </button>
                    <span style="font-size: 13px; color: #666;">查看产品详情</span>

                    <!-- 默认 slot 2 -->
                    <div style="padding: 12px; background: #fff3e0; border: 1px solid #ffcc02; border-radius: 4px;">
                        <h4 style="margin: 0 0 8px 0; color: #e65100;">产品 B</h4>
                        <p style="margin: 0; font-size: 13px; color: #ef6c00;">经济实惠，性价比高</p>
                    </div>
                </div>
            </tooltip-demo>

            <!-- 示例 3 -->
            <tooltip-demo>
                <div style="display: flex; gap: 12px; align-items: center;">
                    <button
                        data-tooltip="slot://default"
                        data-tooltip-placement="top"
                        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        产品 C
                    </button>
                    <span style="font-size: 13px; color: #666;">查看产品详情</span>

                    <!-- 默认 slot 3 -->
                    <div style="padding: 12px; background: #e3f2fd; border: 1px solid #2196f3; border-radius: 4px;">
                        <h4 style="margin: 0 0 8px 0; color: #1976d2;">产品 C</h4>
                        <p style="margin: 0; font-size: 13px; color: #1565c0;">新品上市，限时优惠</p>
                    </div>
                </div>
            </tooltip-demo>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: '演示如何在不同的 tooltip-demo 组件中各自使用独立的默认 slot。每个组件的默认 slot 内容是相互独立的。',
            },
        },
    },
}
