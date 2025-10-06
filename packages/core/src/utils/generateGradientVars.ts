import type { ThemeOptions } from '../types'
import { generateThemeGradientColors } from './generateThemeGradientColors'
import { isDark } from './isDark'

export type ThemeVariantOptions = {
    prefix: string
}
export function generateGradientVars(color: string, options?: ThemeVariantOptions) {
    const { prefix } = Object.assign({}, options) as ThemeVariantOptions

    const colors = generateThemeGradientColors(color)
    if (isDark(color)) colors.reverse()

    const vars: Record<string, string> = {}

    colors.reduce((all, cur, i) => {
        vars[`${prefix}${i}`] = cur
        return all
    }, {}) as Required<ThemeOptions>
    return vars
}

// console.log(JSON.stringify(generateGradientVars("red", { prefix: "--t-color-theme-" })));
