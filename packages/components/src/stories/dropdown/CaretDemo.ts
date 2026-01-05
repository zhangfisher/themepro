/**
 * CaretDemo - AutoDropdown caret 属性完整功能演示
 * 全面展示caret属性的各种配置选项和效果
 */
import { html } from "lit";
import type { Story } from "./types";

// 统一的完整演示
export const CaretDemo: Story = {
    render: (args: any) => html`
        <div style="max-width: 1400px; margin: 0 auto; padding: 20px;">
            <h1 style="text-align: center; color: #333; margin-bottom: 40px;">
                🎯 AutoDropdown Caret 完整功能演示
            </h1>

            <!-- Caret 值对比展示 -->
            <div style="margin-bottom: 50px;">
                <h3 style="margin: 0 0 24px 0; color: #495057;">
                    🏷️ Caret 属性值对比
                </h3>
                <div
                    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;"
                >
                    ${[
                        {
                            caret: "auto" as const,
                            name: "Auto (自动)",
                            description: "根据placement自动决定箭头位置和方向",
                            color: "#28a745",
                        },
                        {
                            caret: "before" as const,
                            name: "Before (前缀)",
                            description: "强制在按钮前显示箭头",
                            color: "#007bff",
                        },
                        {
                            caret: "after" as const,
                            name: "After (后缀)",
                            description: "强制在按钮后显示箭头",
                            color: "#6f42c1",
                        },
                        {
                            caret: "none" as const,
                            name: "None (无箭头)",
                            description: "不显示箭头指示器",
                            color: "#6c757d",
                        },
                    ].map(
                        ({ caret, name, description, color }) => html`
                            <div style="text-align: center;">
                                <div
                                    style="
                                        border: 2px solid ${color};
                                        border-radius: 8px;
                                        padding: 20px;
                                        background: rgba(${color}, 0.05);
                                    "
                                >
                                    <auto-dropdown
                                        label="${name}"
                                        outline
                                        variant="outline"
                                        caret="${caret}"
                                        .popupOptions=${{
                                            placement: "bottom-start",
                                            fit: true,
                                        }}
                                    >
                                        <div
                                            style="padding: 12px; min-width: 200px;"
                                        >
                                            <strong>${name}</strong>
                                            <div
                                                style="font-size: 12px; margin-top: 8px; color: #666;"
                                            >
                                                ${description}
                                            </div>
                                        </div>
                                    </auto-dropdown>
                                </div>
                            </div>
                        `
                    )}
                </div>
            </div>

            <!-- 箭头方向展示网格 -->
            <div style="margin-bottom: 50px;">
                <h3 style="margin: 0 0 24px 0; color: #495057;">
                    🧭 不同方向的箭头展示
                </h3>
                <div
                    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;"
                >
                    ${[
                        { placement: "left-start", name: "左侧弹出" },
                        { placement: "right-start", name: "右侧弹出" },
                        { placement: "top-start", name: "上方弹出" },
                        { placement: "bottom-start", name: "下方弹出" },
                    ].map(
                        ({ placement, name }) => html`
                            <div style="text-align: center;">
                                <div
                                    style="
                                        border: 1px solid #dee2e6;
                                        border-radius: 8px;
                                        padding: 16px;
                                        background: #f8f9fa;
                                    "
                                >
                                    <div
                                        style="font-weight: 600; margin-bottom: 12px; color: #495057;"
                                    >
                                        ${name}
                                    </div>
                                    <div
                                        style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;"
                                    >
                                        <!-- Auto 模式 -->
                                        <div style="text-align: center;">
                                            <auto-dropdown
                                                label="Auto"
                                                outline
                                                variant="outline"
                                                size="small"
                                                caret="auto"
                                                .popupOptions=${{
                                                    placement,
                                                    fit: true,
                                                }}
                                            >
                                                <div
                                                    style="padding: 8px; font-size: 12px;"
                                                >
                                                    Placement: ${placement}
                                                </div>
                                            </auto-dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    )}
                </div>
            </div>

            <!-- 动态演示区域 -->
            <div style="margin-bottom: 50px;">
                <h3 style="margin: 0 0 24px 0; color: #495057;">
                    ⚡ 动态箭头效果演示
                </h3>
                <div
                    style="
                        border: 1px solid #dee2e6;
                        border-radius: 8px;
                        padding: 24px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                    "
                >
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h4 style="margin: 0 0 16px 0;">🔄 箭头动态切换演示</h4>
                        <p style="opacity: 0.9; margin: 0;">
                            点击下方按钮观察箭头方向的自动切换效果
                        </p>
                    </div>
                    <div
                        style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;"
                    >
                        <!-- 多种布局组合 -->
                        ${[
                            {
                                placement: "bottom-start",
                                label: "底部弹出",
                                icon: "👇",
                            },
                            {
                                placement: "top-start",
                                label: "顶部弹出",
                                icon: "👆",
                            },
                            {
                                placement: "left-start",
                                label: "左侧弹出",
                                icon: "👈",
                            },
                            {
                                placement: "right-start",
                                label: "右侧弹出",
                                icon: "👉",
                            },
                        ].map(
                            ({ placement, label, icon }) => html`
                                <auto-dropdown
                                    label="${icon} ${label}"
                                    outline
                                    variant="default"
                                    caret="auto"
                                    .popupOptions=${{
                                        placement,
                                        fit: true,
                                    }}
                                >
                                    <div
                                        style="padding: 16px; text-align: center; min-width: 180px;"
                                    >
                                        <div
                                            style="font-size: 20px; margin-bottom: 8px;"
                                        >
                                            ${icon}
                                        </div>
                                        <strong>${label}</strong>
                                        <div
                                            style="font-size: 12px; margin-top: 8px; opacity: 0.8;"
                                        >
                                            Placement: ${placement}
                                        </div>
                                    </div>
                                </auto-dropdown>
                            `
                        )}
                    </div>
                </div>
            </div>

            <!-- Before/After 对比演示 -->
            <div style="margin-bottom: 50px;">
                <h3 style="margin: 0 0 24px 0; color: #495057;">
                    📍 Before/After 位置对比
                </h3>
                <div
                    style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;"
                >
                    <!-- Before 示例 -->
                    <div style="text-align: center;">
                        <h4 style="margin: 0 0 16px 0; color: #007bff;">
                            Before (前缀箭头)
                        </h4>
                        <auto-dropdown
                            label="前缀箭头按钮"
                            outline
                            variant="default"
                            caret="before"
                            .popupOptions=${{
                                placement: "bottom-start",
                                fit: true,
                            }}
                        >
                            <div style="padding: 16px; text-align: center;">
                                <strong>箭头在按钮前</strong>
                                <div
                                    style="font-size: 12px; margin-top: 8px; color: #666;"
                                >
                                    Caret: before
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>

                    <!-- After 示例 -->
                    <div style="text-align: center;">
                        <h4 style="margin: 0 0 16px 0; color: #6f42c1;">
                            After (后缀箭头)
                        </h4>
                        <auto-dropdown
                            label="后缀箭头按钮"
                            outline
                            variant="default"
                            caret="after"
                            .popupOptions=${{
                                placement: "bottom-start",
                                fit: true,
                            }}
                        >
                            <div style="padding: 16px; text-align: center;">
                                <strong>箭头在按钮后</strong>
                                <div
                                    style="font-size: 12px; margin-top: 8px; color: #666;"
                                >
                                    Caret: after
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>
                </div>
            </div>

            <!-- 使用说明 -->
            <div
                style="background: #f8f9fa; border-radius: 8px; padding: 24px;"
            >
                <h3 style="margin: 0 0 20px 0; color: #495057;">
                    📖 Caret 属性使用说明
                </h3>
                <div
                    style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;"
                >
                    <div>
                        <h4 style="margin: 0 0 12px 0; color: #28a745;">
                            属性值说明
                        </h4>
                        <ul
                            style="margin: 0; padding-left: 20px; line-height: 1.8;"
                        >
                            <li>
                                <strong>auto</strong>:
                                根据placement自动决定箭头位置和方向
                            </li>
                            <li>
                                <strong>before</strong>: 强制在按钮前显示箭头
                            </li>
                            <li>
                                <strong>after</strong>: 强制在按钮后显示箭头
                            </li>
                            <li><strong>none</strong>: 不显示箭头指示器</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="margin: 0 0 12px 0; color: #007bff;">
                            代码示例
                        </h4>
                        <pre
                            style="background: #2d3748; color: #e2e8f0; padding: 12px; border-radius: 4px; font-size: 13px; overflow-x: auto;"
                        ><code>&lt;auto-dropdown
  label="选择选项"
  caret="auto"
  .popupOptions=${{
                            placement: "bottom-start",
                            fit: true,
                        }}
&gt;
  &lt;!-- 下拉内容 --&gt;
&lt;/auto-dropdown&gt;</code></pre>
                    </div>
                </div>
            </div>
        </div>
    `,
};
