/**
 *
 *  按钮
 *
 */
import { html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { styles } from './styles'
import { AutoElementBase } from '../../elements/base'

import type { AutoButtonProps } from '../Button'
import { repeat } from 'lit/directives/repeat.js'

export interface AutoButtonGroupProps {
    items: AutoButtonProps[]
    gap?: number
    pill?: boolean
    variant?: 'outline' | 'text' | 'ghost'
    labelWidth?: string
    checkable?: boolean
    disabled?: boolean
    block?: boolean
}

@customElement('auto-button-group')
export class AutoButtonGroup extends AutoElementBase<AutoButtonGroupProps> {
    static styles = styles

    @property({ type: String })
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

    @property({ type: String })
    labelWidth?: string

    @property({ type: String })
    gap?: string

    @property({ type: String })
    variant?: 'default' | 'outline' | 'ghost'

    @property({ type: Boolean, reflect: true })
    pill?: boolean

    @property({ type: Boolean, reflect: true })
    disabled?: boolean

    @property({ type: Boolean, reflect: true })
    block?: boolean

    @property({ type: Boolean })
    checkable?: boolean

    @property({ type: String })
    direction?: 'row' | 'column'

    connectedCallback(): void {
        super.connectedCallback()
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
    }
    private _getButtons() {
        this.props.items
        return this.props.items.map((item) => {
            return item
        })
    }
    render() {
        const buttons = this._getButtons()
        return html`
            <auto-flex direction="${this.direction!}" gap="${this.gap!}">
                ${repeat(buttons, (btn, i) => {
                    return html`<auto-button
                        label="${btn.label!}"
                        icon="${btn.icon!}"
                        size="${this.size!}"
                        .disabled=${this.disabled!}
                        .block=${this.block!}
                        .vertical=${btn.vertical!}
                        labelWidth="${this.labelWidth!}"
                        variant="${this.variant!}"                    
                    ></auto-button>`
                })}
            </auto-flex>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-button-group': AutoButtonGroup
    }
}
