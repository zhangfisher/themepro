import { LitElement, html } from "lit";
import { TooltipController } from "../../controllers/tooltip";

/**
 * TooltipCacheDemo - 用于演示 tooltip 缓存复用机制
 */
class TooltipCacheDemo extends LitElement {
    // 创建 TooltipController 实例
    tooltip = new TooltipController(this, {
        trigger: "mouseover",
        placement: "top",
        arrow: true,
        animationDuration: 150,
    });

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define("tooltip-cache-demo", TooltipCacheDemo);

export default TooltipCacheDemo;
