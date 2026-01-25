export type ThemeSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
export type ThemeRadius = 'none' | ThemeSize
export type ThemeVariantType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type ThemeOptions = {
    id: string
    /**
     * 用于生成主题样式的CSS选择器
     *
     * 如果没有提供，则默认为`[data-theme-scope='${id}']`
     *
     */
    cssSelector?: string[]
    /**
     * 主题颜色
     */
    themeColor?: string
    /**
     * 深色模式
     */
    dark?: boolean
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
    /**
     * 实例化时自动将样式注入文档中，即docRoot
     */
    autoConnect?: boolean
    /**
     *
     *
     * 当=true时会自动查找所有具有data-theme-scope=`${this.id}`的元素
     *
     */
    autoAttach?: boolean
    /**
     * 应用范围
     * 提供DOM选择器，将当前ThemeScope应用于到elements所在的元素
     */
    elements?: string[]
    /**
     * 文档根元素
     *
     * 默认是document.documentElement
     *
     * 当在WebComponent使用时，应设置为WebComponent的根元素,即shadowRoot
     *
     */
    docRoot?: HTMLElement
}

export type DynamicThemeOptions = Pick<
    ThemeOptions,
    'themeColor' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
>
