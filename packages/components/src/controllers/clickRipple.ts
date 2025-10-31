/**
 *
 * 在元素点击时显示涟漪动画
 *
 *
 * 使用方法：
 *
 * - 标准用法
 *
 * import {rippleStyles, Ripple } from './ripple'
 *
 * class MyComponent extends LitElement{
 *     static styles= [
 *          rippleStyles
 *     ]
 *     ripple = new Ripple(this)
 * }
 *
 *  重点：需要引入rippleStyles，并将其添加到组件的样式中，之所以如此的方式是为了避免在每次点击时都重新生成，节约资源
 *
 *
 */
import { css, type ReactiveController } from 'lit'

export const clickRippleStyles = css`
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
        animation: ripple 500ms ease-out;
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
export class ClickRipple implements ReactiveController {
    static styles = clickRippleStyles
    host: any
    color?: string
    selector?: string
    center: boolean = false
    private clickHandler: (event: MouseEvent) => void

    constructor(host: any, color?: string) {
        this.host = host
        this.host.addController(this)
        this.color = color
        this.clickHandler = this.handleClick.bind(this)
    }
    /**
     * 处理点击事件
     */
    private handleClick(event: MouseEvent) {
        const rect = this.host.getBoundingClientRect()
        let left = event.clientX - rect.left
        let top = event.clientY - rect.top

        if (this.center) {
            left = rect.width / 2
            top = rect.height / 2
        }

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
            container.remove()
        })

        // 将涟漪添加到容器中
        container.appendChild(ripple)
    }
    /**
     * 当宿主元素连接到DOM时调用的生命周期方法
     */
    hostConnected() {
        // 添加点击事件监听器到宿主元素，保证任意位置点击都能触发
        this.host.addEventListener('click', this.clickHandler)
    }

    hostDisconnected() {
        // 从宿主元素移除事件监听器，防止内存泄漏
        this.host.removeEventListener('click', this.clickHandler)
    }
}
