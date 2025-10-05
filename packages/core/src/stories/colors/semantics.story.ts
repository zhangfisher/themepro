import { html } from 'lit'
import { themeSelector } from '../_blocks'

export const renderThemeStory = () => {
    return html`
            <div style="padding: 1em;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">主题色</div>
                <div class="auto-card-body col">                  
                    <pre><code>HueUI</code>支持primary,secondary,success,warning,info</pre>  
                    <div class="auto-card-body-item " style="background-color:var(--t-color-primary-5)">
                        --t-theme-color: var(--t-color-theme-8)
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-0)">
                        <code>--t-theme-bgcolor:var( --t-color-theme-0)</code>
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-1)">
                        <code>--t-theme-bgcolor-1: var(--t-color-theme-1)</code>
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-2)">
                        <code>--t-theme-bgcolor-2: var(--t-color-theme-2)</code>
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-3)">
                        <code>--t-theme-bgcolor-3: var(--t-color-theme-3)</code>
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-4)">
                        <code>--t-theme-bgcolor-4: var(--t-color-theme-4)</code>
                    </div>
                    <div class="auto-card-body-item " style="background-color:var(--t-color-theme-5)">
                        <code>--t-theme-bgcolor-5: var(--t-color-theme-5)</code>
                    </div>
                </div>
            </div>          
        `
}
