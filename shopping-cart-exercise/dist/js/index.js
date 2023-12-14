const productButtons = document.querySelectorAll("button");
const shoppingCart = [];
const cart = document.querySelector("#cart");
const openCartButton = document.querySelector("#open-cart");
const cartWrapper = document.getElementById("cart");
const booksInStore = document.querySelector("card");
const productsListEl = document.getElementById("products");
const removeAllBtn = document.getElementById("removeAllBtn");
let productsInCart = 0;
let booksExistsInCart;
function showCart() {
    if (cartWrapper.classList.contains("hide")) {
        cartWrapper.classList.remove("hide");
        console.log("Hide finns");
    }
    else {
        cartWrapper.classList.add("hide");
        console.log("Hide finns inte");
    }
}
function updateCart() {
    while (productsListEl === null || productsListEl === void 0 ? void 0 : productsListEl.firstChild) {
        productsListEl === null || productsListEl === void 0 ? void 0 : productsListEl.firstChild.remove();
    }
    shoppingCart.forEach(cartObj => {
        let pEl = document.createElement("p");
        pEl.innerHTML = cartObj;
        let liEl = document.createElement("li");
        liEl.appendChild(pEl);
        productsListEl === null || productsListEl === void 0 ? void 0 : productsListEl.appendChild(liEl);
        let buttonEl = document.createElement("button");
        buttonEl.innerHTML = "x";
        buttonEl.setAttribute("id", "removeBtn");
        buttonEl.addEventListener("click", function () {
            remove(event.target);
        });
        liEl.appendChild(buttonEl);
        console.log("addded to list");
    });
}
function remove(book) {
    console.log("remove");
    let bookParentEl = book.parentNode;
    console.log(bookParentEl);
    let bookData = bookParentEl.firstChild;
    console.log("Ska nu ta bort:" + bookData);
    for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i] === bookData.innerHTML) {
            console.log("removed" + shoppingCart[i]);
            delete shoppingCart[i];
            break;
        }
    }
    productsInCart--;
    document.getElementById("productsInCart").innerHTML = productsInCart.toString();
    bookParentEl.remove();
}
function addClickEvent() {
    // Void betyder att funktionen ej returnerar något värde
    // För att kunna använda parentElement behöver vi göra om det till ett HTMLElement istället för typen EventTarget
    productButtons.forEach(productButton => {
        productButton.addEventListener("click", function () {
            addToCart(event.target);
        });
    });
    openCartButton.addEventListener("click", showCart);
    removeAllBtn.addEventListener("click", removeAll);
}
function removeAll() {
    while (productsListEl.firstChild) {
        productsListEl.firstChild.remove();
    }
    while (shoppingCart.length > 0) {
        shoppingCart.pop();
    }
    productsInCart = 0;
    document.getElementById("productsInCart").innerHTML = productsInCart.toString();
}
function listProductsInCart() { }
addClickEvent();
function addToCart(product) {
    let bookEl = product.parentNode;
    let bookData = bookEl.getAttribute("data-product");
    for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i] === bookData) {
            console.log("running");
            booksExistsInCart = true;
            break;
        }
    }
    if (!booksExistsInCart) {
        shoppingCart.push(bookData);
        productsInCart++;
        console.log(productsInCart);
        document.getElementById("productsInCart").innerHTML = productsInCart.toString();
        updateCart();
    }
    else {
        window.alert("Bok redan tillagd");
        booksExistsInCart = false;
    }
}
