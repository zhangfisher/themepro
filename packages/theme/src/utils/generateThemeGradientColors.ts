import { createPrimaryPalette } from '@yosulramp/material-color-palette-js'
import { FastColor } from '@ant-design/fast-color'

export function generateThemeGradientColors(color: string) {
    const fColor = new FastColor(color)
    const customPrimaryPalette = createPrimaryPalette(fColor.toHexString().replace('#', ''))
    return customPrimaryPalette!.map((rgbColor) => `#${rgbColor.rgbHex}`)
}
