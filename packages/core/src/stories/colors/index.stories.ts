import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { renderThemeStory } from './theme.story'
import { renderSemanticsColorStory } from './semantics.story'
const meta: Meta = {
    title: '主题颜色',
}

export default meta
type Story = StoryObj

export const ThemeColorPalette: Story = {
    name: '主题调色板',
    render: renderThemeStory,
}
export const SemanticsColors: Story = {
    name: '语义颜色',
    render: renderSemanticsColorStory,
}
