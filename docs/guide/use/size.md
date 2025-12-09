# 尺寸系统

`ThemePro`提供了统一的尺寸系统，用于控制组件大小、间距和其他尺寸相关的样式属性。

## 尺寸选项

ThemePro 支持以下尺寸选项：

| 尺寸名称      |      |
|-------------|------|
| `x-small` | 特小 |
| `small`  | 小   |
| `medium` | 中等（默认） |
| `large`  | 大   |
| `x-large` | 特大 |


## 设置全局尺寸

你可以通过 `themePro.size` 属性设置全局组件尺寸：

```js
// 设置为大尺寸
themePro.size = 'large';

// 设置为小尺寸
themePro.size = 'small';
```

设置全局尺寸后，所有支持尺寸系统的组件都会自动调整大小。

## 尺寸实现原理

`ThemePro`通过在根元素上设置 `data-size` 属性来控制尺寸：

```js
// 在 JavaScript 中设置
document.documentElement.dataset.size = 'large';

// 等同于在 HTML 中设置
// <html data-size="large">
```

然后，在开发时使用以`--auto-`开发的CSS变量，就可以实现在切换尺寸动态调整组件尺寸。



<demo html="sizes.html" demo-title="尺寸控制" />



:::warning 提示
更多的受`data-size`影响的以`--auto-`开头的CSS变量参见[自动变量](./autovars)
:::