import { consume } from "@lit/context";
import { ThemeProContext, type ThemeProStore } from "../context";
import { property } from "lit/decorators.js";
import { getVal, type StateOperate } from "autostore";
import { KylinElementBase } from "./base";
export class KylinStateElement<
    State extends Record<string, any> = Record<string, any>
> extends KylinElementBase<State> {
    @consume({ context: ThemeProContext })
    @property({ attribute: false })
    store!: ThemeProStore;

    @property({ type: String })
    stateKey?: string;

    // 监听状态额外的属性，如['sidebar.collapsed']
    watchKeys: string[] = [];

    subscribers: any[] = [];

    connectedCallback(): void {
        this._watchStates();
        super.connectedCallback();
    }
    disconnectedCallback(): void {
        this._offWatchState();
        super.disconnectedCallback();
    }
    refresh() {
        super.refresh();
        this._offWatchState();
        this._watchStates();
    }
    /**
     * 监听状态变化并设置初始状态值
     *
     * 根据stateKey和watchKeys配置监听状态变化：
     * 1. 如果stateKey以'/'结尾，则只监听该键的变化
     * 2. 否则监听该键及其所有子属性的变化
     * 3. 合并watchKeys中指定的其他监听键
     * 4. 可以通过,分割多个键
     *
     * 同时会设置初始状态值到this.state
     *
     * @private 这是一个内部方法
     */
    private _watchStates() {
        const watchKeys = [];
        const stateKey = this.stateKey
            ? this.stateKey.endsWith("/")
                ? this.stateKey.substring(0, this.stateKey.length - 1)
                : this.stateKey
            : undefined;
        if (stateKey) {
            // 如果stateKey以/结尾，则只监听stateKey变化，而不监听stateKey下的所有子属性变化
            if (this.stateKey!.endsWith("/")) {
                watchKeys.push(stateKey);
            } else {
                watchKeys.push(`${this.stateKey}.**`);
            }
        }
        if (this.watchKeys && this.watchKeys.length > 0)
            watchKeys.push(...this.watchKeys);
        if (stateKey && stateKey.length > 0) {
            this.state = getVal(this.store?.state, stateKey, {});
        }
        if (watchKeys.length > 0) {
            this.subscribers.push(
                this.store.watch(watchKeys, (operate) => {
                    if (operate.reply) return;
                    this._onStateUpdate(operate);
                })
            );
        }
    }
    private _offWatchState() {
        this.subscribers.forEach((subscriber) => {
            subscriber?.off();
        });
    }

    private _onStateUpdate(operate: StateOperate) {
        this.onStateUpdate(operate);
        this.requestUpdate();
    }
    /**
     * 当组件的状态数据更新时触发
     * @param operate
     */
    onStateUpdate(_operate: StateOperate) {}
}
