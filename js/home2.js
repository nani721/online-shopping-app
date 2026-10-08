"use strict";

// Elements Referances from html document

let productsContainer = document.getElementById("productContainer");
let cartContainer = document.getElementById("cartContainer");
let alertElement = document.getElementById("alertMessage");
let CartAmount = document.getElementById("cartValue");
let emptyCart = document.getElementById("emptyCart");
let sortCart = document.getElementById("sortByPrice");
let nameSort = document.getElementById("sortByName");
let productContainerPriceSort = document.getElementById("sortProductByPrice");
let productContainerNameSort = document.getElementById("sortProductByName");

//default products array

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 5000,
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 1000,
  },
  {
    id: 5,
    name: "Headphones",
    price: 500,
  },
];

// empty cart

const cart = [];

/*  let productBox = `<div class="product d-flex justify-content-between border border-2 border-black rounded align-items-center p-3 my-2">
        <h4 class="product-title h4">${product.name} - Rs. ${product.price}</h4>
        <button class="btn btn-primary">Add to Cart</button>
      </div>`; */

// calling the function to update products in the product containers in by default

updateProductConatiner();

// function to update product container section when every a element is added or soting operations are done

function updateProductConatiner() {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    let { id, name, price } = product;

    let productBox;

    productBox = `<div class="product d-flex justify-content-between border border-2 border-black rounded align-items-center p-3 my-2">
  <h4 class="product-title h4">${name} - Rs. ${price}</h4>
  <button onclick="addToCart(${id})" class="btn btn-success text-white p-2 fw-semibold">Add To Cart</button>
  </div>`;

    productsContainer.insertAdjacentHTML("beforeend", productBox);
  });
}

// function to add products to cart

function addToCart(addProductId) {
  //checking if the product is already available on cart

  let isProductAvailable = cart.some((product) => {
    return product.id === addProductId;
  });

  if (isProductAvailable) {
    let addedProduct = cart.find((product) => product.id === addProductId);
    alertMessage(`${addedProduct.name} Already In Cart`, "error");
    return;
  }

  //adding product to cart if not already in cart

  let productToAdd = products.find((productId) => {
    return productId.id === addProductId;
  });

  cart.push(productToAdd);
  alertMessage(`${productToAdd.name} Added To Cart`, "success");
  updateCart();
}

//function to remove items from cart

function removeFromCart(removeProduct) {
  let productIndex = cart.findIndex((product) => product.id === removeProduct);
  let removedProduct = cart.find((product) => product.id === removeProduct);
  cart.splice(productIndex, 1);

  alertMessage(`${removedProduct.name} is Removed`, "success");

  updateCart();
}

// function for updation of cart every time an is performend like add, deleting and sotring

function updateCart() {
  cartContainer.innerHTML = "";

  cart.forEach((cartProduct) => {
    let { id, name, price } = cartProduct;

    let cartProductBox = `<div class="product d-flex justify-content-between border border-2 border-black rounded align-items-center p-3 my-2">
  <h4 class="product-title h4">${name} - Rs. ${price}</h4>
  <button onclick="removeFromCart(${id})" class="btn btn-danger text-white p-2 fw-semibold">Add To Cart</button>
  </div>`;

    cartContainer.insertAdjacentHTML("beforeend", cartProductBox);
  });

  let cartValue = cart.reduce((prevVal, currentVal) => {
    return prevVal + currentVal.price;
  }, 0);

  CartAmount.innerText = `Rs: ${cartValue}`;
}

// alert function while adding, removing and clearing cart

let timeInterval;

function alertMessage(mgs, type) {
  clearTimeout(timeInterval);

  alertElement.style.display = "block";

  if (type === "success") {
    alertElement.classList.remove("bg-danger");
    alertElement.classList.add("bg-success");
  }
  if (type === "error") {
    alertElement.classList.remove("bg-success");
    alertElement.classList.add("bg-danger");
  }
  alertElement.innerText = mgs;

  timeInterval = setTimeout(() => {
    alertElement.style.display = "none";
  }, 3000);
}

//Sort by name and price functions

function sortByName(val) {
  val.sort((product1, product2) => {
    return product1.name.localeCompare(product2.name);
  });
}

function sortByPrice(val) {
  val.sort((product1, product2) => {
    return product1.price - product2.price;
  });
}

//empty Cart function

emptyCart.addEventListener("click", () => {
  cart.length = 0;
  updateCart();
  alertMessage(`Cart Is Empty`, "success");
});

//Sort by name and price functions binding to eventListener for both cart and product Section

sortCart.addEventListener("click", () => {
  sortByPrice(cart);
  updateCart();
});

nameSort.addEventListener("click", () => {
  sortByName(cart);
  updateCart();
});

productContainerPriceSort.addEventListener("click", () => {
  sortByPrice(products);
  updateProductConatiner();
});

productContainerNameSort.addEventListener("click", () => {
  sortByName(products);
  updateProductConatiner();
});
