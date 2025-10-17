import type { Preview } from '@storybook/web-components-vite'
import '../../core/src/styles/index.less'
import '../../core/src/index.ts'

const preview: Preview = {
    parameters: {
        docs: {
            toc: true, // 👈 Enables the table of contents
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
}

export default preview
