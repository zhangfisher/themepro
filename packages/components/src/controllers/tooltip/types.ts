import type { Tooltip } from "./tooltip";

export type TooltipPlacement =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";

export type TooltipContent =
    | string
    | HTMLElement
    | undefined
    | null
    | Promise<string | HTMLElement | undefined | null>;

/**
 * TooltipController 配置选项接口
 *
 * 用于配置 Tooltip/Popup 组件的行为、样式和交互方式
 * 支持通过 HTML data 属性、构造函数选项或动态修改进行配置
 *
 * @example
 * ```html
 * <!-- 通过 data 属性配置 -->
 * <div data-tooltip="内容"
 *      data-tooltip-placement="top"
 *      data-tooltip-offset="0,8"
 *      data-tooltip-arrow="true">
 *   悬停显示提示
 * </div>
 * ```
 *
 * @example
 * ```typescript
 * // 通过构造函数配置
 * const controller = new TooltipController(host, {
 *   placement: 'top',
 *   offset: [0, 8],
 *   arrow: true,
 *   animationDuration: 200
 * });
 * ```
 */
export interface TooltipControllerOptions {
    /**
     * ## 提示框位置
     *
     * 指定提示框相对于目标元素的显示位置
     *
     * **支持的位置值：**
     * - 基础位置：`"top"` | `"bottom"` | `"left"` | `"right"`
     * - 带对齐的位置：`"top-start"` | `"top-end"` | `"bottom-start"` | `"bottom-end"` 等
     *
     * **位置优先级：**
     * 1. 首选指定的位置
     * 2. 如果空间不足，自动翻转到对侧（通过 flip middleware）
     * 3. 最终位置根据实际可用空间计算
     *
     * **默认值：** `"top"`
     *
     * **实现位置：** [tooltip.ts:46](tooltip.ts#L46)
     *
     * @example
     * ```html
     * <!-- 显示在顶部 -->
     * <div data-tooltip="提示" data-tooltip-placement="top">目标</div>
     *
     * <!-- 显示在右侧，右对齐 -->
     * <div data-tooltip="提示" data-tooltip-placement="right-end">目标</div>
     * ```
     *
     * @see {@link https://floating-ui.com/docs/flip | Floating UI Flip Middleware}
     */
    placement?: TooltipPlacement;

    /**
     * ## 提示框偏移量
     *
     * 设置提示框与目标元素之间的距离偏移
     *
     * **格式：** `[crossAxis: number, mainAxis: number]`
     * - `crossAxis`: 垂直于放置方向的偏移（水平方向当为 top/bottom 时）
     * - `mainAxis`: 沿着放置方向的偏移（主要距离）
     *
     * **计算细节：**
     * - mainAxis 会根据是否显示箭头自动调整
     * - 如果 `arrow=true`，mainAxis 会额外增加 4px
     * - 公式：`actualMainAxis = mainAxis + (arrow ? 4 : 0)`
     *
     * **默认值：** `[0, 4]`
     *
     * **实现位置：** [tooltip.ts:620-623](tooltip.ts#L620-L623)
     *
     * @example
     * ```html
     * <!-- 距离目标元素 10px -->
     * <div data-tooltip="提示" data-tooltip-offset="0,10">目标</div>
     *
     * <!-- 水平偏移 5px，垂直距离 8px -->
     * <div data-tooltip="提示" data-tooltip-offset="5,8">目标</div>
     * ```
     */
    offset?: [number, number];

    /**
     * ## 动画持续时间
     *
     * 控制提示框显示/隐藏动画的时长（毫秒）
     *
     * **动画类型：**
     * - 显示动画：透明度 0→1，缩放 0.9→1，位移 -5px→0
     * - 隐藏动画：透明度 1→0，缩放 1→0.9，位移 0→-5px
     *
     * **建议范围：**
     * - 快速：100-150ms（适合频繁交互）
     * - 标准：150-250ms（推荐默认值）
     * - 慢速：250-400ms（适合强调效果）
     *
     * **默认值：** `150`
     *
     * **实现位置：** [tooltip.ts:721](tooltip.ts#L721), [tooltip.ts:808](tooltip.ts#L808)
     *
     * @example
     * ```html
     * <!-- 快速动画 -->
     * <div data-tooltip="提示" data-tooltip-animation-duration="100">目标</div>
     *
     * <!-- 慢速强调动画 -->
     * <div data-tooltip="提示" data-tooltip-animation-duration="300">目标</div>
     * ```
     *
     * @see animationEasing
     */
    animationDuration?: number;

    /**
     * ## 动画缓动函数
     *
     * 指定动画的加速度曲线，使用 animejs 支持的缓动函数
     *
     * **常用缓动函数：**
     * - `"linear"`: 线性匀速
     * - `"easeOutQuart"`: 快速启动，平滑减速（默认）
     * - `"easeInQuart"`: 平滑启动，快速减速（隐藏动画）
     * - `"easeInOutQuad"`: 启动和结束都较慢
     * - `"easeOutElastic"`: 弹性效果
     *
     * **完整列表：** [Anime.js Easing Functions](https://animejs.com/documentation/#easing)
     *
     * **默认值：**
     * - 显示：`"easeOutQuart"`
     * - 隐藏：`"easeInQuart"`
     *
     * **实现位置：** [tooltip.ts:722](tooltip.ts#L722), [tooltip.ts:810](tooltip.ts#L810)
     *
     * @example
     * ```html
     * <!-- 弹性效果 -->
     * <div data-tooltip="提示" data-tooltip-animation-easing="easeOutElastic">目标</div>
     *
     * <!-- 平滑线性 -->
     * <div data-tooltip="提示" data-tooltip-animation-easing="linear">目标</div>
     * ```
     */
    animationEasing?: string;

    /**
     * ## 自定义样式类名
     *
     * 为提示框容器元素添加自定义 CSS 类名
     *
     * **用途：**
     * - 应用自定义样式
     * - 区分不同类型的提示框
     * - 与现有样式系统集成
     *
     * **默认值：** 使用 `dataPrefix` 的值（默认为 `"tooltip"`）
     *
     * **实现位置：** [tooltip.ts:67-68](tooltip.ts#L67-L68)
     *
     * **注意：** 如果不设置，会使用 `dataPrefix` 的值作为类名
     *
     * @example
     * ```html
     * <div data-tooltip="提示" data-tooltip-class-name="custom-tooltip">目标</div>
     * ```
     *
     * ```css
     * .custom-tooltip {
     *   background: #333;
     *   border-radius: 8px;
     * }
     * ```
     */
    className?: string;

    /**
     * ## 是否显示指示箭头
     *
     * 在提示框上显示指向目标元素的小三角箭头
     *
     * **效果：**
     * - ✅ `true`: 显示箭头，自动计算位置和方向
     * - ❌ `false`: 不显示箭头，减少视觉干扰
     *
     * **箭头特性：**
     * - 大小：8px × 8px（旋转45度形成三角形）
     * - 颜色：继承提示框背景色
     * - 边框：继承提示框边框样式
     * - 位置：根据 placement 自动调整
     *
     * **默认值：** `true`
     *
     * **实现位置：** [tooltip.ts:371-376](tooltip.ts#L371-L376)
     *
     * @example
     * ```html
     * <!-- 不显示箭头 -->
     * <div data-tooltip="提示" data-tooltip-arrow="false">目标</div>
     *
     * <!-- 显示箭头（默认） -->
     * <div data-tooltip="提示" data-tooltip-arrow="true">目标</div>
     * ```
     */
    arrow?: boolean;

    /**
     * ## 绑定属性名称（已废弃）
     *
     * > **注意：** 此选项当前未使用，保留用于向后兼容
     *
     * 原本用于从 host 元素的指定属性中读取配置参数
     *
     * **替代方案：**
     * - 使用 `data-tooltip-options` 属性传递 JSON 配置
     * - 使用 `data-tooltip-*` 系列属性
     * - 在构造函数中直接传递配置对象
     *
     * **实现位置：** 未在当前代码中使用
     *
     * @deprecated 此选项未实现，请使用其他配置方式
     */
    optionAttr?: string;

    /**
     * ## 尺寸适配模式
     *
     * 控制提示框尺寸是否适应目标元素的尺寸
     *
     * **适配模式：**
     * - `"none"`: 不启用尺寸适配（默认）
     * - `"width"`: 宽度适应目标元素
     * - `"height"`: 高度适应目标元素
     * - `"auto"`: 根据放置方向自动选择
     *   - `left/right`: 适应高度
     *   - `top/bottom`: 适应宽度
     * - `true`: 等同于 `"auto"`
     *
     * **使用场景：**
     * - 工具栏提示：使用 `width` 保持一致性
     * - 侧边菜单：使用 `height` 实现全高效果
     * - 自适应提示：使用 `auto` 根据位置智能调整
     *
     * **默认值：** `"none"`
     *
     * **实现位置：** [tooltip.ts:730-749](tooltip.ts#L730-L749)
     *
     * @example
     * ```html
     * <!-- 宽度适应目标 -->
     * <div data-tooltip="提示" data-tooltip-fit="width">目标</div>
     *
     * <!-- 智能适配 -->
     * <div data-tooltip="提示" data-tooltip-fit="auto">目标</div>
     * ```
     */
    fit?: "none" | "auto" | "width" | "height" | boolean;

    /**
     * ## CSS 类名控制
     *
     * 在提示框显示/隐藏时，向目标元素（ref）添加/移除 CSS 类
     *
     * **格式选项：**
     * - `string`: 单个类名
     *   - 显示时：添加该类
     *   - 隐藏时：移除该类
     * - `[string, string]`: 两个类名数组
     *   - 显示时：添加第一个类，移除第二个类
     *   - 隐藏时：移除第一个类，添加第二个类
     *
     * **默认值：** `"${dataPrefix}-visible"`（如 `"tooltip-visible"`）
     *
     * **实现位置：** [tooltip.ts:765-778](tooltip.ts#L765-L778)
     *
     * **使用场景：**
     * - 显示时添加高亮效果
     * - 显示时改变目标元素样式
     * - 为不同状态应用不同样式
     *
     * @example
     * ```html
     * <!-- 单个类名 -->
     * <div data-tooltip="提示" data-tooltip-css-class="highlight">目标</div>
     *
     * <!-- 两个类名（显示和隐藏状态） -->
     * <div data-tooltip="提示" data-tooltip-css-class="show-state,hide-state">目标</div>
     * ```
     *
     * ```css
     * .highlight {
     *   outline: 2px solid blue;
     * }
     *
     * .show-state {
     *   background-color: lightblue;
     * }
     *
     * .hide-state {
     *   background-color: transparent;
     * }
     * ```
     */
    cssClass?: string | [string, string];

    /**
     * ## 最小宽度
     *
     * 设置提示框容器的最小宽度
     *
     * **支持格式：**
     * - CSS 宽度值：`"100px"`, `"10rem"`, `"50%"`
     * - 数值：`100`（自动添加 "px" 单位）
     *
     * **默认值：** 无限制
     *
     * **实现位置：** 未在当前实现中直接使用
     *
     * **注意：** 此选项在当前版本中未实现，建议使用 `styles` 选项替代
     *
     * @example
     * ```html
     * <div data-tooltip="提示" data-tooltip-min-width="200px">目标</div>
     * ```
     */
    minWidth?: string;

    /**
     * ## 最小高度
     *
     * 设置提示框容器的最小高度
     *
     * **支持格式：**
     * - CSS 高度值：`"100px"`, `"10rem"`, `"50%"`
     * - 数值：`100`（自动添加 "px" 单位）
     *
     * **默认值：** 无限制
     *
     * **实现位置：** 未在当前实现中直接使用
     *
     * **注意：** 此选项在当前版本中未实现，建议使用 `styles` 选项替代
     *
     * @example
     * ```html
     * <div data-tooltip="提示" data-tooltip-min-height="100px">目标</div>
     * ```
     */
    minHeight?: string;

    /**
     * ## 触发方式
     *
     * 指定触发提示框显示的用户交互事件
     *
     * **触发类型：**
     * - `"mouseover"`: 鼠标悬停时显示（默认）
     *   - 鼠标进入目标区域：显示
     *   - 鼠标离开目标区域：延迟 100ms 后隐藏
     *   - 适合：快速查看的提示信息
     * - `"click"`: 点击时显示
     *   - 点击目标区域：显示/切换
     *   - 点击外部区域：隐藏
     *   - 按 ESC 键：隐藏
     *   - 适合：需要用户主动操作的提示
     *
     * **默认值：** `"mouseover"`
     *
     * **实现位置：**
     * - [tooltip.ts:418-423](tooltip.ts#L418-L423) (触发逻辑)
     * - [controller.ts:220-248](controller.ts#L220-L248) (事件委托)
     *
     * **交互特性：**
     * - 支持在目标元素和提示框之间自由移动鼠标而不隐藏
     * - 支持延迟隐藏机制（`delayHide`）
     * - 支持键盘 ESC 键关闭
     *
     * @example
     * ```html
     * <!-- 鼠标悬停触发 -->
     * <div data-tooltip="提示" data-tooltip-trigger="mouseover">目标</div>
     *
     * <!-- 点击触发 -->
     * <div data-tooltip="提示" data-tooltip-trigger="click">目标</div>
     * ```
     *
     * @see delayHide
     */
    trigger?: "click" | "mouseover";

    /**
     * ## 延迟隐藏时间
     *
     * 设置提示框显示后自动隐藏的延迟时间（仅在 `trigger="click"` 时生效）
     *
     * **工作原理：**
     * - `delayHide > 0`: 在指定时间后自动隐藏
     * - `delayHide = 0`: 不自动隐藏，需手动关闭（默认）
     *
     * **使用场景：**
     * - 临时通知：设置 2-3 秒自动消失
     * - 用户确认：设置为 0，要求用户主动关闭
     * - 延迟阅读：设置 5-10 秒给用户足够时间
     *
     * **默认值：** `0`
     *
     * **实现位置：** [tooltip.ts:754-759](tooltip.ts#L754-L759)
     *
     * **注意：** 仅在 `trigger="click"` 时有效
     *
     * @example
     * ```html
     * <!-- 3秒后自动隐藏 -->
     * <div data-tooltip="提示" data-tooltip-trigger="click"
     *      data-tooltip-delay-hide="3000">目标</div>
     *
     * <!-- 不自动隐藏 -->
     * <div data-tooltip="提示" data-tooltip-trigger="click"
     *      data-tooltip-delay-hide="0">目标</div>
     * ```
     *
     * @see trigger
     */
    delayHide?: number;

    /**
     * ## 是否缓存组件
     *
     * 控制提示框隐藏时是否销毁组件实例和 DOM 元素
     *
     * **缓存模式：**
     * - `false` (默认): 隐藏时完全销毁
     *   - ✅ 节省内存
     *   - ✅ 清理 DOM
     *   - ❌ 再次显示需重新创建
     * - `true`: 隐藏时保留实例
     *   - ✅ 快速显示
     *   - ✅ 保留状态
     *   - ❌ 占用内存
     *
     * **使用建议：**
     * - 频繁切换：使用 `cache=true`
     * - 偶尔显示：使用 `cache=false`
     * - 复杂内容：使用 `cache=true` 避免重复加载
     *
     * **默认值：** `false`
     *
     * **实现位置：** [tooltip.ts:837-842](tooltip.ts#L837-L842)
     *
     * @example
     * ```html
     * <!-- 启用缓存 -->
     * <div data-tooltip="提示" data-tooltip-cache="true">目标</div>
     * ```
     */
    cache?: boolean;

    /**
     * ## 自定义定位目标
     *
     * 指定用于计算提示框位置的参考元素
     *
     * **工作原理：**
     * - 默认：使用带有 `data-tooltip` 属性的元素（ref）
     * - 自定义：使用选择器指定其他元素
     *
     * **查询顺序：**
     * 1. 使用 `querySelector` 选项的函数
     * 2. 查找最近的匹配祖先元素
     * 3. 在 host 元素内查询
     * 4. 在全局文档中查询
     *
     * **使用场景：**
     * - 为容器设置提示，但相对于子元素定位
     * - 为按钮组设置提示，相对于整个按钮组定位
     * - 创建连接线效果
     *
     * **默认值：** `undefined`（使用当前元素）
     *
     * **实现位置：** [tooltip.ts:96-108](tooltip.ts#L96-L108)
     *
     * @example
     * ```html
     * <div id="container">
     *   <div id="reference"></div>
     *   <!-- 相对于 #reference 定位 -->
     *   <div data-tooltip="提示" data-tooltip-target="#reference">目标</div>
     * </div>
     * ```
     *
     * @see querySelector
     */
    target?: string;

    /**
     * ## 提示框内边距
     *
     * 设置内容区域内边距（padding）
     *
     * **支持格式：**
     * - CSS 值：`"10px"`, `"1rem"`, `"10px 20px"`
     * - 数值：`10`（作为 CSS var 使用）
     *
     * **默认值：** `"var(--auto-padding)"`
     *
     * **实现位置：** [tooltip.ts:387](tooltip.ts#L387)
     *
     * **注意：** 默认使用 CSS 变量，需在全局样式中定义
     *
     * @example
     * ```html
     * <!-- 使用 CSS 变量（默认） -->
     * <div data-tooltip="提示">目标</div>
     *
     * <!-- 自定义内边距 -->
     * <div data-tooltip="提示" data-tooltip-padding="15px">目标</div>
     * ```
     *
     * ```css
     * :root {
     *   --auto-padding: 12px;
     * }
     * ```
     */
    padding?: number;

    /**
     * ## 自定义样式
     *
     * 为提示框内部元素应用自定义 CSS 样式
     *
     * **格式：** `Record<string, string>`
     * - 键：CSS 选择器
     * - 值：CSS 样式字符串
     *
     * **支持的选择器：**
     * - 类选择器：`".my-class"`
     * - 元素选择器：`"div"`
     * - 后代选择器：`".content > p"`
     *
     * **默认值：** `undefined`
     *
     * **实现位置：** [tooltip.ts:340](tooltip.ts#L340)
     *
     * **使用场景：**
     * - 自定义内容样式
     * - 添加特殊效果
     * - 覆盖默认样式
     *
     * @example
     * ```html
     * <div data-tooltip="提示"
     *      data-tooltip-styles='{".content":"color:red;",".arrow":"border-color:#000"}'>
     *   目标
     * </div>
     * ```
     *
     * @example
     * ```typescript
     * const controller = new TooltipController(host, {
     *   styles: {
     *     '.content': 'color: red; font-size: 14px;',
     *     '.arrow': 'background: #000;'
     *   }
     * });
     * ```
     */
    styles?: Record<string, any>;

    /**
     * ## 动态内容获取
     *
     * 自定义内容获取和处理函数，支持异步内容
     *
     * **调用时机：**
     * - 提示框准备显示之前
     * - 每次显示时都会调用
     *
     * **参数：**
     * - `content`: 解析后的原始内容
     * - `ref`: 目标元素
     * - `tooltip`: Tooltip 实例
     *
     * **返回值：**
     * - 字符串：HTML 内容
     * - HTMLElement：DOM 元素
     * - Promise: 异步加载内容
     *
     * **默认值：** `undefined`
     *
     * **实现位置：** 未在当前实现中直接使用，预留接口
     *
     * **使用场景：**
     * - 动态生成内容
     * - 异步加载数据
     * - 根据上下文修改内容
     *
     * @example
     * ```typescript
     * const controller = new TooltipController(host, {
     *   getContent: async (content, ref, tooltip) => {
     *     // 异步加载数据
     *     const data = await fetch('/api/data').then(r => r.json());
     *     return `<div>${data.title}</div>`;
     *   }
     * });
     * ```
     */
    getContent?: (
        content: HTMLElement | null | undefined,
        ref: HTMLElement,
        tooltip: Tooltip
    ) => TooltipContent;

    /**
     * ## 自定义查询选择器
     *
     * 覆盖内部元素查询逻辑
     *
     * **调用场景：**
     * - `data-tooltip="selector://<query>"`
     * - `target="<query>"`
     * - 内部需要查询元素时
     *
     * **默认实现：**
     * 1. 查找最近的匹配祖先元素
     * 2. 在 host 元素内查询
     * 3. 在全局文档中查询
     *
     * **默认值：** 内置查询函数
     *
     * **实现位置：** [tooltip.ts:125-131](tooltip.ts#L125-L131)
     *
     * **使用场景：**
     * - 自定义查询逻辑
     * - 限制查询范围
     * - 与其他查询系统集成
     *
     * @example
     * ```typescript
     * const controller = new TooltipController(host, {
     *   querySelector: (selector) => {
     *     // 只在特定容器内查询
     *     return document.querySelector(`#my-container ${selector}`);
     *   }
     * });
     * ```
     *
     * @see target
     */
    querySelector?: (selector: string) => HTMLElement | null | undefined;

    /**
     * ## 加载状态内容
     *
     * 指定异步内容加载时显示的提示内容
     *
     * **支持格式：**
     * - 字符串：纯文本或 HTML
     * - HTML 元素：DOM 节点
     *
     * **使用场景：**
     * - `link://` 远程加载
     * - `http://` / `https://` URL 加载
     * - Promise 异步内容
     *
     * **默认值：** `"Loading"`
     *
     * **实现位置：** [tooltip.ts:261-269](tooltip.ts#L261-L269)
     *
     * @example
     * ```html
     * <!-- 自定义加载提示 -->
     * <div data-tooltip="link://api/data"
     *      data-tooltip-loading="<div class='spinner'>加载中...</div>">
     *   目标
     * </div>
     * ```
     */
    loading?: string;

    /**
     * ## 预测尺寸
     *
     * 预设异步内容的初始尺寸，用于优化布局
     *
     * **格式：** `[width, height]`
     * - 支持数字（自动添加 px）
     * - 支持字符串（CSS 单位）
     *
     * **优先级：**
     * 1. URL 查询参数 `_size`
     * 2. 配置选项 `predictSize`
     *
     * **使用场景：**
     * - 异步加载远程内容
     * - 避免布局抖动
     * - 提供更好的用户体验
     *
     * **默认值：** `[200, 200]`
     *
     * **实现位置：** [tooltip.ts:172-197](tooltip.ts#L172-L197)
     *
     * **注意：** 指的是内容区（.content）的尺寸
     *
     * @example
     * ```html
     * <!-- 预设 400x300 -->
     * <div data-tooltip="link://api/content"
     *      data-tooltip-predict-size="400,300">
     *   目标
     * </div>
     *
     * <!-- 通过 URL 参数指定 -->
     * <div data-tooltip="link://api/content?_size=400,300">
     *   目标
     * </div>
     * ```
     *
     * @see size
     */
    predictSize?: [string | number, string | number];

    /**
     * ## 内容尺寸
     *
     * 设置内容区域的固定尺寸
     *
     * **格式：** `[width, height]`
     * - 支持数字（自动添加 px）
     * - 支持字符串（CSS 单位，如 "auto", "100%", "400px"）
     *
     * **与 predictSize 的区别：**
     * - `predictSize`: 异步加载时的**临时预测**尺寸
     * - `size`: 内容加载后的**最终固定**尺寸
     *
     * **默认值：** `["auto", "auto"]`
     *
     * **实现位置：** [tooltip.ts:208-216](tooltip.ts#L208-L216)
     *
     * **使用场景：**
     * - 固定大小的提示框
     * - 图片展示
     * - 视频播放器
     *
     * @example
     * ```html
     * <!-- 固定 500x300 -->
     * <div data-tooltip="内容"
     *      data-tooltip-size="500,300">
     *   目标
     * </div>
     *
     * <!-- 固定宽度，自动高度 -->
     * <div data-tooltip="内容"
     *      data-tooltip-size="400,auto">
     *   目标
     * </div>
     * ```
     *
     * @see predictSize
     */
    size?: [string | number, string | number];

    /**
     * ## 显示回调
     *
     * 提示框显示时触发的回调函数
     *
     * **调用时机：**
     * - 动画开始后
     * - 在显示动画执行过程中
     *
     * **使用场景：**
     * - 记录分析数据
     * - 触发其他操作
     * - 更新状态
     *
     * **默认值：** `undefined`
     *
     * **实现位置：** [tooltip.ts:727](tooltip.ts#L727)
     *
     * @example
     * ```typescript
     * const controller = new TooltipController(host, {
     *   onShow: () => {
     *     console.log('Tooltip shown');
     *     analytics.track('tooltip_view');
     *   }
     * });
     * ```
     *
     * @see onHide
     */
    onShow?: () => void;

    /**
     * ## 隐藏回调
     *
     * 提示框隐藏时触发的回调函数
     *
     * **调用时机：**
     * - 隐藏动画开始后
     * - 在动画执行过程中
     * - 在清理操作之前
     *
     * **使用场景：**
     * - 清理状态
     * - 记录关闭事件
     * - 触发后续操作
     *
     * **默认值：** `undefined`
     *
     * **实现位置：** [tooltip.ts:832](tooltip.ts#L832)
     *
     * @example
     * ```typescript
     * const controller = new TooltipController(host, {
     *   onHide: () => {
     *     console.log('Tooltip hidden');
     *     analytics.track('tooltip_close');
     *   }
     * });
     * ```
     *
     * @see onShow
     */
    onHide?: () => void;

    /**
     * ## 数据属性前缀
     *
     * 自定义 data 属性的前缀，用于避免命名冲突
     *
     * **影响范围：**
     * - 所有 `data-tooltip-*` 属性
     * - 事件名称（如 `tooltip:close`）
     * - 默认类名（如 `tooltip-visible`）
     *
     * **示例：**
     * - 默认：`data-tooltip-*`
     * - 自定义：`data-popup-*`
     *
     * **默认值：** `"tooltip"`
     *
     * **实现位置：** [tooltip.ts:66-70](tooltip.ts#L66-L70)
     *
     * **使用场景：**
     * - 创建 Popup 组件（使用 `dataPrefix="popup"`）
     * - 避免与其他库冲突
     * - 创建多种提示类型
     *
     * @example
     * ```html
     * <!-- 使用默认前缀 -->
     * <div data-tooltip="内容" data-tooltip-placement="top">目标</div>
     *
     * <!-- 使用自定义前缀 -->
     * <div data-popup="内容" data-popup-placement="top">目标</div>
     * ```
     *
     * @example
     * ```typescript
     * // 创建 Popup 组件
     * export const PopupController = TooltipController;
     * const popup = new PopupController(host, {
     *   dataPrefix: 'popup'
     * });
     * ```
     */
    dataPrefix?: string;

    /**
     * ## 默认数据集
     *
     * 为 host 元素设置默认的 dataset 属性
     *
     * **工作原理：**
     * - 如果 host 元素上没有对应的 dataset 属性，则设置默认值
     * - 如果已存在，则保留原值（不覆盖）
     *
     * **支持格式：**
     * - 对象：`{ key: 'value' }`
     * - JSON 字符串：`'{"key":"value"}'`
     *
     * **使用场景：**
     * - 为组件设置默认配置
     * - 批量设置 data 属性
     * - 提供配置模板
     *
     * **默认值：** `undefined`
     *
     * **实现位置：** [controller.ts:87-100](controller.ts#L87-L100)
     *
     * @example
     * ```typescript
     * const controller = new TooltipController(host, {
     *   dataset: {
     *     tooltipTheme: 'dark',
     *     tooltipAnimation: 'fade'
     *   }
     * });
     * // 相当于在 host 元素上设置：
     * // <host data-tooltip-theme="dark" data-tooltip-animation="fade">
     * ```
     */
    dataset?: Record<string, string>;
}
export type TooltipOptions = TooltipControllerOptions;
export type PopupControllerOptions = TooltipControllerOptions;
export type PopupPlacement = TooltipPlacement;
export type PopupContent = TooltipContent;
