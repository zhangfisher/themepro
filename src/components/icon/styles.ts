import { css } from "lit";

export const styles = css`
    .auto-icon {
        display: inline-block;
        background-color: currentColor;
        mask-size: cover;
        -webkit-mask-size: cover;
        width: 1.2em;
        height: 1.2em;
        vertical-align: text-bottom;
        position: relative;

        &.close {
            mask-image: var(--auto-icon-close);
            -webkit-mask-image: var(--auto-icon-close);
            -moz-mask-image: var(--auto-icon-close);
        }

        &.settings {
            mask-image: var(--auto-icon-settings);
            -webkit-mask-image: var(--auto-icon-settings);
            -moz-mask-image: var(--auto-icon-settings);
        }

        &.star {
            mask-image: var(--auto-icon-star);
            -webkit-mask-image: var(--auto-icon-star);
            -moz-mask-image: var(--auto-icon-star);
        }
    }    
`;
