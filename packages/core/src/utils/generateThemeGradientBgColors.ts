import { generateThemeGradientColors } from './generateThemeGradientColors'
import { FastColor } from '@ant-design/fast-color'

export function generateThemeGradientBgColors(color: string): string[] {
    const colors = generateThemeGradientColors(color)
    const pcolor = new FastColor(color)
    const lightColor = pcolor.lighten(20)
    if (pcolor.isDark()) {
        //colors.reverse()
    }
    return colors
}
