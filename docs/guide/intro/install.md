# 安装

ThemePro 可以通过 `npm`、`yarn` 或 `pnpm` 安装：

::: code-group

```bash [npm]
npm install themepro
```

```bash [yarn]
yarn add themepro
```

```bash [pnpm]
pnpm add themepro
```
:::

## 基本引入

安装完成后，在你的项目入口文件中引入 ThemePro：

- **在代码中引入**

```js
import 'themepro/index.css';
import 'themepro';
```

- **在`HTML`文件中引入**

```
``html
<link rel="stylesheet" href="path/to/themepro/index.css">
<script src="https://cdn.jsdelivr.net/npm/themepro"></script>
```


:::warning 提示
导入`ThemePro`会创建一个全局变量`ThemePro`。
:::