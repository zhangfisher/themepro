import { css } from "lit";

export const styles = css`
    .auto-icon {
        display: inline-block;
        background-color: currentColor;
        mask-size: cover;
        -webkit-mask-size: cover;
        width: var(--auto-icon-size);
        height: var(--auto-icon-size);
        vertical-align: text-bottom;
        position: relative; 
    }    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    .spinner {
        animation: spin 2s linear infinite;
    }
`;
