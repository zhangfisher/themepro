import type { ThemeSize } from "@/types";

function getRadiusVars(radius: ThemeSize) {
	return {
		"--auto-border-radius": `var(--t-border-radius-${radius})!important`,
	};
}

export const radiusVars = {
	"x-small": getRadiusVars("x-small"),
	small: getRadiusVars("small"),
	medium: getRadiusVars("medium"),
	large: getRadiusVars("large"),
	"x-large": getRadiusVars("x-large"),
};
