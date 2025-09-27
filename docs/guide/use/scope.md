# 局部主题

`ThemePro`允许为网页中的局部匹域单独指定主题，以便于在同一个页面中使用不同的主题。

## HTML 元素

通过为任意`HTML`元素添加 `data-theme` 属性指定元素主题。

<demo html="scope-element.html"></demo>

## WebComponent

`WebComponent`与主文档的样式是隔离，默认情况下，`ThemePro`的`CSS`主题变量也会被穿透到`Shadow DOM`中。因此，主题切换在`WebComponent`也是可以生效的。

<demo html="webcomponent.html"></demo>

`WebComponent`中创建局部主题与普通 HTML 有点不一样。
<demo html="scope-webcomponent.html"></demo>

-   示例中的`auto-card`和`auto-list`是基于`lit`开发的两个`WebComponent`，它们的样式是通过`lit`的`css`模块来定义的。
-   默认情况下，自定义的主题是无法穿透到嵌套的深层`WebComponent`中的，如果要让深层嵌套的`WebComponent`也能够使用自定义的主题，需要在开发`WebComponent`时使用`ThemeProController`。代码如下：

```ts
import { ThemeProController } from "themepro/lit";
@customElement("auto-list")
export class AutoListComponent extends LitElement {
    themepro = new ThemeProController(this);
    render() {
        return html`
            <div class="auto-list">
                <slot></slot>
            </div>
        `;
    }
}
```

然后在使用`WebComponent`时，需要在`WebComponent`中添加`data-theme`属性，并指定主题颜色名称。如下：

```ts
<auto-list data-theme="#fff000">
```

:::warning 注意
`WebComponent`中的`data-theme`属性不能使用`red`、`blue`等语义颜色，必须是`RGB`颜色值。
:::
