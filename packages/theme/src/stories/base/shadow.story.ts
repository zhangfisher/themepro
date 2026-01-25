import { html } from 'lit'
import { sizeSelector, themeSelector } from '../_components'

export const renderShadowStory = () => {
    return html`
            <div style="padding: 20px;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">阴影大小</div>
                <div class="auto-card-body col">                    
                    <div class="auto-card-body-item " style="box-shadow:var(--k-shadow-none)">
                        --k-shadow-none
                    </div>
                    <div class="auto-card-body-item " style="box-shadow:var(--k-shadow-x-small)">
                        --k-shadow-x-small
                    </div>
                    <div class="auto-card-body-item " style="box-shadow:var(--k-shadow-small)">
                        --k-shadow-small
                    </div>
                    <div class="auto-card-body-item " style="box-shadow:var(--k-shadow-medium)">
                        --k-shadow-medium
                    </div>
                    <div class="auto-card-body-item " style="box-shadow:var(--k-shadow-large)">
                        --k-shadow-x-large
                    </div>
                    <div class="auto-card-body-item " style="box-shadow:var(--k-shadow-x-large)">
                        --k-shadow-x-large
                    </div> 
                </div>
                
            </div>
            <div style="padding: 20px;">${sizeSelector('shadow')}</div>
            <div class="auto-card">
                <div class="auto-card-header">全局阴影: <code>var(--auto-shadow)</code></div>
                <div class="auto-card-body col">        
                    <pre>使用<code>HueUI.shadow='x-small'</code>设置全局阴影大小</pre>
                    <div class="list">                    
                        <div class="item" style="box-shadow:var(--auto-shadow)">
                            --auto-shadow
                        </div>
                        <div class="item" style="box-shadow:var(--auto-shadow)">
                        --auto-shadow
                        </div>
                    </div>   
                </div>
            </div>
            
        `
}
