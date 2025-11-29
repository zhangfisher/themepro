import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../tooltip/TooltipDemo";

const meta: Meta = {
  title: "Tooltip/复杂场景",
  tags: ["autodocs"],
  render: () => html`<tooltip-complex-demo></tooltip-complex-demo>`,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story: "演示Tooltip在实际复杂应用场景中的使用方法，包括表单验证、数据表格、工具栏等。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const 表单验证: Story = {
  name: "表单验证",
  render: () => html`
    <style>
      .form-container {
        padding: 40px;
        max-width: 600px;
        margin: 0 auto;
      }
      .form-group {
        margin-bottom: 20px;
      }
      .form-label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: #333;
      }
      .form-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        transition: border-color 0.3s;
      }
      .form-input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }
      .form-input.error {
        border-color: #dc3545;
      }
      .form-input.success {
        border-color: #28a745;
      }
      .form-select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        background: white;
      }
      .validation-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
      }
    </style>

    <div class="form-container">
      <h3>用户注册表单</h3>

      <div class="form-group" style="position: relative;">
        <label class="form-label">用户名 *</label>
        <input
          type="text"
          class="form-input"
          placeholder="请输入用户名（6-20位字符）"
          data-tooltip="用户名要求：<br/>• 长度6-20个字符<br/>• 只能包含字母、数字和下划线<br/>• 不能以下划线开头或结尾"
          data-tooltip-placement="right"
          data-tooltip-arrow="true"
          data-tooltip-trigger="focus"
          data-tooltip-class-name="validation-tooltip"
        />
      </div>

      <div class="form-group" style="position: relative;">
        <label class="form-label">邮箱地址 *</label>
        <input
          type="email"
          class="form-input"
          placeholder="请输入有效的邮箱地址"
          data-tooltip="邮箱格式要求：<br/>• 必须包含@符号<br/>• @前后都要有字符<br/>• 不能包含特殊字符如空格"
          data-tooltip-placement="right"
          data-tooltip-arrow="true"
          data-tooltip-trigger="focus"
          data-tooltip-class-name="validation-tooltip"
        />
      </div>

      <div class="form-group" style="position: relative;">
        <label class="form-label">密码 *</label>
        <input
          type="password"
          class="form-input"
          placeholder="请输入密码（至少8位）"
          data-tooltip="密码强度要求：<br/>• 至少8个字符<br/>• 包含大写字母：A-Z<br/>• 包含小写字母：a-z<br/>• 包含数字：0-9<br/>• 建议包含特殊字符"
          data-tooltip-placement="right"
          data-tooltip-arrow="true"
          data-tooltip-trigger="focus"
          data-tooltip-class-name="password-tooltip"
        />
      </div>

      <div class="form-group">
        <label class="form-label">用户类型 *</label>
        <select class="form-select"
          data-tooltip="请选择适合的用户类型：<br/>• 个人用户：个人使用<br/>• 企业用户：团队协作<br/>• 开发者：API访问权限"
          data-tooltip-placement="top"
          data-tooltip-arrow="true"
          data-tooltip-trigger="focus"
          data-tooltip-class-name="validation-tooltip"
        >
          <option value="">请选择用户类型</option>
          <option value="personal">个人用户</option>
          <option value="enterprise">企业用户</option>
          <option value="developer">开发者</option>
        </select>
      </div>
    </div>

    <style>
      .validation-tooltip {
        background: #f8f9fa;
        color: #333;
        border: 1px solid #dee2e6;
        max-width: 250px;
      }
      .validation-tooltip .tooltip-arrow {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
      }
      .password-tooltip {
        background: #fff3cd;
        color: #856404;
        border: 1px solid #ffeaa7;
        max-width: 200px;
      }
      .password-tooltip .tooltip-arrow {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
      }
    </style>
  `,
  parameters: {
    docs: {
      description: {
        story: "表单验证场景：在用户填写表单时，通过焦点触发的提示框提供实时的格式要求和验证信息。",
      },
    },
  },
};

export const 数据表格: Story = {
  name: "数据表格",
  render: () => html`
    <style>
      .table-container {
        padding: 40px;
        max-width: 1000px;
        margin: 0 auto;
        overflow-x: auto;
      }
      .data-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-radius: 8px;
        overflow: hidden;
      }
      .data-table th,
      .data-table td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid #e9ecef;
      }
      .data-table th {
        background: #f8f9fa;
        font-weight: 600;
        color: #495057;
      }
      .data-table tr:hover {
        background: #f8f9fa;
      }
      .status-badge {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
      }
      .status-active {
        background: #d4edda;
        color: #155724;
      }
      .status-inactive {
        background: #f8d7da;
        color: #721c24;
      }
      .status-pending {
        background: #fff3cd;
        color: #856404;
      }
      .action-icon {
        cursor: pointer;
        font-size: 18px;
        margin: 0 5px;
        transition: transform 0.2s;
      }
      .action-icon:hover {
        transform: scale(1.2);
      }
    </style>

    <div class="table-container">
      <h3>用户管理表格</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>用户名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>状态</th>
            <th>最后登录</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>张三</td>
            <td>zhang.san@example.com</td>
            <td>
              <span
                data-tooltip="管理员权限：<br/>• 用户管理<br/>• 系统配置<br/>• 数据导出<br/>• 安全设置"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
                data-tooltip-class-name="role-tooltip"
              >
                管理员
              </span>
            </td>
            <td>
              <span class="status-badge status-active"
                data-tooltip="账户状态正常<br/>最后活动：2小时前"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
              >
                活跃
              </span>
            </td>
            <td>2024-01-15 14:30</td>
            <td>
              <span
                class="action-icon"
                data-tooltip="查看用户详细信息"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
                data-tooltip-trigger="mouseover"
              >
                👁️
              </span>
              <span
                class="action-icon"
                data-tooltip="编辑用户信息"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
                data-tooltip-trigger="mouseover"
              >
                ✏️
              </span>
              <span
                class="action-icon"
                data-tooltip="⚠️ 删除操作不可恢复<br/>确定要删除此用户吗？"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
                data-tooltip-trigger="mouseover"
                data-tooltip-class-name="danger-tooltip"
              >
                🗑️
              </span>
            </td>
          </tr>
          <tr>
            <td>李四</td>
            <td>li.si@example.com</td>
            <td>
              <span
                data-tooltip="普通用户权限：<br/>• 查看数据<br/>• 个人资料管理<br/>• 基本操作"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
                data-tooltip-class-name="role-tooltip"
              >
                普通用户
              </span>
            </td>
            <td>
              <span class="status-badge status-inactive"
                data-tooltip="账户已停用<br/>停用原因：违反使用条款<br/>停用时间：2024-01-10"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
              >
                停用
              </span>
            </td>
            <td>2024-01-08 09:15</td>
            <td>
              <span
                class="action-icon"
                data-tooltip="查看用户详细信息"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
                data-tooltip-trigger="mouseover"
              >
                👁️
              </span>
              <span
                class="action-icon"
                data-tooltip="账户已停用，无法编辑"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
                data-tooltip-class-name="disabled-tooltip"
              >
                ✏️
              </span>
            </td>
          </tr>
          <tr>
            <td>王五</td>
            <td>wang.wu@example.com</td>
            <td>
              <span
                data-tooltip="访客权限：<br/>• 只读访问<br/>• 无法编辑<br/>• 临时访问"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
                data-tooltip-class-name="role-tooltip"
              >
                访客
              </span>
            </td>
            <td>
              <span class="status-badge status-pending"
                data-tooltip="账户待审核<br/>注册时间：2024-01-14<br/>等待管理员审核"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
              >
                待审核
              </span>
            </td>
            <td>2024-01-14 16:45</td>
            <td>
              <span
                class="action-icon"
                data-tooltip="查看待审核信息"
                data-tooltip-placement="top"
                data-tooltip-arrow="true"
                data-tooltip-trigger="mouseover"
              >
                👁️
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <style>
      .role-tooltip {
        background: #e7f3ff;
        color: #004085;
        border: 1px solid #b8daff;
        max-width: 150px;
      }
      .role-tooltip .tooltip-arrow {
        background: #e7f3ff;
        border: 1px solid #b8daff;
      }
      .danger-tooltip {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
        max-width: 120px;
      }
      .danger-tooltip .tooltip-arrow {
        background: #f8d7da;
        border: 1px solid #f5c6cb;
      }
      .disabled-tooltip {
        background: #e2e3e5;
        color: #383d41;
        border: 1px solid #ced4da;
        max-width: 100px;
      }
      .disabled-tooltip .tooltip-arrow {
        background: #e2e3e5;
        border: 1px solid #ced4da;
      }
    </style>
  `,
  parameters: {
    docs: {
      description: {
        story: "数据表格场景：在表格中使用提示框显示详细信息、权限说明、状态描述和操作提示，提升表格的信息密度和用户体验。",
      },
    },
  },
};

export const 工具栏和菜单: Story = {
  name: "工具栏和菜单",
  render: () => html`
    <style>
      .toolbar-container {
        padding: 40px;
        background: #f8f9fa;
      }
      .toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin-bottom: 20px;
        flex-wrap: wrap;
      }
      .tool-button {
        padding: 8px 12px;
        border: 1px solid #dee2e6;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        transition: all 0.2s;
      }
      .tool-button:hover {
        background: #f8f9fa;
        border-color: #adb5bd;
      }
      .tool-button.active {
        background: #007bff;
        color: white;
        border-color: #007bff;
      }
      .tool-icon {
        font-size: 16px;
      }
      .divider {
        width: 1px;
        height: 24px;
        background: #dee2e6;
      }
      .menu-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }
      .menu-section {
        background: white;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .menu-title {
        font-weight: 600;
        margin-bottom: 12px;
        color: #333;
      }
      .menu-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      .menu-item:hover {
        background: #f8f9fa;
      }
    </style>

    <div class="toolbar-container">
      <h3>编辑器工具栏</h3>

      <div class="toolbar">
        <button class="tool-button"
          data-tooltip="新建文档 (Ctrl+N)"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
        >
          <span class="tool-icon">📄</span>
          新建
        </button>

        <button class="tool-button"
          data-tooltip="打开文件 (Ctrl+O)"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
        >
          <span class="tool-icon">📂</span>
          打开
        </button>

        <button class="tool-button"
          data-tooltip="保存文件 (Ctrl+S)"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
        >
          <span class="tool-icon">💾</span>
          保存
        </button>

        <div class="divider"></div>

        <button class="tool-button"
          data-tooltip="撤销操作 (Ctrl+Z)"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
        >
          <span class="tool-icon">↶</span>
          撤销
        </button>

        <button class="tool-button"
          data-tooltip="重做操作 (Ctrl+Y)"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
        >
          <span class="tool-icon">↷</span>
          重做
        </button>

        <div class="divider"></div>

        <button class="tool-button active"
          data-tooltip="选择工具<br/>• 点击选择文本<br/>• 拖拽选择区域"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
          data-tooltip-class-name="active-tooltip"
        >
          <span class="tool-icon">🔱</span>
          选择
        </button>

        <button class="tool-button"
          data-tooltip="画笔工具<br/>• 自由绘制<br/>• 支持压力感应"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
        >
          <span class="tool-icon">✏️</span>
          画笔
        </button>

        <button class="tool-button"
          data-tooltip="文本工具<br/>• 插入文本<br/>• 支持富文本格式"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
        >
          <span class="tool-icon">📝</span>
          文本
        </button>

        <div class="divider"></div>

        <button class="tool-button"
          data-tooltip="放大 (Ctrl++)"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
        >
          <span class="tool-icon">🔍+</span>
        </button>

        <button class="tool-button"
          data-tooltip="缩小 (Ctrl+-)"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
        >
          <span class="tool-icon">🔍-</span>
        </button>

        <button class="tool-button"
          data-tooltip="适应窗口 (Ctrl+0)"
          data-tooltip-placement="bottom"
          data-tooltip-arrow="true"
          data-tooltip-trigger="mouseover"
        >
          <span class="tool-icon">⛶</span>
        </button>
      </div>

      <h3 style="margin-top: 30px;">功能菜单</h3>
      <div class="menu-container">
        <div class="menu-section">
          <div class="menu-title">文件操作</div>
          <div class="menu-item"
            data-tooltip="导入文件：支持PDF、Word、Excel格式<br/>最大文件大小：10MB"
            data-tooltip-placement="right"
            data-tooltip-arrow="true"
            data-tooltip-trigger="mouseover"
            data-tooltip-class-name="menu-tooltip"
          >
            <span>📥</span>
            <span>导入文件</span>
          </div>
          <div class="menu-item"
            data-tooltip="导出当前文档<br/>支持格式：PDF、PNG、SVG<br/>质量设置：高/中/低"
            data-tooltip-placement="right"
            data-tooltip-arrow="true"
            data-tooltip-trigger="mouseover"
            data-tooltip-class-name="menu-tooltip"
          >
            <span>📤</span>
            <span>导出文档</span>
          </div>
          <div class="menu-item"
            data-tooltip="打印设置和预览<br/>• 页面布局<br/>• 打印质量<br/>• 打印份数"
            data-tooltip-placement="right"
            data-tooltip-arrow="true"
            data-tooltip-trigger="mouseover"
            data-tooltip-class-name="menu-tooltip"
          >
            <span>🖨️</span>
            <span>打印</span>
          </div>
        </div>

        <div class="menu-section">
          <div class="menu-title">编辑功能</div>
          <div class="menu-item"
            data-tooltip="查找和替换文本<br/>• 支持正则表达式<br/>• 区分大小写"
            data-tooltip-placement="right"
            data-tooltip-arrow="true"
            data-tooltip-trigger="mouseover"
            data-tooltip-class-name="menu-tooltip"
          >
            <span>🔍</span>
            <span>查找替换</span>
          </div>
          <div class="menu-item"
            data-tooltip="拼写检查和语法<br/>• 支持多语言<br/>• 实时检查"
            data-tooltip-placement="right"
            data-tooltip-arrow="true"
            data-tooltip-trigger="mouseover"
            data-tooltip-class-name="menu-tooltip"
          >
            <span>📖</span>
            <span>拼写检查</span>
          </div>
          <div class="menu-item"
            data-tooltip="字数统计和分析<br/>• 总字数<br/>• 段落数<br/>• 预计阅读时间"
            data-tooltip-placement="right"
            data-tooltip-arrow="true"
            data-tooltip-trigger="mouseover"
            data-tooltip-class-name="menu-tooltip"
          >
            <span>📊</span>
            <span>字数统计</span>
          </div>
        </div>

        <div class="menu-section">
          <div class="menu-title">视图选项</div>
          <div class="menu-item"
            data-tooltip="切换全屏模式<br/>• F11快捷键<br/>• ESC退出全屏"
            data-tooltip-placement="right"
            data-tooltip-arrow="true"
            data-tooltip-trigger="mouseover"
            data-tooltip-class-name="menu-tooltip"
          >
            <span>⛶</span>
            <span>全屏模式</span>
          </div>
          <div class="menu-item"
            data-tooltip="显示或隐藏网格线<br/>• 辅助对齐<br/>• 自定义网格大小"
            data-tooltip-placement="right"
            data-tooltip-arrow="true"
            data-tooltip-trigger="mouseover"
            data-tooltip-class-name="menu-tooltip"
          >
            <span>⚏</span>
            <span>网格显示</span>
          </div>
          <div class="menu-item"
            data-tooltip="缩略图导航<br/>• 快速跳转页面<br/>• 缩略图预览"
            data-tooltip-placement="right"
            data-tooltip-arrow="true"
            data-tooltip-trigger="mouseover"
            data-tooltip-class-name="menu-tooltip"
          >
            <span>🖼️</span>
            <span>缩略图</span>
          </div>
        </div>
      </div>
    </div>

    <style>
      .active-tooltip {
        background: #007bff;
        color: white;
        border: 1px solid #0056b3;
      }
      .active-tooltip .tooltip-arrow {
        background: #007bff;
        border: 1px solid #0056b3;
      }
      .menu-tooltip {
        background: #343a40;
        color: #f8f9fa;
        border: 1px solid #495057;
        max-width: 200px;
      }
      .menu-tooltip .tooltip-arrow {
        background: #343a40;
        border: 1px solid #495057;
      }
    </style>
  `,
  parameters: {
    docs: {
      description: {
        story: "工具栏和菜单场景：展示如何在密集的UI界面中使用提示框来提供快捷键说明、功能描述和操作指导。",
      },
    },
  },
};

export const 仪表盘和统计: Story = {
  name: "仪表盘和统计",
  render: () => html`
    <style>
      .dashboard-container {
        padding: 40px;
        background: #f5f7fa;
      }
      .dashboard-title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 30px;
        color: #2c3e50;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }
      .stat-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        transition: transform 0.3s, box-shadow 0.3s;
      }
      .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      }
      .stat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }
      .stat-title {
        font-size: 14px;
        color: #6c757d;
        font-weight: 500;
      }
      .stat-icon {
        font-size: 20px;
        cursor: pointer;
      }
      .stat-value {
        font-size: 28px;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 8px;
      }
      .stat-change {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
      }
      .stat-change.positive {
        background: #d4edda;
        color: #155724;
      }
      .stat-change.negative {
        background: #f8d7da;
        color: #721c24;
      }
      .chart-container {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .chart-title {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
      }
      .chart-actions {
        display: flex;
        gap: 8px;
      }
      .chart-action {
        padding: 6px 12px;
        border: 1px solid #dee2e6;
        background: white;
        border-radius: 6px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .chart-action:hover {
        background: #f8f9fa;
      }
    </style>

    <div class="dashboard-container">
      <h2 class="dashboard-title">业务数据仪表盘</h2>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">总用户数</span>
            <span
              class="stat-icon"
              data-tooltip="用户统计详情：<br/>• 活跃用户：8,234<br/>• 新增用户：+1,245<br/>• 流失用户：-312<br/>• 数据更新：实时"
              data-tooltip-placement="top"
              data-tooltip-arrow="true"
              data-tooltip-trigger="mouseover"
              data-tooltip-class-name="stat-tooltip"
            >
              📊
            </span>
          </div>
          <div class="stat-value">24,567</div>
          <span class="stat-change positive">
            <span>↑</span>
            <span>+12.5%</span>
          </span>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">收入统计</span>
            <span
              class="stat-icon"
              data-tooltip="收入明细：<br/>• 订阅收入：¥458,230<br/>• 广告收入：¥126,890<br/>• 其他收入：¥34,120<br/>• 汇率：USD/CNY 7.25"
              data-tooltip-placement="top"
              data-tooltip-arrow="true"
              data-tooltip-trigger="mouseover"
              data-tooltip-class-name="stat-tooltip"
            >
              💰
            </span>
          </div>
          <div class="stat-value">¥619,240</div>
          <span class="stat-change positive">
            <span>↑</span>
            <span>+8.3%</span>
          </span>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">订单数量</span>
            <span
              class="stat-icon"
              data-tooltip="订单分析：<br/>• 待处理：342<br/>• 处理中：1,256<br/>• 已完成：8,901<br/>• 已取消：156<br/>• 平均处理时间：2.5小时"
              data-tooltip-placement="top"
              data-tooltip-arrow="true"
              data-tooltip-trigger="mouseover"
              data-tooltip-class-name="stat-tooltip"
            >
              📦
            </span>
          </div>
          <div class="stat-value">10,655</div>
          <span class="stat-change negative">
            <span>↓</span>
            <span>-3.2%</span>
          </span>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">转化率</span>
            <span
              class="stat-icon"
              data-tooltip="转化漏斗：<br/>• 页面访问：125,430<br/>• 注册用户：24,567<br/>• 付费用户：2,340<br/>• 总转化率：1.87%"
              data-tooltip-placement="top"
              data-tooltip-arrow="true"
              data-tooltip-trigger="mouseover"
              data-tooltip-class-name="stat-tooltip"
            >
              🎯
            </span>
          </div>
          <div class="stat-value">1.87%</div>
          <span class="stat-change positive">
            <span>↑</span>
            <span>+0.45%</span>
          </span>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-header">
          <h3 class="chart-title">用户增长趋势</h3>
          <div class="chart-actions">
            <button class="chart-action"
              data-tooltip="导出图表数据<br/>• CSV格式<br/>• 包含详细数据<br/>• 时间范围：近30天"
              data-tooltip-placement="top"
              data-tooltip-arrow="true"
              data-tooltip-trigger="mouseover"
              data-tooltip-class-name="chart-tooltip"
            >
              导出
            </button>
            <button class="chart-action"
              data-tooltip="分享图表<br/>• 生成分享链接<br/>• 设置访问权限<br/>• 有效期：7天"
              data-tooltip-placement="top"
              data-tooltip-arrow="true"
              data-tooltip-trigger="mouseover"
              data-tooltip-class-name="chart-tooltip"
            >
              分享
            </button>
            <button class="chart-action"
              data-tooltip="全屏查看<br/>• 交互式图表<br/>• 支持缩放和拖拽<br/>• ESC退出全屏"
              data-tooltip-placement="top"
              data-tooltip-arrow="true"
              data-tooltip-trigger="mouseover"
              data-tooltip-class-name="chart-tooltip"
            >
              全屏
            </button>
          </div>
        </div>

        <!-- 模拟图表区域 -->
        <div style="height: 300px; background: linear-gradient(to right, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6c757d;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">📈</div>
            <div>用户增长趋势图表</div>
            <div style="font-size: 12px; margin-top: 8px;">数据每15分钟更新</div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .stat-tooltip {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        max-width: 220px;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }
      .stat-tooltip .tooltip-arrow {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
      }
      .chart-tooltip {
        background: #343a40;
        color: #f8f9fa;
        border: 1px solid #495057;
        max-width: 150px;
      }
      .chart-tooltip .tooltip-arrow {
        background: #343a40;
        border: 1px solid #495057;
      }
    </style>
  `,
  parameters: {
    docs: {
      description: {
        story: "仪表盘场景：在数据展示界面中使用提示框来提供详细统计信息、数据解释和操作选项，提升数据的可读性和交互性。",
      },
    },
  },
};