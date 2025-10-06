/**
 *
 *  渲染Markdown
 *
 *
 *  支持以下格式：
 *  - `` : 嵌入代码
 *  - **内容** : 加粗
 *  -
 *
 */
import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from 'lit/decorators/custom-element.js'
import { when } from 'lit/directives/when.js'

import { styles } from './styles'
@customElement('auto-markdown')
export class AutoMarkdown extends LitElement {
    static styles = styles

    render() {
        return html`
        <div class="auto-btn ">
            
        </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-markdown': AutoMarkdown
    }
}
