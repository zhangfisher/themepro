import type { Preview } from '@storybook/web-components-vite'
import '../src/styles/index.less'
import '../src/components/index.less'
import '../src/index'
import './styles.css'

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
