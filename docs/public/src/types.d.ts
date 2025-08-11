import { GenerateGradientOptions } from './utils/generateGradientColors';
export type ThemeSize = "x-small" | "small" | "medium" | "large" | "x-large";
export type ThemeRadius = "none" | ThemeSize;
export type ThemeVariantType = "primary" | "success" | "warning" | "danger" | "info";
export type ThemeVariantOptions = {
    color: string;
    dark?: boolean;
    range?: [number, number];
    levels?: number[];
};
export type ThemeproMeta = {
    selector: string;
};
export type ThemeOptions = {
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
