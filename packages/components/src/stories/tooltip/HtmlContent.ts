import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../tooltip/TooltipDemo";

const meta: Meta = {
  title: "Tooltip/HTML内容",
  tags: ["autodocs"],
  render: () => html`<tooltip-html-demo></tooltip-html-demo>`,
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
  render: () => html`
    <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
      <button
        data-tooltip="<b>粗体文字</b>和<strong>强调文字</strong>"
        data-tooltip-placement="top"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        文字格式
      </button>

      <button
        data-tooltip="<em>斜体文字</em>和<i>斜体强调</i>"
        data-tooltip-placement="bottom"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        斜体格式
      </button>

      <button
        data-tooltip="<u>下划线文字</u>和<del>删除线文字</del>"
        data-tooltip-placement="right"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        其他格式
      </button>

      <button
        data-tooltip="<span style='color: #dc3545; font-weight: bold;'>红色粗体</span>和<span style='color: #007bff;'>蓝色文字</span>"
        data-tooltip-placement="left"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        彩色文字
      </button>
    </div>
  `,
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
  render: () => html`
    <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
      <button
        data-tooltip="这是第一行<br/>这是第二行<br/>这是第三行"
        data-tooltip-placement="top"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        简单换行
      </button>

      <button
        data-tooltip="<p>段落一：这是一段较长的文本内容，展示了如何在提示框中使用段落标签。</p><p>段落二：另一个段落，包含更多的信息内容。</p>"
        data-tooltip-placement="bottom"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        段落文本
      </button>

      <button
        data-tooltip="<div style='line-height: 1.8;'>1. 第一项内容<br/>2. 第二项内容<br/>3. 第三项内容<br/>4. 第四项内容</div>"
        data-tooltip-placement="right"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        列表内容
      </button>
    </div>
  `,
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
  render: () => html`
    <div style="display: flex; gap: 30px; flex-wrap: wrap; padding: 40px;">
      <button
        data-tooltip="更多信息请访问：<a href='#' style='color: #007bff; text-decoration: none;'>查看文档</a>"
        data-tooltip-placement="top"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        包含链接
      </button>

      <button
        data-tooltip="相关操作：<br/><button onclick='alert(\"操作执行\")' style='margin: 5px; padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer;'>执行操作</button>"
        data-tooltip-placement="bottom"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        包含按钮
      </button>

      <span
        data-tooltip="联系支持：<br/>📧 support@example.com<br/>📞 400-123-4567<br/>💬 在线客服"
        data-tooltip-placement="right"
        data-tooltip-arrow="true"
        style="padding: 8px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px; cursor: help;"
      >
        联系信息
      </span>
    </div>
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
  render: () => html`
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
        data-tooltip-arrow="true"
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
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        功能列表
      </button>
    </div>
  `,
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
  render: () => html`
    <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
      <button
        data-tooltip="<span style='font-size: 20px; margin-right: 5px;'>✅</span>操作成功完成"
        data-tooltip-placement="top"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        成功状态
      </button>

      <button
        data-tooltip="<span style='font-size: 20px; margin-right: 5px;'>⚠️</span><span style='color: #856404;'>警告：此操作不可逆</span>"
        data-tooltip-placement="bottom"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        警告信息
      </button>

      <button
        data-tooltip="<span style='font-size: 20px; margin-right: 5px;'>❌</span><span style='color: #721c24;'>错误：操作失败</span>"
        data-tooltip-placement="left"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        错误状态
      </button>

      <button
        data-tooltip="<span style='font-size: 20px; margin-right: 5px;'>💡</span>提示：按Ctrl+S保存"
        data-tooltip-placement="right"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        提示信息
      </button>

      <button
        data-tooltip="
          <div style='display: flex; align-items: center; gap: 10px;'>
            <span style='font-size: 24px;'>🎯</span>
            <div>
              <div style='font-weight: bold;'>目标完成</div>
              <div style='font-size: 12px; color: #666;'>进度：100%</div>
            </div>
          </div>
        "
        data-tooltip-placement="top"
        data-tooltip-arrow="true"
        style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
      >
        复杂布局
      </button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "使用图标、表情符号和自定义样式来创建视觉上吸引人的提示框内容。",
      },
    },
  },
};