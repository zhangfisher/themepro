import type { Preview } from '@storybook/web-components-vite'
import '../../core/src/styles/index.less'
import '../../core/src/index.ts'
import '../src/styles/icons.less'
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
    decorators: [],
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            toolbar: {
                // The label to show for this toolbar item
                title: 'Theme',
                icon: 'circlehollow',
                // Array of plain string values or MenuItem shape (see below)
                items: ['light', 'dark'],
                // Change title based on selected value
                dynamicTitle: true,
            },
        },
    },
}

export default preview
