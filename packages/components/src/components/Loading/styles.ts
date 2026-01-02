import { css } from "lit";

export const styles = css`
    :host {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    :host([hide]) {
        display: none !important;
    }

    :host([direction="row"]),
    :host([row]) {
        & > .content {
            flex-direction: row;
        }
    }

    :host([direction="column"]),
    :host([column]) {
        & > .content {
            flex-direction: column;
        }
    }
    :host([inline]) {
        position: relative;
        display: inline-flex;
        width: auto;
        height: auto;
        top: auto;
        left: auto;
    }

    :host > .mask {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: var(--mask-bgcolor);
        opacity: 0.5;
    }
    :host > .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.6em;
        font-size: var(--auto-font-size);
        z-index: 1;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        min-height: 0px;
        & > .message,
        & > .detail {
            display: flex;
            position: relative;
            font-size: var(--auto-font-size);
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            text-align: center;
            z-index: 1;
            color: var(--auto-color) !important;
        }
        & > .detail {
            color: var(--auto-secondary-color) !important;
            font-size: calc(0.9 * var(--auto-font-size));
            width: 100%;
            box-sizing: border-box;
            min-height: 0px;
            flex-shrink: 1;
            display: none;
        }
        & > .message {
            flex-shrink: 0;
        }
        & > .actions {
            display: flex;
            gap: 0.5em;
            flex-wrap: wrap;
            align-items: center;
            flex-shrink: 0;
        }
        & > svg {
            font-size: var(--icon-size);
        }
    }
    :host(:not([inline])[mask="dark"]),
    :host(:not([inline])[dark]) {
        & > .content > .message {
            color: var(--auto-bgcolor) !important;
        }
    }
    :host(:not([inline])[mask="light"]),
    :host(:not([inline])[light]) {
        & > .content > .message {
            color: var(--auto-color);
        }
    }

    :host([status="error"]) > .content > .message {
        color: red !important;
    }
`;
