import { css } from 'lit'

export const styles = css`
    :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: calc(0.8 * var(--auto-input-padding)) calc(1.2 * var(--auto-input-padding));
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
        background-color:  var(--auto-hover-color);
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
        flex-grow: 1;
        min-width: 0;
    }
    :host(:not([circle])) > .label{
        flex-grow: 0;
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
        padding: var(--auto-padding);
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

    :host([checked]){        
        background-color: var(--t-theme-color);
        color: color-mix(in srgb, var(--t-color-theme-1), white 5%);
    }

`
