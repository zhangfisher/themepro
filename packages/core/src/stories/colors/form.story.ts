import { html } from 'lit'
import { themeSelector } from '../_components'

export const renderFormStory = () => {
    return html`
            <div style="padding: 1em;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">输入表单</div>
                <div class="auto-card-body col">            
                    <input class="auto-input" value="领先的主题解决方案"/> 
                    <input class="auto-input" placeholder="请输入主题名称解决方案"/>                  
                </div>
            </div>          
            <div class="auto-card">
                <div class="auto-card-header">Textarea</div>
                <div class="auto-card-body col">            
                    <textarea class="auto-input" rows="3" >领先的主题解决方案 </textarea>
                    <textarea class="auto-input"  rows="3" placeholder="请输入主题名称解决方案"> </textarea>                  
                </div>
            </div>          
        `
}
