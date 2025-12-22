/**
 *
 * 从远程URL加载数据
 *
 * const loader = new RemoteLoader({
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
 * <div>
 * <auto-loading fetch="/aaaaa">
 * </auto-loading>
 * </div>
 *
 */

import type { AutoButton } from "@/components/Button";

export type RemoteLoaderOptions = {
    /**
     * 用于搭建与加载逻辑相关联的元素
     *
     * - 当开始fetch时在在 attach显示加载中AutoLoading
     * - 当fetch完成时在attach移除加载中AutoLoading
     * - 当fetch错时，显示错误信息
     *
     */
    attach?: HTMLElement;
    url?: string;
    abortController?: AbortController;
    format?: "json" | "text";
    errors?: Record<string, string>;
    // 显示动作AutoLoading
    actions?: AutoButton[];
} & RequestInit;

export class RemoteLoader<T> {
    private _resolve?: (value: T) => void;
    private _reject?: (reason?: any) => void;
    options: RemoteLoaderOptions;
    constructor(options?: RemoteLoaderOptions) {
        this.options = Object.assign(
            {
                format: "json",
                errors: this._getErrors(),
            },
            options
        );
    }
    private _getErrors() {
        return {
            404: `<div class="error"></div>`,
            500: `<div class="error"></div>`,
        };
    }
    load(url: string) {
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
            fetch(url, {
                signal: this.options.abortController?.signal,
            })
                .then((value) => {
                    const getResult =
                        this.options.format === "json"
                            ? value.json()
                            : value.text();
                    getResult
                        .then((r) => {
                            this._resolve!(r as T);
                        })
                        .catch((e) => {
                            this._reject!(e);
                        });
                })
                .catch((reason) => {
                    this._reject!(reason);
                });
        });
    }
    abort() {
        this.options.abortController?.abort();
    }
}
