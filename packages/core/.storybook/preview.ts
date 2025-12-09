import type { Preview } from '@storybook/web-components-vite'
import Picker from 'vanilla-picker'
import 'vanilla-picker/dist/vanilla-picker.csp.css'
import '../src/styles/index.less'
import '../src/components/index.less'
import '../src/index'
import './styles.css'
import './_components'

// @ts-expect-error
global.Picker = Picker

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
