import { FastColor } from '@ant-design/fast-color'
import { generateThemeGradientColors } from './generateThemeGradientColors'
import { isDark } from './isDark'
/**
 * 限制数值在最小最大值之间
 */
function clamp(value: number, min: number = 0, max: number = 255): number {
    return Math.min(Math.max(value, min), max)
}
export type GenerateGradientColorsOptions = {
    count?: number
    steps?: number // 色相阶梯
}
/**
 * 生成浅色渐变颜色数组
 * @param {ColorInput} color - 基础颜色输入
 * @param {GenerateLightGradientColorsOptions} [options={count: 10}] - 生成选项，包含颜色数量等参数
 * @returns {string[]} 生成的浅色渐变颜色数组
 */
export function generateGradientColors(
    color: string,
    options: GenerateGradientColorsOptions = { steps: 10 },
): string[] {
    const rgbColor = new FastColor(color).toRgb()
    const steps = options.steps!
    const patterns: FastColor[] = []
    for (let i = 0; i < steps!; i++) {
        const factor = i * 2
        patterns.push(
            new FastColor({
                r: Math.round(clamp(rgbColor.r * factor)),
                g: Math.round(clamp(rgbColor.g * factor)),
                b: Math.round(clamp(rgbColor.b * factor)),
            }),
        )
    }

    return patterns.map((c) => c.toHexString())
}
