export const cartManagement = () => {
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "{}");
    } else {
        const cartNumber = document.querySelectorAll(".cart-num");
        const cart = JSON.parse(localStorage.getItem("cart"));
        let total = 0;
        for (const key in cart) {
            total += cart[key];
        }
        cartNumber.forEach((element) => {
            element.innerHTML = total;
        });
    }
}


export const priceBeautify = (price) => {
    if ((price % 1).toFixed(2) == 0 && price != 0) {
        price += 0.99;
    } 
    return price;
}

export const additionalStarCalc = (rating) => {
    const fullStar = `<i class="fa-solid fa-star"></i>`;
    const halfStar = `<i class="fa-solid fa-star-half"></i>`;
    let additionalStar = ""
    if (0.3 < (rating - Math.floor(rating)) < 0.7) {
        additionalStar = halfStar;
    } else if ((rating- Math.floor(rating)) >= 0.7) {
        additionalStar = fullStar;
    }
    return additionalStar;
}


