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

import type { AutoLoading, AutoLoadingProps } from "@/components/Loading";
import { removeUnescapedChars } from "./removeUnescapedChars";

export type HTMLLoaderOptions = {
    url?: string;
    /**
     * 用于搭建与加载逻辑相关联的元素
     */
    container?: HTMLElement;
    abortController?: AbortController;
    fallback?: string;
    onLoading?: Omit<AutoLoadingProps, "status"> & {
        close?: boolean; // 显示关闭按钮
        back?: boolean; // 显示回退按钮
    };
    onFail?: Omit<AutoLoadingProps, "status"> & {
        retry?: boolean; // 显示重试按钮
        close?: boolean; // 显示关闭按钮
        back?: boolean; // 显示回退按钮
        fallback?: string;
    };
    onSuccess?: (result: string) => Promise<string> | string;
    /**
     * 传递给fetch的参数
     */
    fetch?: RequestInit;
};

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
        const loadingAttrs = this.options.onLoading || {};
        Object.entries(loadingAttrs).forEach(([K, v]) => {
            loading.setAttribute(K, v);
        });

        if (this.options.abortController) {
            loading.addEventListener("action:click", (e: Event) => {});
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
            fetch(
                targetUrl,
                Object.assign(
                    {
                        signal: this.options.abortController?.signal,
                    },
                    this.options.fetch
                )
            )
                .then((response) => {
                    const getResult =
                        this.options.format === "json"
                            ? response.json()
                            : response.text();
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
