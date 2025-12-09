/**
 *
 * <auto-button>确定</auto-button>
 * <auto-button type="primary">取消</auto-button>
 * <auto-button type="success">确定</auto-button>
 * <auto-button type="warning">确定</auto-button>
 * <auto-button type="d">确定</auto-button>
 * <auto-button type="info">确定</auto-button>
 *
 *
 */
import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { styleMap } from 'lit/directives/style-map.js'
import { classMap } from 'lit/directives/class-map.js'
import { styles } from './styles'

@customElement('auto-icon')
export class AutoIcon extends LitElement {
    static styles = styles

    @property({ type: String })
    size?: string

    @property({ type: String })
    name: string = 'star'

    @property({ type: String })
    color?: string

    @property({ type: String })
    rotate?: string

    @property({ type: Number })
    strokeWidth?: number

    render() {
        return html`
            <div class="${classMap({
                'auto-icon': true,
            })} " style="${styleMap({
                'mask-image': `var(--auto-icon-${this.name})`,
                color: this.color,
                'font-size': this.size,
                '--stroke-width': this.strokeWidth,
                transform: this.rotate ? `rotate(${this.rotate}deg)` : undefined,
            })}">                
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-icon': AutoIcon
    }
}
