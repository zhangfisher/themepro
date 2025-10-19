/* eslint-disable no-alert */
/* eslint-disable no-console */
const React = require('react')
const { addons, types } = require('@storybook/manager-api')
const { IconButton, Icons } = require('@storybook/components')

const ADDON_ID = 'preview-doc-grabber'
const TOOL_ID = `${ADDON_ID}/tool`

addons.register(ADDON_ID, () => {
    addons.add(TOOL_ID, {
        type: types.TOOL,
        title: '获取预览区 document',
        match: ({ viewMode }) => !!viewMode,
        render: () => {
            const onClick = () => {
                try {
                    const iframe = document.getElementById('storybook-preview-iframe')
                    const doc = iframe?.contentWindow?.document
                    if (doc) {
                        // 暴露给全局，便于调试与二次使用
                        window.__SB_PREVIEW_DOC__ = doc
                        window.__SB_PREVIEW_WINDOW__ = iframe.contentWindow.ThemePro
                        console.log(
                            '[preview-doc-grabber] 已获取预览区 document，并暴露为 window.__SB_PREVIEW_DOC__',
                            doc,
                        )
                    } else {
                        console.error('未找到预览区 iframe 或无法访问其 document')
                    }
                } catch (err) {
                    console.error('[preview-doc-grabber] 获取预览区 document 失败', err)
                }
            }
            return React.createElement(IconButton, { key: TOOL_ID, title: '获取预览区 document', onClick }, 'DOC')
        },
    })
})
