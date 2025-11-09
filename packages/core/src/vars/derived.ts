export const derivedVars = {
    /* 主题前景色 */
    '--t-theme-color': 'var(--t-color-theme-8)',
    '--t-theme-color-1': 'var(--t-color-theme-1)',
    '--t-theme-color-2': 'var(--t-color-theme-2)',
    '--t-theme-color-3': 'var(--t-color-theme-3)',
    '--t-theme-color-4': 'var(--t-color-theme-4)',
    '--t-theme-color-5': 'var(--t-color-theme-5)',
    '--t-theme-color-6': 'var(--t-color-theme-6)',
    '--t-theme-color-7': 'var(--t-color-theme-7)',
    '--t-theme-color-8': 'var(--t-color-theme-8)',
    '--t-theme-color-9': 'var(--t-color-theme-9)',
    /* 主题背景色 */
    '--t-theme-bgcolor': 'var(--t-color-theme-0)',
    '--t-theme-bgcolor-1': 'var(--t-color-theme-1)',
    '--t-theme-bgcolor-2': 'var(--t-color-theme-2)',
    '--t-theme-bgcolor-3': 'var(--t-color-theme-3)',
    '--t-theme-bgcolor-4': 'var(--t-color-theme-4)',
    '--t-theme-bgcolor-5': 'var(--t-color-theme-5)',
    '--t-theme-bgcolor-6': 'var(--t-color-theme-6)',
    '--t-theme-bgcolor-7': 'var(--t-color-theme-7)',
    '--t-theme-bgcolor-8': 'var(--t-color-theme-8)',
    '--t-theme-bgcolor-9': 'var(--t-color-theme-9)',

    /* 语义色调 */
    '--auto-primary-color': 'var(--t-color-primary)',
    '--auto-success-color': 'var(--t-color-success)',
    '--auto-danger-color': 'var(--t-color-danger)',
    '--auto-warning-color': 'var(--t-color-warning)',
    '--auto-info-color': 'var(--t-color-info)',
    '--auto-theme-color': 'var(--t-color-theme-5)',

    /** 活动颜色 */
    '--auto-selected-color': 'var(--t-color-theme-8)!important',
    '--auto-selected-bgcolor': 'color-mix(in srgb, var(--t-theme-bgcolor-1), transparent 15%)!important',

    '--auto-hover-color': 'var(--t-color-theme-6)!important',
    '--auto-hover-bgcolor': 'color-mix(in srgb, var(--t-theme-bgcolor-1) 50%, transparent 5%)!important',

    '--auto-disable-color': 'color-mix(in srgb, var(--t-color-theme-3), transparent 50%)!important',
    '--auto-disable-bgcolor': 'color-mix(in srgb, var(--auto-selected-bgcolor), transparent 60%)!important',

    '--auto-active-color': 'var(--auto-color)!important',
    '--auto-active-bgcolor': 'var(--t-color-theme-2)!important',

    /* 字体颜色 */
    '--auto-color': 'var(--t-theme-color)',
    '--auto-secondary-color': 'var(--t-color-theme-4)',

    '--auto-dark-color': 'color-mix(in srgb, var(--auto-color), black 10%)',
    '--auto-light-color': 'color-mix(in srgb, var(--auto-color), white 10%)',

    /* 背景颜色: 用于面板/对话框/组件的背景 */
    '--auto-bgcolor': 'var(--t-theme-bgcolor)',
    '--auto-workspace-bgcolor': 'var(--t-theme-bgcolor-1)',
    /* 亮色: 相对于背景的亮色*/
    '--auto-light-bgcolor': 'color-mix(in hsl, var(--auto-bgcolor), white 20%)',
    /* 暗色: 相对于背景的暗色背景*/
    '--auto-dark-bgcolor': 'color-mix(in hsl, var(--auto-bgcolor), black 10%)',

    /* 边框 */
    '--auto-border-size': '1px',
    '--auto-border-color': 'var(--t-theme-color-2)',
    '--auto-border': 'var(--auto-border-size) solid var(--auto-border-color)',
    '--auto-selected-border': '1px solid var(--t-color-theme-6)',
    '--auto-border-active-color': 'var(--t-color-theme-6)',
    '--auto-active-border': '1px solid var(--t-color-theme-6)',
    '--auto-disable-border': '1px solid var(--auto-disable-color)',

    /* 排版/字体 */
    '--auto-font': 'var(--auto-font-weight) var(--auto-font-size)/1.5 var(--auto-font-family)',
    '--auto-font-family':
        'Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans-serif',
    '--auto-font-size': 'var(--t-font-size-medium)',
    '--auto-font-weight': 'var(--t-font-weight-medium)',
    '--auto-letter-spacing': 'var(--t-letter-spacing-medium)',
    '--auto-line-height': 'var(--t-line-height-medium)',
    '--auto-title-font':
        'calc(var(--auto-font-weight) + 200) calc(var(--auto-font-size) * 1.1)/1.5 var(--auto-font-family)',
    /* 面板: 用于导航/标题栏/标签页标题 */
    '--auto-panel-header-color': 'var(--t-color-theme-8)',
    /** 标题背景颜色：用于标题/标题栏的背景颜色*/
    '--auto-panel-header-bgcolor': 'color-mix(in hsl, var(--auto-bgcolor), black 3%)',
    /* 面板背景颜色：用于面板/区块/Drawer等背景颜色*/
    '--auto-panel-bgcolor': 'var(--auto-bgcolor)',

    /* 边框/间距 */
    '--auto-border-radius': 'var(--t-border-radius-medium)',
    '--auto-spacing': 'var(--t-spacing-medium)',
    '--auto-padding': 'var(--t-spacing-medium)',
    '--auto-margin': 'var(--t-spacing-medium)',
    '--auto-shadow': 'var(--t-shadow-medium)',

    /* 输入框 */
    /** 输入框背景颜色：用于输入框背景颜色*/
    '--auto-input-border': '1px solid var(--t-theme-color-3)',
    '--auto-input-bgcolor': 'var(--t-theme-bgcolor)',
    '--auto-input-padding': 'calc(0.5 * var(--auto-padding))',
    '--auto-input-radius': 'var(--auto-border-radius)',
    '--auto-input-height': 'var(--t-line-height-medium)',
    /** 其他 */
    '--auto-icon-size': 'var(--t-icon-size-medium)',
}
