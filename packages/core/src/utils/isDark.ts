import { toRGB } from "./toRGB";

export function isDark(color: string): boolean {
	const rgb = toRGB(color);
	if (!rgb) return false; // 颜色解析失败时默认返回亮色

	// 标准的相对亮度公式
	const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
	return luminance < 128;
}
