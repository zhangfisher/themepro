import type { ThemeOptions } from '../types'
import { generateThemeGradientColors } from '../algorithms/material'

export type ThemeVariantOptions = {
    prefix: string
    reverse?: boolean
}
export function generateThemeGradientColorVars(color: string, options?: ThemeVariantOptions) {
    const { prefix, reverse = false } = Object.assign({}, options) as ThemeVariantOptions

    const colors = generateThemeGradientColors(color)
    //    if (isDark(color)) colors.reverse()
    if (reverse) colors.reverse()
    const vars: Record<string, string> = {}
    colors.reduce((all, cur, i) => {
        vars[`${prefix}${i}`] = cur
        return all
    }, {}) as Required<ThemeOptions>
    return vars
}
