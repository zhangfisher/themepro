# 快速入门

`ThemePro`用于帮助创建可切换主题的应用。

## 第1步：引入样式和脚本


在`html`文件中使用`<style>`标签引入主题样式文件。 

```html
<link rel="stylesheet" href="themepro.min.css">
<script src="themepro.min.js" type="text/javascript"></script>
```

## 第2步：启用主题

在`html`标签中使用`data-theme`属性，激活默认主题。

```html  {1}
<html data-theme> 
  <head>
    <link rel="stylesheet" href="themepro.min.css">
    <script src="themepro.min.js" type="text/javascript"></script>
  </head>
  <body>
    .....
  </body>
  <html>
```

- `data-theme`表示激活`light`主题，即`默认主题`,等效于`data-theme="light"`。

## 第3步：引入预设主题

除了默认`light`主题外，我们也支持引入一些预设主题。

```html  {1,4-6}
<html data-theme="dark"> 
  <head>
    <link rel="stylesheet" href="themepro.min.css">
    <link rel="stylesheet" href="themepro.dark.min.css">
    <link rel="stylesheet" href="themepro.blue.min.css">
    <link rel="stylesheet" href="themepro.red.min.css">
    <script src="themepro.min.js" type="text/javascript"></script>
  </head>
  <body>
    .....
  </body>
  <html>
```

- 可以修改`data-theme="<主题名称>"`属性切换预设的主题。
- 也可以通过`ThemePro.theme=<主题名称>`函数来切换预设主题。

## 第4步：修改主题

可以通过以下两种方法来修改主题：

- **使用`ThemePro`对象（推荐）**

```js
// 切换到预设的红色主题，需要引入对应的themepro.red.min.css
ThemePro.theme="red"  
// 调节主题尺寸，可选的值有"x-small"|"small"|"medium"|"large" | "x-large"
ThemePro.size='small'    
// 调节主题圆角，可选的值有"x-small"|"small"|"medium"|"large" | "x-large"
ThemePro.radius='medium'     
// 调节主题间距，可选的值有"x-small"|"small"|"medium"|"large" | "x-large"
ThemePro.spacing='large'      
```

:::warning 提示
`ThemePro`是引入`themepro.min.js`后注入的全局变量。
:::

- **直接修改HTML元素属性**

也可以直接在`html`元素添加`data-theme`、`data-size`、`data-radius`和`data-spacing`属性，来调节整个网站尺寸、圆角和间距等。


## 第5步：修改定制主题

除了内置的`light`、`dark`、`red`、`blue`等预设主题，`ThemePro`也支持完全定制自己的主题颜色。

```js 
ThemePro.createTheme({
    name:'<主题名称>',
    theme:'<主题颜色>',
    size: 'medium',
    radius: 'medium',
    spacing: 'medium'    
})
```

- `ThemePro.createTheme`方法可以创建一个自定义的主题，支持修改主题色、尺寸、圆角、间距等。

## 第6步：修改关键色

`ThemePro.createVariant`方法可以设置关键颜色，包括`primary`、`success`、`info`、`warning`、`danger`等。

```js
ThemePro.createVariant('primary', {
    color: '#ff1732',    
})
```

## 第7步：主题化

`ThemePro`提供了一个主题化机制，如果您希望网站的元素或组件能在切换时自动渲染，即主题化。则应该在开发组件时使用相对的主题`CSS`变量。

**例如：**

我们需要开发一个主题化的卡片,该卡片可以在切换主题或调节主题参数时能够自动主题化。

```html
<style>
.card{
    display: flex;
    flex-direction: column;
    background: var(--auto-bgcolor);
    color: var(--auto-color);
    border-radius: var(--auto-border-radius);
    box-shadow: var(--auto-shadow);
    border: var(--auto-border);
    padding: 0;
    box-sizing: border-box;
}

</style>

<div class="card">卡片</div>

```

- `background: var(--auto-bgcolor)`代表卡片的背景是`--auto-bgcolor`变量的值。

`--auto-bgcolor`变量会随主题和参数变化，在其它地方修改`ThemePro.theme="dark"`，那么卡片背景就会是深色。

:::warning 重点
使用`--auto-<css 变量名>`来为主题化元素设置背景、边框、内外边距等。
:::
