/* eslint-disable no-alert */
/* eslint-disable no-console */
const React = require('react')
const { addons, types } = require('@storybook/manager-api')

const ADDON_ID = 'themepro-tools'

function getThemePro() {
    try {
        const iframe = document.getElementById('storybook-preview-iframe')
        return iframe.contentWindow.ThemePro
    } catch (err) {
        console.error('获取预览区ThemePro失败', err)
    }
}

const presets = {
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
    purple: {
        color: '#722ed1',
        title: '酱紫',
    },
    magenta: {
        color: '#eb2f96',
        title: '法式洋红',
    },
}

function createThemeColorButton(color) {
    const toolId = `themepro/${color.title}`
    return [
        toolId,
        {
            type: types.TOOL,
            title: color.title,
            match: ({ viewMode }) => !!viewMode,
            render: () => {
                return React.createElement('div', {
                    key: toolId,
                    title: color.title,
                    onClick: () => {
                        const themepro = getThemePro()
                        themepro.themeColor = color.color
                    },
                    style: {
                        width: '1.2em',
                        height: '1.2em',
                        background: color.color,
                        borderRadius: '50%',
                        cursor: 'pointer',
                    },
                })
            },
        },
    ]
}
function createThemeCheckbox(name) {
    const toolId = `themepro/${name}`
    return [
        toolId,
        {
            type: types.TOOL,
            title: name,
            match: ({ viewMode }) => !!viewMode,
            render: () => {
                return React.createElement(
                    'div',
                    {
                        key: toolId,
                        title: name,
                        onClick: () => {
                            const themepro = getThemePro()
                            themepro[name] = !themepro[name]
                        },
                        style: {
                            width: 'auto',
                            height: '1.2em',
                            cursor: 'pointer',
                            padding: '0 4px',
                        },
                    },
                    name,
                )
            },
        },
    ]
}

addons.register(ADDON_ID, () => {
    const colorButtons = Object.values(presets).map(createThemeColorButton)
    colorButtons.forEach((addon) => {
        addons.add(...addon)
    })
    addons.add(...createThemeCheckbox('colorized'))
    addons.add(...createThemeCheckbox('dark'))
})
