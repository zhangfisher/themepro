import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./TooltipDemo";

const meta: Meta = {
    title: "控制器/Tooltip/提示内容来源",
    tags: ["autodocs"],
    render: () => html`<tooltip-demo></tooltip-demo>`,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "演示如何使用HTML内容来创建丰富的提示框，包括格式化文本、链接和复杂布局。",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

export const 格式化文本: Story = {
    name: "格式化文本",
    render: () => html`<tooltip-demo>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <button
                data-tooltip="<b>粗体文字</b>和<strong>强调文字</strong>"
                data-tooltip-placement="top"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                文字格式
            </button>

            <button
                data-tooltip="<em>斜体文字</em>和<i>斜体强调</i>"
                data-tooltip-placement="bottom"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                斜体格式
            </button>

            <button
                data-tooltip="<u>下划线文字</u>和<del>删除线文字</del>"
                data-tooltip-placement="right"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                其他格式
            </button>

            <button
                data-tooltip="<span style='color: #dc3545; font-weight: bold;'>红色粗体</span>和<span style='color: #007bff;'>蓝色文字</span>"
                data-tooltip-placement="left"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                彩色文字
            </button>
        </div>
    </tooltip-demo> `,
    parameters: {
        docs: {
            description: {
                story: "使用HTML标签如 `<b>`、`<strong>`、`<em>`、`<i>` 等来创建格式化的文本内容。",
            },
        },
    },
};

export const 多行文本: Story = {
    name: "多行文本",
    render: () => html`<tooltip-demo>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <button
                data-tooltip="这是第一行<br/>这是第二行<br/>这是第三行"
                data-tooltip-placement="top"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                简单换行
            </button>

            <button
                data-tooltip="<p>段落一：这是一段较长的文本内容，展示了如何在提示框中使用段落标签。</p><p>段落二：另一个段落，包含更多的信息内容。</p>"
                data-tooltip-placement="bottom"
                data-tooltip-trigger="click"
                data-tooltip-delay-hide="1000000"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                段落文本
            </button>

            <button
                data-tooltip="<div style='line-height: 1.8;'>1. 第一项内容<br/>2. 第二项内容<br/>3. 第三项内容<br/>4. 第四项内容</div>"
                data-tooltip-placement="right"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                列表内容
            </button>
        </div></tooltip-demo
    > `,
    parameters: {
        docs: {
            description: {
                story: "使用 `<br>` 标签或段落标签来创建多行文本内容。支持复杂的文本布局。",
            },
        },
    },
};

export const 链接和交互元素: Story = {
    name: "链接和交互元素",
    render: () => html`<tooltip-demo>
    <div style="display: flex; gap: 30px; flex-wrap: wrap; padding: 40px;">
      <button
        data-tooltip="更多信息请访问：<a href='#' style='color: #007bff; text-decoration: none;'>查看文档</a>"
        data-tooltip-placement="top"
        
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        包含链接
      </button>

      <button
        data-tooltip="相关操作：<br/><button onclick='alert(\"操作执行\")' style='margin: 5px; padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer;'>执行操作</button>"
        data-tooltip-placement="bottom"
        
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        包含按钮
      </button>

      <span
        data-tooltip="联系支持：<br/>📧 support@example.com<br/>📞 400-123-4567<br/>💬 在线客服"
        data-tooltip-placement="right"
        
        style="padding: 8px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px; cursor: help;"
      >
        联系信息
      </span>
    </div></tooltip-demo>
  `,
    parameters: {
        docs: {
            description: {
                story: "在提示框中嵌入链接、按钮等交互元素，提供更丰富的用户体验。注意交互元素的事件处理。",
            },
        },
    },
};

export const 表格和列表: Story = {
    name: "表格和列表",
    render: () => html`<tooltip-demo>
        <div style="display: flex; gap: 30px; flex-wrap: wrap; padding: 40px;">
            <button
                data-tooltip="
          <table style='border-collapse: collapse; font-size: 12px;'>
            <tr style='background: #f8f9fa;'>
              <th style='border: 1px solid #ddd; padding: 4px 8px;'>功能</th>
              <th style='border: 1px solid #ddd; padding: 4px 8px;'>快捷键</th>
            </tr>
            <tr>
              <td style='border: 1px solid #ddd; padding: 4px 8px;'>复制</td>
              <td style='border: 1px solid #ddd; padding: 4px 8px; font-family: monospace;'>Ctrl+C</td>
            </tr>
            <tr>
              <td style='border: 1px solid #ddd; padding: 4px 8px;'>粘贴</td>
              <td style='border: 1px solid #ddd; padding: 4px 8px; font-family: monospace;'>Ctrl+V</td>
            </tr>
            <tr>
              <td style='border: 1px solid #ddd; padding: 4px 8px;'>剪切</td>
              <td style='border: 1px solid #ddd; padding: 4px 8px; font-family: monospace;'>Ctrl+X</td>
            </tr>
          </table>
        "
                data-tooltip-placement="top"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                快捷键表格
            </button>

            <button
                data-tooltip="
          <ul style='margin: 0; padding-left: 15px; font-size: 13px;'>
            <li>支持多格式文件导入</li>
            <li>实时数据同步</li>
            <li>智能数据分析</li>
            <li>可视化报表生成</li>
          </ul>
        "
                data-tooltip-placement="right"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                功能列表
            </button>
        </div>
    </tooltip-demo> `,
    parameters: {
        docs: {
            description: {
                story: "使用表格和列表来组织结构化信息，让提示框内容更加清晰易读。",
            },
        },
    },
};

export const 图标和表情符号: Story = {
    name: "图标和表情符号",
    render: () => html`<tooltip-demo>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <button
                data-tooltip="<span style='font-size: 20px; margin-right: 5px;'>✅</span>操作成功完成"
                data-tooltip-placement="top"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                成功状态
            </button>

            <button
                data-tooltip="<span style='font-size: 20px; margin-right: 5px;'>⚠️</span><span style='color: #856404;'>警告：此操作不可逆</span>"
                data-tooltip-placement="bottom"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                警告信息
            </button>

            <button
                data-tooltip="<span style='font-size: 20px; margin-right: 5px;'>❌</span><span style='color: #721c24;'>错误：操作失败</span>"
                data-tooltip-placement="left"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                错误状态
            </button>

            <button
                data-tooltip="<span style='font-size: 20px; margin-right: 5px;'>💡</span>提示：按Ctrl+S保存"
                data-tooltip-placement="right"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                提示信息
            </button>

            <button
                data-tooltip="<div style='display: flex; align-items: center; gap: 10px;'>
            <span style='font-size: 24px;'>🎯</span>
            <div>
                <div style='font-weight: bold;'>目标完成</div><div style='font-size: 12px; color: #666;'>进度：100%</div></div>
          </div>"
                data-tooltip-placement="top"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                复杂布局
            </button>
        </div></tooltip-demo
    > `,
    parameters: {
        docs: {
            description: {
                story: "使用图标、表情符号和自定义样式来创建视觉上吸引人的提示框内容。",
            },
        },
    },
};

export const Slot内容来源: Story = {
    name: "Slot内容来源",
    render: () => html`
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <tooltip-demo>
                <button
                    data-tooltip="slot://help-content"
                    data-tooltip-placement="top"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    帮助提示
                </button>

                <button
                    data-tooltip="slot://user-info"
                    data-tooltip-placement="bottom"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    用户信息
                </button>

                <button
                    data-tooltip="slot://warning-message"
                    data-tooltip-placement="right"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    警告消息
                </button>

                <!-- Slot 内容定义 -->
                <div slot="help-content" style="padding: 5px;max-width: 400px;">
                    <h4 style="margin: 0 0 10px 0; color: #007bff;">
                        💡 帮助信息
                    </h4>
                    <p style="margin: 0; font-size: 13px; line-height: 1.4;">
                        这是通过 slot
                        引用的帮助内容。您可以在这里放置任何HTML内容，包括格式化文本、链接和图标。
                    </p>
                </div>

                <div slot="user-info" style="padding: 10px; max-width: 200px;">
                    <div
                        style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;"
                    >
                        <div
                            style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;"
                        >
                            User
                        </div>
                        <div>
                            <div style="font-weight: bold;">用户名</div>
                            <div style="font-size: 12px; color: #666;">
                                user@example.com
                            </div>
                        </div>
                    </div>
                    <div
                        style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 8px;"
                    >
                        注册时间：2024-01-15
                    </div>
                </div>

                <div
                    slot="warning-message"
                    style="padding: 10px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; max-width: 200px;"
                >
                    <div
                        style="display: flex; align-items: center; gap: 8px; color: #856404;"
                    >
                        <span style="font-size: 18px;">⚠️</span>
                        <strong>警告</strong>
                    </div>
                    <p
                        style="margin: 8px 0 0 0; font-size: 13px; color: #856404;"
                    >
                        此操作可能会影响系统性能，建议在非高峰期执行。
                    </p>
                </div>
            </tooltip-demo>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: '使用 `data-tooltip="slot://<slotname>"` 属性从 host 元素的指定 slot 中获取提示内容。',
            },
        },
    },
};

export const 全局查询内容来源: Story = {
    name: "全局查询内容来源",
    render: () => html`<tooltip-demo>
        <!-- 全局查询内容容器 -->
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <!-- 全局查询内容容器 -->
            <div id="global-tooltip-content" style="display: none;">
                <div
                    style="padding: 12px; background: #e3f2fd; border-radius: 4px; border-left: 4px solid #2196f3;"
                >
                    <h4
                        style="margin: 0 0 8px 0; color: #1976d2; font-size: 14px;"
                    >
                        📋 全局提示信息
                    </h4>
                    <p
                        style="margin: 0; font-size: 13px; color: #424242; line-height: 1.4;"
                    >
                        这个内容来自于全局文档查询，可以在多个地方复用。
                    </p>
                </div>
            </div>

            <div id="status-indicator" style="display: none;">
                <div
                    style="display: flex; gap: 8px; padding: 8px;flex-direction:column"
                >
                    <h3>状态指示器</h3>
                    <span style="font-size: 13px; color: #2e7d32;"
                        >系统运行正常</span
                    >
                </div>
            </div>

            <div id="action-buttons" style="display: none;">
                <div style="display: flex; gap: 6px;">
                    <button
                        style="padding: 4px 8px; font-size: 11px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;"
                    >
                        确认
                    </button>
                    <button
                        style="padding: 4px 8px; font-size: 11px; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer;"
                    >
                        取消
                    </button>
                </div>
            </div>

            <button
                data-tooltip="query://#global-tooltip-content"
                data-tooltip-placement="top"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                查询全局内容
            </button>

            <button
                data-tooltip="query://#status-indicator"
                data-tooltip-placement="bottom"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                状态指示器
            </button>

            <button
                data-tooltip="query://#action-buttons"
                data-tooltip-placement="right"
                style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
                操作按钮组
            </button>
        </div></tooltip-demo
    > `,
    parameters: {
        docs: {
            description: {
                story: '使用 `data-tooltip="query://<selector>"` 属性从全局文档中查询元素作为提示内容。',
            },
        },
    },
};

export const 局部选择器内容来源: Story = {
    name: "局部选择器内容来源",
    render: () => html`<tooltip-demo>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <div style="position: relative;">
                <button
                    data-tooltip="query://.tooltip-content"
                    data-tooltip-placement="top"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    选择器内容1<!-- 隐藏的内容元素 -->
                    <div class="tooltip-content" style="display: none;">
                        <div
                            style="padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px;"
                        >
                            <div style="font-weight: bold; margin-bottom: 5px;">
                                📌 局部内容1
                            </div>
                            <div style="font-size: 13px; color: #6c757d;">
                                这个内容来自于按钮内部的选择器查询。
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div style="position: relative;">
                <button
                    data-tooltip="query://.complex-tooltip"
                    data-tooltip-placement="bottom"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    选择器内容2
                    <div class="complex-tooltip" style="display: none;">
                        <div
                            style="padding: 12px; background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); border-radius: 6px; color: #333;"
                        >
                            <div
                                style="display: flex;  gap: 8px; margin-bottom: 8px;"
                            >
                                <span style="font-size: 20px;">🎨</span>
                                <strong style="color: #d84315;"
                                    >复杂内容</strong
                                >
                            </div>
                            <ul
                                style="margin: 0; padding-left: 16px; font-size: 12px;"
                            >
                                <li>支持富文本格式</li>
                                <li>可以包含多种元素</li>
                                <li>样式完全可控</li>
                            </ul>
                        </div>
                    </div>
                </button>
            </div>

            <div style="position: relative;">
                <button
                    data-tooltip="query://.interactive-content"
                    data-tooltip-placement="right"
                >
                    交互内容
                    <div class="interactive-content" style="display: none;">
                        <div style="margin-bottom: 8px;">
                            <strong style="color: #155724;">🔧 交互操作</strong>
                        </div>
                        <div style="font-size: 12px; margin-bottom: 8px;">点击下面的按钮执行操作：</div>
                        <div>OK</div>
                    </div>
                </button>
            </div>
        </tooltip-demo
    > `,
    parameters: {
        docs: {
            description: {
                story: '使用 `data-tooltip="query://<selector>"` 属性从当前元素内部查询元素作为提示内容。',
            },
        },
    },
};

export const 内容来源综合示例: Story = {
    name: "内容来源综合示例",
    render: () => html`
        <tooltip-demo>
            <div
                style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;"
            >
                <!-- 全局查询内容 -->
                <div id="shared-help" style="display: none;">
                    <div
                        style="padding: 8px; background: #e1f5fe; border-left: 3px solid #03a9f4;"
                    >
                        <strong>❓ 帮助：</strong
                        >这是一个共享的帮助内容，可以被多个提示框引用。
                    </div>
                </div>

                <!-- HTML 字符串 -->
                <button
                    data-tooltip="<div style='padding: 8px;'><strong>HTML字符串</strong><br/>直接在属性中定义的HTML内容</div>"
                    data-tooltip-placement="top"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    HTML 字符串
                </button>

                <!-- Slot 引用 -->
                <button
                    data-tooltip="slot://demo-slot"
                    data-tooltip-placement="bottom"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    Slot 引用
                </button>

                <!-- 全局查询 -->
                <button
                    data-tooltip="query://#shared-help"
                    data-tooltip-placement="right"
                    style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                >
                    全局查询
                </button>

                <!-- 局部选择器 -->
                <div style="position: relative;">
                    <button
                        data-tooltip="query://.local-content"
                        data-tooltip-placement="left"
                        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
                    >
                        局部选择器
                    </button>

                    <div class="local-content" style="display: none;">
                        <div
                            style="padding: 8px; background: #fff3e0; border: 1px solid #ffcc02; border-radius: 4px;"
                        >
                            <strong>📍 本地内容：</strong
                            >来自于按钮内部的选择器查询。
                        </div>
                    </div>
                </div>

                <!-- Slot 内容定义 -->
                <div slot="demo-slot" style="display: none;">
                    <div
                        style="padding: 10px; background: #f3e5f5; border: 1px solid #ce93d8; border-radius: 4px;"
                    >
                        <strong>🎯 Slot 内容：</strong>
                        这个内容来自于 host 元素的 slot，可以被多个组件复用。
                    </div>
                </div>
            </div>
        </tooltip-demo>
    `,
    parameters: {
        docs: {
            description: {
                story: "综合展示所有三种内容来源方式的对比：HTML字符串、slot引用、全局查询和局部选择器。",
            },
        },
    },
};
