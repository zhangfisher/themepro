import { consume } from '@lit/context'
import { ThemeProContext, type ThemeProStore } from '../context'
import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { toKebabCase } from '@/utils/toKebabCase'
import { getVal, type StateOperate } from 'autostore'

export class AutoStateElement<State extends Record<string, any> = Record<string, any>> extends LitElement {
    @consume({ context: ThemeProContext })
    @property({ attribute: false })
    store!: ThemeProStore

    @property({ type: String })
    stateKey?: string
    /**
     * 反射属性，用于将state中的值反射到元素的属性中
     *
     * - 全部反射：reflectAttrs="all"
     * - 指定反射：reflectAttrs="path1,path2,a.b.c,fromPath:attrName"
     */
    reflectAttrs?: string

    /**
     * 当前组件的
     */
    @property({ type: Object })
    state?: State

    // 监听状态额外的属性，如['sidebar.collapsed']
    watchKeys: string[] = []

    subscribers: any[] = []

    get shadow() {
        return this.shadowRoot!
    }

    private applyValueToElement(key: string, value: unknown) {
        const attr = toKebabCase(key)
        // 布尔与空值优先处理：布尔用存在性表示，空值删除属性
        if (typeof value === 'boolean') {
            if (value) {
                this.setAttribute(attr, '')
            } else {
                this.removeAttribute(attr)
            }
        } else if (value === null || value === undefined) {
            this.removeAttribute(attr)
        } else if (typeof value === 'string' || typeof value === 'number') {
            this.setAttribute(attr, String(value))
        }
    }

    private syncStateToAttrs() {
        if (!this.renderRoot) return
        Object.entries(this.state ?? {}).forEach(([key, value]) => {
            this.applyValueToElement(key, value)
        })
    }

    protected firstUpdated(): void {
        // 初次渲染后同步
        this.syncStateToAttrs()
    }

    protected updated(changed: Map<string | number | symbol, unknown>): void {
        // 当 props 引用发生变化时，同步到具有同名属性的元素
        if (changed.has('state')) {
            this.syncStateToAttrs()
        }
    }

    connectedCallback(): void {
        super.connectedCallback()
        this._watchStates()
        // 在已连接阶段确保存在时也进行一次兜底同步（如自定义渲染时机不同步）
        queueMicrotask(() => this.syncStateToAttrs())
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
        this._offWatchState()
    }
    refresh() {
        this._offWatchState()
        this._watchStates()
        this.requestUpdate()
    }
    /**
     * 监听状态变化并设置初始状态值
     *
     * 根据stateKey和watchKeys配置监听状态变化：
     * 1. 如果stateKey以'/'结尾，则只监听该键的变化
     * 2. 否则监听该键及其所有子属性的变化
     * 3. 合并watchKeys中指定的其他监听键
     *
     * 同时会设置初始状态值到this.state
     *
     * @private 这是一个内部方法
     */
    private _watchStates() {
        const watchKeys = []
        const stateKey = this.stateKey
            ? this.stateKey.endsWith('/')
                ? this.stateKey.substring(0, this.stateKey.length - 1)
                : this.stateKey
            : undefined
        if (stateKey) {
            // 如果stateKey以/结尾，则只监听stateKey变化，而不监听stateKey下的所有子属性变化
            if (this.stateKey!.endsWith('/')) {
                watchKeys.push(stateKey)
            } else {
                watchKeys.push(`${this.stateKey}.**`)
            }
        }
        if (this.watchKeys && this.watchKeys.length > 0) watchKeys.push(...this.watchKeys)
        if (stateKey && stateKey.length > 0) {
            this.state = getVal(this.store?.state, stateKey, {})
        }
        if (watchKeys.length > 0) {
            this.subscribers.push(
                this.store.watch(watchKeys, (operate) => {
                    if (operate.reply) return
                    this._onStateUpdate(operate)
                }),
            )
        }
    }
    private _offWatchState() {
        this.subscribers.forEach((subscriber) => {
            subscriber?.off()
        })
    }

    private _onStateUpdate(operate: StateOperate) {
        this.onStateUpdate(operate)
        this.requestUpdate()
    }
    /**
     * 当组件的状态数据更新时触发
     * @param operate
     */
    onStateUpdate(_operate: StateOperate) {}
}
