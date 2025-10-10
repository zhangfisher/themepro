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
import { ThemeAttrObserver } from '../observer'
import { presetThemes } from '../presets'
import type { ThemeOptions, ThemeSize } from '../types'
import { toRGBString } from '../utils/toRGBString'
import { ThemeScope } from './scope'

/**
 * 将ThemeScope挂载到指定的DOM元素上
 *
 * -监听元素的属性变化
 * - 直接修改元素的属性
 */
export class AttachedThemeScope extends ThemeScope {
    attrObserver!: ThemeAttrObserver
    _elRef: WeakRef<HTMLElement>
    constructor(el: HTMLElement, options?: ThemeOptions) {
        super(options)
        this._elRef = new WeakRef(el || document.documentElement)
    }
    get el() {
        const el = this._elRef.deref()
        if (el === undefined) {
        }
        return el
    }
    get size() {
        return (this.el?.dataset.size || this.options.size) as ThemeSize
    }
    set size(value: ThemeSize) {
        if (value === 'medium') {
            this.el?.removeAttribute('data-size')
        } else if (this.el) {
            this.el.dataset.size = value
        }
    }
    get dark() {
        return !!(this.el?.getAttribute('dark') || this.options.dark)
    }
    set dark(value: boolean) {
        if (value === false) {
            this.el?.removeAttribute('dark')
        } else {
            this.el?.setAttribute('dark', '')
        }
        this.options.dark = value
    }
    get spacing(): ThemeSize {
        return (this.el?.dataset.spacing || this.options.spacing) as ThemeSize
    }
    set spacing(value: ThemeSize) {
        if (value === 'medium') {
            this.el?.removeAttribute('data-spacing')
        } else if (this.el) {
            this.el.dataset.spacing = value
        }
        this.options.spacing = value
    }
    get shadow() {
        return (this.el?.dataset.shadow || this.options.shadow) as ThemeSize
    }
    set shadow(value: ThemeSize) {
        if (value === 'medium') {
            this.el?.removeAttribute('data-shadow')
        } else if (this.el) {
            this.el.dataset.shadow = value
        }
        this.options.shadow = value
    }
    get colorized() {
        return !!(this.el?.getAttribute('colorized') || this.options.colorized)
    }
    set colorized(value: boolean) {
        if (value === false) {
            this.el?.removeAttribute('colorized')
        } else {
            this.el?.setAttribute('colorized', '')
        }
        this.options.colorized = value
    }
    get radius(): ThemeSize {
        return (this.el?.dataset.radius || this.options.radius || 'medium') as ThemeSize
    }
    set radius(value: ThemeSize) {
        if (value === 'medium') {
            this.el?.removeAttribute('data-radius')
        } else if (this.el) {
            this.el.dataset.radius = value
        }
        this.options.radius = value
    }
    get themeColor(): string {
        return (this.el?.dataset.theme || this.options.themeColor || 'light') as string
    }
    set themeColor(value: string) {
        if (value === 'light') {
            this.el?.removeAttribute('data-theme')
        } else if (this.el) {
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
    private _onThemeAttrChange() {
        if (!this.el) return
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
    update(options?: Partial<ThemeOptions>) {
        if (!this.el) throw new Error(`ThemeScope<${this.id}> is not connect to HTMLElement`)
        super.update(options)
        const { size, radius, spacing, shadow, dark, colorized } = this.options
        this.size = size
        this.radius = radius
        this.spacing = spacing
        this.shadow = shadow
        this.dark = dark
        this.colorized = colorized
    }
    connect() {
        this._onThemeAttrChange()
        super.connect()
    }
    disconnect() {
        super.disconnect()
        this.attrObserver.disconnect()
    }
}
