import { css } from 'lit'

export const styles = css`
    :host {
        position: relative;
        display: inline-flex;
    }
    .kylin-icon {
        background-color: currentColor;
        mask-size: cover;
        -webkit-mask-size: cover;
        vertical-align: text-bottom;
        position: relative;
        font-size: var(--kylin-icon-size);
        width: 1em;
        height: 1em;
        transition: transform 0.3s ease-in-out;
    }
    .shape {
        display: inline-block;
        position: relative;
        background-color: var(--k-theme-color-2);
        aspect-ratio: 1;
        padding: calc(0.5 * var(--auto-padding));
        &.circle {
            border-radius: 50%;
        }
        &.round {
            border-radius: var(--auto-border-radius);
        }
    }
    :host([inherit]) .kylin-icon {
        font-size: inherit;
    }
`
