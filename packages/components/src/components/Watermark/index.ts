/**
 * AutoWatermark 组件
 * 自动充满父组件并显示水印文本
 *
 * 使用示例：
 * <auto-watermark text="水印文字" opacity="0.1" color="#000000"></auto-watermark>
 */
import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";

@customElement("auto-watermark")
export class AutoWatermark extends LitElement {
    static styles = css`
        :host {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
            z-index: -999;
        }

        .watermark-container {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .watermark-item {
            position: absolute;
            transform-origin: center;
            user-select: none;
            white-space: nowrap;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.1);
            pointer-events: none;
        }
    `;

    @property({ type: String })
    text: string = "ThemePro";

    @property({ type: Number })
    opacity: number = 0.1;

    @property({ type: String })
    color: string = "#000000";

    @property({ type: Number })
    fontSize: number = 14;

    @property({ type: Number })
    rotate: number = -45;

    @property({ type: Number })
    gap: number = 100;

    private watermarks: Array<{ x: number; y: number }> = [];

    private generateWatermarkPositions() {
        this.watermarks = [];

        // 获取容器尺寸
        const containerWidth = this.clientWidth || 800;
        const containerHeight = this.clientHeight || 600;

        const cols = Math.ceil(containerWidth / this.gap) + 2;
        const rows = Math.ceil(containerHeight / this.gap) + 2;

        // 生成水印位置
        for (let row = -1; row < rows; row++) {
            for (let col = -1; col < cols; col++) {
                const x = col * this.gap;
                const y = row * this.gap;
                this.watermarks.push({ x, y });
            }
        }
    }

    render() {
        this.generateWatermarkPositions();

        const textColor = this.hexToRgba(this.color, this.opacity);

        return html`
            <div class="watermark-container">
                ${this.watermarks.map(
                    (pos) =>
                        html`
                            <div
                                class="watermark-item"
                                style="
                                left: ${pos.x}px;
                                top: ${pos.y}px;
                                color: ${textColor};
                                font-size: ${this.fontSize}px;
                                transform: rotate(${this.rotate}deg);
                            "
                            >
                                ${this.text}
                            </div>
                        `
                )}
            </div>
        `;
    }

    private hexToRgba(hex: string, alpha: number): string {
        // 移除 # 号
        hex = hex.replace("#", "");

        // 处理简写形式
        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((char) => char + char)
                .join("");
        }

        // 解析 RGB 值
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // 监听窗口大小变化
    connectedCallback() {
        super.connectedCallback();
        this.updateWatermarks = this.updateWatermarks.bind(this);
        window.addEventListener("resize", this.updateWatermarks);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("resize", this.updateWatermarks);
    }

    private updateWatermarks() {
        this.requestUpdate();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "auto-watermark": AutoWatermark;
    }
}
