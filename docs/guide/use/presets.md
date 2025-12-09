# 预设主题

ThemePro 提供了多个预设主题，可以直接使用或作为自定义主题的基础。

## 内置预设主题

ThemePro 内置了以下预设主题：

- **light** - 默认亮色主题
- **dark** - 默认暗色主题
- **blue** - 蓝色主题
- **red** - 红色主题

## 使用预设主题

你可以通过两种方式使用预设主题：

### 1. 通过 CSS 引入

直接在项目中引入预设主题的 CSS 文件：

```js
// 引入暗色主题
import 'themepro/dist/themes/dark.css';

// 引入蓝色主题
import 'themepro/dist/themes/blue.css';
```

### 2. 通过 JavaScript 切换

使用 `themePro.theme` 属性切换到预设主题：

```js
// 切换到暗色主题
themePro.theme = 'dark';

// 切换到蓝色主题
themePro.theme = 'blue';
```

## 预设主题结构

每个预设主题都定义了一系列 CSS 变量，包括：

- 基础颜色变量
- 变体颜色（primary、success、warning、danger、info）
- 文本颜色
- 背景颜色
- 边框颜色
- 阴影颜色

## 扩展预设主题

你可以基于预设主题创建自定义主题：

```js
// 引入预设主题
import 'themepro/dist/themes/blue.css';

// 扩展或覆盖预设主题的某些属性
themePro.create({
  name: 'custom-blue',
  theme: '#0055ff',  // 修改基础颜色
  variants: {
    primary: '#0055ff',
    // 保留其他变体颜色不变
  }
});
```

## 预设主题源码

预设主题定义在 `src/themes` 目录下：

- `light.css` - 亮色主题
- `dark.css` - 暗色主题
- `blue.css` - 蓝色主题
- `red.css` - 红色主题

你可以查看这些文件来了解主题的具体实现，或者作为创建自定义主题的参考。

## 在不同环境中使用预设主题

### 在浏览器中

```html
<link rel="stylesheet" href="path/to/themepro/dist/themes/dark.css">
```

### 在 React 中

```jsx
import { useEffect } from 'react';
import { themePro } from 'themepro';
import 'themepro/dist/themes/dark.css';

function App() {
  useEffect(() => {
    // 可以在组件中动态切换主题
    themePro.theme = 'dark';
  }, []);
  
  return (
    <div className="app">
      {/* 应用内容 */}
    </div>
  );
}
```

### 在 Vue 中

```vue
<script setup>
import { onMounted } from 'vue';
import { themePro } from 'themepro';
import 'themepro/dist/themes/dark.css';

onMounted(() => {
  // 可以在组件中动态切换主题
  themePro.theme = 'dark';
});
</script>

<template>
  <div class="app">
    <!-- 应用内容 -->
  </div>
</template>
```