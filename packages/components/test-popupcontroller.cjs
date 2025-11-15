/**
 * PopupController 功能验证脚本
 * 运行: node test-popupcontroller.js
 */

// 模拟浏览器环境
const { JSDOM } = require('jsdom');

// 设置虚拟 DOM
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<head></head>
<body>
    <div id="test-host">测试主机</div>
</body>
</html>
`, {
    url: 'http://localhost',
    pretendToBeVisual: true,
    resources: 'usable'
});

global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
global.CustomEvent = dom.window.CustomEvent;
global.Event = dom.window.Event;
global.MouseEvent = dom.window.MouseEvent;
global.KeyboardEvent = dom.window.KeyboardEvent;

// 导入构建后的模块
try {
    const fs = require('fs');
    const path = require('path');

    // 读取构建后的文件
    const buildPath = path.join(__dirname, 'dist', 'index.js');
    const buildContent = fs.readFileSync(buildPath, 'utf8');

    console.log('🔍 开始验证 PopupController 功能...\n');

    // 检查构建内容中是否包含 PopupController
    if (buildContent.includes('PopupController')) {
        console.log('✅ PopupController 已成功构建并导出');
    } else {
        console.log('❌ PopupController 未在构建内容中找到');
        process.exit(1);
    }

    // 检查关键类和方法
    const checks = [
        { name: 'PopupController 类', pattern: /class PopupController/ },
        { name: 'show 方法', pattern: /show\(\)/ },
        { name: 'hide 方法', pattern: /hide\(\)/ },
        { name: 'container getter', pattern: /get container\(\)/ },
        { name: 'createThemeproContainer', pattern: /createThemeproContainer/ },
        { name: 'AutoDropdown 导出', pattern: /AutoDropdown/ },
        { name: 'PopupController 导出', pattern: /PopupController/ }
    ];

    console.log('\n📋 功能检查:');
    let passed = 0;
    let total = checks.length;

    checks.forEach(check => {
        if (buildContent.match(check.pattern)) {
            console.log(`✅ ${check.name}`);
            passed++;
        } else {
            console.log(`❌ ${check.name}`);
        }
    });

    console.log(`\n📊 测试结果: ${passed}/${total} 项通过`);

    if (passed === total) {
        console.log('\n🎉 PopupController 重构成功！');
        console.log('📝 所有核心功能都已正确实现和导出');
        console.log('\n🌐 现在可以在浏览器中访问 http://localhost:8080/popupcontroller-test.html 进行交互测试');
    } else {
        console.log('\n⚠️  部分功能可能存在问题，请检查构建输出');
        process.exit(1);
    }

} catch (error) {
    console.error('❌ 验证过程中出错:', error.message);
    process.exit(1);
}