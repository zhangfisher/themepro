export type ThemeSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
export type ThemeRadius = 'none' | ThemeSize
export type ThemeVariantType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type ThemeOptions = {
    id?: string
    /**
     * 主题颜色
     */
    themeColor: string
    /**
     * 深色模式
     */
    dark?: boolean
    /**
     * 主题背景颜色
     */
    themeBgcolor?: string
    /**
     * 多彩模式
     */
    colorized?: boolean
    /**
     * 大小
     */
    size?: ThemeSize
    /**
     * 间距
     * 包括内外间距，行高等，用于调节界面的整体稀疏度
     */
    spacing?: ThemeSize
    /**
     * 面板按钮等的阴影大小
     */
    shadow?: ThemeSize
    /**
     * 是否创建共享的公共变量
     *
     * false: 则不创建，只会创建主题颜色变量和语义变量
     *
     * 当ThemeScope作用于某个独立的元素时，应该设为false，以共享公共主题变量
     *
     */
    share?: boolean
    selectors?: string[]
    /**
     * 圆角大小
     */
    radius?: ThemeSize
    /**
     * 边框大小
     * @default 1px
     */
    border?: string
    /**
     * 语义颜色
     */
    primary?: string
    success?: string
    warning?: string
    danger?: string
    info?: string
}
