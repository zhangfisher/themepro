/**
 *
 *  从远程URL加载HTML到一个元素中
 *
 *
 * const loader = new HTMLLoader({
 *    attach,
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

import type { AutoLoading, AutoLoadingProps } from "@/components/Loading";
import { removeUnescapedChars } from "./removeUnescapedChars";

export type HTMLLoaderOptions = {
    url?: string;
    /**
     * 用于搭建与加载逻辑相关联的元素
     *
     * - 当开始fetch时在在 attach显示加载中AutoLoading
     * - 当fetch完成时在attach移除加载中AutoLoading
     * - 当fetch错时，显示错误信息
     */
    container?: HTMLElement;
    abortController?: AbortController;
    format?: "json" | "text";
    loading?: AutoLoadingProps;
} & RequestInit;

export class HTMLLoader<T> {
    private _resolve?: (value: T) => void;
    private _reject?: (reason?: any) => void;
    private _loading?: AutoLoading;
    context?: HTMLElement;
    options: HTMLLoaderOptions;

    constructor(options?: HTMLLoaderOptions) {
        this.options = Object.assign(
            {
                format: "html",
            },
            options
        );
        if (this.options.container instanceof HTMLElement) {
            this.context = this.options.container;
        }
    }
    private _createLoading() {
        if (!this.options.container) return;
        const loading = document.createElement("auto-loading");
        const loadingAttrs = this.options.loading || {};
        Object.entries(loadingAttrs).forEach(([K, v]) => {
            loading.setAttribute(K, v);
        });

        if (this.options.abortController) {
            loading.addEventListener("action:click", (e: Event) => {
                const id = e;
            });
        }
        this.options.container.appendChild(loading);

        this._loading = loading;
    }

    private _onLoadError(e: any) {
        if (this._loading) {
            this._loading.status = "error";
            this._loading.message = e instanceof Error ? e.message : String(e);
            this._loading.description =
                e instanceof Error ? e.stack : String(e);
        }
    }
    private _onLoadSuccess(result: any) {
        this._loading?.remove();
        if (typeof result === "string") {
            if (this.options.container instanceof HTMLElement) {
                this.options.container.innerHTML = removeUnescapedChars(result);
            }
        } else if (typeof result === "object") {
        }
    }
    load(url?: string) {
        const targetUrl = url || this.options.url;
        if (!targetUrl) return;
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
            this._createLoading();
            fetch(targetUrl, {
                signal: this.options.abortController?.signal,
            })
                .then((value) => {
                    const getResult =
                        this.options.format === "json"
                            ? value.json()
                            : value.text();
                    getResult
                        .then((r) => {
                            this._onLoadSuccess(r);
                            this._resolve!(r as T);
                        })
                        .catch((e) => {
                            this._onLoadError(e);
                            this._reject!(e);
                        });
                })
                .catch((reason) => {
                    this._onLoadError(reason);
                    this._reject!(reason);
                });
        });
    }
    abort() {
        this.options.abortController?.abort();
        this._loading?.remove();
    }
    destory() {}
}
