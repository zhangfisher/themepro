import { queryClosestElement } from "@/utils/queryClosestElement";
import type { TooltipController } from "./controller";
import type { TooltipControllerOptions, TooltipPlacement } from "./types";
import {
    arrow,
    autoUpdate,
    computePosition,
    type ComputePositionReturn,
    flip,
    hide,
    offset,
    shift,
} from "@floating-ui/dom";
import { animate } from "animejs";
import { parseObjectFromAttr } from "@/utils/parseObjectFromAttr";
import { getDatasetFromElement } from "@/utils/getDatasetFromElement";
import { removeUnescapedChars } from "../../utils/removeUnescapedChars";
import { applyStylesToElement } from "@/utils/applyStylesToElement";
import { isFunction } from "flex-tools/typecheck/isFunction";
import { isPromiseLike } from "@/utils/isPromiseLike";
import { getURLQueryParams } from "@/utils/getURLParams";
import { isNumber } from "flex-tools/typecheck/isNumber";
import "../../components/Loading";
import { HTMLLoader } from "@/utils/HTMLLoader";

export class Tooltip {
    options: Required<TooltipControllerOptions>;
    private _container?: HTMLElement;
    private _arrowElement?: HTMLElement;
    private _showAnimation?: any;
    private _hideAnimation?: any;
    private _delayHideTimer?: NodeJS.Timeout;
    private _mouseLeaveTimer?: NodeJS.Timeout;
    private _isVisible: boolean = false;
    private _target?: HTMLElement;
    private _loadContent?: Promise<any>;
    private _htmlLoader?: HTMLLoader;
    private _cleanup?: () => void;
    el: WeakRef<HTMLElement>;
    constructor(
        el: HTMLElement,
        public controller: TooltipController,
        options: TooltipControllerOptions = {}
    ) {
        this.el = new WeakRef(el);
        this.options = Object.assign(
            {
                placement: "top" as TooltipPlacement,
                offset: [0, 4],
                animationDuration: 150,
                animationEasing: "easeOutQuart",
                className: "tooltip",
                fit: "none",
                arrow: true,
                trigger: "mouseover",
                padding: "var(--auto-padding)",
                delayHide: 0,
                cache: false,
                styles: undefined,
                target: undefined,
                querySelector: this._querySelector.bind(this),
                predictSize: [300, 200],
                loading: undefined,
                cssClass: "tooltip-visible",
            },
            options
        ) as Required<TooltipControllerOptions>;
        if (typeof this.options.predictSize === "string") {
            //@ts-expect-error
            this.options.predictSize = this.options.predictSize.split(",");
        }

        this._parseAttrOptions();
        this._initElements();
    }
    get ref() {
        return this.el.deref()!;
    }
    get container() {
        return this._container!;
    }
    get contentElement(): HTMLElement | null | undefined {
        return this._container?.querySelector(":scope > .content");
    }
    get host() {
        return this.controller.hostElement as HTMLElement;
    }

    /**
     *  获取目标元素，即tooltip的显示位置
     *  用于计算tooltip的位置
     */
    get target() {
        if (!this._target) {
            if (typeof this.options.target === "string") {
                const target = this.options.querySelector(this.options.target);
                if (target instanceof HTMLElement) {
                    this._target = target;
                    return this._target;
                }
            }
            this._target = this.ref;
        }
        return this._target!;
    }

    /**
     * 查询匹配指定选择器的元素
     * 查询顺序：当前ref元素的最近匹配祖先 -> host元素内匹配元素 -> 文档范围内匹配元素
     * @param {string} selector - CSS选择器字符串
     * @returns {Element|null} 返回匹配的第一个元素，若无匹配则返回null
     */
    private _querySelector(selector: string) {
        return (
            queryClosestElement(this.ref, selector) ||
            this.host.querySelector(selector) ||
            this.host.ownerDocument.querySelector(selector)
        );
    }
    private _initElements() {
        this._container = this._createTooltipContainer();
        const content = this._getTooltipContent();
        this._setTooltipContent(content);
        this.controller.themeproContainer.appendChild(this._container);
    }
    /**
     * 解析元素上的工具提示选项属性
     *
     * 1. 从指定的属性名（默认为"tooltipOptions"）中解析JSON格式的选项
     * 2. 从data-tooltip-*属性中解析单个选项值
     * 3. 根据选项值的类型自动转换属性值（数字、布尔值、对象或字符串）
     *
     * @private 这是一个内部方法
     */
    private _parseAttrOptions() {
        if (this.ref instanceof HTMLElement) {
            const optionAttr = this.options.optionAttr ?? "tooltipOptions";
            const attrOptions = parseObjectFromAttr(this.ref, optionAttr);
            Object.assign(
                this.options,
                attrOptions,
                getDatasetFromElement(
                    this.ref,
                    Object.keys(this.options),
                    "tooltip"
                )
            );
            // 解析data-tooltip-<option>属性
        }
    }
    private _parsePredictSize(url?: string) {
        if (!url) return;
        const sizeArg = getURLQueryParams<string | undefined>(url, "_size");
        if (sizeArg) return;
        const size = typeof sizeArg === "string" ? sizeArg.split(",") : [];
        if (!Array.isArray(this.options.predictSize)) {
            this.options.predictSize = [100, 100];
        }
        if (size[0]) {
            this.options.predictSize[0] = size[0];
        }
        if (size[1]) {
            this.options.predictSize[1] = size[1];
        }
    }
    private _setPredictSize() {
        if (this.contentElement) {
            const w = this.options.predictSize[0];
            const h = this.options.predictSize[1];
            if (w)
                this.contentElement.style.width = isNumber(
                    this.options.predictSize[0]
                )
                    ? `${w}px`
                    : String(w);
            if (h)
                this.contentElement.style.height = isNumber(h)
                    ? `${h}px`
                    : String(h);
        }
    }
    /**
     * 创建一个加载中的元素
     */
    private _createLoading() {
        const loading = document.createElement("auto-loading");
        if (typeof this.options.loading === "string") {
            loading.setAttribute("message", this.options.loading);
        }
        return loading;
    }

    /**
     * 根据配置读取tooltip内容
     *
     * tooltip内容的解析原则:
     *
     * - data-tooltip="html字符串"
     * - data-tooltip="slot://<从host元素读取指定slotname>"
     * - data-tooltip="query://<全局文档选择器>"
     * - data-tooltip-query="<全局文档选择器>"
     * - data-tooltip="link://orders/123?fields=a,b,c"
     * - data-tooltip="http://orders/aaa/aaa"
     * - data-tooltip="http://192.168.1.11?fields=a,b,c"
     * - data-tooltip="https://192.168.1.11"
     * - data-tooltip-link=""
     *
     */
    private _getTooltipContent(): string | HTMLElement | undefined | null {
        const slot = this.ref.dataset.tooltipSlot
            ? `slot://${this.ref.dataset.tooltipSlot}`
            : undefined;

        const query = this.ref.dataset.tooltipQuery
            ? `query://${this.ref.dataset.tooltipQuery}`
            : undefined;

        const url = this.ref.dataset.tooltipLink
            ? `link://${this.ref.dataset.tooltipLink}`
            : undefined;

        const content = url || slot || query || this.ref.dataset.tooltip;

        if (!content && !isFunction(this.options.getContent)) return;

        const isAsyncContent =
            content?.startsWith("link://") ||
            content?.startsWith("http://") ||
            content?.startsWith("https://");

        let el: any = null;
        let getContent = this.options.getContent;

        if (isFunction(this.options.getContent)) {
        } else if (isAsyncContent && content) {
            let url: string;
            if (
                content.startsWith("http://") ||
                content.startsWith("https://")
            ) {
                url = content;
            } else {
                url = content.substring(content.indexOf("://") + 3).trim();
            }
            if (url.length === 0) return;
            this._parsePredictSize(url);
            this._setPredictSize();
            this._htmlLoader = new HTMLLoader({
                url,
                container: this.contentElement,
            });
            this._htmlLoader.load();
            el = this._htmlLoader.loading;
        } else {
            if (content?.startsWith("slot://")) {
                const slotName = content.substring(7);
                if (slotName.length === 0) return;
                el = this.host.querySelector(`[slot='${slotName}']`);
            } else if (content?.startsWith("query://")) {
                const selector = content.substring(8).trim();
                if (selector.length === 0) return;
                el = this.options.querySelector(selector) as HTMLElement;
            } else {
                el = removeUnescapedChars(content || "");
            }
        }
        // if (isFunction(getContent)) {
        //     const result = getContent.call(this, el, this.ref, this);
        //     if (isPromiseLike(result)) {
        //         this._loadContent = result as any;
        //         el = this._createLoading();
        //     } else {
        //         el = result;
        //     }
        // }
        if (!el) return;
        if (el instanceof HTMLElement) {
            return el
                ? removeUnescapedChars(
                      (el.cloneNode(true) as HTMLElement).outerHTML
                  )
                : null;
        } else {
            return removeUnescapedChars(el);
        }
    }

    /**
     * 设置tooltip内容
     */
    private _setTooltipContent(content: string | HTMLElement) {
        if (!this._container) return;
        const contentEl = this.contentElement;
        if (!contentEl) return;
        if (typeof content === "string") {
            contentEl.innerHTML = content;
        } else {
            contentEl.innerHTML = removeUnescapedChars(content.innerHTML);
            contentEl.appendChild(content);
        }
        contentEl.childNodes.forEach((child) => {
            if (
                child instanceof HTMLElement &&
                child.style.display === "none"
            ) {
                child.style.display = "block";
            }
        });
        // 创建内容包装器
        // const footerWrapper = document.createElement("div");
        // footerWrapper.classList.add("footer");
        // footerWrapper.appendChild(footerWrapper);
        // this._container.appendChild(footerWrapper);
        applyStylesToElement(this._container, this.options.styles);
        return contentEl;
    }

    /**
     * 创建tooltip容器
     */
    private _createTooltipContainer() {
        const container = this.host.ownerDocument!.createElement("div");
        if (this.options.className) {
            container.classList.add(this.options.className);
        }
        container.style.cssText = `
            position: absolute;
            pointer-events: auto;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
            background-color: var(--auto-bgcolor);
            border-radius: var(--auto-border-radius);
            border: var(--auto-border); 
            font: var(--auto-font);
            color: var(--auto-color);
            box-shadow: var(--auto-shadow);
            word-wrap: break-word;
            white-space: pre-wrap;
            max-width: 100%;
            max-height: 100%;
            box-sizing: border-box;
        `;

        if (this.options.arrow) {
            const arrowElement = this._createArrowElement(container);
            if (arrowElement) {
                container.appendChild(arrowElement);
            }
            this._arrowElement = arrowElement;
        }
        container.style.visibility = "visible";
        container.style.pointerEvents = "auto";

        // 创建内容包装器
        const contentElement = document.createElement("div");
        contentElement.classList.add("content");
        Object.assign(contentElement.style, {
            position: "relative",
            transition: "width,height 0.5s ease-out",
            padding: this.options.padding,
        });
        container.appendChild(contentElement);

        this._onTooltipContainerEvents(container);
        return container;
    }
    private _onTooltipContainerEvents(container: HTMLElement) {
        // 监听tooltip-close事件
        container.addEventListener("tooltip:close", () => {
            this.hide();
        });
    }
    /**
     * 切换提示框显示状态
     */
    toggle(): void {
        if (this._isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    private _onMouseEnter = (e: any) => {
        e.stopPropagation();
        clearTimeout(this._mouseLeaveTimer);
    };
    private _onMouseLeave = (e: any) => {
        e.stopPropagation();
        clearTimeout(this._mouseLeaveTimer);
        // 当通过点击触发时，不隐藏tooltip，而是通过点击外部或显式隐藏或delayHide来自动隐藏
        if (this.options.trigger === "click") {
            return;
        }
        this._mouseLeaveTimer = setTimeout(() => {
            this.hide();
        }, 100);
    };
    private _onEscapeKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Escape" && this._isVisible) {
            this.hide();
        }
    };
    private _onDocumentClick = (e: Event) => {
        const path = e.composedPath();
        if (!path.includes(this.ref) && !path.includes(this.container)) {
            this.hide();
        }
    };
    /**
     * 设置外部事件监听器
     */
    private _addEventListeners(): void {
        if (this.ref) {
            this.ref.addEventListener("mouseenter", this._onMouseEnter);
            this.ref.addEventListener("mouseleave", this._onMouseLeave);
        }
        if (this._container) {
            this._container.addEventListener("mouseenter", this._onMouseEnter);
            this._container.addEventListener("mouseleave", this._onMouseLeave);
        }
        // 延迟添加事件监听器，避免当前事件触发
        setTimeout(() => {
            const document = this.host.ownerDocument;
            document.addEventListener("click", this._onDocumentClick, true);
            document.addEventListener("keydown", this._onEscapeKeyPress);
        }, 0);
    }
    private _removeEventListeners() {
        if (this.ref) {
            this.ref.removeEventListener("mouseenter", this._onMouseEnter);
            this.ref.removeEventListener("mouseleave", this._onMouseLeave);
        }
        if (this._container) {
            this._container.removeEventListener(
                "mouseenter",
                this._onMouseEnter
            );
            this._container.removeEventListener(
                "mouseleave",
                this._onMouseLeave
            );
        }
        document.removeEventListener("click", this._onDocumentClick, true);
        document.removeEventListener("keydown", this._onEscapeKeyPress);
    }
    /**
     * 清理延迟隐藏定时器
     */
    private _clearDelayHideTimer(): void {
        if (this._delayHideTimer) {
            clearTimeout(this._delayHideTimer);
            this._delayHideTimer = undefined;
        }
        if (this._mouseLeaveTimer) {
            clearTimeout(this._mouseLeaveTimer);
            this._mouseLeaveTimer = undefined;
        }
    }
    /**
     * 创建箭头元素
     */
    private _createArrowElement(container: HTMLElement): HTMLElement {
        const arrowElement = this.host.ownerDocument!.createElement("div");
        arrowElement.className = "arrow";
        arrowElement.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            z-index: 1;
            pointer-events: none;
            transform: rotate(45deg);
            display: ${this.options.arrow ? "block" : "none"};
        `;
        arrowElement.style.backgroundColor = container.style.backgroundColor;
        return arrowElement;
    }
    /**
     * 设置自动更新
     */
    private _setupAutoUpdate(): void {
        if (!this.target || !this.container) return;
        // 清理之前的自动更新
        this._cleanup?.();
        // 设置新的自动更新
        this._cleanup = autoUpdate(this.target, this.container, () => {
            // 使用统一的位置计算函数进行自动更新
            this._calculatePosition((position) => {
                if (this._isVisible) {
                    this._applyPosition(position);
                }
            });
        });
    }
    /**
     * 应用位置到容器
     */
    private _applyPosition(position: ComputePositionReturn): void {
        const { x, y, placement, middlewareData } = position;
        const { referenceHidden } = middlewareData.hide || {};
        const container = this.container;

        Object.assign(container.style, {
            left: `${x}px`,
            top: `${y}px`,
            visibility: referenceHidden ? "hidden" : "visible",
        });

        // 处理箭头位置，传递实际的placement（可能已翻转）
        this._updateArrowPosition(middlewareData, placement);
    }
    /**
     * 更新箭头位置和样式
     */
    private _updateArrowPosition(
        middlewareData: ComputePositionReturn["middlewareData"],
        placement?: string
    ): void {
        if (
            !this.options.arrow ||
            !this._arrowElement ||
            !middlewareData.arrow ||
            !this._container
        ) {
            if (this._arrowElement) {
                this._arrowElement.style.display = "none";
            }
            return;
        }
        this._arrowElement.style.display = "block";

        const { x, y } = middlewareData.arrow;
        const currentPlacement = placement || this.options.placement || "top";

        const side = currentPlacement.split("-")[0];
        const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
        }[side] as string;

        const arrowLen = this._arrowElement.offsetWidth;

        Object.assign(this._arrowElement.style, {
            left: x != null ? `${x}px` : "",
            top: y != null ? `${y}px` : "",
            right: "",
            bottom: "",
            [staticSide]: `${-arrowLen / 2}px`,
            transform: "rotate(45deg)",
        });

        this._setArrowBorderByPlacement(currentPlacement);
    }
    /**
     * 根据placement设置箭头边框显示
     */
    private _setArrowBorderByPlacement(placement: string): void {
        if (!this._arrowElement || !this._container) return;

        const containerStyle = window.getComputedStyle(this._container);
        this._arrowElement.style.border = containerStyle.border;

        if (placement.startsWith("bottom")) {
            Object.assign(this._arrowElement.style, {
                borderBottomColor: "transparent",
                borderRightColor: "transparent",
            });
        } else if (placement.startsWith("top")) {
            Object.assign(this._arrowElement.style, {
                borderLeftColor: "transparent",
                borderTopColor: "transparent",
            });
        } else if (placement.startsWith("left")) {
            Object.assign(this._arrowElement.style, {
                borderLeftColor: "transparent",
                borderBottomColor: "transparent",
            });
        } else if (placement.startsWith("right")) {
            Object.assign(this._arrowElement.style, {
                borderTopColor: "transparent",
                borderRightColor: "transparent",
            });
        }
    }
    /**
     * 创建浮层中间件配置
     */
    private _createMiddleware(isAutoUpdate: boolean = false): any[] {
        // 计算基础偏移量和箭头偏移量
        const baseOffset = this.options.offset?.[1] || 8;
        const middleware = [
            offset({
                crossAxis: this.options.offset?.[0] || 0,
                mainAxis: baseOffset + (this.options.arrow ? 4 : 0),
            }),
            flip(isAutoUpdate ? { fallbackAxisSideDirection: "start" } : {}),
            shift({
                padding: 8,
            }),
            hide({
                strategy: "referenceHidden",
            }),
        ];
        // 如果需要箭头，添加arrow middleware
        if (this.options.arrow && this._arrowElement) {
            middleware.push(
                arrow({
                    element: this._arrowElement,
                    padding: 4,
                })
            );
        }

        return middleware;
    }
    /**
     * 统一的位置计算函数 - 消除重复代码
     * @param callback 可选的回调函数，用于处理计算结果
     */
    private async _calculatePosition(
        callback?: (position: ComputePositionReturn) => void
    ): Promise<ComputePositionReturn> {
        const currentOptions = this.options;
        const middleware = this._createMiddleware();
        const position = await computePosition(this.target, this.container, {
            placement: currentOptions.placement!,
            middleware,
        });

        // 如果提供了回调函数，则执行回调
        if (callback) {
            callback(position);
        }
        return position;
    }
    /**
     * 统一的位置更新函数
     * @param setupAutoUpdate 是否设置自动更新，默认为true
     * @param async 是否异步执行，默认为true（用于show时的同步等待）
     * @returns 如果async为true则返回Promise
     */
    private _updatePosition(
        setupAutoUpdate: boolean = true,
        async: boolean = true
    ): Promise<void> | void {
        const positionTask = this._calculatePosition((position) => {
            if (this._isVisible) {
                this._applyPosition(position);
            }
        });

        if (async) {
            return positionTask.then(() => {
                if (setupAutoUpdate) {
                    this._setupAutoUpdate();
                }
            });
        } else {
            positionTask.then(() => {
                if (setupAutoUpdate) {
                    this._setupAutoUpdate();
                }
            });
        }
    }
    async show() {
        if (this._isVisible || !this._container) return;
        // 停止任何正在进行的隐藏动画
        this._hideAnimation?.pause();
        // 清理之前的延迟隐藏定时器
        this._clearDelayHideTimer();
        // 设置外部事件监听器
        this._addEventListeners();

        // 应用显示时的CSS类
        this._applyCssClass(true);

        this._fitContainer();

        // 先同步计算显示位置，确保定位准确
        await this._updatePosition(true, true);

        // 位置计算完成后再开始显示动画
        const targets = [this.container];
        if (this.options.arrow && this._arrowElement) {
            targets.push(this._arrowElement);
        }

        this._showAnimation = animate(targets, {
            opacity: [0, 1],
            scale: [0.9, 1],
            translateY: [-5, 0],
            duration: this.options.animationDuration!,
            easing: this.options.animationEasing || "easeOutQuart",
        });

        this._loadAsyncContent();
        this._isVisible = true;
        this.options.onShow?.();
        this._setDelayHide();
    }
    private _loadAsyncContent() {
        if (this._loadContent && this._loadContent instanceof Promise) {
            if (Array.isArray(this.options.predictSize)) {
                const [w, h] = this.options.predictSize;
                const contentElement = this.contentElement;
                if (contentElement) {
                    if (w)
                        contentElement.style.width = isNumber(w)
                            ? `${w}px`
                            : String(w);
                    if (h)
                        contentElement.style.height = isNumber(h)
                            ? `${h}px`
                            : String(h);
                }
            }
            this._loadContent
                .then((value: any) => {
                    const el = this._setTooltipContent(value);
                    if (el) {
                        el.style.width = "auto";
                        el.style.height = "auto";
                    }
                })
                .catch((e: any) => {
                    this._setTooltipContent(e.message);
                })
                .finally(() => {
                    this._loadContent = undefined;
                });
        }
    }
    private _fitContainer() {
        const fit = this.options.fit;
        if (fit !== "none" && this.container) {
            const placement = this.options.placement;
            const targetRect = this.target.getBoundingClientRect();
            if (fit === "width") {
                this.container.style.width = `${targetRect.width}px`;
            } else if (fit === "height") {
                this.container.style.height = `${targetRect.height}px`;
            } else if (fit === "auto") {
                if (
                    placement.startsWith("left") ||
                    placement.startsWith("right")
                ) {
                    this.container.style.height = `${targetRect.height}px`;
                } else {
                    this.container.style.width = `${targetRect.width}px`;
                }
            }
        }
    }
    /**
     * 设置自动延迟隐藏
     */
    private _setDelayHide() {
        if (this.options.delayHide > 0 && this.options.trigger === "click") {
            this._delayHideTimer = setTimeout(() => {
                this.hide();
            }, this.options.delayHide);
        }
    }

    /**
     * 应用CSS类到ref元素
     */
    private _applyCssClass(isShowing: boolean): void {
        if (!this.options.cssClass || !this.ref) return;

        const cssClass = this.options.cssClass;
        const [showClass, hideClass] = Array.isArray(cssClass)
            ? cssClass
            : cssClass.split(",");
        if (isShowing) {
            if (showClass) this.ref.classList.add(showClass);
            this.ref.classList.remove(hideClass);
        } else {
            if (hideClass) this.ref.classList.add(hideClass);
            this.ref.classList.remove(showClass);
        }
    }

    /**
     * 隐藏提示框
     */
    hide() {
        if (!this._isVisible) return;

        const container = this.container;
        const options = this.options;
        // 停止任何正在进行的显示动画
        this._showAnimation?.pause();

        // 清理延迟隐藏定时器
        this._clearDelayHideTimer();

        // 应用隐藏时的CSS类
        this._applyCssClass(false);

        // 使用animejs创建隐藏动画
        const targets = [container];
        if (options.arrow && this._arrowElement) {
            targets.push(this._arrowElement);
        }

        this._hideAnimation = animate(targets, {
            opacity: [1, 0],
            scale: [1, 0.9],
            translateY: [0, -5],
            duration: options.animationDuration || options.animationDuration!,
            easing:
                options.animationEasing ||
                options.animationEasing ||
                "easeInQuart",
        });

        // 设置动画回调
        if (this._hideAnimation?.finished) {
            this._hideAnimation.finished.then(() => {
                container.style.visibility = "hidden";
                ///container.style.pointerEvents = "none";
                this._hideAnimation = undefined;
                this.destroy();
            });
        } else {
            // 如果动画对象异常，直接执行完成逻辑
            setTimeout(() => {
                container.style.visibility = "hidden";
                //container.style.pointerEvents = "none";
                this._hideAnimation = undefined;
                this.destroy();
            }, options.animationDuration || options.animationDuration!);
        }

        this._isVisible = false;
        options.onHide?.();
    }
    destroy() {
        this._removeEventListeners();
        //  如果有加载中的内容，则取消加载
        this._loadContent = undefined;

        if (!this.options.cache) {
            setTimeout(() => {
                this.controller.themeproContainer?.removeChild(this.container);
                this.controller.tooltips.remove(this);
            });
        }
    }
}
