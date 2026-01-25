import { html } from 'lit'
import { sizeSelector, themeSelector } from '../_components'

export const renderFontStory = () => {
    return html`
            <div style="padding: 20px;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">字体大小</div>
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
            <div class="auto-card">
                <div class="auto-card-header">字体粗浅</div>
                <div class="auto-card-body col">                    
                    <div class="auto-card-body-item " style="font-weight:var(--t-font-weight-x-small)">
                        道可道非常道，名可名非常名。--t-font-weight-x-small 
                    </div>
                    <div class="auto-card-body-item " style="font-weight:var(--t-font-weight-small)">
                        道可道非常道，名可名非常名。--t-font-weight-small
                    </div>
                    <div class="auto-card-body-item " style="font-weight:var(--t-font-weight-medium)">
                        道可道非常道，名可名非常名。--t-font-weight-medium
                    </div>
                    <div class="auto-card-body-item " style="font-weight:var(--t-font-weight-large)">
                        道可道非常道，名可名非常名。--t-font-weight-x-large
                    </div>
                    <div class="auto-card-body-item " style="font-weight:var(--t-font-weight-x-large)">
                        道可道非常道，名可名非常名。--t-font-weight-x-large
                    </div> 
                </div>                
            </div>
            <div style="padding: 20px;">${sizeSelector('size')}</div>
            <div class="auto-card">
                <div class="auto-card-header">全局字体: <code>var(--auto-font)</code></div>
                <div class="auto-card-body col">        
                    <pre>--auto-font: "var(--auto-font-weight) var(--auto-font-size)/1.5 var(--auto-font-family)</pre>
                    <div class="list">                    
                        <div class="item" style="font:var(--auto-font)">
                           道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。
                        </div> 
                    </div>   
                </div>
            </div>
        `
}
