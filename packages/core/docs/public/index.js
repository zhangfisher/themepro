// src/observer.ts
var AttrObserver = class {
    constructor(el, attrs, callback) {
        this.el = el
        this.attrs = attrs
        this.callback = callback
        this.observer = null
        this.connected = false
        if (!el || !(el instanceof Element)) {
            throw new Error('\u7B2C\u4E00\u4E2A\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2ADOM\u5143\u7D20')
        }
        if (!Array.isArray(attrs)) {
            throw new Error(
                '\u7B2C\u4E8C\u4E2A\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2A\u5C5E\u6027\u540D\u79F0\u6570\u7EC4',
            )
        }
        if (typeof callback !== 'function') {
            throw new Error('\u7B2C\u4E09\u4E2A\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2A\u56DE\u8C03\u51FD\u6570')
        }
        this.connect()
    }
    connect() {
        if (this.connected) return
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName &&
                    this.attrs.includes(mutation.attributeName)
                ) {
                    const newValue = this.el.getAttribute(mutation.attributeName)
                    this.callback(mutation.attributeName, newValue, this.el)
                }
            })
        })
        this.observer.observe(this.el, {
            attributes: true,
            attributeFilter: this.attrs,
        })
        this.connected = true
    }
    disconnect() {
        if (this.observer) {
            this.observer.disconnect()
            this.observer = null
        }
    }
}

// src/presets.ts
var presetThemes = {
    light: {
        baseColor: '#c5c5c5',
        title: '\u4EAE\u8272',
    },
    dark: {
        baseColor: '#7d7d7d',
        title: '\u6697\u9ED1',
    },
    red: {
        baseColor: '#f5222d',
        title: '\u8584\u66AE',
    },
    volcano: {
        baseColor: '#fa541c',
        title: '\u706B\u5C71',
    },
    orange: {
        baseColor: '#fa8c16',
        title: '\u65E5\u66AE',
    },
    lime: {
        baseColor: '#a0d911',
        title: '\u9752\u67E0',
    },
    gold: {
        baseColor: '#faad14',
        title: '\u91D1\u76CF\u82B1',
    },
    yellow: {
        baseColor: '#fadb14',
        title: '\u65E5\u51FA',
    },
    green: {
        baseColor: '#52c41a',
        title: '\u6781\u5149\u7EFF',
    },
    cyan: {
        baseColor: '#13c2c2',
        title: '\u660E\u9752',
    },
    blue: {
        baseColor: '#1677ff',
        title: '\u62C2\u6653\u84DD',
    },
    geekblue: {
        baseColor: '#2f54eb',
        title: '\u6781\u5BA2\u84DD',
    },
    purple: {
        baseColor: '#722ed1',
        title: '\u9171\u7D2B',
    },
    magenta: {
        baseColor: '#eb2f96',
        title: '\u6CD5\u5F0F\u6D0B\u7EA2',
    },
}

// src/utils/generateGradientColors.ts
import { FastColor } from '@ant-design/fast-color'
var hueStep = 2
var saturationStep = 0.16
var saturationStep2 = 0.05
var brightnessStep1 = 0.05
var brightnessStep2 = 0.15
var lightColorCount = 5
var darkColorCount = 4
var darkColorMap = [
    { index: 7, amount: 15 },
    { index: 6, amount: 25 },
    { index: 5, amount: 30 },
    { index: 5, amount: 45 },
    { index: 5, amount: 65 },
    { index: 5, amount: 85 },
    { index: 4, amount: 90 },
    { index: 3, amount: 95 },
    { index: 2, amount: 97 },
    { index: 1, amount: 98 },
]
function getHue(hsv, i, light) {
    let hue
    if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
        hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i
    } else {
        hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i
    }
    if (hue < 0) {
        hue += 360
    } else if (hue >= 360) {
        hue -= 360
    }
    return hue
}
function getSaturation(hsv, i, light) {
    if (hsv.h === 0 && hsv.s === 0) {
        return hsv.s
    }
    let saturation
    if (light) {
        saturation = hsv.s - saturationStep * i
    } else if (i === darkColorCount) {
        saturation = hsv.s + saturationStep
    } else {
        saturation = hsv.s + saturationStep2 * i
    }
    if (saturation > 1) {
        saturation = 1
    }
    if (light && i === lightColorCount && saturation > 0.1) {
        saturation = 0.1
    }
    if (saturation < 0.06) {
        saturation = 0.06
    }
    return Math.round(saturation * 100) / 100
}
function getValue(hsv, i, light) {
    let value
    if (light) {
        value = hsv.v + brightnessStep1 * i
    } else {
        value = hsv.v - brightnessStep2 * i
    }
    value = Math.max(0, Math.min(1, value))
    return Math.round(value * 100) / 100
}
function generateGradientColors(color, opts = {}) {
    const patterns = []
    const pColor = new FastColor(color)
    const hsv = pColor.toHsv()
    for (let i = lightColorCount; i > 0; i -= 1) {
        const c = new FastColor({
            h: getHue(hsv, i, true),
            s: getSaturation(hsv, i, true),
            v: getValue(hsv, i, true),
        })
        patterns.push(c)
    }
    patterns.push(pColor)
    for (let i = 1; i <= darkColorCount; i += 1) {
        const c = new FastColor({
            h: getHue(hsv, i),
            s: getSaturation(hsv, i),
            v: getValue(hsv, i),
        })
        patterns.push(c)
    }
    if (opts.theme === 'dark') {
        return darkColorMap.map(({ index, amount }) =>
            new FastColor(opts.backgroundColor || '#141414').mix(patterns[index], amount).toHexString(),
        )
    }
    return patterns.map((c) => c.toHexString())
}

// src/utils/toRGB.ts
var colorNames = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    green: '#008000',
    blue: '#0000FF',
    yellow: '#FFFF00',
    purple: '#800080',
    orange: '#FFA500',
    gray: '#808080',
    grey: '#808080',
    pink: '#FFC0CB',
    brown: '#A52A2A',
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    silver: '#C0C0C0',
    maroon: '#800000',
    olive: '#808000',
    lime: '#00FF00',
    teal: '#008080',
    navy: '#000080',
}
function toRGB(color) {
    if (!color) return null
    color = color.trim().toLowerCase()
    if (color.startsWith('#')) {
        return hexToRGB(color)
    }
    if (color.startsWith('rgb')) {
        return rgbStringToRGB(color)
    }
    if (color in colorNames) {
        return hexToRGB(colorNames[color])
    }
    return null
}
function hexToRGB(hex) {
    hex = hex.replace('#', '')
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    if (hex.length !== 6) return null
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null
    return [r, g, b]
}
function rgbStringToRGB(rgbString) {
    const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i)
    if (!match) return null
    const r = parseInt(match[1], 10)
    const g = parseInt(match[2], 10)
    const b = parseInt(match[3], 10)
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null
    return [r, g, b]
}

// src/utils/isDark.ts
function isDark(color) {
    const rgb = toRGB(color)
    if (!rgb) return false
    const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]
    return luminance < 128
}

// src/utils/generateGradientVars.ts
function generateGradientVars(color, options) {
    const { prefix } = Object.assign({}, options)
    const colors = generateGradientColors(color)
    if (isDark(color)) colors.reverse()
    const vars = {}
    colors.reduce((all, cur, i) => {
        vars[`${prefix}${i}`] = cur
        return all
    }, {})
    return vars
}

// src/utils/toVarStyles.ts
function toVarStyles(vars) {
    return `${Object.entries(vars)
        .map(([key, value]) => `${key}:${value}`)
        .join(';\n')};`
}

// src/utils/getVarsStyles.ts
function getVarsStyles(vars, selector, attrName) {
    return Object.entries(vars)
        .map(([key, value]) => {
            return `${selector}[${attrName}=${key}],[${attrName}=${key}]{
${toVarStyles(value)}
}`
        })
        .join('\n')
}

// src/utils/getId.ts
function getId(len = 10) {
    return Math.random()
        .toString(36)
        .substring(2, len + 2)
}

// src/utils/injectStylesheet.ts
function injectStylesheet(css, options) {
    if (globalThis.document === void 0) return
    const { id, mode, location = 'head' } = Object.assign({ mode: 'replace' }, options)
    let style = document.head.querySelector(`#${id}`)
    const scopeId = id || getId()
    if (!style) {
        style = document.createElement('style')
        style.id = scopeId
        if (location === 'body') {
            document.body.appendChild(style)
        } else if (location instanceof HTMLElement) {
            location.appendChild(style)
        } else {
            document.head.appendChild(style)
        }
    }
    if (mode === 'append') {
        style.innerHTML += css
    } else {
        style.innerHTML = css
    }
    return scopeId
}

// src/utils/toRGBString.ts
function toRGBString(color) {
    const rgb = toRGB(color)
    if (!rgb) return color
    return `#${rgb[0].toString(16).padStart(2, '0')}${rgb[1].toString(16).padStart(2, '0')}${rgb[2].toString(16).padStart(2, '0')}`
}

// src/vars/base.ts
var baseVars = {
    '--t-border-radius-x-small': '0.2rem',
    '--t-border-radius-small': '0.3rem',
    '--t-border-radius-medium': '0.5rem',
    '--t-border-radius-large': '1rem',
    '--t-border-radius-x-large': '1.2rem',
    '--t-border-radius-circle': '50%',
    '--t-border-radius-pill': '9999px',
    '--t-shadow-x-small': '0 1px 2px hsl(240 3.8% 46.1% / 6%)',
    '--t-shadow-small': '0 1px 2px hsl(240 3.8% 46.1% / 12%)',
    '--t-shadow-medium': '0 2px 4px hsl(240 3.8% 46.1% / 12%)',
    '--t-shadow-large': '0 2px 8px hsl(240 3.8% 46.1% / 12%)',
    '--t-shadow-x-large': '0 4px 16px hsl(240 3.8% 46.1% / 12%)',
    '--t-font-size-x-small': '0.75rem',
    '--t-font-size-small': '0.875rem',
    '--t-font-size-medium': '1rem',
    '--t-font-size-large': '1.25rem',
    '--t-font-size-x-large': '1.5rem',
    '--t-font-weight-x-small': '100',
    '--t-font-weight-small': '200',
    '--t-font-weight-medium': '300',
    '--t-font-weight-large': '400',
    '--t-font-weight-x-large': '500',
    /* 间距 */
    '--t-spacing-x-small': '0.5rem',
    '--t-spacing-small': '0.75rem',
    '--t-spacing-medium': '1rem',
    '--t-spacing-large': '1.25rem',
    '--t-spacing-x-large': '1.75rem',
    '--t-letter-spacing-x-small': 'calc(var(--t-spacing-medium) * 0.01)',
    '--t-letter-spacing-small': 'calc(var(--t-spacing-medium) * 0.02)',
    '--t-letter-spacing-medium': 'calc(var(--t-spacing-medium) * 0.05)',
    '--t-letter-spacing-large': 'calc(var(--t-spacing-medium) * 0.1)',
    '--t-letter-spacing-x-large': 'calc(var(--t-spacing-medium) * 0.1)',
    '--t-line-height-x-small': 'var(--t-spacing-medium)',
    '--t-line-height-small': 'calc(var(--t-spacing-medium) * 1.2)',
    '--t-line-height-medium': 'calc(var(--t-spacing-medium) * 1.5)',
    '--t-line-height-large': 'calc(var(--t-spacing-medium) * 1.8)',
    '--t-line-height-x-large': 'calc(var(--t-spacing-medium) * 2)',
}

// src/vars/derived.ts
var derivedVars = {
    /* 主题色 */
    '--t-theme-color': 'var(--t-color-theme-8)',
    '--t-theme-bgcolor': 'var(--t-color-theme-0)',
    '--t-theme-bgcolor-1': 'var(--t-color-theme-1)',
    '--t-theme-bgcolor-2': 'var(--t-color-theme-2)',
    '--t-theme-bgcolor-3': 'var(--t-color-theme-3)',
    '--t-theme-bgcolor-4': 'var(--t-color-theme-4)',
    '--t-theme-bgcolor-5': 'var(--t-color-theme-5)',
    /* 主色调 */
    '--auto-primary-color': 'var(--t-color-primary-5)',
    '--auto-success-color': 'var(--t-color-success-5)',
    '--auto-danger-color': 'var(--t-color-danger-5)',
    '--auto-warning-color': 'var(--t-color-warning-5)',
    '--auto-info-color': 'var(--t-color-info-5)',
    '--auto-theme-color': 'var(--t-color-theme-5)',
    /* 字体颜色 */
    '--auto-color': 'var(--t-theme-color)',
    '--auto-secondary-color': 'var(--t-color-theme-4)',
    '--auto-disable-color': 'var(--t-color-theme-3)',
    '--auto-hover-color': 'var(--t-color-theme-4)',
    '--auto-dark-color': 'color-mix(in srgb, var(--auto-color), black 10%)',
    '--auto-light-color': 'color-mix(in srgb, var(--auto-color), white 10%)',
    /* 背景颜色: 用于面板/对话框/组件的背景 */
    '--auto-bgcolor': 'var(--t-theme-bgcolor)',
    '--auto-workspace-bgcolor': 'var(--t-color-theme-1)',
    /* 亮色: 相对于背景的亮色*/
    '--auto-light-bgcolor': 'color-mix(in hsl, var(--auto-bgcolor), white 20%)',
    /* 暗色: 相对于背景的暗色背景*/
    '--auto-dark-bgcolor': 'color-mix(in hsl, var(--auto-bgcolor), black 10%)',
    /** 随随色背景颜色：用于自动选中颜色，或根据背景颜色自动匹配背景颜色*/
    '--auto-selected-bgcolor': 'var(--t-color-theme-5)',
    '--auto-hover-bgcolor': 'color-mix(in srgb, var(--t-color-theme-5), transparent 85%)',
    /* 边框 */
    '--auto-border': '1px solid var(--auto-border-color)',
    '--auto-border-color': 'var(--t-color-theme-2)',
    '--auto-selected-border': '1px solid var(--t-color-theme-6)',
    '--auto-active-border': '1px solid var(--t-color-theme-6)',
    '--auto-disable-border': '1px solid var(--auto-disable-color)',
    '--auto-border-active-color': 'var(--t-color-primary-3)',
    /* 排版/字体 */
    '--auto-font': 'var(--auto-font-weight) var(--auto-font-size)/1.5 var(--auto-font-family)',
    '--auto-font-family':
        'Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans-serif',
    '--auto-font-size': 'var(--t-font-size-medium)',
    '--auto-font-weight': 'var(--t-font-weight-medium)',
    '--auto-letter-spacing': 'var(--t-letter-spacing-medium)',
    '--auto-line-height': 'var(--t-line-height-medium)',
    '--auto-title-font':
        'calc(var(--auto-font-weight) + 200) calc(var(--auto-font-size) * 1.1)/1.5 var(--auto-font-family)',
    /* 面板: 用于导航/标题栏/标签页标题 */
    '--auto-panel-header-color': 'var(--t-theme-color-6)',
    /** 标题背景颜色：用于标题/标题栏的背景颜色*/
    '--auto-panel-header-bgcolor': 'color-mix(in hsl, var(--auto-bgcolor), black 5%)',
    /* 面板背景颜色：用于面板/区块/Drawer等背景颜色*/
    '--auto-panel-bgcolor': 'var(--auto-light-bgcolor)',
    /* 边框/间距 */
    '--auto-border-radius': 'var(--t-border-radius-medium)',
    '--auto-spacing': 'var(--t-spacing-medium)',
    '--auto-padding': 'var(--t-spacing-medium)',
    '--auto-margin': 'var(--t-spacing-medium)',
    '--auto-shadow': 'var(--t-shadow-medium)',
    /* 输入框 */
    /** 输入框背景颜色：用于输入框背景颜色*/
    '--auto-input-bgcolor': 'var(--t-theme-bgcolor)',
    '--auto-input-padding': 'calc(0.5 * var(--auto-padding))',
    '--auto-input-height': 'var(--t-line-height-medium)',
    /** 其他 */
    '--auto-icon-size': 'calc(1.2 * var(--t-font-size-medium))',
}

// src/vars/size.ts
function getSizeVars(size) {
    return {
        /** 段落与字体 */
        '--auto-font-size': `var(--t-font-size-${size})`,
        '--auto-font-weight': `var(--t-font-weight-${size})`,
        '--auto-letter-spacing': `var(--t-letter-spacing-${size})`,
        '--auto-line-height': `var(--t-line-height-${size})`,
        /* 用于内边距和外边距 */
        '--auto-spacing': `var(--t-spacing-${size})`,
        '--auto-padding': `var(--t-spacing-${size})`,
        '--auto-margin': `var(--t-spacing-${size})`,
        '--auto-shadow': `var(--t-shadow-${size})`,
        '--auto-icon-size': `calc(1.5 * var(--t-font-size-${size}))`,
        /* 输入框 */
        '--auto-input-height': `var(--t-input-height-${size})`,
    }
}
var sizeVars = {
    'x-small': getSizeVars('x-small'),
    small: getSizeVars('small'),
    medium: getSizeVars('medium'),
    large: getSizeVars('large'),
    'x-large': getSizeVars('x-large'),
}

// src/vars/radius.ts
function getRadiusVars(radius) {
    return {
        '--auto-border-radius': `var(--t-border-radius-${radius})!important`,
    }
}
var radiusVars = {
    'x-small': getRadiusVars('x-small'),
    small: getRadiusVars('small'),
    medium: getRadiusVars('medium'),
    large: getRadiusVars('large'),
    'x-large': getRadiusVars('x-large'),
}

// src/vars/spacing.ts
function getSpacingVars(spacing) {
    return {
        '--auto-spacing': `var(--t-spacing-${spacing}) !important`,
        '--auto-padding': `var(--t-spacing-${spacing}) !important`,
        '--auto-margin': `var(--t-spacing-${spacing}) !important`,
    }
}
var spacingVars = {
    'x-small': getSpacingVars('x-small'),
    small: getSpacingVars('small'),
    medium: getSpacingVars('medium'),
    large: getSpacingVars('large'),
    'x-large': getSpacingVars('x-large'),
}

// src/vars/shadow.ts
function getShadowVars(size) {
    return {
        '--auto-shadow': `var(--t-shadow-${size})!important`,
    }
}
var shadowVars = {
    'x-small': getShadowVars('x-small'),
    small: getShadowVars('small'),
    medium: getShadowVars('medium'),
    large: getShadowVars('large'),
    'x-large': getShadowVars('x-large'),
}

// src/kylinbits.ts
var Themepro = class {
    constructor(scope, options) {
        this.dark = false
        this.vars = {}
        this.selector = ':host,:root'
        this.options = Object.assign(
            {
                selector: ':host,:root',
                theme: 'light',
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
        )
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
    _init() {
        this.attrObserver = new AttrObserver(
            this.scope,
            ['data-theme', 'data-primary', 'data-success', 'data-warning', 'data-danger', 'data-info'],
            this._onThemeAttrsChange.bind(this),
        )
        this._injectBaseStyles()
        this._createKeyColorStyles()
        this.update()
    }
    get size() {
        return this.scope.dataset.size || this.options.size || 'medium'
    }
    set size(value) {
        if (value === 'medium') {
            this.scope.removeAttribute('data-size')
        } else {
            this.scope.dataset.size = value
        }
    }
    get spacing() {
        return this.scope.dataset.spacing || this.options.spacing || 'medium'
    }
    set spacing(value) {
        if (value === 'medium') {
            this.scope.removeAttribute('data-spacing')
        } else {
            this.scope.dataset.spacing = value
        }
    }
    get shadow() {
        return this.scope.dataset.shadow || this.options.shadow || 'medium'
    }
    set shadow(value) {
        if (value === 'medium') {
            this.scope.removeAttribute('data-shadow')
        } else {
            this.scope.dataset.shadow = value
        }
    }
    get radius() {
        return this.scope.dataset.radius || this.options.radius || 'medium'
    }
    set radius(value) {
        if (value === 'medium') {
            this.scope.removeAttribute('data-radius')
        } else {
            this.scope.dataset.radius = value
        }
    }
    get theme() {
        return this.scope.dataset.theme || this.options.theme || 'light'
    }
    set theme(value) {
        if (value === 'medium') {
            this.scope.removeAttribute('data-theme')
        } else {
            this.scope.dataset.theme = value in presetThemes ? presetThemes[value].baseColor : toRGBString(value)
        }
    }
    /**
     * 当属性变化时，更新主题
     *
     * @param attrName
     * @param attrValue
     */
    _onThemeAttrsChange(attrName, attrValue) {
        if (attrName === 'data-theme') {
            this.update({ theme: attrValue || 'light' })
        }
    }
    /**
     *
     */
    update(options) {
        Object.assign(this.options, options)
        const { theme = 'light', size, radius, spacing, shadow } = this.options
        this.dark = false
        if (theme in presetThemes) {
            this.options.theme = presetThemes[theme].baseColor
        }
        this.size = size
        this.radius = radius
        this.spacing = spacing
        this.shadow = shadow
        const themeColorVars = this._createThemeColorVars()
        this.dark = isDark(this.theme)
        const themeName = theme
        const style = `${this.selector}[data-theme='${themeName}'],[data-theme='${themeName}']{
            ${`color-scheme: ${this.dark ? 'dark' : 'light'}`};
            ${Object.entries(themeColorVars)
                .map(([key, value]) => `${key}:${value}`)
                .join(';\n')};
            }`
        injectStylesheet(style, {
            id: `kylinbits-theme`,
        })
    }
    /**
     * 获取默认主题的样式字符串
     * @returns {string} 包含CSS变量和颜色模式的主题样式字符串
     * @private
     */
    _getDefaultThemeStyles() {
        const dark = isDark(presetThemes.light.baseColor)
        return `${this.selector}{
${`color-scheme: ${dark ? 'dark' : 'light'}`};
${toVarStyles(this._createThemeColorVars(presetThemes.light.baseColor))}
}
`
    }
    _createThemeColorVars(theme = this.theme) {
        const themeColor = theme in presetThemes ? presetThemes[theme].baseColor : theme
        const vars = generateGradientVars(themeColor, {
            prefix: '--t-color-theme-',
        })
        return vars
    }
    _createKeyColorStyles() {
        const variants = ['primary', 'success', 'warning', 'danger', 'info']
        const vars = {}
        variants.forEach((name) => {
            if (this.options[name]) {
                Object.assign(vars, generateGradientVars(this.options[name], { prefix: `--t-color-${name}-` }))
            }
        })
        injectStylesheet(
            `${this.selector}{
${toVarStyles(vars)}}
}
`,
            {
                id: 'kylinbits-keycolors',
            },
        )
    }
    _injectBaseStyles() {
        const baseStyles = `${this.selector}{
${toVarStyles(baseVars)}
${toVarStyles(derivedVars)}
}
`
        const sizeStyles = getVarsStyles(sizeVars, this.selector, 'data-size')
        const radiusStyles = getVarsStyles(radiusVars, this.selector, 'data-radius')
        const spacingStyles = getVarsStyles(spacingVars, this.selector, 'data-spacing')
        const shadowStyles = getVarsStyles(shadowVars, this.selector, 'data-shadow')
        const lightStyles = this._getDefaultThemeStyles()
        injectStylesheet(
            `${baseStyles}
${sizeStyles}
${radiusStyles}
${spacingStyles}
${shadowStyles}
${lightStyles}`,
            {
                id: 'kylinbits-vars',
            },
        )
    }
}
var themePro = new Themepro()
globalThis.ThemePro = themePro

// src/utils/isLight.ts
function isLight(color) {
    return isDark(color)
}
export {
    Themepro,
    generateGradientColors,
    getId,
    injectStylesheet,
    isDark,
    isLight,
    presetThemes,
    themePro,
    toRGB,
    toRGBString,
}
//# sourceMappingURL=index.js.map
