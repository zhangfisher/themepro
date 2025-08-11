import { ThemeOptions, ThemeVariantOptions } from '../types';
export declare function createVariantVars(prefix: string, options: string | ThemeVariantOptions): {
    vars: Record<string, string>;
    colors: string[];
    dark: boolean;
};
export declare function createTheme(options: ThemeOptions): void;
