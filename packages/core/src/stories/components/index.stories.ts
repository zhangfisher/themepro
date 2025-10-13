import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { renderCardStory } from './card.story.ts'
import { renderButtonStory } from './button.story.ts'
import { renderIconStory } from './icon.story.ts'
import { renderAlertStory } from './alert.story.ts'

const meta: Meta = {
    title: '组件',
    component: '<div></div>',
}

export default meta
type Story = StoryObj
export const IocnRadius: Story = {
    name: '图标 Icon',
    render: renderIconStory,
}

export const ButtonRadius: Story = {
    name: '按钮 Button',
    render: renderButtonStory,
}

export const CardRadius: Story = {
    name: '卡片 Card',
    render: renderCardStory,
}

export const AlertStory: Story = {
    name: '提示 Alert',
    render: renderAlertStory,
}
