/**
 * 列表组件示例：
 *
 * <auto-list>
 *      <auto-list-item title="标题1">内容1</auto-list-item>
 *      <auto-list-item title="标题2">内容2</auto-list-item>
 *      <auto-list-item title="标题3">内容3</auto-list-item>
 *      <auto-list-item title="标题4">内容4</auto-list-item>
 *      <auto-list-item title="标题5">内容5</auto-list-item>
 *      <auto-list-item title="标题6">内容6</auto-list-item>
 * </auto-list>
 */
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ThemeProController } from '../src/webcomponent/lit'

@customElement('auto-list')
export class AutoListComponent extends LitElement {
    kylinbits = new ThemeProController(this)

    static styles = [
        css`
    :host {
      display: block;
      width: 100%;
    }
    .auto-list {
      display: flex;
      flex-direction: column;
      background: var(--auto-panel-bgcolor, #ffffff);
      color: var(--auto-color, #333333);
      border-radius: var(--auto-border-radius, 4px);
      border: var(--auto-border, 1px solid #e0e0e0);
      padding: 0;
      box-shadow: var(--auto-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      box-sizing: border-box;
      overflow: hidden;
    }
    ::slotted(auto-list-item) {
      border-bottom: var(--auto-border, 1px solid #e0e0e0);
    }
    ::slotted(auto-list-item:last-child) {
      border-bottom: none;
    }
  `,
    ]

    render() {
        return html`
      <div class="auto-list">
        <slot></slot>
      </div>
    `
    }
}

@customElement('auto-list-item')
export class AutoListItemComponent extends LitElement {
    @property() title = ''

    static styles = css`
    :host {
      display: block;
    }
    .list-item {
      display: flex;
      flex-direction: column;      
      padding: calc(0.6 * var(--auto-spacing)); 
      cursor: pointer;
      &:hover{
        background-color: var(--auto-selected-bgcolor);
      }
    }
    .list-item-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      font: var(--auto-title-font);      
    }
    .list-item-body {
      padding: var(--auto-spacing-x-small);
      color: var(--auto-secondary-color); 
    }
  `

    render() {
        return html`
      <div class="list-item">
        <div class="list-item-header">${this.title}</div>
        <div class="list-item-body">
          <slot></slot>
            <span class="display:flex;gap:1rem">
                <button class="auto-btn primary">确定</button>
                <button class="auto-btn">取消</button>
                <button class="auto-btn success">成功</button>
                <button class="auto-btn warning">保存</button>
                <button class="auto-btn danger">删除</button>
                <button class="auto-btn info">关闭</button>
            </span>
        </div>
      </div>
    `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-list': AutoListComponent
        'auto-list-item': AutoListItemComponent
    }
}
