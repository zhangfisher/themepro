import { html } from 'lit'
import { themeSelector } from '../_components'

export const renderAlertStory = () => {
    return html`
            <div style="padding: 20px;">${themeSelector()}</div>
            <div class="auto-card">
                <div class="auto-card-header">简单提示信息</div>
                <div class="auto-card-body col">                                
                    <div class="auto-alert">
                        这是一条提示信息
                    </div> 
                    <div class="auto-alert success">
                        这是一条成功信息 success
                    </div>
                    <div class="auto-alert warning">
                        这是一条成功信息 warning
                    </div>
                    <div class="auto-alert primary">
                        这是一条关键信息 primary
                    </div>                    
                    <div class="auto-alert danger">
                        这是一条错误信息 danger
                    </div>
                </div>                
            </div>
            <div class="auto-card">
                <div class="auto-card-header">提示信息- 包含关闭按钮</div>
                <div class="auto-card-body col">                                
                    <div class="auto-alert">
                         </span>这是一条提示信息<span class="closeable"></span>
                    </div> 
                    <div class="auto-alert success">
                        这是一条成功信息 success<span class="closeable"></span>
                    </div>
                    <div class="auto-alert warning">
                         </span>这是一条成功信息 warning<span class="closeable"></span>
                    </div>
                    <div class="auto-alert primary">
                         这是一条关会键信息 primary<span class="closeable"></span>
                    </div>                    
                    <div class="auto-alert danger"> 这是一条错误信息 danger<span class="closeable"></span>
                    </div>
                </div>                
            </div>
            </div>
              
        `
}
