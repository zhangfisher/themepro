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
import { isFunction } from "flex-tools/typecheck/isFunction";

export type HTMLLoaderOptions = {
    url?: string;
    /**
     * 用于搭建与加载逻辑相关联的元素
     */
    container?: HTMLElement | null;
    /**
     * 传递给 fetch 的选项
     */
    fetchOptions?: RequestInit;
    onLoading?: AutoLoadingProps & {
        callback?: () => void;
    };
    onReject?: AutoLoadingProps & {
        fallback?: string; // 当失败且不重试时的回退内容
        callback?: (e: Error) => void;
    };
    /**
     * 加载成功时的回调函数
     * @param result - 加载结果，可以是对象或字符串
     * @returns 可以不返回任何内容、返回字符串、返回 HTMLElement，或它们的 Promise 形式
     *
     * @example
     * // 不返回任何内容（使用原始结果）
     * onResolve: (result) => { console.log(result); }
     *
     * @example
     * // 返回字符串
     * onResolve: (result) => "<div>处理后的内容</div>"
     *
     * @example
     * // 返回 HTMLElement
     * onResolve: () => {
     *     const div = document.createElement("div");
     *     div.textContent = "自定义元素";
     *     return div;
     * }
     *
     * @example
     * // 返回 Promise
     * onResolve: async (result) => {
     *     return await processResult(result);
     * }
     */
    onResolve?: (
        result: Record<string, any> | string
    ) =>
        | HTMLElement
        | string
        | undefined
        | Promise<HTMLElement | string | undefined>;
    /**
     * 将返回结果以HTML内容注入到container.innerHTML
     * - true : 默认注入到container.innerHTML
     * - false : 不注入
     * - string: 将结果注入到container.querySelector(选择器)指定的元素
     */
    injectTo?: boolean | string;
};

export class HTMLLoader {
    options: HTMLLoaderOptions;
    loading?: AutoLoading;
    private _resolve?: () => void;
    private _reject?: (reason?: any) => void;
    private _isLoading: boolean = false;
    private _abortController?: AbortController;
    private _containerRef!: WeakRef<HTMLElement>;
    constructor(options?: HTMLLoaderOptions) {
        this.options = deepMerge(
            {
                onResolve: (r: any) => r,
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
        if (this.options.url) {
            this.load();
        }
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
                if (this.options.onReject?.retryable && !this._isLoading) {
                    // 重置 loading 状态为 loading
                    if (this.loading) {
                        this.loading.status = "loading";
                        // 清除之前的错误信息
                        this.loading.error = undefined;
                        this.loading.description = undefined;
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
            if (!isFunction(v)) loading.setAttribute(K, v);
        });
        loading.addEventListener("actionclick", this._onLoadingActionClick);
        this.options.container.appendChild(loading);
        this.loading = loading;
    }

    private _onLoadReject(e: any) {
        if (this.loading) {
            const errorProps = {
                error: e instanceof Error ? e.message : String(e),
                description: e instanceof Error ? e.stack : String(e),
            };
            const onReject = Object.assign({}, this.options.onReject);
            delete onReject.callback;
            Object.assign(this.loading, errorProps, onReject);
            this.loading.status = "error";
            setTimeout(() => {
                if (isFunction(this.options.onReject?.callback)) {
                    this.options.onReject.callback(e);
                }
            });
        }
    }
    private _injectToContainer(finalResult: any) {
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
            this.container.innerHTML = content;
        } else if (typeof injectTo === "string") {
            // 注入到 container.querySelector(选择器) 指定的元素
            const targetElement = this.container.querySelector(injectTo);
            if (targetElement) {
                targetElement.innerHTML = content;
            }
        }
    }

    private _onLoadResolve(result: any) {
        this.loading?.remove();
        const onResolve = this.options.onResolve || ((r: any) => r);
        // 调用 onSuccess 回调处理结果
        const processedResult = onResolve?.(result);
        if (processedResult === undefined) {
            this._injectToContainer(result);
        } else {
            Promise.resolve(processedResult).then((result) => {
                this._injectToContainer(result);
            });
        }
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
                this.options.fetchOptions || {}
            )
        )
            .then(async (response) => {
                // 检查 HTTP 状态码，处理错误响应（404, 500 等）
                if (!response.ok) {
                    // 尝试获取错误响应的文本内容
                    let errorText = "";
                    try {
                        errorText = await response.text();
                    } catch {
                        errorText = response.statusText;
                    }
                    // 创建一个包含状态码和错误信息的 Error 对象
                    const error = new Error(
                        `HTTP ${response.status}: ${response.statusText}`
                    );
                    (error as any).stack = errorText;

                    this._onLoadReject(error);
                    this._isLoading = false;
                    this._reject!(error);
                    return;
                }

                // 成功响应，读取文本内容
                response
                    .text()
                    .then((r) => {
                        this._onLoadResolve(r);
                        this._isLoading = false;
                        this._resolve!();
                    })
                    .catch((e) => {
                        this._onLoadReject(e);
                        this._isLoading = false;
                        this._reject!(e);
                    });
            })
            .catch((reason) => {
                this._onLoadReject(reason);
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

        if (isFunction(this.options.onLoading?.callback)) {
            this.options.onLoading.callback();
        }
        this._performFetch(targetUrl);
    }

    load(url?: string) {
        if (this._isLoading) return;
        const targetUrl = url || this.options.url;
        if (!targetUrl) return;
        this._isLoading = true;
        return new Promise<void>((resolve, reject) => {
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
        this.loading?.remove();
    }
}
