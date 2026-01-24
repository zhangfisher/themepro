import type { Meta, StoryObj } from '@storybook/web-components'
import { html, LitElement } from 'lit'
import { TooltipController } from '../../controllers/tooltip'

const meta: Meta = {
    title: '控制器/Tooltip/Extend 模式对比',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `## Extend 模式对比

\`extend\` 选项控制 TooltipController 如何查找和处理 tooltip 元素：

- **extend=true (默认)**: 从事件的 \`composedPath\` 中查找所有 TooltipElement
  - 可以处理容器内所有子元素的 tooltip
  - 支持嵌套结构
  - 适用于复杂的 DOM 结构

- **extend=false**: 只处理 host 元素本身的 tooltip
  - 仅响应 host 元素的 tooltip
  - 忽略内部子元素的 tooltip
  - 适用于简单的单元素场景`,
            },
        },
    },
}
export default meta
type Story = StoryObj

export const ExtendTrue_扩展模式: Story = {
    name: 'Extend=True (扩展模式)',
    render: () => html`
        <extend-demo-true  data-tooltip="容器的提示">
            <div style="padding: 40px; border: 2px solid #4CAF50; border-radius: 8px; background: #f5f5f5;">
                <h3 style="margin-top: 0; color: #4CAF50;">Extend=True (扩展模式)</h3>
                <p style="color: #666; margin-bottom: 20px;">
                    ✅ 容器本身有提示 | ✅ 内部所有元素都有提示
                </p>

                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <button
                        data-tooltip="按钮1的提示"
                        style="padding: 10px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        按钮 1
                    </button>

                    <button
                        data-tooltip="按钮2的提示"
                        style="padding: 10px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        按钮 2
                    </button>

                    <button
                        data-tooltip="按钮3的提示"
                        style="padding: 10px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        按钮 3
                    </button>

                    <span
                        data-tooltip="这是普通文本的提示"
                        style="padding: 10px 15px; background: #e3f2fd; border-radius: 4px; cursor: help;"
                    >
                        普通文本
                    </span>
                </div>
            </div>
        </extend-demo-true>
    `,
    parameters: {
        docs: {
            description: {
                story: `**扩展模式** (extend=true, 默认值)

在扩展模式下，TooltipController 会从事件的 \`composedPath\` 中查找所有具有 tooltip 属性的元素。

**特点：**
- ✅ 容器可以有自己的 tooltip
- ✅ 容器内所有子元素都可以有独立的 tooltip
- ✅ 鼠标悬停在任何子元素上时，都会显示该元素对应的 tooltip
- ✅ 适用于需要处理多个子元素的容器组件

**使用场景：**
- 工具栏组件
- 按钮组
- 卡片容器
- 任何需要为多个子元素提供 tooltip 的场景`,
            },
        },
    },
}

export const ExtendFalse_仅Host模式: Story = {
    name: 'Extend=False (仅Host模式)',
    render: () => html`
        <extend-demo-false data-tooltip="容器的提示">
            <div style="padding: 40px; border: 2px solid #f44336; border-radius: 8px; background: #f5f5f5;">
                <h3 style="margin-top: 0; color: #f44336;">Extend=False (仅Host模式)</h3>
                <p style="color: #666; margin-bottom: 20px;">
                    ✅ 只有容器有提示 | ❌ 内部元素的提示被忽略
                </p>

                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <button
                        data-tooltip="按钮1的提示（不会显示）"
                        style="padding: 10px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        按钮 1
                    </button>

                    <button
                        data-tooltip="按钮2的提示（不会显示）"
                        style="padding: 10px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        按钮 2
                    </button>

                    <button
                        data-tooltip="按钮3的提示（不会显示）"
                        style="padding: 10px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        按钮 3
                    </button>

                    <span
                        data-tooltip="这是普通文本的提示（不会显示）"
                        style="padding: 10px 15px; background: #e3f2fd; border-radius: 4px; cursor: help;"
                    >
                        普通文本
                    </span>
                </div>
            </div>
        </extend-demo-false>
    `,
    parameters: {
        docs: {
            description: {
                story: `**仅Host模式** (extend=false)

在仅Host模式下，TooltipController 只处理 host 元素本身的 tooltip，忽略所有内部子元素的 tooltip。

**特点：**
- ✅ 只有容器元素本身的 tooltip 会生效
- ❌ 内部子元素的 tooltip 会被完全忽略
- ✅ 鼠标在容器内移动时，始终显示容器的 tooltip
- ✅ 适用于只需要为容器本身提供 tooltip 的简单场景

**使用场景：**
- 简单的提示组件
- 只需要单一 tooltip 的元素
- 避免子元素 tooltip 干扰
- 性能优化（减少事件处理）`,
            },
        },
    },
}

export const 并排对比: Story = {
    name: '并排对比',
    render: () => html`
        <div style="display: flex; gap: 30px; padding: 20px; flex-wrap: wrap;">
            <!-- Extend=True -->
            <extend-demo-true data-tooltip="容器的提示">
                <div style="padding: 30px; border: 2px solid #4CAF50; border-radius: 8px; background: #f5f5f5; min-width: 300px;">
                    <h3 style="margin-top: 0; color: #4CAF50;">Extend=True</h3>
                    <p style="font-size: 12px; color: #666; margin-bottom: 15px;">
                        每个元素都有独立提示
                    </p>

                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button
                            data-tooltip="保存按钮提示"
                            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer; width: 100%;"
                        >
                            💾 保存
                        </button>

                        <button
                            data-tooltip="取消按钮提示"
                            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer; width: 100%;"
                        >
                            ❌ 取消
                        </button>

                        <button
                            data-tooltip="删除按钮提示"
                            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer; width: 100%;"
                        >
                            🗑️ 删除
                        </button>
                    </div>
                </div>
            </extend-demo-true>

            <!-- Extend=False -->
            <extend-demo-false data-tooltip="容器的提示">
                <div style="padding: 30px; border: 2px solid #f44336; border-radius: 8px; background: #f5f5f5; min-width: 300px;">
                    <h3 style="margin-top: 0; color: #f44336;">Extend=False</h3>
                    <p style="font-size: 12px; color: #666; margin-bottom: 15px;">
                        只有容器的提示生效
                    </p>

                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button
                            data-tooltip="保存按钮提示（不显示）"
                            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer; width: 100%;"
                        >
                            💾 保存
                        </button>

                        <button
                            data-tooltip="取消按钮提示（不显示）"
                            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer; width: 100%;"
                        >
                            ❌ 取消
                        </button>

                        <button
                            data-tooltip="删除按钮提示（不显示）"
                            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer; width: 100%;"
                        >
                            🗑️ 删除
                        </button>
                    </div>
                </div>
            </extend-demo-false>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: `**并排对比两种模式**

左侧面板使用 **extend=true**，右侧面板使用 **extend=false**。

**对比观察：**
1. 将鼠标移动到左侧面板的各个按钮上 - 每个按钮显示不同的 tooltip
2. 将鼠标移动到右侧面板的各个按钮上 - 所有按钮都显示容器的 tooltip（或者不显示，取决于容器是否有 tooltip）

这种对比清晰地展示了两种模式的差异和适用场景。`,
            },
        },
    },
}

export const 实际应用场景_工具栏: Story = {
    name: '实际应用场景 - 工具栏',
    render: () => html`
        <div style="padding: 40px;">
            <h2 style="margin-bottom: 20px;">工具栏场景</h2>

            <extend-demo-true data-tooltip="容器的提示">
                <div style="
                    padding: 15px;
                    background: #2d2d2d;
                    border-radius: 8px;
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                ">
                    <button
                        data-tooltip="新建文件 (Ctrl+N)"
                        data-tooltip-placement="bottom"
                        style="width: 36px; height: 36px; border: none; background: transparent; color: white; cursor: pointer; border-radius: 4px; font-size: 18px;"
                    >
                        📄
                    </button>

                    <button
                        data-tooltip="打开文件 (Ctrl+O)"
                        data-tooltip-placement="bottom"
                        style="width: 36px; height: 36px; border: none; background: transparent; color: white; cursor: pointer; border-radius: 4px; font-size: 18px;"
                    >
                        📂
                    </button>

                    <button
                        data-tooltip="保存 (Ctrl+S)"
                        data-tooltip-placement="bottom"
                        style="width: 36px; height: 36px; border: none; background: transparent; color: white; cursor: pointer; border-radius: 4px; font-size: 18px;"
                    >
                        💾
                    </button>

                    <div style="width: 1px; height: 24px; background: #555; margin: 0 5px;"></div>

                    <button
                        data-tooltip="撤销 (Ctrl+Z)"
                        data-tooltip-placement="bottom"
                        style="width: 36px; height: 36px; border: none; background: transparent; color: white; cursor: pointer; border-radius: 4px; font-size: 18px;"
                    >
                        ↩️
                    </button>

                    <button
                        data-tooltip="重做 (Ctrl+Y)"
                        data-tooltip-placement="bottom"
                        style="width: 36px; height: 36px; border: none; background: transparent; color: white; cursor: pointer; border-radius: 4px; font-size: 18px;"
                    >
                        ↪️
                    </button>

                    <div style="width: 1px; height: 24px; background: #555; margin: 0 5px;"></div>

                    <button
                        data-tooltip="设置"
                        data-tooltip-placement="bottom"
                        style="width: 36px; height: 36px; border: none; background: transparent; color: white; cursor: pointer; border-radius: 4px; font-size: 18px;"
                    >
                        ⚙️
                    </button>
                </div>
            </extend-demo-true>

            <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
                <p style="margin: 0; color: #1976d2; font-size: 14px;">
                    💡 <strong>提示：</strong>将鼠标悬停在工具栏的各个按钮上，每个按钮都会显示独立的 tooltip 说明。
                    这种场景非常适合使用 <code>extend=true</code>。
                </p>
            </div>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: `**实际应用场景：工具栏**

这是一个典型的 **extend=true** 应用场景。

**为什么使用 extend=true？**
- 工具栏包含多个按钮
- 每个按钮需要不同的 tooltip 说明
- 用户需要快速了解每个按钮的功能
- TooltipController 统一管理所有 tooltip

**优势：**
- ✅ 一个 Controller 管理所有按钮的 tooltip
- ✅ 代码简洁，易于维护
- ✅ 统一的样式和行为
- ✅ 性能优化（事件委托）

如果不使用 extend=true，就需要为每个按钮单独创建 Controller，会导致代码冗余和性能问题。`,
            },
        },
    },
}

export const 实际应用场景_信息提示卡: Story = {
    name: '实际应用场景 - 信息提示卡',
    render: () => html`
        <div style="padding: 40px;">
            <h2 style="margin-bottom: 20px;">信息提示卡场景</h2>

            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                <extend-demo-false data-tooltip="容器的提示">
                    <div style="
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 12px;
                        color: white;
                        max-width: 300px;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    ">
                        <h3 style="margin: 0 0 10px 0; font-size: 18px;">欢迎使用</h3>
                        <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.9;">
                            这是一个使用 extend=false 的信息卡片。即使内部有其他元素，也只有卡片本身的 tooltip 会显示。
                        </p>
                        <button style="
                            padding: 8px 16px;
                            background: white;
                            color: #667eea;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: bold;
                        ">
                            了解更多
                        </button>
                    </div>
                </extend-demo-false>

                <extend-demo-false data-tooltip="容器的提示">
                    <div style="
                        padding: 20px;
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                        border-radius: 12px;
                        color: white;
                        max-width: 300px;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    ">
                        <h3 style="margin: 0 0 10px 0; font-size: 18px;">重要提示</h3>
                        <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.9;">
                            extend=false 模式确保只有容器级别的提示生效，避免子元素的 tooltip 造成干扰。
                        </p>
                        <div style="display: flex; gap: 10px;">
                            <span style="padding: 5px 10px; background: rgba(255,255,255,0.2); border-radius: 4px; font-size: 12px;">
                                标签1
                            </span>
                            <span style="padding: 5px 10px; background: rgba(255,255,255,0.2); border-radius: 4px; font-size: 12px;">
                                标签2
                            </span>
                        </div>
                    </div>
                </extend-demo-false>
            </div>

            <div style="margin-top: 20px; padding: 15px; background: #fff3e0; border-radius: 8px;">
                <p style="margin: 0; color: #e65100; font-size: 14px;">
                    💡 <strong>提示：</strong>这些卡片使用 <code>extend=false</code>，确保只有卡片本身的 tooltip 会显示。
                    内部的按钮、标签等元素即使有 tooltip 属性也不会生效，避免造成混淆。
                </p>
            </div>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: `**实际应用场景：信息提示卡**

这是一个典型的 **extend=false** 应用场景。

**为什么使用 extend=false？**
- 卡片作为一个整体提供 tooltip
- 不希望内部元素的 tooltip 干扰
- 保持简洁的用户体验
- 避免过多的 tooltip 造成视觉混乱

**优势：**
- ✅ 简洁的用户体验
- ✅ 避免信息过载
- ✅ 更好的性能（不处理子元素）
- ✅ 明确的交互反馈

**适用场景：**
- 信息卡片
- 通知组件
- 警告提示
- 任何只需要单一 tooltip 的组件`,
            },
        },
    },
}

// 注册自定义元素
class ExtendDemoTrue extends LitElement {
    tooltip = new TooltipController(this, {
        extend: true,
        placement: 'top',
        arrow: true,
    })

    render() {
        return html`<slot></slot>`
    }
}

class ExtendDemoFalse extends LitElement {
    tooltip = new TooltipController(this, {
        extend: false,
        placement: 'top',
        arrow: true,
    })

    render() {
        return html`<slot></slot>`
    }
}

customElements.define('extend-demo-true', ExtendDemoTrue)
customElements.define('extend-demo-false', ExtendDemoFalse)
