/**
 *
 * 使用Ant Design的颜色生成算法，生成主题梯度颜色
 *
 */
import type { ColorInput } from '@ant-design/fast-color'
import { FastColor } from '@ant-design/fast-color'

const hueStep = 2 // 色相阶梯
const saturationStep1 = 0.16 // 饱和度阶梯，浅色部分
const saturationStep2 = 0.05 // 饱和度阶梯，深色部分
const brightnessStep1 = 0.05 // 亮度阶梯，浅色部分
const brightnessStep2 = 0.15 // 亮度阶梯，深色部分
const lightColorCount = 5 // 浅色数量，主色上
const darkColorCount = 4 // 深色数量，主色下

// 暗色主题颜色映射关系表
const darkColorMap = [
    { index: 7, amount: 15 },
    { index: 6, amount: 25 },
    { index: 5, amount: 30 },
    { index: 5, amount: 45 },
    { index: 5, amount: 65 },
    { index: 5, amount: 85 },
    { index: 4, amount: 90 },
    { index: 3, amount: 95 },
    { index: 2, amount: 97 },
    { index: 1, amount: 98 },
]

interface HsvObject {
    h: number
    s: number
    v: number
}

function getHue(hsv: HsvObject, i: number, light?: boolean, options: GenerateGradientOptions = {}): number {
    let hue: number
    const step = options.hueStep || hueStep
    // 根据色相不同，色相转向不同
    if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
        hue = light ? Math.round(hsv.h) - step * i : Math.round(hsv.h) + step * i
    } else {
        hue = light ? Math.round(hsv.h) + step * i : Math.round(hsv.h) - step * i
    }
    if (hue < 0) {
        hue += 360
    } else if (hue >= 360) {
        hue -= 360
    }
    return hue
}

function getSaturation(hsv: HsvObject, i: number, light?: boolean, options: GenerateGradientOptions = {}): number {
    // grey color don't change saturation
    if (hsv.h === 0 && hsv.s === 0) {
        return hsv.s
    }
    let saturation: number

    if (light) {
        saturation = hsv.s - (options.saturationStep1 || saturationStep1) * i
    } else if (i === darkColorCount) {
        saturation = hsv.s + (options.saturationStep1 || saturationStep1)
    } else {
        saturation = hsv.s + (options.saturationStep2 || saturationStep2) * i
    }
    // 边界值修正
    if (saturation > 1) {
        saturation = 1
    }
    // 第一格的 s 限制在 0.06-0.1 之间
    if (light && i === (options.lightColorCount || lightColorCount) && saturation > 0.1) {
        saturation = 0.1
    }
    if (saturation < 0.06) {
        saturation = 0.06
    }
    return Math.round(saturation * 100) / 100
}

function getValue(hsv: HsvObject, i: number, light?: boolean, options: GenerateGradientOptions = {}): number {
    let value: number
    if (light) {
        value = hsv.v + (options.brightnessStep1 || brightnessStep1) * i
    } else {
        value = hsv.v - (options.brightnessStep2 || brightnessStep2) * i
    }
    // Clamp value between 0 and 1
    value = Math.max(0, Math.min(1, value))
    return Math.round(value * 100) / 100
}

export type GenerateGradientOptions = {
    theme?: 'dark' | 'default'
    backgroundColor?: string
    hueStep?: number // 色相阶梯
    lightColorCount?: number //5 // 浅色数量，主色上
    saturationStep1?: number //0.16 // 饱和度阶梯，浅色部分
    brightnessStep1?: number //0.05 // 亮度阶梯，浅色部分
    darkColorCount?: number //4 // 深色数量，主色下
    brightnessStep2?: number //0.15 // 亮度阶梯，深色部分
    saturationStep2?: number //0.05 // 饱和度阶梯，深色部分
}

export function generateThemeGradientColors(color: ColorInput, options: GenerateGradientOptions = {}): string[] {
    const patterns: FastColor[] = []
    const pColor = new FastColor(color)
    const hsv = pColor.toHsv()
    const lightCount = options.lightColorCount || lightColorCount
    for (let i = lightCount; i > 0; i -= 1) {
        const c = new FastColor({
            h: getHue(hsv, i, true, options),
            s: getSaturation(hsv, i, true, options),
            v: getValue(hsv, i, true, options),
        })
        patterns.push(c)
    }
    patterns.push(pColor)
    const darkCount = options.darkColorCount || darkColorCount
    for (let i = 1; i <= darkCount; i += 1) {
        const c = new FastColor({
            h: getHue(hsv, i),
            s: getSaturation(hsv, i),
            v: getValue(hsv, i),
        })
        patterns.push(c)
    }

    // dark theme patterns
    if (options.theme === 'dark') {
        return darkColorMap.map(({ index, amount }) =>
            new FastColor(options.backgroundColor || '#141414').mix(patterns[index], amount).toHexString(),
        )
    }

    return patterns.map((c) => c.toHexString())
}
export function generateGradientColors(color: string): string[] {
    const patterns: FastColor[] = []
    const pColor = new FastColor(color)
    const hsv = pColor.toHsv()

    const isDark = pColor.isDark()
    if (isDark) {
        for (let i = 10; i > 0; i -= 1) {
            const c = new FastColor({
                h: getHue(hsv, i, true),
                s: getSaturation(hsv, i, true),
                v: getValue(hsv, i, true),
            })
            patterns.push(c)
        }
    } else {
        for (let i = 0; i < 10; i++) {
            const c = new FastColor({
                h: getHue(hsv, i, true),
                s: getSaturation(hsv, i, true),
                v: getValue(hsv, i, true),
            })
            patterns.push(c)
        }
    }

    return patterns.map((c) => c.toHexString())
}
