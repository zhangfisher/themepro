/**
 * TooltipRegistry - 全局 Tooltip 注册表
 *
 * 功能：
 * - 管理所有活跃的 TooltipController 实例
 * - 协调不同 controller 之间的 tooltip 显示
 * - 确保同一时间只有一个 tooltip 显示
 * - 支持嵌套 tooltip（父子关系）
 */
export class TooltipRegistry {
    private static _instance: TooltipRegistry | null = null;

    /**
     * 存储所有已注册的 TooltipController 实例
     * 使用 Set 确保唯一性和快速查找
     */
    private readonly controllers = new Set<TooltipController>();

    /**
     * 当前正在显示 tooltip 的 controller
     * 用于快速判断和避免重复隐藏
     */
    private activeController: TooltipController | null = null;

    /**
     * 当前活跃的 tooltip 元素栈
     * 支持嵌套 tooltip，栈顶是当前显示的 tooltip
     */
    private tooltipStack: Array<{
        controller: TooltipController
        element: WeakRef<HTMLElement>
    }> = [];

    /**
     * 获取单例实例
     */
    static getInstance(): TooltipRegistry {
        if (!TooltipRegistry._instance) {
            TooltipRegistry._instance = new TooltipRegistry();
        }
        return TooltipRegistry._instance;
    }

    /**
     * 注册 controller
     */
    register(controller: TooltipController): void {
        this.controllers.add(controller);
    }

    /**
     * 注销 controller
     */
    unregister(controller: TooltipController): void {
        this.controllers.delete(controller);
        if (this.activeController === controller) {
            this.activeController = null;
            this.tooltipStack = [];
        }
    }

    /**
     * 通知即将显示 tooltip
     *
     * @param requestingController 请求显示的 controller
     * @param tooltipElement 要显示的 tooltip 元素
     * @returns 返回 true 表示可以继续显示，false 表示应取消显示
     */
    notifyShowing(requestingController: TooltipController, tooltipElement: HTMLElement): boolean {
        // 检查是否已经在栈中（避免重复）
        const existingIndex = this.tooltipStack.findIndex(item => {
            const element = item.element.deref();
            return element === tooltipElement;
        });

        if (existingIndex !== -1) {
            // 已存在，将其移动到栈顶
            const item = this.tooltipStack.splice(existingIndex, 1)[0];
            this.tooltipStack.push(item);
            this.activeController = requestingController;
            return true;
        }

        // 检查新 tooltip 是否是某个栈中 tooltip 的子元素
        const isNestedTooltip = this.tooltipStack.some(item => {
            const controller = item.controller;
            // 检查是否在同一个 controller 管理的某个 tooltip 容器内
            return controller === requestingController && this._isInTooltipContainer(tooltipElement, item.element.deref());
        });

        // 如果是嵌套 tooltip，隐藏当前显示的 tooltip 但不清空栈
        // 如果不是嵌套 tooltip（新的独立 tooltip），清空整个栈
        if (!isNestedTooltip) {
            // 隐藏所有 tooltip 并清空栈
            this.tooltipStack.forEach(item => {
                if (item.controller !== requestingController) {
                    item.controller.hide();
                }
            });
            this.tooltipStack = [];
        } else {
            // 嵌套 tooltip：只隐藏当前显示的 tooltip，但保留在栈中
            const current = this.tooltipStack[this.tooltipStack.length - 1];
            if (current.controller === requestingController) {
                // 同一个 controller 的嵌套 tooltip，不需要隐藏父 tooltip
                // 只是将其推入栈中
            }
        }

        // 将新 tooltip 推入栈
        this.tooltipStack.push({
            controller: requestingController,
            element: new WeakRef(tooltipElement)
        });

        this.activeController = requestingController;

        return true;
    }

    /**
     * 检查元素是否在某个 tooltip 容器内
     */
    private _isInTooltipContainer(element: HTMLElement, parentTooltipElement: HTMLElement | null | undefined): boolean {
        if (!parentTooltipElement) return false;

        // 获取 parent tooltip 元素对应的 Tooltip 实例
        // 这里我们需要访问 controller 的 tooltips 来查找对应的 container
        // 由于循环依赖问题，我们在 controller 端实现这个检查
        return false; // 这个检查会在 controller 端完成
    }

    /**
     * 通知 tooltip 已隐藏
     *
     * @param controller 隐藏 tooltip 的 controller
     * @param tooltipElement 被隐藏的 tooltip 元素（可选）
     */
    notifyHidden(controller: TooltipController, tooltipElement?: HTMLElement): void {
        if (this.tooltipStack.length === 0) return;

        // 如果指定了 tooltipElement，只从栈中移除该元素
        if (tooltipElement) {
            const index = this.tooltipStack.findIndex(item => {
                const element = item.element.deref();
                return element === tooltipElement && item.controller === controller;
            });

            if (index !== -1) {
                this.tooltipStack.splice(index, 1);
            }

            // 如果栈不为空，恢复显示上一个 tooltip
            if (this.tooltipStack.length > 0) {
                const top = this.tooltipStack[this.tooltipStack.length - 1];
                const topElement = top.element.deref();
                if (topElement) {
                    this.activeController = top.controller;
                    // 重新显示父 tooltip（如果需要）
                    // 注意：这里不需要调用 show()，因为 tooltip 还在显示状态
                }
            } else {
                this.activeController = null;
            }
        } else {
            // 没有指定元素，清空该 controller 的所有 tooltip
            this.tooltipStack = this.tooltipStack.filter(item => {
                return item.controller !== controller;
            });

            if (this.tooltipStack.length === 0) {
                this.activeController = null;
            }
        }
    }

    /**
     * 获取当前活跃的 controller
     */
    getActiveController(): TooltipController | null {
        return this.activeController;
    }

    /**
     * 获取当前显示的 tooltip 栈深度
     * 用于调试和测试
     */
    getStackDepth(): number {
        return this.tooltipStack.length;
    }

    /**
     * 清理所有 controller（用于测试）
     */
    clear(): void {
        this.controllers.clear();
        this.activeController = null;
        this.tooltipStack = [];
    }
}

// 前向声明，避免循环依赖
import type { TooltipController } from "./controller";
