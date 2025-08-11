/**
 * 将 HSL 颜色转换为十六进制字符串
 * @param hsl [H, S, L]
 *   - H ∈ [0, 360]（色相）
 *   - S ∈ [0, 100]（饱和度 %）
 *   - L ∈ [0, 100]（亮度 %）
 * @returns 十六进制颜色字符串，例如 "#1298ab"
 */
export declare function hslToRgb(hsl: [number, number, number]): string;
