import { LitElement, html, css } from "lit";
import { TooltipController } from "../../controllers/tooltip";

/**
 * WebComponentDemo - 演示在独立 Web Component 中使用 TooltipController
 *
 * 这个组件展示了如何在自己的 Web Component 中集成 Tooltip 功能
 */
class WebComponentDemo extends LitElement {
    // 创建 TooltipController 实例
    // 所有子元素中有 data-tooltip 属性的元素都会自动获得提示功能
    tooltip = new TooltipController(this, {
        trigger: "mouseover",
        placement: "top",
        arrow: true,
        animationDuration: 150,
    });

    render() {
        return html`
            <div class="demo-container">
                <h3>在独立 Web Component 中使用 Tooltip</h3>
                <p>这个组件使用 TooltipController 为子元素添加提示功能</p>

                <div class="button-group">
                    <button
                        data-tooltip="这是通过 TooltipController 添加的提示"
                        class="demo-button"
                    >
                        鼠标悬停查看提示
                    </button>

                    <button
                        data-tooltip="我可以包含 <strong>HTML</strong> 内容"
                        class="demo-button"
                    >
                        HTML 内容提示
                    </button>

                    <button
                        data-tooltip="底部显示"
                        data-tooltip-placement="bottom"
                        class="demo-button"
                    >
                        底部提示
                    </button>

                    <button
                        data-tooltip="点击触发"
                        data-tooltip-trigger="click"
                        class="demo-button"
                    >
                        点击触发提示
                    </button>
                </div>

                <div class="info-box">
                    <h4>使用方法：</h4>
                    <pre><code>import { TooltipController } from './controllers/tooltip';

class MyComponent extends LitElement {
    tooltip = new TooltipController(this, {
        trigger: 'mouseover',
        placement: 'top',
        arrow: true,
    });

    render() {
        return html\`
            &lt;button data-tooltip="提示内容"&gt;
                按钮
            &lt;/button&gt;
        \`;
    }
}</code></pre>
                </div>
            </div>
        `;
    }

    static styles = css`
        :host {
            display: block;
        }

        .demo-container {
            padding: 40px;
            max-width: 900px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                "Helvetica Neue", Arial, sans-serif;
        }

        h3 {
            color: #333;
            margin-bottom: 8px;
            font-size: 24px;
        }

        p {
            color: #666;
            margin-bottom: 24px;
            font-size: 14px;
        }

        .button-group {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 32px;
        }

        .demo-button {
            padding: 12px 24px;
            border: 1px solid #d1d5db;
            background: white;
            color: #374151;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .demo-button:hover {
            background: #f9fafb;
            border-color: #9ca3af;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
        }

        .demo-button:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .info-box {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 24px;
            margin-top: 24px;
        }

        .info-box h4 {
            color: #111827;
            margin: 0 0 16px 0;
            font-size: 16px;
            font-weight: 600;
        }

        .info-box pre {
            margin: 0;
            background: #1f2937;
            border-radius: 6px;
            overflow: hidden;
        }

        .info-box code {
            display: block;
            padding: 16px;
            color: #e5e7eb;
            font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
                "source-code-pro", monospace;
            font-size: 13px;
            line-height: 1.6;
            overflow-x: auto;
        }
    `;
}

// 注册自定义元素
customElements.define("webcomponent-demo", WebComponentDemo);

export default WebComponentDemo;
