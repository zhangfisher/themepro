import { css } from "lit";

export const styles = css`
    :host {
        position: relative;
    }

    :host > div {
        display: contents;
    }

    /* 确保 slot 内容正常显示 */
    ::slotted(*) {
        pointer-events: auto;
    }
`;
