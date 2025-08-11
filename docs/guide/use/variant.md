# 变体颜色

`ThemePro`提供了五种语义化变体颜色，用于表达不同的状态和意图：

| 名称     | 说明        |
|--------------|------------|
| `primary`   | 主要颜色,用于强调和主要操作 |
| `success`   | 成功颜色,表示操作成功或积极状态 |
| `warning`   | 警告颜色,用于需要注意的状态 |
| `danger`   | 危险颜色,表示错误或危险操作 |
| `info`   | 信息颜色,表示中性提示信息 |


## 使用变体颜色

每个变体颜色都会生成一系列 `CSS` 变量，你可以在样式中直接使用：


:::code-group

```css [primary]  {14}
{
    --t-color-primary-0: <value>;
    --t-color-primary-1: <value>;
    --t-color-primary-2: <value>;
    --t-color-primary-3: <value>;
    --t-color-primary-4: <value>;
    --t-color-primary-5: <value>;
    --t-color-primary-6: <value>;
    --t-color-primary-7: <value>;
    --t-color-primary-8: <value>;
    --t-color-primary-9: <value>;
    --t-color-primary-10: <value>;
    
    --t-primary-color:var(--t-color-primary-5); 
}
```

```css [success] {14}
{
    --t-color-success-0: <value>;
    --t-color-success-1: <value>;
    --t-color-success-2: <value>;
    --t-color-success-3: <value>;
    --t-color-success-4: <value>;
    --t-color-success-5: <value>;
    --t-color-success-6: <value>;
    --t-color-success-7: <value>;
    --t-color-success-8: <value>;
    --t-color-success-9: <value>;
    --t-color-success-10: <value>;
    
    --t-success-color:var(--t-color-success-5);
}
```

```css [warning] {14}
{
    --t-color-warning-0: <value>;
    --t-color-warning-1: <value>;
    --t-color-warning-2: <value>;
    --t-color-warning-3: <value>;
    --t-color-warning-4: <value>;
    --t-color-warning-5: <value>;
    --t-color-warning-6: <value>;
    --t-color-warning-7: <value>;
    --t-color-warning-8: <value>;
    --t-color-warning-9: <value>;
    --t-color-warning-10: <value>;
    
    --t-warning-color:var(--t-color-warning-5);
}
```

```css [danger] {14}
{
    --t-color-danger-0: <value>;
    --t-color-danger-1: <value>;
    --t-color-danger-2: <value>;
    --t-color-danger-3: <value>;
    --t-color-danger-4: <value>;
    --t-color-danger-5: <value>;
    --t-color-danger-6: <value>;
    --t-color-danger-7: <value>;
    --t-color-danger-8: <value>;
    --t-color-danger-9: <value>;
    --t-color-danger-10: <value>;
    
    --t-danger-color:var(--t-color-danger-5);
}
```

```css [info] {14}
{
    --t-color-info-0: <value>;
    --t-color-info-1: <value>;
    --t-color-info-2: <value>;
    --t-color-info-3: <value>;
    --t-color-info-4: <value>;
    --t-color-info-5: <value>;
    --t-color-info-6: <value>;
    --t-color-info-7: <value>;
    --t-color-info-8: <value>;
    --t-color-info-9: <value>;
    --t-color-info-10: <value>;
    
    --t-info-color:var(--t-color-info-5);
}
```

:::


## 创建自定义变体

你可以使用 `createVariant` 方法创建或更新变体颜色：

```js
ThemePro.createVariant('primary', {
  color: '#3366ff',  // 基础颜色
  range: [10, 98],   // 亮度范围
  levels: [5, 1, 2, 3, 4, 5]  // 颜色级别
});
ThemePro.createVariant('success', { color: '#66cc99' });
ThemePro.createVariant('warning', { color: '#f9d25c' });
ThemePro.createVariant('danger', { color: '#ff5e66' });
ThemePro.createVariant('info', { color: '#0d0d27' });
```

## 变体颜色配置

每个变体颜色可以配置以下参数：

| 属性     |  默认值 |  说明        |
|--------------|------------|------| 
| `color`    |   | 基础颜色,用于计算其他颜色值   | 
| `dark`     |   | 是否深色,如果没有提供则自动判断   |
| `range`   |`[10, 98]`  | 颜色明亮度范围,取值范围`0-100`    | 
| `levels`     |`[5, 1, 2, 3, 4, 5]`  |        颜色级别 | 


<demo html="createVariant.html" demo-title="自定义变体颜色" />

