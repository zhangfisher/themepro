# Tooltip 远程内容加载功能

这个目录包含了 TooltipController 远程内容加载功能的 Storybook 故事，使用 MSW (Mock Service Worker) 提供模拟 API 服务。

## 📁 文件说明

- **`RemoteContent.stories.ts`** - 完整的远程内容加载功能演示（使用MSW模拟API）
- **`local-server-example.js`** - 可选的本地开发服务器示例代码
- **`README.md`** - 本说明文件

## 🚀 快速开始

### 使用 MSW 模拟 API（推荐）

**无需额外步骤！** MSW 已在 Storybook 中预配置，所有远程请求都会被自动拦截并返回模拟数据。

1. **启动 Storybook：**
   ```bash
   npm run storybook
   ```

2. **查看演示：**
   导航到 "控制器/Tooltip/远程内容加载" 查看所有演示。

### 使用本地服务器（可选）

如果你想使用真实的本地服务器而不是 MSW，可以：

```bash
# 安装依赖
npm install express cors uuid

# 启动服务器
node local-server-example.js
```

## 🔧 MSW 配置

MSW 配置位于 `packages/components/.storybook/` 目录：

- **`preview.ts`** - MSW 初始化和加载器配置
- **`api.ts`** - 模拟 API 处理程序定义

## 🎯 功能特性

### 支持的 URL 格式

TooltipController 支持以下方式加载远程内容：

```html
<!-- HTTP 远程内容 -->
<button data-tooltip="http://localhost:3000/api/tooltip/post">
  加载文章内容
</button>

<!-- HTTPS 远程内容 -->
<button data-tooltip="https://example.com/api/content">
  加载远程内容
</button>

<!-- Link 协议 -->
<button data-tooltip="link://http://localhost:3000/api/tooltip/user">
  Link协议加载
</button>

<!-- Link 属性 -->
<button data-tooltip-link="http://localhost:3000/api/tooltip/comment">
  使用link属性
</button>
```

### 配置选项

| 属性 | 说明 | 示例 |
|------|------|------|
| `data-tooltip-predict-size` | 预测内容尺寸 `width,height` | `data-tooltip-predict-size="400,200"` |
| `data-tooltip-loading` | 自定义加载状态HTML | `data-tooltip-loading="<div>加载中...</div>"` |
| `data-tooltip-trigger` | 触发方式 | `data-tooltip-trigger="click"` |
| `data-tooltip-delay-hide` | 延迟隐藏时间(毫秒) | `data-tooltip-delay-hide="5000"` |

## 📋 可用的模拟端点

MSW 模拟 API 提供了以下端点（所有请求都被拦截并返回模拟数据）：

### 基础内容端点

- `GET http://localhost:3000/api/tooltip/post` - 文章内容
- `GET http://localhost:3000/api/tooltip/comment` - 评论内容
- `GET http://localhost:3000/api/tooltip/html-sample` - HTML示例
- `GET http://localhost:3000/api/tooltip/todo` - 待办事项
- `GET http://localhost:3000/api/tooltip/user` - 用户信息
- `GET http://localhost:3000/api/tooltip/text-content` - 文本内容

### 特殊功能端点

- `GET http://localhost:3000/api/tooltip/delay` - 2秒延迟加载
- `GET http://localhost:3000/api/tooltip/json-content` - JSON数据展示
- `GET http://localhost:3000/api/tooltip/image-info` - 图片信息
- `GET http://localhost:3000/api/tooltip/uuid` - 生成UUID
- `GET http://localhost:3000/api/tooltip/post-detail` - 详细文章
- `GET http://localhost:3000/api/tooltip/user-detail` - 详细用户信息

### 错误测试端点

- `GET http://localhost:3000/api/tooltip/status/404` - 404错误
- `GET http://localhost:3000/api/tooltip/status/500` - 500错误
- `GET http://localhost:3000/api/tooltip/network-error` - 网络错误
- `GET http://localhost:3000/api/tooltip/empty` - 空内容

## 🎨 示例代码

### 基础使用

```html
<button
    data-tooltip="http://localhost:3000/api/tooltip/post"
    data-tooltip-placement="top"
    data-tooltip-predict-size="400,200">
    加载文章内容
</button>
```

### 带自定义加载状态

```html
<button
    data-tooltip="http://localhost:3000/api/tooltip/delay"
    data-tooltip-loading='<div style="padding: 10px;">⏳ 加载中...</div>'
    data-tooltip-predict-size="300,120">
    慢速加载示例
</button>
```

### 点击触发模式

```html
<button
    data-tooltip="http://localhost:3000/api/tooltip/user"
    data-tooltip-trigger="click"
    data-tooltip-delay-hide="5000"
    data-tooltip-loading='<div>🔄 加载中...</div>'>
    点击获取用户信息
</button>
```

### 错误处理示例

```html
<button
    data-tooltip="http://localhost:3000/api/tooltip/status/404"
    data-tooltip-loading='<div>⏳ 请求中...</div>'>
    404错误示例
</button>
```

## 🔧 开发指南

### 自定义服务器端点

你可以参考 `local-server-example.js` 创建自己的端点：

```javascript
app.get('/api/custom-content', (req, res) => {
    res.type('html').send(`
        <div style="padding: 16px;">
            <h3>自定义内容</h3>
            <p>这是自定义的HTML内容。</p>
        </div>
    `);
});
```

### 内容格式要求

- 返回的内容应该是有效的HTML
- 建议使用内联样式而非外部CSS
- 内容大小建议控制在合理范围内（通常不超过 800x600 像素）
- 避免使用复杂的JavaScript交互

### 错误处理

TooltipController 会自动处理以下错误情况：

- 网络连接错误
- HTTP错误状态码（404、500等）
- 空内容响应
- 超时情况

错误信息会显示在tooltip中，不会导致应用崩溃。

## 🐛 故障排除

### 常见问题

1. **CORS错误** - 确保服务器启用了CORS支持
2. **端口冲突** - 修改 `local-server-example.js` 中的端口号
3. **内容不显示** - 检查返回的内容是否为有效的HTML格式
4. **加载状态一直显示** - 检查网络请求是否成功完成

### 调试技巧

1. 打开浏览器开发者工具查看网络请求
2. 直接访问API端点确认内容格式
3. 检查控制台是否有JavaScript错误

## 📚 相关文档

- [TooltipController API文档](../../controllers/tooltip/README.md)
- [Storybook 故事开发指南](../../../docs/storybook.md)
- [组件开发规范](../../../docs/component-development.md)