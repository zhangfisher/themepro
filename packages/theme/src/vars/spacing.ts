import type { ThemeSize } from '@/types'

function getSpacingVars(spacing: ThemeSize) {
    return {
        '--auto-spacing': `var(--k-spacing-${spacing}) !important`,
        '--auto-padding': `var(--k-spacing-${spacing}) !important`,
        '--auto-margin': `var(--k-spacing-${spacing}) !important`,
    }
}

export const spacingVars = {
    'x-small': getSpacingVars('x-small'),
    small: getSpacingVars('small'),
    medium: getSpacingVars('medium'),
    large: getSpacingVars('large'),
    'x-large': getSpacingVars('x-large'),
}
