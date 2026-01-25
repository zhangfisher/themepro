import { repeat } from 'lit/directives/repeat.js'
import { html } from 'lit' // 导入 html 函数
import { presetThemes } from '../src/presets'

export function ThemeSelector() {
    return html`
        <style>    
            .theme-color{
                padding:0.5em;
                cursor: pointer;
                color:white;
                border-radius: var(--auto-border-radius);
            }        
        </style>
        <div id="themeSelector" style="display: flex; gap: 0.5rem;align-items:  stretch;justify-content: space-between;" >
            <span id="colorpicker" class="theme-color" style="width:4em;border:var(--auto-border);border:var(--auto-border);">选择</span>
            ${repeat(Object.values(presetThemes), (theme) => {
                return html`<span class="theme-color" data-color="${theme.color}" style="padding:0.5em;background-color:${theme.color};">${theme.title}</span>`
            })}                    
        </div>   
        
        <div id="darkMode" style="display: flex; padding:0.5em;gap: 0.5rem;align-items: center;" >            
            <span class="auto-btn mode" data-value="light">Light</span>
            <span class="auto-btn mode" data-value="dark">Dark</span> 
            <span class="auto-btn colorized" data-value="">多彩模式</span>
        </div>  
        <script > 
                if(typeof themeSelector=== 'undefined'){
                const themeSelector = document.getElementById('themeSelector')
                themeSelector.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('theme-color')) {
                        ThemePro.themeColor=target.dataset.color                    
                    }
                })
                const darkMode = document.getElementById('darkMode')
                darkMode.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('mode')) {                    
                        ThemePro.dark = target.dataset.value==='dark'
                    }else if(target.classList.contains('colorized')){
                        ThemePro.colorized=!ThemePro.colorized
                    }
                })
                var colorpicker = document.querySelector('#colorpicker');
                var picker = new Picker(colorpicker);
                picker.onChange = function(color) {
                    colorpicker.style.background = color.rgbaString;
                    document.documentElement.dataset.theme=color.rgbaString
                };           
            }
        </script> 
    `
}
export function SizeSelector(attr: 'size' | 'radius' | 'shadow' | 'spacing' = 'size') {
    return html` 
        <div id="sizeSelector" style="display: flex; gap: 0.5rem;align-items: center;" >
            ${repeat(['x-small', 'small', 'medium', 'large', 'x-large'], (size) => {
                return html`<span class="auto-btn ${attr}-size" data-size-value="${size}" >${size}</span>`
            })}        
        </div>   
        <script> 
            if(typeof sizeSelector=== 'undefined'){
            const sizeSelector = document.getElementById('sizeSelector')
                sizeSelector.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('${attr}-size')) { 
                        ThemePro['${attr}']=target.dataset.sizeValue
                    }
                })       
            }
        </script> 
    `
}
export function BorderRadiusSelector() {
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
            if(typeof radiusSelector=== 'undefined'){
                const radiusSelector = document.getElementById('radiusSelector')            
                radiusSelector.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('radius-size')) {
                        ThemePro.radius=target.dataset.radiusSize
                    }
                })        
            }            
        </script> 
    `
}
