import {
	cartManagement,
	priceBeautify,
} from "./Constant Fucntions/dataManipulations.js";

let cartInLocal = JSON.parse(localStorage.getItem("cart"));

const getItems = async (cart) => {
	let cartData = {};
	for (const [key, value] of Object.entries(cart)) {
		const data = await fetch(`https://fakestoreapi.com/products/${key}`).then(
			(response) => response.json()
		);
		cartData[key] = { results: data, quantity: value };
	}
	return cartData;
};

const updateTotalPrice = (items) => {
	const totalPrice = document.querySelector(".cart-summary h4");
	console.log(totalPrice);
	let total = 0;
	for (const [key, item] of Object.entries(items)) {
		total += item.results.price * item.quantity;
	}
	totalPrice.innerHTML = `${priceBeautify(total).toFixed(2)}`;
};

const displayItems = (items) => {
	const cartContainer = document.querySelector(".cart-item-container");

	for (const [key, item] of Object.entries(items)) {
		const cartItem = document.createElement("div");
		cartItem.classList.add("cart-item");

		const price = priceBeautify(item.results.price);
		const quantity = item.quantity;

		cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.results.image}" alt="" />
            </div>
            <div class="item-info">
                <div class="item-text">
                    <h3>${item.results.title}</h3>
                </div>
                <div class="product-price">
                    <span>$</span>
                    <h4>${price}</h4>
                </div>
                <div class="item-quantity-manipulation">
                    <div class="item-quantity-changer">
                        <button class="quantity-changer id="minus">-</button>
                        <p>${item.quantity}</p>
                        <button class="quantity-changer id="plus">+</button>
                    </div>
                    <dir class="item-deleter">
                        <p>delete</p>
                    </dir>
                </div>
            </div>
        `;
		cartItem
			.querySelector(".item-quantity-changer")
			.addEventListener("click", (e) => {
				console.log(e.target);
				if (e.target.innerHTML === "-") {
					console.log("minus");
					if (quantity > 1) {
						item.quantity -= 1;
						cartInLocal[key] -= 1;
						cartItem.querySelector(".item-quantity-changer p").innerHTML =
							item.quantity;
					} else {
						alert(
							"You cannot have less than 1 item. please delete the item if you do not want it."
						);
					}
				} else if (e.target.innerHTML === "+") {
					console.log("plus");
					item.quantity += 1;
					cartInLocal[key] += 1;
					cartItem.querySelector(".item-quantity-changer p").innerHTML =
						item.quantity;
				}
				localStorage.setItem("cart", JSON.stringify(cartInLocal));
				cartManagement();
				updateTotalPrice(items);
			});

		cartItem.querySelector(".item-deleter").addEventListener("click", () => {
			cartItem.remove();
			delete cartInLocal[key];
			localStorage.setItem("cart", JSON.stringify(cartInLocal));
			cartManagement();
			updateTotalPrice(items);
		});
		cartContainer.appendChild(cartItem);
	}

	cartManagement();
	updateTotalPrice(items);
};

const emptyCart = () => {
	const cartContainer = document.querySelector(".cart-item-container");
	cartContainer.style = `
        display: flex;
        align-items: center;
        padding: 10rem 0;
    `;
	cartContainer.innerHTML = `
        <h1>Your Cart is Empty</h1>
    `;
};

const initFunction = async () => {
	const items = await getItems(cartInLocal);
	if (cartInLocal === null || Object.keys(cartInLocal).length === 0) {
		emptyCart();
	} else {
		displayItems(items);
	}
};

initFunction();

// Checkout Event Listener

document.querySelector(".checkout-btn").addEventListener("click", () => {
	if (cartInLocal === null || Object.keys(cartInLocal).length === 0) {
		alert("Your cart is empty. Please add items to your cart to checkout");
	} else {
		alert(
			`Your Total is $${document.querySelector(".cart-summary h4").innerHTML}`
		);
		alert(
			"Thank you for shopping with us. Your order has been placed successfully"
		);
		localStorage.removeItem("cart");
		window.location.href = "index.html";
	}
});
