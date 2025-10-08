import { ThemeScope } from './scope'
import type { ThemeOptions, ThemeSize } from './types'

export class ThemeManager {
    options: Required<ThemeOptions>
    vars: Record<string, string> = {}
    scopes: WeakMap<HTMLElement, ThemeScope> = new WeakMap()
    root!: ThemeScope
    constructor(scope?: string | HTMLElement, options?: ThemeOptions) {
        this.options = Object.assign(
            {
                id: 'root',
                selectors: [':host', ':root'],
                themeColor: 'light',
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
        this.addScope(scope || document.documentElement, this.options)
    }
    get size() {
        return this.root.size
    }
    set size(value: ThemeSize) {
        this.root.size = value
    }
    get dark() {
        return this.root.dark
    }
    set dark(value: boolean) {
        this.root.dark = value
    }
    get spacing(): ThemeSize {
        return this.root.spacing
    }
    set spacing(value: ThemeSize) {
        this.root.spacing = value
    }
    get shadow() {
        return this.root.shadow
    }
    set shadow(value: ThemeSize) {
        this.root.shadow = value
    }
    get colorized() {
        return this.root.colorized
    }
    set colorized(value: boolean) {
        this.root.colorized = value
    }
    get radius(): ThemeSize {
        return this.root.radius
    }
    set radius(value: ThemeSize) {
        this.root.radius = value
    }
    get themeColor(): string {
        return this.root.themeColor
    }
    set themeColor(value: string) {
        this.root.themeColor = value
    }
    /**
     * 更新主题
     */
    update(options?: ThemeOptions) {
        this.root.update(options)
    }
    addScope(el: string | HTMLElement, options?: ThemeOptions) {
        if (typeof el === 'string') {
            window.addEventListener('DOMContentLoaded', () => {
                const scopeEle = (document.querySelector(el) || document.documentElement) as HTMLElement
                if (!scopeEle) {
                    throw new Error(`${el} is not a valid selector or element`)
                }
                const scope = new ThemeScope(scopeEle, Object.assign({}, this.options, options))
                this.scopes.set(scopeEle, scope)
            })
        } else if (el instanceof HTMLElement) {
            const scope = new ThemeScope(el, Object.assign({}, this.options, options))
            this.scopes.set(el, scope)
            if (el === document.documentElement) {
                this.root = scope
            }
        }
    }
    removeScope(el: HTMLElement) {
        const scope = this.scopes.get(el)
        if (scope) {
            this.scopes.delete(el)
        }
    }
}

// 创建默认的主题应用
export const themePro = new ThemeManager()

globalThis.ThemePro = themePro

declare global {
    var ThemePro: typeof themePro
}
