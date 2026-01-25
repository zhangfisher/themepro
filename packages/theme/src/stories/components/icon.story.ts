import { html } from 'lit'
import { themeSelector } from '../_components'

export const renderIconStory = () => {
    return html`
            <div style="padding: 20px;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">内置图标 - 自动尺寸与字体大小相同</div>
                <div class="auto-card-body">                                
                    <div>
                    <span class="auto-icon home"></span>
                    <span class="auto-icon info"></span>
                    <span class="auto-icon close"></span>
                    <span class="auto-icon settings"></span>
                    <span class="auto-icon star"></span>
                    <span class="auto-icon tag"></span>
                    <span class="auto-icon checked"></span>
                    <span class="auto-icon unchecked"></span>
                    <span class="auto-icon yes"></span>
                    <span class="auto-icon no"></span>
                    <span class="auto-icon important"></span>
                    <span class="auto-icon file"></span>
                    <span class="auto-icon folder"></span>
                    <span class="auto-icon folder-open"></span>
                    <span class="auto-icon triangle"></span>
                    <span class="auto-icon save"></span>
                    <span class="auto-icon loading"></span>
                    <span class="auto-icon alert"></span>
                    <span class="auto-icon bell"></span>
                    <span class="auto-icon arrow"></span>                    
                    </div>
                </div>                
            </div>
            <div class="auto-card" data-size="large">
                <div class="auto-card-header">主题颜色图标</div>
                <div class="auto-card-body col">            
                     <div>
                    <span class="auto-icon home" colorized></span>
                    <span class="auto-icon info" colorized ></span>
                    <span class="auto-icon close"  colorized></span>
                    <span class="auto-icon settings"  colorized></span>
                    <span class="auto-icon star" colorized></span>
                    <span class="auto-icon tag"  colorized></span>
                    <span class="auto-icon checked" colorized></span>
                    <span class="auto-icon unchecked"  colorized></span>
                    <span class="auto-icon yes" colorized></span>
                    <span class="auto-icon no" colorized></span>
                    <span class="auto-icon important" colorized></span>
                    <span class="auto-icon file" colorized></span>
                    <span class="auto-icon folder" colorized></span>
                    <span class="auto-icon folder-open" colorized></span>
                    <span class="auto-icon triangle" colorized></span>
                    <span class="auto-icon save" colorized></span>
                    <span class="auto-icon loading" colorized></span>
                    <span class="auto-icon alert" colorized></span>
                    <span class="auto-icon bell" colorized></span>
                    <span class="auto-icon arrow" colorized></span>                    
                    </div>  
                </div>                
            </div>
            <div class="auto-card" data-size="large">
                <div class="auto-card-header">彩色图标</div>
                <div class="auto-card-body col">            
                     <div>
                    <span class="auto-icon home"></span>
                    <span class="auto-icon info" style="color:red;"></span>
                    <span class="auto-icon close" style="color:green"></span>
                    <span class="auto-icon settings"  style="color:blue;"></span>
                    <span class="auto-icon star" style="color:yellow;"></span>
                    <span class="auto-icon tag" style="color:purple;"></span>
                    <span class="auto-icon checked" style="color:green;"></span>
                    <span class="auto-icon unchecked" style="color:red"></span>
                    <span class="auto-icon yes"></span>
                    <span class="auto-icon no"></span>
                    <span class="auto-icon important"></span>
                    <span class="auto-icon file"></span>
                    <span class="auto-icon folder"></span>
                    <span class="auto-icon folder-open"></span>
                    <span class="auto-icon triangle"></span>
                    <span class="auto-icon save"></span>
                    <span class="auto-icon loading"></span>
                    <span class="auto-icon alert"></span>
                    <span class="auto-icon bell"></span>
                    <span class="auto-icon arrow"></span>                    
                    </div>  
                </div>                
            </div>
             <div class="auto-card">
                <div class="auto-card-header">指定大小，取值x-small,small,medium,large,x-large</div>
                <div class="auto-card-body col">                                
                    <div class="field">
                        <div class="label">x-small</div>
                        <div class="value">
                            <span class="auto-icon home" x-small></span>
                            <span class="auto-icon info" x-small></span>
                            <span class="auto-icon close" x-small></span>
                            
                        </div>
                    </div>
                    <div class="field">
                        <div class="label">small</div>
                        <div class="value">
                        <span class="auto-icon settings" small></span>    
                        <span class="auto-icon star" small></span>
                            <span class="auto-icon tag" small></span>
                        </div>
                    </div>
                    <div class="field">
                        <div class="label">medium</div>
                        <div class="value">
                            <span class="auto-icon checked"  medium></span>
                            <span class="auto-icon unchecked"  medium></span>
                            <span class="auto-icon yes"  medium></span>
                            <span class="auto-icon no"  medium></span>
                        </div>
                    </div>
                    <div class="field">
                        <div class="label">large</div>
                        <div class="value">
                            <span class="auto-icon important" large></span>
                            <span class="auto-icon file" large></span>
                            <span class="auto-icon folder" large></span>
                            <span class="auto-icon folder-open" large></span>
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="label">x-large</div>
                        <div class="value">
                            <span class="auto-icon triangle" x-large></span>
                            <span class="auto-icon save" x-large></span>
                            <span class="auto-icon loading" x-large></span>
                            <span class="auto-icon alert" x-large></span>
                            <span class="auto-icon bell" x-large></span>
                            <span class="auto-icon arrow" x-large></span> 
                        </div>
                    </div>    
                </div>                
            </div>
              
        `
}
