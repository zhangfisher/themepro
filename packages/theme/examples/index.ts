import "@/styles/index.less";
import "@/components/index.less";
import "@/components";

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
