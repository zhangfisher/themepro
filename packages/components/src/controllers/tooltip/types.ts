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
     * 触发显示的事件类型，默认为'mouseover'
     */
    trigger?: "click" | "mouseover";
    /**
     * 延迟隐藏时间（毫秒），大于0的值将在指定时间后自动隐藏
     */
    delayHide?: number;
    /**
     * 将选定元素的Tooltip转移到其他元素
     */
    transfer?: string;
    /**
     * 提示框显示时触发
     */
    onShow?: () => void;
    /**
     * 提示框隐藏时触发
     */
    onHide?: () => void;
}
