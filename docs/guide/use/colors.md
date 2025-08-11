# 颜色系统

ThemePro 提供了强大而灵活的颜色系统，用于管理应用中的所有颜色，确保视觉一致性和主题切换的流畅体验。

## 颜色系统概述

ThemePro 的颜色系统基于以下几个核心概念：

1. **基础主题颜色** - 定义整个主题的基调
2. **变体颜色** - 语义化的颜色变体（primary、success、warning、danger、info）
3. **渐变色系** - 基于基础颜色自动生成的渐变色系
4. **CSS 变量** - 通过 CSS 变量实现颜色的统一管理和动态切换

## 颜色变量命名规则

ThemePro 使用以下命名规则定义颜色变量：

- `--t-color-theme-{n}` - 主题基础颜色系列，n 为 0-10 的数字，表示不同亮度级别
- `--t-color-{variant}-{n}` - 变体颜色系列，variant 为变体名称，n 为 0-10 的数字
- `--t-{variant}-color` - 变体文本颜色
- `--t-{variant}-bgcolor` - 变体背景颜色
- `--t-{variant}-bgcolor-{n}` - 变体背景颜色的不同亮度级别

## 渐变色生成

ThemePro 使用 `generateGradientColors` 函数根据基础颜色自动生成渐变色系：

```js
import { generateGradientColors } from 'themepro';

const { colors, dark } = generateGradientColors({
  color: '#3366ff',  // 基础颜色
  range: [10, 98],   // 亮度范围
  count: 5           // 生成颜色数量
});

console.log(colors);  // 输出生成的颜色数组
```

生成的渐变色会根据基础颜色的明暗自动调整：
- 如果基础颜色是亮色，渐变是从亮到暗
- 如果基础颜色是暗色，渐变是从暗到亮

## 颜色工具函数

ThemePro 提供了一系列颜色工具函数：

- `isDark(color)` - 判断颜色是否为暗色
- `isLight(color)` - 判断颜色是否为亮色
- `rgbToHsl(color)` - 将 RGB 颜色转换为 HSL 颜色
- `hslToRgb(hsl)` - 将 HSL 颜色转换为 RGB 颜色
- `toRGB(color)` - 将任意格式的颜色转换为 RGB 格式

## 在 CSS 中使用颜色变量

```css
.button-primary {
  background-color: var(--t-primary-bgcolor);
  color: var(--t-primary-color);
}

.button-primary:hover {
  background-color: var(--t-primary-bgcolor-1);
}

.button-primary:active {
  background-color: var(--t-primary-bgcolor-2);
}

.alert-danger {
  background-color: var(--t-danger-bgcolor);
  color: var(--t-danger-color);
}
```

## 颜色工具类

ThemePro 提供了一系列颜色工具类，用于快速应用颜色：

```html
<!-- 文本颜色 -->
<div class="t-text-primary">主要颜色文本</div>
<div class="t-text-success">成功颜色文本</div>
<div class="t-text-warning">警告颜色文本</div>
<div class="t-text-danger">危险颜色文本</div>
<div class="t-text-info">信息颜色文本</div>

<!-- 背景颜色 -->
<div class="t-bg-primary">主要颜色背景</div>
<div class="t-bg-success">成功颜色背景</div>
<div class="t-bg-warning">警告颜色背景</div>
<div class="t-bg-danger">危险颜色背景</div>
<div class="t-bg-info">信息颜色背景</div>
```

## 自定义颜色处理

在创建主题时，你可以提供自定义的颜色生成函数：

```js
themePro.createTheme({
  // ...其他配置
  onGenerateGradientColors: (options) => {
    // 自定义颜色生成逻辑
    const { color, range, dark } = options;
    // 返回自定义的颜色数组
    return ['#color1', '#color2', '#color3', ...];
  }
});
```