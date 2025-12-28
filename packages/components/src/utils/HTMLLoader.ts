/**
 *
 *  从远程URL加载HTML到一个container元素中
 *
 *  - 加载前显示一个Loading
 *  - 加载失败时显示错误
 *
 *
 * const loader = new HTMLLoader({
 *    container,
 *    actions?: AutoButton[]
 * })
 *
 * loader.load(url).then((v)=>{
 *
 * }).catch(()=>{
 *
 * })
 *
 *
 * - 当开始加载时Loading.status==='loading'
 * - 当加载出错时Loading.status==='error'
 * - 当加载成功时销毁Loading
 *
 */

import type {
    AutoLoading,
    AutoLoadingActionEventDetail,
    AutoLoadingProps,
} from "@/components/Loading";
import { removeUnescapedChars } from "./removeUnescapedChars";
import { deepMerge } from "flex-tools/object/deepMerge";

export type HTMLLoaderOptions = {
    url?: string;
    /**
     * 用于搭建与加载逻辑相关联的元素
     */
    container?: HTMLElement;
    onLoading?: AutoLoadingProps;
    onFail?: AutoLoadingProps & {
        fallback?: string; // 当失败且不重试时的回退内容
    };
    /**
     * 加载成功时的返回结果，可以返回HTMLElement或者string
     * @param result
     * @returns
     */
    onSuccess?: (
        result: Record<string, any> | string
    ) => Promise<string> | string | HTMLElement | Promise<HTMLElement>;
    /**
     * 将返回结果以HTML内容注入到container.innerHTML
     * - true : 默认注入到container.innerHTML
     * - false : 不注入
     * - string: 将结果注入到container.querySelector(选择器)指定的元素
     */
    injectTo?: boolean | string;
} & RequestInit;

export class HTMLLoader<T> {
    private _resolve?: (value: T) => void;
    private _reject?: (reason?: any) => void;
    private _loading?: AutoLoading;
    private _isLoading: boolean = false;
    /**
     * 取消操作
     */
    private _abortController?: AbortController;
    private _containerRef!: WeakRef<HTMLElement>;
    options: HTMLLoaderOptions;

    constructor(options?: HTMLLoaderOptions) {
        this.options = deepMerge(
            {
                onSuccess: (r: any) => r,
                onFail: {
                    retryable: true,
                    closeable: false,
                },
            },
            options
        );
        if (!(this.options.container instanceof HTMLElement)) {
            throw new Error("container must be instance of HTMLElement");
        }
        this._containerRef = new WeakRef(this.options.container);
    }
    get container() {
        return this._containerRef.deref();
    }

    private _onLoadingActionClick = (e: any) => {
        const detail = e.detail as AutoLoadingActionEventDetail;
        const actionId = detail.id;

        switch (actionId) {
            case "close":
            case "cancel":
            case "back":
                // 取消正在进行的请求
                if (this._isLoading) {
                    this._abortController?.abort();
                }
                // 最后调用 abort 清理资源
                this.abort();
                break;

            case "refresh":
            case "retry":
                // 检查是否允许重试（onFail.retryable 为 true）
                if (this.options.onFail?.retryable && !this._isLoading) {
                    // 重置 loading 状态为 loading
                    if (this._loading) {
                        this._loading.status = "loading";
                        // 清除之前的错误信息
                        this._loading.error = undefined;
                        this._loading.description = undefined;
                    }
                    // 重新开始 fetch
                    this._retryLoad();
                }
                break;
        }
    };
    /**
     * 创建AutoLoading元素
     * @returns
     */
    private _createLoading() {
        if (!this.options.container) return;
        const loading = document.createElement("auto-loading");
        const loadingAttrs = this.options.onLoading || {};
        Object.entries(loadingAttrs).forEach(([K, v]) => {
            loading.setAttribute(K, v);
        });
        loading.addEventListener("actionclick", this._onLoadingActionClick);
        this.options.container.appendChild(loading);
        this._loading = loading;
    }

    private _onLoadError(e: any) {
        if (this._loading) {
            this._loading.status = "error";
            // 合并 onFail 配置和错误信息
            const errorProps = {
                error: e instanceof Error ? e.message : String(e),
                description: e instanceof Error ? e.stack : String(e),
            };
            Object.assign(this._loading, this.options.onFail || {}, errorProps);
        }
    }

    private _onLoadSuccess(result: any) {
        this._loading?.remove();

        // 调用 onSuccess 回调处理结果
        const processedResult = this.options.onSuccess?.(result);

        // 处理返回值（可能是同步或异步）
        Promise.resolve(processedResult).then((finalResult) => {
            const container = this.container;
            if (!container) return;

            // 根据 injectTo 参数决定如何注入
            const injectTo = this.options.injectTo;

            if (injectTo === false) {
                // 不进行任何注入
                return;
            }

            // 确定要注入的内容和目标元素
            let content: string;
            if (typeof finalResult === "string") {
                content = removeUnescapedChars(finalResult);
            } else if (finalResult instanceof HTMLElement) {
                content = finalResult.outerHTML;
            } else {
                return;
            }

            // 根据 injectTo 的值选择目标元素
            if (injectTo === true || injectTo === undefined) {
                // 直接注入到 container.innerHTML
                container.innerHTML = content;
            } else if (typeof injectTo === "string") {
                // 注入到 container.querySelector(选择器) 指定的元素
                const targetElement = container.querySelector(injectTo);
                if (targetElement) {
                    targetElement.innerHTML = content;
                }
            }
        });
    }

    /**
     * 执行 fetch 请求的核心逻辑
     */
    private _performFetch(targetUrl: string) {
        this._abortController = new AbortController();
        fetch(
            targetUrl,
            Object.assign(
                {
                    signal: this._abortController.signal,
                },
                this.options
            )
        )
            .then((response) => {
                response
                    .text()
                    .then((r) => {
                        this._onLoadSuccess(r);
                        this._isLoading = false;
                        this._resolve!(r as T);
                    })
                    .catch((e) => {
                        this._onLoadError(e);
                        this._isLoading = false;
                        this._reject!(e);
                    });
            })
            .catch((reason) => {
                this._onLoadError(reason);
                this._isLoading = false;
                this._reject!(reason);
            });
    }

    /**
     * 重试加载（用于 retry 按钮点击）
     */
    private _retryLoad() {
        const targetUrl = this.options.url;
        if (!targetUrl) return;

        this._isLoading = true;
        this._performFetch(targetUrl);
    }

    load(url?: string) {
        if (this._isLoading) return;
        const targetUrl = url || this.options.url;
        if (!targetUrl) return;

        this._isLoading = true;
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
            this._createLoading();
            this._performFetch(targetUrl);
        });
    }
    abort() {
        this._abortController?.abort();
        this._isLoading = false;
        this._reject = undefined;
        this._resolve = undefined;
        this._loading?.remove();
    }
}
