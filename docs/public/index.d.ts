/**
 * Applies the given styles to a `shadowRoot`. When Shadow DOM is
 * available but `adoptedStyleSheets` is not, styles are appended to the
 * `shadowRoot` to [mimic the native feature](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/adoptedStyleSheets).
 * Note, when shimming is used, any styles that are subsequently placed into
 * the shadowRoot should be placed *before* any shimmed adopted styles. This
 * will match spec behavior that gives adopted sheets precedence over styles in
 * shadowRoot.
 */
export declare const adoptStyles: (renderRoot: ShadowRoot, styles: Array<CSSResultOrNative>) => void;

export declare function createTheme(options: ThemeOptions): string;

/**
 * A template literal tag which can be used with LitElement's
 * {@linkcode LitElement.styles} property to set element styles.
 *
 * For security reasons, only literal string values and number may be used in
 * embedded expressions. To incorporate non-literal values {@linkcode unsafeCSS}
 * may be used inside an expression.
 */
export declare const css: (strings: TemplateStringsArray, ...values: (CSSResultGroup | number)[]) => CSSResult;

/**
 * A container for a string of CSS text, that may be used to create a CSSStyleSheet.
 *
 * CSSResult is the return value of `css`-tagged template literals and
 * `unsafeCSS()`. In order to ensure that CSSResults are only created via the
 * `css` tag and `unsafeCSS()`, CSSResult cannot be constructed directly.
 */
export declare class CSSResult {
    ["_$cssResult$"]: boolean;
    readonly cssText: string;
    private _styleSheet?;
    private _strings;
    private constructor();
    get styleSheet(): CSSStyleSheet | undefined;
    toString(): string;
}

export declare type CSSResultArray = Array<CSSResultOrNative | CSSResultArray>;

/**
 * A single CSSResult, CSSStyleSheet, or an array or nested arrays of those.
 */
export declare type CSSResultGroup = CSSResultOrNative | CSSResultArray;

/**
 * A CSSResult or native CSSStyleSheet.
 *
 * In browsers that support constructible CSS style sheets, CSSStyleSheet
 * object can be used for styling along side CSSResult from the `css`
 * template tag.
 */
export declare type CSSResultOrNative = CSSResult | CSSStyleSheet;

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
    mode?: "replace" | "append" | "default";
    el?: HTMLElement;
}

/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
export declare const supportsAdoptingStyleSheets: boolean;

export declare type ThemeOptions = {
    selector?: string;
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
    /**
     * 主题样式注入选项
     */
    injectStyle?: InjectStylesheetOptions;
};

export declare class Themepro {
    root: HTMLElement;
    constructor();
    get size(): ThemeSize;
    set size(value: ThemeSize);
    get spacing(): ThemeSize;
    set spacing(value: ThemeSize | "auto");
    get radius(): string;
    set radius(value: string);
    get theme(): string;
    set theme(value: string);
    _onDomContentLoaded(): void;
    createVariant(variant: ThemeVariantType, options: GenerateGradientOptions): void;
    create(options: ThemeOptions): void;
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
