// Logo Redirect
document.querySelector(".header-logo").addEventListener("click", () => {
	window.open("/index.html", "_self");
});

// Search Bar Functionality

const searchInput = document.getElementById("search-bar");
const magnifyingGlass = document.querySelector(".fa-magnifying-glass");

searchInput.addEventListener("keydown", function (event) {
	if (event.keyCode === 13) {
		const searchTerm = searchInput.value.trim();
		if (searchTerm == "") {
			window.open("/products.html", "_self");
		} else {
			console.log(searchTerm);
			window.open(`/products.html?search=${searchTerm}`, "_self");
		}
	}
});

magnifyingGlass.addEventListener("click", () => {
	const searchTerm = searchInput.value.trim();
	if (searchTerm == "") {
		window.open("/products.html", "_self");
	} else {
		console.log(searchTerm);
		window.open(`/products.html?search=${searchTerm}`, "_self");
	}
});

// LOGOUT BUTTON

const logoutButton = document.querySelector(".header-logout");

logoutButton.addEventListener("click", () => {
	localStorage.removeItem("saocariOn-token");
	window.open("/login.html", "_self");
});

// CART BUTTON

const cartButtons = document.querySelectorAll(".header-cart");

cartButtons.forEach((button) => {
	button.addEventListener("click", () => {
		window.open("/cart.html", "_self");
	});
});
// Subheader Redirects

document.querySelector("#nav-random").addEventListener("click", () => {
	const randomNum = Math.ceil(Math.random() * 20);
	window.open(`/description.html?id=${randomNum}`, "_self");
});

// Mobile Nav

const mobileNav = document.querySelector(".mobile-nav");
console.log(mobileNav);

mobileNav.querySelector(".fa-house").addEventListener("click", () => {
	window.open("/index.html", "_self");
});

mobileNav
	.querySelector("i.fa-solid.fa-right-to-bracket")
	.addEventListener("click", () => {
		localStorage.removeItem("saocariOn-token");
		window.open("/login.html", "_self");
	});
