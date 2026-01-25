/**
 *
 * <kylin-card>
 *    <div slot='header'></div>
 *    <div slot='title'></div>
 *    <div slot='actions'></div>
 *    <div slot='body'></div>
 *    <div slot='footer'></div>
 * </kylin-card>
 *
 */
import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { when } from 'lit/directives/when.js'

import { styles } from './styles'

@customElement('kylin-card')
export class KylinCard extends LitElement {
    static styles = styles

    @property({ type: String })
    title?: string

    @property({ type: String })
    icon?: string

    render() {
        return html`
        <slot name="header">
            <slot name="title"></slot>
            <slot name="actions"></slot>
        </slot>
        <slot name="body"></slot>
        <slot name="footer">            
            <slot name="actions"></slot>
        </slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'kylin-card': KylinCard
    }
}
