# 自动变量

`ThemePro`提供了一系列以 `--auto-` 开头的 `CSS` 变量，这些变量会在切换 `data-theme`、`data-size`、`data-radius` 和 `data-spacing` 时自动更新，让你的应用能够无缝适应不同的主题和尺寸设置。


> **注意**：您可以在网站开发时直接使用这些 CSS 变量来实现主题化，无需手动管理变量切换。

 

## 自动变量的优势

- **简化开发** - 无需手动处理主题切换逻辑
- **一致性** - 确保整个应用使用统一的样式变量
- **可维护性** - 集中管理样式变量，便于后期调整
- **响应式** - 自动适应不同的主题和尺寸设置

## 使用自动变量

在 CSS 中直接使用自动变量：

```css
.my-component {
  color: var(--auto-color);
  background-color: var(--auto-bgcolor);
  padding: var(--auto-padding);
  border: var(--auto-border);
  border-radius: var(--auto-border-radius);
  font-size: var(--auto-font-size);
}

.my-component-title {
  color: var(--auto-title-color);
  background-color: var(--auto-title-bgcolor);
}

.my-component-button {
  background-color: var(--auto-primary-color);
  color: white;
}
```

## 颜色变量

| 变量名称  | 值  | 用途 |
| ---- | ---- | --- |
| `--auto-theme-color` | `var(--t-theme-color)` | 默认主题颜色 |
| `--auto-color` | `var(--t-theme-color)` | 默认字体颜色 |
| `--auto-bgcolor` | `var(--t-theme-bgcolor)` | 默认背景色 |
| `--auto-border-color` | `var(--t-color-theme-2)` | 边框颜色 |
| `--auto-active-border-color` | `var(--t-color-primary-6)` | 活动边框颜色 |
| - |||
| `--auto-panel-bgcolor` | `var(--t-theme-bgcolor-1)` | 面板背景颜色 |
| `--auto-title-color` | `var(--t-color-primary-6)` | 标题字体颜色 |
| `--auto-title-bgcolor` | `var(--t-theme-bgcolor-2)` | 标题背景颜色
| `--auto-input-bgcolor` | `var(--t-theme-bgcolor)` | 输入框背景颜色 |
| - |||
| `--auto-primary-color` | `var(--t-color-primary-5)` | 主题颜色 |
| `--auto-danger-color` | `var(--t-color-danger-5)` | 错误颜色 |
| `--auto-warning-color` | `var(--t-color-warning-5)` | 警告颜色 |
| `--auto-info-color` | `var(--t-color-info-5)` | 信息颜色 |
| `--auto-success-color` | `var(--t-color-success-5)` | 成功颜色 |
| - |||
| `--auto-dark-bgcolor` | `color-mix( in hsl, var(--auto-bgcolor) , black 10%)` | 暗色背景色 |
| `--auto-light-bgcolor` | `color-mix( in hsl, var(--auto-bgcolor) , white 10%)` | 亮色背景色 |
| `--auto-dark-color` | `color-mix( in hsl, var(--auto-color) , black 10%)` | 暗色前景色 |
| `--auto-light-color` | `color-mix( in hsl, var(--auto-color) , white 10%)` | 亮色前景色 | 
| `--auto-disable-color` | ` var(--t-color-theme-3)` | 禁用前景色 |
| `--auto-selected-color` | `color-mix(in srgb, var(--t-color-theme-3) 40%, transparent)` | 选择前景色 |

<demo html="autovars-colors.html"></demo>

## 字体变量

| 变量名称  | 值  | 用途 |
| ---- | ---- | --- |
| `--auto-font` | `var(--t-font-size-medium)` | 字体大小 |
| `--auto-font-size` | `var(--t-font-size-medium)` | 字体大小 |
| `--auto-font-family` | `Lantinghei SC, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif` | 定义网站字体 |
| `--auto-font-weight` | `var(--t-font-weight-medium)` | 字体粗细 |
| `--auto-letter-spacing` | `var(--t-letter-spacing-medium)` | 字体间距 |
| `--auto-line-height` | `var(--t-line-height-medium)` | 行高 |

<demo html="autovars-font.html"></demo>


## 间距变量

| 变量名称  | 值  | 用途 |
| ---- | ---- | --- |
| `--auto-spacing` | `var(--t-spacing-medium)` | 通用间距  |
| `--auto-padding` | `var(--t-spacing-medium)` | 内容内边距 |
| `--auto-margin` | `var(--t-spacing-medium)` | 内容外边距 |
| `--auto-input-padding` | `calc(0.5 * var(--auto-padding))` | 输入框内边距 |
| `--auto-input-height` | `var(--t-line-heightmedium)` | 输入框高度 |

## 边框变量

| 变量名称  | 值  | 用途 |
| ---- | ---- | --- |
| `--auto-border` | `1px solid var(--auto-border-color)` | 常规边框 |
| `--auto-border-active` | `1px solid var(--auto-border-active-color)` | 活动边框，用于标识 `hover` 或 `active` |
| `--auto-border-radius` | `var(--t-border-radius-medium)` | 圆角 |
| `--auto-shadow` | `var(--t-shadow-medium)` | 阴影 |

## 其他变量

| 变量名称  | 值  | 用途 |
| ---- | ---- | --- |
| `--auto-icon-size` | `calc(1.5 * var(--t-font-size-medium))` | 图标大小 |

## 自动变量与主题切换

当你切换主题或调整尺寸设置时，自动变量会自动更新：

```js
// 切换到暗色主题
themePro.theme = 'dark';
// 所有使用 --auto-* 变量的元素会自动更新样式

// 调整尺寸
themePro.size = 'large';
// 所有使用 --auto-* 变量的元素会自动更新尺寸

// 调整圆角
themePro.radius = 'small';
// 所有使用 --auto-border-radius 的元素会自动更新圆角
```

## 组件示例

以下是使用自动变量的组件示例：

```html
<style>
  .card {
    background-color: var(--auto-panel-bgcolor);
    border: var(--auto-border);
    border-radius: var(--auto-border-radius);
    padding: var(--auto-padding);
    margin: var(--auto-margin);
    box-shadow: var(--auto-shadow);
  }
  
  .card-title {
    color: var(--auto-title-color);
    font-size: var(--auto-font-size);
    font-weight: var(--auto-font-weight);
    margin-bottom: var(--auto-spacing);
  }
  
  .card-content {
    color: var(--auto-color);
    line-height: var(--auto-line-height);
  }
  
  .card-button {
    background-color: var(--auto-primary-color);
    color: white;
    border: none;
    border-radius: var(--auto-border-radius);
    padding: var(--auto-input-padding);
    font-size: var(--auto-font-size);
    cursor: pointer;
  }
</style>

<div class="card">
  <h3 class="card-title">卡片标题</h3>
  <div class="card-content">卡片内容</div>
  <button class="card-button">确认</button>
</div>
```



