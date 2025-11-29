import { LitElement, html } from "lit";
import { TooltipController } from "../../controllers/tooltip";

/**
 * TooltipDemo - 用于 Storybook 演示的基础组件
 */
class TooltipDemo extends LitElement {
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

customElements.define("tooltip-demo", TooltipDemo);

export default TooltipDemo;
