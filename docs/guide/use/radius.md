# 圆角设置

ThemePro 提供了统一的圆角设置系统，用于控制元素的圆角半径，确保整个应用的视觉一致性。

## 圆角选项

ThemePro 支持以下圆角选项：

- **none** - 无圆角（直角）
- **x-small** - 特小圆角
- **small** - 小圆角
- **medium** - 中等圆角（默认）
- **large** - 大圆角
- **x-large** - 特大圆角

## 设置全局圆角

你可以通过 `themePro.radius` 属性设置全局圆角：

```js
// 设置为大圆角
themePro.radius = 'large';

// 设置为无圆角
themePro.radius = 'none';
```

## 圆角实现原理

ThemePro 通过在根元素上设置 `data-radius` 属性来控制圆角：

```js
// 在 JavaScript 中设置
document.documentElement.dataset.radius = 'large';

// 等同于在 HTML 中设置
// <html data-radius="large">
```

然后，CSS 变量会根据不同的圆角设置不同的值：

```css
:root {
  --t-radius-xs: 2px;
  --t-radius-sm: 4px;
  --t-radius-md: 8px;
  --t-radius-lg: 12px;
  --t-radius-xl: 16px;
}

[data-radius="none"] {
  --t-radius-xs: 0;
  --t-radius-sm: 0;
  --t-radius-md: 0;
  --t-radius-lg: 0;
  --t-radius-xl: 0;
}

[data-radius="small"] {
  --t-radius-xs: 1px;
  --t-radius-sm: 2px;
  --t-radius-md: 4px;
  --t-radius-lg: 6px;
  --t-radius-xl: 8px;
}

[data-radius="large"] {
  --t-radius-xs: 4px;
  --t-radius-sm: 8px;
  --t-radius-md: 12px;
  --t-radius-lg: 16px;
  --t-radius-xl: 24px;
}
```

## 使用圆角变量

在样式中，你可以使用 CSS 变量来应用圆角：

```css
.card {
  border-radius: var(--t-radius-md);
}

.button {
  border-radius: var(--t-radius-sm);
}

.modal {
  border-radius: var(--t-radius-lg);
}
```

## 圆角工具类

ThemePro 提供了一系列圆角工具类，用于快速应用圆角：

```html
<div class="t-radius-none">无圆角</div>
<div class="t-radius-xs">特小圆角</div>
<div class="t-radius-sm">小圆角</div>
<div class="t-radius-md">中等圆角</div>
<div class="t-radius-lg">大圆角</div>
<div class="t-radius-xl">特大圆角</div>
<div class="t-radius-circle">圆形</div>
<div class="t-radius-pill">胶囊形</div>
```

## 在主题中设置圆角

在创建主题时，你可以设置默认的圆角大小：

```js
themePro.createTheme({
  // ...其他配置
  radius: 'medium'  // 设置默认圆角大小
});
```