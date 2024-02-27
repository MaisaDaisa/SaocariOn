import {
	cartManagement,
	priceBeautify,
	additionalStarCalc,
} from "./Constant Fucntions/dataManipulations.js";

//TODO: query Params: category, search

//TODO: additional Params:
// PRice:
// Rating
// category

// Global variables

let globalParams = Object;

// Fetch and Filter Functions

const searchParam = async (data, searchValue) => {
	return data.filter((product) =>
		product.title.toLowerCase().includes(searchValue.toLowerCase())
	);
};

const ratingParam = async (data, ratingValue) => {
	return data.filter((product) => product.rating.rate >= ratingValue);
};

const priceParam = async (data, priceValue) => {
	const priceRange = priceValue.split("-");
	const minPrice = parseInt(priceRange[0]);
	const maxPrice = parseInt(priceRange[1]);
	return data.filter(
		(product) => product.price >= minPrice && product.price <= maxPrice
	);
};

const fetchAndFilter = async (queryParam) => {
	let data;
	if (queryParam["category"] !== undefined) {
		console.log("category");
		data = await (
			await fetch(
				`https://fakestoreapi.com/products/category/${queryParam["category"]}`
			)
		).json();
	} else {
		data = await (await fetch(`https://fakestoreapi.com/products/`)).json();
	}
	if (queryParam["search"] !== undefined) {
		data = await searchParam(data, queryParam["search"]);
	}
	if (queryParam["rating"] !== undefined) {
		console.log("rating");
		data = await ratingParam(data, queryParam["rating"]);
	}
	if (queryParam["price"] !== undefined) {
		console.log("price");
		data = await priceParam(data, queryParam["price"]);
	}
	return data;
};

async function GetData() {
	const urlParams = new URLSearchParams(window.location.search);
	const queryParams = {};

	urlParams.forEach((value, key) => {
		queryParams[key] = value;
	});

	globalParams = queryParams;

	return await fetchAndFilter(queryParams);
}

async function renderProducts(data) {
	const productsList = document.querySelector(".products-list");
	const fullStar = `<i class="fa-solid fa-star"></i>`;
	console.log(data);
	data.forEach((product) => {
		const price = priceBeautify(product.price);
		const rating = product.rating.rate;
		const additionalStar = additionalStarCalc(rating);
		const productCard = document.createElement("div");
		productCard.classList.add("product-card");
		productCard.innerHTML = `
        <div class="product-image">
			<a href="./description.html?id=${product.id}">
				<img src=${product.image} alt="">
			</a>
		</div>
		<div class="product-details">
			<a href="./description.html?id=${product.id}">
				<h3>${product.title}</h3>
			</a>
			<a class="product-rating" href="./description.html?id=${product.id}">
				${fullStar.repeat(rating.toFixed(1))}
				${additionalStar}
				<p>${product.rating.count}</p>
			</a>
			<div class="product-price">
				<span>$</span>
				<h4>${price}</h4>
			</div>
			<div class="product-delivery">
				<p>get it By <span>Tuesday</span></p>
			</div>
		</div>
        `;
		productsList.appendChild(productCard);
	});
}

const initDisplay = async () => {
	const data = await GetData();
	if (data.length !== 0) {
		renderProducts(data);
	} else {
		const productsList = document.querySelector(".products-list");
		productsList.style;
		const text = document.createElement("h1");
		text.textContent = "No Products Found";
		productsList.appendChild(text);
	}
};

cartManagement();
initDisplay();

// Filter Functionality

const redirectParams = () => {
	const url = new URL(window.location.href);
	url.search = new URLSearchParams(globalParams).toString();
	window.open(url, "_self");
};

const filterByRating = document.querySelectorAll(
	".filter-container .filter-ratings li"
);
const filterByPrice = document.querySelectorAll(
	".filter-container .filter-price li"
);
const filterByCategory = document.querySelectorAll(
	".filter-container .filter-category li"
);
const ratingIncrement = [4, 3, 2, 1];
const priceRange = ["0-25", "25-50", "50-100", "100-200", "200-100000"];
const categoryList = [
	"electronics",
	"men's clothing",
	"women's clothing",
	"jewelry",
];

filterByRating.forEach((rating, index) => {
	rating.addEventListener("click", () => {
		globalParams["rating"] = ratingIncrement[index];
		redirectParams();
	});
});

filterByPrice.forEach((price, index) => {
	price.addEventListener("click", () => {
		globalParams["price"] = priceRange[index];
		redirectParams();
	});
});

filterByCategory.forEach((category, index) => {
	category.addEventListener("click", () => {
		globalParams["category"] = categoryList[index];
		redirectParams();
	});
});
