import { css } from "lit";

export const styles = css`
    :host {
        display: inline-block;
    }

    .dropdown {
        position: absolute;
        display: flex;
    }

    /* AutoDropdown Popup容器样式 */
    .auto-dropdown-popup {
        position: absolute;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        border-radius: 8px;
        background: var(--color-bg-container, #fff);
        border: 1px solid var(--color-border, #e0e0e0);
        max-height: 80vh;
        overflow-y: auto;
        z-index: 9999;
        transform-origin: top center;
        will-change: transform, opacity;
    }

    /* 响应式调整 */
    @media (max-width: 768px) {
        .auto-dropdown-popup {
            max-width: 90vw;
            max-height: 70vh;
        }
    }

    /* 确保内容正确显示 */
    .auto-dropdown-popup .dropdown {
        position: static;
        display: block;
        margin: 0;
        padding: 0;
    }

    /* 滚动条样式 */
    .auto-dropdown-popup::-webkit-scrollbar {
        width: 6px;
    }

    .auto-dropdown-popup::-webkit-scrollbar-track {
        background: transparent;
    }

    .auto-dropdown-popup::-webkit-scrollbar-thumb {
        background: var(--color-border-secondary, #ccc);
        border-radius: 3px;
    }

    .auto-dropdown-popup::-webkit-scrollbar-thumb:hover {
        background: var(--color-border, #999);
    }
`;
