declare class C {
    root: HTMLElement;
    set size(t: string);
    get size(): string;
    set spacing(t: string);
    get spacing(): string;
    set radius(t: string);
    get radius(): string;
    set theme(t: string);
    get theme(): string;
    _onDomContentLoaded(): void;
    createVariant(t: any, r: any): void;
    createTheme(t: any): void;
}
declare function j(o: any): void;
declare function u(o: any, t: any): {
    vars: {};
    colors: any[];
    dark: any;
};
declare function T(o: any): {
    colors: any[];
    dark: any;
};
declare function f(o?: number): string;
declare function p(o: any, t: any): any;
declare const O: C;
export { C as Themepro, j as createTheme, u as createVariantVars, T as generateGradientColors, f as getId, p as injectStylesheet, O as themePro };
