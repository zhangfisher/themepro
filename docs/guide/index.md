# 关于

`ThemePro` 是一个强大的主题管理工具，专为现代 Web 应用设计，提供了简单易用的 API 来管理应用的主题、颜色、尺寸和间距等样式属性。

如果您想构建一个可扩展、能实时响应主题切换、具有沉浸式体验的 Web 应用，`ThemePro` 将是您的最佳选择。

## 核心特性

- **主题管理**：轻松切换明暗主题，支持自定义主题创建
- **变体颜色**：内置五种语义化变体颜色（primary、success、warning、danger、info）
- **尺寸系统**：统一的尺寸系统，包括组件大小、间距和圆角
- **渐变色生成**：基于基础颜色自动生成渐变色系
- **CSS 变量**：使用现代 CSS 变量实现主题切换，无需重新加载页面
- **组件支持**：提供基础组件库，与主题系统无缝集成

## 快速入门

ThemePro 设计为即插即用，只需几行代码即可为您的应用添加主题支持：

```js
import { themePro } from 'themepro';

// 切换到暗色主题
themePro.theme = 'dark';

// 调整组件尺寸
themePro.size = 'large';

// 创建自定义主题
themePro.create({
  name: 'custom',
  theme: '#3366ff',
  variants: {
    primary: '#3366ff',
    success: '#00cc66',
    warning: '#ffcc00',
    danger: '#ff3366',
    info: '#33ccff'
  }
});
```

## 指南目录

- [入门指南](./intro/get-started.md) - 快速上手 ThemePro
- [安装说明](./intro/install.md) - 如何安装和配置 ThemePro
- [设计原理](./intro/principle.md) - 了解 ThemePro 的设计理念和实现原理

## 使用指南

- [主题管理](./use/theme.md) - 如何使用和切换主题
- [变体颜色](./use/variant.md) - 使用语义化变体颜色
- [尺寸系统](./use/size.md) - 控制组件尺寸
- [间距控制](./use/spacing.md) - 管理元素间距
- [圆角设置](./use/radius.md) - 自定义元素圆角
- [预设主题](./use/presets.md) - 使用内置预设主题
- [自动变量](./use/autovars.md) - 自动生成的 CSS 变量
- [颜色系统](./use/colors.md) - 颜色系统详解