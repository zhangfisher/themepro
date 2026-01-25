import { html } from 'lit'
import { sizeSelector, themeSelector } from '../_components'

export const renderFontStory = () => {
    return html`
            <div style="padding: 20px;">${themeSelector()}</div>
            <div class="auto-alert">

            </div>
            <div class="auto-card">
                <div class="auto-card-header">间距</div>
                <div class="auto-card-body col">                    
                    <div class="auto-card-body-item " style="font-size:var(--t-font-size-x-small)">
                        道可道非常道，名可名非常名。--t-font-size-x-small 
                    </div>
                    <div class="auto-card-body-item " style="font-size:var(--t-font-size-small)">
                        道可道非常道，名可名非常名。--t-font-size-small
                    </div>
                    <div class="auto-card-body-item " style="font-size:var(--t-font-size-medium)">
                        道可道非常道，名可名非常名。--t-font-size-medium
                    </div>
                    <div class="auto-card-body-item " style="font-size:var(--t-font-size-large)">
                        道可道非常道，名可名非常名。--t-font-size-x-large
                    </div>
                    <div class="auto-card-body-item " style="font-size:var(--t-font-size-x-large)">
                        道可道非常道，名可名非常名。--t-font-size-x-large
                    </div> 
                </div>                
            </div> 
            <div style="padding: 20px;">${sizeSelector('size')}</div>
            <div class="auto-card">
                <div class="auto-card-header">全局字体: <code>var(--auto-font)</code></div>
                <div class="auto-card-body col">        
                    <pre>使用<code>HueUI.size='x-small'</code>设置全局字体</pre>
                    <div class="list">                    
                        <div class="item" style="font:var(--auto-font)">
                            --auto-font
                        </div>
                        <div class="item" style="font:var(--auto-font)">
                        --auto-font
                        </div>
                    </div>   
                </div>
            </div>
            
        `
}
