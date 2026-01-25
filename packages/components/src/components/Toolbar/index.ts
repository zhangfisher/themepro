/**
 *
 *  按钮
 *
 */
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { styles } from './styles'
import { KylinElementBase } from '../../elements/base'

import type { KylinButtonProps } from '../Button'
import { repeat } from 'lit/directives/repeat.js'

export interface KylinButtonGroupProps {
    items: (KylinButtonProps | string)[]
    gap?: number
    pill?: boolean
    variant?: 'outline' | 'text' | 'ghost'
    labelWidth?: string
    type?: 'option' | 'checkbox-group'
    direction?: 'row' | 'column'
    disabled?: boolean
    block?: boolean
}

@customElement('kylin-toolbar')
export class KylinToolbar extends KylinElementBase<KylinButtonGroupProps> {
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

    @property({ type: String })
    type?: 'option' | 'checkbox'

    @property({ type: String })
    direction?: 'row' | 'column'

    onInitState(): void {
        if (!this.state?.items) this.state!.items = []
    }

    getItems() {
        return this.state?.items || []
    }

    connectedCallback(): void {
        super.connectedCallback()
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
    }
    private _renderButton(btn: KylinButtonProps, i: number) {
        return html`<kylin-button
            label="${btn.label!}"
            icon="${btn.icon!}"
            size="${this.size!}"
            .disabled=${this.disabled!}
            .block=${this.block!}
            .vertical=${btn.vertical!}
            labelWidth="${this.labelWidth!}"
            variant="${this.variant!}"                    
        ></kylin-button>`
    }
    render() {
        const items = this.getItems()
        return html`
            <kylin-flex direction="${this.direction!}" gap="${this.gap!}">
                ${repeat(items, (item, i) => {
                    return this._renderButton(item, i)
                })}
            </kylin-flex>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'kylin-toolbar': KylinToolbar
    }
}
