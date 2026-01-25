export type PresetTheme = {
    color: string
    title?: string
    primary?: string
    success?: string
    warning?: string
    danger?: string
    info?: string
}

export const presetThemes: Record<string, PresetTheme> = {
    light: {
        color: '#c6c6c6',
        title: '默认',
    },
    dark: {
        color: '#030303',
        title: '暗黑',
    },
    red: {
        color: '#f5222d',
        title: '薄暮',
    },
    volcano: {
        color: '#fa541c',
        title: '火山',
    },
    orange: {
        color: '#fa8c16',
        title: '日暮',
    },
    lime: {
        color: '#a0d911',
        title: '青柠',
    },
    gold: {
        color: '#faad14',
        title: '金盏花',
    },
    yellow: {
        color: '#fadb14',
        title: '日出',
    },
    green: {
        color: '#52c41a',
        title: '极光绿',
    },
    cyan: {
        color: '#13c2c2',
        title: '明青',
    },
    blue: {
        color: '#1677ff',
        title: '拂晓蓝',
    },
    geekblue: {
        color: '#2f54eb',
        title: '极客蓝',
    },
    techblue: {
        color: '#3fb3ff',
        title: '科技蓝',
    },
    purple: {
        color: '#722ed1',
        title: '酱紫',
    },
    magenta: {
        color: '#eb2f96',
        title: '法式洋红',
    },
}
