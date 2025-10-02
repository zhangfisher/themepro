import type { ThemeSize } from "../types";

function getSizeVars(size: ThemeSize) {
	return {
		/** 段落与字体 */
		"--auto-font-size": `var(--t-font-size-${size})`,
		"--auto-font-weight": `var(--t-font-weight-${size})`,
		"--auto-letter-spacing": `var(--t-letter-spacing-${size})`,
		"--auto-line-height": `var(--t-line-height-${size})`,
		/* 用于内边距和外边距 */
		"--auto-spacing": `var(--t-spacing-${size})`,
		"--auto-padding": `var(--t-spacing-${size})`,
		"--auto-margin": `var(--t-spacing-${size})`,

		"--auto-shadow": `var(--t-shadow-${size})`,
		"--auto-icon-size": `calc(1.5 * var(--t-font-size-${size}))`,
		/* 输入框 */
		"--auto-input-height": `var(--t-input-height-${size})`,
	};
}

export const sizeVars = {
	"x-small": getSizeVars("x-small"),
	small: getSizeVars("small"),
	medium: getSizeVars("medium"),
	large: getSizeVars("large"),
	"x-large": getSizeVars("x-large"),
};
