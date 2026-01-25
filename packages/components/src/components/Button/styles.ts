import { css } from 'lit'

export const styles = css`
    :host {
        display: inline-flex;
        position: relative;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: calc(0.4 * var(--k-spacing-medium))
            calc(0.8 * var(--k-spacing-medium));
        border-radius: var(--auto-border-radius);
        font: var(--auto-font);
        cursor: pointer;
        color: var(--auto-color);
        background: var(--auto-bgcolor);
        box-sizing: border-box;
        vertical-align: bottom;
        gap: 0.3em;
        user-select: none;
    }
    :host([shadow]) {
        box-shadow: var(--k-shadow-small);
    }
    :host(:hover),
    :host([variant="ghost"]:hover) {
        background-color: var(--k-color-theme-1);
    }
    :host(:not(.label)) {
        flex-grow: 0;
        flex-shrink: 0;
    }
    :host([variant="outline"]) {
        border: 1px solid
            color-mix(in srgb, var(--k-theme-color) 30%, white 10%);
    }

    /**
    * 按钮文本
     */
    :host > .label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: var(--label-width, auto);
        min-width: 0;
        text-align: left;
    }
    :host([shape="circle"]) > .label {
        flex-grow: 0;
    }

    :host([labelgrow]) > .label {
        flex-grow: 1;
    }

    /* 禁用态：不响应 hover/active */
    :host([disabled]:hover),
    :host([disabled]:active) {
        background: var(--auto-bgcolor);
        color: var(--auto-color);
        outline: none;
    }
    /**
     * 按钮形状
     */
    :host([shape="circle"]) {
        border-radius: 50% !important;
        aspect-ratio: 1;
        flex-direction: column !important;
        gap: 0;
        --kylin-icon-size: 2em;
    }
    :host([shape="pill"]) {
        border-radius: 9999px !important;
    }
    :host([shape="rect"]),
    :host([shape="rectangle"]) {
        border-radius: 0xp !important;
    }

    /* 按钮尺寸 */
    :host([x-small]) {
        font-size: var(--k-font-size-x-small);
        padding: calc(0.3 * var(--k-spacing-x-small)) var(--k-spacing-x-small);
    }
    :host([small]) {
        font-size: var(--k-font-size-small);
        padding: calc(0.3 * var(--k-spacing-small)) var(--k-spacing-small);
    }
    :host([large]) {
        font-size: var(--k-font-size-large);
        padding: calc(0.3 * var(--k-spacing-large)) var(--k-spacing-large);
    }
    :host([x-large]) {
        font-size: var(--k-font-size-x-large);
        padding: calc(0.3 * var(--k-spacing-x-large)) var(--k-spacing-x-large);
    }

    /**
     * 语义按钮类型
     */

    /**按钮类型 */
    :host([type="primary"]) {
        background-color: var(--k-color-primary);
        color: color-mix(in srgb, var(--k-color-primary) 0%, white 100%);
    }
    :host([type="primary"]:hover) {
        background-color: color-mix(in srgb, var(--k-color-primary), white 10%);
    }
    :host([type="primary"][variant="outline"]) {
        border-color: color-mix(in srgb, var(--k-color-primary), black 10%);
    }

    /*  */
    :host([variant="ghost"][type="primary"]) {
        color: var(--k-color-primary);
    }
    :host([variant="ghost"][type="primary"]:hover) {
        background-color: color-mix(
            in srgb,
            var(--k-color-primary) 15%,
            white 5%
        ) !important;
    }

    :host([type="success"]) {
        background-color: var(--k-color-success);
        color: color-mix(in srgb, var(--k-color-success) 0%, white 100%);
    }
    :host([type="success"]:hover) {
        background-color: color-mix(in srgb, var(--k-color-success), white 10%);
    }

    :host([variant="ghost"][type="success"]) {
        color: var(--k-color-success);
    }
    :host([variant="ghost"][type="success"]:hover) {
        background-color: color-mix(
            in srgb,
            var(--k-color-success) 15%,
            white 5%
        ) !important;
    }

    :host([type="warning"]) {
        background-color: var(--k-color-warning);
        color: color-mix(in srgb, var(--k-color-warning) 0%, white 100%);
    }
    :host([type="warning"]:hover) {
        background-color: color-mix(in srgb, var(--k-color-warning), white 10%);
    }

    :host([variant="ghost"][type="warning"]) {
        color: var(--k-color-warning);
    }
    :host([variant="ghost"][type="warning"]:hover) {
        background-color: color-mix(
            in srgb,
            var(--k-color-warning) 15%,
            white 5%
        ) !important;
    }

    :host([type="error"]),
    :host([type="danger"]) {
        background-color: var(--k-color-danger);
        color: color-mix(in srgb, var(--k-color-danger) 0%, white 100%);
    }
    :host([type="error"]:hover),
    :host([type="danger"]:hover) {
        background-color: color-mix(in srgb, var(--k-color-danger), white 10%);
    }

    :host([variant="ghost"][type="danger"]),
    :host([variant="ghost"][type="error"]) {
        color: var(--k-color-danger);
    }
    :host([variant="ghost"][type="danger"]:hover),
    :host([variant="ghost"][type="error"]:hover) {
        background-color: color-mix(
            in srgb,
            var(--k-color-danger) 15%,
            white 5%
        ) !important;
    }

    :host([type="info"]) {
        background-color: var(--k-color-info);
        color: color-mix(in srgb, var(--k-color-info) 0%, white 100%);
    }
    :host([type="info"]:hover) {
        background-color: color-mix(in srgb, var(--k-color-info), white 10%);
    }

    :host([variant="ghost"]) {
        background-color: transparent;
        border: none;
    }
    :host([vertical]) {
        flex-direction: column;
    }

    :host([disabled]) {
        user-select: none;
        cursor: not-allowed;
        pointer-events: none;
        filter: grayscale(50%) opacity(0.6);
    }
    :host([block]) {
        width: 100%;
    }
    /* Checkbox */
    :host(
            [checkable][checked]:not(
                    [checkPos="before"],
                    [checkPos="after"],
                    [checkPos="corner"]
                )
        ) {
        background-color: var(--k-color-primary);
        color: color-mix(in srgb, var(--k-color-primary) 0%, white 100%);
    }
    :host([checkable]) .checked {
        color: var(--k-color-primary);
    }
    :host([checkable][checkPos="before"]) {
        padding-left: calc(0.5 * var(--k-spacing-medium));
    }

    :host .badge {
        position: absolute;
        left: 100%;
        top: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        aspect-ratio: 1;
        width: 8px;
        height: 8px;
        color: white;
        background-color: red;
        border: 1px solid white;
    }
    /** 标签 */
    .tags > .tag {
        padding: 5px;
        border-radius: 50%;
        border: 1px solid transparent;
        aspect-ratio: 1;
        display: inline-flex;
        &:hover {
            color: var(--auto-theme-color);
        }
        &.checkable {
            &.checked {
                border-radius: 50%;
                aspect-ratio: 1;
                padding: 5px;
                color: var(--auto-selected-color);
                background-color: var(--auto-selected-bgcolor);
                &[shape="circle"] {
                    border-radius: 50%;
                    aspect-ratio: 1;
                    padding: 5px;
                }
                &[shape="rectangle"] {
                    border-radius: 5px;
                    padding: 5px;
                }
            }
        }
    }

    :host([type="primary"]) .tags > .tag,
    :host([type="success"]) .tags > .tag,
    :host([type="warning"]) .tags > .tag,
    :host([type="danger"]) .tags > .tag,
    :host([type="error"]) .tags > .tag,
    :host([type="info"]) .tags > .tag {
        color: color-mix(in srgb, var(--k-color-primary) 0%, white 100%);
    }
    :host([type="primary"]) .tags > .tag {
        &:hover {
            background-color: color-mix(
                in srgb,
                var(--auto-primary-color),
                white 20%
            ) !important;
        }
        &.checked {
            background-color: color-mix(
                in srgb,
                var(--auto-primary-color),
                black 10%
            ) !important;
        }
    }
    :host([type="success"]) .tags > .tag {
        &:hover {
            background-color: color-mix(
                in srgb,
                var(--auto-success-color),
                white 20%
            ) !important;
        }
        &.checked {
            background-color: color-mix(
                in srgb,
                var(--auto-success-color),
                black 10%
            ) !important;
        }
    }
    :host([type="warning"]) .tags > .tag {
        &:hover {
            background-color: color-mix(
                in srgb,
                var(--auto-warning-color),
                white 20%
            ) !important;
        }
        &.checked {
            background-color: color-mix(
                in srgb,
                var(--auto-warning-color),
                black 10%
            ) !important;
        }
    }
    :host([type="danger"]) .tags > .tag,
    :host([type="error"]) .tags > .tag {
        &:hover {
            background-color: color-mix(
                in srgb,
                var(--auto-danger-color),
                white 20%
            ) !important;
        }
        &.checked {
            background-color: color-mix(
                in srgb,
                var(--auto-danger-color),
                black 10%
            ) !important;
        }
    }
    :host([type="info"]) .tags > .tag {
        &:hover {
            background-color: color-mix(
                in srgb,
                var(--auto-info-color),
                white 20%
            ) !important;
        }
        &.checked {
            background-color: color-mix(
                in srgb,
                var(--auto-info-color),
                black 10%
            ) !important;
        }
    }
    /* 使用伪元素创建涟漪效果 */
    :host .badge::before,
    :host .badge::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid red;
        background-color: red;
        opacity: 0.2;
        border: 1px solid white;
        animation: ripple-wave 0.8s ease-out infinite;
    }

    :host .badge::after {
        animation-delay: 1s;
    }

    @keyframes ripple-wave {
        0% {
            outline: 1px solid red;
            opacity: 0.3;
        }
        100% {
            outline: 10px solid red;
            opacity: 0;
        }
    }
`
