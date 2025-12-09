import type { ThemeOptions } from '../../core/src/types'
import { injectStylesheet } from '../../core/src/utils'
import { generateThemeColorVars } from '../../core/src/utils/generateThemeColorVars'
import { ThemeManager, createTheme } from '../../core/src/manager'
import type { LitElement, ReactiveController } from 'lit'

export class ThemeProController implements ReactiveController {
    host: LitElement
    private observer: MutationObserver

    constructor(host: LitElement) {
        this.host = host
        this.host.addController(this)

        // 创建MutationObserver来监听data-theme属性变化
        this.observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                const attrName = mutation.attributeName
                if (mutation.type === 'attributes') {
                    if (attrName === 'data-theme') {
                        this._onThemeChange()
                    } else if (attrName) {
                        const variantType = this._getVariantType(attrName)
                        if (variantType) this._onVariantColorChange(variantType)
                    }
                    break
                }
            }
        })
    }

    _getVariantType(attrName: string) {
        const pattern = /^data-(primary|danger|success|warning|info)-color$/
        const result = pattern.exec(attrName)
        if (result?.[1]) {
            return result[1]
        } else {
            return null
        }
    }
    _onThemeChange() {
        const theme = this.host.getAttribute('data-theme')
        if (theme) {
            ThemeManager.create({
                theme,
            })
        }
    }
    _onVariantColorChange(variant: string) {
        const color = this.host.getAttribute(`data-${variant}-color`)
        if (color) {
            const { vars } = generateThemeColorVars(`--t-color-${variant}-`, color)
            injectStylesheet(
                `:host{
				${Object.entries(vars)
                    .map(([key, value]) => `${key}:${value}`)
                    .join(';\n')}`,
                this.host,
            )
        }
    }

    /**
     * 当宿主元素连接到DOM时调用的生命周期方法
     */
    hostConnected() {
        // 开始监听data-theme属性变化
        this.observer.observe(this.host, {
            attributes: true,
            attributeFilter: ['data-theme', 'data-primary-color'],
        })

        const theme = this.host.getAttribute('data-theme')
        if (theme) {
            ThemeManager.create({
                theme,
            })
        }
    }

    hostDisconnected() {
        // 断开连接时停止监听
        this.observer.disconnect()
    }

    create(options: ThemeOptions) {
        this.host.classList.add('themepro')
        createTheme(
            Object.assign({}, options, {
                injectStyle: {
                    id: 'themepro',
                    el: this.host,
                    mode: 'replace',
                },
                onInjectStyles: (themeStyles: string) => {
                    return `.themepro{\n
                        ${themeStyles}
/* 主色调 */
    --auto-primary-color: var(--t-color-primary-5);
    --auto-success-color: var(--t-color-success-5);
    --auto-danger-color: var(--t-color-danger-5);
    --auto-warning-color: var(--t-color-warning-5);
    --auto-info-color: var(--t-color-info-5);
    --auto-theme-color: var(--t-color-theme-5);
    /* 字体颜色oklch(from var(--auto-color) calc(l > 0.6 ? l - 0.2 : l + 0.2) c h) */
    --auto-color: var(--t-theme-color);
    --auto-secondary-color: var(--t-color-theme-4);
    --auto-disable-color: var(--t-color-theme-3);
    --auto-dark-color: color-mix(in srgb, var(--auto-color), black 20%);
    --auto-light-color: color-mix(in srgb, var(--auto-color), white 20%);

    /* 边框颜色 */
    --auto-border-color: var(--t-color-theme-3);
    --auto-border-active-color: var(--t-color-primary-6);
    

    /* 标题，用于导航/标题栏/标签页标题 */
    --auto-title-font: calc(var(--auto-font-weight) + 200) calc(var(--auto-font-size) * 1.1)/1.5 var(--auto-font-family);
    --auto-panel-title-color: var(--t-color-primary-6);

    /* 边框/间距 */
    --auto-spacing: var(--t-spacing-medium);
    --auto-padding: var(--t-spacing-medium);
    --auto-margin: var(--t-spacing-medium);
    --auto-border: 1px solid var(--auto-border-color);
    --auto-active-border: 1px solid var(--auto-border-active-color);
    --auto-border-radius: var(--t-border-radius-medium);
    --auto-shadow: var(--t-shadow-medium);

    /* 输入框 */
    --auto-input-padding: calc(0.5 * var(--auto-padding));
    --auto-input-height: var(--t-line-height-medium);

    /* 背景颜色，用于面板/对话框/组件的背景 */
    --auto-bgcolor: var(--t-theme-bgcolor);
    --auto-workspace-bgcolor: var(--t-theme-bgcolor-1);
    /* 亮色: 相对于背景的亮色*/
    --auto-light-bgcolor: color-mix(in hsl, var(--auto-bgcolor), white 20%);
    /* 暗色: 相对于背景的暗色背景*/
    --auto-dark-bgcolor: color-mix(in hsl, var(--auto-bgcolor), black 20%);
    /* 面板背景颜色：用于面板/区块/Drawer等背景颜色*/
    --auto-panel-bgcolor: var(--t-theme-bgcolor-1);
    /** 标题背景颜色：用于标题/标题栏的背景颜色*/
    --auto-title-bgcolor: var(--t-theme-bgcolor-2);
    /** 输入框背景颜色：用于输入框背景颜色*/
    --auto-input-bgcolor: var(--t-theme-bgcolor);
    /** 随随色背景颜色：用于自动选中颜色，或根据背景颜色自动匹配背景颜色*/
    --auto-selected-bgcolor: color-mix(in srgb, var(--t-color-theme-3) 40%, transparent);

    --auto-icon-size: calc(1.5 * var(--t-font-size-medium));
                    \n}`
                },
            }),
        )
    }
    _createVars() {}
}
