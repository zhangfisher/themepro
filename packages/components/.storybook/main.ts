import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-docs', './addons/themepro-tools'],
    framework: {
        name: '@storybook/web-components-vite',
        options: {},
    },
}
export default config
