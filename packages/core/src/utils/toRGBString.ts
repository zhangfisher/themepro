import { toRGB } from './toRGB'

export function toRGBString(color: string): string {
    const rgb = toRGB(color)
    if (!rgb) return color
    return `#${rgb[0].toString(16).padStart(2, '0')}${rgb[1].toString(16).padStart(2, '0')}${rgb[2].toString(16).padStart(2, '0')}`
}
