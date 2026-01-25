import { css } from 'lit'

export const styles = css`
    .auto-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: calc(0.8 * var(--auto-input-padding)) calc(1.2 * var(--auto-input-padding));
        border-radius: var(--auto-border-radius);
        font: var(--auto-font);
        text-transform: uppercase;
        cursor: pointer;
        color: var(--auto-color);
        background: var(--auto-bgcolor);
        border: var(--auto-border);
        box-sizing: border-box;
        vertical-align: bottom;
        gap: 0.3em;
        user-select: none;
        &:hover {
            border: var(--auto-active-border);
            background-color: var(--k-color-theme-1);
            color: var(--auto-primary-color);
        }

        &:active {
            background: var(--k-color-theme-2);
        }

        &.x-small {
            font-size: var(--k-font-size-x-small);
            padding: calc(0.5 * var(--k-spacing-x-small)) var(--k-spacing-x-small);
        }

        &.small {
            font-size: var(--k-font-size-small);
            padding: calc(0.5 * var(--k-spacing-small)) var(--k-spacing-small);
        }

        &.medium {
            font-size: var(--k-font-size-medium);
            padding: calc(0.5* var(--k-spacing-medium)) var(--k-spacing-medium);
        }

        &.large {
            font-size: var(--k-font-size-large);
            padding: calc(0.5* var(--k-spacing-large)) var(--k-spacing-large);
        }

        &.x-large {
            font-size: var(--k-font-size-x-large);
            padding: calc(0.5* var(--k-spacing-x-large)) var(--k-spacing-x-large);
        }

        &.compact {
            padding: calc(0.3 * var(--auto-input-padding)) calc(0.5 * var(--auto-input-padding));
        }

        &.circle {
            border-radius: 50%;
            aspect-ratio: 1;
            padding: var(--auto-input-padding);
        }

        &.pill {
            border-radius: 9999px;
        }

        &.primary {
            background-color: var(--auto-primary-color);
            color: color-mix(in srgb, var(--auto-primary-color) 0%, white 100%);
            border: 1px solid var(--auto-primary-color);

            &:hover {
                background-color: var(--k-color-primary-4);
            }

            &:active {
                background-color: var(--auto-primary-color);
            }
        }

        &.success {
            background-color: var(--k-color-success-5);
            color: color-mix(in srgb, var(--k-color-success-5) 0%, white 100%);
            border: 1px solid var(--k-color-success-5);

            &:hover {
                background-color: var(--k-color-success-4);
            }

            &:active {
                background-color: var(--auto-success-color);
            }
        }

        &.warning {
            background-color: var(--k-color-warning-5);
            color: color-mix(in srgb, var(--k-color-warning-5) 0%, white 100%);
            border: 1px solid var(--k-color-warning-5);

            &:hover {
                background-color: var(--k-color-warning-4);
            }

            &:active {
                background-color: var(--auto-warning-color);
            }
        }

        &.error,
        &.danger {
            background-color: var(--k-color-danger-5);
            color: color-mix(in srgb, var(--k-color-danger-5) 0%, white 100%);
            border: 1px solid var(--k-color-danger-5);

            &:hover {
                background-color: var(--k-color-danger-4);
            }

            &:active {
                background-color: var(--auto-danger-color);
            }
        }

        &.info {
            background-color: var(--k-color-info-4);
            color: color-mix(in srgb, var(--k-color-info-4) 0%, white 100%);
            border: 1px solid var(--k-color-info-4);

            &:hover {
                background-color: var(--k-color-info-3);
            }

            &:active {
                background-color: var(--auto-info-color);
            }
        }
}`
