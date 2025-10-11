import { ThemeProError } from './errors'
import { AttachedThemeScope } from './scopes'
import { ThemeScope } from './scopes/scope'
import type { ThemeOptions, ThemeSize } from './types'

export type ThemeManagerOptions = {
    storageKey?: string
    scopes?: ThemeOptions[]
}
export class ThemeManager {
    vars: Record<string, string> = {}
    scopes?: Record<string, ThemeScope>
    root: AttachedThemeScope
    options: Required<ThemeManagerOptions>
    constructor(options?: ThemeManagerOptions) {
        this.options = Object.assign({}, options) as Required<ThemeManagerOptions>
        this.root = this._createRootScope()
    }
    get id() {
        return this.root.id
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
    private _createRootScope() {
        return new AttachedThemeScope(document.documentElement, {
            id: 'root',
            cssSelectors: [':host', ':root'],
        })
    }
    hasScope(id: string) {
        return id in (this.scopes || {})
    }
    /**
     * 创建主题作用域
     * addScope("#sidebar",{
     *     id:'sidebar',
     * })
     * @param elementSelector
     * @param options
     * @returns
     */
    addScope(options: ThemeOptions) {
        const { id } = options
        if (this.hasScope(id)) throw new ThemeProError(`Scope<${id}> already exists`)
        if (!this.scopes) this.scopes = {}
        const scope = new ThemeScope(options)
        this.scopes[id] = scope
        return scope
    }
    removeScope(id: string) {
        const scope = this.scopes?.[id]
        if (scope) {
            scope.disconnect()
            delete this.scopes?.[id]
        }
    }
}

// 创建默认的主题应用
export const themeManager = new ThemeManager()

globalThis.ThemePro = themeManager

declare global {
    var ThemePro: typeof themeManager
}
