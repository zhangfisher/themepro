import { http, HttpResponse } from "msw";
import { delay } from "flex-tools/async/delay";
// HTML内容生成函数
const createPostHTML = (id: number) => `
<div style="padding: 16px; font-family: Arial, sans-serif; line-height: 1.6;">
    <h3 style="margin: 0 0 12px 0; color: #2c3e50; font-size: 16px;">
        📄 文章标题 #${id}
    </h3>
    <p style="margin: 0 0 8px 0; color: #555; font-size: 14px;">
        这是从模拟API加载的文章内容示例。文章包含丰富的HTML内容，展示了TooltipController的远程内容加载能力。
    </p>
    <div style="background: #f8f9fa; padding: 8px; border-radius: 4px; border-left: 3px solid #007bff;">
        <strong style="color: #007bff;">发布时间:</strong> 2024-12-14 10:30<br>
        <strong style="color: #007bff;">作者:</strong> MSW Mock Server<br>
        <strong style="color: #007bff;">标签:</strong>
        <span style="background: #e3f2fd; color: #1976d2; padding: 2px 6px; border-radius: 3px; font-size: 12px;">Tooltip</span>
        <span style="background: #e8f5e8; color: #2e7d32; padding: 2px 6px; border-radius: 3px; font-size: 12px;">Mock API</span>
    </div>
</div>
`;

const createCommentHTML = (id: number) => `
<div style="padding: 12px; font-family: Arial, sans-serif;">
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
            U${id}
        </div>
        <div>
            <strong style="color: #333;">用户${id}</strong>
            <div style="font-size: 12px; color: #666;">刚刚</div>
        </div>
    </div>
    <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.5;">
        这是从模拟API加载的评论内容 #${id}。评论支持丰富的HTML格式，包括用户头像、时间戳和文本内容。
    </p>
    <div style="margin-top: 8px; display: flex; gap: 12px; font-size: 12px;">
        <span style="color: #007bff; cursor: pointer;">👍 赞同 (${Math.floor(
            Math.random() * 50
        )})</span>
        <span style="color: #666; cursor: pointer;">💬 回复</span>
        <span style="color: #666; cursor: pointer;">🔗 分享</span>
    </div>
</div>
`;

const createTodoHTML = (id: number) => `
<div style="padding: 12px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; font-family: Arial, sans-serif;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <input type="checkbox" ${
            Math.random() > 0.5 ? "checked" : ""
        } style="transform: scale(1.2);">
        <strong style="color: #856404;">📝 待办事项 #${id}</strong>
    </div>
    <p style="margin: 0; color: #856404; font-size: 14px;">
        ${
            [
                "完成TooltipController的文档编写",
                "测试远程内容加载功能",
                "优化错误处理机制",
                "添加更多示例用例",
            ][id % 4]
        }
    </p>
    <div style="margin-top: 8px; font-size: 12px; color: #856404;">
        优先级: ${["高", "中", "低"][id % 3]} |
        创建时间: ${new Date().toLocaleString()}
    </div>
</div>
`;

const createUserHTML = (id: number) => `
<div style="padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; font-family: Arial, sans-serif;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="width: 48px; height: 48px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #667eea; font-weight: bold; font-size: 18px;">
            ${String.fromCharCode(65 + id)}
        </div>
        <div>
            <h3 style="margin: 0; font-size: 16px;">用户${id}</h3>
            <p style="margin: 0; font-size: 12px; opacity: 0.9;">user${id}@mockapi.com</p>
        </div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 4px;">
        <p style="margin: 0; font-size: 13px;">
            <strong>个人简介:</strong> 这是用户${id}的个人资料卡片，展示了MSW模拟API返回的HTML内容格式。
        </p>
        <div style="margin-top: 8px; font-size: 12px;">
            📍 位置: Mock City | 🏢 公司: TechCorp | 📊 等级: ${
                ["初级", "中级", "高级"][id % 3]
            }
        </div>
    </div>
</div>
`;

const createImageInfoHTML = () => `
<div style="padding: 16px; font-family: Arial, sans-serif;">
    <h3 style="margin: 0 0 12px 0; color: #333;">🖼️ 图片信息</h3>
    <div style="display: grid; grid-template-columns: 80px 1fr; gap: 12px; align-items: start;">
        <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
            IMG
        </div>
        <div>
            <p style="margin: 0 0 8px 0; color: #555; font-size: 14px;">
                <strong>文件名:</strong> mock-image.jpg<br>
                <strong>尺寸:</strong> 1920 × 1080<br>
                <strong>大小:</strong> 2.4 MB<br>
                <strong>格式:</strong> JPEG
            </p>
            <div style="background: #f0f0f0; padding: 6px; border-radius: 4px; font-size: 12px; color: #666;">
                上传时间: ${new Date().toLocaleString()}
            </div>
        </div>
    </div>
</div>
`;

const createErrorHTML = (statusCode: number) => `
<div style="padding: 12px; border-radius: 4px; font-family: Arial, sans-serif;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="font-size: 20px;">${
            statusCode === 404 ? "❌" : statusCode === 500 ? "💥" : "⚠️"
        }</span>
        <strong style="color: #${
            statusCode === 404
                ? "#dc3545"
                : statusCode === 500
                ? "#dc3545"
                : "#ffc107"
        };">
            错误 ${statusCode}
        </strong>
    </div>
    <p style="margin: 0; color: #666; font-size: 14px;">
        ${
            statusCode === 404
                ? "请求的资源不存在。这是MSW模拟的404错误。"
                : statusCode === 500
                ? "服务器内部错误。这是MSW模拟的500错误。"
                : "请求处理失败。这是MSW模拟的错误响应。"
        }
    </p>
    <div style="margin-top: 8px; font-size: 12px; color: #999;">
        时间戳: ${new Date().toISOString()}
    </div>
</div>
`;

const createUUIDHTML = () => {
    const generateUUID = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                const r = (Math.random() * 16) | 0;
                const v = c === "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    };

    return `
<div style="padding: 16px; background: #e8f5e8; border: 1px solid #c3e6c3; border-radius: 6px; font-family: 'Courier New', monospace;">
    <h4 style="margin: 0 0 10px 0; color: #2e7d32;">🎲 生成的UUID</h4>
    <div style="background: white; padding: 8px; border-radius: 4px; border: 1px solid #c3e6c3; font-size: 14px; color: #2e7d32;">
        ${generateUUID()}
    </div>
    <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">
        生成时间: ${new Date().toLocaleString()}
    </p>
</div>
`;
};

export const handlers = [
    // 现有的用户API
    http.get("/user", () => {
        return HttpResponse.json({
            firstName: "Neil",
            lastName: "Maverick",
        });
    }),

    // Tooltip 模拟API端点
    // 基础内容端点
    http.get("/api/tooltip/post", async () => {
        await delay(2000);
        return HttpResponse.html(createPostHTML(1));
    }),

    http.get("/api/tooltip/post-detail", () => {
        return HttpResponse.html(createPostHTML(2));
    }),

    http.get("/api/tooltip/comment", () => {
        return HttpResponse.html(createCommentHTML(1));
    }),

    http.get("/api/tooltip/html-sample", () => {
        return HttpResponse.html(`
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px;">
                    🌟 HTML内容示例
                </h2>
                <p style="color: #555; line-height: 1.6;">
                    这是一个完整的HTML内容示例，展示了各种HTML元素在tooltip中的渲染效果。
                    这个内容通过MSW模拟API提供，无需真实的后端服务器。
                </p>
                <ul style="color: #666; line-height: 1.8;">
                    <li>✅ 支持丰富的HTML标签</li>
                    <li>✅ 支持内联样式</li>
                    <li>✅ 支持响应式布局</li>
                    <li>✅ 支持交互元素</li>
                    <li>✅ MSW模拟数据</li>
                </ul>
                <div style="background: #ecf0f1; padding: 12px; border-radius: 4px; margin-top: 12px;">
                    <strong style="color: #2c3e50;">提示:</strong>
                    这个内容是从MSW模拟API加载的，无需启动本地服务器。
                </div>
            </div>
        `);
    }),

    http.get("/api/tooltip/todo", () => {
        return HttpResponse.html(createTodoHTML(1));
    }),

    http.get("/api/tooltip/user", () => {
        return HttpResponse.html(createUserHTML(1));
    }),

    http.get("/api/tooltip/user-detail", () => {
        return HttpResponse.html(createUserHTML(2));
    }),

    http.get("/api/tooltip/text-content", () => {
        return HttpResponse.html(`
            <div style="padding: 15px; font-family: monospace; background: #2d3748; color: #e2e8f0; border-radius: 6px;">
                <h4 style="margin: 0 0 10px 0; color: #4fd1c7;">📄 文本内容示例</h4>
                <pre style="margin: 0; font-size: 12px; line-height: 1.4;">{
    "type": "text-content",
    "source": "msw-mock-api",
    "timestamp": "${new Date().toISOString()}",
    "message": "这是纯文本内容示例",
    "provider": "MSW Storybook Addon"
}</pre>
            </div>
        `);
    }),

    // 特殊功能端点
    http.get("/api/tooltip/delay", async () => {
        // 模拟2秒延迟
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return HttpResponse.html(`
            <div style="padding: 16px; background: #e3f2fd; border-left: 4px solid #2196f3;">
                <h4 style="margin: 0 0 8px 0; color: #1976d2;">⏰ 延迟加载完成</h4>
                <p style="margin: 0; color: #555;">
                    这个内容延迟了2秒才加载完成，展示了loading状态的处理效果。
                    通过MSW模拟API实现，无需真实的服务器延迟。
                </p>
                <div style="margin-top: 8px; font-size: 12px; color: #666;">
                    加载时间: ${new Date().toLocaleString()}
                </div>
            </div>
        `);
    }),

    http.get("/api/tooltip/json-content", () => {
        return HttpResponse.html(`
            <div style="padding: 16px; font-family: 'Courier New', monospace;">
                <h4 style="margin: 0 0 12px 0; color: #333;">📊 JSON数据展示</h4>
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px; padding: 12px; font-size: 13px;">
                    <pre style="margin: 0; color: #495057;">{
    "id": 1,
    "name": "MSW Mock Data",
    "type": "tooltip-content",
    "server": "MSW Storybook",
    "features": [
        "HTML内容",
        "JSON解析",
        "延迟加载",
        "错误处理",
        "模拟数据"
    ],
    "provider": "msw-storybook-addon"
}</pre>
                </div>
            </div>
        `);
    }),

    http.get("/api/tooltip/image-info", () => {
        return HttpResponse.html(createImageInfoHTML());
    }),

    http.get("/api/tooltip/uuid", () => {
        return HttpResponse.html(createUUIDHTML());
    }),

    // 错误处理端点
    http.get("/api/tooltip/status/:code", ({ params }) => {
        const statusCode = parseInt(params.code as string, 10);
        return new HttpResponse(createErrorHTML(statusCode), {
            status: statusCode,
            headers: {
                "Content-Type": "text/html",
            },
        });
    }),

    http.get("/api/tooltip/network-error", () => {
        // 模拟网络错误
        return HttpResponse.error();
    }),

    http.get("/api/tooltip/empty", () => {
        return HttpResponse.html("");
    }),
];
