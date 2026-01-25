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
        border: var(--auto-border);
        box-sizing: border-box;
        vertical-align: bottom;
        gap: 0.3em;
        user-select: none;
    } 
    :host(:hover) {
        border: var(--auto-active-border);
        background-color: var(--k-color-theme-1);
        color: var(--auto-active-border-color);
        outline: 4px solid var(--auto-active-border);
    }
    :host(:active) {
        background: var(--k-color-theme-2);
    }
    /**
    * 按钮文本
     */
    :host > .label {
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        width: var(--label-width);
    }
    /* 禁用态：不响应 hover/active */
    :host([disabled]:hover),
    :host([disabled]:active) {
        border: var(--auto-border);
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
    }
    :host([shape='circle']){
       --kylin-icon-size:2em;
    }
    :host([shape='pill']) {
        border-radius: 9999px!important;
    }
    /* 按钮尺寸 */
    :host([x-small]){
        font-size: var(--k-font-size-x-small);
        padding: calc(0.5 * var(--k-spacing-x-small)) var(--k-spacing-x-small);
    }
    :host([small]) {
        font-size: var(--k-font-size-small);
        padding: calc(0.5 * var(--k-spacing-small)) var(--k-spacing-small);
    }
    :host([large]){
        font-size: var(--k-font-size-large);
        padding: calc(0.5* var(--k-spacing-large)) var(--k-spacing-large);
    }
    :host([x-large]) {
        font-size: var(--k-font-size-x-large);
        padding: calc(0.5* var(--k-spacing-x-large)) var(--k-spacing-x-large);
    }
    /**按钮类型 */
    :host([type='primary']) {
        background-color: var(--k-color-primary);
        color: color-mix(in srgb, var(--k-color-primary) 0%, white 100%);
        border: 1px solid var(--k-color-primary);

    }        
    :host([type='primary']:hover) {
        background-color: color-mix(in srgb, var(--k-color-primary), white 10%);
    }
    :host([type='primary']:active) {
        background-color: color-mix(in srgb, var(--k-color-primary), white 20%);
    }
    /**
     * 语义按钮类型
     */
    :host([type='success']) {
        background-color: var(--k-color-success);
        color: color-mix(in srgb, var(--k-color-success) 0%, white 100%);
        border: 1px solid var(--k-color-success);
    }
    :host([type='success']:hover){
        background-color: color-mix(in srgb, var(--k-color-success), white 10%);
    }

    :host([type='success']:active) {
        background-color: color-mix(in srgb, var(--k-color-success), white 20%);
    }
    
    :host([type='warning'])  {
        background-color: var(--k-color-warning);
        color: color-mix(in srgb, var(--k-color-warning) 0%, white 100%);
        border: 1px solid var(--k-color-warning);

    }
    :host([type='warning']:hover) {
        background-color: color-mix(in srgb, var(--k-color-warning), white 10%);
    }
    :host([type='warning']:active) {
        background-color: color-mix(in srgb, var(--k-color-warning), white 20%);
    }

    :host([type='error']),
    :host([type='danger']){
            background-color: var(--k-color-danger);
            color: color-mix(in srgb, var(--k-color-danger) 0%, white 100%);
            border: 1px solid var(--k-color-danger);
    }
    :host([type='error']:hover),:host([type='danger']:hover) {
        background-color: color-mix(in srgb, var(--k-color-danger), white 10%);
    }
    :host([type='error']:active),:host([type='danger']:active) {
        background-color: color-mix(in srgb, var(--k-color-danger), white 20%);
    }

    :host([type='info']) {
        background-color: var(--k-color-info);
        color: color-mix(in srgb, var(--k-color-info) 0%, white 100%);
        border: 1px solid var(--k-color-info-4);
    }
    :host([type='info']:hover) {
        background-color: color-mix(in srgb, var(--k-color-info), white 10%);
    }

    :host([type='info']:active) {
        background-color: color-mix(in srgb, var(--k-color-info), white 20%);
    }
    :host([block]){
        width: 100%;
    }
    :host([ghost]){
        background-color: transparent;
        border: none;
        color: var(--auto-color);
    }
    :host([ghost]) .label{
        color: var(--auto-color);
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


`
