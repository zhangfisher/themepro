import type { ReactiveController } from 'lit'

/**
 * Resizeable 控制器
 *
 * 用于为 LitElement 元素增加拖动调整尺寸的功能
 *
 * 使用示例:
 * ```typescript
 * class MyElement extends LitElement {
 *     private resizeable = new Resizeable(this, {
 *         direction: 'all',
 *         minWidth: 100,
 *         minHeight: 100,
 *         maxWidth: 800,
 *         maxHeight: 600
 *     });
 *
 *     constructor() {
 *         super();
 *         this.addEventListener('resize', (e: ResizeEvent) => {
 *             console.log(`New size: ${e.detail.width}x${e.detail.height}`);
 *         });
 *     }
 * }
 * ```
 */

export type ResizeableOptions = {
    direction: 'all' | 'left' | 'right' | 'top' | 'bottom'
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
}

export type ResizeEventDetail = {
    width: number
    height: number
}

export type ResizeEvent = CustomEvent<ResizeEventDetail>

export class Resizeable implements ReactiveController {
    host: HTMLElement
    options: ResizeableOptions = {
        direction: 'all',
    }
    private _enable: boolean = true
    // 拖动状态跟踪
    private isDragging = false
    private currentDirection: string | null = null
    private startX = 0
    private startY = 0
    private startWidth = 0
    private startHeight = 0
    private originalCursor = ''

    // 事件处理器绑定
    private boundMouseDown: (e: MouseEvent) => void
    private boundMouseMove: (e: MouseEvent) => void
    private boundMouseUp: () => void
    private boundMouseOver: (e: MouseEvent) => void
    private boundElementMouseMove: (e: MouseEvent) => void
    constructor(host: any, options?: ResizeableOptions) {
        this.host = host
        host.addController(this)
        if (options) {
            Object.assign(this.options, options)
        }
        // 绑定事件处理器
        this.boundMouseDown = this.handleMouseDown.bind(this)
        this.boundMouseMove = this.handleMouseMove.bind(this)
        this.boundMouseUp = this.handleMouseUp.bind(this)
        this.boundMouseOver = this.handleMouseOver.bind(this)
        this.boundElementMouseMove = this.handleElementMouseMove.bind(this)
    }

    hostConnected() {
        // 保存原始光标样式
        this.originalCursor = this.host.style.cursor

        // 添加事件监听器
        this.host.addEventListener('mousedown', this.boundMouseDown)
        this.host.addEventListener('mouseover', this.boundMouseOver)
        this.host.addEventListener('mousemove', this.boundElementMouseMove)
        this.host.addEventListener('mouseout', () => {
            if (!this.isDragging) {
                this.host.style.cursor = this.originalCursor
            }
        })
    }

    hostDisconnected() {
        // 移除事件监听器
        this.host.removeEventListener('mousedown', this.boundMouseDown)
        this.host.removeEventListener('mouseover', this.boundMouseOver)
        this.host.removeEventListener('mousemove', this.boundElementMouseMove)
        document.removeEventListener('mousemove', this.boundMouseMove)
        document.removeEventListener('mouseup', this.boundMouseUp)

        // 恢复原始光标样式
        this.host.style.cursor = this.originalCursor
    }

    /**
     * 处理鼠标悬停，根据位置设置光标样式
     */
    private handleMouseOver(e: MouseEvent) {
        if (!this._enable) return
        if (this.isDragging) return

        const direction = this.getResizeDirection(e)
        if (direction) {
            this.setCursorForDirection(direction)
        } else {
            this.host.style.cursor = this.originalCursor
        }
    }

    /**
     * 处理元素内部的鼠标移动，更新光标样式
     */
    private handleElementMouseMove(e: MouseEvent) {
        if (!this._enable) return
        if (this.isDragging)
            // 如果正在拖动中，不处理光标样式
            return

        const direction = this.getResizeDirection(e)
        if (direction) {
            this.setCursorForDirection(direction)
        } else {
            // 如果鼠标不在边缘区域，恢复默认光标
            this.host.style.cursor = this.originalCursor
        }
    }

    /**
     * 处理鼠标按下事件，开始拖动
     */
    private handleMouseDown(e: MouseEvent) {
        if (!this._enable) return
        const direction = this.getResizeDirection(e)
        if (!direction) return

        if ('getResizeableOptions' in this.host && typeof (this.host as any).getResizeableOptions === 'function') {
            // 检查并更新配置
            const newOptions = (this.host as any).getResizeableOptions()
            if (newOptions) {
                Object.assign(this.options, newOptions)
            }
        }

        // 阻止默认行为和冒泡
        e.preventDefault()
        e.stopPropagation()

        // 设置拖动状态
        this.isDragging = true
        this.currentDirection = direction
        this.startX = e.clientX
        this.startY = e.clientY
        this.startWidth = this.host.offsetWidth
        this.startHeight = this.host.offsetHeight

        // 添加dragging类
        this.host.classList.add('dragging')

        // 设置光标样式
        this.setCursorForDirection(direction)

        // 添加全局事件监听器
        document.addEventListener('mousemove', this.boundMouseMove)
        document.addEventListener('mouseup', this.boundMouseUp)
    }

    /**
     * 处理鼠标移动事件，调整大小
     */
    private handleMouseMove(e: MouseEvent) {
        if (!this._enable) return
        if (!this.isDragging || !this.currentDirection) return

        e.preventDefault()

        let newWidth = this.startWidth
        let newHeight = this.startHeight
        let newLeft = this.host.offsetLeft
        let newTop = this.host.offsetTop

        if (this.currentDirection.includes('right')) {
            // 计算新尺寸
            newWidth = this.startWidth + (e.clientX - this.startX)
        } else if (this.currentDirection.includes('left')) {
            const deltaX = this.startX - e.clientX
            newWidth = this.startWidth + deltaX
            if (newWidth >= (this.options.minWidth || 10)) {
                newLeft = this.host.offsetLeft - deltaX
            }
        }

        if (this.currentDirection.includes('bottom')) {
            newHeight = this.startHeight + (e.clientY - this.startY)
        } else if (this.currentDirection.includes('top')) {
            const deltaY = this.startY - e.clientY
            newHeight = this.startHeight + deltaY
            if (newHeight >= (this.options.minHeight || 10)) {
                newTop = this.host.offsetTop - deltaY
            }
        }

        // 应用尺寸约束
        newWidth = this.applyWidthConstraints(newWidth)
        newHeight = this.applyHeightConstraints(newHeight)

        // 应用新尺寸
        this.host.style.width = `${newWidth}px`
        this.host.style.height = `${newHeight}px`
        this.host.style.left = `${newLeft}px`
        this.host.style.top = `${newTop}px`
        this._onResize(newWidth, newHeight)
        // 触发 resize 事件
        this.dispatchResizeEvent(newWidth, newHeight)
    }
    /**
     * 处理鼠标释放事件，结束拖动
     */
    private handleMouseUp() {
        if (!this._enable) return
        this.isDragging = false
        this.currentDirection = null
        // 移除全局事件监听器
        document.removeEventListener('mousemove', this.boundMouseMove)
        document.removeEventListener('mouseup', this.boundMouseUp)

        // 移除dragging类
        this.host.classList.remove('dragging')
    }

    private _onResize(width: number, height: number) {
        if ('onResize' in this.host && typeof (this.host as any).onResize === 'function') {
            ;(this.host as any).onResize({ width, height })
        }
    }

    /**
     * 根据鼠标位置确定调整方向
     */
    private getResizeDirection(e: MouseEvent): string | null {
        const { direction } = this.options
        const rect = this.host.getBoundingClientRect()
        const borderSize = 8 // 边缘检测区域大小

        const isNearLeft = e.clientX - rect.left < borderSize
        const isNearRight = rect.right - e.clientX < borderSize
        const isNearTop = e.clientY - rect.top < borderSize
        const isNearBottom = rect.bottom - e.clientY < borderSize

        if (direction === 'all') {
            if (isNearRight && isNearBottom) return 'right-bottom'
            if (isNearLeft && isNearBottom) return 'left-bottom'
            if (isNearRight && isNearTop) return 'right-top'
            if (isNearLeft && isNearTop) return 'left-top'
            if (isNearRight) return 'right'
            if (isNearLeft) return 'left'
            if (isNearBottom) return 'bottom'
            if (isNearTop) return 'top'
        } else {
            // 单方向调整
            if (direction === 'left' && isNearLeft) return 'left'
            if (direction === 'right' && isNearRight) return 'right'
            if (direction === 'top' && isNearTop) return 'top'
            if (direction === 'bottom' && isNearBottom) return 'bottom'
        }

        return null
    }

    /**
     * 根据方向设置光标样式
     */
    private setCursorForDirection(direction: string) {
        switch (direction) {
            case 'left':
            case 'right':
                this.host.style.cursor = 'ew-resize'
                break
            case 'top':
            case 'bottom':
                this.host.style.cursor = 'ns-resize'
                break
            case 'right-bottom':
            case 'left-top':
                this.host.style.cursor = 'nwse-resize'
                break
            case 'right-top':
            case 'left-bottom':
                this.host.style.cursor = 'nesw-resize'
                break
            default:
                this.host.style.cursor = this.originalCursor
        }
    }

    /**
     * 应用宽度约束
     */
    private applyWidthConstraints(width: number): number {
        const { minWidth, maxWidth } = this.options

        if (minWidth !== undefined && width < minWidth) {
            return minWidth
        }

        if (maxWidth !== undefined && width > maxWidth) {
            return maxWidth
        }

        return Math.max(width, 10) // 确保最小宽度为10px
    }

    /**
     * 应用高度约束
     */
    private applyHeightConstraints(height: number): number {
        const { minHeight, maxHeight } = this.options

        if (minHeight !== undefined && height < minHeight) {
            return minHeight
        }

        if (maxHeight !== undefined && height > maxHeight) {
            return maxHeight
        }

        return Math.max(height, 10) // 确保最小高度为10px
    }

    /**
     * 触发 resize 事件
     */
    private dispatchResizeEvent(width: number, height: number) {
        const event = new CustomEvent<ResizeEventDetail>('resize', {
            bubbles: true,
            composed: true,
            detail: { width, height },
        })

        this.host.dispatchEvent(event)
    }
    get enable() {
        return this._enable
    }
    set enable(value: boolean) {
        this._enable = value
        if (!value) this.host.style.cursor = this.originalCursor
    }
}
