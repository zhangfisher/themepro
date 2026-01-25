import { html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { themeSelector } from '../_components'
export const renderAutoColorStory = () => {
    return html`
            <div style="padding: 1em;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">主题颜色</div>
                <div class="auto-card-body">                    
                      <div id="themeSelector" style="padding:1em;display: flex; gap: 0.5rem;align-items: center;" >
                        ${repeat(Array.from({ length: 10 }), (_, i) => {
                            return html`<span class="theme-color" style="width: 100%;height: 2em;background-color:var(--k-color-theme-${i});">${i}</span>`
                        })}        
                    </div>   
                </div>                
                <div class="auto-card-footer">
                        主题色调明暗调节梯度方向
                </div>
            </div> 
            <div class="auto-card">
                <div class="auto-card-header">自动颜色变量</div>
                <div class="auto-card-body col">                  
                    <div class="auto-card-body-item " style="border:var(--auto-border);color:var(--auto-color);background-color:var(--auto-bgcolor)">
                        color:var(--auto-color);background-color:var(--auto-bgcolor)
                    </div>                    
                    <div class="auto-card-body-item " style="border:var(--auto-border);color:var(--auto-selected-color);background-color:var(--auto-selected-bgcolor)">
                        color:var(--auto-selected-color);background-color:var(--auto-selected-bgcolor)
                    </div>
                      <div class="auto-card-body-item " style="border:var(--auto-border);color:var(--auto-hover-color);background-color:var(--auto-hover-bgcolor)">
                        color:var(--auto-hover-color);background-color:var(--auto-hover-bgcolor)
                    </div>
                      <div class="auto-card-body-item " style="border:var(--auto-border);color:var(--auto-active-color);background-color:var(--auto-active-bgcolor)">
                        color:var(--auto-active-color);background-color:var(--auto-active-bgcolor)
                    </div>
                    
                      <div class="auto-card-body-item " style="border:var(--auto-border);color:var(--auto-disable-color);">
                        color:var(--auto-disable-color);background-color:var(--auto-disable-bgcolor)
                    </div>
                </div>                
            </div>
        `
}
