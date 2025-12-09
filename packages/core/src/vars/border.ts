function getBorderVars(size: number) {
    return {
        /** 段落与字体 */
        '--auto-border-color': `var(--t-theme-color-${size})`,
    }
}

export const borderVars = {
    '0': getBorderVars(0),
    '1': getBorderVars(1),
    '2': getBorderVars(1),
    '3': getBorderVars(1),
    '4': getBorderVars(3),
    '5': getBorderVars(3),
    '6': getBorderVars(3),
    '7': getBorderVars(3),
    '8': getBorderVars(3),
    '9': getBorderVars(3),
}
