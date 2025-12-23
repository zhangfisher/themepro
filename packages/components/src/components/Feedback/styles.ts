import { css } from "lit";

export const styles = css`
    :host {
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        justify-content: center;
        gap: 1em;
        padding: 2em;
        text-align: center;
        background-color: var(--auto-bgcolor);
    }

    :host([fit]) {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
    }

    .feedback-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .feedback-icon img {
        width: 4em;
        height: 4em;
        object-fit: contain;
    }

    .feedback-message {
        font: var(--auto-font);
        color: var(--auto-color, #333);
        /* 最多显示2行，超过显示... */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
    }

    .feedback-description {
        font: var(--auto-font);
        color: var(--auto-secondary-color);
        max-width: 30em;
        /* 最多显示3行，超过显示... */
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
    }

    .feedback-actions {
        margin-top: 2em;
    }

    /* Slot 样式 */
    ::slotted([slot="icon"]) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ::slotted([slot="icon"] img) {
        width: 4em;
        height: 4em;
        object-fit: contain;
    }

    ::slotted([slot="message"]) {
        font: var(--auto-font);
        color: var(--auto-color, #333);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
    }

    ::slotted([slot="description"]) {
        font: var(--auto-font);
        color: var(--auto-secondary-color);
        max-width: 30em;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
    }
`;
