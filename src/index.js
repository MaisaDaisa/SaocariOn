import {
	cartManagement,
	priceBeautify,
	additionalStarCalc,
} from "./Constant Fucntions/dataManipulations.js";

const getProducts = async () => {
	const data = await (await fetch("https://fakestoreapi.com/products")).json();
	return data;
};

const renderProducts = async () => {
	cartManagement();
	const products = await getProducts();
	const sortedByRating = await products.sort(
		(a, b) => b.rating.rate - a.rating.rate
	);

	console.log(sortedByRating);
	const displaySlides = async () => {
		const slides = document.querySelectorAll(".slide-item");
		slides.forEach((slide, index) => {
			slide.querySelector("img").src = sortedByRating[index].image;
		});
	};

	const displayBestRated = async () => {
		const productContainer = document.querySelector(".product-container");
		const fullStar = `<i class="fa-solid fa-star"></i>`;

		for (let i = 0; i < 5; i++) {
			const rating = sortedByRating[i].rating.rate;
			const additionalStar = additionalStarCalc(rating);
			const price = priceBeautify(sortedByRating[i].price);
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
				productCard.classList.add("hovered");
			});
			productCard.addEventListener("mouseleave", () => {
				productCard.classList.remove("hovered");
			});
			productContainer.appendChild(productCard);
		}
	};

	await displaySlides();
	await displayBestRated();
};
renderProducts();

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

slides.addEventListener("touchstart", handleTouchStart, false);
slides.addEventListener("touchmove", handleTouchMove, false);

let x1 = null;
let y1 = null;

function handleTouchStart(event) {
	const firstTouch = event.touches[0];
	x1 = firstTouch.clientX;
	y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
	if (!x1 || !y1) {
		return;
	}

	const x2 = event.touches[0].clientX;
	const y2 = event.touches[0].clientY;
	const xDiff = x2 - x1;
	const yDiff = y2 - y1;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
			clearInterval(nextSlideTimer);
			prevSlide();
			nextSlideTimer = setInterval(nextSlide, intervalTime);
		} else {
			clearInterval(nextSlideTimer);
			nextSlide();
			nextSlideTimer = setInterval(nextSlide, intervalTime);
		}
	}

	x1 = null;
	y1 = null;
}

// Product Section
