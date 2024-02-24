
//TODO: query Params: category, search

//TODO: additional Params:
// PRice: 
// Rating
// category

const searchParam = async (data, searchValue) => {
    return data.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()))
}

const ratingParam = async (data, ratingValue) => {
    return data.filter(product => product.rating.rate >= ratingValue)
}

const priceParam = async (data, priceValue) => {
    const priceRange = priceValue.split("-");
    const minPrice = parseInt(priceRange[0]);
    const maxPrice = parseInt(priceRange[1]);
    return data.filter(product => product.price >= minPrice && product.price <= maxPrice)
}
    



const fetchAndFilter = async (queryParam) => {
    let data;
    console.log(queryParam["category"]);
    if (queryParam["category"] !== undefined) {
        console.log("category");
        data = await (await fetch(`https://fakestoreapi.com/products/category/${queryParam["category"]}`)).json();
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
}

async function GetData() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParams = {};

    urlParams.forEach((value, key) => {
        queryParams[key] = value;
    });

    return await fetchAndFilter(queryParams);
}


async function renderProducts() {
    const data = await GetData();
    console.log(data);
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
    data.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span>$${product.price}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

renderProducts();

// Filter Functionality

const filterByReview = document.getElementById(".filter-reviews");
const filterByPrice = document.getElementById(".filter-price");
const filterByCategory = document.getElementById(".filter-category");
const review = [4, 3, 2, 1];
const price = ["0-25", "25-50", "50-100", "100-200", "200-100000"];
const category = ["electronics", "men's clothing", "women's clothing", "jewelry"];



// Search Bar Functionality

const searchInput = document.getElementById('search-bar');
const magnifyingGlass = document.querySelector('.fa-magnifying-glass')

searchInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        const searchTerm = searchInput.value.trim();
        if (searchTerm == '') {
			window.open("/products.html", "_self");
        } else {
            console.log(searchTerm)
			window.open(`/products.html?search=${searchTerm}`, "_self");
        }
    }
});

magnifyingGlass.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm == '') {
		window.open("/products.html", "_self");
	} else {
		console.log(searchTerm)
		window.open(`/products.html?search=${searchTerm}`, "_self");
	}
})





// LOGOUT BUTTON

const logoutButton = document.querySelector(".header-logout");
console.log(logoutButton);

logoutButton.addEventListener("click", () => {
	localStorage.removeItem("saocariOn-token");
	window.open("/login.html", "_self");
});