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

export interface TooltipControllerOptions {
    /**
     * 提示框位置
     */
    placement?: TooltipPlacement;
    /**
     * 提示框偏移量 [crossAxis, mainAxis]
     */
    offset?: [number, number];
    /**
     * 动画持续时间（毫秒）
     */
    animationDuration?: number;
    /**
     * 动画缓动函数
     */
    animationEasing?: string;
    /**
     * 自定义样式类名
     */
    className?: string;
    /**
     * 是否显示指示箭头，默认为false
     */
    arrow?: boolean;
    /**
     * 绑定属性名称，配置参数将从host的该属性中读取参数
     */
    optionAttr?: string;
    /**
     * 弹出内容宽度/高度与target元素的宽度/高度是否一致
     * - none: 不启用适应
     * - width: 宽度适应
     * - height: 高度适应
     * - auto: 根据弹出方向自动适应
     */
    fit?: "none" | "auto" | "width" | "height";
    /**
     * CSS类名控制
     * 在tooltip显示/隐藏时在this.ref元素上添加/移除CSS类
     * - 如果是 string：显示时添加该类，隐藏时移除该类
     * - 如果是 [string, string]：第一个字符串为显示时添加的类，第二个字符串为隐藏时添加的类
     */
    cssClass?: string | [string, string];
    /**
     * 最小宽度
     */
    minWidth?: string;
    /**
     * 最小高度
     */
    minHeight?: string;
    /**
     * 触发显示的事件类型，默认为'mouseover'
     */
    trigger?: "click" | "mouseover";
    /**
     * 延迟隐藏时间（毫秒），大于0的值将在指定时间后自动隐藏
     * 该属性在trigger=click时生效
     */
    delayHide?: number;
    /**
     * 是否缓存tooltip组件，默认为 false
     * 如果cache=true则不会销毁tooltip类和元素，而只是隐藏
     */
    cache?: boolean;
    /**
     * 默认情冲下弹出内容的计算是基于当前data-tooltip元素，
     * 但也可以通过target指定一个其他元素来计算位置
     */
    target?: string;
    /**
     * 提示框内边距
     */
    padding?: number;
    /**
     * 自定义样式
     * styles={
     *    '.context':"color:red;"
     * }
     */
    styles?: Record<string, any>;
    /**
     *
     * 可以实现定制动态内容，当准备显示弹出内容时调用
     * 允许异步内容
     *
     * @param el 解析data-tooltip后得到的内容，可以在此进行修改，或者返回一个新的内容
     * @returns
     */
    getContent?: (
        content: HTMLElement | null | undefined,
        ref: HTMLElement,
        tooltip: Tooltip
    ) => TooltipContent;
    /**
     * 用于覆盖内部查询目标元素的函数
     * 当data-tooltip以selector://<query>时调用此函数来查询目标元素
     * 或者当target=<query>时调用此函数来查询目标元素
     *
     * @param selector
     * @returns
     */
    querySelector?: (selector: string) => HTMLElement | null | undefined;
    /**
     * 当弹出内容是一个或link Promise时，可以指定一个loading元素
     *
     * - string: 字符串形式的HTML内容
     */
    loading?: string;
    /**
     * 预测弹出内容的宽度/高度
     * 当内容是一个Promise时，可以通过该属性来预测内容的宽度/高度
     * 当data-tooltip是一个link://,http://,https:// 时
     * 可以通过该属性来预测内容的宽度/高度,显示
     * 注意：指的是内容区,即.content的宽度/高度
     */
    predictSize?: [string | number, string | number];
    /**
     * 弹出内容的宽度/高度
     * 注意：指的是内容区,即.content的宽度/高度
     */
    size?: [string | number, string | number];

    /**
     * 提示框显示时触发
     */
    onShow?: () => void;
    /**
     * 提示框隐藏时触发
     */
    onHide?: () => void;
}
