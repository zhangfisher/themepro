import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { renderThemeStory } from './theme.story'
import { renderSemanticsColorStory } from './semantics.story'
import { renderThemeScopeStory } from './theme.scope.story'
import { renderFormStory } from './form.story'
import { renderAutoColorStory } from './theme.autocolor.story'

const meta: Meta = {
    title: '主题颜色',
}

export default meta
type Story = StoryObj

export const ThemeColorPalette: Story = {
    name: '主题调色板',
    render: renderThemeStory,
}
export const AutoColorPalette: Story = {
    name: '自动颜色变量',
    render: renderAutoColorStory,
}

export const SemanticsColors: Story = {
    name: '语义颜色',
    render: renderSemanticsColorStory,
}
export const scopeThemeColors: Story = {
    name: '局部主题',
    render: renderThemeScopeStory,
}
export const formColors: Story = {
    name: '表单',
    render: renderFormStory,
}
