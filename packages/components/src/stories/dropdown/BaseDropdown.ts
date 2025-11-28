import { html } from "lit";
import type { Story } from "./types";

export const BaseDropdown: Story = {
    name: "基础下拉菜单",
    render: (args: any) => {
        return html`
            <div
                style="padding: 20px; display: flex; gap: 20px; flex-wrap: wrap;"
            >
                <auto-dropdown
                    label="点击我"
                    type="primary"
                    .open=${args.open}
                    .popupOptions=${{
                        fitWidth: args.popupOptions?.fitWidth || false,
                        placement:
                            args.popupOptions?.placement || "bottom-start",
                        offset: args.popupOptions?.offset || [0, 4],
                        persistent: args.popupOptions?.persistent || false,
                        arrow: args.popupOptions?.arrow || false,
                        animationDuration:
                            args.popupOptions?.animationDuration || 300,
                        animationEasing:
                            args.popupOptions?.animationEasing ||
                            "easeOutQuart",
                    }}
                >
                    <div style="padding: 8px 16px; cursor: pointer; ">
                        选项 1
                    </div>
                    <div style="padding: 8px 16px; cursor: pointer; ">
                        选项 2
                    </div>
                    <div style="padding: 8px 16px; cursor: pointer; ">
                        选项 3
                    </div>
                    <hr
                        style="margin: 4px 0; border: none; border-top: 1px solid #e0e0e0;"
                    />
                    <div style="padding: 8px 16px; cursor: pointer; ">
                        更多选项
                    </div>
                </auto-dropdown>

                <auto-dropdown
                    label="右侧菜单"
                    .popupOptions=${{
                        placement: "right-start",
                    }}
                    type="info"
                >
                    <div
                        class="dropdown"
                        style="padding: 8px 0; min-width: 140px; background: white; border: 1px solid #d9d9d9; border-radius: 6px;"
                    >
                        <div style="padding: 8px 16px; cursor: pointer;">
                            右侧选项 1
                        </div>
                        <div style="padding: 8px 16px; cursor: pointer;">
                            右侧选项 2
                        </div>
                    </div>
                </auto-dropdown>

                <auto-dropdown
                    label="上方菜单自动反转"
                    .popupOptions=${{
                        placement: "top",
                    }}
                    type="warning"
                >
                    <div
                        class="dropdown"
                        style="padding: 8px 0; background: white; border: 1px solid #d9d9d9; border-radius: 6px;"
                    >
                        <div style="padding: 8px 16px; cursor: pointer;">
                            上方选项 1
                        </div>
                        <div style="padding: 8px 16px; cursor: pointer;">
                            上方选项 2
                        </div>
                    </div>
                </auto-dropdown>
            </div>
            <div
                style="padding: 20px; display: flex; gap: 20px; flex-wrap: wrap;"
            >
                <auto-dropdown
                    label="点击我"
                    type="primary"
                    .open=${args.open}
                    .popupOptions=${{
                        fitWidth: args.popupOptions?.fitWidth || false,
                        placement:
                            args.popupOptions?.placement || "bottom-start",
                        offset: args.popupOptions?.offset || [0, 4],
                        persistent: args.popupOptions?.persistent || false,
                        arrow: args.popupOptions?.arrow || false,
                        animationDuration:
                            args.popupOptions?.animationDuration || 300,
                        animationEasing:
                            args.popupOptions?.animationEasing ||
                            "easeOutQuart",
                    }}
                >
                    <div
                        class="dropdown"
                        style="padding: 8px 0; min-width: 160px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
                    >
                        <div
                            style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;"
                        >
                            选项 1
                        </div>
                        <div
                            style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;"
                        >
                            选项 2
                        </div>
                        <div
                            style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;"
                        >
                            选项 3
                        </div>
                        <hr
                            style="margin: 4px 0; border: none; border-top: 1px solid #e0e0e0;"
                        />
                        <div
                            style="padding: 8px 16px; cursor: pointer; hover:background-color: #f5f5f5;"
                        >
                            更多选项
                        </div>
                    </div>
                </auto-dropdown>

                <auto-dropdown
                    label="右侧菜单"
                    .popupOptions="${{
                        placement: "right-start",
                    }}"
                    type="info"
                >
                    <div
                        class="dropdown"
                        style="padding: 8px 0; min-width: 140px; background: white; border: 1px solid #d9d9d9; border-radius: 6px;"
                    >
                        <div style="padding: 8px 16px; cursor: pointer;">
                            右侧选项 1
                        </div>
                        <div style="padding: 8px 16px; cursor: pointer;">
                            右侧选项 2
                        </div>
                    </div>
                </auto-dropdown>

                <auto-dropdown label="上方菜单2" placement="top" type="warning">
                    <div
                        class="dropdown"
                        style="padding: 8px 0; background: white; border: 1px solid #d9d9d9; border-radius: 6px;"
                    >
                        <div style="padding: 8px 16px; cursor: pointer;">
                            上方选项 1
                        </div>
                        <div style="padding: 8px 16px; cursor: pointer;">
                            上方选项 2
                        </div>
                    </div>
                </auto-dropdown>
            </div>
        `;
    },
};
