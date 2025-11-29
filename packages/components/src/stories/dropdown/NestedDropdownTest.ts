import { html, LitElement, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("nested-test-content")
export class NestedTestContent extends LitElement {
    static styles = css`
        .nested-level-1 {
            border: 2px solid #d4edda;
            border-radius: 6px;
            padding: 15px;
            margin: 10px 0;
            background: #f8fff9;
            position: relative;
        }

        .nested-level-2 {
            border: 2px solid #cce5ff;
            border-radius: 6px;
            padding: 15px;
            margin: 10px 0;
            background: #f8f9ff;
            position: relative;
        }

        .nested-level-3 {
            border: 2px solid #fff3cd;
            border-radius: 6px;
            padding: 15px;
            margin: 10px 0;
            background: #fffef8;
            position: relative;
        }

        .test-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
        }

        .dropdown-row {
            display: flex;
            gap: 15px;
            margin: 10px 0;
            flex-wrap: wrap;
        }

        .position-indicator {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #ff4d4f;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: bold;
        }
    `;

    render() {
        return html`
            <!-- 单层嵌套测试 -->
            <div class="nested-level-1">
                <div class="position-indicator">L1</div>
                <h4 class="test-title">单层嵌套测试</h4>
                <div class="dropdown-row">
                    <auto-dropdown
                        label="底部弹出"
                        type="primary"
                        .popupOptions=${{
                            placement: "bottom",
                            arrow: true,
                            offset: [0, 2],
                        }}
                    >
                        <div
                            style="padding: 8px 12px; cursor: pointer; min-width: 120px;"
                        >
                            📍 底部选项 1
                        </div>
                        <div style="padding: 8px 12px; cursor: pointer;">
                            📍 底部选项 2
                        </div>
                    </auto-dropdown>

                    <auto-dropdown
                        label="右侧弹出"
                        type="success"
                        .popupOptions=${{
                            placement: "right",
                            arrow: true,
                            offset: [0, 2],
                        }}
                    >
                        <div
                            style="padding: 8px 12px; cursor: pointer; min-width: 120px;"
                        >
                            ➡️ 右侧选项 1
                        </div>
                        <div style="padding: 8px 12px; cursor: pointer;">
                            ➡️ 右侧选项 2
                        </div>
                    </auto-dropdown>

                    <auto-dropdown
                        label="顶部弹出"
                        type="warning"
                        .popupOptions=${{
                            placement: "top",
                            arrow: true,
                            offset: [0, 2],
                        }}
                    >
                        <div
                            style="padding: 8px 12px; cursor: pointer; min-width: 120px;"
                        >
                            ⬆️ 顶部选项 1
                        </div>
                        <div style="padding: 8px 12px; cursor: pointer;">
                            ⬆️ 顶部选项 2
                        </div>
                    </auto-dropdown>

                    <auto-dropdown
                        label="左侧弹出"
                        type="info"
                        .popupOptions=${{
                            placement: "left",
                            arrow: true,
                            offset: [0, 2],
                        }}
                    >
                        <div
                            style="padding: 8px 12px; cursor: pointer; min-width: 120px;"
                        >
                            ⬅️ 左侧选项 1
                        </div>
                        <div style="padding: 8px 12px; cursor: pointer;">
                            ⬅️ 左侧选项 2
                        </div>
                    </auto-dropdown>
                </div>
            </div>

            <!-- 多层嵌套测试 -->
            <div class="nested-level-1">
                <div class="position-indicator">L1</div>
                <h4 class="test-title">多层嵌套测试 - 第一层</h4>
                <div class="dropdown-row">
                    <auto-dropdown
                        label="二层嵌套"
                        type="primary"
                        .popupOptions=${{
                            placement: "bottom-start",
                            arrow: true,
                            offset: [0, 2],
                        }}
                    >
                        <!-- 第二层嵌套容器 -->
                        <div class="nested-level-2">
                            <div class="position-indicator">L2</div>
                            <h5 style="margin: 0 0 10px 0; color: #0066cc;">
                                第二层嵌套
                            </h5>
                            <auto-dropdown
                                label="三层嵌套"
                                type="success"
                                .popupOptions=${{
                                    placement: "right-start",
                                    arrow: true,
                                    offset: [0, 2],
                                }}
                            >
                                <!-- 第三层嵌套容器 -->
                                <div class="nested-level-3">
                                    <div class="position-indicator">L3</div>
                                    <h6
                                        style="margin: 0 0 10px 0; color: #ff8c00;"
                                    >
                                        第三层嵌套
                                    </h6>
                                    <auto-dropdown
                                        label="四层嵌套"
                                        type="warning"
                                        .popupOptions=${{
                                            placement: "top-start",
                                            arrow: true,
                                            offset: [0, 2],
                                        }}
                                    >
                                        <div
                                            style="padding: 8px 12px; cursor: pointer; min-width: 100px;"
                                        >
                                            🎯 最深层选项 1
                                        </div>
                                        <div
                                            style="padding: 8px 12px; cursor: pointer;"
                                        >
                                            🎯 最深层选项 2
                                        </div>
                                    </auto-dropdown>
                                    <div style="margin-top: 10px;">
                                        <auto-dropdown
                                            label="左侧弹出"
                                            type="info"
                                            .popupOptions=${{
                                                placement: "left",
                                                arrow: true,
                                                offset: [0, 2],
                                            }}
                                        >
                                            <div
                                                style="padding: 8px 12px; cursor: pointer; min-width: 100px;"
                                            >
                                                ⬅️ L3 左侧选项
                                            </div>
                                        </auto-dropdown>
                                        </div>
                                    </div>
                                </auto-dropdown>

                                <div style="margin-top: 10px;">
                                    <auto-dropdown
                                        label="L2 底部弹出"
                                        type="info"
                                        .popupOptions=${{
                                            placement: "bottom",
                                            arrow: true,
                                            offset: [0, 2],
                                        }}
                                    >
                                        <div
                                            style="padding: 8px 12px; cursor: pointer; min-width: 120px;"
                                        >
                                            ⬇️ L2 底部选项 1
                                        </div>
                                        <div
                                            style="padding: 8px 12px; cursor: pointer;"
                                        >
                                            ⬇️ L2 底部选项 2
                                        </div>
                                    </auto-dropdown>
                                </div>
                            </div>
                        </auto-dropdown>
                    </div>
                </div>
            </div>

            <!-- 边界测试 -->
            <div class="nested-level-1" style="margin-top: 30px;">
                <div class="position-indicator">边界</div>
                <h4 class="test-title">边界位置测试</h4>
                <div class="dropdown-row">
                    <auto-dropdown
                        label="右下角弹出"
                        type="danger"
                        .popupOptions=${{
                            placement: "bottom-end",
                            arrow: true,
                            offset: [0, 2],
                        }}
                    >
                        <div
                            style="padding: 8px 12px; cursor: pointer; min-width: 120px;"
                        >
                            🎯 边界选项 1
                        </div>
                        <div style="padding: 8px 12px; cursor: pointer;">
                            🎯 边界选项 2
                        </div>
                    </auto-dropdown>

                    <auto-dropdown
                        label="左上角弹出"
                        type="primary"
                        .popupOptions=${{
                            placement: "top-start",
                            arrow: true,
                            offset: [0, 2],
                        }}
                    >
                        <div
                            style="padding: 8px 12px; cursor: pointer; min-width: 120px;"
                        >
                            🎯 对角选项 1
                        </div>
                        <div style="padding: 8px 12px; cursor: pointer;">
                            🎯 对角选项 2
                        </div>
                    </auto-dropdown>
                </div>
            </div>

            <!-- 自动反转测试 -->
            <div class="nested-level-1" style="margin-top: 30px;">
                <div class="position-indicator">自动</div>
                <h4 class="test-title">自动位置反转测试</h4>
                <p
                    style="font-size: 13px; color: #666; margin-bottom: 10px;"
                >
                    当弹出内容超出边界时，应自动反转到合适位置
                </p>
                <div
                    class="dropdown-row"
                    style="justify-content: flex-end;"
                >
                    <auto-dropdown
                        label="右侧自动反转"
                        type="success"
                        .popupOptions=${{
                            placement: "right",
                            arrow: true,
                            offset: [0, 2],
                        }}
                    >
                        <div
                            style="padding: 8px 12px; cursor: pointer; min-width: 200px;"
                        >
                            🔄 这是一个较长的弹出内容，应该会自动反转位置
                        </div>
                        <div style="padding: 8px 12px; cursor: pointer;">
                            🔄 选项 2
                        </div>
                        <div style="padding: 8px 12px; cursor: pointer;">
                            🔄 选项 3
                        </div>
                    </auto-dropdown>
                </div>
            </div>
        `;
    }
}

@customElement("nested-dropdown-test")
export class NestedDropdownTest extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                sans-serif;
        }

        .test-container {
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            margin: 10px 0;
            background: #fafafa;
        }

        .test-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
        }

        .test-description {
            color: #666;
            font-size: 14px;
            margin-bottom: 15px;
        }
    `;

    render() {
        return html`
            <div class="test-container">
                <h3 class="test-title">🎯 AutoDropdown 嵌套弹出位置测试</h3>
                <p class="test-description">
                    测试 AutoDropdown
                    组件在不同嵌套层级下的弹出位置计算是否正确，
                    包括单层嵌套和多层嵌套的情况。
                </p>

                <!-- 嵌套测试内容组件 -->
                <nested-test-content></nested-test-content>
            </div>
        `;
    }
}

export const NestedDropdownDemo = {
    name: "嵌套组件弹出",
    render: () => {
        return html`<nested-dropdown-test></nested-dropdown-test>`;
    },
};
