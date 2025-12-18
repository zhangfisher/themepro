import { LitElement, html } from "lit";
import { TooltipController } from "../../controllers/tooltip";

/**
 * TooltipCacheDemo - 用于演示 tooltip 缓存复用机制
 */
class TooltipCacheDemo extends LitElement {
    // 创建 TooltipController 实例
    tooltip = new TooltipController(this, {
        trigger: "mouseover",
        placement: "top",
        arrow: true,
        animationDuration: 150,
    });

    // 动态内容相关属性
    private _timeInterval?: NodeJS.Timeout;
    private _counter = 0;
    private _counterInterval?: NodeJS.Timeout;

    connectedCallback() {
        super.connectedCallback();
        this._setupDynamicContent();
        this._setupCacheManagement();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._clearIntervals();
    }

    private _clearIntervals() {
        if (this._timeInterval) {
            clearInterval(this._timeInterval);
        }
        if (this._counterInterval) {
            clearInterval(this._counterInterval);
        }
    }

    private _setupDynamicContent() {
        // 设置动态时间内容
        const timeBtn = this.querySelector("#time-btn");
        if (timeBtn) {
            const updateTooltipContent = () => {
                const now = new Date();
                const timeString = now.toLocaleTimeString("zh-CN");
                const dateString = now.toLocaleDateString("zh-CN");

                timeBtn.setAttribute("data-tooltip", `
                    <div style='padding: 10px; background: white; border-radius: 6px; border: 1px solid #ddd; min-width: 200px;'>
                        <h4 style='margin: 0 0 10px 0; color: #17a2b8; font-size: 14px;'>🕒 当前时间</h4>
                        <div style='font-size: 18px; font-weight: bold; color: #333; margin-bottom: 5px;'>${timeString}</div>
                        <div style='font-size: 12px; color: #666;'>${dateString}</div>
                        <div style='margin-top: 10px; padding: 5px; background: #e3f2fd; border-radius: 3px; font-size: 11px; color: #1976d2;'>
                            缓存状态: <strong style='color: #28a745;'>已启用</strong>
                        </div>
                    </div>
                `);
            };

            updateTooltipContent();

            const intervalSelect = this.querySelector("#time-interval") as HTMLSelectElement;
            const interval = intervalSelect ? parseInt(intervalSelect.value) : 2000;

            this._timeInterval = setInterval(updateTooltipContent, interval);

            intervalSelect?.addEventListener("change", () => {
                clearInterval(this._timeInterval!);
                const newInterval = parseInt(intervalSelect.value);
                this._timeInterval = setInterval(updateTooltipContent, newInterval);
            });
        }

        // 设置动态计数器内容
        const counterBtn = this.querySelector("#counter-btn");
        if (counterBtn) {
            const updateCounter = () => {
                const stepInput = this.querySelector("#counter-step") as HTMLInputElement;
                const step = stepInput ? parseInt(stepInput.value) : 1;

                this._counter += step;

                counterBtn.setAttribute("data-tooltip", `
                    <div style='padding: 10px; background: white; border-radius: 6px; border: 1px solid #ddd; min-width: 180px;'>
                        <h4 style='margin: 0 0 10px 0; color: #6f42c1; font-size: 14px;'>🔢 计数器</h4>
                        <div style='font-size: 24px; font-weight: bold; color: #6f42c1; text-align: center; margin: 10px 0;'>${this._counter}</div>
                        <div style='font-size: 12px; color: #666; text-align: center;'>步长: +${step}</div>
                        <div style='margin-top: 10px; padding: 5px; background: #f3e5f5; border-radius: 3px; font-size: 11px; color: #6f42c1; text-align: center;'>
                            缓存复用中...
                        </div>
                    </div>
                `);
            };

            updateCounter();

            this._counterInterval = setInterval(updateCounter, 1500);

            const stepInput = this.querySelector("#counter-step") as HTMLInputElement;
            stepInput?.addEventListener("change", () => {
                updateCounter();
            });
        }

        // 设置动态表单内容
        const formBtn = this.querySelector("#form-btn");
        if (formBtn) {
            const updateForm = () => {
                const fieldsInput = this.querySelector("#form-fields") as HTMLInputElement;
                const fieldCount = fieldsInput ? parseInt(fieldsInput.value) : 3;

                let formFields = "";
                for (let i = 1; i <= fieldCount; i++) {
                    formFields += `
                        <div style='margin-bottom: 8px;'>
                            <label style='display: block; margin-bottom: 3px; font-size: 12px; color: #495057;'>字段 ${i}</label>
                            <input type='text' placeholder='输入内容 ${i}'
                                   style='width: 100%; padding: 4px; border: 1px solid #ced4da; border-radius: 3px; font-size: 12px;'>
                        </div>
                    `;
                }

                formBtn.setAttribute("data-tooltip", `
                    <div style='padding: 15px; background: white; border-radius: 6px; border: 1px solid #ddd; min-width: 250px;'>
                        <h4 style='margin: 0 0 12px 0; color: #fd7e14; font-size: 14px;'>📝 动态表单</h4>
                        <form style='margin: 0;'>
                            ${formFields}
                            <button type='button' style='width: 100%; padding: 6px; background: #fd7e14; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;'>
                                提交表单 (${fieldCount} 个字段)
                            </button>
                        </form>
                        <div style='margin-top: 10px; padding: 5px; background: #fff3e0; border-radius: 3px; font-size: 11px; color: #fd7e14; text-align: center;'>
                            动态字段数量，缓存启用
                        </div>
                    </div>
                `);
            };

            updateForm();

            const fieldsInput = this.querySelector("#form-fields") as HTMLInputElement;
            fieldsInput?.addEventListener("change", updateForm);
        }
    }

    private _setupCacheManagement() {
        // 设置基础缓存演示的状态监控
        const cachedBtn = this.querySelector("#cached-btn");
        const nonCachedBtn = this.querySelector("#non-cached-btn");
        const cachedStatus = this.querySelector("#cached-status");
        const nonCachedStatus = this.querySelector("#non-cached-status");

        if (cachedBtn && cachedStatus) {
            cachedBtn.addEventListener("mouseenter", () => {
                (cachedStatus as HTMLElement).textContent = "显示中 (缓存模式)";
                (cachedStatus as HTMLElement).style.color = "#28a745";
            });

            cachedBtn.addEventListener("mouseleave", () => {
                (cachedStatus as HTMLElement).textContent = "已隐藏 (元素保留在内存中)";
                (cachedStatus as HTMLElement).style.color = "#007bff";
            });
        }

        if (nonCachedBtn && nonCachedStatus) {
            nonCachedBtn.addEventListener("mouseenter", () => {
                (nonCachedStatus as HTMLElement).textContent = "显示中 (非缓存模式)";
                (nonCachedStatus as HTMLElement).style.color = "#28a745";
            });

            nonCachedBtn.addEventListener("mouseleave", () => {
                (nonCachedStatus as HTMLElement).textContent = "已隐藏 (元素已销毁)";
                (nonCachedStatus as HTMLElement).style.color = "#6c757d";
            });
        }

        // 设置缓存管理功能
        const refreshBtn = this.querySelector("#refresh-stats");
        const clearBtn = this.querySelector("#clear-cache");

        if (refreshBtn) {
            refreshBtn.addEventListener("click", () => {
                this._updateCacheStats();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                this._simulateCacheClear();
            });
        }

        // 初始化统计
        this._updateCacheStats();
    }

    private _updateCacheStats() {
        // 模拟统计数据（实际应用中应该从 tooltip controller 获取真实数据）
        const cacheButtons = this.querySelectorAll(".cache-btn");
        const mixedButtons = this.querySelectorAll(".mixed-btn");

        const totalTooltips = cacheButtons.length + mixedButtons.length;
        const cachedTooltips = cacheButtons.length + 2; // 混合按钮中有2个缓存
        const nonCachedTooltips = totalTooltips - cachedTooltips;

        this._updateElement("#total-count", totalTooltips.toString());
        this._updateElement("#cached-count", cachedTooltips.toString());
        this._updateElement("#non-cached-count", nonCachedTooltips.toString());
        this._updateElement("#cached-elements", cachedTooltips.toString());
        this._updateElement("#memory-usage", `~${cachedTooltips * 15}KB`);
    }

    private _simulateCacheClear() {
        // 模拟缓存清理效果
        const cachedElements = this.querySelector("#cached-elements") as HTMLElement;
        const memoryUsage = this.querySelector("#memory-usage") as HTMLElement;
        const cachedCount = this.querySelector("#cached-count") as HTMLElement;

        if (cachedElements) {
            const originalValue = cachedElements.textContent;
            cachedElements.textContent = "0";
            cachedElements.style.color = "#dc3545";

            setTimeout(() => {
                cachedElements.textContent = originalValue;
                cachedElements.style.color = "";
            }, 2000);
        }

        if (memoryUsage) {
            const originalValue = memoryUsage.textContent;
            memoryUsage.textContent = "~0KB";
            memoryUsage.style.color = "#dc3545";

            setTimeout(() => {
                memoryUsage.textContent = originalValue;
                memoryUsage.style.color = "";
            }, 2000);
        }

        if (cachedCount) {
            const originalValue = cachedCount.textContent;
            cachedCount.textContent = "0";
            cachedCount.style.color = "#dc3545";

            setTimeout(() => {
                cachedCount.textContent = originalValue;
                cachedCount.style.color = "#28a745";
            }, 2000);
        }
    }

    private _updateElement(selector: string, value: string) {
        const element = this.querySelector(selector) as HTMLElement;
        if (element) {
            element.textContent = value;
        }
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define("tooltip-cache-demo", TooltipCacheDemo);

export default TooltipCacheDemo;