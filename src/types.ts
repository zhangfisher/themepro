import type { GenerateGradientOptions } from "./utils/generateGradientColors";

export type ThemeSize = "x-small" | "small" | "medium" | "large" | "x-large";
export type ThemeRadius = "none" | ThemeSize;
export type ThemeVariantType =
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info";

export type ThemeVariantOptions = {
    // 主题色，一般应该选择一个中间色调的值
    color: string;
    // 是否为深色系主题，如果没有指定则根据主题基础颜色color来判断
    dark?: boolean;
    //指定主题梯度颜色的范围，取值0-100
    range?: [number, number];
    // 指定主题背景梯度颜色，默认取值: [10,1,2,3,4,5]
    levels?: number[];
};

export type ThemeproMeta = {
    // 指定使用ThemePro生效的的选择器，多个选择器使用,分隔,默认值是body
    selector: string;
};

export type ThemeOptions = {
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
    // 启用紧凑时的计算因子，默认是1，主要作用于spaces,padding,margin
    sparse?: number;
    /**
     * 基于基准颜色生成梯度颜色
     * @param baseColor
     * @returns
     */
    onGenerateGradientColors?: (options: GenerateGradientOptions) => string[];
};
