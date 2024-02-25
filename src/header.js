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

const cartButton = document.querySelector(".header-cart");

cartButton.addEventListener("click", () => {
	window.open("/cart.html", "_self");
});
