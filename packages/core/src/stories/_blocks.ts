import { repeat } from 'lit/directives/repeat.js'
import { html } from 'lit' // 导入 html 函数
import { presetThemes } from '../presets'

export function themeSelector() {
    return html`
        <style>    
            .theme-color{
                padding:0.5em;
                cursor: pointer;
                color:white;
                border-radius: var(--auto-border-radius);
            }        
        </style>
        <div id="themeSelector" style="display: flex; gap: 0.5rem;align-items: center;" >
            ${repeat(Object.values(presetThemes), (theme) => {
                return html`<span class="theme-color" data-color="${theme.baseColor}" style="padding:0.5em;background-color:${theme.baseColor};">${theme.title}</span>`
            })}        
        </div>   
        <script >
            (()=>{
                const themeSelector = document.getElementById('themeSelector')
                themeSelector.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('theme-color')) {
                        ThemePro.themeColor=target.dataset.color
                    }
                })
            })()            
        </script> 
    `
}
export function themeBackgroundSelector() {
    return html`
        <style>    
            .theme-bgcolor{
                padding:0.5em;
                cursor: pointer;
                color:white;
                text-align:center;
                border-radius: var(--auto-border-radius);
            }        
        </style>
        <div id="themeSelector" style="display: flex; gap: 0.5rem;align-items: center;" >
            ${repeat(Object.values(presetThemes), (theme) => {
                return html`<span class="theme-bgcolor" data-color="${theme.baseColor}" style="padding:0.5em;background-color:${theme.baseColor};">${theme.title}</span>`
            })}        
        </div>   
            <script >
            (()=>{
                const themeSelector = document.getElementById('themeSelector')
                themeSelector.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('theme-bgcolor')) {
                        ThemePro.themeBgcolor=target.dataset.bgcolor
                    }
                })
            })()
        </script> 
    `
}
export function sizeSelector(attr: 'size' | 'radius' | 'shadow' | 'spacing' = 'size') {
    return html` 
        <div id="sizeSelector" style="display: flex; gap: 0.5rem;align-items: center;" >
            ${repeat(['x-small', 'small', 'medium', 'large', 'x-large'], (size) => {
                return html`<span class="auto-btn ${attr}-size" data-size-value="${size}" >${size}</span>`
            })}        
        </div>   
        <script>
            (()=>{
                const sizeSelector = document.getElementById('sizeSelector')
                sizeSelector.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('${attr}-size')) { 
                        ThemePro['${attr}']=target.dataset.sizeValue
                    }
                })
            })()            
        </script> 
    `
}
export function borderRadiusSelector() {
    return html`
        <style>    
            .radius-size{
                padding:0.5em;
                cursor: pointer;
                color:white;
                border-radius: var(--auto-border-radius);
            }        
        </style>
        <div id="radiusSelector" style="display: flex; gap: 0.5rem;align-items: center;" >
            ${repeat(['x-small', 'small', 'medium', 'large', 'x-large'], (size) => {
                return html`<span class="radius-size" data-radius-value="${size}" >${size}</span>`
            })}        
        </div>   
        <script >
            (()=>{
                const sizeSelector = document.getElementById('radiusSelector')
                sizeSelector.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('radius-size')) {
                        ThemePro.radius=target.dataset.radiusSize
                    }
                })
            })()            
        </script> 
    `
}
