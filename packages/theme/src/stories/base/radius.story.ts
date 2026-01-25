import { html } from 'lit'
import { sizeSelector, themeSelector } from '../_components'

export const renderBorderRadiusStory = () => {
    return html`
            <div style="padding: 20px;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">圆角大小</div>
                <div class="auto-card-body col">                    
                    <div class="auto-card-body-item " style="border-radius:var(--t-border-radius-none)">
                        --t-border-radius-none
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--t-border-radius-x-small)">
                        --t-border-radius-x-small
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--t-border-radius-small)">
                        --t-border-radius-small
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--t-border-radius-medium)">
                        --t-border-radius-medium
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--t-border-radius-large)">
                        --t-border-radius-x-large
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--t-border-radius-x-large)">
                        --t-border-radius-x-large
                    </div>
                    <div class="auto-card-body-item " style="border-radius:var(--t-border-radius-pill)">
                        --t-border-radius-pill
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
