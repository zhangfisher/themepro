import { html } from 'lit'
import { themeBackgroundSelector } from '../_blocks'
import { repeat } from 'lit/directives/repeat.js'
import { presetThemes } from '../../presets'
import { generateThemeGradientColors } from '../../utils/generateThemeGradientColors'
import { generateGradientColors } from '../../utils/generateGradientColors'
import { generateThemeGradientBgColors } from '../../utils/generateThemeGradientBgColors'

export const renderThemeBgColorStory = () => {
    return html`
            <div style="padding: 1em;">${themeBackgroundSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">主题梯度颜色</div>
                <div class="auto-card-body col">                    
                        ${repeat(Object.entries(presetThemes), ([name, color]) => {
                            const gradientColors = generateThemeGradientBgColors(color.baseColor)
                            return html`<div class="row">
                                    ${repeat(gradientColors, (color) => {
                                        return html`<span style="padding:0.5em;border-radius:4px;text-align:center;background-color:${color};">${name}</span>`
                                    })}        
                            </div>`
                        })}         
                </div>   
            </div> 
            <div class="auto-card">
                <div class="auto-card-header">主题色</div>
                <div class="auto-card-body col">                  
                    <pre><code>HueUI</code>从主题颜色调色中选取若干颜色作为主题色，用于文本背景等。<code>--t-theme-color</code> 用于文本颜色，
                     <code>--t-theme-bgcolor-<0,1-5></code>用于作为梯度主题背景颜色。</pre>  
                    <div class="auto-card-body-item " style="color:var(--t-color-theme-8)">
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
