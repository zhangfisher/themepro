export declare function createTheme(options: ThemeOptions): void;

export declare function generateGradientColors(options?: GenerateGradientOptions): {
    colors: string[];
    dark: boolean;
};

export declare type GenerateGradientOptions = {
    color: string;
    range?: [number, number];
    dark?: boolean;
    count?: number;
};

export declare function getId(len?: number): string;

export declare function injectStylesheet(css: string, options?: InjectStylesheetOptions): string | HTMLStyleElement | undefined;

export declare interface InjectStylesheetOptions {
    location?: "head" | "body";
    id?: string;
    mode?: "replace" | "append" | 'default';
    el?: HTMLElement;
}

export declare type ThemeOptions = {
    name?: string;
    theme: string | ThemeVariantOptions;
    size?: "x-small" | "small" | "medium" | "large" | "x-large";
    variants?: {
        primary?: string | ThemeVariantOptions | null;
        success?: string | ThemeVariantOptions | null;
        warning?: string | ThemeVariantOptions | null;
        danger?: string | ThemeVariantOptions | null;
        info?: string | ThemeVariantOptions | null;
    };
    radius?: string;
    sparse?: number;
    /**
     * 基于基准颜色生成梯度颜色
     * @param baseColor
     * @returns
     */
    onGenerateGradientColors?: (options: GenerateGradientOptions) => string[];
};

export declare class Themepro {
    root: HTMLElement;
    constructor();
    get size(): ThemeSize;
    set size(value: ThemeSize);
    get spacing(): ThemeSize | "auto";
    set spacing(value: ThemeSize | "auto");
    get radius(): string;
    set radius(value: string);
    get theme(): string;
    set theme(value: string);
    _onDomContentLoaded(): void;
    createVariant(variant: ThemeVariantType, options: GenerateGradientOptions): void;
    createTheme(options: ThemeOptions): void;
}

export declare const themePro: Themepro;

export declare type ThemeproMeta = {
    selector: string;
};

export declare type ThemeRadius = "none" | ThemeSize;

export declare type ThemeSize = "x-small" | "small" | "medium" | "large" | "x-large";

export declare type ThemeVariantOptions = {
    color: string;
    dark?: boolean;
    range?: [number, number];
    levels?: number[];
};

export declare type ThemeVariantType = "primary" | "success" | "warning" | "danger" | "info";

export { }


declare global {
    var ThemePro: typeof themePro;
}
