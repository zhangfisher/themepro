export type GenerateGradientOptions = {
    color: string;
    range?: [number, number];
    dark?: boolean;
    count?: number;
};
export declare function generateGradientColors(options?: GenerateGradientOptions): {
    colors: string[];
    dark: boolean;
};
