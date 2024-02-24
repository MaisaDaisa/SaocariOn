
const getProducts = async () => {
	const data = await (await fetch("https://fakestoreapi.com/products")).json();
	return data;
};

const renderProducts = async () => {
	const products = await getProducts();
	const sortedByRating = await products.sort((a, b) => b.rating.rate - a.rating.rate);

	console.log(sortedByRating);
	const displaySlides = async () => {
		const slides = document.querySelectorAll(".slide-item");
		slides.forEach((slide, index) => {
			slide.querySelector("img").src = sortedByRating[index].image;
		});
	}

	const displayBestRated = async () => {
		const productContainer = document.querySelector(".product-container");
		const fullStar = `<i class="fa-solid fa-star"></i>`;
		const halfStar = `<i class="fa-solid fa-star-half"></i>`;
		

		for (let i = 0; i < 5; i++) {
			const rating = sortedByRating[i].rating.rate;
			let price = sortedByRating[i].price;
			let additionalStar = ""
			if (0.3 < (rating - Math.floor(rating)) < 0.7) {
				additionalStar = halfStar;
			} else if ((rating- Math.floor(rating)) >= 0.7) {
				additionalStar = fullStar;
			}
			console.log(price);
			console.log((price % 1).toFixed(2));
			if ((price % 1).toFixed(2) == 0) {
				price = price+0.99;
			} 
			console.log(price);
			const productCard = document.createElement("div");
			productCard.classList.add("product-card");
			productCard.innerHTML = `
			<div class="product-image">
				<a href="./description.html?id=${sortedByRating[i].id}">
					<img src="${sortedByRating[i].image}" alt="" />
				</a>			
			</div>
			<div class="product-details">
				<a href="./description.html?id=${sortedByRating[i].id}">
					<h3>${sortedByRating[i].title}</h3>
				</a>
				<a class="product-rating" href="./description.html?id=${sortedByRating[i].id}">
					${fullStar.repeat(rating.toFixed(1))}
					${additionalStar}
					<p>${sortedByRating[i].rating.count}</p>
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
			productCard.addEventListener("mouseenter", () => {
				console.log("Mouse entered the card");
				productCard.classList.add("hovered");
			});
			productCard.addEventListener("mouseleave", () => {
				console.log("Mouse left the card");
				productCard.classList.remove("hovered");
			});
			productContainer.appendChild(productCard);
		}
	}

	await displaySlides();
	await displayBestRated();
}
renderProducts();



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






// SLIDER

const nextButton = document.getElementById("next-slide");
const prevButton = document.getElementById("prev-slide");
const slides = document.querySelector(".slides");
const slidesCount = document.querySelectorAll(".slide-item").length;
let currentSlide = 0;
let canClick = true;

// Function to move to the next slide

const nextSlide = async () => {
	slides.style.scrollBehavior = "smooth";
	if (canClick) {
		canClick = false;
		if (currentSlide < slidesCount - 1) {
			currentSlide++;
			slides.scrollLeft += slides.offsetWidth;
		} else {
			currentSlide = 0;
			slides.scrollLeft -= slides.offsetWidth * (slidesCount - 1);
		}
		await sleep(700);
		canClick = true;
	}
};

const prevSlide = async () => {
	slides.style.scrollBehavior = "smooth";
	if (canClick) {
		canClick = false;
		if (currentSlide > 0) {
			currentSlide--;
			slides.scrollLeft -= slides.offsetWidth;
		} else {
			currentSlide = slidesCount - 1;
			slides.scrollLeft += slides.offsetWidth * (slidesCount - 1);
		}
		await sleep(700);
		canClick = true;
	}
};

// Function to create a delay for Auto Slide

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const intervalTime = 7000;
let nextSlideTimer = setInterval(nextSlide, intervalTime);

nextButton.addEventListener("click", () => {
	clearInterval(nextSlideTimer);
	nextSlide();
	nextSlideTimer = setInterval(nextSlide, intervalTime);
});

prevButton.addEventListener("click", () => {
	clearInterval(nextSlideTimer);
	prevSlide();
	nextSlideTimer = setInterval(nextSlide, intervalTime);
});

// Product Section



