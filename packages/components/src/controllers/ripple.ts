import { css, type ReactiveController } from 'lit'

export const RippleStyle = css`
    /* 涟漪容器：充满目标元素，裁剪越界内容 */
    .ripple-container {
        position: absolute;
        inset: 0;
        overflow: hidden;
        border-radius: inherit;
        pointer-events: none;
        z-index: 1;
    }
    /* 涟漪本体 */
    .ripple {
        position: absolute; 
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        animation: ripple 300ms ease-out;
        background-color: rgba(255, 255, 255, 0.7);
        will-change: transform, opacity;
    }

    @keyframes ripple {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`
/**
 * 点击时显示波纹效果
 */
export class Ripple implements ReactiveController {
    host: any
    color?: string = 'red'
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
            /* 涟漪容器：充满目标元素，裁剪越界内容 */
            .ripple-container {
                position: absolute;
                inset: 0;
                overflow: hidden;
                border-radius: inherit;
                pointer-events: none;
                z-index: 1;
            }
            /* 涟漪本体 */
            .ripple {
                position: absolute; 
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                pointer-events: none;
                animation: ripple 300ms ease-out;
                background-color: rgba(255, 255, 255, 0.7);
                will-change: transform, opacity;
            }

            @keyframes ripple {
                from {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                to {
                    transform: translate(-50%, -50%) scale(2);
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
        const rect = this.host.getBoundingClientRect()
        const left = event.clientX - rect.left
        const top = event.clientY - rect.top

        // 查找或创建涟漪容器（充满目标元素并裁剪越界）
        let container = this.host.shadowRoot.querySelector('.ripple-container') as HTMLDivElement | null
        // 确保宿主用于定位
        if (getComputedStyle(this.host).position === 'static') {
            this.host.style.position = 'relative'
        }
        if (!container) {
            container = document.createElement('div')
            container.className = 'ripple-container'
            this.host.shadowRoot.appendChild(container)
        }
        const ripple = document.createElement('div')
        ripple.classList.add('ripple')
        if (this.color) ripple.style.backgroundColor = this.color

        // 以点击坐标为起点，计算足够覆盖按钮的半径大小
        const size = Math.max(rect.width, rect.height)
        ripple.style.width = `${size}px`
        ripple.style.height = `${size}px`
        ripple.style.left = `${left}px`
        ripple.style.top = `${top}px`
        ripple.style.transform = 'translate(-50%, -50%) scale(0)'

        ripple.addEventListener('animationend', () => {
            ripple.remove()
        })

        // 将涟漪添加到容器中
        container.appendChild(ripple)
    }

    /**
     * 当宿主元素连接到DOM时调用的生命周期方法
     */
    hostConnected() {
        // 创建样式
        this._createStyles()

        // 添加点击事件监听器到宿主元素，保证任意位置点击都能触发
        this.host.addEventListener('click', this.clickHandler)
    }

    hostDisconnected() {
        // 从宿主元素移除事件监听器，防止内存泄漏
        this.host.removeEventListener('click', this.clickHandler)

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
