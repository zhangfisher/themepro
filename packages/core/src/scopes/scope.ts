/**
 *
 *
 *  区域主题
 *
 *
 *  const scope = ThemeManager.scope()
 *
 *
 *
 */
import { presetThemes } from '../presets'
import type { ThemeOptions } from '../types'
import { getId } from '../utils'
import { generateThemeGradientColorVars } from '../utils/generateGradientVars'
import { getVarsStyles } from '../utils/getVarsStyles'
import { injectStylesheet } from '../utils/injectStylesheet'
import { toVarStyles } from '../utils/toVarStyles'
import { baseVars, radiusVars, derivedVars, shadowVars, spacingVars, sizeVars } from '../vars'
import { mapCssSelector } from '../utils/mapSelector'

export class ThemeScope {
    options: Required<ThemeOptions>
    selectors: string[] = []
    stylesheets: string[] = [] //
    connected: boolean = false
    constructor(options?: ThemeOptions) {
        this.options = Object.assign(
            {
                id: getId(),
                themeColor: 'light',
                cssSelectors: [],
                size: 'medium',
                dark: false,
                colorized: false,
                radius: 'medium',
                spacing: 'medium',
                shadow: 'medium',
                border: '1px',
                primary: '#2f54eb',
                success: '#22c55e',
                warning: '#f59e0b',
                danger: '#ef4444',
                info: '#71717a',
            },
            options,
        ) as Required<ThemeOptions>
        if (this.options.cssSelectors.length === 0) {
            this.options.cssSelectors.push(`[data-theme-scope='${this.id}']`)
        }
        this.selectors = this.options.cssSelectors
        this.connect()
    }
    get id() {
        return this.options.id
    }
    /**
     * 生成主题颜色的CSS样式字符串
     * @returns {string} 包含主题颜色变量的CSS样式字符串，支持亮色和暗色模式
     */
    protected _generateThemeColorStyles() {
        const themeColor = this.options.themeColor
        return `${this.selectors}[data-theme='${themeColor}']{
            color-scheme: light;
            ${toVarStyles(this._createThemeColorVars(themeColor))};\n}
            ${this.selectors}[data-theme='${themeColor}'][dark]{
            color-scheme: dark;
            ${toVarStyles(this._createThemeColorVars(themeColor, true))};\n}`
    }

    protected _injectThemeColorStyles() {
        const css = this._generateThemeColorStyles()
        const styleId: string = `themepro-${this.id}-theme-colors`
        injectStylesheet(css, {
            id: styleId,
        })
        this._addStyleheetId(styleId)
        return css
    }
    /**
     * 获取默认主题的样式字符串
     * @returns {string} 包含CSS变量和颜色模式的主题样式字符串
     * @private
     */
    protected _generateDefaultThemeColorStyles(themeColor: string) {
        const lightSelector = mapCssSelector(this.selectors, { light: '' }, true)
        const darkSelector = mapCssSelector(this.selectors, { light: '', dark: '' })
        const darkSelector2 = mapCssSelector(this.selectors, { dark: '' })
        return `${darkSelector2},${darkSelector}{\ncolor-scheme: dark;\n${toVarStyles(this._createThemeColorVars(themeColor, true))}\n}\n
        ${lightSelector}{\ncolor-scheme: light;\n${toVarStyles(this._createThemeColorVars(themeColor))}\n}\n
        `
    }

    /**
     * 创建语义化颜色样式并注入到页面中
     * @param {boolean} [inject=true] - 是否立即将样式注入到页面
     * @returns {string|undefined} 生成的CSS样式字符串，如果未覆盖默认颜色则返回undefined
     * @private
     */
    protected _injectSemanticColorStyles() {
        const styleId = `themepro-${this.id}-semantics`
        const css = this._generateSemanticColorStyles()
        if (css) {
            injectStylesheet(css, {
                id: styleId,
            })
            this._addStyleheetId(styleId)
        }
        return css
    }
    /**
     * 创建语义化颜色样式并注入到页面中
     * @returns {string|undefined} 生成的CSS样式字符串，如果未覆盖默认颜色则返回undefined
     * @private
     */
    protected _generateSemanticColorStyles() {
        const vars: Record<string, string> = {
            '--t-color-primary': this.options.primary,
            '--t-color-success': this.options.success,
            '--t-color-warning': this.options.warning,
            '--t-color-danger': this.options.danger,
            '--t-color-info': this.options.info,
        }
        const isOverride = !!(
            this.options.primary ||
            this.options.success ||
            this.options.warning ||
            this.options.danger ||
            this.options.info
        )
        if (!isOverride) return
        return `${this.selectors}{\n${toVarStyles(vars)}}\n}\n`
    }
    /**
     * 生成主题颜色相关的CSS变量
     * @param {string} [color=this.themeColor] - 主题颜色值，可以是预设主题名或自定义颜色值
     * @param {boolean} [reverse=false] - 是否反转渐变颜色顺序
     * @returns {Record<string, string>} 包含主题颜色CSS变量的对象
     */
    protected _createThemeColorVars(color: string = this.options.themeColor, reverse: boolean = false) {
        const themeColor = color in presetThemes ? presetThemes[color].color : color
        const vars: Record<string, string> = generateThemeGradientColorVars(themeColor, {
            prefix: '--t-color-theme-',
            reverse,
        })
        return vars
    }
    protected _addStyleheetId(id: string) {
        if (!this.stylesheets.includes(id)) {
            this.stylesheets.push(id)
        }
    }
    protected _generateBaseStyles() {
        const baseStyles = `${this.selectors}{\n${toVarStyles(baseVars)}\n${toVarStyles(derivedVars)}\n}\n`
        const sizeStyles = getVarsStyles(sizeVars, this.selectors, 'data-size')
        const radiusStyles = getVarsStyles(radiusVars, this.selectors, 'data-radius')
        const spacingStyles = getVarsStyles(spacingVars, this.selectors, 'data-spacing')
        const shadowStyles = getVarsStyles(shadowVars, this.selectors, 'data-shadow')
        const defaultThemeStyles = this._generateDefaultThemeColorStyles(presetThemes.light.color)
        return `${baseStyles}\n${sizeStyles}\n${radiusStyles}\n${spacingStyles}\n${shadowStyles}\n${defaultThemeStyles}`
    }
    /**
     * 注入主题基础样式到页面中
     * @param {boolean} [inject=true] - 是否立即将样式注入到页面中
     * @returns {string} 生成的CSS样式字符串
     * @private
     */
    private _injectBaseStyles() {
        const styleId = `themepro-${this.id}-vars`
        const css = this._generateBaseStyles()
        injectStylesheet(css, { id: styleId })
        this._addStyleheetId(styleId)
        return css
    }
    /**
     * 更新主题
     */
    update(options?: Partial<ThemeOptions>) {
        Object.assign(this.options, options)
        const { themeColor } = this.options
        if (themeColor in presetThemes) {
            this.options.themeColor = presetThemes[themeColor].color
        }
        this._injectThemeColorStyles()
    }
    connect() {
        if (this.connected) return
        this._injectBaseStyles()
        this._injectSemanticColorStyles()
        this.connected = true
    }
    disconnect() {
        this.stylesheets.forEach((id) => {
            const style = document.getElementById(id)
            if (style) {
                style.remove()
            }
        })
        this.connected = false
    }
    /**
     * 生成所有需要注入的css样式
     */
    toStyles() {
        return `
            ${this._generateBaseStyles()}
            ${this._generateSemanticColorStyles()}
            ${this._generateDefaultThemeColorStyles(presetThemes.light.color)}
        `
    }
    download() {
        // 创建 Blob 对象
        const blob = new Blob([this.toStyles()], { type: 'text/plain' })
        // 创建临时 URL
        const url = URL.createObjectURL(blob)
        // 创建隐藏的下载链接
        const a = document.createElement('a')
        a.href = url
        a.download = 'themepro.css'
        a.style.display = 'none'
        // 添加到文档并触发点击
        document.body.appendChild(a)
        a.click()
        // 清理资源
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }
    apply(selector: string | HTMLElement) {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }
}
