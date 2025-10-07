import { AttrObserver } from './observer'
import { presetThemes } from './presets'
import type { ThemeOptions, ThemeSize } from './types'
import { generateThemeGradientColorVars } from './utils/generateGradientVars'
import { getVarsStyles } from './utils/getVarsStyles'
import { injectStylesheet } from './utils/injectStylesheet'
import { toRGBString } from './utils/toRGBString'
import { toVarStyles } from './utils/toVarStyles'
import { baseVars, radiusVars, derivedVars, shadowVars, spacingVars, sizeVars } from './vars'

export class Themepro {
    scope!: HTMLElement
    options: Required<ThemeOptions>
    attrObserver!: AttrObserver
    vars: Record<string, string> = {}
    selector: string = ':host,:root'
    scopes: WeakMap<HTMLElement, ThemeOptions> = new WeakMap()

    constructor(scope?: string | HTMLElement, options?: ThemeOptions) {
        this.options = Object.assign(
            {
                selector: ':host,:root',
                themeColor: 'light',
                size: 'medium',
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
        if (typeof scope === 'string') {
            window.addEventListener('DOMContentLoaded', () => {
                this.scope = document.querySelector(scope) || document.documentElement
                this._init()
            })
        } else {
            this.scope = scope || document.documentElement
            this._init()
        }
    }
    private _init() {
        this.attrObserver = new AttrObserver(
            this.scope,
            ['data-theme', 'data-primary', 'data-success', 'data-warning', 'data-danger', 'data-info'],
            this._onThemeAttrsChange.bind(this),
        )
        this._injectBaseStyles()
        this._createSemanticColorStyles()
        this.update()
    }
    get size() {
        return (this.scope.dataset.size || this.options.size) as ThemeSize
    }
    set size(value: ThemeSize) {
        if (value === 'medium') {
            this.scope.removeAttribute('data-size')
        } else {
            this.scope.dataset.size = value
        }
    }
    get dark() {
        return !!(this.scope.getAttribute('dark') || this.options.dark)
    }
    set dark(value: boolean) {
        if (value === false) {
            this.scope.removeAttribute('dark')
        } else {
            this.scope.setAttribute('dark', '')
        }
        this.options.dark = value
    }
    get spacing(): ThemeSize {
        return (this.scope.dataset.spacing || this.options.spacing) as ThemeSize
    }
    set spacing(value: ThemeSize) {
        if (value === 'medium') {
            this.scope.removeAttribute('data-spacing')
        } else {
            this.scope.dataset.spacing = value
        }
        this.options.spacing = value
    }
    get shadow() {
        return (this.scope.dataset.shadow || this.options.shadow) as ThemeSize
    }
    set shadow(value: ThemeSize) {
        if (value === 'medium') {
            this.scope.removeAttribute('data-shadow')
        } else {
            this.scope.dataset.shadow = value
        }
        this.options.shadow = value
    }
    get colorized() {
        return !!(this.scope.getAttribute('colorized') || this.options.colorized)
    }
    set colorized(value: boolean) {
        if (value === false) {
            this.scope.removeAttribute('colorized')
        } else {
            this.scope.setAttribute('colorized', '')
        }
        this.options.colorized = value
    }
    get radius(): ThemeSize {
        return (this.scope.dataset.radius || this.options.radius || 'medium') as ThemeSize
    }
    set radius(value: ThemeSize) {
        if (value === 'medium') {
            this.scope.removeAttribute('data-radius')
        } else {
            this.scope.dataset.radius = value
        }
        this.options.radius = value
    }
    get themeColor(): string {
        return (this.scope.dataset.theme || this.options.themeColor || 'light') as string
    }
    set themeColor(value: string) {
        if (value === 'light') {
            this.scope.removeAttribute('data-theme')
        } else {
            this.scope.dataset.theme = value in presetThemes ? presetThemes[value].color : toRGBString(value)
        }
        this.options.themeColor = value
    }
    /**
     * 当属性变化时，更新主题
     *
     * @param attrName
     * @param attrValue
     */
    private _onThemeAttrsChange(attrName: string, attrValue: string | null) {
        if (attrName === 'data-theme') {
            this.update({ themeColor: attrValue || 'light' })
        }
    }
    /**
     *
     */
    update(options?: ThemeOptions) {
        Object.assign(this.options, options)
        const { themeColor, size, radius, spacing, shadow, dark } = this.options
        this.dark = false
        if (themeColor in presetThemes) {
            this.options.themeColor = presetThemes[themeColor].color
        }
        this.size = size
        this.radius = radius
        this.spacing = spacing
        this.shadow = shadow
        this.dark = dark
        const style = `${this.selector}[data-theme='${themeColor}'],[data-theme='${themeColor}']{
            color-scheme: light;
            ${toVarStyles(this._createThemeColorVars(themeColor))};\n}
            ${this.selector}[data-theme='${themeColor}'][dark],[data-theme='${themeColor}'][dark]{
            color-scheme: dark;
            ${toVarStyles(this._createThemeColorVars(themeColor, true))};\n}`

        injectStylesheet(style, {
            id: `themepro-theme`,
        })
    }
    /**
     * 获取默认主题的样式字符串
     * @returns {string} 包含CSS变量和颜色模式的主题样式字符串
     * @private
     */
    private _getDefaultThemeStyles() {
        return `${this.selector}{\ncolor-scheme: light;\n${toVarStyles(this._createThemeColorVars(presetThemes.light.color))}\n}\n
        ${this.selector}[dark],[dark]{\ncolor-scheme: dark;\n${toVarStyles(this._createThemeColorVars(presetThemes.light.color, true))}\n}\n`
    }
    private _createThemeColorVars(color: string = this.themeColor, reverse: boolean = false) {
        const themeColor = color in presetThemes ? presetThemes[color].color : color
        const vars: Record<string, string> = generateThemeGradientColorVars(themeColor, {
            prefix: '--t-color-theme-',
            reverse,
        })
        return vars
    }
    private _createSemanticColorStyles() {
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

        injectStylesheet(`${this.selector}{\n${toVarStyles(vars)}}\n}\n`, {
            id: 'themepro-semantics',
        })
    }
    private _injectBaseStyles() {
        const baseStyles = `${this.selector}{\n${toVarStyles(baseVars)}\n${toVarStyles(derivedVars)}\n}\n`
        const sizeStyles = getVarsStyles(sizeVars, this.selector, 'data-size')
        const radiusStyles = getVarsStyles(radiusVars, this.selector, 'data-radius')
        const spacingStyles = getVarsStyles(spacingVars, this.selector, 'data-spacing')
        const shadowStyles = getVarsStyles(shadowVars, this.selector, 'data-shadow')
        const lightStyles = this._getDefaultThemeStyles()
        injectStylesheet(
            `${baseStyles}\n${sizeStyles}\n${radiusStyles}\n${spacingStyles}\n${shadowStyles}\n${lightStyles}`,
            {
                id: 'themepro-vars',
            },
        )
    }
}

// 创建默认的主题应用
export const themePro = new Themepro()

globalThis.ThemePro = themePro

declare global {
    var ThemePro: typeof themePro
}
