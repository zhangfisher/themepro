# 尺寸系统

ThemePro 提供了统一的尺寸系统，用于控制组件大小、间距和其他尺寸相关的样式属性。

## 尺寸选项

ThemePro 支持以下尺寸选项：

- **x-small** - 特小尺寸
- **small** - 小尺寸
- **medium** - 中等尺寸（默认）
- **large** - 大尺寸
- **x-large** - 特大尺寸

## 设置全局尺寸

你可以通过 `themePro.size` 属性设置全局组件尺寸：

```js
// 设置为大尺寸
themePro.size = 'large';

// 设置为小尺寸
themePro.size = 'small';
```

设置全局尺寸后，所有支持尺寸系统的组件都会自动调整大小。

## 尺寸实现原理

ThemePro 通过在根元素上设置 `data-size` 属性来控制尺寸：

```js
// 在 JavaScript 中设置
document.documentElement.dataset.size = 'large';

// 等同于在 HTML 中设置
// <html data-size="large">
```

然后，CSS 变量会根据不同的尺寸设置不同的值：

```css
:root {
  --t-font-size: 14px;
  --t-line-height: 1.5;
  --t-padding-x: 16px;
  --t-padding-y: 8px;
}

[data-size="small"] {
  --t-font-size: 12px;
  --t-line-height: 1.4;
  --t-padding-x: 12px;
  --t-padding-y: 6px;
}

[data-size="large"] {
  --t-font-size: 16px;
  --t-line-height: 1.6;
  --t-padding-x: 20px;
  --t-padding-y: 10px;
}
```

## 组件中使用尺寸

在组件中，你可以使用 CSS 变量来应用尺寸：

```css
.button {
  font-size: var(--t-font-size);
  line-height: var(--t-line-height);
  padding: var(--t-padding-y) var(--t-padding-x);
}
```

## 单独设置组件尺寸

你也可以为单个组件设置不同的尺寸，覆盖全局设置：

```html
<button class="t-size-small">小按钮</button>
<button class="t-size-large">大按钮</button>
```

ThemePro 提供了相应的 CSS 类来支持这种用法。