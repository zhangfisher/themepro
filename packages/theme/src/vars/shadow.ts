import type { ThemeSize } from '@/types'

function getShadowVars(size: ThemeSize) {
    return {
        '--auto-shadow': `var(--k-shadow-${size})!important`,
    }
}

export const shadowVars = {
    'x-small': getShadowVars('x-small'),
    small: getShadowVars('small'),
    medium: getShadowVars('medium'),
    large: getShadowVars('large'),
    'x-large': getShadowVars('x-large'),
}
