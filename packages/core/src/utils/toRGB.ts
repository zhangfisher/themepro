// 常见颜色名称映射
const colorNames: Record<string, string> = {
	black: "#000000",
	white: "#FFFFFF",
	red: "#FF0000",
	green: "#008000",
	blue: "#0000FF",
	yellow: "#FFFF00",
	purple: "#800080",
	orange: "#FFA500",
	gray: "#808080",
	grey: "#808080",
	pink: "#FFC0CB",
	brown: "#A52A2A",
	cyan: "#00FFFF",
	magenta: "#FF00FF",
	silver: "#C0C0C0",
	maroon: "#800000",
	olive: "#808000",
	lime: "#00FF00",
	teal: "#008080",
	navy: "#000080",
};

// 完整的 toRGB 函数实现
export function toRGB(color: string): [number, number, number] | null {
	if (!color) return null;

	color = color.trim().toLowerCase();

	// 十六进制颜色 #RGB 或 #RRGGBB
	if (color.startsWith("#")) {
		return hexToRGB(color);
	}

	// rgb(r, g, b) 格式
	if (color.startsWith("rgb")) {
		return rgbStringToRGB(color);
	}

	// 颜色名称
	if (color in colorNames) {
		return hexToRGB(colorNames[color]);
	}
	return null;
}
function hexToRGB(hex: string): [number, number, number] | null {
	hex = hex.replace("#", "");

	// 处理缩写形式 #RGB
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	if (hex.length !== 6) return null;

	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;

	return [r, g, b];
}

function rgbStringToRGB(rgbString: string): [number, number, number] | null {
	const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);
	if (!match) return null;

	const r = parseInt(match[1], 10);
	const g = parseInt(match[2], 10);
	const b = parseInt(match[3], 10);

	if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;

	return [r, g, b];
}
