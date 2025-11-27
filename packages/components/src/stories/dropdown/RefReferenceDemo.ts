import { html } from "lit";
import type { Story } from "./types";

export const RefReferenceDemo: Story = {
    name: "弹出基准元素",
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
                    .reference-element {
                        padding: 12px 20px;
                        background: #1890ff;
                        color: white;
                        border-radius: 4px;
                        margin: 8px;
                        display: inline-block;
                    }
                    .target-element {
                        padding: 8px 16px;
                        background: #52c41a;
                        color: white;
                        border-radius: 4px;
                        margin: 8px;
                        display: inline-block;
                    }
                    .ref-card {
                        border: 1px solid #d9d9d9;
                        border-radius: 8px;
                        padding: 16px;
                        margin: 16px 0;
                        background: white;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    }
                    .ref-header {
                        font-weight: bold;
                        margin-bottom: 12px;
                        color: #333;
                    }
                    .ref-description {
                        color: #666;
                        margin-bottom: 16px;
                        font-size: 14px;
                    }
                    .control-buttons {
                        display: flex;
                        gap: 12px;
                        align-items: center;
                        margin-bottom: 16px;
                    }
                    .reference-box {
                        border: 2px dashed #ff4d4f;
                        padding: 20px;
                        margin: 16px 0;
                        background: #fff2f0;
                        border-radius: 8px;
                    }
                    .floating-toolbar {
                        background: #722ed1;
                        color: white;
                        padding: 8px 16px;
                        border-radius: 20px;
                        display: inline-block;
                        margin: 4px;
                        font-size: 14px;
                    }
                </style>

                <div class="demo-container">
                    <h3>弹出基准元素 (Ref 属性)</h3>
                    <p style="color: #666; margin-bottom: 16px;">
                        使用 ref
                        属性指定弹出层的位置基准元素，而不是基于触发按钮本身。这在需要弹出层相对于页面中其他元素定位时非常有用。
                    </p>

                    <!-- 示例 1: 基于外部元素定位 -->
                    <div class="ref-card">
                        <div class="ref-description">
                            <strong>示例 1: 基于卡片标题栏定位弹出层</strong>
                            <p>
                                点击"工具"按钮，弹出层会相对于顶部标题栏定位，而不是相对于按钮本身。
                            </p>
                        </div>

                        <div id="header-bar" class="reference-element">
                            📄 卡片标题栏 (ID: header-bar)
                        </div>

                        <div class="control-buttons">
                            <auto-dropdown
                                label="🔧 工具"
                                type="primary"
                                size="small"
                                .popupOptions=${{
                                    ref: "#header-bar", // 基于标题栏定位
                                    placement: "bottom-start",
                                    offset: [0, 0],
                                    arrow: true,
                                    animationDuration: 200,
                                    className: "toolbar-popup",
                                }}
                            >
                                <div
                                    style="padding: 8px 0; min-width: 150px; background: white; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                                >
                                    <div
                                        style="padding: 8px 16px; cursor: pointer;"
                                    >
                                        📝 编辑文档
                                    </div>
                                    <div
                                        style="padding: 8px 16px; cursor: pointer;"
                                    >
                                        📋 复制内容
                                    </div>
                                    <div
                                        style="padding: 8px 16px; cursor: pointer;"
                                    >
                                        🔍 查看详情
                                    </div>
                                    <hr
                                        style="margin: 4px 0; border: none; border-top: 1px solid #e0e0e0;"
                                    />
                                    <div
                                        style="padding: 8px 16px; cursor: pointer; color: #ff4d4f;"
                                    >
                                        🗑️ 删除
                                    </div>
                                </div>
                            </auto-dropdown>

                            <auto-dropdown
                                label="⚙️ 设置"
                                type="default"
                                size="small"
                                .popupOptions=${{
                                    ref: "#header-bar", // 基于标题栏定位
                                    placement: "bottom-end",
                                    offset: [0, 0],
                                    arrow: true,
                                    animationDuration: 200,
                                    className: "settings-popup",
                                }}
                            >
                                <div
                                    style="padding: 8px 0; min-width: 140px; background: white; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                                >
                                    <div
                                        style="padding: 8px 16px; cursor: pointer;"
                                    >
                                        🎨 主题设置
                                    </div>
                                    <div
                                        style="padding: 8px 16px; cursor: pointer;"
                                    >
                                        🔔 通知设置
                                    </div>
                                    <div
                                        style="padding: 8px 16px; cursor: pointer;"
                                    >
                                        🔒 隐私设置
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>

                        <p
                            style="color: #999; font-size: 12px; margin-top: 8px;"
                        >
                            💡 提示:
                            两个按钮的弹出层都基于标题栏(#header-bar)定位，一个在左下，一个在右下
                        </p>
                    </div>

                    <!-- 示例 2: 相对于工具栏定位 -->
                    <div class="ref-card">
                        <div class="ref-description">
                            <strong>示例 2: 浮动工具栏</strong>
                            <p>
                                点击"更多操作"，弹出层会相对于上方的工具栏容器定位，展示浮动操作菜单。
                            </p>
                        </div>

                        <div
                            class="toolbar-container"
                            style="background: #f0f2f5; padding: 12px; border-radius: 8px; margin-bottom: 16px;"
                        >
                            <span class="floating-toolbar">🎨 画笔工具</span>
                            <span class="floating-toolbar">📐 测量工具</span>
                            <span class="floating-toolbar">🔍 放大镜</span>
                            <span class="floating-toolbar">💾 保存</span>
                        </div>

                        <div style="text-align: center;">
                            <auto-dropdown
                                label="🎯 更多操作"
                                type="info"
                                .popupOptions=${{
                                    ref: ".toolbar-container", // 基于工具栏容器定位
                                    placement: "top",
                                    offset: [0, 0],
                                    arrow: true,
                                    fitWidth: true,
                                    animationDuration: 250,
                                    className: "more-actions-popup",
                                }}
                            >
                                <div
                                    style="padding: 12px 16px; min-width: 200px; background: white; border-radius: 8px; box-shadow: 0 6px 16px rgba(0,0,0,0.2);"
                                >
                                    <div style="padding: 8px 0;">
                                        <div
                                            style="padding: 6px 12px; cursor: pointer; border-radius: 4px;"
                                        >
                                            🔄 重置工具
                                        </div>
                                        <div
                                            style="padding: 6px 12px; cursor: pointer; border-radius: 4px;"
                                        >
                                            📊 统计信息
                                        </div>
                                        <div
                                            style="padding: 6px 12px; cursor: pointer; border-radius: 4px;"
                                        >
                                            🎪 高级选项
                                        </div>
                                        <hr
                                            style="margin: 8px 0; border: none; border-top: 1px solid #e0e0e0;"
                                        />
                                        <div
                                            style="padding: 6px 12px; cursor: pointer; border-radius: 4px; color: #52c41a;"
                                        >
                                            ➕ 添加工具
                                        </div>
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>

                    <!-- 示例 3: 相对于表单容器定位 -->
                    <div class="ref-card">
                        <div class="ref-description">
                            <strong>示例 3: 表单辅助面板</strong>
                            <p>
                                点击"显示帮助"，帮助面板会相对于整个表单容器定位，而不是相对于按钮。
                            </p>
                        </div>

                        <div
                            class="form-container"
                            style="border: 1px solid #d9d9d9; border-radius: 8px; padding: 20px; background: white;"
                        >
                            <div style="margin-bottom: 16px;">
                                <label
                                    style="display: block; margin-bottom: 4px; font-weight: bold;"
                                    >用户名:</label
                                >
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="请输入用户名"
                                    style="width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;"
                                />
                            </div>
                            <div style="margin-bottom: 16px;">
                                <label
                                    style="display: block; margin-bottom: 4px; font-weight: bold;"
                                    >邮箱:</label
                                >
                                <input
                                    type="email"
                                    placeholder="请输入邮箱地址"
                                    style="width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;"
                                />
                            </div>
                            <div style="margin-bottom: 16px;">
                                <label
                                    style="display: block; margin-bottom: 4px; font-weight: bold;"
                                    >备注:</label
                                >
                                <textarea
                                    placeholder="请输入备注信息"
                                    style="width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px; min-height: 80px;"
                                ></textarea>
                            </div>

                            <div
                                style="display: flex; gap: 12px; justify-content: flex-end;"
                            >
                                <auto-dropdown
                                    label="❓ 显示帮助"
                                    type="warning"
                                    .popupOptions=${{
                                        ref: ".form-container [name='username']", // 基于表单容器定位
                                        placement: "bottom-start",
                                        offset: [-8, 0],
                                        arrow: true,
                                        animationDuration: 200,
                                        className: "help-popup",
                                    }}
                                >
                                    <div
                                        style="padding: 16px; min-width: 280px; background: #fffbe6; border: 1px solid #ffe58f; border-radius: 6px;"
                                    >
                                        <h4
                                            style="margin-top: 0; color: #d46b08;"
                                        >
                                            📋 表单填写说明
                                        </h4>
                                        <div
                                            style="font-size: 14px; line-height: 1.5;"
                                        >
                                            <p>
                                                <strong>用户名:</strong>
                                                3-20个字符，支持字母、数字和下划线
                                            </p>
                                            <p>
                                                <strong>邮箱:</strong>
                                                请输入有效的邮箱地址，用于接收通知
                                            </p>
                                            <p>
                                                <strong>备注:</strong>
                                                可选填，最多500字符
                                            </p>
                                            <div
                                                style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #ffe58f;"
                                            >
                                                <strong>💡 小贴士:</strong>
                                                带有红色星号(*)的字段为必填项
                                            </div>
                                        </div>
                                    </div>
                                </auto-dropdown>

                                <button
                                    style="padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                                >
                                    提交表单
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 示例 4: 相对于多个目标元素定位 -->
                    <div class="ref-card">
                        <div class="ref-description">
                            <strong>示例 4: 状态指示器</strong>
                            <p>
                                不同的状态按钮都相对于同一个状态栏定位，显示相应的状态信息。
                            </p>
                        </div>

                        <div
                            id="status-bar"
                            class="reference-element"
                            style="background: linear-gradient(90deg, #52c41a, #1890ff);"
                        >
                            📊 系统状态栏 (ID: status-bar)
                        </div>

                        <div class="control-buttons" style="margin-top: 20px;">
                            <auto-dropdown
                                label="📈 查看统计"
                                type="success"
                                size="small"
                                .popupOptions=${{
                                    ref: "#status-bar", // 基于状态栏定位
                                    placement: "right-start",
                                    offset: [0, -8],
                                    arrow: true,
                                    animationDuration: 180,
                                    className: "stats-popup",
                                }}
                            >
                                <div
                                    style="padding: 16px; min-width: 200px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                                >
                                    <h4 style="margin-top: 0; color: #52c41a;">
                                        📊 统计数据
                                    </h4>
                                    <div style="font-size: 14px;">
                                        <p>
                                            👥 在线用户: <strong>1,234</strong>
                                        </p>
                                        <p>📝 总文档: <strong>5,678</strong></p>
                                        <p>
                                            ⚡ 今日访问: <strong>9,012</strong>
                                        </p>
                                    </div>
                                </div>
                            </auto-dropdown>

                            <auto-dropdown
                                label="🔧 系统设置"
                                type="default"
                                size="small"
                                .popupOptions=${{
                                    ref: "#status-bar", // 基于状态栏定位
                                    placement: "top",
                                    offset: [0, -8],
                                    arrow: true,
                                    animationDuration: 180,
                                    className: "system-popup",
                                }}
                            >
                                <div
                                    style="padding: 16px; min-width: 180px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                                >
                                    <h4 style="margin-top: 0; color: #1890ff;">
                                        ⚙️ 系统设置
                                    </h4>
                                    <div style="font-size: 14px;">
                                        <p
                                            style="cursor: pointer; margin: 4px 0;"
                                        >
                                            🌐 语言设置
                                        </p>
                                        <p
                                            style="cursor: pointer; margin: 4px 0;"
                                        >
                                            🎨 主题切换
                                        </p>
                                        <p
                                            style="cursor: pointer; margin: 4px 0;"
                                        >
                                            🔐 安全选项
                                        </p>
                                    </div>
                                </div>
                            </auto-dropdown>

                            <auto-dropdown
                                label="🚀 性能监控"
                                type="primary"
                                size="small"
                                .popupOptions=${{
                                    ref: "#status-bar", // 基于状态栏定位
                                    placement: "top-end",
                                    offset: [0, -8],
                                    arrow: true,
                                    animationDuration: 180,
                                    className: "performance-popup",
                                }}
                            >
                                <div
                                    style="padding: 16px; min-width: 220px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                                >
                                    <h4 style="margin-top: 0; color: #ff4d4f;">
                                        🚀 性能指标
                                    </h4>
                                    <div style="font-size: 14px;">
                                        <p>
                                            CPU 使用率:
                                            <strong style="color: #52c41a;"
                                                >23%</strong
                                            >
                                        </p>
                                        <p>
                                            内存占用:
                                            <strong style="color: #1890ff;"
                                                >456MB</strong
                                            >
                                        </p>
                                        <p>
                                            响应时间:
                                            <strong style="color: #52c41a;"
                                                >12ms</strong
                                            >
                                        </p>
                                    </div>
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>

                    <!-- 示例 5: 复杂的嵌套选择器 -->
                    <div class="ref-card">
                        <div class="ref-description">
                            <strong>示例 5: 复杂选择器定位</strong>
                            <p>
                                使用复杂CSS选择器来精确定位基准元素，支持类名、属性、伪类等多种选择器。
                            </p>
                        </div>

                        <div class="reference-box">
                            <h4 style="margin-top: 0; color: #ff4d4f;">
                                🎯 参考容器 (class="reference-box")
                            </h4>
                            <p style="margin-bottom: 0;">
                                这个红色边框的容器将作为弹出层的定位基准
                            </p>
                        </div>

                        <div style="text-align: center; margin-top: 20px;">
                            <auto-dropdown
                                label="🎯 相对于参考容器"
                                type="primary"
                                .popupOptions=${{
                                    ref: ".reference-box", // 基于类名选择器
                                    placement: "bottom",
                                    offset: [0, 16],
                                    arrow: true,
                                    animationDuration: 200,
                                    className: "complex-ref-popup",
                                }}
                            >
                                <div
                                    style="padding: 12px 16px; background: #fff2f0; border: 1px solid #ffccc7; border-radius: 6px;"
                                >
                                    <p style="margin: 0; color: #ff4d4f;">
                                        🎯 此弹出层基于
                                        <code>.reference-box</code> 定位
                                    </p>
                                </div>
                            </auto-dropdown>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};
