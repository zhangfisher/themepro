import { ThemeProError } from './errors'

/**
 *
 * 监听DOM元素的指定属性变化，并执行回调函数
 *
 */
export class AttrObserver {
    observer: MutationObserver | null = null
    connected: boolean = false
    constructor(
        public el: HTMLElement,
        public attrs: string[],
        public callback: (attrName: string, attrValue: string | null, target: HTMLElement) => void,
    ) {
        if (!el || !(el instanceof HTMLElement)) {
            throw new ThemeProError('AttrObserver: el must be a valid HTMLElement')
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
