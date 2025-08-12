# 快速入门

ThemePro 是一个强大的主题管理工具，用于帮助创建可切换主题的现代 Web 应用。本指南将帮助你快速上手 ThemePro。

## 第1步：安装 ThemePro

首先，你需要安装 ThemePro 包：

```bash
# 使用 npm
npm install themepro

# 使用 yarn
yarn add themepro

# 使用 pnpm
pnpm add themepro
```

## 第2步：引入样式和脚本

在你的 HTML 文件中引入 ThemePro 的样式和脚本：

```html
<link rel="stylesheet" href="themepro.min.css">
<script src="themepro.min.js" type="text/javascript"></script>
```

如果你使用模块化构建工具（如 webpack、Vite 等），可以这样引入：

```js
// 引入 ThemePro
import { themePro } from 'themepro';

// 引入基础样式
import 'themepro/dist/styles/index.css';
```

## 第3步：启用主题

在 HTML 标签中使用 `data-theme` 属性，激活默认主题：

```html {1}
<html data-theme> 
  <head>
    <link rel="stylesheet" href="themepro.min.css">
    <script src="themepro.min.js" type="text/javascript"></script>
  </head>
  <body>
    <!-- 页面内容 -->
  </body>
</html>
```

- `data-theme` 表示激活 `light` 主题，即默认主题，等效于 `data-theme="light"`。

## 第4步：引入预设主题

除了默认 `light` 主题外，ThemePro 也支持引入一些预设主题：

```html {1,4-6}
<html data-theme="dark"> 
  <head>
    <link rel="stylesheet" href="themepro.min.css">
    <link rel="stylesheet" href="themepro.dark.min.css">
    <link rel="stylesheet" href="themepro.blue.min.css">
    <link rel="stylesheet" href="themepro.red.min.css">
    <script src="themepro.min.js" type="text/javascript"></script>
  </head>
  <body>
    <!-- 页面内容 -->
  </body>
</html>
```

- 可以修改 `data-theme="<主题名称>"` 属性切换预设的主题。
- 也可以通过 `ThemePro.theme=<主题名称>` 函数来切换预设主题。

如果使用模块化构建工具，可以这样引入预设主题：

```js
// 引入基础样式
import 'themepro/dist/styles/index.css';

// 引入预设主题
import 'themepro/dist/themes/dark.css';
import 'themepro/dist/themes/blue.css';
import 'themepro/dist/themes/red.css';
```

## 第5步：切换主题

可以通过以下两种方法来切换主题：

### 使用 `ThemePro` 对象（推荐）

```js
// 切换到预设的红色主题，需要引入对应的 themepro.red.min.css
ThemePro.theme = "red"  

// 调节主题尺寸，可选的值有 "x-small" | "small" | "medium" | "large" | "x-large"
ThemePro.size = 'small'    

// 调节主题圆角，可选的值有 "none" | "x-small" | "small" | "medium" | "large" | "x-large"
ThemePro.radius = 'medium'     

// 调节主题间距，可选的值有 "x-small" | "small" | "medium" | "large" | "x-large" | "auto"
ThemePro.spacing = 'large'      
```

:::warning 提示
`ThemePro` 是引入 `themepro.min.js` 后注入的全局变量。如果使用模块化构建工具，应该使用 `themePro`（小写 t 开头）。
:::

### 直接修改 HTML 元素属性

也可以直接在 `html` 元素添加 `data-theme`、`data-size`、`data-radius` 和 `data-spacing` 属性，来调节整个网站的主题、尺寸、圆角和间距等：

```html
<html data-theme="dark" data-size="large" data-radius="small" data-spacing="medium">
  <!-- 页面内容 -->
</html>
```

## 第6步：创建自定义主题

除了内置的 `light`、`dark`、`red`、`blue` 等预设主题，ThemePro 也支持完全定制自己的主题：

```js 
ThemePro.create({
    name: 'custom',              // 主题名称
    theme: '#3366ff',            // 主题基础颜色
    size: 'medium',              // 组件尺寸
    radius: 'medium',            // 圆角大小
    spacing: 'medium',           // 间距大小
    variants: {
        primary: '#3366ff',      // 主要颜色
        success: '#00cc66',      // 成功颜色
        warning: '#ffcc00',      // 警告颜色
        danger: '#ff3366',       // 危险颜色
        info: '#33ccff'          // 信息颜色
    }
})

// 切换到自定义主题
ThemePro.theme = 'custom';
```

## 第7步：自定义变体颜色

ThemePro 提供了 `createVariant` 方法，可以单独设置变体颜色，包括 `primary`、`success`、`info`、`warning`、`danger` 等：

```js
// 自定义主要颜色
ThemePro.createVariant('primary', {
    color: '#3366ff',            // 基础颜色
    range: [10, 98],             // 亮度范围
    levels: [5, 1, 2, 3, 4, 5]   // 颜色级别
});

// 自定义成功颜色
ThemePro.createVariant('success', {
    color: '#00cc66',
    dark: false                  // 指定为亮色系
});

// 自定义警告颜色
ThemePro.createVariant('warning', '#ffcc00');  // 简化写法，直接传入颜色值
```

## 第8步：在样式中使用主题变量

ThemePro 生成了一系列 CSS 变量，你可以在样式中直接使用这些变量：

```css
/* 使用主题颜色 */
.my-element {
    color: var(--t-theme-color);
    background-color: var(--t-theme-bgcolor);
    border: 1px solid var(--t-color-theme-2);
}

/* 使用变体颜色 */
.my-button {
    background-color: var(--t-primary-bgcolor);
    color: var(--t-primary-color);
}

.my-alert {
    background-color: var(--t-danger-bgcolor);
    color: var(--t-danger-color);
}

/* 使用自动变量（推荐） */
.my-component {
    color: var(--auto-color);
    background-color: var(--auto-bgcolor);
    padding: var(--auto-padding);
    border: var(--auto-border);
    border-radius: var(--auto-border-radius);
}
```

## 第9步：创建响应式主题切换

以下是一个简单的主题切换按钮示例：

```html
<button id="theme-toggle">切换主题</button>

<script>
    const toggleButton = document.getElementById('theme-toggle');
    toggleButton.addEventListener('click', () => {
        // 切换明暗主题
        const currentTheme = ThemePro.theme;
        ThemePro.theme = currentTheme === 'dark' ? 'light' : 'dark';
    });
</script>
```

## 第10步：高级主题配置

对于更复杂的主题需求，你可以提供详细的配置：

```js
ThemePro.create({
    name: 'advanced',
    theme: {
        color: '#3366ff',        // 基础颜色
        dark: false,             // 是否为深色系主题
        range: [10, 98],         // 颜色亮度范围
        levels: [5, 1, 2, 3, 4, 5]  // 主题背景梯度颜色级别
    },
    variants: {
        primary: {
            color: '#3366ff',
            range: [10, 95],
            levels: [5, 1, 2, 3, 4, 5]
        },
        success: {
            color: '#00cc66',
            dark: false
        },
        // 其他变体颜色...
    },
    radius: 'medium',
    size: 'medium',
    sparse: 0.9  // 间距紧凑度，值越小间距越紧凑
});
```

## 完整示例

以下是一个完整的 ThemePro 使用示例：

```html
<!DOCTYPE html>
<html data-theme="light" data-size="medium" data-radius="medium" data-spacing="medium">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ThemePro 示例</title>
    <link rel="stylesheet" href="themepro.min.css">
    <link rel="stylesheet" href="themepro.dark.min.css">
    <script src="themepro.min.js"></script>
    <style>
        body {
            font-family: var(--auto-font-family);
            color: var(--auto-color);
            background-color: var(--auto-bgcolor);
            padding: var(--auto-padding);
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .card {
            background-color: var(--auto-panel-bgcolor);
            border: var(--auto-border);
            border-radius: var(--auto-border-radius);
            padding: var(--auto-padding);
            margin-bottom: var(--auto-margin);
        }
        
        .card-title {
            color: var(--auto-title-color);
            margin-bottom: var(--auto-spacing);
        }
        
        .button {
            background-color: var(--auto-primary-color);
            color: white;
            border: none;
            border-radius: var(--auto-border-radius);
            padding: var(--auto-input-padding);
            cursor: pointer;
        }
        
        .button-danger {
            background-color: var(--auto-danger-color);
        }
        
        .controls {
            display: flex;
            gap: var(--auto-spacing);
            margin-bottom: var(--auto-margin);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ThemePro 示例</h1>
        
        <div class="controls">
            <button class="button" id="toggle-theme">切换主题</button>
            <button class="button" id="toggle-size">切换尺寸</button>
            <button class="button" id="toggle-radius">切换圆角</button>
            <button class="button" id="toggle-spacing">切换间距</button>
        </div>
        
        <div class="card">
            <h2 class="card-title">卡片标题</h2>
            <p>这是一个使用 ThemePro 样式的卡片组件。</p>
            <button class="button">确认</button>
            <button class="button button-danger">取消</button>
        </div>
    </div>
    
    <script>
        // 主题切换
        document.getElementById('toggle-theme').addEventListener('click', () => {
            ThemePro.theme = ThemePro.theme === 'dark' ? 'light' : 'dark';
        });
        
        // 尺寸切换
        document.getElementById('toggle-size').addEventListener('click', () => {
            const sizes = ['small', 'medium', 'large'];
            const currentIndex = sizes.indexOf(ThemePro.size);
            const nextIndex = (currentIndex + 1) % sizes.length;
            ThemePro.size = sizes[nextIndex];
        });
        
        // 圆角切换
        document.getElementById('toggle-radius').addEventListener('click', () => {
            const radiuses = ['none', 'small', 'medium', 'large'];
            const currentIndex = radiuses.indexOf(ThemePro.radius);
            const nextIndex = (currentIndex + 1) % radiuses.length;
            ThemePro.radius = radiuses[nextIndex];
        });
        
        // 间距切换
        document.getElementById('toggle-spacing').addEventListener('click', () => {
            const spacings = ['small', 'medium', 'large'];
            const currentIndex = spacings.indexOf(ThemePro.spacing);
            const nextIndex = (currentIndex + 1) % spacings.length;
            ThemePro.spacing = spacings[nextIndex];
        });
    </script>
</body>
</html>
```

现在你已经掌握了 ThemePro 的基本用法，可以开始在你的项目中使用它来创建灵活的主题系统了！