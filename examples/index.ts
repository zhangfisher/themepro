import "@/styles/index.less";
import "@/components/index.less";
// import "@/themes/red.less";
// import "@/themes/blue.less";
// import "@/themes/dark.less";
// import "@/themes/red.less";
// import "@/themes/orange.less";
// import "@/themes/volcano.less";
// import "@/themes/green.less";
// import "@/themes/magenta.less";
// import "@/themes/purple.less";
// import "@/themes/yellow.less";
// import "@/themes/lime.less";

document.addEventListener("DOMContentLoaded", function () {
	const themesEle = document.querySelector(".themes");
	if (themesEle) {
		themesEle.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains("theme")) {
				const theme = target.innerText.toLowerCase();
				document.documentElement.setAttribute("data-theme", theme);
			}
		});
	}
});
