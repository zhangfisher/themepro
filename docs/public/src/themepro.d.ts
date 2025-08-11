import { ThemeOptions, ThemeSize, ThemeVariantType } from './types';
import { GenerateGradientOptions } from './utils/generateGradientColors';
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
declare global {
    var ThemePro: typeof themePro;
}
