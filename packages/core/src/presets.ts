export type PresetTheme = {
	baseColor: string;
	title?: string;
	primary?: string;
	success?: string;
	warning?: string;
	danger?: string;
	info?: string;
};

export const presetThemes: Record<string, PresetTheme> = {
	light: {
		baseColor: "#c5c5c5",
		title: "亮色",
	},
	dark: {
		baseColor: "#7d7d7d",
		title: "暗黑",
	},
	red: {
		baseColor: "#f5222d",
		title: "薄暮",
	},
	volcano: {
		baseColor: "#fa541c",
		title: "火山",
	},
	orange: {
		baseColor: "#fa8c16",
		title: "日暮",
	},
	lime: {
		baseColor: "#a0d911",
		title: "青柠",
	},
	gold: {
		baseColor: "#faad14",
		title: "金盏花",
	},
	yellow: {
		baseColor: "#fadb14",
		title: "日出",
	},
	green: {
		baseColor: "#52c41a",
		title: "极光绿",
	},
	cyan: {
		baseColor: "#13c2c2",
		title: "明青",
	},
	blue: {
		baseColor: "#1677ff",
		title: "拂晓蓝",
	},
	geekblue: {
		baseColor: "#2f54eb",
		title: "极客蓝",
	},
	purple: {
		baseColor: "#722ed1",
		title: "酱紫",
	},
	magenta: {
		baseColor: "#eb2f96",
		title: "法式洋红",
	},
};
