// Initialize variables
let cart = [];
let processedProducts = new Set();

// Get the initial cart total
let cartTotal = parseFloat(
  document.getElementsByClassName("total")[0].innerHTML.replace("$", "")
);

// Print the initial cart total
console.log(cartTotal);

// Function to get product details
function getProductDetails(product) {
  return {
    name: product.getElementsByClassName("card-title")[0].innerHTML,
    price: parseFloat(
      product.getElementsByClassName("unit-price")[0].innerHTML.replace("$", "")
    ),
    quantity: 1,
  };
}

// Function to update the cart total
function updateCartTotal(price) {
  cartTotal += price;
  document.getElementsByClassName("total")[0].innerHTML = "$" + cartTotal;
}

// Get all the products
let products = document.getElementsByClassName("card-body");

// Loop through all the products
for (let i = 0; i < products.length; i++) {
  let product = products[i];
  let productDetails = getProductDetails(product);

  // Add the product to the cart if it's not already added
  if (!processedProducts.has(productDetails.name)) {
    product.getElementsByClassName("quantity")[0].innerHTML = 1;
    cart.push(productDetails);
    processedProducts.add(productDetails.name);
    updateCartTotal(productDetails.price);
  }
}

// Print the cart
console.log(cart);

// Add event listeners to the plus and minus icons
let plusIcons = document.getElementsByClassName("fa-plus-circle");

// Loop through all the plus icons
for (let i = 0; i < plusIcons.length; i++) {
  plusIcons[i].addEventListener("click", function () {
    let quantityElement = this.nextElementSibling;
    let quantity = parseInt(quantityElement.innerHTML) + 1;
    quantityElement.innerHTML = quantity;

    updateProductQuantity(this);
  });
}

// Function to update the product quantity
function updateProductQuantity(element) {
  let productName =
    element.parentElement.parentElement.getElementsByClassName("card-title")[0]
      .innerHTML;
  let productPrice = parseFloat(
    element.parentElement.parentElement
      .getElementsByClassName("unit-price")[0]
      .innerHTML.replace("$", "")
  );
  let productIndex = cart.findIndex((p) => p.name === productName);

  let quantityElement =
    element.nextElementSibling || element.previousElementSibling; // Handle both plus and minus
  let quantity = parseInt(quantityElement.innerHTML);

  // Calculate price change based on quantity change
  let priceChange = (quantity - cart[productIndex].quantity) * productPrice;

  cart[productIndex].quantity = quantity;
  updateCartTotal(priceChange);
}

// Get all the minus icons
let minusIcons = document.getElementsByClassName("fa-minus-circle");

// Loop through all the minus icons
for (let i = 0; i < minusIcons.length; i++) {
  minusIcons[i].addEventListener("click", function () {
    let quantityElement = this.previousElementSibling;
    let quantity = parseInt(quantityElement.innerHTML);

    // Only decrease the quantity if it's greater than 1
    if (quantity > 1) {
      quantityElement.innerHTML = quantity - 1;
      updateProductQuantity(this);
    }
  });
}

// Add event listeners to the heart and delete icons
// Get all the heart icons
let heartIcons = document.getElementsByClassName("fa-heart");

// Loop through all the heart icons
for (let i = 0; i < heartIcons.length; i++) {
  heartIcons[i].addEventListener("click", function () {
    // Change the color of the heart icon
    this.style.color = this.style.color === "red" ? "black" : "red";
  });
}

// Get all the delete icons
let deleteIcons = document.getElementsByClassName("fa-trash-alt");

// Loop through all the delete icons
for (let i = 0; i < deleteIcons.length; i++) {
  deleteIcons[i].addEventListener("click", function () {
    // Use closest() to find the nearest ancestor with class 'card'
    let cardElement = this.closest(".card");

    let productName = cardElement.querySelector(".card-title").innerHTML;
    let productPrice = parseFloat(
      cardElement.querySelector(".unit-price").innerHTML.replace("$", "")
    );
    let productIndex = cart.findIndex((p) => p.name === productName);
    let productQuantity = cart[productIndex].quantity;

    cart.splice(productIndex, 1);
    updateCartTotal(-productPrice * productQuantity);

    cardElement.remove();
  });
}
