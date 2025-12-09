# 主题色

`ThemePro`提供了简单直观的 API 来管理应用的主题。

:::warning 提示
主题色用于定义网站和组件的背景。
:::

## 切换主题色

`ThemePro` 默认提供了 `light` 、 `dark` 、 `blue` 和 `red` 共`4`种主题色，你可以通过 `ThemePro.theme` 属性来切换：

```js
// 切换到暗色主题
ThemePro.theme = 'dark';

// 切换到亮色主题
ThemePro.theme = 'light';

```

:::warning 提示
`ThemePro.theme="<主题名称>"`等效于`document.documentElement.dataset.theme='<主题名称>'`
这意味着，如果你没有导入`themepro.js`文件，也可以在`html`文件中使用`data-theme`属性来切换主题。
:::


## 主题检测

你可以通过 `ThemePro.theme` 属性获取当前主题：

```js
const currentTheme = ThemePro.theme;
console.log(`当前主题: ${currentTheme}`);
```

## 预设主题

ThemePro 内置了几个预设主题：

- `dark.css` - 默认暗色主题
- `blue.css` - 蓝色主题
- `red.css` - 红色主题

你可以直接引入这些预设主题：

```js
// 引入预设主题
import 'themepro/dist/blue.css';
// 或者在HTML中引入：
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/themepro/themes/blue.css"/>
```


<demo html="theme.html" demo-title="预设主题"></demo>


## 创建自定义主题

除了内置的`light/dark/blue/red`，你还可以可以使用 `createTheme` 方法创建自定义主题：

```js
ThemePro.create({
  name: 'custom',  // 主题名称
  theme: '#3366ff',  // 主题基础颜色
  variants: {
    primary: '#3366ff',  // 主要颜色
    success: '#00cc66',  // 成功颜色
    warning: '#ffcc00',  // 警告颜色
    danger: '#ff3366',   // 危险颜色
    info: '#33ccff'      // 信息颜色
  },
  radius: 'medium',  // 圆角大小
  size: 'medium'     // 组件尺寸
});
```


<demo html="custom-theme.html" demo-title="自定义主题"></demo>

## 高级主题配置

对于更复杂的主题需求，你可以提供详细的配置：

```js
ThemePro.create({
  name: 'advanced',
  theme: {
    color: '#3366ff',
    dark: false,        // 是否为深色系主题
    range: [10, 98],    // 颜色亮度范围
    levels: [10, 0, 1, 2, 3, 4 ]  // 主题背景梯度颜色级别
  },
  variants: {
    primary: {
      color: '#3366ff',
      range: [10, 95],
      levels: [10, 0, 1, 2, 3, 4 ]
    },
    // 其他变体颜色...
  }
});
```

- `range`用于指定颜色主题亮度，数值范围在`0`至`100`之间。以`theme.color`为基准中间色，根据`range`指定的亮度范围生成`11级`梯度主题色。
- `levels`用于指定从`11级`梯度主题色中挑选出`1`个主题色和`5`个梯度背景颜色。



```css
// 例如：levels=[10, 0, 1, 2, 3, 4 ]
{
    --t-theme-color: var(--t-color-theme-10);
    --t-theme-bgcolor: var(--t-color-theme-0);
    --t-theme-bgcolor-1: var(--t-color-theme-1);
    --t-theme-bgcolor-2: var(--t-color-theme-2);
    --t-theme-bgcolor-3: var(--t-color-theme-3);
    --t-theme-bgcolor-4: var(--t-color-theme-4);
}
```

## 主题变量

可用的主题变量：

| 变量名称                 |  说明                      |
|--------------------------|----------------------------|
| `--t-color-theme-0`      | 主背景色                  |
| `--t-color-theme-1`      |                |
| `--t-color-theme-2`      |                |
| `--t-color-theme-3`      |                |
| `--t-color-theme-4`      |                |
| `--t-color-theme-5`      |                |
| `--t-color-theme-6`      |                |
| `--t-color-theme-7`      |                |
| `--t-color-theme-8`      |                |
| `--t-color-theme-9`      |                |
| `--t-color-theme-10`     |               |
| | |
| `--t-theme-color`        | 颜色主题色，用于主题前景色 |
| `--t-theme-bgcolor`      | 默认背景主题色               |
| `--t-theme-bgcolor-1`    |                  |
| `--t-theme-bgcolor-2`    |                  |
| `--t-theme-bgcolor-3`    |               |
| `--t-theme-bgcolor-4`    |                |


