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
import { presetThemes } from './presets'
import type { DynamicThemeOptions, ThemeOptions, ThemeSize } from './types'
import { getId, toRGBString } from './utils'
import { generateThemeColorVars } from './utils/generateThemeColorVars'
import { getVarsStyles } from './utils/getVarsStyles'
import { injectStylesheet } from './utils/injectStylesheet'
import { toVarStyles } from './utils/toVarStyles'
import {
    baseVars,
    radiusVars,
    derivedVars,
    shadowVars,
    spacingVars,
    sizeVars,
    lightThemeVars,
    darkThemeVars,
} from './vars'
import { mapCssSelector } from './utils/mapSelector'

export class ThemeScope {
    options: Required<ThemeOptions>
    private _selectors: string[] = []
    stylesheets: string[] = [] //
    connected: boolean = false
    elements: WeakRef<HTMLElement>[] = []
    constructor(options?: ThemeOptions) {
        this.options = Object.assign(
            {
                id: getId(),
                themeColor: 'light',
                cssSelector: [],
                size: 'medium',
                dark: false,
                colorized: false,
                radius: 'medium',
                spacing: 'medium',
                shadow: 'medium',
                border: '1px',
                primary: 'var(--auto-theme-color)', //#029cfd
                success: '#22c55e',
                warning: '#f59e0b',
                danger: '#ef4444',
                info: '#71717a',
                autoConnect: true,
                autoAttach: true,
                docRoot: document.documentElement,
            },
            options,
        ) as Required<ThemeOptions>
        this._selectors = this.options.cssSelector
        if (this.options.cssSelector && this.options.cssSelector.length === 0) {
            this.options.cssSelector.push(`[data-theme-scope='${this.id}']`)
        }
        if (this.options.autoConnect) this.connect()
        if (this.options.autoAttach) this.autoAttach()
    }
    get id() {
        return this.options.id
    }
    get docRoot() {
        return this.options.docRoot as HTMLElement
    }
    get size() {
        return this.options.size as ThemeSize
    }
    set size(value: ThemeSize) {
        this.options.size = value
        if (value === 'medium') {
            this._forEachElements((el) => {
                el.removeAttribute('data-size')
            })
        } else {
            this._forEachElements((el) => {
                el.dataset.size = value
            })
        }
    }
    get dark() {
        return this.options.dark
    }
    set dark(value: boolean) {
        this.options.dark = value
        if (value === false) {
            this._forEachElements((el) => {
                el.removeAttribute('dark')
            })
        } else {
            this._forEachElements((el) => {
                el.setAttribute('dark', '')
            })
        }
    }
    get spacing(): ThemeSize {
        return this.options.spacing
    }
    set spacing(value: ThemeSize) {
        this.options.spacing = value
        if (value === 'medium') {
            this._forEachElements((el) => {
                el.removeAttribute('data-spacing')
            })
        } else {
            this._forEachElements((el) => {
                el.dataset.spacing = value
            })
        }
    }
    get shadow() {
        return this.options.shadow as ThemeSize
    }
    set shadow(value: ThemeSize) {
        this.options.shadow = value
        if (value === 'medium') {
            this._forEachElements((el) => {
                el.removeAttribute('data-shadow')
            })
        } else {
            this._forEachElements((el) => {
                el.dataset.shadow = value
            })
        }
    }
    get colorized() {
        return this.options.colorized
    }
    set colorized(value: boolean) {
        this.options.colorized = value
        if (value === false) {
            this._forEachElements((el) => {
                el.removeAttribute('colorized')
            })
        } else {
            this._forEachElements((el) => {
                el.setAttribute('colorized', '')
            })
        }
    }
    get radius(): ThemeSize {
        return (this.options.radius || 'medium') as ThemeSize
    }
    set radius(value: ThemeSize) {
        this.options.radius = value
        if (value === 'medium') {
            this._forEachElements((el) => {
                el.removeAttribute('data-radius')
            })
        } else {
            this._forEachElements((el) => {
                el.dataset.radius = value
            })
        }
    }
    get themeColor(): string {
        return this.options.themeColor || 'light'
    }
    set themeColor(value: string) {
        if (value === 'light') {
            this._forEachElements((el) => {
                el.removeAttribute('data-theme')
            })
        } else {
            this._forEachElements((el) => {
                el.dataset.theme = value in presetThemes ? presetThemes[value].color : toRGBString(value)
            })
        }
        this.options.themeColor = value
        this.update({ themeColor: value })
    }

    private _forEachElements(callback: (el: HTMLElement) => void) {
        this.elements.forEach((elRef) => {
            const el = elRef.deref()
            if (el) {
                callback(el)
            }
        })
        // 清除已失效的元素引用
        this.elements = this.elements.filter((elRef) => elRef.deref())
    }
    /**
     * 生成主题颜色的CSS样式字符串
     * @returns {string} 包含主题颜色变量的CSS样式字符串，支持亮色和暗色模式
     */
    protected _generateThemeColorStyles() {
        const themeColor = this.options.themeColor

        const darkStyleFix = toVarStyles({
            '--t-theme-bgcolor': 'var(--t-color-theme-1)',
            '--t-theme-bgcolor-1': 'var(--t-color-theme-0)',
        })
        const lightBorderFix = `:host(:not([dark])[data-theme='${themeColor}']),:root:not([dark])[data-theme='${themeColor}']{${toVarStyles(
            {
                '--auto-border-color': 'var(--t-theme-color-3)',
            },
        )}}\n:host(:not([dark])[data-theme='${themeColor}'][colorized]),:root:not([dark])[data-theme='${themeColor}'][colorized]{${toVarStyles(
            {
                '--auto-border-color': 'var(--t-theme-color-1)',
            },
        )}}`
        return `${this._selectors}[data-theme='${themeColor}']{
            color-scheme: light;
            ${toVarStyles(this._createThemeColorVars(themeColor))};\n}
            ${this._selectors}[data-theme='${themeColor}'][dark]{
            color-scheme: dark;
            ${toVarStyles(this._createThemeColorVars(themeColor, true))};\n${darkStyleFix}\n
            }${lightBorderFix}`
    }

    protected _injectThemeColorStyles() {
        if (this.options.themeColor === 'light') return
        const css = this._generateThemeColorStyles()
        const styleId: string = `themepro-${this.id}-colors`
        injectStylesheet(css, {
            id: styleId,
        })
        this._addStyleheetId(styleId)
        return css
    }

    protected _generateLightDarkModeStyles() {
        const lightStyles = `${this._selectors}:not([colorized]){\n${toVarStyles(lightThemeVars)}\n}\n`
        const darkStyles = `${this._selectors}[dark]:not([colorized]){\n${toVarStyles(darkThemeVars)}\n}\n`
        return lightStyles + darkStyles
    }
    protected _injectLightDarkModeStyles() {
        const css = this._generateLightDarkModeStyles()
        const styleId: string = `themepro-${this.id}-mode`
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
        const lightSelector = mapCssSelector(this._selectors, { light: '' }, true)
        const darkSelector = mapCssSelector(this._selectors, { light: '', dark: '' })
        const darkSelector2 = mapCssSelector(this._selectors, { dark: '' })
        const lightBorderFixs = `:host(:not([data-theme]):not([dark])),:root:not([data-theme]):not([dark]){${toVarStyles(
            {
                '--auto-border-color': 'var(--t-theme-color-3)',
            },
        )}}\n`
        return `${lightSelector}{\ncolor-scheme: light;\n${toVarStyles(this._createThemeColorVars(themeColor))}\n}\n
        ${darkSelector2},${darkSelector}{\ncolor-scheme: dark;\n${toVarStyles(this._createThemeColorVars(themeColor, true))}\n}\n          
        ${lightBorderFixs}      
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
        return `${this._selectors}{\n${toVarStyles(vars)}}\n`
    }

    /**
     * 生成主题颜色相关的CSS变量
     * @param {string} [color=this.themeColor] - 主题颜色值，可以是预设主题名或自定义颜色值
     * @param {boolean} [reverse=false] - 是否反转渐变颜色顺序
     * @returns {Record<string, string>} 包含主题颜色CSS变量的对象
     */
    protected _createThemeColorVars(color: string = this.options.themeColor, reverse: boolean = false) {
        const themeColor = color in presetThemes ? presetThemes[color].color : color
        const vars: Record<string, string> = generateThemeColorVars(themeColor, {
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
        const baseStyles = `${this._selectors}{\n${toVarStyles(baseVars)}\n${toVarStyles(derivedVars)}\n}\n`
        const sizeStyles = getVarsStyles(sizeVars, this._selectors, 'data-size')
        const radiusStyles = getVarsStyles(radiusVars, this._selectors, 'data-radius')
        const spacingStyles = getVarsStyles(spacingVars, this._selectors, 'data-spacing')
        const shadowStyles = getVarsStyles(shadowVars, this._selectors, 'data-shadow')
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
    update(options: Partial<DynamicThemeOptions>) {
        const { themeColor } = options
        if (themeColor) {
            this.options.themeColor =
                themeColor in presetThemes ? presetThemes[themeColor].color : toRGBString(themeColor)
            this._injectThemeColorStyles()
        } else if (options.primary || options.success || options.warning || options.danger || options.info) {
            Object.assign(this.options, options)
            this._injectSemanticColorStyles()
        }
    }
    connect() {
        if (this.connected) return
        this._injectBaseStyles()
        this._injectLightDarkModeStyles()
        this._injectThemeColorStyles()
        this._injectSemanticColorStyles()
        this._applyToElements()
        this.connected = true
    }
    /**
     * 将主题样式应用到匹配选择器的所有元素
     * @private
     * @throws {TypeError} 如果元素不是HTMLElement实例
     */
    private _applyToElements() {
        const selectors = this.options.elements || []
        selectors.forEach((selector) => {
            const els = this.docRoot.querySelectorAll(selector)
            for (let i = 0; i < els.length; i++) {
                const el = els[i]
                if (el && el instanceof HTMLElement) this.attach(el)
            }
        })
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
    isConnected() {
        const styleIds: string[] = [
            `themepro-${this.id}-vars`,
            `themepro-${this.id}-semantics`,
            `themepro-${this.id}-colors`,
            `themepro-${this.id}-mode`,
        ]
        return styleIds.some((id) => this.docRoot.ownerDocument.getElementById(id) !== null)
    }
    /**
     * 生成所有需要注入的css样式
     */
    toStyles() {
        return `${this._generateBaseStyles()}${this._injectLightDarkModeStyles()}${this._generateSemanticColorStyles()}${this._generateDefaultThemeColorStyles(presetThemes.light.color)}${this._generateThemeColorStyles()}`
    }
    download() {
        // 创建 Blob 对象
        const blob = new Blob([this.toStyles()], { type: 'text/plain' })
        // 创建临时 URL
        const url = URL.createObjectURL(blob)
        // 创建隐藏的下载链接
        const a = document.createElement('a')
        a.href = url
        a.download = `themepro_${this.id}.css`
        a.style.display = 'none'
        // 添加到文档并触发点击
        document.body.appendChild(a)
        a.click()
        // 清理资源
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }
    autoAttach() {
        const scopeEls = this.docRoot.querySelectorAll(`[data-theme-scope='${this.id}']`)
        for (const el of scopeEls) {
            if (!(el instanceof HTMLElement)) continue
            this.attach(el)
        }
    }
    /**
     * 将主题作用域应用到指定的DOM元素上
     * @param {string | HTMLElement} selector - CSS选择器字符串或HTMLElement元素
     */
    attach(selector: string | HTMLElement) {
        const els = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector]
        for (const el of els) {
            if (el && el instanceof HTMLElement) {
                if (el !== document.documentElement) {
                    el.setAttribute('data-theme-scope', this.id)
                }
                if (this.elements.length === 0 || !this.elements.every((elRef) => elRef.deref() === el)) {
                    this.elements.push(new WeakRef(el))
                }
            }
        }
    }
    /**
     * 从主题作用域中分离指定的元素
     * @param {string|HTMLElement} selector - CSS选择器字符串或HTMLElement元素
     * @returns {void}
     */
    detach(selector: string | HTMLElement) {
        const els = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector]
        for (const el of els) {
            if (el && el instanceof HTMLElement) {
                el.removeAttribute('data-theme-scope')
                this.elements = this.elements.filter((ref) => ref.deref() !== el)
            }
        }
    }
}
