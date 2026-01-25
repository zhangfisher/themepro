import type { ThemeSize } from '../types'

function getSizeVars(size: ThemeSize) {
    return {
        /** 段落与字体 */
        '--auto-font-size': `var(--k-font-size-${size})`,
        '--auto-font-weight': `var(--k-font-weight-${size})`,
        '--auto-letter-spacing': `var(--k-letter-spacing-${size})`,
        '--auto-line-height': `var(--k-line-height-${size})`,
        /* 用于内边距和外边距 */
        '--auto-spacing': `var(--k-spacing-${size})`,
        '--auto-padding': `var(--k-spacing-${size})`,
        '--auto-margin': `var(--k-spacing-${size})`,

        '--auto-shadow': `var(--k-shadow-${size})`,
        '--auto-icon-size': `calc(1.5 * var(--k-font-size-${size}))`,
        /* 输入框 */
        '--auto-input-height': `var(--k-input-height-${size})`,
    }
}

export const sizeVars = {
    'x-small': getSizeVars('x-small'),
    small: getSizeVars('small'),
    medium: getSizeVars('medium'),
    large: getSizeVars('large'),
    'x-large': getSizeVars('x-large'),
}
