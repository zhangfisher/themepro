# 间距控制

`ThemePro`提供了统一的间距控制系统，用于管理元素之间的间距，主要是`padding`,`margin`,`line-height`,`letter-spacing`等，确保整个应用的间距一致性。

## 间距选项

`ThemePro`支持以下间距选项：

| 间距名称 | 默认值 |
|----------|--------|
| `x-small` | 特小间距 |
| `small` | 小间距 |
| `medium` | 中等间距（默认） |
| `large` | 大间距 |
| `x-large` | 特大间距 |
| `none` | 无间距 |


## 设置全局间距

你可以通过 `themePro.spacing` 属性设置全局间距：

```js
// 设置为大间距
themePro.spacing = 'large';

// 设置为小间距
themePro.spacing = 'small';

// 设置为自动间距
themePro.spacing = 'auto';
```

## 间距实现原理

ThemePro 通过在根元素上设置 `data-spacing` 属性来控制间距：

```js
// 在 JavaScript 中设置
document.documentElement.dataset.spacing = 'large';

// 等同于在 HTML 中设置
// <html data-spacing="large">
```

然后，CSS 变量会根据不同的间距设置不同的值：

```css
{
    --t-spacing-x-small: 0.5rem;
    --t-spacing-small: 0.75rem;
    --t-spacing-medium: 1rem;
    --t-spacing-large: 1.25rem;
    --t-spacing-x-large: 1.75rem;
}
```  

<demo html="spacing.html" ></demo>