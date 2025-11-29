import {
    computePosition,
    flip,
    offset,
    shift,
    hide,
    arrow,
    type ComputePositionReturn,
    autoUpdate,
} from "@floating-ui/dom";

export type TooltipPlacement =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";

export interface TooltipOptions {
    placement?: TooltipPlacement;
    offset?: [number, number];
    animationDuration?: number;
    animationEasing?: string;
    className?: string;
    arrow?: boolean;
    delayHide?: number;
    onShow?: () => void;
    onHide?: () => void;
}

export class Tooltip {
    private _container: HTMLElement;
    private _content: string;
    private _options: TooltipOptions;
    private _isVisible: boolean = false;
    private _cleanup?: () => void;
    private _autoUpdate?: ReturnType<typeof autoUpdate>;
    private _hideTimeout?: NodeJS.Timeout;

    constructor(
        container: HTMLElement,
        content: string,
        options: TooltipOptions = {}
    ) {
        this._container = container;
        this._content = content;
        this._options = {
            placement: "top",
            offset: [0, 8],
            animationDuration: 150,
            animationEasing: "easeOutQuart",
            className: "tooltip",
            arrow: true,
            delayHide: 30,
            ...options
        };

        // 设置初始状态
        this._container.style.visibility = "hidden";
        this._container.style.pointerEvents = "auto";
        this._container.className = this._options.className || "tooltip";
        this._applyInitialStyles();
    }

    /**
     * 应用初始样式
     */
    private _applyInitialStyles(): void {
        Object.assign(this._container.style, {
            position: "absolute",
            pointerEvents: "auto",
            opacity: "0",
            transform: "scale(0.9) translateY(-5px)",
            visibility: "hidden",
            zIndex: "1000",
            backgroundColor: "var(--auto-bgcolor)",
            borderRadius: "6px",
            padding: "8px 12px",
            fontSize: "14px",
            color: "var(--auto-color)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            maxWidth: "300px",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap"
        });

        // 设置内容
        this._container.innerHTML = this._content;
    }

    /**
     * 获取容器元素
     */
    getContainer(): HTMLElement {
        return this._container;
    }

    /**
     * 显示tooltip
     */
    async show(referenceElement: HTMLElement): Promise<void> {
        if (this._isVisible) return;

        this._isVisible = true;
        this._clearHideTimeout();

        // 计算位置
        const position = await computePosition(referenceElement, this._container, {
            placement: this._options.placement || "top",
            middleware: [
                offset(this._options.offset || [0, 8]),
                flip(),
                shift({ padding: 8 }),
                hide(),
                arrow({
                    element: this._container.querySelector('.tooltip-arrow'),
                    padding: 4,
                }),
            ],
        });

        // 应用位置
        Object.assign(this._container.style, {
            left: `${position.x}px`,
            top: `${position.y}px`,
            visibility: "visible",
            pointerEvents: "auto",
        });

        // 设置自动更新
        this._cleanup?.();
        this._autoUpdate = autoUpdate(referenceElement, this._container, () => {
            const newPosition = computePosition(referenceElement, this._container, {
                placement: this._options.placement || "top",
                middleware: [
                    offset(this._options.offset || [0, 8]),
                    flip(),
                    shift({ padding: 8 }),
                    hide(),
                    arrow({
                        element: this._container.querySelector('.tooltip-arrow'),
                        padding: 4,
                    }),
                ],
            });

            Object.assign(this._container.style, {
                left: `${newPosition.x}px`,
                top: `${newPosition.y}px`,
            });
        });

        // 显示动画
        await this._animateIn();

        // 设置延迟隐藏
        if (this._options.delayHide && this._options.delayHide > 0) {
            this._hideTimeout = setTimeout(() => {
                this.hide();
            }, this._options.delayHide);
        }

        this._options.onShow?.();
    }

    /**
     * 隐藏tooltip
     */
    hide(): void {
        if (!this._isVisible) return;

        this._clearHideTimeout();
        this._isVisible = false;

        this._animateOut().then(() => {
            this._container.style.visibility = "hidden";
            this._container.style.pointerEvents = "none";
        });

        // 清理自动更新
        this._cleanup?.();
        this._options.onHide?.();
    }

    /**
     * 销毁tooltip
     */
    destroy(): void {
        this.hide();
        this._cleanup?.();
        this._clearHideTimeout();

        // 移除DOM
        if (this._container?.parentNode) {
            this._container.parentNode.removeChild(this._container);
        }
    }

    /**
     * 清除隐藏定时器
     */
    private _clearHideTimeout(): void {
        if (this._hideTimeout) {
            clearTimeout(this._hideTimeout);
            this._hideTimeout = undefined;
        }
    }

    /**
     * 显示动画
     */
    private async _animateIn(): Promise<void> {
        return new Promise((resolve) => {
            const startTime = performance.now();
            const duration = this._options.animationDuration || 150;

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // 使用缓动函数
                const eased = this._easeOutQuart(progress);

                this._container.style.opacity = eased.toString();
                this._container.style.transform = `scale(${0.9 + eased * 0.1}) translateY(${-5 + eased * 5}px)`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    /**
     * 隐藏动画
     */
    private async _animateOut(): Promise<void> {
        return new Promise((resolve) => {
            const startTime = performance.now();
            const duration = this._options.animationDuration || 150;

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // 使用缓动函数
                const eased = this._easeInQuart(progress);

                this._container.style.opacity = (1 - eased).toString();
                this._container.style.transform = `scale(${1 - eased * 0.1}) translateY(${-eased * 5}px)`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    /**
     * 缓出函数
     */
    private _easeOutQuart(t: number): number {
        return 1 - Math.pow(1 - t, 4);
    }

    /**
     * 缓入函数
     */
    private _easeInQuart(t: number): number {
        return t * t * t * t;
    }

    /**
     * 检查是否可见
     */
    isVisible(): boolean {
        return this._isVisible;
    }
}