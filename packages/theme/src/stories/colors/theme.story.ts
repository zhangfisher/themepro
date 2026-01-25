import { html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { themeSelector } from '../_components'
export const renderThemeStory = () => {
    return html`
            <div style="padding: 1em;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">主题梯度颜色</div>
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
                <div class="auto-card-header">主题色</div>
                <div class="auto-card-body col">                  
                    <pre><code>HueUI</code>从主题颜色调色中选取若干颜色作为主题色，用于文本背景等。<code>--k-theme-color</code> 用于文本颜色，
                     <code>--k-theme-bgcolor-<0,1-5></code>用于作为梯度主题背景颜色。</pre>  
                    <div class="auto-card-body-item " style="color:var(--k-color-theme-8)">
                        --k-theme-color: var(--k-color-theme-8)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--k-color-theme-0)">
                        --k-theme-bgcolor:var( --k-color-theme-0)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--k-color-theme-1)">
                        --k-theme-bgcolor-1: var(--k-color-theme-1)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--k-color-theme-2)">
                        --k-theme-bgcolor-2: var(--k-color-theme-2)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--k-color-theme-3)">
                        --k-theme-bgcolor-3: var(--k-color-theme-3)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--k-color-theme-4)">
                        --k-theme-bgcolor-4: var(--k-color-theme-4)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--k-color-theme-5)">
                        --k-theme-bgcolor-5: var(--k-color-theme-5)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--k-color-theme-6)">
                        --k-theme-bgcolor-6: var(--k-color-theme-6)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--k-color-theme-7)">
                        --k-theme-bgcolor-7: var(--k-color-theme-7)</code>                 
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--k-color-theme-8)">
                        --k-theme-bgcolor-8: var(--k-color-theme-8)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--k-color-theme-9)">
                        --k-theme-bgcolor-9: var(--k-color-theme-9)
                    </div>
                </div>                
            </div>
        `
}
