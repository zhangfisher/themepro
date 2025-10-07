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
    selector?: string
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
