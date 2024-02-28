
import { cartManagement, priceBeautify, additionalStarCalc } from "./Constant Fucntions/dataManipulations.js";



const getProductId = () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    return id;
}

const fetchProduct = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    return product;
}

const initialize = async () => {
    const id = getProductId();
    const product = await fetchProduct(id);
    displayProductDetails(product);
    console.log(product);
}


// Helper functions 

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getCategory = (product) => {
    const categoryList = {
        "electronics": "var(--clr-prime-light-blue)",
        "men's clothing": "green",
        "women's clothing": "pink",
        "jewelry": "var(--clr-primary-orange)",
    }
    const category = product.category.toLowerCase();
    const productCategory = document.querySelector(".product-category");
    console.log(productCategory);
    let color = null;
    if (categoryList[category]) {
        color = categoryList[category];
    } else {
        console.log("Category not found");
        color = "gray";
    }
    productCategory.style.backgroundColor = color;
}

const deployAdditionalFunctions = (product) => {
    getCategory(product);
    cartManagement();
    addToCartFunctionality();
}

const addToCartFunctionality = () => {
    const button = document.querySelector(".product-price-wrapper button");
    button.addEventListener("click", () => {
        const id = getProductId();
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart[id]) {
            cart[id] += 1;
        } else {
            cart[id] = 1;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        cartManagement();
    });
}



// Display the product details

async function displayProductDetails(product) {

    // query selectors
    const productContainer = document.querySelector(".product-container");
    console.log(productContainer);
    const fullStar = `<i class="fa-solid fa-star"></i>`;


    const rating = product.rating.rate;
    const additionalStar = additionalStarCalc(rating);
    const price = priceBeautify(product.price);
    const category = capitalizeFirstLetter(product.category);
    
    productContainer.innerHTML = `
    <div class="product-image">
        <img src="${product.image}" alt="" />
    </div>
    <div class="product-details-wrapper">
        <div class="product-details">
            <h1>${product.title}</h1>
            <div class="product-category">
                <h3>${category}</h3>
            </div>
            <div class="product-rating">
                ${fullStar.repeat(rating.toFixed(1))}
                ${additionalStar}
                <p>${product.rating.count}</p>
            </div>
            <hr>
            <p>${product.description}</p>
        </div>
    </div>
    <div class="product-price-wrapper">
        <div class="product-price">
            <span>$</span>
            <h4>${price}</h4>
        </div>
        <div class="product-delivery">
            <p>get it By <span>Tuesday</span></p>
        </div>
        <button><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
    </div>
    `;
    deployAdditionalFunctions(product);
}



// initialize the app
initialize();
