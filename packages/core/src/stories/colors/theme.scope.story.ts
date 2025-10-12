import { html } from 'lit'
import { scopeThemeSelector, themeSelector } from '../_components'

export const renderThemeScopeStory = () => {
    return html`
            <div style="padding: 1em;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">主题梯度颜色</div>
                    <div class="auto-card-body row">                    
                        <div class="auto-card">
                            <div class="auto-card-header">主题梯度颜色</div>
                            <div class="auto-card-body">                    
                                道可道，非常道；名可名，非常名。无名天地之始；有名万物之母。故常无，欲以观其妙；常有，欲以观其徼（jiào)
                            </div>
                        </div> 
                        <div class="auto-card" data-theme-scope="scopeCard">
                            <div class="auto-card-header">主题梯度颜色</div>
                            <div class="auto-card-body">                    
                                道可道，非常道；名可名，非常名。无名天地之始；有名万物之母。故常无，欲以观其妙；常有，欲以观其徼（jiào)
                            </div>
                        </div> 
                        <div class="auto-card" data-theme-scope="scopeCard" dark>
                            <div class="auto-card-header">主题梯度颜色</div>
                            <div class="auto-card-body">                    
                                道可道，非常道；名可名，非常名。无名天地之始；有名万物之母。故常无，欲以观其妙；常有，欲以观其徼（jiào)
                            </div>
                        </div> 
                        <div class="auto-card" data-theme-scope="scopeCard" colorized>
                            <div class="auto-card-header">主题梯度颜色</div>
                            <div class="auto-card-body">                    
                                道可道，非常道；名可名，非常名。无名天地之始；有名万物之母。故常无，欲以观其妙；常有，欲以观其徼（jiào)
                            </div>
                        </div> 
                        <div class="auto-card">
                            <div class="auto-card-header">主题梯度颜色</div>
                            <div class="auto-card-body">                    
                                道可道，非常道；名可名，非常名。无名天地之始；有名万物之母。故常无，欲以观其妙；常有，欲以观其徼（jiào)
                            </div>
                        </div> 
                    </div>
                </div>  
            </div> 
            <div class="auto-card" id="scopeCard">
                <div class="auto-card-header">局部主题色</div>
                <div class="auto-card-body col">                  
                    <div style="padding: 1em;">${scopeThemeSelector('scopeCard')}</div>
                    <div class="auto-card-body-item " style="color:var(--t-color-theme-8)">
                        --t-theme-color: var(--t-color-theme-8)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-0)">
                        --t-theme-bgcolor:var( --t-color-theme-0)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-1)">
                        --t-theme-bgcolor-1: var(--t-color-theme-1)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-2)">
                        --t-theme-bgcolor-2: var(--t-color-theme-2)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-3)">
                        --t-theme-bgcolor-3: var(--t-color-theme-3)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-4)">
                        --t-theme-bgcolor-4: var(--t-color-theme-4)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-5)">
                        --t-theme-bgcolor-5: var(--t-color-theme-5)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-6)">
                        --t-theme-bgcolor-6: var(--t-color-theme-6)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-7)">
                        --t-theme-bgcolor-7: var(--t-color-theme-7)</code>                 
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-8)">
                        --t-theme-bgcolor-8: var(--t-color-theme-8)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-9)">
                        --t-theme-bgcolor-9: var(--t-color-theme-9)
                    </div>
                </div>                
            </div>
        `
}
