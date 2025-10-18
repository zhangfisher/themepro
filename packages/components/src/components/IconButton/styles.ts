import { css } from 'lit'

export const styles = css`
    .auto-icon {
        display: inline-block;
        position: relative;
        background-color: currentColor;
        mask-size: cover;
        -webkit-mask-size: cover;
        vertical-align: text-bottom;
        position: relative; 
        font-size:var(--auto-icon-size);
        width: 1em;
        height: 1em;
        stroke-width: var(--stroke-width,1);        
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
`
