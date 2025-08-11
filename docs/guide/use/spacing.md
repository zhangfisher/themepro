# 间距控制

ThemePro 提供了统一的间距控制系统，用于管理元素之间的间距，确保整个应用的间距一致性。

## 间距选项

ThemePro 支持以下间距选项：

- **x-small** - 特小间距
- **small** - 小间距
- **medium** - 中等间距（默认）
- **large** - 大间距
- **x-large** - 特大间距
- **auto** - 自动间距（根据上下文自动调整）

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
:root {
  --t-space-xs: 4px;
  --t-space-sm: 8px;
  --t-space-md: 16px;
  --t-space-lg: 24px;
  --t-space-xl: 32px;
}

[data-spacing="small"] {
  --t-space-xs: 2px;
  --t-space-sm: 4px;
  --t-space-md: 8px;
  --t-space-lg: 16px;
  --t-space-xl: 24px;
}

[data-spacing="large"] {
  --t-space-xs: 8px;
  --t-space-sm: 16px;
  --t-space-md: 24px;
  --t-space-lg: 32px;
  --t-space-xl: 48px;
}
```

## 使用间距变量

在样式中，你可以使用 CSS 变量来应用间距：

```css
.card {
  margin-bottom: var(--t-space-md);
  padding: var(--t-space-md);
}

.card-header {
  margin-bottom: var(--t-space-sm);
}

.card-footer {
  margin-top: var(--t-space-sm);
}
```

## 间距工具类

ThemePro 提供了一系列间距工具类，用于快速应用间距：

```html
<!-- 外边距 -->
<div class="t-m-xs">特小外边距</div>
<div class="t-m-sm">小外边距</div>
<div class="t-m-md">中等外边距</div>
<div class="t-m-lg">大外边距</div>
<div class="t-m-xl">特大外边距</div>

<!-- 内边距 -->
<div class="t-p-xs">特小内边距</div>
<div class="t-p-sm">小内边距</div>
<div class="t-p-md">中等内边距</div>
<div class="t-p-lg">大内边距</div>
<div class="t-p-xl">特大内边距</div>

<!-- 方向性边距 -->
<div class="t-mt-md">上外边距</div>
<div class="t-mr-md">右外边距</div>
<div class="t-mb-md">下外边距</div>
<div class="t-ml-md">左外边距</div>
<div class="t-mx-md">水平外边距</div>
<div class="t-my-md">垂直外边距</div>
```

## 紧凑模式

ThemePro 支持紧凑模式，通过 `sparse` 参数控制间距的紧凑程度：

```js
themePro.createTheme({
  // ...其他配置
  sparse: 0.8  // 间距缩小为正常的 80%
});
```