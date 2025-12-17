/**
 *
 * 从远程URL加载数据
 *
 *
 * const loader = new RemoteLoader(options)
 *
 *
 *
 * loader.then((v)=>{
 *
 * })
 * loader.cancel()
 *
 * loader.load(url)
 *
 *
 * loader.then('load',(v)=>{
 *
 * })
 *
 */

export type RemoteLoaderOptions = {
    url?: string;
    abortController?: AbortController;
    format?: "json" | "text";
};
export class RemoteLoader<T> {
    private _promise?: Promise<T>;
    private _resolve?: (value: T) => void;
    private _reject?: (reason?: any) => void;
    options: RemoteLoaderOptions;
    constructor(options?: RemoteLoaderOptions) {
        this.options = Object.assign({}, options);
    }
    load(url: string) {
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
            fetch(url, {
                signal: this.options.abortController?.signal,
            })
                .then((value) => {
                    value.json();
                    value.text();
                    this._resolve!(value as T);
                })
                .catch((reason) => {
                    this._reject!(reason);
                });
        });
    }
    then() {
        return this._promise?.then;
    }
    abort() {
        this.options.abortController?.abort();
    }
}
