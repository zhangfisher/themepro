import { html } from 'lit'
import { themeSelector } from '../_components'

export const renderSemanticsColorStory = () => {
    return html`
            <div style="padding: 1em;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">语义颜色</div>
                <div class="auto-card-body col">                  
                    <pre><code>HueUI</code>支持primary,success,danger,warning,info</pre>  
                    <div class="auto-card-body-item center " style="color:white;background-color:var(--auto-primary-color)">
                        --auto-primary-color: var(--t-color-primary)
                    </div>
                    <div class="auto-card-body-item  center" style="color:white;background-color:var(--auto-secondary-color)">
                        --auto-secondary-color: var(--t-color-secondary)
                    </div>                    
                    <div class="auto-card-body-item center " style="color:white;background-color:var(--auto-success-color)">
                        --auto-success-color: var(--t-color-success)                        
                    </div>
                    <div class="auto-card-body-item center " style="color:white;background-color:var(--auto-danger-color)">
                        --auto-danger-color: var(--t-color-danger)                        
                    </div>
                    <div class="auto-card-body-item center" style="color:white;background-color:var(--auto-warning-color)">
                        --auto-warning-color: var(--t-color-warning)                        
                    </div>
                    <div class="auto-card-body-item center " style="color:white;background-color:var(--auto-info-color)">
                        --auto-info-color: var(--t-color-info)                        
                    </div>
                     
                </div>
            </div>          
        `
}
