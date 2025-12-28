import { http, HttpResponse } from "msw";
import { delay } from "flex-tools/async/delay";

/**
 * 创建文章 HTML 内容
 */
const createPostHTML = (id: number) => `
<div style="padding: 20px; font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
    <h2 style="margin: 0 0 12px 0; font-size: 20px;">📄 文章标题 #${id}</h2>
    <p style="margin: 0 0 16px 0; line-height: 1.6; opacity: 0.95;">
        这是从远程 API 加载的文章内容。HTMLLoader 组件可以从远程 URL 加载 HTML 内容并注入到指定容器中。
    </p>
    <div style="background: rgba(255,255,255,0.15); padding: 12px; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>👤 作者: Admin</span>
            <span>📅 ${new Date().toLocaleDateString()}</span>
        </div>
        <div style="font-size: 12px; opacity: 0.9;">
            标签: <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px;">HTMLLoader</span>
            <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px; margin-left: 4px;">远程加载</span>
        </div>
    </div>
</div>
`;

/**
 * 创建用户卡片 HTML
 */
const createUserCardHTML = (id: number) => `
<div style="padding: 20px; font-family: Arial, sans-serif;">
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; box-shadow: 0 4px 12px rgba(240, 87, 108, 0.3);">
            ${String.fromCharCode(65 + id)}
        </div>
        <div>
            <h3 style="margin: 0 0 4px 0; color: #333;">用户 ${id}</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">user${id}@example.com</p>
        </div>
    </div>
    <div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">
        <h4 style="margin: 0 0 8px 0; color: #495057; font-size: 14px;">个人简介</h4>
        <p style="margin: 0; color: #6c757d; font-size: 14px; line-height: 1.6;">
            这是用户 ${id} 的个人资料卡片。HTMLLoader 可以灵活地加载和显示各种格式的远程内容。
        </p>
        <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
            <span style="background: #e3f2fd; color: #1976d2; padding: 4px 10px; border-radius: 16px; font-size: 12px;">开发者</span>
            <span style="background: #f3e5f5; color: #7b1fa2; padding: 4px 10px; border-radius: 16px; font-size: 12px;">设计师</span>
            <span style="background: #e8f5e9; color: #388e3c; padding: 4px 10px; border-radius: 16px; font-size: 12px;">开源爱好者</span>
        </div>
    </div>
</div>
`;

/**
 * 创建产品卡片 HTML
 */
const createProductCardHTML = (id: number) => `
<div style="padding: 16px; font-family: Arial, sans-serif;">
    <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="height: 150px; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center;">
            <span style="font-size: 48px;">🎁</span>
        </div>
        <div style="padding: 16px;">
            <h3 style="margin: 0 0 8px 0; color: #333;">产品 #${id}</h3>
            <p style="margin: 0 0 12px 0; color: #666; font-size: 14px; line-height: 1.5;">
                这是产品 ${id} 的详细描述信息。支持丰富的 HTML 内容展示。
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 20px; font-weight: bold; color: #fa709a;">¥${(id * 99).toFixed(2)}</span>
                <button style="background: #fa709a; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    立即购买
                </button>
            </div>
        </div>
    </div>
</div>
`;

/**
 * 创建统计数据 HTML
 */
const createStatsHTML = () => `
<div style="padding: 20px; font-family: Arial, sans-serif;">
    <h3 style="margin: 0 0 16px 0; color: #333; font-size: 16px;">📊 统计数据</h3>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 16px; border-radius: 8px; color: white;">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 4px;">1,234</div>
            <div style="font-size: 12px; opacity: 0.9;">总访问量</div>
        </div>
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 16px; border-radius: 8px; color: white;">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 4px;">567</div>
            <div style="font-size: 12px; opacity: 0.9;">活跃用户</div>
        </div>
        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 16px; border-radius: 8px; color: white;">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 4px;">89</div>
            <div style="font-size: 12px; opacity: 0.9;">新增文章</div>
        </div>
        <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 16px; border-radius: 8px; color: white;">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 4px;">234</div>
            <div style="font-size: 12px; opacity: 0.9;">评论数</div>
        </div>
    </div>
    <div style="margin-top: 16px; font-size: 12px; color: #666; text-align: center;">
        更新时间: ${new Date().toLocaleString()}
    </div>
</div>
`;

/**
 * 创建表单 HTML
 */
const createFormHTML = () => `
<div style="padding: 20px; font-family: Arial, sans-serif;">
    <h3 style="margin: 0 0 16px 0; color: #333;">📝 联系表单</h3>
    <form onsubmit="event.preventDefault(); alert('表单已提交！');">
        <div style="margin-bottom: 12px;">
            <label style="display: block; margin-bottom: 4px; color: #555; font-size: 14px;">姓名</label>
            <input type="text" placeholder="请输入姓名" style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
        </div>
        <div style="margin-bottom: 12px;">
            <label style="display: block; margin-bottom: 4px; color: #555; font-size: 14px;">邮箱</label>
            <input type="email" placeholder="请输入邮箱" style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
        </div>
        <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 4px; color: #555; font-size: 14px;">留言</label>
            <textarea placeholder="请输入留言内容" rows="3" style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; resize: vertical; box-sizing: border-box;"></textarea>
        </div>
        <button type="submit" style="width: 100%; padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer;">
            提交表单
        </button>
    </form>
</div>
`;

/**
 * 创建列表 HTML
 */
const createListHTML = () => {
    const items = [
        { icon: "🎯", title: "远程加载", desc: "从 URL 加载 HTML 内容" },
        { icon: "⚡", title: "异步处理", desc: "支持异步回调处理" },
        { icon: "🎨", title: "灵活注入", desc: "自定义注入目标" },
        { icon: "🔄", title: "错误重试", desc: "内置重试机制" },
        { icon: "⚙️", title: "可配置", desc: "丰富的配置选项" },
    ];

    return `
<div style="padding: 16px; font-family: Arial, sans-serif;">
    <h3 style="margin: 0 0 16px 0; color: #333; font-size: 16px;">✨ 功能特性</h3>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        ${items.map(item => `
            <div style="display: flex; gap: 12px; padding: 12px; background: #f8f9fa; border-radius: 8px; align-items: start;">
                <span style="font-size: 24px; flex-shrink: 0;">${item.icon}</span>
                <div>
                    <div style="font-weight: bold; color: #333; margin-bottom: 4px;">${item.title}</div>
                    <div style="color: #666; font-size: 13px;">${item.desc}</div>
                </div>
            </div>
        `).join('')}
    </div>
</div>
`;
};

/**
 * HTMLLoader 模拟 API 处理器
 */
export const htmlloaderHandlers = [
    // 基础示例 - 成功加载
    http.get("/api/htmlloader/success", async () => {
        await delay(1500);
        return HttpResponse.html(createPostHTML(1));
    }),

    // 文章内容
    http.get("/api/htmlloader/post", async () => {
        await delay(1500);
        return HttpResponse.html(createPostHTML(Math.floor(Math.random() * 100)));
    }),

    // 用户卡片
    http.get("/api/htmlloader/user", async () => {
        await delay(1500);
        return HttpResponse.html(createUserCardHTML(Math.floor(Math.random() * 10)));
    }),

    // 产品卡片
    http.get("/api/htmlloader/product", async () => {
        await delay(1500);
        return HttpResponse.html(createProductCardHTML(Math.floor(Math.random() * 5) + 1));
    }),

    // 统计数据
    http.get("/api/htmlloader/stats", async () => {
        await delay(1500);
        return HttpResponse.html(createStatsHTML());
    }),

    // 表单
    http.get("/api/htmlloader/form", async () => {
        await delay(1500);
        return HttpResponse.html(createFormHTML());
    }),

    // 功能列表
    http.get("/api/htmlloader/features", async () => {
        await delay(1500);
        return HttpResponse.html(createListHTML());
    }),

    // JSON 数据（用于测试异步处理）
    http.get("/api/htmlloader/json", async () => {
        await delay(1500);
        return HttpResponse.json({
            id: 1,
            title: "JSON 数据示例",
            content: "这是从 API 加载的 JSON 数据，可以在 onSuccess 回调中进行处理。",
            timestamp: new Date().toISOString(),
            author: "MSW Mock Server",
        });
    }),

    // 延迟加载（3秒）
    http.get("/api/htmlloader/slow", async () => {
        await delay(3000);
        return HttpResponse.html(`
            <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
                <div style="font-size: 48px; margin-bottom: 16px;">⏰</div>
                <h3 style="margin: 0 0 8px 0; color: #333;">加载完成</h3>
                <p style="margin: 0; color: #666;">这个内容延迟了 3 秒才加载完成</p>
            </div>
        `);
    }),

    // 空内容
    http.get("/api/htmlloader/empty", async () => {
        await delay(1500);
        return HttpResponse.html("");
    }),

    // 404 错误
    http.get("/api/htmlloader/not-found", async () => {
        await delay(1500);
        return new HttpResponse(`
            <div style="padding: 20px; font-family: Arial, sans-serif; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">❌</div>
                <h3 style="margin: 0 0 8px 0; color: #dc3545;">404 - 未找到</h3>
                <p style="margin: 0; color: #666;">请求的资源不存在</p>
            </div>
        `, {
            status: 404,
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }),

    // 500 错误
    http.get("/api/htmlloader/server-error", async () => {
        await delay(1500);
        return new HttpResponse(`
            <div style="padding: 20px; font-family: Arial, sans-serif; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">💥</div>
                <h3 style="margin: 0 0 8px 0; color: #dc3545;">500 - 服务器错误</h3>
                <p style="margin: 0; color: #666;">服务器内部错误，请稍后重试</p>
            </div>
        `, {
            status: 500,
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }),

    // 网络错误
    http.get("/api/htmlloader/network-error", async () => {
        await delay(1500);
        return HttpResponse.error();
    }),

    // 随机成功/失败（用于测试重试）
    http.get("/api/htmlloader/unstable", async () => {
        await delay(1500);
        const success = Math.random() > 0.5;

        if (success) {
            return HttpResponse.html(`
                <div style="padding: 20px; font-family: Arial, sans-serif;">
                    <h3 style="margin: 0 0 8px 0; color: #28a745;">✅ 加载成功</h3>
                    <p style="margin: 0; color: #666;">这次请求成功了！</p>
                </div>
            `);
        } else {
            return new HttpResponse(`
                <div style="padding: 20px; font-family: Arial, sans-serif;">
                    <h3 style="margin: 0 0 8px 0; color: #dc3545;">❌ 加载失败</h3>
                    <p style="margin: 0; color: #666;">这次请求失败了，请重试</p>
                </div>
            `, {
                status: 500,
                headers: { "Content-Type": "text/html; charset=utf-8" },
            });
        }
    }),
];
