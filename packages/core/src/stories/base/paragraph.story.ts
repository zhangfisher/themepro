import { html } from 'lit'
import { sizeSelector, themeSelector } from '../_components'

export const renderParagraphStory = () => {
    return html`
            <div style="padding: 20px;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">行高</div>
                <div class="auto-card-body col">                    
                    <div class="auto-card-body-item " style="line-height:var(--t-line-height-x-small)">
                        道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。。--t-line-height-x-small 
                    </div>
                    <div class="auto-card-body-item " style="line-height:var(--t-line-height-small)">
                        道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。。--t-line-height-small
                    </div>
                    <div class="auto-card-body-item " style="line-height:var(--t-line-height-medium)">
                        道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。。--t-line-height-medium
                    </div>
                    <div class="auto-card-body-item " style="line-height:var(--t-line-height-large)">
                        道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。。--t-line-height-x-large
                    </div>
                    <div class="auto-card-body-item " style="line-height:var(--t-line-height-x-large)">
                        道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。。--t-line-height-x-large
                    </div> 
                </div>                
            </div>
            <div class="auto-card">
                <div class="auto-card-header">字间距</div>
                <div class="auto-card-body col">                    
                    <div class="auto-card-body-item " style="letter-spacing:var(--t-letter-spacing-x-small)">
                        道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。。--t-letter-spacing-x-small 
                    </div>
                    <div class="auto-card-body-item " style="letter-spacing:var(--t-letter-spacing-small)">
                        道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。。--t-letter-spacing-small
                    </div>
                    <div class="auto-card-body-item " style="letter-spacing:var(--t-letter-spacing-medium)">
                        道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。。--t-letter-spacing-medium
                    </div>
                    <div class="auto-card-body-item " style="letter-spacing:var(--t-letter-spacing-large)">
                        道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。。--t-letter-spacing-x-large
                    </div>
                    <div class="auto-card-body-item " style="letter-spacing:var(--t-letter-spacing-x-large)">
                        道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。。--t-letter-spacing-x-large
                    </div> 
                </div>                
            </div>
            <div style="padding: 10px;">${sizeSelector('size')}</div>
            <div class="auto-card">
                <div class="auto-card-header">全局自动段落: <code>var(--auto-font)</code></div>
                <div class="auto-card-body col">        
                    <div class="list">                    
                        <div class="item" style="font:var(--auto-font);line-height:var(--auto-line-height);letter-spacing:var(--auto-letter-spacing);">
                            道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。
                        </div>
                    </div>   
                </div>
            </div>
        `
}
