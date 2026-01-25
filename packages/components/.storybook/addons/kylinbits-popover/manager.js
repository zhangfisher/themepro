/* eslint-disable no-console */
const React = require('react')
const { addons, types } = require('@storybook/manager-api')
const ADDON_ID = 'preview-popover-tool'
const TOOL_ID = `${ADDON_ID}/tool`
function getThemePro() {
    try {
        const iframe = document.getElementById('storybook-preview-iframe')
        return iframe.contentWindow.ThemePro
    } catch (err) {
        console.error('获取预览区ThemePro失败', err)
    }
}

function createCheckbox(label, value, listener) {
    const labelEl = document.createElement('label')
    labelEl.textContent = label
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = value
    input.addEventListener('change', listener)
    labelEl.prepend(input)
    labelEl.style.padding = '0.5em'
    labelEl.style.cursor = 'pointer'
    return labelEl
}

function renderThemeProSettings() {
    const kylinbits = getThemePro()
    const settings = document.createElement('div')
    settings.classList.add('kylinbits-settings')
    settings.style.display = 'flex'
    settings.style.flexDirection = 'column'
    settings.style.gap = '4px'

    const presetColorSelector = document.createElement('div')
    presetColorSelector.classList.add('preset-colors')
    presetColorSelector.style.display = 'flex'
    presetColorSelector.style.flexWrap = 'wrap'
    presetColorSelector.style.gap = '4px'

    const colors = Object.values(kylinbits.presets).map((p) => {
        const color = document.createElement('div')
        color.classList.add('color')
        color.style.background = p.color
        color.style.width = '48px'
        color.style.height = '48px'
        color.style.color = 'white'
        color.style.borderRadius = '4px'
        color.style.display = 'flex'
        color.style.justifyContent = 'center'
        color.style.alignItems = 'center'
        color.style.fontSize = '0.8em'
        color.style.cursor = 'pointer'
        color.textContent = p.title
        return color
    })

    presetColorSelector.append(...colors)
    presetColorSelector.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('color')) {
            const color = evt.target.style.background
            kylinbits.themeColor = color
        }
        evt.stopPropagation()
    })

    settings.appendChild(presetColorSelector)

    const darkCheckbox = createCheckbox('暗色模式', kylinbits.dark, (e) => {
        kylinbits.dark = e.target.checked
    })
    settings.appendChild(darkCheckbox)
    const colorizedCheckbox = createCheckbox('多彩模式', kylinbits.colorized, (e) => {
        kylinbits.colorized = e.target.checked
    })
    settings.appendChild(colorizedCheckbox)

    return settings
}

addons.register(ADDON_ID, () => {
    addons.add(TOOL_ID, {
        type: types.TOOL,
        title: '弹出层示例',
        match: ({ viewMode }) => !!viewMode,
        render: () => {
            return React.createElement(
                'button',
                {
                    key: TOOL_ID,
                    title: '打开弹出层',
                    onClick: (e) => {
                        try {
                            e.preventDefault()
                            e.stopPropagation()
                            const BTN = e.currentTarget
                            let panel = document.getElementById('preview-popover-tool-panel')
                            if (!panel) {
                                panel = document.createElement('div')
                                panel.id = 'preview-popover-tool-panel'
                                panel.style.position = 'absolute'
                                panel.style.zIndex = '2147483646'
                                panel.style.padding = '12px'
                                panel.style.minWidth = '160px'
                                panel.style.width = '388px'
                                panel.style.justifyContent = 'center'
                                panel.style.alignItems = 'center'
                                panel.style.background = 'var(--color-background, #fff)'
                                panel.style.color = 'var(--color-text, #222)'
                                panel.style.border = '1px solid rgba(0,0,0,0.08)'
                                panel.style.borderRadius = '6px'
                                panel.style.boxShadow = '0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)'
                                panel.appendChild(renderThemeProSettings())
                                panel.addEventListener('click', (evt) => evt.stopPropagation())
                                document.body.appendChild(panel)
                            }
                            const rect = BTN.getBoundingClientRect()
                            const top = rect.bottom + window.scrollY + 6
                            const left = rect.left + window.scrollX
                            panel.style.top = `${top}px`
                            panel.style.left = `${left}px`
                            const visible = panel.style.display !== 'none' && panel.style.display !== ''
                            if (visible) {
                                panel.style.display = 'none'
                                document.removeEventListener('click', window.__preview_popover_tool_hide__)
                                window.__preview_popover_tool_hide__ = null
                            } else {
                                panel.style.display = 'block'
                                window.__preview_popover_tool_hide__ = function () {
                                    if (panel) panel.style.display = 'none'
                                    document.removeEventListener('click', window.__preview_popover_tool_hide__)
                                    window.__preview_popover_tool_hide__ = null
                                }
                                setTimeout(
                                    () => document.addEventListener('click', window.__preview_popover_tool_hide__),
                                    0,
                                )
                            }
                        } catch (err) {
                            console.error('[preview-popover-tool] 打开弹出层失败', err)
                        }
                    },
                },
                React.createElement(
                    'span',
                    { style: { fontSize: 12, fontWeight: 700, lineHeight: '1' }, 'aria-hidden': true },
                    '≡',
                ),
            )
        },
    })
})
