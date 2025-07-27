const hamMenu = document.querySelector("nav .right .ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
	hamMenu.classList.toggle("active");
	offScreenMenu.classList.toggle("active");

	const isOpen = hamMenu.classList.contains("active");
	hamMenu.setAttribute("aria-expanded", isOpen ? "true" : "false");
	document.body.style.overflow = isOpen ? "hidden" : "";
	if (isOpen) {
		offScreenMenu.focus();
	}
});

let resizeTimer;
window.addEventListener("resize", () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		if (window.innerWidth > 600) {
			hamMenu.classList.remove("active");
			hamMenu.setAttribute("aria-expanded", "false");
			offScreenMenu.classList.remove("active");
			document.body.style.overflow = "";
		}
	}, 100);
});
