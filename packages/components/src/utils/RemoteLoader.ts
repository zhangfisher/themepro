/**
 *
 * 从远程URL加载数据
 *
 *
 * const loader = new RemoteLoader(options)
 *
 * loader.load(url).then((v)=>{
 *
 * }).catch(()=>{
 *
 * })
 * loader.abort()
 *
 */

export type RemoteLoaderOptions = {
    url?: string;
    abortController?: AbortController;
    format?: "json" | "text";
} & RequestInit;

export class RemoteLoader<T> {
    private _resolve?: (value: T) => void;
    private _reject?: (reason?: any) => void;
    options: RemoteLoaderOptions;
    constructor(options?: RemoteLoaderOptions) {
        this.options = Object.assign(
            {
                format: "json",
            },
            options
        );
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
