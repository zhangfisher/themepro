import type { Meta, StoryObj } from '@storybook/web-components'
import { html, LitElement } from 'lit'
import { TooltipController } from '../../controllers/tooltip'

const meta: Meta = {
    title: '控制器/Tooltip/嵌套 Tooltip 测试',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `## 嵌套 Tooltip 场景测试

测试在 Tooltip 内容中包含另一个 Tooltip 元素时的行为。这是一个常见的复杂场景，例如：
- Tooltip 中显示一个按钮，该按钮也有 tooltip
- Tooltip 内容中包含多个带提示的元素
- 嵌套的卡片组件，每层都有 tooltip`,
            },
        },
    },
}
export default meta
type Story = StoryObj

export const 基础嵌套场景: Story = {
    name: '基础嵌套场景',
    render: () => html`
            <div style="padding: 40px;">
                <button
                    data-tooltip="query://.tooltip-content"
                    data-tooltip-placement="bottom"
                    style="padding: 15px 30px; font-size: 16px; cursor: pointer; background: #4CAF50; color: white; border: none; border-radius: 8px;"
                >
                    悬停查看嵌套 Tooltip
                </button>

                <div class="tooltip-content" style="display: none;">
                    <div style="padding: 20px; min-width: 200px;">
                        <h4 style="margin: 0 0 15px 0;">这是父 Tooltip</h4>
                        <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">
                            内部包含一个带有 tooltip 的按钮
                        </p>
                        <button
                            data-tooltip="这是子 Tooltip"
                            data-tooltip-placement="right"
                            style="padding: 8px 16px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            悬停我
                        </button>
                    </div>
                </div>
            </div>
    `,
    parameters: {
        docs: {
            description: {
                story: `**基础嵌套场景**

测试最简单的嵌套情况：
- 父元素有一个 tooltip（显示 query 内容）
- Tooltip 内容中包含一个按钮，该按钮也有自己的 tooltip

**工作原理：**
1. Tooltip 容器会监听内部的 mousemove 和 click 事件
2. 这些事件被转发到 TooltipController
3. Controller 检查事件路径中的元素是否在其管理的 Tooltip 容器内
4. 如果找到嵌套的 tooltip 元素，则显示新的 Tooltip

**预期行为：**
- ✅ 悬停在主按钮上显示父 Tooltip
- ✅ 在父 Tooltip 可见时，鼠标移动到内部按钮上，显示子 Tooltip
- ✅ 两个 tooltip 不会同时出现（通过 registry 机制避免冲突）
- ✅ 鼠标离开后，tooltip 正确隐藏

**使用场景：**
- 复杂的工具提示
- 包含交互元素的 tooltip
- 多级信息展示`,
            },
        },
    },
}

export const 多层嵌套卡片: Story = {
    name: '多层嵌套卡片',
    render: () => html`
        <nested-tooltip-extend-true>
            <div style="padding: 40px;">
                <div
                    data-tooltip="query://.outer-card-tooltip"
                    data-tooltip-placement="bottom"
                    style="display: inline-block;"
                >
                    <div style="
                        padding: 30px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border-radius: 12px;
                        cursor: pointer;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    ">
                        <h3 style="margin: 0 0 10px 0;">外层卡片</h3>
                        <p style="margin: 0; font-size: 14px; opacity: 0.9;">悬停查看嵌套结构</p>
                    </div>
                </div>

                <div class="outer-card-tooltip" style="display: none;">
                    <div style="padding: 25px; min-width: 300px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                        <h4 style="margin: 0 0 15px 0; color: #333;">外层 Tooltip</h4>
                        <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">
                            这是一个外层 Tooltip，包含一个内层卡片元素
                        </p>

                        <div
                            data-tooltip="query://.inner-card-tooltip"
                            data-tooltip-placement="right"
                            style="display: inline-block;"
                        >
                            <div style="
                                padding: 20px;
                                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                                color: white;
                                border-radius: 8px;
                                cursor: pointer;
                            ">
                                <strong>内层卡片</strong>
                                <div style="font-size: 12px; opacity: 0.9;">悬停查看更多</div>
                            </div>
                        </div>

                        <div class="inner-card-tooltip" style="display: none;">
                            <div style="padding: 15px; min-width: 200px; background: #f8f9fa; border-radius: 6px;">
                                <h5 style="margin: 0 0 10px 0; color: #333;">内层 Tooltip</h5>
                                <p style="margin: 0; font-size: 13px; color: #666;">
                                    这是最内层的 Tooltip 内容
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nested-tooltip-extend-true>
    `,
    parameters: {
        docs: {
            description: {
                story: `**多层嵌套卡片**

测试三层嵌套结构：
- 外层卡片 → 外层 Tooltip
- 外层 Tooltip 中的内层卡片 → 内层 Tooltip
- 测试鼠标在各层之间移动时的行为

**预期行为：**
- ✅ 鼠标悬停外层卡片显示外层 Tooltip
- ✅ 在外层 Tooltip 中悬停内层卡片，显示内层 Tooltip
- ✅ 内层 Tooltip 会替代外层 Tooltip（通过 registry 机制）
- ✅ 鼠标在各元素间平滑移动，tooltip 切换自然

**关键点：**
- 使用 query:// 语法来引用复杂内容
- Tooltip 可以包含交互元素
- Registry 机制确保同一时间只显示一个 tooltip`,
            },
        },
    },
}

export const 列表项嵌套: Story = {
    name: '列表项嵌套',
    render: () => html`
        <nested-tooltip-extend-true>
            <div style="padding: 40px;">
                <div
                    data-tooltip="query://.list-tooltip"
                    data-tooltip-placement="bottom"
                    style="display: inline-block;"
                >
                    <button style="
                        padding: 12px 24px;
                        background: #2196F3;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                    ">
                        查看用户列表
                    </button>
                </div>

                <div class="list-tooltip" style="display: none;">
                    <div style="padding: 20px; min-width: 280px; background: white; border-radius: 8px;">
                        <h4 style="margin: 0 0 15px 0;">用户列表</h4>

                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div
                                data-tooltip="张三 - 高级工程师"
                                data-tooltip-placement="right"
                                style="
                                    padding: 10px;
                                    background: #f5f5f5;
                                    border-radius: 4px;
                                    cursor: pointer;
                                "
                            >
                                <div style="font-weight: bold;">张三</div>
                                <div style="font-size: 12px; color: #666;">悬停查看详情</div>
                            </div>

                            <div
                                data-tooltip="李四 - 产品经理"
                                data-tooltip-placement="right"
                                style="
                                    padding: 10px;
                                    background: #f5f5f5;
                                    border-radius: 4px;
                                    cursor: pointer;
                                "
                            >
                                <div style="font-weight: bold;">李四</div>
                                <div style="font-size: 12px; color: #666;">悬停查看详情</div>
                            </div>

                            <div
                                data-tooltip="王五 - UI设计师"
                                data-tooltip-placement="right"
                                style="
                                    padding: 10px;
                                    background: #f5f5f5;
                                    border-radius: 4px;
                                    cursor: pointer;
                                "
                            >
                                <div style="font-weight: bold;">王五</div>
                                <div style="font-size: 12px; color: #666;">悬停查看详情</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nested-tooltip-extend-true>
    `,
    parameters: {
        docs: {
            description: {
                story: `**列表项嵌套**

在 Tooltip 内容中显示列表，每个列表项都有独立的 tooltip。

**特点：**
- 父 Tooltip 显示一个用户列表
- 每个用户项都有自己的 tooltip（显示职位信息）
- 测试在父 Tooltip 内快速移动鼠标到各个子项的行为

**预期行为：**
- ✅ 悬停按钮显示用户列表
- ✅ 在列表中移动到某个用户项时，显示该用户的详细 tooltip
- ✅ 鼠标在不同用户项之间切换时，tooltip 相应切换
- ✅ 离开所有元素后，tooltip 完全隐藏

**使用场景：**
- 用户信息展示
- 数据列表的快速预览
- 导航菜单的子项说明`,
            },
        },
    },
}

export const 嵌套与ExtendFalse对比: Story = {
    name: '嵌套与 Extend=False 对比',
    render: () => html`
        <div style="display: flex; gap: 40px; padding: 40px; flex-wrap: wrap; align-items: flex-start;">
            <!-- Extend=True -->
            <div>
                <h3 style="margin-bottom: 20px; color: #4CAF50;">Extend=True (支持嵌套)</h3>
                <nested-tooltip-extend-true>
                    <div
                        data-tooltip="query://.extend-true-content"
                        data-tooltip-placement="bottom"
                        style="display: inline-block;"
                    >
                        <button style="
                            padding: 15px 30px;
                            background: #4CAF50;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                        ">
                            悬停我
                        </button>
                    </div>

                    <div class="extend-true-content" style="display: none;">
                        <div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                            <p style="margin: 0 0 15px 0;">父 Tooltip 内容</p>
                            <button
                                data-tooltip="这是子 Tooltip"
                                data-tooltip-placement="right"
                                style="
                                    padding: 8px 16px;
                                    background: #2196F3;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    cursor: pointer;
                                "
                            >
                                内部按钮
                            </button>
                        </div>
                    </div>
                </nested-tooltip-extend-true>

                <div style="margin-top: 15px; padding: 10px; background: #e8f5e9; border-radius: 4px; font-size: 13px; color: #2e7d32;">
                    ✅ 内部按钮的 tooltip 会显示
                </div>
            </div>

            <!-- Extend=False -->
            <div>
                <h3 style="margin-bottom: 20px; color: #f44336;">Extend=False (不支持嵌套)</h3>
                <nested-tooltip-extend-false>
                    <div
                        data-tooltip="query://.extend-false-content"
                        data-tooltip-placement="bottom"
                        style="display: inline-block;"
                    >
                        <button style="
                            padding: 15px 30px;
                            background: #f44336;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                        ">
                            悬停我
                        </button>
                    </div>

                    <div class="extend-false-content" style="display: none;">
                        <div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                            <p style="margin: 0 0 15px 0;">父 Tooltip 内容</p>
                            <button
                                data-tooltip="这个不会显示"
                                data-tooltip-placement="right"
                                style="
                                    padding: 8px 16px;
                                    background: #2196F3;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    cursor: pointer;
                                "
                            >
                                内部按钮
                            </button>
                        </div>
                    </div>
                </nested-tooltip-extend-false>

                <div style="margin-top: 15px; padding: 10px; background: #ffebee; border-radius: 4px; font-size: 13px; color: #c62828;">
                    ❌ 内部按钮的 tooltip 不会显示
                </div>
            </div>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: `**嵌套与 Extend=False 对比**

并排展示 extend=true 和 extend=false 在嵌套场景下的差异。

**左侧 (extend=true)：**
- ✅ 支持嵌套 tooltip
- ✅ 内部元素的 tooltip 会正常显示
- ✅ 适用于需要多层提示的复杂场景

**右侧 (extend=false)：**
- ❌ 不支持嵌套 tooltip
- ❌ 内部元素的 tooltip 会被忽略
- ✅ 只处理 host 元素的 tooltip
- ✅ 性能更好，逻辑更简单

**选择建议：**
- 如果需要在 Tooltip 内容中包含交互元素，并希望这些元素也有 tooltip → 使用 extend=true
- 如果只需要容器本身的 tooltip，不需要嵌套 → 使用 extend=false`,
            },
        },
    },
}

export const 实际应用_操作指南: Story = {
    name: '实际应用 - 操作指南',
    render: () => html`
        <nested-tooltip-extend-true>
            <div style="padding: 40px;">
                <h2 style="margin-bottom: 20px;">功能操作指南</h2>

                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <div
                        data-tooltip="query://.save-guide"
                        data-tooltip-placement="bottom"
                        style="display: inline-block;"
                    >
                        <button style="
                            padding: 12px 24px;
                            background: #4CAF50;
                            color: white;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        ">
                            <span style="font-size: 18px;">💾</span>
                            保存
                        </button>
                    </div>

                    <div
                        data-tooltip="query://.export-guide"
                        data-tooltip-placement="bottom"
                        style="display: inline-block;"
                    >
                        <button style="
                            padding: 12px 24px;
                            background: #2196F3;
                            color: white;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        ">
                            <span style="font-size: 18px;">📤</span>
                            导出
                        </button>
                    </div>

                    <div
                        data-tooltip="query://.settings-guide"
                        data-tooltip-placement="bottom"
                        style="display: inline-block;"
                    >
                        <button style="
                            padding: 12px 24px;
                            background: #FF9800;
                            color: white;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        ">
                            <span style="font-size: 18px;">⚙️</span>
                            设置
                        </button>
                    </div>
                </div>

                <!-- 保存指南 -->
                <div class="save-guide" style="display: none;">
                    <div style="padding: 20px; min-width: 300px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                        <h4 style="margin: 0 0 15px 0; display: flex; align-items: center; gap: 8px;">
                            <span>💾</span> 保存操作
                        </h4>
                        <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">
                            将当前工作保存到本地存储
                        </p>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div
                                data-tooltip="快捷键: Ctrl+S"
                                data-tooltip-placement="right"
                                style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px; cursor: help; font-size: 13px;"
                            >
                                ⌨️ 使用快捷键
                            </div>
                            <div
                                data-tooltip="自动保存间隔: 30秒"
                                data-tooltip-placement="right"
                                style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px; cursor: help; font-size: 13px;"
                            >
                                🔄 自动保存
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 导出指南 -->
                <div class="export-guide" style="display: none;">
                    <div style="padding: 20px; min-width: 300px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                        <h4 style="margin: 0 0 15px 0; display: flex; align-items: center; gap: 8px;">
                            <span>📤</span> 导出操作
                        </h4>
                        <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">
                            将数据导出为多种格式
                        </p>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div
                                data-tooltip="导出为 PDF 文档"
                                data-tooltip-placement="right"
                                style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px; cursor: help; font-size: 13px;"
                            >
                                📄 PDF 格式
                            </div>
                            <div
                                data-tooltip="导出为 Excel 表格"
                                data-tooltip-placement="right"
                                style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px; cursor: help; font-size: 13px;"
                            >
                                📊 Excel 格式
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 设置指南 -->
                <div class="settings-guide" style="display: none;">
                    <div style="padding: 20px; min-width: 300px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                        <h4 style="margin: 0 0 15px 0; display: flex; align-items: center; gap: 8px;">
                            <span>⚙️</span> 设置选项
                        </h4>
                        <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">
                            配置应用程序偏好设置
                        </p>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div
                                data-tooltip="更改界面主题和配色"
                                data-tooltip-placement="right"
                                style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px; cursor: help; font-size: 13px;"
                            >
                                🎨 外观设置
                            </div>
                            <div
                                data-tooltip="管理通知和提醒"
                                data-tooltip-placement="right"
                                style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px; cursor: help; font-size: 13px;"
                            >
                                🔔 通知设置
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nested-tooltip-extend-true>
    `,
    parameters: {
        docs: {
            description: {
                story: `**实际应用：操作指南**

这是一个真实的应用场景，展示如何使用嵌套 tooltip 提供丰富的用户指导。

**场景特点：**
- 工具栏的每个按钮都有 tooltip
- Tooltip 中显示操作说明
- 说明中的每个选项也有详细的 tooltip
- 用户可以逐层深入了解功能

**用户体验：**
1. 鼠标悬停"保存"按钮 → 显示保存操作指南
2. 在指南中移动鼠标到"使用快捷键" → 显示快捷键说明
3. 继续移动到"自动保存" → 显示自动保存说明

**优势：**
- ✅ 提供多层级的信息
- ✅ 不会让界面显得拥挤
- ✅ 用户按需获取详细信息
- ✅ 降低学习成本`,
            },
        },
    },
}

export const 边界情况_快速切换: Story = {
    name: '边界情况 - 快速切换',
    render: () => html`
        <nested-tooltip-extend-true>
            <div style="padding: 40px;">
                <h3 style="margin-bottom: 20px;">快速切换测试</h3>
                <p style="margin-bottom: 20px; color: #666;">
                    快速在多个嵌套元素间移动鼠标，测试 tooltip 的响应和清理机制
                </p>

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button
                        data-tooltip="按钮 A"
                        data-tooltip-placement="bottom"
                        style="padding: 15px 30px; background: #e91e63; color: white; border: none; border-radius: 8px; cursor: pointer;"
                    >
                        按钮 A
                    </button>

                    <button
                        data-tooltip="按钮 B"
                        data-tooltip-placement="bottom"
                        style="padding: 15px 30px; background: #9c27b0; color: white; border: none; border-radius: 8px; cursor: pointer;"
                    >
                        按钮 B
                    </button>

                    <div
                        data-tooltip="query://.nested-buttons"
                        data-tooltip-placement="bottom"
                        style="display: inline-block;"
                    >
                        <button style="
                            padding: 15px 30px;
                            background: #3f51b5;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                        ">
                            嵌套按钮
                        </button>
                    </div>
                </div>

                <div class="nested-buttons" style="display: none;">
                    <div style="padding: 20px; background: white; border-radius: 8px; display: flex; gap: 10px;">
                        <button
                            data-tooltip="嵌套 1"
                            data-tooltip-placement="top"
                            style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            嵌套 1
                        </button>
                        <button
                            data-tooltip="嵌套 2"
                            data-tooltip-placement="top"
                            style="padding: 10px 20px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            嵌套 2
                        </button>
                        <button
                            data-tooltip="嵌套 3"
                            data-tooltip-placement="top"
                            style="padding: 10px 20px; background: #FF9800; color: white; border: none; border-radius: 4px; cursor: pointer;"
                        >
                            嵌套 3
                        </button>
                    </div>
                </div>

                <div style="margin-top: 20px; padding: 15px; background: #fff3e0; border-radius: 8px;">
                    <p style="margin: 0; color: #e65100; font-size: 14px;">
                        💡 <strong>测试要点：</strong>
                    </p>
                    <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #e65100; font-size: 13px;">
                        <li>快速在按钮 A、B、嵌套按钮间切换</li>
                        <li>在嵌套按钮的 tooltip 中快速移动鼠标</li>
                        <li>观察是否有 tooltip 残留或显示错误</li>
                        <li>检查是否会有多个 tooltip 同时显示</li>
                    </ul>
                </div>
            </div>
        </nested-tooltip-extend-true>
    `,
    parameters: {
        docs: {
            description: {
                story: `**边界情况：快速切换**

测试在嵌套 tooltip 场景下的快速鼠标移动。

**测试目的：**
- 验证 tooltip 的创建和销毁机制
- 确保不会有 tooltip 残留
- 测试 registry 的切换机制
- 验证事件处理的正确性

**预期行为：**
- ✅ 快速切换时 tooltip 及时更新
- ✅ 不会有多个 tooltip 同时显示
- ✅ 不会有旧的 tooltip 残留在屏幕上
- ✅ 鼠标停止后显示正确的 tooltip
- ✅ 所有 DOM 元素正确清理

**潜在问题排查：**
- 如果出现 tooltip 残留 → 检查 hide() 逻辑
- 如果多个 tooltip 同时显示 → 检查 registry 机制
- 如果切换不及时 → 检查事件监听器的清理`,
            },
        },
    },
}

// 注册自定义元素
class NestedTooltipExtendTrue extends LitElement {
    tooltip = new TooltipController(this, {
        extend: true,
        placement: 'top',
        arrow: true,
    })

    render() {
        return html`<slot></slot>`
    }
}

class NestedTooltipExtendFalse extends LitElement {
    tooltip = new TooltipController(this, {
        extend: false,
        placement: 'top',
        arrow: true,
    })

    render() {
        return html`<slot></slot>`
    }
}

customElements.define('nested-tooltip-extend-true', NestedTooltipExtendTrue)
customElements.define('nested-tooltip-extend-false', NestedTooltipExtendFalse)
