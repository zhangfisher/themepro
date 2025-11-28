import { html } from "lit";
import type { Story } from "./types";

export const OpenControlDemo: Story = {
    name: "属性控制弹出",
    render: (args: any) => {
        return html`
            <div style="padding: 20px;">
                <style>
                    .demo-container {
                        border: 2px solid #e0e0e0;
                        border-radius: 8px;
                        padding: 20px;
                        margin-bottom: 20px;
                        background: #fafafa;
                    }
                    .control-section {
                        border: 1px solid #d9d9d9;
                        border-radius: 8px;
                        padding: 16px;
                        margin: 16px 0;
                        background: white;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    }
                    .control-header {
                        font-weight: bold;
                        margin-bottom: 12px;
                        color: #333;
                        font-size: 16px;
                    }
                    .control-description {
                        color: #666;
                        margin-bottom: 16px;
                        font-size: 14px;
                        line-height: 1.5;
                    }
                    .button-group {
                        display: flex;
                        gap: 12px;
                        align-items: center;
                        margin-bottom: 16px;
                        flex-wrap: wrap;
                    }
                    .state-indicator {
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .state-open {
                        background: #f6ffed;
                        border: 1px solid #b7eb8f;
                        color: #52c41a;
                    }
                    .state-closed {
                        background: #fff2e8;
                        border: 1px solid #ffd591;
                        color: #fa8c16;
                    }
                    .code-example {
                        background: #f6f8fa;
                        border: 1px solid #d0d7de;
                        border-radius: 6px;
                        padding: 12px;
                        margin: 12px 0;
                        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                        font-size: 12px;
                        line-height: 1.4;
                    }
                    .toggle-button {
                        padding: 6px 12px;
                        border: 1px solid #d9d9d9;
                        border-radius: 4px;
                        background: white;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.2s;
                    }
                    .toggle-button:hover {
                        background: #f5f5f5;
                        border-color: #1890ff;
                        color: #1890ff;
                    }
                    .toggle-button.active {
                        background: #1890ff;
                        border-color: #1890ff;
                        color: white;
                    }
                    .progress-bar {
                        width: 200px;
                        height: 8px;
                        background: #f0f0f0;
                        border-radius: 4px;
                        overflow: hidden;
                        margin: 0 8px;
                    }
                    .progress-fill {
                        height: 100%;
                        background: #52c41a;
                        transition: width 0.3s ease;
                    }
                    .card {
                        background: white;
                        border: 1px solid #e8e8e8;
                        border-radius: 8px;
                        padding: 16px;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    }
                    .tooltip {
                        background: #f0f2f5;
                        border: 1px solid #d0d7de;
                        border-radius: 6px;
                        padding: 8px 12px;
                        font-size: 13px;
                        margin: 8px 0;
                    }
                </style>

                <div class="demo-container">
                    <h3>属性控制弹出 (Open 属性)</h3>
                    <p style="color: #666; margin-bottom: 20px;">
                        使用 open 属性来精确控制弹出层的显示与隐藏状态。这适用于需要通过程序逻辑而不是用户交互来控制弹出层的场景。
                    </p>

                    <!-- 示例 1: 基础开关控制 -->
                    <div class="control-section">
                        <div class="control-header">🔄 基础开关控制</div>
                        <div class="control-description">
                            通过设置 open 属性来直接控制弹出层的显示状态。当 open="true" 时弹出层显示，open="false" 时弹出层隐藏。
                        </div>

                        <div class="button-group">
                            <auto-dropdown
                                label="开关控制 (当前: ${args.open ? '显示' : '隐藏'})"
                                type="primary"
                                .open=${args.open}
                                .popupOptions=${{
                                    placement: "bottom-start",
                                    arrow: true,
                                    animationDuration: 200,
                                    className: "basic-control-popup"
                                }}
                            >
                                <div style="padding: 12px 16px; min-width: 180px; background: white; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                                    <h4 style="margin-top: 0; color: #1890ff;">⚙️ 设置面板</h4>
                                    <p style="margin: 8px 0; color: #666;">当前状态:
                                        <strong style="color: ${args.open ? '#52c41a' : '#fa8c16'};">
                                            ${args.open ? '✅ 已显示' : '❌ 已隐藏'}
                                        </strong>
                                    </p>
                                    <hr style="margin: 8px 0; border: none; border-top: 1px solid #f0f0f0;" />
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        <button style="padding: 6px 12px; border: 1px solid #e8e8e8; border-radius: 4px; background: white; cursor: pointer; text-align: left;">🎨 主题设置</button>
                                        <button style="padding: 6px 12px; border: 1px solid #e8e8e8; border-radius: 4px; background: white; cursor: pointer; text-align: left;">🔔 通知设置</button>
                                        <button style="padding: 6px 12px; border: 1px solid #e8e8e8; border-radius: 4px; background: white; cursor: pointer; text-align: left;">🔐 隐私设置</button>
                                    </div>
                                </div>
                            </auto-dropdown>

                            <span class="state-indicator ${args.open ? 'state-open' : 'state-closed'}">
                                ${args.open ? '🟢 显示中' : '🔴 已隐藏'}
                            </span>
                        </div>

                        <div class="code-example">
                            <strong>代码示例:</strong><br>
                            <code>
                                &lt;auto-dropdown .open=${args.open ? 'true' : 'false'}&gt;<br>
                                &nbsp;&nbsp;弹出内容&lt;/auto-dropdown&gt;
                            </code>
                        </div>
                    </div>

                    <!-- 示例 2: 条件性弹出 -->
                    <div class="control-section">
                        <div class="control-header">🎯 条件性弹出</div>
                        <div class="control-description">
                            基于某些条件来控制弹出层的显示。这个例子演示了根据用户权限、数据状态等条件来控制弹出层。
                        </div>

                        <div class="card">
                            <h4 style="margin-top: 0;">👤 用户信息面板</h4>
                            <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                                <div style="flex: 1;">
                                    <div style="margin-bottom: 8px;"><strong>用户名:</strong> 张三</div>
                                    <div style="margin-bottom: 8px;"><strong>权限:</strong> <span style="color: #52c41a;">管理员</span></div>
                                    <div style="margin-bottom: 8px;"><strong>状态:</strong> <span style="color: #1890ff;">在线</span></div>
                                </div>
                                <div style="flex: 1;">
                                    <div style="margin-bottom: 8px;"><strong>邮箱:</strong> zhangsan@example.com</div>
                                    <div style="margin-bottom: 8px;"><strong>部门:</strong> 技术部</div>
                                    <div style="margin-bottom: 8px;"><strong>加入时间:</strong> 2023-01-15</div>
                                </div>
                            </div>

                            <div class="button-group" style="justify-content: flex-start;">
                                <auto-dropdown
                                    label="👤 用户菜单"
                                    type="default"
                                    .open=${args.open}  // 受控于open属性
                                    .popupOptions=${{
                                        placement: "bottom-end",
                                        offset: [0, 8],
                                        arrow: true,
                                        animationDuration: 200,
                                        className: "user-menu-popup"
                                    }}
                                >
                                    <div style="padding: 8px 0; min-width: 160px; background: white; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                                        <div style="padding: 6px 12px; cursor: pointer; color: #666; font-size: 12px;">👤 查看资料</div>
                                        <div style="padding: 6px 12px; cursor: pointer; color: #666; font-size: 12px;">✏️ 编辑信息</div>
                                        <div style="padding: 6px 12px; cursor: pointer; color: #666; font-size: 12px;">🔧 账户设置</div>
                                        <hr style="margin: 4px 0; border: none; border-top: 1px solid #e8e8e8;" />
                                        <div style="padding: 6px 12px; cursor: pointer; color: #666; font-size: 12px;">📊 活动日志</div>
                                        <div style="padding: 6px 12px; cursor: pointer; color: #ff4d4f; font-size: 12px;">🚪 退出登录</div>
                                    </div>
                                </auto-dropdown>

                                <auto-dropdown
                                    label="⚙️ 权限设置"
                                    type="warning"
                                    .open=${args.open}  // 受控于open属性
                                    .popupOptions=${{
                                        placement: "bottom-start",
                                        offset: [0, 8],
                                        arrow: true,
                                        animationDuration: 200,
                                        className: "permission-popup"
                                    }}
                                >
                                    <div style="padding: 8px 0; min-width: 200px; background: #fffbe6; border: 1px solid #ffe58f; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                                        <div style="padding: 6px 12px; font-weight: bold; color: #d46b08;">🔐 权限管理</div>
                                        <div style="padding: 6px 12px; margin-top: 8px;">
                                            <label style="display: block; margin-bottom: 4px;">
                                                <input type="checkbox" checked style="margin-right: 6px;"> 用户管理
                                            </label>
                                            <label style="display: block; margin-bottom: 4px;">
                                                <input type="checkbox" checked style="margin-right: 6px;"> 内容编辑
                                            </label>
                                            <label style="display: block; margin-bottom: 4px;">
                                                <input type="checkbox" checked style="margin-right: 6px;"> 系统设置
                                            </label>
                                            <label style="display: block; margin-bottom: 4px;">
                                                <input type="checkbox" style="margin-right: 6px;"> 数据导出
                                            </label>
                                        </div>
                                        <hr style="margin: 8px 0; border: none; border-top: 1px solid #ffe58f;" />
                                        <div style="padding: 6px 12px;">
                                            <button style="padding: 4px 8px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">保存权限</button>
                                        </div>
                                    </div>
                                </auto-dropdown>
                            </div>

                            <div class="tooltip">
                                💡 提示: 两个菜单都受同一个 open 属性控制，适合实现协同的用户界面
                            </div>
                        </div>
                    </div>

                    <!-- 示例 3: 嵌套控制的弹出 -->
                    <div class="control-section">
                        <div class="control-header">📦 嵌套控制的弹出</div>
                        <div class="control-description">
                            演示在弹出层内部还有其他弹出层的情况，通过open属性实现精确的控制。
                        </div>

                        <div class="button-group" style="margin-bottom: 20px;">
                            <auto-dropdown
                                label="📁 文件管理"
                                type="info"
                                .open=${args.open}
                                .popupOptions=${{
                                    placement: "bottom-start",
                                    offset: [0, 8],
                                    arrow: true,
                                    animationDuration: 250,
                                    className: "file-manager-popup",
                                    persistent: true  // 允许嵌套交互
                                }}
                            >
                                <div style="padding: 12px 0; min-width: 240px; background: white; border-radius: 8px; box-shadow: 0 6px 16px rgba(0,0,0,0.15);">
                                    <div style="padding: 8px 16px; font-weight: bold; color: #1890ff; border-bottom: 1px solid #f0f0f0; margin-bottom: 8px;">📁 文件操作</div>

                                    <div style="display: flex; flex-direction: column; gap: 4px; padding: 0 8px;">
                                        <!-- 嵌套的弹出层 -->
                                        <auto-dropdown
                                            label="📄 新建文件"
                                            type="default"
                                            size="small"
                                            .open=${args.open}  // 受控于同一个open属性
                                            .popupOptions=${{
                                                placement: "right-start",
                                                offset: [8, 0],
                                                animationDuration: 200,
                                                className: "nested-file-popup"
                                            }}
                                        >
                                            <div style="padding: 8px 12px; min-width: 140px; background: #f8f9fa; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                                <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">📄 文档</div>
                                                <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">📊 表格</div>
                                                <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">🖼️ 图片</div>
                                                <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">📦 压缩包</div>
                                            </div>
                                        </auto-dropdown>

                                        <auto-dropdown
                                            label="📁 新建文件夹"
                                            type="default"
                                            size="small"
                                            .open=${args.open}  // 受控于同一个open属性
                                            .popupOptions=${{
                                                placement: "right-start",
                                                offset: [8, 0],
                                                animationDuration: 200,
                                                className: "nested-folder-popup"
                                            }}
                                        >
                                            <div style="padding: 8px 12px; min-width: 120px; background: #f8f9fa; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                                <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">📂 普通文件夹</div>
                                                <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">🔒 加密文件夹</div>
                                                <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">🔗 快捷方式</div>
                                            </div>
                                        </auto-dropdown>
                                    </div>

                                    <hr style="margin: 8px 0; border: none; border-top: 1px solid #f0f0f0;" />

                                    <div style="padding: 0 8px; display: flex; flex-direction: column; gap: 4px;">
                                        <button style="padding: 6px 12px; border: 1px solid #e8e8e8; border-radius: 4px; background: white; cursor: pointer; text-align: left; font-size: 14px;">📥 上传文件</button>
                                        <button style="padding: 6px 12px; border: 1px solid #e8e8e8; border-radius: 4px; background: white; cursor: pointer; text-align: left; font-size: 14px;">📤 下载管理</button>
                                        <button style="padding: 6px 12px; border: 1px solid #e8e8e8; border-radius: 4px; background: white; cursor: pointer; text-align: left; font-size: 14px;">🗑️ 回收站</button>
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div class="tooltip">
                            🔧 高级功能: 嵌套弹出层需要设置 persistent: true 来避免外部点击时关闭
                        </div>
                    </div>

                    <!-- 示例 4: 动态内容更新 -->
                    <div class="control-section">
                        <div class="control-header">🔄 动态内容更新</div>
                        <div class="control-description">
                            当弹出层显示时，可以动态更新其内容。这个例子展示了如何结合 open 属性实现内容的实时更新。
                        </div>

                        <div class="button-group">
                            <auto-dropdown
                                label="📊 实时监控面板"
                                type="primary"
                                .open=${args.open}
                                .popupOptions=${{
                                    placement: "bottom",
                                    offset: [0, 12],
                                    arrow: true,
                                    animationDuration: 300,
                                    className: "monitoring-panel-popup"
                                }}
                            >
                                <div style="padding: 16px; min-width: 320px; background: white; border-radius: 8px; box-shadow: 0 6px 16px rgba(0,0,0,0.2);">
                                    <div style="display: flex; align-items: center; margin-bottom: 16px;">
                                        <h4 style="margin: 0; color: #52c41a;">📊 系统监控</h4>
                                        <div class="state-indicator ${args.open ? 'state-open' : 'state-closed'}" style="margin-left: auto;">
                                            ${args.open ? '🟢 监控中' : '🔴 已停止'}
                                        </div>
                                    </div>

                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                                        <div style="padding: 12px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 4px;">
                                            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">CPU 使用率</div>
                                            <div style="font-size: 18px; font-weight: bold; color: #52c41a;">
                                                ${args.open ? '42%' : '--%'}
                                            </div>
                                            <div style="margin-top: 4px;">
                                                <div class="progress-bar">
                                                    <div class="progress-fill" style="width: ${args.open ? '42%' : '0%'};"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style="padding: 12px; background: #e6f7ff; border: 1px solid #91d5ff; border-radius: 4px;">
                                            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">内存使用</div>
                                            <div style="font-size: 18px; font-weight: bold; color: #1890ff;">
                                                ${args.open ? '2.1GB' : '--GB'}
                                            </div>
                                            <div style="margin-top: 4px;">
                                                <div class="progress-bar">
                                                    <div class="progress-fill" style="width: ${args.open ? '68%' : '0%'}; background: #1890ff;"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style="padding: 12px; background: #fff7e6; border: 1px solid #ffd591; border-radius: 4px;">
                                            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">网络延迟</div>
                                            <div style="font-size: 18px; font-weight: bold; color: #fa8c16;">
                                                ${args.open ? '23ms' : '--ms'}
                                            </div>
                                            <div style="margin-top: 4px;">
                                                <div class="progress-bar">
                                                    <div class="progress-fill" style="width: ${args.open ? '23%' : '0%'}; background: #fa8c16;"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style="padding: 12px; background: #f9f0ff; border: 1px solid #d3adf7f; border-radius: 4px;">
                                            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">活跃连接</div>
                                            <div style="font-size: 18px; font-weight: bold; color: #722ed1;">
                                                ${args.open ? '128' : '--'}
                                            </div>
                                            <div style="margin-top: 4px;">
                                                <div class="progress-bar">
                                                    <div class="progress-fill" style="width: ${args.open ? '85%' : '0%'}; background: #722ed1;"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style="display: flex; gap: 8px; justify-content: flex-end;">
                                        <button style="padding: 6px 12px; background: #f5f5f5; color: #666; border: 1px solid #d9d9d9; border-radius: 4px; cursor: pointer; font-size: 12px;">📥 导出数据</button>
                                        <button style="padding: 6px 12px; background: #ff4d4f; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">🔄 刷新数据</button>
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <div class="code-example">
                            <strong>动态内容示例:</strong><br>
                            <code>
                                &lt;auto-dropdown .open=${args.open}&gt;<br>
                                &nbsp;&nbsp;实时数据显示: ${args.open ? '📊 监控中' : '❌ 已停止'}<br>
                                &lt;/auto-dropdown&gt;
                            </code>
                        </div>
                    </div>

                    <!-- 示例 5: 状态同步控制 -->
                    <div class="control-section">
                        <div class="control-header">🔗 状态同步控制</div>
                        <div class="control-description">
                            演示多个弹出层如何共享同一个状态，实现复杂的用户界面交互。
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                            <div style="text-align: center; padding: 12px; background: #f6f8fa; border-radius: 6px;">
                                <div style="font-weight: bold; margin-bottom: 8px;">🎨 颜色面板</div>
                                <auto-dropdown
                                    label="选择颜色"
                                    type="default"
                                    size="small"
                                    .open=${args.open}
                                    .popupOptions=${{
                                        placement: "bottom",
                                        offset: [0, 4],
                                        arrow: true,
                                        animationDuration: 200,
                                        className: "color-panel-popup"
                                    }}
                                >
                                    <div style="padding: 8px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;">
                                            <div style="width: 24px; height: 24px; background: #ff4d4f; border-radius: 2px; cursor: pointer;"></div>
                                            <div style="width: 24px; height: 24px; background: #ff7a45; border-radius: 2px; cursor: pointer;"></div>
                                            <div style="width: 24px; height: 24px; background: #ffa940; border-radius: 2px; cursor: pointer;"></div>
                                            <div style="width: 24px; height: 24px; background: #ffbb96; border-radius: 2px; cursor: pointer;"></div>
                                            <div style="width: 24px; height: 24px; background: #52c41a; border-radius: 2px; cursor: pointer;"></div>
                                            <div style="width: 24px; height: 24px; background: #73d13d; border-radius: 2px; cursor: pointer;"></div>
                                            <div style="width: 24px; height: 24px; background: #95de64; border-radius: 2px; cursor: pointer;"></div>
                                            <div style="width: 24px; height: 24px; background: #b7eb8f; border-radius: 2px; cursor: pointer;"></div>
                                        </div>
                                    </div>
                                </auto-dropdown>
                            </div>

                            <div style="text-align: center; padding: 12px; background: #f6f8fa; border-radius: 6px;">
                                <div style="font-weight: bold; margin-bottom: 8px;">🔤 字体设置</div>
                                <auto-dropdown
                                    label="选择字体"
                                    type="default"
                                    size="small"
                                    .open=${args.open}
                                    .popupOptions=${{
                                        placement: "bottom",
                                        offset: [0, 4],
                                        arrow: true,
                                        animationDuration: 200,
                                        className: "font-panel-popup"
                                    }}
                                >
                                    <div style="padding: 8px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); min-width: 120px;">
                                        <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">Arial</div>
                                        <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">Helvetica</div>
                                        <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">Times New Roman</div>
                                        <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">Georgia</div>
                                    </div>
                                </auto-dropdown>
                            </div>

                            <div style="text-align: center; padding: 12px; background: #f6f8fa; border-radius: 6px;">
                                <div style="font-weight: bold; margin-bottom: 8px;">📏 字体大小</div>
                                <auto-dropdown
                                    label="选择大小"
                                    type="default"
                                    size="small"
                                    .open=${args.open}
                                    .popupOptions=${{
                                        placement: "bottom",
                                        offset: [0, 4],
                                        arrow: true,
                                        animationDuration: 200,
                                        className: "size-panel-popup"
                                    }}
                                >
                                    <div style="padding: 8px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); min-width: 80px;">
                                        <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">12px</div>
                                        <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">14px</div>
                                        <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">16px</div>
                                        <div style="padding: 4px 8px; cursor: pointer; font-size: 12px;">18px</div>
                                    </div>
                                </auto-dropdown>
                            </div>
                        </div>

                        <div class="button-group" style="justify-content: center;">
                            <button class="toggle-button ${args.open ? 'active' : ''}">
                                ${args.open ? '🔓 所有面板已展开' : '🔒 点击展开所有面板'}
                            </button>
                        </div>

                        <div class="tooltip">
                            🎯 状态同步: 三个面板共享同一个 open 状态，适合工具栏或设置面板的统一控制
                        </div>
                    </div>

                    <!-- 示例 6: 程序化控制示例 -->
                    <div class="control-section">
                        <div class="control-header">⚙️ 程序化控制示例</div>
                        <div class="control-description">
                            演示如何在应用中通过代码逻辑来控制弹出层的显示和隐藏。
                        </div>

                        <div class="code-example">
                            <strong>JavaScript 控制示例:</strong><br>
                            <code>
                                // 获取元素<br>
                                const dropdown = document.querySelector('auto-dropdown');<br><br>

                                // 显示弹出层<br>
                                dropdown.open = true;<br><br>

                                // 隐藏弹出层<br>
                                dropdown.open = false;<br><br>

                                // 监听状态变化<br>
                                dropdown.addEventListener('popup:show', () => {<br>
                                &nbsp;&nbsp;console.log('弹出层已显示');<br>
                                });<br>

                                dropdown.addEventListener('popup:hide', () => {<br>
                                &nbsp;&nbsp;console.log('弹出层已隐藏');<br>
                                });
                            </code>
                        </div>

                        <div style="background: #e6f7ff; border: 1px solid #91d5ff; border-radius: 6px; padding: 12px; margin-top: 12px;">
                            <h4 style="margin-top: 0; color: #1890ff;">🎯 使用场景:</h4>
                            <ul style="margin: 0; padding-left: 20px; color: #333; font-size: 14px;">
                                <li><strong>表单验证:</strong> 当用户提交表单时自动显示错误提示</li>
                                <li><strong>状态提示:</strong> 根据系统状态自动显示或隐藏提示信息</li>
                                <li><strong>步骤指导:</strong> 在多步骤流程中控制指导面板的显示</li>
                                <li><strong>响应式设计:</strong> 在不同屏幕尺寸下自适应控制弹出层</li>
                                <li><strong>键盘快捷键:</strong> 通过键盘事件控制弹出层的显示和隐藏</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        `;
    },
};