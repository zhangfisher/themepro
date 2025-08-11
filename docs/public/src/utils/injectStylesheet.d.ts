export interface InjectStylesheetOptions {
    location?: "head" | "body";
    id?: string;
    mode?: "replace" | "append" | 'default';
    el?: HTMLElement;
}
export declare function injectStylesheet(css: string, options?: InjectStylesheetOptions): string | HTMLStyleElement | undefined;
