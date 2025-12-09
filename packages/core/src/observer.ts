import type { ThemeScope } from './scope'

const themeAttrs: string[] = [
    'data-theme',
    'data-border',
    'data-primary',
    'data-success',
    'data-warning',
    'data-danger',
    'data-info',
]

/**
 *
 * 监听DOM元素的指定属性变化，并在属性变化时重新生成主题
 *
 * const observer = new ThemeObserver(scope, el)
 *
 */
export class ThemeObserver {
    observer: MutationObserver | null = null
    connected: boolean = false
    constructor(
        public scope: ThemeScope,
        public el: HTMLElement,
    ) {
        this.connect()
    }
    private _onThemeAttrChange(attrName: string, attrValue: string | null) {
        if (!attrValue) return
        const themeAttr = attrName.replace('data-', '')
        this.scope.update({ [themeAttr === 'theme' ? 'themeColor' : themeAttr]: attrValue })
    }
    connect() {
        if (this.connected) return
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName &&
                    themeAttrs.includes(mutation.attributeName)
                ) {
                    const newValue = this.el.getAttribute(mutation.attributeName)
                    this._onThemeAttrChange(mutation.attributeName, newValue)
                }
            })
        })
        this.observer.observe(this.el, {
            attributes: true,
            attributeFilter: themeAttrs,
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
