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
        <div id="themeSelector" style="display: flex; gap: 0.5rem;align-items:  stretch;justify-content: space-between;" >
            <span id="colorpicker" class="theme-color" style="width:4em;border:var(--auto-border);border:var(--auto-border);">选择</span>
            ${repeat(Object.values(presetThemes), (theme) => {
                return html`<span class="theme-color" data-color="${theme.color}" style="padding:0.5em;background-color:${theme.color};">${theme.title}</span>`
            })}                    
        </div>   
        <div class="row">
            <div id="darkMode" style="display: flex; padding:0.5em;gap: 0.5rem;align-items: center;" >            
                <span class="auto-btn mode" data-value="light">Light</span>
                <span class="auto-btn mode" data-value="dark">Dark</span> 
                <span class="auto-btn colorized" data-value="">多彩模式</span>
            </div>  
            <div>${sizeSelector()}</div>
        </div>
        
        <script > 
            if(typeof selectTheme=== 'undefined'){
                const selectTheme = document.getElementById('themeSelector')
                selectTheme.addEventListener('click', (e) => {
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
                    document.documentElement.dataset.theme = color.hex
                };           
            }
        </script> 
    `
}

export function scopeThemeSelector(scopeSelector: string) {
    return html`
        <style>    
            .theme-color{
                padding:0.5em;
                cursor: pointer;
                color:white;
                border-radius: var(--auto-border-radius);
            }        
        </style>
        <div id="scopeThemeSelector" style="display: flex; gap: 0.5rem;align-items:  stretch;justify-content: space-between;" >
            <span id="colorpicker" class="theme-color" style="width:4em;border:var(--auto-border);border:var(--auto-border);">选择</span>
            ${repeat(Object.values(presetThemes), (theme) => {
                return html`<span class="theme-color" data-color="${theme.color}" style="padding:0.5em;background-color:${theme.color};">${theme.title}</span>`
            })}                    
        </div>   
        
        <div id="scopeDarkMode" style="display: flex; padding:0.5em;gap: 0.5rem;align-items: center;" >            
            <span class="auto-btn mode">Light/Dark</span>
            <span class="auto-btn colorized" data-value="">多彩模式</span>
            
        </div>  
        <script >   
            if(typeof selectScopeTheme=== 'undefined'){                
                const scopeEl = document.getElementById('${scopeSelector}');
                const scope = ThemePro.addScope({id:'${scopeSelector}'});
                const selectScopeTheme = document.getElementById('scopeThemeSelector');
                scope.attach('#${scopeSelector}');
                selectScopeTheme.addEventListener('click', (e) => { 
                    const target = e.target  
                    if (target.classList.contains('theme-color')) { 
                        scope.themeColor = target.dataset.color       
                     
                    }
                })
                const darkMode = document.getElementById('scopeDarkMode')
                darkMode.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('mode')) {         
                        scope.dark = !scopeEl.hasAttribute('dark')                        
                    }else if(target.classList.contains('colorized')){
                        scope.colorized = !scopeEl.hasAttribute('colorized')                        
                    }
                })
                var colorpicker = document.querySelector('#colorpicker');
                var picker = new Picker(colorpicker);
                picker.onChange = function(color) {
                    colorpicker.style.background = color.rgbaString; 
                    scopeEl.dataset.theme = color.rgbaString
                };           
            }
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
            if(typeof selectSize=== 'undefined'){
            const selectSize = document.getElementById('sizeSelector')
                selectSize.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('${attr}-size')) { 
                        ThemePro['${attr}']=target.dataset.sizeValue
                    }
                })       
            }
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
            if(typeof selectRadius=== 'undefined'){
                const selectRadius = document.getElementById('radiusSelector')            
                selectRadius.addEventListener('click', (e) => {
                    const target = e.target  
                    if (target.classList.contains('radius-size')) {
                        ThemePro.radius=target.dataset.radiusSize
                    }
                })        
            }            
        </script> 
    `
}
