import { css } from 'lit'

export const styles = css`
    :host {
        display: inline-flex;
        position: relative;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: calc(0.5 * var(--t-spacing-medium)) var(--t-spacing-medium);;
        border-radius: var(--auto-border-radius);
        font: var(--auto-font);
        cursor: pointer;
        color: var(--auto-color);
        background: var(--auto-bgcolor);
        box-sizing: border-box;
        vertical-align: bottom;
        gap: 0.3em;
        user-select: none;
    } 
    :host(:hover),:host([variant='ghost']:hover) {
        background-color:  var(--t-color-theme-1);
    }
    :host(:not(.label)){
        flex-grow: 0;
        flex-shrink: 0;
    }
    :host([variant='outline']){        
        border: 1px solid color-mix(in srgb, var(--t-theme-color) 30%, white 10%);
    }

    /**
    * 按钮文本
     */
    :host > .label {
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        width: var(--label-width);        
        min-width: 0;
        text-align: left;
    }
    :host([shape='circle']) > .label{
        flex-grow: 0;
    }

    :host([labelgrow]) > .label{        
        flex-grow: 1;
    }

    
    /* 禁用态：不响应 hover/active */
    :host([disabled]:hover),
    :host([disabled]:active) { 
        background: var(--auto-bgcolor);
        color: var(--auto-color);
        outline: none;
    } 
    /**
     * 按钮形状
     */
    :host([shape='circle']){
        border-radius: 50%!important;
        aspect-ratio: 1;
        flex-direction: column!important;
        gap:0;
        --auto-icon-size:2em;
    } 
    :host([shape='pill']) {
        border-radius: 9999px!important;
    }    
    :host([shape='rect']),:host([shape='rectangle'])  {
        border-radius: 0xp!important;
    }

    /* 按钮尺寸 */
    :host([x-small]){
        font-size: var(--t-font-size-x-small);
        padding: calc(0.5 * var(--t-spacing-x-small)) var(--t-spacing-x-small);
    }
    :host([small]) {
        font-size: var(--t-font-size-small);
        padding: calc(0.5 * var(--t-spacing-small)) var(--t-spacing-small);
    }
    :host([large]){
        font-size: var(--t-font-size-large);
        padding: calc(0.5* var(--t-spacing-large)) var(--t-spacing-large);
    }
    :host([x-large]) {
        font-size: var(--t-font-size-x-large);
        padding: calc(0.5* var(--t-spacing-x-large)) var(--t-spacing-x-large);
    }
    

    /**
     * 语义按钮类型
     */


    /**按钮类型 */
    :host([type='primary']) {
        background-color: var(--t-color-primary);
        color: color-mix(in srgb, var(--t-color-primary) 0%, white 100%);
    }        
    :host([type='primary']:hover) {
        background-color: color-mix(in srgb, var(--t-color-primary), white 10%);
    } 
    :host([type='primary'][variant='outline']) {
        border-color: color-mix(in srgb, var(--t-color-primary), black 10%);
    }

    /*  */
    :host([variant='ghost'][type='primary']){
        color: var(--t-color-primary); 
    }
    :host([variant='ghost'][type='primary']:hover){
        background-color:color-mix(in srgb, var(--t-color-primary) 15%, white 5%)!important;        
    } 

    :host([type='success']) {
        background-color: var(--t-color-success);
        color: color-mix(in srgb, var(--t-color-success) 0%, white 100%);
        
    }
    :host([type='success']:hover){ 
        background-color: color-mix(in srgb, var(--t-color-success), white 10%);
    }
 
    :host([variant='ghost'][type='success']){
        color: var(--t-color-success); 
    }
    :host([variant='ghost'][type='success']:hover){
        background-color:color-mix(in srgb, var(--t-color-success) 15%, white 5%)!important;
        
    } 

    :host([type='warning'])  {
        background-color: var(--t-color-warning);
        color: color-mix(in srgb, var(--t-color-warning) 0%, white 100%);

    }
    :host([type='warning']:hover) {
        background-color: color-mix(in srgb, var(--t-color-warning), white 10%);
    } 

    :host([variant='ghost'][type='warning']){
        color: var(--t-color-warning); 
    }
    :host([variant='ghost'][type='warning']:hover){
        background-color:color-mix(in srgb, var(--t-color-warning) 15%, white 5%)!important;        
    } 
 
    :host([type='error']),
    :host([type='danger']){
            background-color: var(--t-color-danger);
            color: color-mix(in srgb, var(--t-color-danger) 0%, white 100%);
    }
    :host([type='error']:hover),:host([type='danger']:hover) {
        background-color: color-mix(in srgb, var(--t-color-danger), white 10%);
    } 

    :host([variant='ghost'][type='danger']),:host([variant='ghost'][type='error']){
        color: var(--t-color-danger); 
    }
    :host([variant='ghost'][type='danger']:hover),:host([variant='ghost'][type='error']:hover){
        background-color:color-mix(in srgb, var(--t-color-danger) 15%, white 5%)!important;        
    } 


    :host([type='info']) {
        background-color: var(--t-color-info);
        color: color-mix(in srgb, var(--t-color-info) 0%, white 100%);
    }
    :host([type='info']:hover) {
        background-color: color-mix(in srgb, var(--t-color-info), white 10%);
    } 

    :host([variant='ghost']){
        background-color: transparent;
        border: none;
    }
    :host([vertical]){
        flex-direction: column;
    }

    :host([disabled]){
        user-select: none;
        cursor: not-allowed;
        pointer-events: none;
        filter: grayscale(50%) opacity(0.6);
    }
    :host([block]){
        width: 100%;
    } 
    /* Checkbox */
    :host([checkable][checked]:not([checkPos="before"], [checkPos="after"], [checkPos="corner"])){    
        background-color: var(--t-color-primary);
        color: color-mix(in srgb, var(--t-color-primary) 0%, white 100%);
    }
    :host([checkable]) .checked{
        color:var(--t-color-primary);
    }
    :host([checkable][checkPos="before"]) {
        padding-left: calc(0.5 * var(--t-spacing-medium));        
    } 

    :host .badge{
        position: absolute;
        left: 100%;
        top: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        aspect-ratio: 1;
        width: 8px;
        height: 8px; 
        color:white;
        background-color: red;
        border: 1px solid white;
    }  
    /** 标签 */
    .tags > .tag{
        padding: 5px;
        border-radius: 50%;        
        border:1px solid transparent;
        aspect-ratio: 1;
        &:hover{
            color: var(--auto-theme-color); 
        }
        &.checkable{
            &.checked{
                border-radius: 50%;
                aspect-ratio: 1;
                padding: 5px;
                color: var(--auto-selected-color);
                background-color: var(--auto-selected-bgcolor);                
                &[shape='circle']{
                    border-radius: 50%;
                    aspect-ratio: 1;
                    padding: 5px;
                }
                &[shape='rectangle']{
                    border-radius: 5px;
                    padding: 5px;
                }
            }
        }
    }
      

    :host([type='primary']) .tags > .tag,
    :host([type='success']) .tags > .tag,
    :host([type='warning']) .tags > .tag,
    :host([type='danger']) .tags > .tag,
    :host([type='error']) .tags > .tag,
    :host([type='info']) .tags > .tag {
        color: color-mix(in srgb, var(--t-color-primary) 0%, white 100%);                
    }
    :host([type='primary']) .tags > .tag {
        &:hover{
            background-color: color-mix(in srgb, var(--auto-primary-color), white 20%)!important;
        }
        &.checked{
            background-color: color-mix(in srgb, var(--auto-primary-color), black 10%)!important;            
        }
    }
    :host([type='success']) .tags > .tag {
        &:hover{
            background-color: color-mix(in srgb, var(--auto-success-color), white 20%)!important;
        }
        &.checked{
            background-color: color-mix(in srgb, var(--auto-success-color), black 10%)!important;            
        }
    }
    :host([type='warning']) .tags > .tag {
        &:hover{
            background-color: color-mix(in srgb, var(--auto-warning-color), white 20%)!important;
        }
        &.checked{
            background-color: color-mix(in srgb, var(--auto-warning-color), black 10%)!important;            
        }
    }
    :host([type='danger']) .tags > .tag,
    :host([type='error']) .tags > .tag {
        &:hover{
            background-color: color-mix(in srgb, var(--auto-danger-color), white 20%)!important;
        }
        &.checked{
            background-color: color-mix(in srgb, var(--auto-danger-color), black 10%)!important;            
        }
    }
    :host([type='info']) .tags > .tag {
        &:hover{
            background-color: color-mix(in srgb, var(--auto-info-color), white 20%)!important;
        }
        &.checked{
            background-color: color-mix(in srgb, var(--auto-info-color), black 10%)!important;            
        }
    }
    /* 使用伪元素创建涟漪效果 */
    :host .badge::before,
    :host .badge::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid red;
        background-color: red;
        opacity: 0.2;
        border: 1px solid white;
        animation: ripple-wave 0.8s ease-out infinite;
    }

    :host .badge::after {
        animation-delay: 1s;
    }

    @keyframes ripple-wave {
        0% {
            outline: 1px solid red ;
            opacity: 0.3;
        }
        100% {
            outline: 10px solid red ;
            opacity: 0;
        }
    } 
`
