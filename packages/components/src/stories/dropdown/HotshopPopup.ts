import { html } from "lit";
import type { Story } from "./types";

export const HotshopPopup: Story = {
    name: "局部元素弹出",
    render: (args: any) => {
        return html`
            <div
                style="padding: 40px; display: flex; flex-direction: column; gap: 30px;"
            >
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <h3>局部元素弹出功能</h3>
                    <p style="color: #666; font-size: 14px;">
                        通过trigger选择器指定host内部的具体元素作为触发器，支持data-tips和data-slot属性
                    </p>
                </div>

                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <kylin-dropdown
                        .tags=${[
                            {
                                icon: "settings",
                                tips: "系统设置",
                            },
                            {
                                icon: "tag",
                                tips: "<strong>打开标签</strong><br>点击打开系统设置面板",
                                dataset: {
                                    popupOptions: { placement: "bottom" },
                                },
                            },
                            {
                                icon: "info",
                                tips: "<strong>信息</strong><br>显示更多的信息",
                            },
                        ]}
                        style="width: 300px;"
                        icon="home"
                        label="设置按钮"
                        labelGrow
                        data-tips="<strong>设置按钮</strong><br>点击打开系统设置面板"
                        .popupOptions=${{
                            hotspots: ".tag",
                            placement: "top",
                            animationDuration: 200,
                            fitWidth: true,
                            arrow: true,
                        }}
                        ><strong>根热点信息</strong><br />
                        同一个元素中包括多个hotspot元素
                    </kylin-dropdown>

                    <kylin-dropdown
                        .tags=${[
                            {
                                icon: "settings",
                                tips: "系统设置",
                                dataset: {
                                    popupSlot: "settings",
                                },
                            },
                            {
                                icon: "tag",
                                tips: "<strong>打开标签</strong><br>点击打开系统设置面板",
                                dataset: {
                                    popupSlot: "tag",
                                },
                            },
                            {
                                icon: "info",
                                tips: "<strong>信息</strong><br>显示更多的信息",
                                dataset: {
                                    popupSlot: "info",
                                },
                            },
                        ]}
                        labelGrow
                        style="width: 300px;"
                        icon="tag"
                        size="small"
                        label="保存操作slot"
                        type="primary"
                        data-tips="<strong>保存操作</strong><br>将当前更改保存到文档中"
                        .popupOptions=${{
                            hotspots: ".tag",
                            placement: "top",
                            animationDuration: 200,
                            arrow: true,
                        }}
                    >
                        <div slot="settings">
                            <strong>系统设置</strong><br />显示更多的信息
                        </div>
                        <div slot="tag">
                            <strong>标签</strong><br />自定义标签
                        </div>
                        <div slot="info">
                            <strong>信息</strong><br />显示更多的信息
                        </div>
                    </kylin-dropdown>

                    <kylin-dropdown
                        .tags=${["folder", "tag", "settings"]}
                        labelGrow
                        style="width: 300px;"
                        icon="folder"
                        size="x-small"
                        label="复制内容"
                        type="success"
                        .popupOptions=${{
                            hotspots: ".tag",
                            placement: "top",
                            animationDuration: 200,
                            arrow: true,
                        }}
                        ><strong>复制功能</strong
                        ><br />复制选中的内容到剪贴板</kylin-dropdown
                    >

                    <kylin-dropdown
                        .tags=${["star", "tag", "settings"]}
                        labelGrow
                        style="width: 300px;"
                        icon="checked"
                        size="large"
                        label="删除项目"
                        type="danger"
                        .popupOptions=${{
                            trigger: "mouseover",
                            hotspots: ".tag",
                            placement: "top",
                            animationDuration: 200,
                            arrow: true,
                        }}
                    >
                        <div slot="settings">
                            <strong>系统设置</strong><br />显示更多的信息
                        </div>
                        <div slot="tag">
                            <strong>标签</strong><br />自定义标签
                        </div>
                        <div slot="info">
                            <strong>信息</strong><br />显示更多的信息
                        </div>
                        <strong>删除操作</strong
                        ><br />此操作不可撤销，请谨慎操作</kylin-dropdown
                    >
                </div>

                <div
                    style="padding: 20px; margin-top: 20px; background: #f8f9fa; border-radius: 6px;"
                >
                    <h4 style="margin: 0 0 15px 0; color: #333;">使用说明:</h4>
                    <div
                        style="display: flex; flex-direction: column; gap: 10px;"
                    >
                        <div>
                            <strong style="color: #1890ff;"
                                >trigger选择器:</strong
                            >
                            <code
                                style="background: #f1f3f4; padding: 2px 6px; border-radius: 3px;"
                                >hotspots: ".tag"</code
                            >
                            - 指定kylin-dropdown组件内的tag元素作为触发器
                        </div>
                        <div>
                            <strong style="color: #52c41a;">data-tips:</strong>
                            <code
                                style="background: #f1f3f4; padding: 2px 6px; border-radius: 3px;"
                                >data-tips="&lt;strong&gt;HTML&lt;/strong&gt;内容"</code
                            >
                            - 支持HTML格式的提示内容
                        </div>
                        <div>
                            <strong style="color: #722ed1;">data-slot:</strong>
                            <code
                                style="background: #f1f3f4; padding: 2px 6px; border-radius: 3px;"
                                >data-slot="slot-name"</code
                            >
                            - 指定要显示的slot内容
                        </div>
                        <div>
                            <strong style="color: #fa8c16;">优先级:</strong>
                            data-tips &gt; data-slot &gt; 默认slot内容
                        </div>
                        <div>
                            <strong style="color: #ff4d4f;">事件委托:</strong>
                            使用事件委托模式，在host元素上监听冒泡事件
                        </div>
                        <div>
                            <strong style="color: #13c2c2;">位置计算:</strong>
                            自动以触发元素为基准计算弹出位置
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};
