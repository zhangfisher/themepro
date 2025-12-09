import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { renderBorderRadiusStory } from './radius.story.ts'
import { renderShadowStory } from './shadow.story.ts'
import { renderFontStory } from './font.story.ts'
import { renderParagraphStory } from './paragraph.story.ts'

const meta: Meta = {
    title: '基础主题变量',
    component: '<div></div>',
}

export default meta
type Story = StoryObj

export const BorderRadius: Story = {
    name: '圆角',
    render: renderBorderRadiusStory,
}
export const Shadow: Story = {
    name: '阴影',
    render: renderShadowStory,
}
export const Font: Story = {
    name: '字体',
    render: renderFontStory,
}

export const Paragraph: Story = {
    name: '段落',
    render: renderParagraphStory,
}
