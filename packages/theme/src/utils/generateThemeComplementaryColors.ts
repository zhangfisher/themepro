import { createComplementaryPalette } from '@yosulramp/material-color-palette-js'
import { FastColor } from '@ant-design/fast-color'

export function generateThemeComplementaryColors(color: string) {
    const fColor = new FastColor(color)
    const palette = createComplementaryPalette(fColor.toHexString().replace('#', ''))
    return palette!.map((rgbColor) => `#${rgbColor.rgbHex}`)
}
