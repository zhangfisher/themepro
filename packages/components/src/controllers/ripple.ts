import type { ReactiveController } from 'lit'

/**
 * 点击时显示波纹效果
 */
export class Ripple implements ReactiveController {
    host: any
    color?: string
    private clickHandler: (event: MouseEvent) => void
    private styleElement: HTMLStyleElement | null = null

    constructor(host: any, color?: string) {
        this.host = host
        this.host.addController(this)
        this.color = color

        // 定义点击处理函数
        this.clickHandler = this.handleClick.bind(this)
    }

    /**
     * 创建并添加样式元素（只添加一次）
     */
    private _createStyles() {
        // 如果样式已经存在，则不重复创建
        if (this.styleElement) return

        this.styleElement = document.createElement('style')
        this.styleElement.innerHTML = `
            .has-ripple {
                position: absolute; 
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
                animation: ripple 600ms ease-out;
                background-color: rgba(255, 255, 255, 0.7);
            }

            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `

        // 将样式添加到宿主元素的 shadowRoot
        if (this.host.shadowRoot) {
            this.host.shadowRoot.appendChild(this.styleElement)
        }
    }

    /**
     * 处理点击事件
     */
    private handleClick(event: MouseEvent) {
        const target = event.target as HTMLElement
        // 修正：检查目标元素是否包含 ripple 类
        if (!target || !target.classList.contains('ripple')) return

        const el = this.host

        // 检查元素的 position 属性
        const position = window.getComputedStyle(target).position
        if (!position || position === 'static') {
            target.style.position = 'relative'
        }

        // 创建涟漪元素
        const diameter = Math.max(el.clientWidth || 0, el.clientHeight || 0)
        const radius = diameter / 2
        const rect = target.getBoundingClientRect()
        const left = event.clientX - rect.left - radius
        const top = event.clientY - rect.top - radius

        const ripple = document.createElement('div')
        ripple.classList.add('has-ripple')
        if (this.color) ripple.style.backgroundColor = this.color

        // 设置涟漪位置
        ripple.style.left = `${left}px`
        ripple.style.top = `${top}px`
        ripple.style.width = `${diameter}px`
        ripple.style.height = `${diameter}px`

        // 涟漪播放完移除
        ripple.addEventListener('animationend', () => {
            ripple.remove()
        })

        // 添加涟漪到元素
        target.appendChild(ripple)
    }

    /**
     * 当宿主元素连接到DOM时调用的生命周期方法
     */
    hostConnected() {
        // 创建样式
        this._createStyles()

        // 添加点击事件监听器
        if (this.host.shadowRoot) {
            this.host.shadowRoot.addEventListener('click', this.clickHandler)
        }
    }

    hostDisconnected() {
        // 移除事件监听器，防止内存泄漏
        if (this.host.shadowRoot) {
            this.host.shadowRoot.removeEventListener('click', this.clickHandler)
        }

        // 移除样式元素
        if (this.styleElement?.parentNode) {
            this.styleElement.parentNode.removeChild(this.styleElement)
            this.styleElement = null
        }
    }

    hostUpdate(): void {
        // 不在更新时添加事件监听器，避免重复
    }
}
