# 圆角设置

ThemePro 提供了统一的圆角设置系统，用于控制元素的圆角半径，确保整个应用的视觉一致性。

## 圆角选项

ThemePro 支持以下圆角选项：

| 圆角名称     |      |
|-------------|------|
| `none` |  无圆角（直角）
| `x-small` | 特圆角
| `small` | 小圆角
| `medium` | 中等圆角（默认）
| `large` | 大圆角
| `x-large` | 特大圆角


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
  
## 使用圆角变量

在样式中，你可以使用 CSS 变量来应用圆角：

```css
{
    --t-border-radius-x-small: 0.2rem;
    --t-border-radius-small: 0.3rem;
    --t-border-radius-medium: 0.5rem;
    --t-border-radius-large: 1rem;
    --t-border-radius-x-large: 1.2rem;
    --t-border-radius-circle: 50%;
    --t-border-radius-pill: 9999px;
}
```

## 在主题中设置圆角

在创建主题时，你可以设置默认的圆角大小：

```js
themePro.create({
  // ...其他配置
  radius: 'medium'  // 设置默认圆角大小
});
```


<demo html="radius.html" demo-title="圆角控制" />