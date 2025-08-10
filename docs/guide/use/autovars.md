# 自动变量

提供一系列`--auto-`开头的`CSS`变量，这些变量会在切换`data-theme`、`data-size`、`data-radius`和`data-spacing`时自动切换。

> **注意**：您可以在网站开发时直接使用这些`CSS`变量来使用主题化。

## 颜色

| 变量名称  | 值  | 用途 |
| ---- | ---- | --- |
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

## 字体

| 变量名称  | 值  | 用途 |
| ---- | ---- | --- |
| `--auto-font` | `var(--t-font-size-medium)` | 字体大小 |
| `--auto-font-size` | `var(--t-font-size-medium)` | 字体大小 |
| `--auto-font-family` | `Lantinghei SC, Lantinghei SC, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif` | 定义网站字体 |
| `--auto-font-weight` | `var(--t-font-weight-medium)` | 字体粗细 |
| `--auto-letter-spacing` | `var(--t-letter-spacing-medium)` | 字体间距 |
| `--auto-line-height` | `var(--t-line-height-medium)` | 行高 |

## 间距

| 变量名称  | 值  | 用途 |
| ---- | ---- | --- |
| `--auto-spacing` | `var(--t-spacing-medium)` | 通用间距  |
| `--auto-padding` | `var(--t-spacing-medium)` | 内容内边距 |
| `--auto-margin` | `var(--t-spacing-medium)` | 内容外边距 |
| `--auto-input-padding` | `calc(0.5 * var(--auto-padding))` | 输入框内边距 |
| `--auto-input-height` | `var(--t-line-heightmedium)` | 输入框高度 |

##  边框

| 变量名称  | 值  | 用途 |
| ---- | ---- | --- |
| `--auto-border` | `1px solid var(--auto-border-color)` | 常规边框 |
| `--auto-border-active` | `1px solid var(--auto-border-active-color)` | 活动边框，用于标识`hover`或`active` |
| `--auto-border-radius` | `var(--t-border-radius-medium)` | 圆角 |
| `--auto-shadow` | `var(--t-shadow-medium)` | 阴影 |

## 其他

| 变量名称  | 值  | 用途 |
| ---- | ---- | --- |
| `--auto-icon-size` | `calc(1.5 * var(--t-font-size-medium))` | 图标大小 |
 
 