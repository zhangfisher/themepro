import { html } from 'lit'
import { sizeSelector, themeSelector } from '../_components'

export const renderBorderRadiusStory = () => {
    return html`
            <div style="padding: 20px;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">圆角大小</div>
                <div class="auto-card-body col">                    
                    <div class="auto-card-body-item " style="border-radius:var(--k-border-radius-none)">
                        --k-border-radius-none
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--k-border-radius-x-small)">
                        --k-border-radius-x-small
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--k-border-radius-small)">
                        --k-border-radius-small
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--k-border-radius-medium)">
                        --k-border-radius-medium
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--k-border-radius-large)">
                        --k-border-radius-x-large
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--k-border-radius-x-large)">
                        --k-border-radius-x-large
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--k-border-radius-pill)">
                        --k-border-radius-pill
                    </div>
                </div>                
            </div>
            <div style="padding: 20px;">${sizeSelector('radius')}</div>
            <div class="auto-card">
                <div class="auto-card-header">全局圆角大小: <code>var(--auto-border-radius)</code></div>
                <div class="auto-card-body col">        
                    <pre>使用HueUI.radius='x-small'设置全局圆角大小</pre>
                    <div class="list">                    
                        <div class="item" style="border-radius:var(--auto-border-radius)">
                            --auto-border-radius
                        </div>
                        <div class="item" style="border-radius:var(--auto-border-radius)">
                        --auto-border-radius
                        </div>
                        <div class="item" style="border-radius:var(--auto-border-radius)">
                            --auto-border-radius
                        </div>
                        <div class="item" style="border-radius:var(--auto-border-radius)">
                        --auto-border-radius
                        </div>
                        <div class="item" style="border-radius:var(--auto-border-radius)">
                            --auto-border-radius
                        </div>
                    </div>   
                </div>
            </div>
            
        `
}
