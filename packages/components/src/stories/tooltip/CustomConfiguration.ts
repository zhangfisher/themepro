import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../tooltip/TooltipDemo";

const meta: Meta = {
  title: "Tooltip/自定义配置",
  tags: ["autodocs"],
  render: () => html`<tooltip-config-demo></tooltip-config-demo>`,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story: "演示如何通过各种配置选项来自定义提示框的外观和行为。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const 独立属性配置: Story = {
  name: "独立属性配置",
  render: () => html`
    <style>
      .config-demo {
        padding: 40px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }
      .config-button {
        padding: 12px 20px;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      }
      .config-button:hover {
        border-color: #007bff;
        box-shadow: 0 2px 4px rgba(0,123,255,0.1);
      }
    </style>

    <div class="config-demo">
      <!-- 自定义位置 -->
      <button
        class="config-button"
        data-tooltip="底部右侧显示"
        data-tooltip-placement="bottom-end"
        data-tooltip-arrow="true"
        data-tooltip-animation-duration="200"
      >
        底部右侧
      </button>

      <!-- 自定义动画时长 -->
      <button
        class="config-button"
        data-tooltip="慢速动画效果"
        data-tooltip-placement="top"
        data-tooltip-arrow="true"
        data-tooltip-animation-duration="500"
        data-tooltip-animation-easing="easeInOutQuad"
      >
        慢速动画
      </button>

      <!-- 自定义偏移 -->
      <button
        class="config-button"
        data-tooltip="偏移15px"
        data-tooltip-placement="right"
        data-tooltip-arrow="true"
        data-tooltip-offset='[15, 8]'
      >
        右侧偏移
      </button>

      <!-- 自定义延迟隐藏 -->
      <button
        class="config-button"
        data-tooltip="3秒后自动隐藏"
        data-tooltip-placement="bottom"
        data-tooltip-arrow="true"
        data-tooltip-delay-hide="3000"
      >
        延迟隐藏
      </button>

      <!-- 自定义样式类 -->
      <button
        class="config-button"
        data-tooltip="自定义样式"
        data-tooltip-placement="top"
        data-tooltip-arrow="true"
        data-tooltip-class-name="custom-tooltip"
      >
        自定义样式
      </button>

      <!-- 组合配置 -->
      <button
        class="config-button"
        data-tooltip="多种自定义配置的组合效果"
        data-tooltip-placement="left"
        data-tooltip-arrow="true"
        data-tooltip-animation-duration="300"
        data-tooltip-animation-easing="easeOutBounce"
        data-tooltip-offset='[10, 15]'
        data-tooltip-delay-hide="2000"
      >
        组合配置
      </button>
    </div>

    <!-- 定义自定义样式 -->
    <style>
      .custom-tooltip {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        font-weight: 500;
      }
      .custom-tooltip .tooltip-arrow {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
      }
    </style>
  `,
  parameters: {
    docs: {
      description: {
        story: "通过 `data-tooltip-*` 属性独立配置每个提示框的位置、动画、偏移等参数。",
      },
    },
  },
};

export const JSON配置: Story = {
  name: "JSON配置",
  render: () => html`
    <style>
      .json-demo {
        padding: 40px;
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .json-button {
        padding: 14px 24px;
        border: none;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        min-width: 120px;
      }
      .primary { background: #007bff; color: white; }
      .success { background: #28a745; color: white; }
      .warning { background: #ffc107; color: #212529; }
      .danger { background: #dc3545; color: white; }
      .info { background: #17a2b8; color: white; }
      .dark { background: #343a40; color: white; }
      .json-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
    </style>

    <div class="json-demo">
      <!-- 基础JSON配置 -->
      <button
        class="json-button primary"
        data-tooltip="主要操作按钮"
        data-tooltip-options='{"placement": "bottom", "arrow": true, "animationDuration": 200}'
      >
        主要按钮
      </button>

      <!-- 成功样式JSON配置 -->
      <button
        class="json-button success"
        data-tooltip="操作成功完成"
        data-tooltip-options='{"placement": "top", "arrow": true, "animationDuration": 300, "animationEasing": "easeOutBounce", "delayHide": 2000}'
      >
        成功按钮
      </button>

      <!-- 警告样式JSON配置 -->
      <button
        class="json-button warning"
        data-tooltip="注意：此操作可能需要较长时间"
        data-tooltip-options='{"placement": "right", "arrow": true, "animationDuration": 400, "delayHide": 5000, "className": "warning-tooltip"}'
      >
        警告按钮
      </button>

      <!-- 危险样式JSON配置 -->
      <button
        class="json-button danger"
        data-tooltip="⚠️ 不可逆操作！此操作将永久删除数据"
        data-tooltip-options='{"placement": "top", "arrow": true, "animationDuration": 250, "delayHide": 0, "trigger": "click"}'
      >
        危险按钮
      </button>

      <!-- 信息样式JSON配置 -->
      <button
        class="json-button info"
        data-tooltip="更多信息请查看帮助文档"
        data-tooltip-options='{"placement": "left", "arrow": true, "animationDuration": 200, "offset": [8, 12]}'
      >
        信息按钮
      </button>

      <!-- 深色主题JSON配置 -->
      <button
        class="json-button dark"
        data-tooltip="深色主题提示框样式"
        data-tooltip-options='{"placement": "bottom", "arrow": true, "animationDuration": 300, "className": "dark-tooltip"}'
      >
        深色主题
      </button>
    </div>

    <!-- 自定义样式 -->
    <style>
      .warning-tooltip {
        background: #fff3cd;
        color: #856404;
        border: 1px solid #ffeaa7;
        box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
      }
      .warning-tooltip .tooltip-arrow {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
      }
      .dark-tooltip {
        background: #2c3e50;
        color: #ecf0f1;
        border: 1px solid #34495e;
        box-shadow: 0 4px 12px rgba(44, 62, 80, 0.4);
      }
      .dark-tooltip .tooltip-arrow {
        background: #2c3e50;
        border: 1px solid #34495e;
      }
    </style>
  `,
  parameters: {
    docs: {
      description: {
        story: "使用 `data-tooltip-options` 属性传入JSON格式的配置对象，一次性设置多个参数。",
      },
    },
  },
};

export const 主题和样式: Story = {
  name: "主题和样式",
  render: () => html`
    <style>
      .theme-demo {
        padding: 40px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }
      .theme-button {
        padding: 12px 20px;
        border: 2px solid;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .theme-button:hover {
        transform: scale(1.05);
      }
    </style>

    <div class="theme-demo">
      <!-- 成功主题 -->
      <button
        class="theme-button"
        style="border-color: #28a745; background: white; color: #28a745;"
        data-tooltip="操作成功执行"
        data-tooltip-options='{"placement": "top", "arrow": true, "animationDuration": 200, "className": "success-theme"}'
      >
        成功主题
      </button>

      <!-- 错误主题 -->
      <button
        class="theme-button"
        style="border-color: #dc3545; background: white; color: #dc3545;"
        data-tooltip="操作失败，请重试"
        data-tooltip-options='{"placement": "bottom", "arrow": true, "animationDuration": 250, "className": "error-theme"}'
      >
        错误主题
      </button>

      <!-- 警告主题 -->
      <button
        class="theme-button"
        style="border-color: #ffc107; background: white; color: #ffc107;"
        data-tooltip="请注意此操作"
        data-tooltip-options='{"placement": "right", "arrow": true, "animationDuration": 200, "className": "warning-theme"}'
      >
        警告主题
      </button>

      <!-- 信息主题 -->
      <button
        class="theme-button"
        style="border-color: #17a2b8; background: white; color: #17a2b8;"
        data-tooltip="提示信息"
        data-tooltip-options='{"placement": "left", "arrow": true, "animationDuration": 200, "className": "info-theme"}'
      >
        信息主题
      </button>

      <!-- 深色主题 -->
      <button
        class="theme-button"
        style="border-color: #343a40; background: white; color: #343a40;"
        data-tooltip="深色模式提示"
        data-tooltip-options='{"placement": "top", "arrow": true, "animationDuration": 300, "className": "dark-theme"}'
      >
        深色主题
      </button>

      <!-- 渐变主题 -->
      <button
        class="theme-button"
        style="border-color: #6f42c1; background: white; color: #6f42c1;"
        data-tooltip="渐变背景提示"
        data-tooltip-options='{"placement": "bottom", "arrow": true, "animationDuration": 300, "className": "gradient-theme"}'
      >
        渐变主题
      </button>
    </div>

    <!-- 主题样式 -->
    <style>
      .success-theme {
        background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
        color: #155724;
        border: 1px solid #b8dacc;
        box-shadow: 0 2px 8px rgba(40, 167, 69, 0.2);
      }
      .success-theme .tooltip-arrow {
        background: #d4edda;
        border: 1px solid #b8dacc;
      }

      .error-theme {
        background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
        color: #721c24;
        border: 1px solid #f1b0b7;
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.2);
      }
      .error-theme .tooltip-arrow {
        background: #f8d7da;
        border: 1px solid #f1b0b7;
      }

      .warning-theme {
        background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
        color: #856404;
        border: 1px solid #ffdf7e;
        box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
      }
      .warning-theme .tooltip-arrow {
        background: #fff3cd;
        border: 1px solid #ffdf7e;
      }

      .info-theme {
        background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
        color: #0c5460;
        border: 1px solid #abdde5;
        box-shadow: 0 2px 8px rgba(23, 162, 184, 0.2);
      }
      .info-theme .tooltip-arrow {
        background: #d1ecf1;
        border: 1px solid #abdde5;
      }

      .dark-theme {
        background: linear-gradient(135deg, #343a40 0%, #495057 100%);
        color: #f8f9fa;
        border: 1px solid #6c757d;
        box-shadow: 0 4px 12px rgba(52, 58, 64, 0.4);
      }
      .dark-theme .tooltip-arrow {
        background: #343a40;
        border: 1px solid #6c757d;
      }

      .gradient-theme {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: 1px solid #5a67d8;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }
      .gradient-theme .tooltip-arrow {
        background: #667eea;
        border: 1px solid #5a67d8;
      }
    </style>
  `,
  parameters: {
    docs: {
      description: {
        story: "通过 `className` 配置和CSS自定义样式，创建不同主题的提示框外观。",
      },
    },
  },
};

export const 动画配置: Story = {
  name: "动画配置",
  render: () => html`
    <style>
      .animation-demo {
        padding: 40px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 20px;
      }
      .animation-button {
        padding: 12px 18px;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      }
      .animation-button:hover {
        border-color: #007bff;
        transform: translateY(-1px);
      }
    </style>

    <div class="animation-demo">
      <!-- 快速动画 -->
      <button
        class="animation-button"
        data-tooltip="快速显示隐藏"
        data-tooltip-options='{"placement": "top", "arrow": true, "animationDuration": 100, "animationEasing": "easeOutQuad"}'
      >
        快速动画
      </button>

      <!-- 慢速动画 -->
      <button
        class="animation-button"
        data-tooltip="缓慢显示隐藏"
        data-tooltip-options='{"placement": "bottom", "arrow": true, "animationDuration": 600, "animationEasing": "easeInOutQuad"}'
      >
        慢速动画
      </button>

      <!-- 弹跳动画 -->
      <button
        class="animation-button"
        data-tooltip="弹跳效果"
        data-tooltip-options='{"placement": "right", "arrow": true, "animationDuration": 400, "animationEasing": "easeOutBounce"}'
      >
        弹跳动画
      </button>

      <!-- 回弹动画 -->
      <button
        class="animation-button"
        data-tooltip="回弹效果"
        data-tooltip-options='{"placement": "left", "arrow": true, "animationDuration": 500, "animationEasing": "easeOutBack"}'
      >
        回弹动画
      </button>

      <!-- 弹性动画 -->
      <button
        class="animation-button"
        data-tooltip="弹性效果"
        data-tooltip-options='{"placement": "top", "arrow": true, "animationDuration": 800, "animationEasing": "easeOutElastic"}'
      >
        弹性动画
      </button>

      <!-- 循环动画 -->
      <button
        class="animation-button"
        data-tooltip="循环效果"
        data-tooltip-options='{"placement": "bottom", "arrow": true, "animationDuration": 300, "animationEasing": "easeInOutSine"}'
      >
        正弦动画
      </button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "通过 `animationDuration` 和 `animationEasing` 配置自定义动画效果，控制显示和隐藏的速度和缓动曲线。",
      },
    },
  },
};