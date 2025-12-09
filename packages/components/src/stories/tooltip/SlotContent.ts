import type { Meta, StoryObj } from "@storybook/web-components";
import { html, LitElement } from "lit";

const meta: Meta = {
  title: "Tooltip/Slot内容",
  tags: ["autodocs"],
  render: () => html`<tooltip-slot-demo></tooltip-slot-demo>`,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story: "演示如何使用Slot内容来创建动态和可重用的提示框内容。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// 创建一个包含slot的演示组件
class TooltipSlotDemo extends LitElement {
  static properties = {
    storyType: { type: String },
  };

  constructor() {
    super();
    this.storyType = 'basic';
  }

  render() {
    switch (this.storyType) {
      case 'basic':
        return html`
          <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <button
              data-tooltip="slot::help-content"
              data-tooltip-placement="top"
              data-tooltip-arrow="true"
              style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
              基础Slot提示
            </button>

            <span
              data-tooltip="slot::warning-content"
              data-tooltip-placement="bottom"
              data-tooltip-arrow="true"
              style="color: #0066cc; text-decoration: underline; cursor: pointer;"
            >
              警告Slot提示
            </span>
          </div>

          <!-- 定义slot内容 -->
          <div style="display: none;">
            <slot name="help-content">
              <div style="padding: 8px;">
                <strong>帮助信息</strong>
                <p style="margin: 8px 0;">这是一个基础的帮助提示内容。</p>
                <small style="color: #666;">了解更多请查看文档。</small>
              </div>
            </slot>

            <slot name="warning-content">
              <div style="padding: 8px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px;">
                <strong style="color: #856404;">⚠️ 警告</strong>
                <p style="margin: 8px 0; color: #856404;">请谨慎操作，此操作可能影响系统功能。</p>
              </div>
            </slot>
          </div>
        `;

      case 'dynamic':
        return html`
          <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <button
              data-tooltip="slot::user-info"
              data-tooltip-placement="top"
              data-tooltip-arrow="true"
              style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
              用户信息
            </button>

            <button
              data-tooltip="slot::settings-info"
              data-tooltip-placement="right"
              data-tooltip-arrow="true"
              style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
              设置信息
            </button>

            <button
              data-tooltip="slot::status-info"
              data-tooltip-placement="bottom"
              data-tooltip-arrow="true"
              style="padding: 12px 20px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;"
            >
              状态信息
            </button>
          </div>

          <!-- 动态slot内容 -->
          <div style="display: none;">
            <slot name="user-info">
              <div style="padding: 12px; min-width: 200px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                  <div style="width: 40px; height: 40px; background: #007bff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                    U
                  </div>
                  <div>
                    <div style="font-weight: bold;">张三</div>
                    <div style="font-size: 12px; color: #666;">普通用户</div>
                  </div>
                </div>
                <div style="border-top: 1px solid #eee; padding-top: 8px; font-size: 12px;">
                  <div>📧 zhang.san@example.com</div>
                  <div>📱 138-0000-0000</div>
                  <div>🏢 技术部</div>
                </div>
              </div>
            </slot>

            <slot name="settings-info">
              <div style="padding: 12px; min-width: 180px;">
                <h4 style="margin: 0 0 10px 0; color: #333;">⚙️ 快速设置</h4>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" checked disabled>
                    <span>启用通知</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" disabled>
                    <span>自动保存</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" checked disabled>
                    <span>显示隐藏文件</span>
                  </label>
                </div>
              </div>
            </slot>

            <slot name="status-info">
              <div style="padding: 12px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                  <div style="width: 12px; height: 12px; background: #28a745; border-radius: 50%;"></div>
                  <span style="font-weight: bold;">系统正常</span>
                </div>
                <div style="font-size: 12px; color: #666;">
                  <div>CPU使用率：15%</div>
                  <div>内存使用率：42%</div>
                  <div>磁盘空间：78GB/100GB</div>
                  <div>最后更新：2分钟前</div>
                </div>
              </div>
            </slot>
          </div>
        `;

      default:
        return html`<div>Unknown story type</div>`;
    }
  }
}

customElements.define('tooltip-slot-demo', TooltipSlotDemo);

export const 基础Slot内容: Story = {
  name: "基础Slot内容",
  render: () => html`<tooltip-slot-demo story-type="basic"></tooltip-slot-demo>`,
  parameters: {
    docs: {
      description: {
        story: "使用 `data-tooltip=\"slot::<slot-name>\"` 语法来引用具名Slot的内容。Slot内容在组件渲染时动态插入。",
      },
    },
  },
};

export const 动态Slot内容: Story = {
  name: "动态Slot内容",
  render: () => html`<tooltip-slot-demo story-type="dynamic"></tooltip-slot-demo>`,
  parameters: {
    docs: {
      description: {
        story: "Slot内容可以包含复杂的HTML结构、表单元素、数据展示等，提供高度的内容定制能力。",
      },
    },
  },
};

export const 多个Slot: Story = {
  name: "多个Slot",
  render: () => html`
    <style>
      .multiple-slots-container {
        padding: 40px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }
      .slot-button {
        padding: 10px 16px;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        transition: all 0.2s;
      }
      .slot-button:hover {
        border-color: #007bff;
        box-shadow: 0 2px 4px rgba(0,123,255,0.1);
      }
      .hidden-slots {
        display: none;
      }
      .tooltip-content {
        padding: 12px;
      }
      .tooltip-header {
        font-weight: bold;
        margin-bottom: 8px;
        color: #333;
      }
      .tooltip-body {
        font-size: 14px;
        line-height: 1.4;
        color: #666;
      }
    </style>

    <div class="multiple-slots-container">
      <button
        class="slot-button"
        data-tooltip="slot::feature1"
        data-tooltip-placement="top"
        data-tooltip-arrow="true"
      >
        功能一
      </button>

      <button
        class="slot-button"
        data-tooltip="slot::feature2"
        data-tooltip-placement="bottom"
        data-tooltip-arrow="true"
      >
        功能二
      </button>

      <button
        class="slot-button"
        data-tooltip="slot::feature3"
        data-tooltip-placement="left"
        data-tooltip-arrow="true"
      >
        功能三
      </button>

      <button
        class="slot-button"
        data-tooltip="slot::feature4"
        data-tooltip-placement="right"
        data-tooltip-arrow="true"
      >
        功能四
      </button>
    </div>

    <div class="hidden-slots">
      <div slot="feature1">
        <div class="tooltip-content">
          <div class="tooltip-header">🚀 快速开始</div>
          <div class="tooltip-body">
            一键启动项目，自动配置开发环境，支持热重载和实时预览功能。
          </div>
        </div>
      </div>

      <div slot="feature2">
        <div class="tooltip-content">
          <div class="tooltip-header">📊 数据分析</div>
          <div class="tooltip-body">
            智能数据可视化工具，支持多种图表类型，实时数据更新和交互式探索。
          </div>
        </div>
      </div>

      <div slot="feature3">
        <div class="tooltip-content">
          <div class="tooltip-header">🔧 系统配置</div>
          <div class="tooltip-body">
            全面的系统设置面板，包括权限管理、性能优化和安全配置选项。
          </div>
        </div>
      </div>

      <div slot="feature4">
        <div class="tooltip-content">
          <div class="tooltip-header">📈 报表生成</div>
          <div class="tooltip-body">
            自动化报表工具，支持自定义模板、定时生成和多格式导出功能。
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "一个组件可以定义多个不同的Slot，每个Slot对应不同的提示内容，实现内容的模块化管理。",
      },
    },
  },
};

export const 响应式Slot: Story = {
  name: "响应式Slot",
  render: () => html`
    <style>
      .responsive-demo {
        padding: 40px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
      }
      .responsive-buttons {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .responsive-button {
        padding: 12px 20px;
        border: 1px solid #007bff;
        background: #007bff;
        color: white;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s;
      }
      .responsive-button:hover {
        background: #0056b3;
        border-color: #0056b3;
      }
      .status-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
      }
      .status-online { background: #d4edda; color: #155724; }
      .status-offline { background: #f8d7da; color: #721c24; }
      .status-busy { background: #fff3cd; color: #856404; }
    </style>

    <div class="responsive-demo">
      <div class="responsive-buttons">
        <button
          class="responsive-button"
          data-tooltip="slot::connection-status"
          data-tooltip-placement="top"
          data-tooltip-arrow="true"
        >
          连接状态
        </button>

        <button
          class="responsive-button"
          data-tooltip="slot::performance-metrics"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
        >
          性能指标
        </button>

        <div class="status-indicator status-online" data-tooltip="slot::online-details" data-tooltip-placement="right" data-tooltip-arrow="true">
          <span style="width: 8px; height: 8px; background: #28a745; border-radius: 50%;"></span>
          在线
        </div>
      </div>
    </div>

    <!-- 隐藏的Slot内容 -->
    <div style="display: none;">
      <div slot="connection-status">
        <div style="padding: 12px;">
          <h4 style="margin: 0 0 10px 0;">🔌 连接信息</h4>
          <div style="font-size: 14px; line-height: 1.5;">
            <div><strong>服务器：</strong>api.example.com</div>
            <div><strong>端口：</strong>443 (HTTPS)</div>
            <div><strong>协议：</strong>WebSocket</div>
            <div><strong>延迟：</strong><span id="latency">45</span>ms</div>
            <div style="margin-top: 8px; color: #28a745; font-size: 12px;">✅ 连接正常</div>
          </div>
        </div>
      </div>

      <div slot="performance-metrics">
        <div style="padding: 12px; min-width: 200px;">
          <h4 style="margin: 0 0 12px 0;">📊 性能数据</h4>
          <div style="font-size: 13px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span>CPU使用率</span>
              <span style="font-weight: bold;">23%</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span>内存使用率</span>
              <span style="font-weight: bold;">67%</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span>磁盘I/O</span>
              <span style="font-weight: bold;">125 MB/s</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>网络带宽</span>
              <span style="font-weight: bold;">892 Mbps</span>
            </div>
          </div>
        </div>
      </div>

      <div slot="online-details">
        <div style="padding: 10px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <div style="width: 12px; height: 12px; background: #28a745; border-radius: 50%;"></div>
            <strong>服务正常运行</strong>
          </div>
          <div style="font-size: 12px; color: #666;">
            <div>运行时间：3天14小时</div>
            <div>响应时间：&lt;100ms</div>
            <div>成功率：99.8%</div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Slot内容可以根据应用状态动态更新，显示实时数据、状态信息和交互式内容。",
      },
    },
  },
};