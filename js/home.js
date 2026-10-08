"use strict";

let productsContainer = document.getElementById("productContainer");
let cartContainer = document.getElementById("cartContainer");
let alertElement = document.getElementById("alertMessage");
let CartAmount = document.getElementById("cartValue");
let emptyCart = document.getElementById("emptyCart");
let sortCart = document.getElementById("sortByPrice");
let nameSort = document.getElementById("sortByName");

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

const cart = [];

/*  let productBox = `<div class="product d-flex justify-content-between border border-2 border-black rounded align-items-center p-3 my-2">
        <h4 class="product-title h4">${product.name} - Rs. ${product.price}</h4>
        <button class="btn btn-primary">Add to Cart</button>
      </div>`; */

// forEach() Method on products array to display in webpage

products.forEach((product) => {
  let { id, name, price } = product;

  let productBox = document.createElement("div");

  productBox.className =
    "product d-flex justify-content-between border border-2 border-black rounded align-items-center p-3 my-2";

  productBox.innerHTML = `<h4 class="product-title h4">${name} - Rs. ${price}</h4> 
  <button onclick="addToCart(${id})" class="btn btn-success text-white p-2 fw-semibold">Add To Cart </button>`;

  productsContainer.insertAdjacentElement("beforeend", productBox);
});

let addToCart = (clickedProductId) => {
  let isProductAvailable = cart.some((availProduct) => {
    return availProduct.id === clickedProductId;
  });

  if (isProductAvailable) {
    let productToAdd = products.find((productId) => {
      return productId.id === clickedProductId;
    });
    alertMessage(`${productToAdd.name} already in cart`, "error");
    return;
  }

  let productToAdd = products.find((productId) => {
    return productId.id === clickedProductId;
  });

  cart.push(productToAdd);
  updatedCartProduct();
  alertMessage(`${productToAdd.name} added to cart`, "success");
};

let updatedCartProduct = function () {
  cartContainer.innerHTML = "";

  cart.forEach((product) => {
    let { id, name, price } = product;
    let cartProductBox = document.createElement("div");

    cartProductBox.className =
      "product d-flex justify-content-between border border-2 border-black rounded align-items-center p-3 my-2";

    cartProductBox.innerHTML = `<h4 class="product-title h4">${name} - Rs. ${price}</h4>
  <button onclick="removeFromCart(${id})" class="btn btn-danger text-white p-2 fw-semibold">Remove</button>`;

    cartContainer.insertAdjacentElement("beforeend", cartProductBox);
  });

  /* let cartValue = 0;

  for (let i = 0; i < cart.length; i++) {
    cartValue += cart[i].price;
  } */
  let cartValue = cart.reduce((preValue, currentValue) => {
    return preValue + currentValue.price;
  }, 0);
  CartAmount.innerText = `Rs:${cartValue}`;
};

let removeFromCart = function (removeCartId) {
  /*  let cartAfterRemove = cart.filter((product) => {
    return product.id !== removeCartId;
  }); */
  let removeProduct = cart.find((product) => product.id === removeCartId);
  let productIndex = cart.findIndex((product) => product.id === removeCartId);
  cart.splice(productIndex, 1);
  console.log(removeCartId);
  alertMessage(`${removeProduct.name} is Removed`, "error");
  updatedCartProduct();
};

let clearalert;

function alertMessage(msg, type) {
  clearTimeout(clearalert);

  alertElement.style.display = "block";

  if (type === "success") {
    alertElement.classList.remove("bg-danger");
    alertElement.classList.add("bg-success");
  }

  if (type === "error") {
    alertElement.classList.remove("bg-success");
    alertElement.classList.add("bg-danger");
  }

  alertElement.innerText = msg;

  clearalert = setTimeout(() => {
    alertElement.style.display = "none";
  }, 3000);
}

emptyCart.addEventListener("click", () => {
  cart.length = 0;
  updatedCartProduct();
  alertMessage(`Cart is Empty`, "success");
});

sortCart.addEventListener("click", () => {
  cart.sort((product1, product2) => {
    return product1.price - product2.price;
  });
  updatedCartProduct();
});

nameSort.addEventListener("click", () => {
  cart.sort((pro1, pro2) => pro1.name.localeCompare(pro2.name));
  updatedCartProduct();
});
