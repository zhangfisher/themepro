import { ThemeAttrObserver } from './observer'
import { presetThemes } from './presets'
import type { ThemeOptions, ThemeSize } from './types'
import { getId } from './utils'
import { generateThemeGradientColorVars } from './utils/generateGradientVars'
import { getVarsStyles } from './utils/getVarsStyles'
import { injectStylesheet } from './utils/injectStylesheet'
import { toRGBString } from './utils/toRGBString'
import { toVarStyles } from './utils/toVarStyles'
import { baseVars, radiusVars, derivedVars, shadowVars, spacingVars, sizeVars } from './vars'
import { mapCssSelector } from './utils/mapSelector'

export class ThemeScope {
    options: Required<ThemeOptions>
    attrObserver!: ThemeAttrObserver
    selectors: string[]
    stylesheets: string[] = []
    connected: boolean = false
    constructor(
        public el: HTMLElement = document.documentElement,
        options?: ThemeOptions,
    ) {
        this.options = Object.assign(
            {
                id: getId(),
                themeColor: 'light',
                selectors: [':host', ':root'],
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
        this.selectors = this.options.selectors
        this.connect()
    }
    get id() {
        return this.options.id
    }
    get size() {
        return (this.el.dataset.size || this.options.size) as ThemeSize
    }
    set size(value: ThemeSize) {
        if (value === 'medium') {
            this.el.removeAttribute('data-size')
        } else {
            this.el.dataset.size = value
        }
    }
    get dark() {
        return !!(this.el.getAttribute('dark') || this.options.dark)
    }
    set dark(value: boolean) {
        if (value === false) {
            this.el.removeAttribute('dark')
        } else {
            this.el.setAttribute('dark', '')
        }
        this.options.dark = value
    }
    get spacing(): ThemeSize {
        return (this.el.dataset.spacing || this.options.spacing) as ThemeSize
    }
    set spacing(value: ThemeSize) {
        if (value === 'medium') {
            this.el.removeAttribute('data-spacing')
        } else {
            this.el.dataset.spacing = value
        }
        this.options.spacing = value
    }
    get shadow() {
        return (this.el.dataset.shadow || this.options.shadow) as ThemeSize
    }
    set shadow(value: ThemeSize) {
        if (value === 'medium') {
            this.el.removeAttribute('data-shadow')
        } else {
            this.el.dataset.shadow = value
        }
        this.options.shadow = value
    }
    get colorized() {
        return !!(this.el.getAttribute('colorized') || this.options.colorized)
    }
    set colorized(value: boolean) {
        if (value === false) {
            this.el.removeAttribute('colorized')
        } else {
            this.el.setAttribute('colorized', '')
        }
        this.options.colorized = value
    }
    get radius(): ThemeSize {
        return (this.el.dataset.radius || this.options.radius || 'medium') as ThemeSize
    }
    set radius(value: ThemeSize) {
        if (value === 'medium') {
            this.el.removeAttribute('data-radius')
        } else {
            this.el.dataset.radius = value
        }
        this.options.radius = value
    }
    get themeColor(): string {
        return (this.el.dataset.theme || this.options.themeColor || 'light') as string
    }
    set themeColor(value: string) {
        if (value === 'light') {
            this.el.removeAttribute('data-theme')
        } else {
            this.el.dataset.theme = value in presetThemes ? presetThemes[value].color : toRGBString(value)
        }
        this.options.themeColor = value
    }
    /**
     * 当属性变化时，更新主题颜色变量
     *
     * @param attrName
     * @param attrValue
     */
    private _addThemeAttrListener() {
        this.attrObserver = new ThemeAttrObserver(
            this.el,
            ['data-theme', 'data-primary', 'data-success', 'data-warning', 'data-danger', 'data-info'],
            (attrName, attrValue) => {
                if (attrName === 'data-theme') {
                    this.update({ themeColor: attrValue || 'light' })
                } else if (
                    ['data-primary', 'data-success', 'data-warning', 'data-danger', 'data-info'].includes(attrName)
                ) {
                    this._createThemeColorVars()
                }
            },
        )
    }
    /**
     * 更新主题
     */
    update(options?: ThemeOptions) {
        Object.assign(this.options, options)
        const { themeColor, size, radius, spacing, shadow, dark, colorized } = this.options
        if (themeColor in presetThemes) {
            this.options.themeColor = presetThemes[themeColor].color
        }
        this.size = size
        this.radius = radius
        this.spacing = spacing
        this.shadow = shadow
        this.dark = dark
        this.colorized = colorized

        const style = `${this.selectors}[data-theme='${themeColor}'],[data-theme='${themeColor}']{
            color-scheme: light;
            ${toVarStyles(this._createThemeColorVars(themeColor))};\n}
            ${this.selectors}[data-theme='${themeColor}'][dark],[data-theme='${themeColor}'][dark]{
            color-scheme: dark;
            ${toVarStyles(this._createThemeColorVars(themeColor, true))};\n}`

        const styleId: string = `themepro-${this.id}-theme-colors`
        injectStylesheet(style, {
            id: styleId,
        })
        this._addStyleheetId(styleId)
    }
    /**
     * 获取默认主题的样式字符串
     * @returns {string} 包含CSS变量和颜色模式的主题样式字符串
     * @private
     */
    private _getThemeColorStyles(
        themeColor: string,
        attrs: Record<string, string> = {},
        includeEmpty: boolean = false,
    ) {
        const dd = mapCssSelector(this.selectors, attrs, includeEmpty)
        return `${this.selectors}{\ncolor-scheme: light;\n${toVarStyles(this._createThemeColorVars(themeColor))}\n}\n
        ${this.selectors}[dark],[dark]{\ncolor-scheme: dark;\n${toVarStyles(this._createThemeColorVars(themeColor, true))}\n}\n`
    }
    private _createThemeColorVars(color: string = this.themeColor, reverse: boolean = false) {
        const themeColor = color in presetThemes ? presetThemes[color].color : color
        const vars: Record<string, string> = generateThemeGradientColorVars(themeColor, {
            prefix: '--t-color-theme-',
            reverse,
        })
        return vars
    }
    private _createSemanticColorStyles(inject: boolean = true) {
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
        const styleId = `themepro-${this.id}-semantics`
        const css = `${this.selectors}{\n${toVarStyles(vars)}}\n}\n`
        if (inject) {
            injectStylesheet(css, {
                id: styleId,
            })
            this._addStyleheetId(styleId)
        }
        return css
    }
    private _addStyleheetId(id: string) {
        if (!this.stylesheets.includes(id)) {
            this.stylesheets.push(id)
        }
    }
    private _injectBaseStyles(inject: boolean = true) {
        const baseStyles = `${this.selectors}{\n${toVarStyles(baseVars)}\n${toVarStyles(derivedVars)}\n}\n`
        const sizeStyles = getVarsStyles(sizeVars, this.selectors, 'data-size')
        const radiusStyles = getVarsStyles(radiusVars, this.selectors, 'data-radius')
        const spacingStyles = getVarsStyles(spacingVars, this.selectors, 'data-spacing')
        const shadowStyles = getVarsStyles(shadowVars, this.selectors, 'data-shadow')
        const lightStyles = this._getThemeColorStyles(presetThemes.light.color)
        console.log('lightStyles=', lightStyles)
        const styleId = `themepro-${this.id}-vars`
        const css = `${baseStyles}\n${sizeStyles}\n${radiusStyles}\n${spacingStyles}\n${shadowStyles}\n${lightStyles}`
        console.log('css=', css)
        if (inject) {
            injectStylesheet(css, {
                id: styleId,
            })
            this._addStyleheetId(styleId)
        }
        return css
    }
    connect() {
        if (this.connected) return
        this._addThemeAttrListener()
        this._injectBaseStyles()
        this._createSemanticColorStyles()
        this.update()
        this.connected = true
    }
    disconnect() {
        this.attrObserver.disconnect()
        this.stylesheets.forEach((id) => {
            const style = document.getElementById(id)
            if (style) {
                style.remove()
            }
        })
    }
    /**
     * 返回css样式
     */
    toCss() {}
}
