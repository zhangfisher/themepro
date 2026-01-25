import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

const meta: Meta = {
    title: '自动主题变量',
    component: '<div></div>',
}

export default meta
type Story = StoryObj

export const BorderRadius: Story = {
    name: '圆角',
    render: () => {
        return html``
    },
}
