import { html } from 'lit'
import { sizeSelector, themeSelector } from '../_components'

export const renderButtonStory = () => {
    return html`
            <div style="padding: 20px;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">按钮大小</div>
                <div class="auto-card-body col">            
                    <div>
                        <div class="auto-btn x-small">确定</div>
                        <div class="auto-btn small">确定</div>
                        <div class="auto-btn medium">确定</div>
                        <div class="auto-btn large">确定</div>
                        <div class="auto-btn x-large">确定</div>
                    </div>        
                </div>                
            </div>
            <div class="auto-card">
                <div class="auto-card-header">语义按钮</div>
                <div class="auto-card-body col">            
                    <div>
                        <div class="auto-btn">确定</div>
                        <div class="auto-btn primary">确定</div>
                        <div class="auto-btn success">确定</div>
                        <div class="auto-btn warning">确定</div>
                        <div class="auto-btn danger">确定</div>
                        <div class="auto-btn info">确定</div>
                    </div>        
                </div>                
            </div>
             <div class="auto-card">
                <div class="auto-card-header">按钮形状</div>
                <div class="auto-card-body col">            
                    <div>
                        <div class="auto-btn x-small circle">确定</div>
                        <div class="auto-btn small circle">确定</div>
                        <div class="auto-btn medium circle">确定</div>
                        <div class="auto-btn large circle">确定</div>
                        <div class="auto-btn x-large circle">确定</div>
                    </div>        
                    <div>
                        <div class="auto-btn x-small pill">取消</div>
                        <div class="auto-btn small pill">取消</div>
                        <div class="auto-btn medium pill">取消</div>
                        <div class="auto-btn large pill">取消</div>
                        <div class="auto-btn x-large pill">取消</div>
                    </div>        
                </div>                
            </div>
            <div class="auto-card">
                <div class="auto-card-header">全局字体: <code>var(--auto-font)</code></div>
                <div class="auto-card-body col">        
                    <pre>--auto-font: "var(--auto-font-weight) var(--auto-font-size)/1.5 var(--auto-font-family)</pre>
                    <div class="list">                    
                        <div class="item" style="font:var(--auto-font)">
                           道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。
                        </div> 
                    </div>   
                </div>
            </div>
        `
}
