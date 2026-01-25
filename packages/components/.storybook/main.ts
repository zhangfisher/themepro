import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-docs', './addons/kylinbits-tools'],
    framework: {
        name: '@storybook/web-components-vite',
        options: {},
    },
    viteFinal: async (config) => {
        const path = await import('path')
        config.resolve = config.resolve || {}
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '@': path.resolve(__dirname, '../src'),
        }
        return config
    },
}
export default config
