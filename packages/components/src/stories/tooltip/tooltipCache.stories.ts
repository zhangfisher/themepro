import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./TooltipCacheDemo";

const meta: Meta = {
    title: "控制器/Tooltip/缓存复用机制",
    tags: ["autodocs"],
    render: () => html`<tooltip-cache-demo></tooltip-cache-demo>`,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "演示 tooltip cache=true 时的复用行为。当 cache=true 时，隐藏的 tooltip 不会销毁容器，也不会从 this.controller.tooltips 移除，这样可以实现快速复用，提升性能。",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

export const 基础缓存演示: Story = {
    name: "基础缓存演示",
    render: () => html`<tooltip-cache-demo>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <!-- 缓存的 Tooltip -->
            <button
                id="cached-btn"
                data-tooltip="这是一个缓存的 tooltip。隐藏时不会销毁，可以快速复用。"
                data-tooltip-cache="true"
                data-tooltip-placement="top"
                style="padding: 12px 20px; border: 1px solid #007bff; border-radius: 6px; background: #007bff; color: white; cursor: pointer;"
            >
                缓存 Tooltip
            </button>

            <!-- 非缓存的 Tooltip -->
            <button
                id="non-cached-btn"
                data-tooltip="这是一个非缓存的 tooltip。每次隐藏后都会销毁，下次显示时重新创建。"
                data-tooltip-cache="false"
                data-tooltip-placement="top"
                style="padding: 12px 20px; border: 1px solid #6c757d; border-radius: 6px; background: #6c757d; color: white; cursor: pointer;"
            >
                非缓存 Tooltip
            </button>
        </div>

        <!-- 状态显示区域 -->
        <div
            style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 6px;"
        >
            <h4 style="margin: 0 0 10px 0; color: #333;">状态监控</h4>
            <div
                style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;"
            >
                <div>
                    <strong>缓存的 Tooltip:</strong>
                    <div id="cached-status" style="color: #007bff;">
                        等待交互...
                    </div>
                </div>
                <div>
                    <strong>非缓存的 Tooltip:</strong>
                    <div id="non-cached-status" style="color: #6c757d;">
                        等待交互...
                    </div>
                </div>
            </div>
            <div style="margin-top: 15px; font-size: 12px; color: #666;">
                <strong>说明：</strong
                >反复悬停在两个按钮上，观察缓存和非缓存行为的区别。
            </div>
        </div>
    </tooltip-cache-demo>`,
    parameters: {
        docs: {
            description: {
                story: "对比缓存和非缓存 tooltip 的行为差异。缓存的 tooltip 在隐藏后保留在内存中，再次显示时速度更快。",
            },
        },
    },
};

export const 复杂内容缓存: Story = {
    name: "复杂内容缓存",
    render: () => html`<tooltip-cache-demo>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <!-- 复杂 HTML 内容缓存 -->
            <button
                data-tooltip="
                    <div style='padding: 15px; min-width: 300px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px;'>
                        <h4 style='margin: 0 0 10px 0; color: #856404; display: flex; align-items: center; gap: 8px;'>
                            <span style='font-size: 20px;'>⚠️</span> 复杂内容演示
                        </h4>
                        <p style='margin: 0 0 10px 0; color: #856404; line-height: 1.5;'>
                            这是一个复杂的 tooltip 内容，包含了：
                        </p>
                        <ul style='margin: 0; padding-left: 20px; color: #856404; font-size: 14px;'>
                            <li>格式化的 HTML 结构</li>
                            <li>自定义样式和颜色</li>
                            <li>图标和表情符号</li>
                            <li>复杂的布局设计</li>
                        </ul>
                        <div style='margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px; font-size: 12px; color: #6c757d;'>
                            <strong>性能提示：</strong>由于启用了缓存，这个复杂的 tooltip 只会在第一次显示时创建，后续显示会复用已有元素。
                        </div>
                    </div>
                "
                data-tooltip-cache="true"
                data-tooltip-placement="bottom"
                data-tooltip-arrow="true"
                style="padding: 12px 20px; border: 1px solid #ffc107; border-radius: 6px; background: #ffc107; color: #212529; cursor: pointer;"
            >
                复杂内容 (缓存)
            </button>

            <!-- 表格内容缓存 -->
            <button
                data-tooltip="
                    <div style='padding: 10px; background: white; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'>
                        <h4 style='margin: 0 0 10px 0; color: #333; font-size: 14px;'>📊 数据统计</h4>
                        <table style='border-collapse: collapse; width: 100%; font-size: 12px;'>
                            <thead>
                                <tr style='background: #f8f9fa;'>
                                    <th style='border: 1px solid #ddd; padding: 6px 8px; text-align: left;'>指标</th>
                                    <th style='border: 1px solid #ddd; padding: 6px 8px; text-align: center;'>数值</th>
                                    <th style='border: 1px solid #ddd; padding: 6px 8px; text-align: center;'>状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style='border: 1px solid #ddd; padding: 6px 8px;'>性能提升</td>
                                    <td style='border: 1px solid #ddd; padding: 6px 8px; text-align: center; color: #28a745;'>85%</td>
                                    <td style='border: 1px solid #ddd; padding: 6px 8px; text-align: center;'>✅</td>
                                </tr>
                                <tr>
                                    <td style='border: 1px solid #ddd; padding: 6px 8px;'>内存使用</td>
                                    <td style='border: 1px solid #ddd; padding: 6px 8px; text-align: center; color: #ffc107;'>+2MB</td>
                                    <td style='border: 1px solid #ddd; padding: 6px 8px; text-align: center;'>⚠️</td>
                                </tr>
                                <tr>
                                    <td style='border: 1px solid #ddd; padding: 6px 8px;'>响应速度</td>
                                    <td style='border: 1px solid #ddd; padding: 6px 8px; text-align: center; color: #28a745;'>< 10ms</td>
                                    <td style='border: 1px solid #ddd; padding: 6px 8px; text-align: center;'>✅</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style='margin-top: 10px; font-size: 11px; color: #6c757d; text-align: center;'>
                            * 数据基于缓存机制的性能测试
                        </div>
                    </div>
                "
                data-tooltip-cache="true"
                data-tooltip-placement="right"
                style="padding: 12px 20px; border: 1px solid #28a745; border-radius: 6px; background: #28a745; color: white; cursor: pointer;"
            >
                表格内容 (缓存)
            </button>
        </div>

        <!-- 性能提示 -->
        <div
            style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;"
        >
            <h5 style="margin: 0 0 10px 0; color: #1976d2;">💡 缓存性能优势</h5>
            <p
                style="margin: 0; font-size: 14px; color: #424242; line-height: 1.5;"
            >
                对于包含复杂 HTML 结构、表格或大量样式的
                tooltip，启用缓存可以显著提升性能。
                第一次显示时创建元素，后续显示直接复用，避免了重复的 DOM 操作。
            </p>
        </div>
    </tooltip-cache-demo>`,
    parameters: {
        docs: {
            description: {
                story: "演示复杂内容缓存的性能优势。包含复杂 HTML 和表格的 tooltip 在启用缓存后，反复显示时性能更佳。",
            },
        },
    },
};

export const 动态内容缓存: Story = {
    name: "动态内容缓存",
    render: () => html`<tooltip-cache-demo>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <!-- 动态表单内容 -->
            <button
                id="form-btn"
                data-tooltip="query://#form-tooltip"
                data-tooltip-cache="true"
                data-tooltip-placement="right"
                style="padding: 12px 20px; border: 1px solid #fd7e14; border-radius: 6px; background: #fd7e14; color: white; cursor: pointer;"
            >
                动态表单 (缓存)
            </button>
            <div
                id="form-tooltip"
                style="display:none;padding: 15px; background: white; border-radius: 6px; border: 1px solid #ddd; min-width: 250px;"
            >
                <h4
                    style="margin: 0 0 12px 0; color: #fd7e14; font-size: 14px;"
                >
                    📝 动态表单
                </h4>
                <form style="margin: 0;">
                    <div style="margin-bottom: 8px;">
                        <label
                            style="display: block; margin-bottom: 3px; font-size: 12px; color: #495057;"
                            >字段</label
                        >
                        <input
                            type="text"
                            placeholder="输入内容"
                            style="width: 100%; padding: 4px; border: 1px solid #ced4da; border-radius: 3px; font-size: 12px;"
                        />
                    </div>
                    <button
                        type="button"
                        style="width: 100%; padding: 6px; background: #fd7e14; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;"
                    >
                        提交表单
                    </button>
                </form>
                <div
                    style="margin-top: 10px; padding: 5px; background: #fff3e0; border-radius: 3px; font-size: 11px; color: #fd7e14; text-align: center;"
                >
                    动态字段数量，缓存启用
                </div>
            </div>
        </div>
    </tooltip-cache-demo>`,
    parameters: {
        docs: {
            description: {
                story: "演示即使启用缓存，也可以通过 getContent 函数实现动态内容更新。展示时间、计数器和表单的动态变化。",
            },
        },
    },
};

export const 缓存管理演示: Story = {
    name: "缓存管理演示",
    render: () => html`<tooltip-cache-demo>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 40px;">
            <!-- 批量缓存按钮 -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button
                    class="cache-btn"
                    data-tooltip="缓存按钮 1 - 第一个缓存的 tooltip"
                    data-tooltip-cache="true"
                    data-tooltip-placement="top"
                    style="padding: 10px 15px; border: 1px solid #007bff; border-radius: 6px; background: #007bff; color: white; cursor: pointer;"
                >
                    缓存按钮 1
                </button>
                <button
                    class="cache-btn"
                    data-tooltip="缓存按钮 2 - 第二个缓存的 tooltip"
                    data-tooltip-cache="true"
                    data-tooltip-placement="top"
                    style="padding: 10px 15px; border: 1px solid #007bff; border-radius: 6px; background: #007bff; color: white; cursor: pointer;"
                >
                    缓存按钮 2
                </button>
                <button
                    class="cache-btn"
                    data-tooltip="缓存按钮 3 - 第三个缓存的 tooltip"
                    data-tooltip-cache="true"
                    data-tooltip-placement="top"
                    style="padding: 10px 15px; border: 1px solid #007bff; border-radius: 6px; background: #007bff; color: white; cursor: pointer;"
                >
                    缓存按钮 3
                </button>
            </div>

            <!-- 混合按钮（部分缓存） -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button
                    class="mixed-btn"
                    data-tooltip="混合按钮 1 - 缓存模式"
                    data-tooltip-cache="true"
                    data-tooltip-placement="right"
                    style="padding: 10px 15px; border: 1px solid #28a745; border-radius: 6px; background: #28a745; color: white; cursor: pointer;"
                >
                    混合按钮 1 (缓存)
                </button>
                <button
                    class="mixed-btn"
                    data-tooltip="混合按钮 2 - 非缓存模式"
                    data-tooltip-cache="false"
                    data-tooltip-placement="right"
                    style="padding: 10px 15px; border: 1px solid #dc3545; border-radius: 6px; background: #dc3545; color: white; cursor: pointer;"
                >
                    混合按钮 2 (非缓存)
                </button>
                <button
                    class="mixed-btn"
                    data-tooltip="混合按钮 3 - 缓存模式"
                    data-tooltip-cache="true"
                    data-tooltip-placement="right"
                    style="padding: 10px 15px; border: 1px solid #28a745; border-radius: 6px; background: #28a745; color: white; cursor: pointer;"
                >
                    混合按钮 3 (缓存)
                </button>
            </div>
        </div>
    </tooltip-cache-demo>`,
    parameters: {
        docs: {
            description: {
                story: "演示如何管理和监控 tooltip 缓存。包括缓存统计、内存占用和缓存清理功能。",
            },
        },
    },
};
