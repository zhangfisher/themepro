/**
 *
 * 监听DOM元素的指定属性变化，并执行回调函数
 *
 */
export class ThemeAttrObserver {
    observer: MutationObserver | null = null
    connected: boolean = false
    constructor(
        public el: HTMLElement,
        public attrs: string[],
        public callback: (attrName: string, attrValue: string | null, target: HTMLElement) => void,
    ) {
        if (!el || !(el instanceof Element)) {
            throw new Error('第一个参数必须是一个DOM元素')
        }

        if (!Array.isArray(attrs)) {
            throw new Error('第二个参数必须是一个属性名称数组')
        }

        if (typeof callback !== 'function') {
            throw new Error('第三个参数必须是一个回调函数')
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
