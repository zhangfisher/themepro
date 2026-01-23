/**
 * TooltipRegistry - 全局 Tooltip 注册表
 *
 * 功能：
 * - 管理所有活跃的 TooltipController 实例
 * - 协调不同 controller 之间的 tooltip 显示
 * - 确保同一时间只有一个 tooltip 显示
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
     * 当前活跃的 tooltip 元素
     */
    private activeTooltipElement: WeakRef<HTMLElement> | null = null;

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
            this.activeTooltipElement = null;
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
        // 如果当前显示的就是请求的 controller，检查是否是同一个元素
        if (this.activeController === requestingController) {
            const currentActive = this.activeTooltipElement?.deref();
            if (currentActive === tooltipElement) {
                return true; // 同一个 controller 的同一个元素，无需操作
            }
        }

        // 先更新 activeController 和 activeTooltipElement
        this.activeController = requestingController;
        this.activeTooltipElement = new WeakRef(tooltipElement);

        // 隐藏其他所有 controller 的 tooltip
        for (const controller of this.controllers) {
            if (controller !== requestingController) {
                controller.hide();
            }
        }

        return true;
    }

    /**
     * 通知 tooltip 已隐藏
     */
    notifyHidden(controller: TooltipController, tooltipElement?: HTMLElement): void {
        // 只有当前活跃的 controller 调用 hide 时才清空
        if (this.activeController === controller) {
            if (tooltipElement) {
                // 检查是否是当前活跃的元素
                const currentActive = this.activeTooltipElement?.deref();
                if (currentActive === tooltipElement) {
                    this.activeController = null;
                    this.activeTooltipElement = null;
                }
            } else {
                // 没有传入元素，直接清空
                this.activeController = null;
                this.activeTooltipElement = null;
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
     * 清理所有 controller（用于测试）
     */
    clear(): void {
        this.controllers.clear();
        this.activeController = null;
        this.activeTooltipElement = null;
    }
}

// 前向声明，避免循环依赖
import type { TooltipController } from "./controller";
